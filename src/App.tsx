/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Trophy, Sparkles, Brain, Clock, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, PenTool, Globe, 
  LogOut, Wallet, Zap, Key as KeyIcon, User as UserIcon, Shield, Plus, X, ArrowRight, ShoppingBag, Loader2, Database,
  Menu, Heart, MessageCircle, Share2
} from 'lucide-react';
import { ACADEMIC_DATA, AcademicArticle, AcademicQuestion } from './academicData';
import { MORE_ACADEMIC_DATA } from './data/moreAcademicData';
import { collection, query, where, limit, onSnapshot, updateDoc, doc, deleteDoc, serverTimestamp, increment, addDoc, getDocs } from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from './lib/firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from './lib/authContext';
import { EVERYDAY_DATA, EverydayTask, EverydayQuestion } from './everydayData';

import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import CreditsPage from './components/CreditsPage';

// --- Data Structure ---
// Using a simple string format where {blank} indicates missing letters.
const RAW_DATA = [
  // 1. Ancient Egypt (Transcribed from image)
  "Ancient Egypt was one of the most powerful civilizations in history. Its peo{ple} built magni{ficent} pyramids a{nd} temples th{at} still st{and} today. Th{ey} possessed adva{nced} knowledge o{f} mathematics and medi{cine}. The civilization ar{ose} along the Nile River, which provided water and fertile land for agriculture. The Egyptians also developed a writing system called hieroglyphics, which used pictures to represent words and sounds. Their culture and achievements continue to fascinate people around the world.",
  // 2. Television (Transcribed from image)
  "The television has undergone significant changes since its invention in the early twentieth century. The earl{iest} television se{ts} were extr{emely} bulky a{nd} displayed sm{all} black-and-white ima{ges}. By t{he} mid-twentieth cen{tury}, innovations i{n} broadcasting bro{ught} vivid visuals into homes, transforming the viewing experience. Over the years, advancements in technology have led to higher-resolution screens, streaming services, and on-demand content. The television has become a central part of entertainment and information, shaping culture and influencing public opinion worldwide.",
  // 3. Industrial Revolution
  "The Industrial Revolution marked a major turning point in history. It be{gan} in Great Britain during the late eighteenth cen{tury} and spread to other parts of the world. New inven{tions} like the steam engine and the spinning jenny revolu{tionised} the way goods were produced. Facto{ries} replaced small workshops, leading to mass produc{tion} and urbanisa{tion}. This period of rapid growth brought about signi{ficant} social and econo{mic} changes, although it also created challen{ges} such as poor working conditions and environmental pollution.",
  // 4. Great Barrier Reef
  "The Great Barrier Reef is the world's largest coral reef system. Loca{ted} off the coast of Australia, it is home to a vast array of mar{ine} life. This natural won{der} consists of thousands of individual reefs and hundreds of islands. Climate change and rising sea tempera{tures} pose a serious thr{eat} to its survival, causing widespread coral blea{ching}. Conser{vation} efforts are underway to protect this unique ecosys{tem} for future genera{tions}. Divers and snorkellers from around the globe visit the reef to witness its stun{ning} beauty and biodiver{sity}.",
  // 5. Shakespeare's Legacy
  "William Shakespeare is widely regarded as the greatest writer in the English language. His plays and son{nets} have been trans{lated} into every major living language and are perfor{med} more often than those of any other play{wright}. He introduced thousands of new words and phra{ses} into the English vocabu{lary}. His works explore univer{sal} themes such as love, jealousy, and ambi{tion}, which continue to resonate with modern audien{ces}. The Globe Theatre in London remains a sym{bol} of his endur{ing} influence on world litera{ture} and drama.",
  // 6. The Roman Empire
  "The Roman Empire was one of the most influential organisa{tions} in human history. At its height, it spanned three conti{nents} and controlled the entire Mediterra{nean} region. The Romans were renowned for their engineer{ing} feats, including the construction of roads, aqueducts, and monu{mental} buildings like the Colosseum. Their legal system and govern{ment} structure laid the founda{tion} for many modern Western socie{ties}. Despite its eventual fall, the legacy of Rome lives on through the Romance langua{ges} and various cultural tradi{tions}.",
  // 7. Space Exploration
  "Space exploration has expanded our understand{ing} of the universe. Since the launch of Sputnik in 1957, humans have sent probes to distant planets and landed astro{nauts} on the Moon. The International Space Station serves as a research labora{tory} where scientists from different coun{tries} work together. Future missions aim to explore Mars and search for signs of life on other celestial bod{ies}. The develop{ment} of reusable rockets has made space travel more afford{able}, opening up new possibili{ties} for commer{cial} ventures and scientific discov{ery}.",
  // 8. The Internet
  "The Internet has transformed the way we communi{cate} and access information. It evolved from a research project in the United States to a global network connect{ing} billions of people. Social media plat{forms} allow users to share content and stay in touch with friends and fam{ily}. Online shopping and digital bank{ing} have become essential parts of modern life. However, the rise of the Internet has also raised concerns about privacy, cybersecur{ity}, and the spread of misinfor{mation}. Navigat{ing} the digital world requires critical think{ing} and digital litera{cy}.",
  // 9. Climate Change
  "Climate change is one of the most press{ing} issues of our time. Human activi{ties}, such as the burn{ing} of fossil fuels, have led to an increase in greenhouse gas emissions. This has caused global tempera{tures} to rise, resulting in melting glaciers and more frequent extreme weather events. Scientists warn that urgent action is needed to reduce carbon foot{prints} and transition to renewable energy sour{ces}. Interna{tional} agreements like the Paris Accord aim to limit global warm{ing} and protect the planet's fragile ecosys{tems} for the sake of future inhabi{tants}.",
  // 10. The Renaissance
  "The Renaissance was a period of cultural and artistic rebirth in Europe. It began in Italy during the fourteenth cen{tury} and spread across the continent, mark{ing} the transition from the Middle Ages to the modern era. Artists like Leonardo da Vinci and Michelangelo created master{pieces} that celebrated humanism and real{ism}. The inven{tion} of the printing press helped dissemi{nate} new ideas and knowledge more widely. This era of intellectual curiosity led to signi{ficant} advancements in science, philoso{phy}, and litera{ture}, shaping the course of Western civilisa{tion}.",
  // 11. The Printing Press
  "The invention of the printing press by Johannes Gutenberg revolu{tionised} the spread of information. Before this, books were hand-copied and extremely expen{sive}, limit{ing} access to knowledge to a wealthy elite. The press made it possible to produce books quickly and in large quanti{ties}. This led to a rise in litera{cy} rates and the rapid circu{lation} of scientific and religious ideas. It played a crucial role in the Reformation and the Scientific Revolu{tion}, fundamen{tally} changing the way people perceived the world and their place with{in} it.",
  // 12. Amazon Rainforest
  "The Amazon Rainforest is the largest tropical rainforest on Earth. It spans several coun{tries} in South America and is home to an incredible diver{sity} of plant and animal species. Often referred to as the 'lungs of the planet', it plays a vital role in regulat{ing} the Earth's climate by absorb{ing} carbon dioxide. However, deforesta{tion} for agriculture and logg{ing} poses a severe threat to its survival. Protect{ing} the Amazon is essential for maintain{ing} global biodiver{sity} and combat{ting} the effects of climate change on a global scale.",
  // 13. Ancient Greece
  "Ancient Greece is often considered the cradle of Western civilisa{tion}. Its city-states, like Athens and Sparta, developed unique systems of govern{ment} and culture. The Greeks made signi{ficant} contributions to philoso{phy}, mathematics, and the arts. Thinkers like Socrates, Plato, and Aristotle laid the founda{tions} of Western thought. The Olympic Games, which began in 776 BC, are a testament to their emphasis on physical excel{lence} and competition. Their architectural styles and epic litera{ture} continue to influence and inspire people around the world today.",
  // 14. The French Revolution
  "The French Revolution was a period of radical social and politi{cal} upheaval in France. It began in 1789 with the storm{ing} of the Bastille and led to the over{throw} of the monarchy. The revolu{tionaries} sought to establish a republic based on the principles of liberty, equality, and frater{nity}. This era saw the rise of Napoleon Bonaparte, who eventually became Emperor of the French. The revolution had a profound impact on European history, inspir{ing} other movements for democracy and human rights across the continent and beyond.",
  // 15. Evolution of Music
  "The evolution of music reflects the chang{ing} tastes and technolo{gies} of human society. From ancient bone flutes to modern electronic synthesi{sers}, music has always been a form of expression and celebra{tion}. The classical period saw the rise of composers like Mozart and Beethoven, who created complex sympho{nies}. In the twentieth century, genres like jazz, rock, and hip-hop emer{ged}, each reflect{ing} the social and cultural shifts of their time. Today, digital stream{ing} platforms have made music more access{ible} than ever, allow{ing} artists to reach global audiences instantly.",
  // 16. Architecture in London
  "London's architecture is a fascinat{ing} blend of old and new. The city is home to historic land{marks} like the Tower of London and St Paul's Cathedral, which reflect its rich heritage. In contrast, modern skyscra{pers} like the Shard and the Gherkin define the contemporary sky{line}. The Great Fire of London in 1666 led to a major rebuild{ing} effort, shap{ing} much of the city's current layout. Today, architects continue to innovate, integrat{ing} sustainable designs and smart technolo{gies} into the urban fabric of this vibrant and ever-evolv{ing} metropolis.",
  // 17. The Silk Road
  "The Silk Road was an ancient network of trade routes connect{ing} the East and West. It facilitated the exchange of goods, ideas, and culture between civilisa{tions} for centuries. While silk was a major commo{dity}, other items like spices, precious stones, and technolo{gies} were also traded. The route played a crucial role in the spread of religions like Buddhism and Islam. It also allowed for the transfer of know{ledge} in fields such as mathematics and medicine. The legacy of the Silk Road remains a symbol of interconnec{tedness} and cultural exchange in human history.",
  // 18. Artificial Intelligence
  "Artificial Intelligence (AI) is the simula{tion} of human intelligence by machines. It involves the develop{ment} of algorithms that can perform tasks such as speech recogni{tion}, decision-making, and language transla{tion}. AI is already being used in various indus{tries}, from healthcare and finance to transporta{tion} and entertainment. While it offers many benefits, such as increased efficien{cy} and innovation, it also raises ethical ques{tions} about job displace{ment} and algorithmic bias. As AI continues to evolve, it will fundamen{tally} reshape the way we live and work in the future.",
  // 19. The Solar System
  "Our solar system consists of the Sun and everything that orbits around it. This includes eight major planets, their moons, and numerous smaller bod{ies} like asteroids and comets. The four inner planets are rocky and rela{tively} small, while the four outer planets are gas giants. Earth is the only planet known to support life, thanks to its liquid water and protec{tive} atmosphere. Scientists use telescopes and space probes to study the distant corners of our solar system, hop{ing} to uncover the secrets of its forma{tion} and the possibili{ty} of life beyond our planet.",
  // 20. Human Anatomy
  "Human anatomy is the study of the structure of the human body. It involves understand{ing} how different organs and systems work together to maintain life. The skeletal system provides support and protec{tion}, while the muscular system allows for move{ment}. The circula{tory} system transports oxygen and nutrients through{out} the body, and the nervous system coordi{nates} our actions and responses. Advancements in medical imag{ing} and surgical techni{ques} have greatly enhanced our knowledge of the human body, lead{ing} to better treatments for various diseases and injuries.",
  // 21. The Olympic Games
  "The Olympic Games are the world's foremost sports competition. They feature summer and winter sports in which thousands of athletes from around the globe partici{pate}. The modern Games were inspired by the ancient Olympics held in Greece. The event aims to promote peace and friend{ship} among nations through athletic excel{lence}. Each edition of the Games is hosted by a different city, requir{ing} extensive prepara{tion} and investment in infra{structure}. The Olympic flame and the five rings remain iconic symbols of unity and the endur{ing} spirit of human achievement.",
  // 22. Victorian Era
  "The Victorian Era was a period of signi{ficant} change in the United Kingdom. It coincided with the long reign of Queen Victoria from 1837 to 1901. This era saw the height of the British Empire and the rapid expan{sion} of industry and trade. Socially, it was a time of strict moral codes and clear class distinc{tions}. However, it also witnessed the rise of move{ments} for social reform, including the fight for women's suffrage and better work{ing} conditions. The litera{ture} of the time, by authors like Charles Dickens, often highlighted the inequali{ties} of Victorian society.",
  // 23. Renewable Energy
  "Renewable energy is derived from natural sources that are constantly replen{ished}. This includes solar, wind, hydro, and geother{mal} power. Unlike fossil fuels, these energy sources produce little to no greenhouse gas emis{sions}, making them essential for combat{ting} climate change. The cost of renewable technolo{gies} has decreased signi{ficantly} in recent years, lead{ing} to their widespread adop{tion} around the world. Transition{ing} to a clean energy future requires invest{ment} in grid infra{structure} and energy storage solutions to ensure a reliable and sustainable power supply for all.",
  // 24. The Sahara Desert
  "The Sahara is the largest hot desert in the world. It covers much of North Africa and is charac{terised} by its vast sand dunes and rocky plateaus. Despite its harsh condi{tions}, the Sahara is home to various nomadic tribes and resilient wildlife. The desert has a rich history, with ancient trade routes cross{ing} its expanse for centuries. Climate change and desertifica{tion} pose ongoing challen{ges} to the region, impact{ing} the livelihoods of those who depend on its fragile ecosys{tems}. Explor{ing} the Sahara reveals a landscape of stun{ning} beauty and deep cultural signi{ficance}.",
  // 25. History of Photography
  "The history of photography began with the inven{tion} of the camera obscura. In the early nineteenth century, pioneers like Louis Daguerre developed ways to capture perma{nent} images on metal plates. The introduc{tion} of roll film and portable cameras made photography more access{ible} to the general public. The digital revolu{tion} further transformed the medium, allow{ing} for instant capture and sharing of images. Today, photography is an essential part of modern life, used for every{thing} from personal memories and journalism to artistic expression and scientific documentation.",
  // 26. The Magna Carta
  "The Magna Carta is one of the most important docu{ments} in legal history. It was signed by King John of England in 1215 to resolve a conflict with his rebellious barons. The charter established the princi{ple} that everyone, including the king, is subject to the law. It guaranteed certain rights, such as the right to a fair trial and protec{tion} against arbitrary arrest. Although many of its clauses were later repealed, the Magna Carta remains a symbol of liberty and the founda{tion} of modern constitu{tional} law in many countries around the world.",
  // 27. Deep Sea Exploration
  "Deep sea exploration involves study{ing} the ocean at depths where sunlight cannot reach. This vast and mysterious realm is home to extraor{dinary} creatures that have adapted to extreme pressure and cold. Scientists use remotely operated vehicles (ROVs) and submersi{bles} to explore the ocean floor and discover new species. These missions provide valuable insights into the Earth's geolo{gy} and the origins of life. However, the deep sea is also threatened by human activi{ties} like deep-sea min{ing} and pollution, highlight{ing} the need for careful management and conser{vation} of this remote environment.",
  // 28. The Great Wall of China
  "The Great Wall of China is a series of fortifica{tions} built along the northern borders of China. It was constructed over several centuries to protect the Chinese states and empires against inva{sions}. The wall is made of stone, brick, tamped earth, and other materi{als}. It is the longest man-made structure in the world, stretch{ing} for thousands of miles. Today, the Great Wall is a major tourist attrac{tion} and a symbol of China's rich history and endur{ing} strength. Preserva{tion} efforts are ongoing to protect this UNESCO World Heritage site from erosion and human impact.",
  // 29. Modern Medicine
  "Modern medicine has drasti{cally} improved human health and life expectancy. The discovery of antibio{tics} and the develop{ment} of vaccines have nearly eliminated many once-deadly diseases. Advanced surgical techni{ques} and organ trans{plants} allow doctors to treat complex conditions that were once fatal. Medical research continues to push the bounda{ries}, with breakthroughs in genomics and person{alised} medicine. However, challen{ges} remain, such as the rise of antibiotic resis{tance} and the need for equitable access to healthcare. The future of medicine lies in integrat{ing} technology and compas{sion} to provide better care for all.",
  // 30. The Enlightenment
  "The Enlightenment was an intellectual and philoso{phical} movement that dominated Europe in the eighteenth century. It emphasized reason, indivi{dualism}, and scepti{cism} towards traditional authority. Thinkers like Voltaire, John Locke, and Jean-Jacques Rousseau promoted ideas such as liberty, progress, and the separa{tion} of church and state. This era laid the groundwork for the American and French Revolu{tions} and the develop{ment} of modern democra{tic} societies. The Enlightenment's focus on scientific inquiry and human rights continues to influence contemporary thought and the pursuit of knowledge and justice.",
  // 31. Biodiversity
  "Biodiversity refers to the variety of life on Earth in all its forms. This includes the diver{sity} of species, genetic varia{tion}, and the complex ecosys{tems} they inhabit. Biodiversity is essential for maintain{ing} the health of our planet, provid{ing} services such as pollina{tion}, water purifica{tion}, and climate regulation. However, human activi{ties} like habitat destruc{tion} and overexploi{tation} are causing a rapid decline in biodiversity. Protect{ing} endangered species and restor{ing} natural habitats are crucial steps in ensur{ing} a sustainable future for both nature and humanity.",
  // 32. The Vikings
  "The Vikings were seafaring people from Scandinavia who raided and traded across Europe from the late eighth to late eleventh centuries. They were skilled shipbuil{ders} and naviga{tors}, reach{ing} as far as North America and the Middle East. While often depicted as fierce warriors, the Vikings were also farmers, traders, and crafts{people}. They established settle{ments} in Iceland, Greenland, and parts of Britain and France. Their legacy lives on through the Old Norse language, which influenced modern English, and their rich mytho{logy} and sagas that continue to fascinate people today.",
  // 33. History of Flight
  "The history of flight began with early attempts to mimic the birds. In 1903, Orville and Wilbur Wright achieved the first powered, controlled flight of a heavier-than-air aircraft. This break{through} paved the way for the rapid develop{ment} of aviation technology. During the twentieth century, aeroplanes became faster, larger, and more efficient, revolu{tionising} travel and warfare. The introduc{tion} of jet engines further trans{formed} the industry, allow{ing} for non-stop flights across oceans. Today, aviation is a global industry, connect{ing} people and cultures while also fac{ing} challenges related to environmental impact.",
  // 34. The Taj Mahal
  "The Taj Mahal is an ivory-white marble mauso{leum} in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal. The monument is widely regarded as one of the most beautiful build{ings} in the world and a symbol of eternal love. It combines elements of Persian, Islamic, and Indian architec{tural} styles. Thousands of artisans and crafts{men} worked on its construction for over twenty years. Today, the Taj Mahal is a UNESCO World Heritage site and attracts millions of visitors from around the globe.",
  // 35. Quantum Physics
  "Quantum physics is the study of the smallest particles in the universe. It explores the beha{viour} of matter and energy at the atomic and subatomic levels. Unlike classical physics, quantum mechanics reveals a world of probabili{ties} and uncertainty. Concepts like wave-particle dual{ity} and entangle{ment} challenge our intuitive understand{ing} of reality. While complex, quantum physics has led to the develop{ment} of technolo{gies} like lasers, transis{tors}, and MRI scanners. As research continues, quantum comput{ing} promises to revolu{tionise} information processing and solve problems that are currently beyond our reach.",
  // 36. The American Revolution
  "The American Revolution was a colonial revolt that took place between 1765 and 1783. The thirteen American colonies over{threw} British rule to establish the United States of America. The conflict was driven by issues such as taxa{tion} without representa{tion} and the desire for greater autonomy. The Declara{tion} of Independence, adopted in 1776, articulated the principles of liberty and self-government. The revolu{tionary} war ended with the Treaty of Paris, in which Britain recognised American independence. The revolution had a profound impact on world history, inspir{ing} other movements for democracy and national sovereignty.",
  // 37. World War II
  "World War II was a global conflict that lasted from 1939 to 1945. It involved the vast major{ity} of the world's countries and two opposing military alliances: the Allies and the Axis. The war was charac{terised} by major events such as the Holocaust, the use of nuclear weapons, and the mobilisa{tion} of entire economies for the war effort. It resulted in an estimated 70 to 85 million fatali{ties}, making it the deadliest conflict in human history. The after{math} of the war led to the creation of the United Nations and the begin{ning} of the Cold War between the United States and the Soviet Union.",
  // 38. The Digital Age
  "The Digital Age is charac{terised} by the rapid shift from traditional industry to an economy based on information technology. It began with the inven{tion} of the personal computer and the rise of the Internet. This era has trans{formed} every aspect of human life, from how we work and learn to how we social{ise} and entertain ourselves. The widespread adop{tion} of smartphones and mobile apps has made information and services available at our finger{tips}. However, the Digital Age also presents challen{ges} such as the digital divide, data privacy concerns, and the impact of automation on the future of work.",
  // 39. Sustainable Farming
  "Sustainable farming aims to produce food while protect{ing} the environment and ensur{ing} the well-being of future genera{tions}. It involves practices such as crop rota{tion}, organic fertilisa{tion}, and integrated pest management. By reduc{ing} the use of synthetic chemicals and conserv{ing} water, sustainable farmers help maintain soil health and biodiver{sity}. This approach also emphasizes the importance of animal welfare and fair labour practices. As the global popula{tion} continues to grow, sustainable farming is essential for ensur{ing} food secur{ity} and mitigat{ing} the environmental impact of agriculture on our planet.",
  // 40. The Periodic Table
  "The periodic table is a tabular display of the chemical elements. It was first developed by Dmitri Mendeleev in 1869 to organ{ise} elements based on their atomic mass and proper{ties}. The table allows chemists to predict the beha{viour} of elements and their interac{tions} with one another. Elements are arranged in rows called periods and columns called groups. This organisa{tion} reveals patterns such as reacti{vity} and electronegati{vity}. The periodic table is a fundamental tool in chemistry, provid{ing} a framework for understand{ing} the building blocks of matter and the composi{tion} of the universe.",
  // 41. Ancient Maya
  "The Ancient Maya were a civilisa{tion} known for their advanced writing system, art, and architecture. They lived in the region that is now southern Mexico and Central America. The Maya developed a complex calen{dar} and made signi{ficant} contributions to mathematics and astronomy. Their cities featured impres{sive} pyramids, palaces, and ball courts. Despite the mysterious decline of their major cities, the Maya people and their culture continue to thrive in the region today. Explor{ing} Maya ruins provides a glimpse into a sophisti{cated} society that had a deep understand{ing} of the natural world and the cosmos.",
  // 42. The Steam Engine
  "The steam engine was a key driver of the Industrial Revolution. It uses the expan{sion} of steam to perform mechanical work. Early designs by Thomas Newcomen were improved upon by James Watt, making the engine more efficient and versa{tile}. Steam engines were used to power pumps in mines, machinery in facto{ries}, and eventually locomo{tives} and steamships. This break{through} revolu{tionised} transporta{tion} and industry, allow{ing} for the mass movement of goods and people. The legacy of the steam engine lives on in modern turbines used to generate electri{city} in power plants around the world.",
  // 43. Globalisation
  "Globalisation is the process of increas{ing} interconnec{tedness} and interdepen{dence} among countries. It involves the exchange of goods, services, technolo{gy}, and culture on a global scale. While it has led to economic growth and the spread of ideas, globalisation also raises concerns about inequali{ty} and the loss of local identi{ties}. Interna{tional} trade agreements and the rise of multina{tional} corporations have played a major role in this process. Navigat{ing} the challen{ges} of globalisation requires coopera{tion} and a commitment to ensur{ing} that its benefits are shared more equit{ably} across the globe.",
  // 44. The Human Brain
  "The human brain is the most complex organ in the body. It serves as the centre of the nervous system, coordi{nating} our thoughts, emotions, and actions. The brain is divided into different regions, each with specific func{tions} such as memory, language, and sensory percep{tion}. Neurons communi{cate} through electrical and chemical signals, form{ing} vast networks that allow us to learn and adapt. Despite decades of research, many mysteries of the brain remain, includ{ing} the nature of conscious{ness} and the causes of various neurologi{cal} disorders. Explor{ing} the brain is one of the greatest frontiers of modern science.",
  // 45. History of Cinema
  "The history of cinema began in the late nineteenth century with the inven{tion} of motion pictures. Pioneers like the Lumière brothers and Georges Méliès developed ways to capture and project moving images. The early 'silent era' gave way to 'talkies' in the 1920s, revolu{tionising} the industry. Over the decades, cinema has evolved with the introduc{tion} of colour, special effects, and digital technolo{gy}. Today, movies are a major form of entertainment and artistic expression, reflect{ing} the social and cultural shifts of their time. The rise of stream{ing} platforms has further trans{formed} how we consume and experience films globally.",
  // 46. The Antarctic
  "The Antarctic is the Earth's southernmost continent and home to the South Pole. It is the coldest, driest, and windiest place on the planet, covered by a massive ice sheet. Despite its harsh condi{tions}, the Antarctic supports unique wildlife such as penguins, seals, and whales. The continent is a vital site for scientific research, with interna{tional} stations study{ing} climate change, astronomy, and geolo{gy}. The Antarctic Treaty ensures that the region remains a peaceful zone dedicated to science and conser{vation}. Protect{ing} this pristine environment is essential for maintain{ing} global climate stabil{ity} and biodiver{sity}.",
  // 47. Genetic Engineering
  "Genetic engineering involves modify{ing} the DNA of an organ{ism} to achieve desired traits. This technology has applica{tions} in medicine, agriculture, and industry. In medicine, it can be used to treat genetic disorders and produce therapeu{tic} proteins. In agriculture, geneti{cally} modified crops can be engineered to be resistant to pests or tolerant of harsh environ{ments}. While it offers many benefits, genetic engineering also raises ethical and environmental concerns about the potential for unin{tended} consequences. As the field continues to advance, careful regula{tion} and public dialogue are essential to ensure its safe and responsible use.",
  // 48. The Middle Ages
  "The Middle Ages was a period of European history last{ing} from the fifth to the fifteenth century. It began with the fall of the Western Roman Empire and merged into the Renaissance. This era is often charac{terised} by feudalism, the rise of the Catholic Church, and the construc{tion} of magnificent cathe{drals}. It was also a time of signi{ficant} events such as the Crusades and the Black Death. Despite being sometimes called the 'Dark Ages', the Middle Ages saw the found{ing} of the first universi{ties} and the develop{ment} of rich litera{ry} and artistic tradi{tions} that laid the groundwork for modern Europe.",
  // 49. Urban Planning
  "Urban planning is the process of design{ing} and organ{ising} the physical layout of cities. It involves balanc{ing} the needs of residents, businesses, and the environment to create functional and sustainable communi{ties}. Planners consider factors such as transporta{tion} networks, hous{ing} availabil{ity}, and green spaces. Effective urban planning can improve the quali{ty} of life by reduc{ing} traffic conges{tion} and promot{ing} public health. As the world's popula{population} becomes increas{ingly} urbanised, planners face new challen{ges} related to climate resilience and social equity. Innova{tive} solutions are needed to build the cities of the future.",
  // 50. The Hubble Telescope
  "The Hubble Space Telescope has revolu{tionised} our understand{ing} of the cosmos. Since its launch in 1990, it has captured stun{ning} images of distant galaxies, nebulae, and star-form{ing} regions. Hubble's observa{tions} have helped scientists determine the age of the universe and confirm the existence of supermassive black holes. By provid{ing} a clear view of the heavens without the distor{tion} of Earth's atmosphere, it has allowed for unprece{dented} scientific discoveries. The telescope's legacy continues to inspire wonder and curiosity about the vastness of space and our place with{in} the ever-expand{ing} universe.",
  // 51. Music (From image)
  "Music is a universal phenomenon across all human cultures. Often consi{dered} a “lang{uage} of emo{tions}”, music all{ows} people t{o} express feel{ings} that mi{ght} be ha{rd} to con{vey} with wo{rds} alone. Music also strengthens feelings of unity within groups and is a significant part of cultural identity. It reflects the history, traditions, and values of a community. Studying music history helps us appreciate the cultural context in which different pieces were created and how they influenced society and subsequent musical trends.",
  // 52. Conservation Ecology (From image)
  "The field of conservation ecology focuses on the preservation and management of biodiversity and ecosystems. Conservation ecologists st{udy} the intera{ctions} between orga{nisms} and their enviro{nment} to dev{elop} strategies th{at} mitigate t{he} adverse eff{ects} of hu{man} activity. Su{ch} efforts include habitat restoration, species protection, and sustainable resource use. By understanding ecological dynamics and the factors that threaten biodiversity, conservation efforts aim to maintain ecological balance and ensure the longevity of natural habitats for future generations.",
  // 53. Early Human Societies (From image)
  "Early human societies organized themselves into various configurations to meet their needs for survival and cooperation. These gro{ups} often feat{ured} hierarchical struc{tures} influenced b{y} factors li{ke} age, gen{der}, or sk{ills}. Social un{its} such a{s} families, clans, a{nd} tribes collaborated in essential activities including hunting, gathering, and toolmaking. Archaeological evidence—from sources such as dwellings and artifacts—helps researchers reconstruct these social systems and understand how early communities adapted to their environments.",
  // 54. Black Holes
  "Black holes are regions of space where gravity is so strong that no{thing}, not even light, can escape. They form when massive stars col{lapse} under their own weight at the end of their li{fecycle}. At the center of a black hole lies a singu{larity}, a point of infinite density. Surrounding this is the event hori{zon}, the boundary beyond which escape is impos{sible}. Astronomers st{udy} black holes by observing their effect on nearby stars and gas, as well as the radiation emi{tted} from material falling into them. These mysterious objects chal{lenge} our basic understand{ing} of time and space.",
  // 55. The Silk Road
  "The Silk Road was an ancient network of trade routes that con{nected} the East and the West. For centuries, it facilitated the exchange of goods like silk, spices, and tea, but its impact went far beyond comm{erce}. It was a conduit for the spread of technol{ogies}, religions, and art{istic} styles between diverse civilisa{tions}. Travelers and merchants encoun{tered} new ideas and customs, lead{ing} to significant cultural cross-pollination. The route spanned thousands of miles across rugged deserts and mountain ran{ges}, requir{ing} immense endurance from those who traversed it. Today, it remains a symbol of global intercon{nectedness}.",
  // 56. Microplastics
  "Microplastics are tiny plastic particles less than five milli{metres} in length that enviro{nmentalists} consider a major pollutant. They originate from various sour{ces}, including the break{down} of larger plastic waste and the shedding of synthetic fibres from clothing. These particles are now found in every corner of the globe, from the deepest oceans to the remo{test} mountain peaks. Marine life often mista{kes} microplastics for food, which can lead to physical harm and the accumulation of toxins in the food chain. Re{ducing} our reliance on single-use plastics is cru{cial} to mitigate this pervasive environmental threat.",
  // 57. The Renaissance
  "The Renaissance was a period of intense cultural, artis{tic}, and intellectual rebirth in Europe. Span{ning} roughly from the fourteenth to the seventeenth cen{tury}, it marked the transition from the Middle Ages to moder{nity}. Scholars redis{covered} classical Greek and Roman texts, lead{ing} to a surge in human{ism} and scientific inquiry. Iconic artists such as Leonardo da Vinci and Michelangelo pio{neered} new techniques in painting and sculp{ture}, emphasizing realism and perspective. The inven{tion} of the printing press during this time fundamen{tally} changed how information was dissemi{nated}, fueling the rapid spread of revolutionary ideas.",
  // 58. Plate Tectonics
  "The theory of plate tectonics describes how the Earth's outer shell is div{ided} into several large plates that glide over the mantle. These plates are constantly mov{ing}, albeit very slowly, driven by heat from the Earth's core. The interac{tion} at plate bound{aries} is responsible for most geolo{gical} activity, including earthquakes, volcanic eruptions, and the for{mation} of mountain ranges. For example, when two plates coll{ide}, they can push up the crust to create massive peaks like the Himalayas. Understan{ding} tectonic movements helps scientists predict natural disas{ters} and explains the current map of our continents.",
  // 59. Cognitive Dissonance
  "Cognitive dissonance is a psychological pheno{menon} that occurs when a person holds contra{dictory} beliefs or values. This inconsistency creates a state of mental discom{fort}, leading the individual to seek ways to resolve the tension. Often, they will change their atti{tude} or justify their behaviour to regain inter{nal} consistency. For instance, someone who smokes despite know{ing} it is unhealthy might down{play} the risks to reduce their anxiety. Studying how people manage dissonance provides insights into human motiv{ation} and the complex mech{anisms} of self-justification in daily life.",
  // 60. The Abyss
  "The abyssal zone is the layer of the ocean between three thousand and six thousand metres deep, where perpetual dark{ness} prevails. Tempe{ratures} are near freezing, and the pressure is immen{se}, yet a variety of specialized creatures thrive in this harsh enviro{nment}. Most deep-sea organisms rely on 'marine snow'—organic material falling from the surface—for nutri{tion}. Others live near hydrothermal vents, where they harness chemical energy through a process called chemo{synthesis}. Explo{ring} the abyss requires advanced submersi{bles}, as the conditions are extreme{ly} challenging for human technology. Every mission reveals extraor{dinary} new species and geological features.",
  // 61. Language Acquisition
  "Language acquisition is the process by which humans acquire the capa{city} to perceive and comprehend language. Children typically learn their first language without formal instruc{tion}, simply by being exposed to it in their environ{ment}. This remark{able} ability sugg{ests} that the human brain is biol{ogically} predisposed to process linguistic structures. Research focuses on how infa{nts} distinguish sounds and gradually master complex gramma{tical} rules. While adults can learn new languages, they often find it more diffi{cult} to achieve native-like fluen{cy} compared to young learners, a concept known as the 'critical period' hypothesis.",
  // 62. Sustainable Design
  "Modern architecture is increasingly focus{ing} on sustainability and environ{mental} impact. Sustainable design seeks to minimize the carbon foot{print} of buildings by using energy-effi{cient} materials and renewable power sources. Features like green roofs, which are covered with vegeta{tion}, provide natural insula{tion} and reduce urban heat. Architects also incorpo{rate} passive solar heating and natural ventila{tion} to lower reliance on artificial systems. By integra{ting} nature with the built enviro{nment}, sustainable architecture aims to create healthier spaces for inhabi{tants} while protec{ting} the planet's resour{ces} for future generations.",
  // 63. Photosynthesis
  "Photosynthesis is the funda{mental} process through which green plants convert sunlight into chemical energy. Using chloro{phyll}, plants absorb light energy to transform water and carbon dioxide into glucose and oxygen. This process is cru{cial} for life on Earth, as it provides the primary source of food for nearly all ecosys{tems}. Furthermore, the oxygen released as a bypro{duct} is essential for the respiration of animals and humans. Botanists st{udy} how different environmental factors, such as light inten{sity} and moisture levels, affect the effici{ency} of photosynthesis. Understanding this process is vital for improving crop yields and addressing global food security."
];

// --- Types ---
interface Blank {
  id: string;
  answer: string;
  userValue: string;
}

interface ParagraphPart {
  type: 'text' | 'blank';
  content: string;
  blankId?: string;
}

interface ParagraphData {
  id: number;
  parts: ParagraphPart[];
  blanks: Record<string, Blank>;
  source?: 'official' | 'custom';
  sourceId?: string;
}

interface VocabItem {
  text: string;
  source: 'official' | 'custom';
  sourceId?: string;
}

// --- Helper Functions ---
const parseParagraph = (text: string, id: number, source: 'official' | 'custom' = 'official', sourceId?: string): ParagraphData => {
  const parts: ParagraphPart[] = [];
  const blanks: Record<string, Blank> = {};
  let currentPos = 0;
  const regex = /\{([^}]+)\}/g;
  let match;
  let blankCounter = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > currentPos) {
      parts.push({ type: 'text', content: text.substring(currentPos, match.index) });
    }
    const blankId = `p${id}-b${blankCounter++}`;
    const answer = match[1];
    parts.push({ type: 'blank', content: '', blankId });
    blanks[blankId] = { id: blankId, answer, userValue: '' };
    currentPos = regex.lastIndex;
  }

  if (currentPos < text.length) {
    parts.push({ type: 'text', content: text.substring(currentPos) });
  }

  return { id, parts, blanks, source, sourceId };
};

const chunk = <T,>(arr: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

// --- Main Component ---
// --- Components ---

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-col items-center select-none relative py-2 ${className}`}>
    <div className="flex items-baseline gap-1 relative z-10">
      <motion.span 
        initial={{ rotate: -15, scale: 0.9 }}
        animate={{ rotate: -12, scale: 1 }}
        className="text-brand-red font-script text-4xl -mb-3 z-20 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]"
      >
        Let's
      </motion.span>
      <motion.span 
        initial={{ rotate: 5, scale: 0.9 }}
        animate={{ rotate: 2, scale: 1 }}
        className="text-brand-blue font-display text-7xl font-black tracking-tighter uppercase" 
        style={{ WebkitTextStroke: '2px black', textShadow: '4px 4px 0 #000' }}
      >
        Talk
      </motion.span>
    </div>
    <motion.div 
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-brand-yellow px-6 py-1 rounded-xl border-neo -mt-1 shadow-neo-sm -rotate-1 relative z-0"
    >
      <span className="text-black font-display text-sm font-bold uppercase tracking-widest">English Club</span>
    </motion.div>
    
    {/* Decorative Stars */}
    <div className="absolute -top-2 -right-4 text-black opacity-20 rotate-12">
      <Globe size={24} />
    </div>
    <div className="absolute bottom-0 -left-6 text-black opacity-20 -rotate-12">
      <PenTool size={20} />
    </div>
  </div>
);

export default function App() {
  const { user, profile, loading, isAdmin } = useAuth();
  const [isAdminView, setIsAdminView] = useState(false);

  // --- Global Navigation State ---
  const [activeTab, setActiveTab] = useState<'menu' | 'section1' | 'section2' | 'section3' | 'credits'>(() => {
    const saved = localStorage.getItem('toefl_active_tab');
    return (saved as any) || 'menu';
  });
  
  const [customTasks, setCustomTasks] = useState<any[]>([]);

  // Filter States
  const [s1Filter, setS1Filter] = useState<'all' | 'answered' | 'unanswered'>('all');
  const [s2Filter, setS2Filter] = useState<'all' | 'answered' | 'unanswered' | 'official' | 'custom'>('all');
  const [s3Filter, setS3Filter] = useState<'all' | 'answered' | 'unanswered' | 'official' | 'custom'>('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isTasksLoading, setIsTasksLoading] = useState(true);

  // centralized fetching
  useEffect(() => {
    if (!user) {
      setIsTasksLoading(false);
      return;
    }
    const q = query(collection(db, 'customTasks'));
    const unsub = onSnapshot(q, (snap) => {
      setCustomTasks(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setIsTasksLoading(false);
    }, (error) => {
      console.error("Error fetching custom tasks:", error);
      setIsTasksLoading(false);
    });
    return () => unsub();
  }, [user]);

  // Derived states
  const everydayTasks = useMemo(() => {
    const staticTasks = EVERYDAY_DATA.map(t => ({ ...t, source: 'official' as const }));
    const dynamicTasks = customTasks
      .filter(t => t.category === 'everyday')
      .map(t => ({ id: t.id, ...t, source: 'custom' as const }));
    return [...staticTasks, ...dynamicTasks] as (EverydayTask & { source: 'official' | 'custom' })[];
  }, [customTasks]);

  const academicArticles = useMemo(() => {
    const staticArticles = ACADEMIC_DATA.map(a => ({ ...a, source: 'official' as const }));
    const assistantArticles = MORE_ACADEMIC_DATA.map(a => ({ ...a, source: 'custom' as const }));
    const dynamicArticles = customTasks
      .filter(t => t.category === 'academic')
      .map(t => ({ id: t.id, ...t, source: 'custom' as const }));
    return [...staticArticles, ...assistantArticles, ...dynamicArticles] as (AcademicArticle & { source: 'official' | 'custom' })[];
  }, [customTasks]);

  const fillInBlanksData = useMemo(() => {
    const staticVocab = RAW_DATA.map(text => ({ text, source: 'official' as const }));
    const dynamicVocab = customTasks
      .filter(t => t.category === 'vocabulary')
      .flatMap(task => {
        let texts: string[] = [];
        if (Array.isArray(task.content)) texts = task.content;
        else if (task.content && task.content.items) texts = task.content.items;
        else texts = [task.title];
        return texts.map(text => ({ text, source: 'custom' as const, sourceId: task.id }));
      });
    return [...staticVocab, ...dynamicVocab] as VocabItem[];
  }, [customTasks]);
  const [isRequestingCredits, setIsRequestingCredits] = useState(false);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [pendingRequestId, setPendingRequestId] = useState<string | null>(null);
  const [isCancellingRequest, setIsCancellingRequest] = useState(false);

  const EmptyState = ({ message }: { message: string }) => (
    <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-4 w-full">
      <div className="bg-white p-8 rounded-full border-neo-lg shadow-neo-lg">
        <Database size={48} className="text-gray-200" />
      </div>
      <div>
        <h3 className="text-xl font-black uppercase tracking-tight font-display text-gray-800">No tasks found</h3>
        <p className="text-gray-500 font-bold max-w-xs mx-auto">{message}</p>
      </div>
    </div>
  );

  const LoadingState = ({ colorClass = "text-brand-blue" }: { colorClass?: string }) => (
    <div className="col-span-full py-20 flex flex-col items-center justify-center space-y-4 w-full">
      <Loader2 size={48} className={`animate-spin ${colorClass}`} />
      <p className="font-black uppercase tracking-widest text-[10px] text-gray-400">Fetching latest tasks...</p>
    </div>
  );

  // --- Section 1 State (Fill in the blanks) ---
  const [section1View, setSection1View] = useState<'home' | 'practice'>(() => {
    const saved = localStorage.getItem('toefl_section1_view');
    return (saved as any) || 'home';
  });

  // --- Section 2 State (Everyday Reading) ---
  const [section2View, setSection2View] = useState<'home' | 'practice' | 'results'>(() => {
    const saved = localStorage.getItem('toefl_section2_view');
    return (saved as any) || 'home';
  });
  const [currentEverydayIdx, setCurrentEverydayIdx] = useState(0);
  const [currentEverydayQuestionIdx, setCurrentEverydayQuestionIdx] = useState(0);
  const [everydayAnswers, setEverydayAnswers] = useState<Record<string, number>>({});
  const [showEverydayFeedback, setShowEverydayFeedback] = useState<Record<string, boolean>>({});
  
  // --- Section 3 State (Academic Reading) ---
  const [section3View, setSection3View] = useState<'home' | 'practice' | 'results'>(() => {
    const saved = localStorage.getItem('toefl_section3_view');
    return (saved as any) || 'home';
  });
  const [currentAcademicIdx, setCurrentAcademicIdx] = useState(0);
  const [currentAcademicQuestionIdx, setCurrentAcademicQuestionIdx] = useState(0);
  const [academicAnswers, setAcademicAnswers] = useState<Record<string, number>>({});
  const [showAcademicFeedback, setShowAcademicFeedback] = useState<Record<string, boolean>>({});

  // --- Timer State ---
  const [isTimedMode, setIsTimedMode] = useState(() => {
    const saved = localStorage.getItem('toefl_timed_mode');
    return saved === 'true';
  });
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [finalTime, setFinalTime] = useState<number | null>(null);

  useEffect(() => {
    let interval: any;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    localStorage.setItem('toefl_timed_mode', isTimedMode.toString());
  }, [isTimedMode]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Parse all data
  const allParagraphs = useMemo(() => {
    // Combine RAW_DATA (static) with fillInBlanksData (dynamic/custom)
    const combinedRaw = [...fillInBlanksData];
    return combinedRaw.map((item, index) => parseParagraph(item.text, index + 1, item.source, item.sourceId));
  }, [fillInBlanksData]);

  // Group into sets of 5
  const sets = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < allParagraphs.length; i += 5) {
      chunks.push(allParagraphs.slice(i, i + 5));
    }
    return chunks;
  }, [allParagraphs]);

  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(() => {
    const saved = localStorage.getItem('toefl_current_para');
    if (!saved) return 0;
    const parsed = parseInt(saved, 10);
    return isNaN(parsed) ? 0 : parsed;
  });
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('toefl_answers');
    return saved ? JSON.parse(saved) : {};
  });
  const [completedSets, setCompletedSets] = useState<number[]>(() => {
    const saved = localStorage.getItem('toefl_completed_sets');
    return saved ? JSON.parse(saved) : [];
  });
  const [cumulativeScore, setCumulativeScore] = useState(() => {
    const saved = localStorage.getItem('toefl_score');
    if (!saved) return 0;
    const parsed = parseInt(saved, 10);
    return isNaN(parsed) ? 0 : parsed;
  });
  const [totalBlanksAttempted, setTotalBlanksAttempted] = useState(() => {
    const saved = localStorage.getItem('toefl_blanks_attempted');
    if (!saved) return 0;
    const parsed = parseInt(saved, 10);
    return isNaN(parsed) ? 0 : parsed;
  });

  // --- Persistence Effects ---
  useEffect(() => {
    localStorage.setItem('toefl_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('toefl_section1_view', section1View);
  }, [section1View]);

  useEffect(() => {
    localStorage.setItem('toefl_section2_view', section2View);
  }, [section2View]);

  useEffect(() => {
    localStorage.setItem('toefl_section3_view', section3View);
  }, [section3View]);

  useEffect(() => {
    localStorage.setItem('toefl_academic_idx', currentAcademicIdx.toString());
  }, [currentAcademicIdx]);

  useEffect(() => {
    localStorage.setItem('toefl_academic_answers', JSON.stringify(academicAnswers));
  }, [academicAnswers]);

  useEffect(() => {
    localStorage.setItem('toefl_current_para', currentParagraphIndex.toString());
  }, [currentParagraphIndex]);

  useEffect(() => {
    localStorage.setItem('toefl_answers', JSON.stringify(userAnswers));
  }, [userAnswers]);

  useEffect(() => {
    localStorage.setItem('toefl_completed_sets', JSON.stringify(completedSets));
  }, [completedSets]);

  useEffect(() => {
    localStorage.setItem('toefl_score', cumulativeScore.toString());
    localStorage.setItem('toefl_blanks_attempted', totalBlanksAttempted.toString());
  }, [cumulativeScore, totalBlanksAttempted]);

  // --- Credit Logic ---
  const [redeemKey, setRedeemKey] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showCreditModal, setShowCreditModal] = useState(false);

  useEffect(() => {
    if (!user) return;

    // Check for pending requests reactively
    const q = query(
      collection(db, 'requests'), 
      where('userId', '==', user.uid), 
      where('status', '==', 'pending'),
      limit(1)
    );
    
    const unsub = onSnapshot(q, (snap) => {
      if (!snap.empty) {
        setHasPendingRequest(true);
        setPendingRequestId(snap.docs[0].id);
      } else {
        setHasPendingRequest(false);
        setPendingRequestId(null);
      }
    }, (err) => console.error("Error checking pending requests:", err));

    return () => unsub();
  }, [user]);

  const consumeCredits = async (section: number) => {
    if (!profile) return false;
    const cost = section === 1 ? 20 : 10;
    
    if (profile.credits < cost) {
      setShowCreditModal(true);
      return false;
    }
    try {
      await updateDoc(doc(db, 'users', profile.userId), {
        credits: increment(-cost),
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${profile.userId}`);
      return false;
    }
  };

  const handleRedeem = async () => {
    if (!redeemKey.trim() || !user) return;
    setIsRedeeming(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const q = query(collection(db, 'keys'), where('key', '==', redeemKey.trim().toUpperCase()), where('used', '==', false));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        setErrorMsg('Invalid or already used key.');
      } else {
        const keyDoc = snapshot.docs[0];
        const keyValue = keyDoc.data().value;
        
        // 1. Mark key as used
        await updateDoc(keyDoc.ref, {
          used: true,
          usedBy: user.uid,
          updatedAt: serverTimestamp()
        });
        
        // 2. Add credits to user
        await updateDoc(doc(db, 'users', user.uid), {
          credits: increment(keyValue),
          updatedAt: serverTimestamp()
        });
        
        setSuccessMsg(`Successfully redeemed ${keyValue} credits!`);
        setRedeemKey('');
      }
    } catch (error) {
      setErrorMsg('Redemption failed. Try again.');
      handleFirestoreError(error, OperationType.WRITE, 'redeem_key');
    }
    setIsRedeeming(false);
  };

  const cancelRequest = async () => {
    if (!user || !pendingRequestId || isCancellingRequest) return;
    setIsCancellingRequest(true);
    setErrorMsg('');
    try {
      await deleteDoc(doc(db, 'requests', pendingRequestId));
      setHasPendingRequest(false);
      setPendingRequestId(null);
      setSuccessMsg('Request cancelled successfully.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      setErrorMsg('Failed to cancel request.');
      handleFirestoreError(error, OperationType.DELETE, 'requests');
    } finally {
      setIsCancellingRequest(false);
    }
  };
  const requestCredits = async () => {
    if (!user || isRequestingCredits || hasPendingRequest) return;
    setIsRequestingCredits(true);
    setErrorMsg('');
    
    try {
      // Final guard: check for pending request again
      const q = query(
        collection(db, 'requests'), 
        where('userId', '==', user.uid), 
        where('status', '==', 'pending'),
        limit(1)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        setHasPendingRequest(true);
        setErrorMsg('You already have a pending request.');
        setIsRequestingCredits(false);
        return;
      }

      const docRef = await addDoc(collection(db, 'requests'), {
        userId: user.uid,
        userEmail: user.email,
        amount: 100,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setHasPendingRequest(true);
      setPendingRequestId(docRef.id);
      setSuccessMsg('Request sent! Admin will review it shortly.');
      setTimeout(() => {
        setShowCreditModal(false);
        setSuccessMsg('');
      }, 2000);
    } catch (error) {
      setErrorMsg('Request failed. You might already have a pending request.');
      handleFirestoreError(error, OperationType.CREATE, 'requests');
    } finally {
      setIsRequestingCredits(false);
    }
  };

  const GlobalHeader = () => (
    <div className="bg-white border-b-4 border-black px-3 xs:px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-2 xs:gap-4 sm:gap-8">
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-1 sm:p-2 hover:bg-gray-100 rounded-xl transition-colors border-2 border-black"
        >
          <Menu size={18} className="sm:w-5 sm:h-5" />
        </button>

        <div className="cursor-pointer" onClick={() => { setActiveTab('menu'); setIsAdminView(false); }}>
          <Logo className="scale-50 xs:scale-60 sm:scale-75 -my-4 sm:-my-2" />
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-4">
          <button 
            onClick={() => { setActiveTab('menu'); setIsAdminView(false); }}
            className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'menu' && !isAdminView ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
          >
            Home
          </button>
          <button 
            onClick={() => { setActiveTab('credits'); setIsAdminView(false); }}
            className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'credits' && !isAdminView ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
          >
            Shop
          </button>
          {isAdmin && (
            <button 
              onClick={() => setIsAdminView(true)}
              className={`px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${isAdminView ? 'bg-brand-red text-white' : 'text-brand-red hover:bg-red-50'}`}
            >
              <Shield size={14} /> Admin
            </button>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-1 xs:gap-2 sm:gap-4">
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 z-[100] lg:hidden backdrop-blur-sm"
              />
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[110] lg:hidden border-r-4 border-black p-6 flex flex-col gap-8"
              >
                <div className="flex items-center justify-between">
                  <Logo className="scale-60 -ml-4" />
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors border-2 border-black shadow-neo-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none bg-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                <nav className="flex flex-col gap-4">
                  <button 
                    onClick={() => { setActiveTab('menu'); setIsAdminView(false); setIsMobileMenuOpen(false); }}
                    className={`w-full text-left px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border-neo transition-all ${activeTab === 'menu' && !isAdminView ? 'bg-black text-white shadow-neo' : 'bg-white hover:bg-gray-50 shadow-neo-sm'}`}
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => { setActiveTab('credits'); setIsAdminView(false); setIsMobileMenuOpen(false); }}
                    className={`w-full text-left px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border-neo transition-all ${activeTab === 'credits' && !isAdminView ? 'bg-black text-white shadow-neo' : 'bg-white hover:bg-gray-50 shadow-neo-sm'}`}
                  >
                    Shop
                  </button>
                  {isAdmin && (
                    <button 
                      onClick={() => { setIsAdminView(true); setIsMobileMenuOpen(false); }}
                      className={`w-full text-left px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border-neo transition-all flex items-center gap-3 ${isAdminView ? 'bg-brand-red text-white shadow-neo' : 'bg-white text-brand-red hover:bg-red-50 shadow-neo-sm'}`}
                    >
                      <Shield size={16} /> Admin Panel
                    </button>
                  )}
                </nav>

                <div className="mt-auto pt-8 border-t-2 border-gray-100">
                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase text-gray-400 leading-none mb-1">Logged in as</p>
                    <p className="font-bold text-xs leading-tight truncate">{profile?.email}</p>
                  </div>
                  <button 
                    onClick={() => { signOut(auth); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-brand-red border-neo bg-white hover:bg-red-50 shadow-neo-sm"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-1 sm:gap-2 bg-gray-50 px-2 xs:px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl border-neo shadow-neo-sm">
          <Zap size={12} className="text-brand-red fill-brand-red xs:w-4 xs:h-4" />
          <span className="font-display font-black text-sm xs:text-base sm:text-xl">{profile?.credits || 0}</span>
          <button 
            onClick={() => setShowCreditModal(true)}
            className="ml-1 sm:ml-2 bg-black text-white p-0.5 xs:p-1 rounded-lg hover:scale-110 transition-transform"
          >
            <Plus size={10} strokeWidth={4} className="xs:w-3.5 xs:h-3.5" />
          </button>
        </div>
        
        <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 pl-1.5 xs:pl-2 sm:pl-4 border-l-2 border-gray-100">
          <div className="hidden sm:block text-right">
            <p className="text-[8px] sm:text-[10px] font-black uppercase text-gray-400 leading-none">Logged in</p>
            <p className="font-bold text-[10px] sm:text-sm leading-tight max-w-[80px] sm:max-w-[120px] truncate">{profile?.email}</p>
          </div>
          <button 
            onClick={() => signOut(auth)}
            className="p-1 sm:p-2 text-gray-400 hover:text-brand-red transition-colors"
          >
            <LogOut size={14} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  const CreditModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full bg-white rounded-3xl border-neo-lg shadow-neo-lg p-6 sm:p-10 relative"
      >
        <button 
          onClick={() => setShowCreditModal(false)}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 text-gray-400 hover:text-black"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-display mb-6">Refill Credits</h3>
        
        <div className="space-y-6">
          <div className="p-4 sm:p-6 bg-brand-yellow/10 rounded-2xl border-neo shadow-neo-sm">
            <p className="text-xs sm:text-sm font-bold text-gray-600 mb-4">Have a redeem key? Enter it below to get instant credits.</p>
            <div className="flex flex-col gap-2">
              <input 
                type="text" 
                placeholder="PROMO-CODE"
                value={redeemKey}
                onChange={(e) => setRedeemKey(e.target.value.toUpperCase())}
                className="w-full bg-white border-neo rounded-xl px-4 py-3 font-mono font-black placeholder:text-gray-300 focus:outline-none"
              />
              <button 
                onClick={handleRedeem}
                disabled={isRedeeming}
                className="w-full bg-black text-white px-6 py-4 rounded-xl border-neo shadow-neo font-black uppercase text-xs tracking-widest active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                Redeem
              </button>
            </div>
            {errorMsg && <p className="text-red-500 text-[10px] font-bold mt-2">{errorMsg}</p>}
            {successMsg && <p className="text-green-600 text-[10px] font-bold mt-2">{successMsg}</p>}
          </div>

          <div className="relative py-2 sm:py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-gray-100"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-black text-gray-300 bg-white px-4">or</div>
          </div>

          <div className="text-center space-y-4">
            <button 
              onClick={() => { setShowCreditModal(false); setActiveTab('credits'); }}
              className="w-full bg-brand-blue text-white py-4 rounded-2xl border-neo shadow-neo font-black uppercase tracking-widest hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} /> Visit Shop
            </button>
            
            <p className="text-[10px] font-black uppercase tracking-tight text-gray-400">
              {hasPendingRequest ? "You already have a pending request." : "Limited on funds? Request a refill:"}
            </p>
            <div className="space-y-2">
              <button 
                onClick={requestCredits}
                disabled={isRequestingCredits || hasPendingRequest}
                className={`w-full py-2 rounded-xl border-neo font-black uppercase text-[10px] tracking-widest transition-all ${
                  hasPendingRequest 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' 
                    : 'bg-white text-black hover:bg-gray-50'
                }`}
              >
                {isRequestingCredits ? (
                  <Loader2 size={14} className="animate-spin mx-auto" />
                ) : hasPendingRequest ? (
                  'Request Pending'
                ) : (
                  'Request 100 Free Credits'
                )}
              </button>
              
              {hasPendingRequest && (
                <button 
                  onClick={cancelRequest}
                  disabled={isCancellingRequest}
                  className="w-full py-2 rounded-xl border-2 border-red-500 text-red-500 hover:bg-red-50 font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  {isCancellingRequest ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <>Cancel Request <X size={12} /></>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const currentParagraph = allParagraphs[currentParagraphIndex];
  const currentSetIndex = Math.floor(currentParagraphIndex / 5);
  const currentSet = sets[currentSetIndex] || [];

  const currentParaCorrectCount = useMemo(() => {
    if (!showResults || !currentParagraph) return 0;
    let count = 0;
    Object.keys(currentParagraph.blanks).forEach(id => {
      const userVal = (userAnswers[id] || '').trim().toLowerCase();
      const correctVal = currentParagraph.blanks[id].answer.toLowerCase();
      if (userVal === correctVal) count++;
    });
    return count;
  }, [showResults, currentParagraph, userAnswers]);

  const totalBlanksInPara = currentParagraph ? Object.keys(currentParagraph.blanks).length : 0;

  const handleInputChange = (blankId: string, value: string) => {
    setUserAnswers(prev => ({ ...prev, [blankId]: value }));
  };

  const handleSubmit = () => {
    if (showResults || !currentParagraph) return;

    let correctCount = 0;
    const blankIds = Object.keys(currentParagraph.blanks);
    blankIds.forEach(id => {
      const userVal = (userAnswers[id] || '').trim().toLowerCase();
      const correctVal = currentParagraph.blanks[id].answer.toLowerCase();
      if (userVal === correctVal) {
        correctCount++;
      }
    });

    setCumulativeScore(prev => prev + correctCount);
    setTotalBlanksAttempted(prev => prev + blankIds.length);
    setShowResults(true);
    
    if (isTimerRunning) {
      setIsTimerRunning(false);
      setFinalTime(timerSeconds);
    }

    // Check if set is completed (all 5 paragraphs in set submitted)
    // For simplicity, we'll mark it completed if the last paragraph of the set is submitted
    // or if we want to be more precise, we could track per paragraph.
    // Let's just mark the set as "in progress" or "completed" based on the last one for now,
    // or track all paragraphs.
    const setParagraphs = sets[currentSetIndex];
    const isLastInSet = currentParagraphIndex % 5 === 4;
    if (isLastInSet && !completedSets.includes(currentSetIndex)) {
      setCompletedSets(prev => [...prev, currentSetIndex]);
    }
  };

  const handleNext = () => {
    if (currentParagraphIndex < allParagraphs.length - 1) {
      setCurrentParagraphIndex(prev => prev + 1);
      setShowResults(false);
    }
  };

  const handlePrev = () => {
    if (currentParagraphIndex > 0) {
      setCurrentParagraphIndex(prev => prev - 1);
      setShowResults(false);
    }
  };

  const handleSelectSet = async (setIdx: number) => {
    const ok = await consumeCredits(1);
    if (!ok) return;

    setCurrentParagraphIndex(setIdx * 5);
    setShowResults(false);
    setSection1View('practice');
    
    if (isTimedMode) {
      setTimerSeconds(0);
      setIsTimerRunning(true);
      setFinalTime(null);
    }
  };

  const handleGoHome = () => {
    setActiveTab('menu');
  };

  const handleAcademicSelect = async (idx: number) => {
    const ok = await consumeCredits(3);
    if (!ok) return;

    setCurrentAcademicIdx(idx);
    setCurrentAcademicQuestionIdx(0);
    setAcademicAnswers({});
    setShowAcademicFeedback({});
    setSection3View('practice');
    
    if (isTimedMode) {
      setTimerSeconds(0);
      setIsTimerRunning(true);
      setFinalTime(null);
    }
  };

  const handleAcademicAnswer = (qId: string, optIdx: number) => {
    if (showAcademicFeedback[qId]) return;
    setAcademicAnswers(prev => ({ ...prev, [qId]: optIdx }));
    setShowAcademicFeedback(prev => ({ ...prev, [qId]: true }));
  };

  const handleAcademicNext = () => {
    const article = ACADEMIC_DATA[currentAcademicIdx];
    if (currentAcademicQuestionIdx < article.questions.length - 1) {
      setCurrentAcademicQuestionIdx(prev => prev + 1);
    } else {
      if (isTimerRunning) {
        setIsTimerRunning(false);
        setFinalTime(timerSeconds);
      }
      setSection3View('results');
    }
  };

  const handleAcademicPrev = () => {
    if (currentAcademicQuestionIdx > 0) {
      setCurrentAcademicQuestionIdx(prev => prev - 1);
    }
  };

  const handleEverydaySelect = async (idx: number) => {
    const ok = await consumeCredits(2);
    if (!ok) return;

    setCurrentEverydayIdx(idx);
    setCurrentEverydayQuestionIdx(0);
    setEverydayAnswers({});
    setShowEverydayFeedback({});
    setSection2View('practice');
    
    if (isTimedMode) {
      setTimerSeconds(0);
      setIsTimerRunning(true);
      setFinalTime(null);
    }
  };

  const handleEverydayAnswer = (qId: string, optIdx: number) => {
    if (showEverydayFeedback[qId]) return;
    setEverydayAnswers(prev => ({ ...prev, [qId]: optIdx }));
    setShowEverydayFeedback(prev => ({ ...prev, [qId]: true }));
    
    // Check if it's the last question
    const task = everydayTasks[currentEverydayIdx];
    if (currentEverydayQuestionIdx === task.questions.length - 1) {
      if (isTimerRunning) {
        setIsTimerRunning(false);
        setFinalTime(timerSeconds);
      }
    }
  };

  const handleEverydayNext = () => {
    const task = everydayTasks[currentEverydayIdx];
    if (currentEverydayQuestionIdx < task.questions.length - 1) {
      setCurrentEverydayQuestionIdx(prev => prev + 1);
    } else {
      setSection2View('results');
    }
  };

  const handleEverydayFinish = () => {
    setSection2View('results');
  };

  const isSetNew = (index: number) => index >= 10;

  // --- Render Helpers ---

  const renderMainMenu = () => (
    <div className="min-h-screen bg-brand-bg bg-grid font-sans text-[#333] flex flex-col">
      <header className="py-12 sm:py-16 px-4 text-center flex flex-col items-center gap-6 sm:gap-8">
        <div className="scale-90 xs:scale-100 md:scale-125 mb-2 sm:mb-4">
          <Logo />
        </div>
        <div className="max-w-2xl px-4">
          <h1 className="text-3xl xs:text-4xl md:text-5xl font-black text-black uppercase tracking-tight mb-2 sm:mb-3 font-display">
            Master Your Reading
          </h1>
          <p className="text-base sm:text-xl font-bold text-gray-600">
            Interactive practice for TOEFL and everyday English.
          </p>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {/* Section 1 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => { setActiveTab('section1'); setSection1View('home'); }}
            className="cursor-pointer p-8 rounded-3xl border-neo-lg bg-white shadow-neo-lg flex flex-col items-center text-center gap-6 group"
          >
            <div className="bg-brand-blue p-6 rounded-2xl border-neo shadow-neo-sm group-hover:rotate-6 transition-transform">
              <PenTool size={40} className="text-white sticker" />
            </div>
            <div>
              <h3 className="text-3xl font-black uppercase tracking-tight font-display">Section 1</h3>
              <p className="text-sm font-bold text-gray-500 mt-1 uppercase tracking-widest">Vocabulary Building</p>
            </div>
            <p className="text-gray-600 font-medium">Complete missing letters in context-rich paragraphs to boost your spelling and word recognition.</p>
            <div className="mt-auto pt-6 flex items-center font-black text-brand-blue uppercase text-sm gap-2">
              Start Practice <div className="bg-brand-blue text-white p-1 rounded-full border-neo shadow-neo-sm"><ChevronRight size={16} /></div>
            </div>
          </motion.div>

          {/* Section 2 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => { setActiveTab('section2'); setSection2View('home'); }}
            className="cursor-pointer p-8 rounded-3xl border-neo-lg bg-white shadow-neo-lg flex flex-col items-center text-center gap-6 group"
          >
            <div className="bg-brand-yellow p-6 rounded-2xl border-neo shadow-neo-sm group-hover:-rotate-6 transition-transform">
              <Globe size={40} className="text-black sticker" />
            </div>
            <div>
              <h3 className="text-3xl font-black uppercase tracking-tight font-display">Section 2</h3>
              <p className="text-sm font-bold text-gray-500 mt-1 uppercase tracking-widest">Everyday Life</p>
            </div>
            <p className="text-gray-600 font-medium">Navigate real-world scenarios like schedules, emails, and forms to improve your practical reading skills.</p>
            <div className="mt-auto pt-6 flex items-center font-black text-brand-yellow uppercase text-sm gap-2">
              Start Practice <div className="bg-brand-yellow text-black p-1 rounded-full border-neo shadow-neo-sm"><ChevronRight size={16} /></div>
            </div>
          </motion.div>

          {/* Section 3 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => { setActiveTab('section3'); setSection3View('home'); }}
            className="cursor-pointer p-8 rounded-3xl border-neo-lg bg-white shadow-neo-lg flex flex-col items-center text-center gap-6 group"
          >
            <div className="bg-brand-red p-6 rounded-2xl border-neo shadow-neo-sm group-hover:rotate-6 transition-transform">
              <BookOpen size={40} className="text-white sticker" />
            </div>
            <div>
              <h3 className="text-3xl font-black uppercase tracking-tight font-display">Section 3</h3>
              <p className="text-sm font-bold text-gray-500 mt-1 uppercase tracking-widest">Academic Prep</p>
            </div>
            <p className="text-gray-600 font-medium">Tackle complex academic articles with multiple-choice questions designed for TOEFL preparation.</p>
            <div className="mt-auto pt-6 flex items-center font-black text-brand-red uppercase text-sm gap-2">
              Start Practice <div className="bg-brand-red text-white p-1 rounded-full border-neo shadow-neo-sm"><ChevronRight size={16} /></div>
            </div>
          </motion.div>
        </div>

        {/* New Credits Call-to-action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-white border-neo-lg rounded-[2.5rem] shadow-neo-lg overflow-hidden flex flex-col md:flex-row items-center cursor-pointer group"
          onClick={() => setActiveTab('credits')}
        >
          <div className="bg-brand-yellow p-10 md:p-14 flex items-center justify-center border-b-4 md:border-b-0 md:border-r-4 border-black group-hover:bg-brand-yellow/80 transition-colors">
            <Zap size={64} className="text-black fill-black/20 sticker" />
          </div>
          <div className="p-8 md:p-12 flex-grow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tight font-display mb-2">Refill Your Credits</h3>
                <p className="text-gray-500 font-bold">Vocabulary sets cost 20 credits, others cost 10. Get 100, 300, or 500 credits instantly.</p>
              </div>
              <div className="bg-black text-white px-8 py-4 rounded-2xl border-neo shadow-neo font-black uppercase tracking-widest flex items-center gap-3 group-hover:translate-x-2 transition-transform">
                Visit Shop <ArrowRight size={20} />
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );

  const FilterBar = ({ 
    activeFilter, 
    onFilterChange, 
    options, 
    colorClass = "bg-brand-blue" 
  }: { 
    activeFilter: string, 
    onFilterChange: (val: any) => void, 
    options: {label: string, value: string, icon?: React.ReactNode}[],
    colorClass?: string
  }) => (
    <div className="w-full flex justify-center mb-8 px-4">
      <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-white/50 backdrop-blur-md rounded-2xl border border-black/5 shadow-inner w-full max-w-[360px] sm:max-w-[400px]">
        {options.map((opt) => {
          const isActive = activeFilter === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onFilterChange(opt.value)}
              className={`w-[calc(33.333%-6px)] min-w-[90px] h-11 flex-shrink-0 rounded-xl font-bold uppercase tracking-tight text-[8px] sm:text-[9px] transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center relative group ${
                isActive 
                  ? `${colorClass} text-white shadow-neo border border-black -translate-y-0.5` 
                  : "bg-white text-black/40 hover:text-black border border-transparent hover:border-black/5"
              }`}
            >
              <div className="flex flex-col items-center justify-center gap-0.5 pointer-events-none w-full px-1">
                {opt.icon && React.cloneElement(opt.icon as React.ReactElement, { 
                  size: 13,
                  className: isActive ? "sticker-sm" : "text-gray-400 group-hover:text-black transition-colors"
                })}
                <span className="leading-tight truncate w-full text-center">{opt.label}</span>
              </div>
              {isActive && (
                <motion.div 
                  layoutId="activeFilterIndicator"
                  className="absolute inset-0 rounded-[10px] border border-white/20 pointer-events-none"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderSection1Home = () => {
    const answeredCount = completedSets.length; // This is actually sets, but close enough for filters
    // Better: filtered count based on what sets are completed
    
    const filteredSets = sets.map((set, idx) => ({ set, idx })).filter(({ idx }) => {
      const isCompleted = completedSets.includes(idx);
      if (s1Filter === 'answered') return isCompleted;
      if (s1Filter === 'unanswered') return !isCompleted;
      return true;
    });

    const totalVocabTasks = allParagraphs.length;
    const answeredVocabTasks = completedSets.reduce((acc, idx) => acc + (sets[idx]?.length || 0), 0);
    const totalVocabSets = sets.length;
    const answeredVocabSets = completedSets.length;

    return (
      <div className="min-h-screen bg-brand-bg bg-grid font-sans text-[#333] flex flex-col overflow-x-hidden">
        <header className="bg-white py-6 px-4 border-b-4 border-black flex flex-col gap-4 shadow-sm">
          <div className="w-full flex items-center justify-between sm:grid sm:grid-cols-3 sm:items-center relative">
            <div className="flex justify-start">
              <button 
                onClick={handleGoHome}
                className="flex items-center gap-1 text-black hover:text-brand-blue transition-colors font-black text-xs sm:text-sm bg-brand-yellow px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border-neo shadow-neo-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span>Menu</span>
              </button>
            </div>
            
            <div className="flex justify-center scale-75 sm:scale-90 md:scale-100 my-1">
              <Logo />
            </div>
            
            <div className="flex justify-end">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border-neo shadow-neo-sm">
                <span className="text-[9px] sm:text-xs font-black uppercase tracking-tight text-gray-400">Timed</span>
                <button 
                  onClick={() => setIsTimedMode(!isTimedMode)}
                  className={`w-9 h-4.5 sm:w-11 sm:h-5.5 rounded-full border-neo relative transition-colors ${isTimedMode ? 'bg-brand-blue' : 'bg-gray-200'}`}
                >
                  <motion.div 
                    animate={{ x: isTimedMode ? 20 : 0 }}
                    className="w-3.5 sm:w-4.5 h-3.5 sm:h-4.5 bg-white rounded-full border-neo absolute top-0.5 left-0.5"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center text-center px-4">
            <h1 className="text-xl xs:text-2xl sm:text-4xl font-black text-brand-blue uppercase tracking-tight mb-1 font-display" style={{ WebkitTextStroke: '0.5px black' }}>Section 1: Vocabulary</h1>
            <h2 className="text-xs sm:text-base font-bold text-gray-600 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              <span className="bg-brand-blue text-white px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-black">{totalVocabTasks}</span>
              {totalVocabTasks === 1 ? 'Task' : 'Tasks'} Available
              <span className="text-gray-300 mx-0.5">•</span>
              <span className="bg-green-600 text-white px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-black">{answeredVocabTasks}</span>
              Completed
            </h2>
          </div>
        </header>
  
        <main className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-20 text-center">
          <FilterBar 
            activeFilter={s1Filter}
            onFilterChange={setS1Filter as any}
            options={[
              { label: `All (${totalVocabTasks})`, value: 'all', icon: <Database size={14} /> },
              { label: `Done (${answeredVocabTasks})`, value: 'answered', icon: <CheckCircle2 size={14} /> },
              { label: `To-Do (${totalVocabTasks - answeredVocabTasks})`, value: 'unanswered', icon: <Clock size={14} /> }
            ]}
            colorClass="bg-brand-blue"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {isTasksLoading ? (
              <LoadingState colorClass="text-brand-blue" />
            ) : filteredSets.length === 0 ? (
              <EmptyState message={`No vocabulary sets match the "${s1Filter}" filter.`} />
            ) : (
              filteredSets.map(({ set, idx }) => {
                const isCompleted = completedSets.includes(idx);
                const hasCustom = set.some(p => p.source === 'custom');

                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4, scale: 1.02 }}
                    onClick={() => handleSelectSet(idx)}
                    className={`cursor-pointer p-8 rounded-3xl border-neo-lg transition-all flex flex-col justify-between h-56 shadow-neo-lg relative overflow-hidden ${
                      isCompleted 
                        ? 'bg-green-50' 
                        : (hasCustom ? 'bg-blue-50/30' : 'bg-white')
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                            {set.length} {set.length === 1 ? 'Vocab Task' : 'Vocab Tasks'}
                          </span>
                          {hasCustom && (
                            <span className="bg-black text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">
                              Custom
                            </span>
                          )}
                        </div>
                        {isCompleted && <CheckCircle2 className="text-green-600 sticker" size={28} />}
                      </div>
                      <h3 className="text-2xl font-black text-black mb-1 uppercase tracking-tight font-display">
                        {set.length > 1 ? `Questions ${idx * 5 + 1} - ${idx * 5 + set.length}` : `Question ${idx * 5 + 1}`}
                      </h3>
                      <p className="text-xs font-bold text-gray-400 italic">
                        {set.length} {set.length === 1 ? 'Vocab Task' : 'Vocab Tasks'} • {isCompleted ? 'Completed' : 'Not started'}
                      </p>
                    </div>
                    <div className="flex items-center text-sm font-black text-brand-blue uppercase tracking-wider gap-2">
                      Start Practice <div className="bg-brand-blue text-white p-1 rounded-full border-neo shadow-neo-sm"><ChevronRight size={16} /></div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white px-10 py-6 rounded-3xl shadow-neo border-neo-lg">
            <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Total Progress</p>
            <p className="text-3xl font-black text-black font-display">
              {cumulativeScore} <span className="text-gray-400 text-xl font-bold">/ {totalBlanksAttempted} Correct</span>
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};

  const renderSection2Home = () => {
    const isTaskAnswered = (task: EverydayTask) => {
      return task.questions.every(q => everydayAnswers[q.id] !== undefined);
    };

    const filteredTasks = everydayTasks.filter(task => {
      const isAnswered = isTaskAnswered(task);
      const source = (task as any).source || 'official';

      if (s2Filter === 'answered') return isAnswered;
      if (s2Filter === 'unanswered') return !isAnswered;
      if (s2Filter === 'official') return source === 'official';
      if (s2Filter === 'custom') return source === 'custom';
      return true;
    });

    return (
      <div className="min-h-screen bg-brand-bg bg-grid font-sans text-[#333] flex flex-col">
        <header className="bg-white py-6 px-4 border-b-4 border-black flex flex-col gap-4">
          <div className="w-full flex items-center justify-between sm:grid sm:grid-cols-3 sm:items-center relative">
            <div className="flex justify-start">
              <button 
                onClick={handleGoHome}
                className="flex items-center gap-1 text-black hover:text-brand-blue transition-colors font-black text-xs sm:text-sm bg-brand-yellow px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border-neo shadow-neo-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span>Menu</span>
              </button>
            </div>
            
            <div className="flex justify-center scale-75 sm:scale-90 md:scale-100 my-1">
              <Logo />
            </div>
            
            <div className="flex justify-end">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border-neo shadow-neo-sm">
                <span className="text-[9px] sm:text-xs font-black uppercase tracking-tight text-gray-400">Timed</span>
                <button 
                  onClick={() => setIsTimedMode(!isTimedMode)}
                  className={`w-9 h-4.5 sm:w-11 sm:h-5.5 rounded-full border-neo relative transition-colors ${isTimedMode ? 'bg-brand-yellow' : 'bg-gray-200'}`}
                >
                  <motion.div 
                    animate={{ x: isTimedMode ? 20 : 0 }}
                    className="w-3.5 sm:w-4.5 h-3.5 sm:h-4.5 bg-white rounded-full border-neo absolute top-0.5 left-0.5"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center text-center px-4">
            <h1 className="text-xl xs:text-2xl sm:text-4xl font-black text-brand-yellow uppercase tracking-tight mb-1 font-display" style={{ WebkitTextStroke: '0.5px black' }}>Section 2: Everyday</h1>
            <h2 className="text-xs sm:text-base font-bold text-gray-600">Select a Task</h2>
          </div>
        </header>
  
        <main className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-20">
          <FilterBar 
            activeFilter={s2Filter}
            onFilterChange={setS2Filter}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Official', value: 'official' },
              { label: 'Custom', value: 'custom' },
              { label: 'Answered', value: 'answered' },
              { label: 'Unanswered', value: 'unanswered' }
            ]}
            colorClass="bg-brand-yellow"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {isTasksLoading ? (
              <LoadingState colorClass="text-brand-yellow" />
            ) : filteredTasks.length === 0 ? (
              <EmptyState message={`No everyday tasks match the "${s2Filter}" filter.`} />
            ) : (
              filteredTasks.map((task, idx) => {
                const isAnswered = isTaskAnswered(task);
                const source = (task as any).source || 'official';
                return (
                  <motion.div
                    key={task.id}
                    whileHover={{ y: -4, scale: 1.02 }}
                    onClick={() => {
                      const originalIdx = everydayTasks.findIndex(t => t.id === task.id);
                      handleEverydaySelect(originalIdx);
                    }}
                    className={`cursor-pointer p-8 rounded-3xl border-neo-lg transition-all flex flex-col justify-between h-56 shadow-neo-lg ${
                      isAnswered ? 'bg-yellow-50' : 'bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-black uppercase tracking-widest text-gray-400">Task {idx + 1}</span>
                          <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border border-black ${source === 'official' ? 'bg-gray-100' : 'bg-brand-red text-white'}`}>
                            {source}
                          </span>
                        </div>
                        {isAnswered && <CheckCircle2 className="text-brand-yellow sticker" size={28} />}
                      </div>
                      <h3 className="text-2xl font-black text-black mb-1 uppercase tracking-tight font-display line-clamp-2">
                        {task.title}
                      </h3>
                      <p className="text-sm font-bold text-gray-500">
                        {task.questions.length} Questions • {isAnswered ? 'Answered' : 'Not started'}
                      </p>
                    </div>
                    <div className="flex items-center text-sm font-black text-brand-yellow uppercase tracking-wider gap-2 font-display">
                      Start Practice <div className="bg-brand-yellow text-black p-1 rounded-full border-neo shadow-neo-sm"><ChevronRight size={16} /></div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </main>
      </div>
    );
  };

  const renderEverydayContent = (task: EverydayTask) => {
    const renderTextWithPatterns = (text: string) => {
      if (!text) return null;
      const lines = text.split('\n');
      return lines.map((line, lIdx) => {
        if (!line.trim()) return <br key={lIdx} />;
        
        // Detect chat message like: Name (Time)
        const chatMatch = line.match(/^([^(\n]+)\s*\(([^)\n]+)\)/i);
        if (chatMatch) {
          const name = chatMatch[1].trim();
          const time = chatMatch[2].trim();
          const message = line.substring(chatMatch[0].length).trim();
          const isUser = name.toLowerCase().includes('you') || name.toLowerCase().includes(profile?.email?.split('@')[0].toLowerCase() || '***');
          
          return (
            <div key={lIdx} className={`flex flex-col mb-4 ${isUser ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="font-black text-[10px] uppercase tracking-widest text-gray-400">{name}</span>
                <span className="text-[9px] font-bold text-gray-300">{time}</span>
              </div>
              <div className={`max-w-[90%] p-4 rounded-2xl border-2 border-black font-bold text-sm shadow-neo-sm ${isUser ? 'bg-brand-blue text-white rounded-tr-none' : 'bg-white text-black rounded-tl-none'}`}>
                {message || <span className="opacity-50 italic">...</span>}
              </div>
            </div>
          );
        }
        
        const dialogueMatch = line.match(/^([^:\n]+):\s*(.*)/);
        if (dialogueMatch) {
          return (
            <div key={lIdx} className="mb-3">
              <span className="font-black uppercase text-[10px] tracking-widest text-brand-blue block mb-0.5">{dialogueMatch[1]}</span>
              <div className="bg-gray-50 border-l-4 border-black p-3 font-bold text-sm">
                {dialogueMatch[2]}
              </div>
            </div>
          );
        }

        return <div key={lIdx} className="mb-4">{line}</div>;
      });
    };

    return (
      <div className="space-y-8">
        {(task as any).imageUrl && (
          <div className="w-full rounded-3xl border-neo-lg overflow-hidden shadow-neo-lg mb-8 bg-gray-50 relative group">
            <img 
              src={(task as any).imageUrl} 
              alt={task.title} 
              className="w-full h-auto max-h-[70vh] object-contain mx-auto"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://placehold.co/800x400/FFF/000?text=${encodeURIComponent(task.title)}`;
              }}
            />
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
              Reference Drawing / Image
            </div>
          </div>
        )}

        {(() => {
          // If the task has no body/header content but has an image, it's a visual-only task
          const hasContent = typeof task.content === 'string' 
            ? task.content.trim().length > 0 
            : (task.content.body || task.content.header || (task.content.items && task.content.items.length > 0));

          if (!hasContent && (task as any).imageUrl) {
            return (
              <div className="bg-brand-yellow/10 p-10 rounded-3xl border-neo shadow-neo-sm text-center">
                <ShoppingBag size={48} className="mx-auto mb-4 text-brand-yellow" />
                <h3 className="text-xl font-black uppercase tracking-tight font-display mb-2">{task.title}</h3>
                <p className="font-bold text-gray-500 italic">Please examine the image above carefully to answer the questions.</p>
              </div>
            );
          }

          switch (task.type) {
            case 'agenda':
            case 'schedule':
              return (
                <div className="space-y-6">
                  {task.content.header && <h3 className="text-xl font-black text-center border-2 border-black p-4 bg-gray-50 uppercase tracking-widest font-display">{task.content.header}</h3>}
                  <div className="space-y-4">
                    {task.content.items?.map((item: any, idx: number) => (
                      <div key={idx} className="flex gap-4 items-start p-4 rounded-xl border-neo bg-white shadow-neo-sm">
                        <span className="font-display font-black text-brand-blue min-w-[100px] uppercase text-xs">{typeof item === 'string' ? '' : item.time}</span>
                        <span className="font-bold text-gray-700">{typeof item === 'string' ? item : item.activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            case 'chat':
              return (
                <div className="bg-gray-100 rounded-3xl p-4 sm:p-8 border-neo border-gray-300 shadow-inner max-h-[600px] overflow-y-auto no-scrollbar">
                  <div className="space-y-2">
                    {task.content.messages?.map((msg: any, mIdx: number) => {
                      const isUser = msg.sender === 'User' || msg.sender.toLowerCase().includes('you');
                      return (
                        <div key={mIdx} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                          <div className="flex items-center gap-2 mb-1 px-1">
                            <span className="font-black text-[10px] uppercase tracking-widest text-gray-400">{msg.sender}</span>
                            {msg.time && <span className="text-[9px] font-bold text-gray-300">{msg.time}</span>}
                          </div>
                          <div className={`max-w-[85%] p-4 rounded-2xl border-2 border-black font-bold text-sm shadow-neo-sm ${isUser ? 'bg-brand-blue text-white rounded-tr-none' : 'bg-white text-black rounded-tl-none'}`}>
                            {msg.text}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            case 'email':
              return (
                <div className="space-y-6">
                  <div className="bg-gray-50 border-2 border-black p-6 rounded-2xl space-y-3 shadow-neo-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <ShoppingBag size={80} />
                    </div>
                    <div className="flex gap-2 text-sm">
                      <span className="font-black uppercase text-gray-400 min-w-[70px] text-[10px] tracking-widest">From:</span>
                      <span className="font-bold truncate">{task.content.from || '---'}</span>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <span className="font-black uppercase text-gray-400 min-w-[70px] text-[10px] tracking-widest">To:</span>
                      <span className="font-bold truncate">{task.content.to || '---'}</span>
                    </div>
                    <div className="flex gap-2 text-sm pt-2 border-t border-gray-200">
                      <span className="font-black uppercase text-gray-400 min-w-[70px] text-[10px] tracking-widest">Subject:</span>
                      <span className="font-black text-brand-blue">{task.content.subject || '*******'}</span>
                    </div>
                  </div>
                  <div className="leading-relaxed text-lg px-2 font-bold text-gray-700">
                    {renderTextWithPatterns(task.content.body || '')}
                  </div>
                </div>
              );
            case 'form':
              return (
                <div className="space-y-8">
                  <h3 className="text-xl font-black text-center border-2 border-black p-6 bg-gray-50 uppercase tracking-widest font-display">{task.content.header}</h3>
                  <div className="space-y-6">
                    {task.content.sections?.map((section: any, sIdx: number) => (
                      <div key={sIdx} className="bg-white border-2 border-black p-6 rounded-2xl space-y-4 shadow-neo-sm">
                        {section.title && <h4 className="font-black uppercase text-xs text-brand-blue tracking-wider border-b border-gray-100 pb-2">{section.title}</h4>}
                        {section.fields && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {section.fields.map((field: string, fIdx: number) => (
                              <div key={fIdx} className="flex flex-col gap-1.5">
                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{field}</span>
                                <div className="h-11 border-2 border-gray-100 bg-gray-50/50 rounded-xl"></div>
                              </div>
                            ))}
                          </div>
                        )}
                        {section.text && (
                          <div className="text-sm leading-relaxed text-gray-600 italic bg-brand-yellow/5 p-5 rounded-2xl border border-brand-yellow/20">
                            {renderTextWithPatterns(section.text)}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            case 'menu':
              return (
                <div className="space-y-8 border-4 border-black p-6 sm:p-10 bg-white shadow-neo">
                  {task.content.header && (
                    <div className="text-center border-b-2 border-black pb-6 mb-8">
                      <h3 className="text-2xl font-black uppercase tracking-widest font-display text-brand-blue">{task.content.header}</h3>
                    </div>
                  )}
                  <div className="space-y-8">
                    {task.content.items?.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-start gap-4">
                        <div className="flex-grow">
                          <h4 className="font-black text-lg uppercase tracking-tight">{item.name}</h4>
                          {item.desc && <p className="text-sm text-gray-500 font-bold italic mt-1">{item.desc}</p>}
                        </div>
                        <span className="font-display font-black text-xl text-black border-2 border-black px-3 py-1 bg-brand-yellow shadow-neo-sm">{item.price}</span>
                      </div>
                    ))}
                  </div>
                  {task.content.footer && (
                    <div className="mt-10 pt-6 border-t-2 border-dotted border-gray-300 text-center">
                      <p className="text-sm font-black text-gray-400 uppercase tracking-widest italic">{task.content.footer}</p>
                    </div>
                  )}
                </div>
              );
            case 'news':
              return (
                <div className="space-y-6">
                  {task.content.header && (
                    <h3 className="text-3xl font-black uppercase tracking-tight font-display text-black border-b-8 border-brand-yellow pb-4 leading-tight">
                      {task.content.header}
                    </h3>
                  )}
                  <div className="flex items-center gap-3 py-2 border-y border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <span>{task.content.stats?.region || 'Global News'}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red"></span>
                    <span>Exclusive Report</span>
                  </div>
                  <div className="text-lg leading-relaxed font-bold text-gray-700 first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-brand-blue first-letter:leading-none p-2 mt-4">
                    {renderTextWithPatterns(task.content.body || '')}
                  </div>
                </div>
              );
            case 'social':
              return (
                <div className="max-w-md mx-auto bg-white border-2 border-black rounded-3xl overflow-hidden shadow-neo-lg">
                  <div className="p-4 border-b-2 border-black bg-gray-50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-yellow border-2 border-black shadow-neo-sm overflow-hidden flex items-center justify-center">
                      <UserIcon size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-tight">{task.content.header}</h4>
                      <p className="text-[10px] font-bold text-gray-400">Sponsored</p>
                    </div>
                  </div>
                  <div className="p-6 text-lg font-bold text-gray-800 leading-relaxed">
                    {renderTextWithPatterns(task.content.body || '')}
                  </div>
                  <div className="p-4 bg-gray-50 border-t-2 border-black flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Heart size={18} className="text-brand-red fill-current" />
                        <span className="font-black text-xs">{task.content.stats?.likes || 0}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MessageCircle size={18} />
                        <span className="font-black text-xs">{task.content.stats?.comments || 0}</span>
                      </div>
                    </div>
                    <Share2 size={18} />
                  </div>
                </div>
              );
            case 'advertisement':
              return (
                <div className="relative border-4 border-black p-8 sm:p-12 bg-white shadow-neo group overflow-hidden rounded-3xl">
                  <div className="absolute top-0 right-0 bg-brand-red text-white font-black uppercase text-[10px] px-6 py-2 tracking-[0.2em] transform rotate-45 translate-x-4 -translate-y-2 shadow-neo">
                    HURRY!
                  </div>
                  {task.content.header && (
                    <h3 className="text-4xl font-black uppercase tracking-tighter font-display text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-700 mb-6 italic" style={{ WebkitTextStroke: '1px black' }}>
                      {task.content.header}
                    </h3>
                  )}
                  <div className="relative z-10 text-xl font-bold text-gray-700 leading-snug mb-8">
                    {renderTextWithPatterns(task.content.body || '')}
                  </div>
                  {task.content.stats?.discount && (
                    <div className="inline-block bg-brand-yellow border-4 border-black p-4 rotate-[-2deg] shadow-neo mb-6">
                      <p className="font-black text-3xl uppercase tracking-widest">{task.content.stats.discount}</p>
                    </div>
                  )}
                  <div className="mt-4">
                    <button className="bg-black text-white px-8 py-4 rounded-xl font-black uppercase tracking-[0.2em] shadow-neo hover:bg-gray-800 transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
                      Claim Now
                    </button>
                  </div>
                </div>
              );
            case 'invoice':
            case 'receipt':
              return (
                <div className="bg-white border-2 border-black p-8 sm:p-12 shadow-neo-sm font-mono text-sm uppercase tracking-wider relative">
                  <div className="text-center mb-10 pb-6 border-b-2 border-dotted border-black">
                    <h3 className="text-2xl font-black mb-2">{task.content.header}</h3>
                    <p className="text-xs text-gray-400">Order Ref: {task.id.toUpperCase()}</p>
                  </div>
                  
                  <div className="space-y-4 mb-10">
                    <div className="flex justify-between font-black border-b border-black pb-2 mb-4 text-xs text-gray-400">
                      <span>Description</span>
                      <span>Total</span>
                    </div>
                    {task.content.items?.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-start gap-4">
                        <div className="flex flex-col">
                          <span className="font-bold">{item.desc || item.name}</span>
                          {item.rate && <span className="text-[10px] text-gray-400">Qty @ {item.rate}</span>}
                        </div>
                        <span className="font-black">{item.total || item.price}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t-4 border-black pt-6 flex flex-col items-end gap-3">
                    {task.content.footer && <p className="text-sm font-black mb-2 w-full text-center border-y border-dotted border-black py-2 my-2">{task.content.footer}</p>}
                    <div className="text-xl font-black bg-black text-white px-4 py-2 shadow-neo">
                      TOTAL: {task.content.total || task.content.footer?.match(/\$\d+/)?.[0] || '---'}
                    </div>
                  </div>

                  <div className="mt-12 text-center text-[10px] text-gray-400 font-bold opacity-30">
                    *** THANK YOU FOR YOUR BUSINESS ***
                  </div>
                </div>
              );
            default:
              return (
                <div className="bg-white p-8 rounded-3xl border-neo shadow-neo-lg leading-relaxed text-lg font-bold text-gray-700">
                  <h3 className="text-xl font-black uppercase tracking-tight font-display mb-4 border-b-2 border-gray-100 pb-2">{task.title}</h3>
                  {typeof task.content === 'string' ? renderTextWithPatterns(task.content) : renderTextWithPatterns(task.content.body || task.content.header || JSON.stringify(task.content))}
                </div>
              );
          }
        })()}
      </div>
    );
  };

  const renderSection2Practice = () => {
    const task = everydayTasks[currentEverydayIdx];
    const allAnswered = task.questions.every(q => everydayAnswers[q.id] !== undefined);

    return (
      <div className="min-h-screen bg-brand-bg bg-grid font-sans text-[#333] flex flex-col">
        <header className="bg-white py-6 px-4 border-b-4 border-black flex flex-col gap-4">
          <div className="w-full flex items-center justify-between sm:grid sm:grid-cols-3 sm:items-center relative">
            <div className="flex justify-start">
              <button 
                onClick={() => setSection2View('home')}
                className="flex items-center gap-1 text-black hover:text-brand-blue transition-colors font-black text-sm bg-brand-yellow px-4 py-2 rounded-xl border-neo shadow-neo-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                <ChevronLeft size={18} />
                Tasks
              </button>
            </div>
            
            <div className="flex justify-center scale-75 md:scale-90 my-1">
              <Logo />
            </div>
            
            <div className="flex justify-end">
              {isTimedMode ? (
                <div className="bg-white px-4 py-2 rounded-xl border-neo shadow-neo-sm font-display font-black text-base sm:text-xl">
                  {formatTime(timerSeconds)}
                </div>
              ) : (
                <div className="w-10 h-1" />
              )}
            </div>
          </div>

          <div className="flex flex-col items-center text-center px-4">
            <h1 className="text-xl font-black text-brand-yellow uppercase tracking-tight font-display" style={{ WebkitTextStroke: '0.5px black' }}>Section 2: Everyday</h1>
            <p className="text-xs sm:text-sm font-bold text-gray-500">Task {currentEverydayIdx + 1}</p>
          </div>
        </header>

        <main className="flex-grow flex flex-col lg:flex-row gap-6 p-4 md:p-10 max-w-[1600px] mx-auto w-full pb-20">
          {/* Task Content Panel */}
          <div className="w-full lg:w-1/2 bg-white rounded-3xl border-neo-lg p-4 sm:p-6 md:p-12 shadow-neo-lg overflow-y-auto max-h-[50vh] lg:max-h-[80vh]">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight font-display border-b-4 border-brand-yellow pb-2 inline-block">Task {currentEverydayIdx + 1}</h2>
            </div>
            <div className="bg-gray-50 border-neo rounded-2xl p-5 md:p-10 font-medium text-base md:text-lg leading-relaxed shadow-inner">
              {renderEverydayContent(task)}
            </div>
          </div>

          {/* Questions Panel */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <div className="bg-white rounded-3xl border-neo-lg p-4 sm:p-6 md:p-10 shadow-neo-lg flex-grow flex flex-col overflow-y-auto max-h-[80vh]">
              <div className="flex justify-between items-center mb-6">
                <span className="bg-black text-white px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-widest">Question {currentEverydayQuestionIdx + 1} of {task.questions.length}</span>
              </div>

              <div className="flex-grow">
                {(() => {
                  const q = task.questions[currentEverydayQuestionIdx];
                  const qIdx = currentEverydayQuestionIdx;
                  const selectedOpt = everydayAnswers[q.id];
                  const showFeedback = showEverydayFeedback[q.id];
                  const isCorrect = selectedOpt === q.answer;

                  return (
                    <div key={q.id} className="space-y-6">
                      <h3 className="text-xl md:text-3xl font-black leading-tight font-display">{q.question}</h3>

                      <div className="space-y-3 mt-6">
                        {q.options.map((opt, oIdx) => {
                          let btnClass = "w-full text-left p-4 md:p-5 rounded-2xl border-neo font-bold transition-all flex items-center gap-3 md:gap-4 text-base md:text-lg ";
                          const isSelected = selectedOpt === oIdx;
                          
                          if (showFeedback) {
                            if (oIdx === q.answer) btnClass += "bg-green-100 border-green-600 text-green-800 shadow-neo-sm ";
                            else if (isSelected) btnClass += "bg-red-100 border-red-600 text-red-800 shadow-neo-sm ";
                            else btnClass += "bg-gray-50 opacity-50 ";
                          } else {
                            btnClass += isSelected ? "bg-brand-yellow shadow-neo -translate-y-1 " : "bg-white hover:bg-gray-50 hover:-translate-y-0.5 shadow-neo-sm ";
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={showFeedback}
                              onClick={() => handleEverydayAnswer(q.id, oIdx)}
                              className={btnClass}
                            >
                              <div className={`w-6 h-6 rounded-full border-neo flex-shrink-0 flex items-center justify-center ${isSelected ? 'bg-black' : 'bg-white'}`}>
                                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                              <span className="flex-grow">{opt}</span>
                              {showFeedback && oIdx === q.answer && <CheckCircle2 size={24} className="text-green-600 sticker" />}
                              {showFeedback && isSelected && oIdx !== q.answer && <AlertCircle size={24} className="text-red-600 sticker" />}
                            </button>
                          );
                        })}
                      </div>

                      <AnimatePresence>
                        {showFeedback && (
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-6 p-8 rounded-3xl border-neo-lg ${isCorrect ? 'bg-green-50 border-green-600' : 'bg-red-50 border-red-600'} shadow-neo`}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              {isCorrect ? <CheckCircle2 className="text-green-600 sticker" size={24}/> : <AlertCircle className="text-red-600 sticker" size={24}/>}
                              <p className="font-black uppercase tracking-widest text-sm">{isCorrect ? 'Correct!' : 'Incorrect'}</p>
                            </div>
                            <p className="text-lg font-bold text-gray-700 leading-relaxed">{q.explanation}</p>
                            <button 
                              onClick={handleEverydayNext}
                              className="mt-8 w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                            >
                              {currentEverydayQuestionIdx < task.questions.length - 1 ? 'Next Question' : 'Finish Task'}
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  };

  const renderSection2Results = () => {
    const task = everydayTasks[currentEverydayIdx];
    const totalQuestions = task.questions.length;
    const correctAnswers = Object.keys(everydayAnswers).filter(qId => {
      const q = task.questions.find(quest => quest.id === qId);
      return q && everydayAnswers[qId] === q.answer;
    }).length;

    return (
      <div className="min-h-screen bg-brand-bg bg-grid font-sans text-[#333] flex flex-col">
        <header className="bg-white py-12 px-4 text-center border-b-4 border-black flex flex-col items-center gap-6">
          <Logo className="scale-90 md:scale-100" />
          <div>
            <h1 className="text-4xl font-black text-brand-yellow uppercase tracking-tight mb-1 font-display" style={{ WebkitTextStroke: '1px black' }}>Task Completed</h1>
            <h2 className="text-xl font-bold text-gray-600">Task {currentEverydayIdx + 1}</h2>
          </div>
        </header>

        <main className="flex-grow max-w-2xl mx-auto w-full p-8 flex flex-col items-center justify-center pb-20">
          <div className="w-full bg-white rounded-3xl border-neo-lg p-10 md:p-12 shadow-neo-lg text-center">
            <div className="bg-brand-yellow w-24 h-24 rounded-2xl border-neo shadow-neo flex items-center justify-center mx-auto mb-8 rotate-3">
              <CheckCircle2 size={48} className="text-black sticker" />
            </div>
            
            <h3 className="text-3xl font-black uppercase tracking-tight mb-8 text-black font-display">Your Results</h3>
            
            <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-10">
              <div className="bg-gray-50 p-4 sm:p-8 rounded-2xl border-neo shadow-neo-sm">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Score</p>
                <p className="text-2xl sm:text-4xl font-black text-brand-yellow font-display" style={{ WebkitTextStroke: '1px black' }}>{correctAnswers} / {totalQuestions}</p>
              </div>
              <div className="bg-gray-50 p-4 sm:p-8 rounded-2xl border-neo shadow-neo-sm">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Time</p>
                <p className="text-2xl sm:text-4xl font-black text-brand-yellow font-display" style={{ WebkitTextStroke: '1px black' }}>{finalTime !== null ? formatTime(finalTime) : 'N/A'}</p>
              </div>
            </div>

            <button 
              onClick={() => setSection2View('home')}
              className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              Back to Tasks
            </button>
          </div>
        </main>
      </div>
    );
  };

  const renderSection3Home = () => {
    const isArticleAnswered = (article: AcademicArticle) => {
      return article.questions.every(q => academicAnswers[q.id] !== undefined);
    };

    const filteredArticles = academicArticles.filter(article => {
      const isAnswered = isArticleAnswered(article);
      const source = (article as any).source || 'official';

      if (s3Filter === 'answered') return isAnswered;
      if (s3Filter === 'unanswered') return !isAnswered;
      if (s3Filter === 'official') return source === 'official';
      if (s3Filter === 'custom') return source === 'custom';
      return true;
    });

    return (
      <div className="min-h-screen bg-brand-bg bg-grid font-sans text-[#333] flex flex-col">
        <header className="bg-white py-6 px-4 border-b-4 border-black flex flex-col gap-4">
          <div className="w-full flex items-center justify-between sm:grid sm:grid-cols-3 sm:items-center relative">
            <div className="flex justify-start">
              <button 
                onClick={handleGoHome}
                className="flex items-center gap-1 text-black hover:text-brand-blue transition-colors font-black text-xs sm:text-sm bg-brand-yellow px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border-neo shadow-neo-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span>Menu</span>
              </button>
            </div>
            
            <div className="flex justify-center scale-75 sm:scale-90 md:scale-100 my-1">
              <Logo />
            </div>
            
            <div className="flex justify-end">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border-neo shadow-neo-sm">
                <span className="text-[9px] sm:text-xs font-black uppercase tracking-tight text-gray-400">Timed</span>
                <button 
                  onClick={() => setIsTimedMode(!isTimedMode)}
                  className={`w-9 h-4.5 sm:w-11 sm:h-5.5 rounded-full border-neo relative transition-colors ${isTimedMode ? 'bg-brand-red' : 'bg-gray-200'}`}
                >
                  <motion.div 
                    animate={{ x: isTimedMode ? 20 : 0 }}
                    className="w-3.5 sm:w-4.5 h-3.5 sm:h-4.5 bg-white rounded-full border-neo absolute top-0.5 left-0.5"
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center text-center px-4">
            <h1 className="text-xl xs:text-2xl sm:text-4xl font-black text-brand-red uppercase tracking-tight mb-1 font-display" style={{ WebkitTextStroke: '0.5px black' }}>Section 3: Academic</h1>
            <h2 className="text-xs sm:text-base font-bold text-gray-600">Select an Article</h2>
          </div>
        </header>
  
        <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-20">
          <FilterBar 
            activeFilter={s3Filter}
            onFilterChange={setS3Filter}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Official', value: 'official' },
              { label: 'Custom', value: 'custom' },
              { label: 'Answered', value: 'answered' },
              { label: 'Unanswered', value: 'unanswered' }
            ]}
            colorClass="bg-brand-red"
          />

          <div className="space-y-6 sm:space-y-8">
            {isTasksLoading ? (
              <LoadingState colorClass="text-brand-red" />
            ) : filteredArticles.length === 0 ? (
              <EmptyState message={`No academic articles match the "${s3Filter}" filter.`} />
            ) : (
              filteredArticles.map((article, idx) => {
                const isAnswered = isArticleAnswered(article);
                const source = (article as any).source || 'official';
                return (
                  <motion.div
                    key={article.id}
                    whileHover={{ x: 10, scale: 1.01 }}
                    onClick={() => {
                      const originalIdx = academicArticles.findIndex(a => a.id === article.id);
                      handleAcademicSelect(originalIdx);
                    }}
                    className={`cursor-pointer p-4 sm:p-8 rounded-3xl border-neo-lg transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 group shadow-neo-lg ${
                      isAnswered ? 'bg-red-50' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-3 sm:gap-8">
                      <div className="bg-brand-red text-white w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl border-neo shadow-neo-sm flex items-center justify-center font-black text-lg sm:text-2xl flex-shrink-0 group-hover:rotate-6 transition-transform">
                        {idx + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                          <h3 className="text-base sm:text-2xl md:text-3xl font-black uppercase tracking-tight font-display group-hover:text-brand-red transition-colors break-words">{article.title}</h3>
                          <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border border-black flex-shrink-0 ${source === 'official' ? 'bg-gray-100 text-black' : 'bg-black text-white'}`}>
                            {source}
                          </span>
                        </div>
                        <p className="text-gray-500 font-bold uppercase text-[10px] sm:text-xs tracking-widest">{article.questions.length} Questions • {isAnswered ? 'Completed' : 'Academic Article'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 self-end sm:self-auto">
                      {isAnswered && <CheckCircle2 className="text-brand-red sticker w-6 h-6 sm:w-8 sm:h-8" />}
                      <div className="bg-brand-red text-white p-1.5 sm:p-2 rounded-full border-neo shadow-neo-sm group-hover:translate-x-2 transition-transform">
                        <ChevronRight size={20} className="sm:w-8 sm:h-8" />
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </main>
      </div>
    );
  };

  const renderSection3Practice = () => {
    const article = academicArticles[currentAcademicIdx];
    const currentQuestion = article.questions[currentAcademicQuestionIdx];
    const selectedOpt = academicAnswers[currentQuestion.id];
    const showFeedback = showAcademicFeedback[currentQuestion.id];
    const isCorrect = selectedOpt === currentQuestion.answer;
    
    // Helper to render text with highlights and insertion points
    const renderParagraph = (text: string, pIdx: number) => {
      // 1. Remove Vocabulary Markers [A], [B], etc. from the text entirely
      const cleanText = text.replace(/\[[A-D]\]/g, '');

      // 2. Handle Highlighting
      let elements: React.ReactNode[] = [cleanText];
      const isCorrectPara = currentQuestion.paragraphIndex === undefined || currentQuestion.paragraphIndex === pIdx;
      
      if (currentQuestion.highlight && isCorrectPara) {
        const highlight = currentQuestion.highlight;
        const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedHighlight})`, 'gi');
        
        elements = elements.flatMap(el => {
          if (typeof el !== 'string') return el;
          const parts = el.split(regex);
          return parts.map((part, i) => 
            part.toLowerCase() === highlight.toLowerCase() 
              ? <span key={i} className="bg-brand-yellow/30 px-1 rounded border-b-2 border-brand-yellow font-bold mx-0.5">{part}</span> 
              : part
          );
        });
      }

      // 3. Handle Sentence Insertion Points [SQ-A]
      const insertionRegex = /\[SQ-([A-D])\]/g;
      let finalElements: React.ReactNode[] = elements.flatMap(el => {
        if (typeof el !== 'string') return el;
        const parts = el.split(insertionRegex);
        const result: React.ReactNode[] = [];
        for (let i = 0; i < parts.length; i++) {
          if (i % 2 === 0) {
            result.push(parts[i]);
          } else {
            const label = parts[i];
            // ONLY show if the question is a sentence-insertion type
            if (currentQuestion.type === 'sentence-insertion') {
              const isTarget = currentQuestion.options.includes(`[${label}]`);
              result.push(
                <span key={`insertion-${i}`} className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border-neo mx-1 font-black text-sm transition-all ${isTarget ? 'bg-brand-blue text-white shadow-neo' : 'bg-gray-100 text-gray-800 shadow-neo-sm'}`}>
                  {label}
                </span>
              );
            }
          }
        }
        return result;
      });

      // Final pass to clean up double spaces
      return finalElements.map(el => {
        if (typeof el === 'string') {
          return el.replace(/\s\s+/g, ' ');
        }
        return el;
      });
    };

    return (
      <div className="min-h-screen bg-brand-bg bg-grid font-sans text-[#333] flex flex-col">
        <header className="bg-white py-6 px-4 border-b-4 border-black flex flex-col gap-4">
          <div className="w-full flex items-center justify-between sm:grid sm:grid-cols-3 sm:items-center relative">
            <div className="flex justify-start">
              <button 
                onClick={() => setSection3View('home')}
                className="flex items-center gap-1 text-black hover:text-brand-red transition-colors font-black text-sm bg-brand-yellow px-4 py-2 rounded-xl border-neo shadow-neo-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                <ChevronLeft size={18} />
                Articles
              </button>
            </div>
            
            <div className="flex justify-center scale-75 md:scale-90 my-1">
              <Logo />
            </div>
            
            <div className="flex justify-end">
              {isTimedMode ? (
                <div className="bg-white px-4 py-2 rounded-xl border-neo shadow-neo-sm font-display font-black text-base sm:text-xl">
                  {formatTime(timerSeconds)}
                </div>
              ) : (
                <div className="w-10 h-1" />
              )}
            </div>
          </div>

          <div className="flex flex-col items-center text-center px-4">
            <h1 className="text-xl font-black text-brand-red uppercase tracking-tight font-display" style={{ WebkitTextStroke: '0.5px black' }}>Section 3: Academic</h1>
            <p className="text-xs sm:text-sm font-bold text-gray-500">{article.title}</p>
          </div>
        </header>

        <main className="flex-grow flex flex-col lg:flex-row gap-6 p-4 md:p-10 max-w-[1600px] mx-auto w-full pb-20">
          {/* Article Panel */}
          <div className="w-full lg:w-1/2 bg-white rounded-3xl border-neo-lg p-4 sm:p-6 md:p-12 shadow-neo-lg overflow-y-auto max-h-[50vh] lg:max-h-[80vh]">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-8 border-b-4 border-brand-red pb-4 inline-block font-display">{article.title}</h2>
            <div className="space-y-6 text-base md:text-lg leading-relaxed text-gray-700">
              {(Array.isArray(article.content) ? article.content : [article.content]).map((para, pIdx) => (
                <p key={pIdx}>{renderParagraph(para, pIdx)}</p>
              ))}
            </div>
          </div>

          {/* Questions Panel */}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <div className="bg-white rounded-3xl border-neo-lg p-4 sm:p-6 md:p-10 shadow-neo-lg flex-grow flex flex-col overflow-y-auto max-h-[80vh]">
              <div className="flex justify-between items-center mb-6">
                <span className="bg-black text-white px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-widest">Question {currentAcademicQuestionIdx + 1} of {article.questions.length}</span>
              </div>

              <div className="flex-grow">
                {currentQuestion.type === 'sentence-insertion' && (
                  <div className="mb-6 p-5 bg-blue-50 border-neo rounded-2xl italic font-bold text-brand-blue shadow-neo-sm text-sm">
                    "{currentQuestion.sentenceToInsert}"
                  </div>
                )}
                <h3 className="text-xl md:text-3xl font-black mb-8 leading-tight font-display">
                  {currentQuestion.question}
                </h3>
                
                <div className="space-y-3">
                  {currentQuestion.options.map((opt, oIdx) => {
                    let btnClass = "w-full text-left p-4 md:p-5 rounded-2xl border-neo font-bold transition-all flex items-center gap-3 md:gap-4 text-base md:text-lg ";
                    const isSelected = selectedOpt === oIdx;
                    
                    if (showFeedback) {
                      if (oIdx === currentQuestion.answer) btnClass += "bg-green-100 border-green-600 text-green-800 shadow-neo-sm ";
                      else if (isSelected) btnClass += "bg-red-100 border-red-600 text-red-800 shadow-neo-sm ";
                      else btnClass += "bg-gray-50 opacity-50 ";
                    } else {
                      btnClass += isSelected ? "bg-brand-yellow shadow-neo -translate-y-1 " : "bg-white hover:bg-gray-50 hover:-translate-y-0.5 shadow-neo-sm ";
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={showFeedback}
                        onClick={() => handleAcademicAnswer(currentQuestion.id, oIdx)}
                        className={btnClass}
                      >
                        <div className={`w-6 h-6 rounded-full border-neo flex-shrink-0 flex items-center justify-center ${isSelected ? 'bg-black' : 'bg-white'}`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className="flex-grow">{opt}</span>
                        {showFeedback && oIdx === currentQuestion.answer && <CheckCircle2 size={24} className="text-green-600 sticker" />}
                        {showFeedback && isSelected && oIdx !== currentQuestion.answer && <AlertCircle size={24} className="text-red-600 sticker" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence>
                {showFeedback && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-10 p-8 rounded-3xl border-neo-lg ${isCorrect ? 'bg-green-50 border-green-600' : 'bg-red-50 border-red-600'} shadow-neo`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {isCorrect ? <CheckCircle2 className="text-green-600 sticker" size={24}/> : <AlertCircle className="text-red-600 sticker" size={24}/>}
                      <p className="font-black uppercase tracking-widest text-sm">{isCorrect ? 'Correct!' : 'Incorrect'}</p>
                    </div>
                    <p className="text-lg font-bold text-gray-700 leading-relaxed">{currentQuestion.explanation}</p>
                    <button 
                      onClick={handleAcademicNext}
                      className="mt-8 w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                    >
                      {currentAcademicQuestionIdx < article.questions.length - 1 ? 'Next Question' : 'Finish Article'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    );
  };

  const renderSection1Practice = () => {
    return (
      <div className="min-h-screen bg-brand-bg bg-grid font-sans text-[#333] flex flex-col">
        {/* Header Area */}
        <header className="bg-white py-6 px-4 border-b-4 border-black flex flex-col gap-4">
          <div className="w-full flex items-center justify-between sm:grid sm:grid-cols-3 sm:items-center relative">
            <div className="flex justify-start">
              <button 
                onClick={() => setSection1View('home')}
                className="flex items-center gap-1 text-black hover:text-brand-blue transition-colors font-black text-sm bg-brand-yellow px-4 py-2 rounded-xl border-neo shadow-neo-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                <ChevronLeft size={18} />
                Sets
              </button>
            </div>
            
            <div className="flex justify-center scale-75 md:scale-90 my-1">
              <Logo />
            </div>
            
            <div className="flex justify-end">
              {isTimedMode ? (
                <div className="bg-white px-4 py-2 rounded-xl border-neo shadow-neo-sm font-display font-black text-base sm:text-xl">
                  {formatTime(timerSeconds)}
                </div>
              ) : (
                <div className="w-10 h-1" />
              )}
            </div>
          </div>

          <div className="flex flex-col items-center text-center px-4">
            <h1 className="text-xl font-black text-brand-blue uppercase tracking-tight font-display" style={{ WebkitTextStroke: '0.5px black' }}>Section 1: Vocabulary</h1>
            <p className="text-xs sm:text-sm font-bold text-gray-500">Fill in the missing letters</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-10 pb-24 w-full">
          <div className="w-full max-w-4xl bg-white rounded-3xl border-neo-lg shadow-neo-lg p-4 sm:p-8 md:p-16 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentParagraphIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="leading-[3] sm:leading-[3.5] text-lg sm:text-xl text-[#333] font-medium break-words">
                  {currentParagraph?.parts.map((part, idx) => {
                    if (part.type === 'text') {
                      return <span key={idx}>{part.content}</span>;
                    } else {
                      const blankId = part.blankId!;
                      const blankData = currentParagraph.blanks[blankId];
                      const userVal = userAnswers[blankId] || '';
                      const isCorrect = userVal.trim().toLowerCase() === blankData.answer.toLowerCase();
                      
                      const gapLength = blankData.answer.length;
                      
                      return (
                        <span key={idx} className="inline-flex items-baseline mx-1 relative group whitespace-nowrap">
                          <div 
                            className={`relative inline-flex items-center rounded-lg transition-all border-neo ${showResults ? (isCorrect ? 'bg-green-50' : 'bg-red-50') : 'bg-gray-100 shadow-inner'}`}
                            style={{ 
                              width: `calc(${gapLength} * 1.8ch + 24px)`,
                              height: '2.6em',
                            }}
                          >
                            <div 
                              className="absolute left-[12px] bottom-[10px] flex pointer-events-none select-none h-[3px]" 
                              style={{ gap: '0.8ch' }}
                            >
                              {Array.from({ length: gapLength }).map((_, i) => (
                                <div 
                                  key={i} 
                                  className={`h-full w-[1ch] transition-colors rounded-full ${showResults ? (isCorrect ? 'bg-green-600' : 'bg-red-600') : 'bg-black opacity-30'}`} 
                                />
                              ))}
                            </div>
                            
                            <input
                              type="text"
                              value={userVal}
                              maxLength={gapLength}
                              onChange={(e) => {
                                const val = e.target.value.replace(/[^a-zA-Z]/g, '');
                                if (val.length <= gapLength) {
                                  handleInputChange(blankId, val);
                                }
                              }}
                              disabled={showResults}
                              autoComplete="off"
                              spellCheck="false"
                              className={`
                                w-full h-full bg-transparent border-none focus:outline-none relative z-10 text-xl sm:text-2xl font-mono font-black overflow-hidden
                                ${showResults ? (isCorrect ? 'text-green-700' : 'text-red-700') : 'text-black'}
                              `}
                              style={{ 
                                letterSpacing: '0.8ch',
                                paddingLeft: '12px',
                                textAlign: 'left',
                                lineHeight: '1.2',
                                paddingBottom: '8px'
                              }}
                            />
                          </div>

                          {showResults && !isCorrect && (
                            <motion.span 
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white text-[12px] px-3 py-1 rounded-lg border-neo shadow-neo-sm whitespace-nowrap z-20 font-black tracking-widest uppercase"
                            >
                              {blankData.answer}
                            </motion.span>
                          )}
                        </span>
                      );
                    }
                  })}
                </div>

                {showResults && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col gap-4 p-8 bg-gray-50 rounded-2xl border-neo shadow-neo"
                  >
                    <div className="flex items-center gap-4">
                      {currentParaCorrectCount === totalBlanksInPara ? (
                        <CheckCircle2 className="text-green-600 sticker" size={32} />
                      ) : (
                        <AlertCircle className="text-brand-yellow sticker" size={32} />
                      )}
                      <div>
                        <p className="font-black uppercase tracking-widest text-xs text-gray-400">Paragraph Summary</p>
                        <span className="text-xl font-black text-black font-display">
                          You got {currentParaCorrectCount} out of {totalBlanksInPara} correct!
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 text-black font-black uppercase tracking-widest text-xs bg-white px-6 py-3 rounded-2xl border-neo shadow-neo-sm">
            Overall Score: <span className="text-brand-blue text-lg font-display ml-2">{cumulativeScore}</span> <span className="text-gray-400">/ {totalBlanksAttempted}</span>
          </div>
        </main>

        <footer className="bg-brand-blue border-t-4 border-black py-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <div className="text-white font-black text-lg flex items-center gap-3 uppercase tracking-tight font-display">
              {isSetNew(currentSetIndex) && <span className="bg-brand-yellow text-black px-3 py-1 rounded-lg border-neo text-[10px] font-black shadow-neo-sm">NEW</span>}
              Questions {currentSetIndex * 5 + 1} - {currentSetIndex * 5 + 5}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={handlePrev}
              disabled={currentParagraphIndex === 0}
              className="p-3 rounded-2xl bg-white border-neo hover:bg-brand-yellow disabled:opacity-30 transition-all shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              <ChevronLeft size={28} className="text-black" />
            </button>
            <button
              onClick={handleSubmit}
              disabled={showResults}
              className="bg-brand-yellow border-neo px-10 py-4 rounded-2xl shadow-neo hover:bg-yellow-300 disabled:opacity-50 transition-all text-sm font-black uppercase tracking-widest text-black active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              Submit
            </button>
            <button
              onClick={handleNext}
              disabled={!showResults || currentParagraphIndex === allParagraphs.length - 1}
              className="p-3 rounded-2xl bg-white border-neo hover:bg-brand-yellow disabled:opacity-30 transition-all shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              <ChevronRight size={28} className="text-black" />
            </button>
          </div>
        </footer>
      </div>
    );
  };

  // --- Main Render Switch ---

  if (loading) return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-black border-t-brand-yellow rounded-full animate-spin"></div>
    </div>
  );

  const handleAdminPreviewTask = (task: any) => {
    setIsAdminView(false);
    if (task.category === 'vocabulary') {
      setActiveTab('section1');
      setSection1View('practice');
      // Find the index of the first paragraph belonging to this task
      const paraIdx = allParagraphs.findIndex(p => p.sourceId === task.id);
      if (paraIdx !== -1) {
        setCurrentParagraphIndex(paraIdx);
      }
    } else if (task.category === 'everyday') {
      setActiveTab('section2');
      setSection2View('practice');
      const taskIdx = everydayTasks.findIndex(t => t.id === task.id);
      if (taskIdx !== -1) {
        setCurrentEverydayIdx(taskIdx);
      }
    } else if (task.category === 'academic') {
      setActiveTab('section3');
      setSection3View('practice');
      const articleIdx = academicArticles.findIndex(a => a.id === task.id);
      if (articleIdx !== -1) {
        setCurrentAcademicIdx(articleIdx);
      }
    }
  };

  if (!user) return <Login />;

  const renderContent = () => {
    if (isAdminView) return <AdminDashboard onPreviewTask={handleAdminPreviewTask} />;
    
    if (activeTab === 'credits') return (
      <CreditsPage 
        hasPendingRequest={hasPendingRequest}
        onCancelRequest={cancelRequest}
        isCancelling={isCancellingRequest}
      />
    );
    if (activeTab === 'menu') return renderMainMenu();
    if (activeTab === 'section1') {
      if (section1View === 'home') return renderSection1Home();
      return renderSection1Practice();
    }
    if (activeTab === 'section2') {
      if (section2View === 'home') return renderSection2Home();
      if (section2View === 'results') return renderSection2Results();
      return renderSection2Practice();
    }
    if (activeTab === 'section3') {
      if (section3View === 'home') return renderSection3Home();
      if (section3View === 'results') {
        const article = academicArticles[currentAcademicIdx];
        const totalQuestions = article.questions.length;
        const correctAnswers = Object.keys(academicAnswers).filter(qId => {
          const q = article.questions.find(quest => quest.id === qId);
          return q && academicAnswers[qId] === q.answer;
        }).length;

        return (
          <div className="min-h-screen bg-brand-bg bg-grid font-sans text-[#333] flex flex-col">
            <header className="bg-white py-12 px-4 text-center border-b-4 border-black flex flex-col items-center gap-6">
              <Logo className="scale-90 md:scale-100" />
              <div>
                <h1 className="text-4xl font-black text-brand-red uppercase tracking-tight mb-1 font-display" style={{ WebkitTextStroke: '1px black' }}>Article Completed</h1>
                <h2 className="text-xl font-bold text-gray-600">{article.title}</h2>
              </div>
            </header>

            <main className="flex-grow max-w-2xl mx-auto w-full p-8 flex flex-col items-center justify-center pb-20">
              <div className="w-full bg-white rounded-3xl border-neo-lg p-10 md:p-12 shadow-neo-lg text-center">
                <div className="bg-brand-red w-24 h-24 rounded-2xl border-neo shadow-neo flex items-center justify-center mx-auto mb-8 -rotate-3">
                  <CheckCircle2 size={48} className="text-white sticker" />
                </div>
                
                <h3 className="text-3xl font-black uppercase tracking-tight mb-8 text-black font-display">Your Results</h3>
                
                <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-10">
                  <div className="bg-gray-50 p-4 sm:p-8 rounded-2xl border-neo shadow-neo-sm">
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Score</p>
                    <p className="text-2xl sm:text-4xl font-black text-brand-red font-display" style={{ WebkitTextStroke: '1px black' }}>{correctAnswers} / {totalQuestions}</p>
                  </div>
                  <div className="bg-gray-50 p-4 sm:p-8 rounded-2xl border-neo shadow-neo-sm">
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Time</p>
                    <p className="text-2xl sm:text-4xl font-black text-brand-red font-display" style={{ WebkitTextStroke: '1px black' }}>{finalTime !== null ? formatTime(finalTime) : 'N/A'}</p>
                  </div>
                </div>

                <button 
                  onClick={() => setSection3View('home')}
                  className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-neo active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                >
                  Back to Articles
                </button>
              </div>
            </main>
          </div>
        );
      }
      return renderSection3Practice();
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <GlobalHeader />
      {renderContent()}
      <AnimatePresence>
        {showCreditModal && <CreditModal />}
      </AnimatePresence>
    </div>
  );
}
