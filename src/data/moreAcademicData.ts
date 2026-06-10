import { AcademicArticle } from '../academicData';

export const MORE_ACADEMIC_DATA: AcademicArticle[] = [
  {
    id: 'plate-tectonics',
    title: 'Continental Drift and Plate Tectonics',
    content: [
      "For centuries, mapmakers noticed the fitting shapes of continents, but it was Alfred Wegener who formally proposed the theory of continental drift in 1912. Wegener hypothesized that all landmasses were once joined in a supercontinent called Pangaea. Despite compiling fossil and geological evidence, his ideas faced [A] fierce skepticism from contemporaries. [SQ-A] The main criticism was his inability to provide a physical mechanism capable of moving entire continents across the ocean floor. Thus, the hypothesis lay dormant for decades.",
      "The breakthrough came in the mid-twentieth century with the mapping of the ocean floor, revealing mid-ocean ridges and deep-sea trenches. Scientists discovered paleomagnetic anomalies—parallel bands of magnetized rocks running along the seafloor that recorded flips in Earth's magnetic field. [SQ-B] This supported the concept of seafloor spreading, where new crust is created at ridges and pushed outward, acting as the driving engine Wegener lacked. [SQ-C]",
      "Modern plate tectonics expands on Wegener's idea by dividing Earth's lithosphere into several massive, rigid plates. These plates move continuously over the semi-fluid asthenosphere, driven by mantle convection currents. Interaction at plate boundaries—convergent, divergent, and transform—causes volcanic eruptions, mountain building, and seismic activity. [SQ-D] This dynamic geological model serves as the unifying framework for understanding Earth's internal systems."
    ],
    questions: [
      {
        id: 'pt-q1',
        question: 'The word "fierce" in the passage is closest in meaning to',
        options: ['mild', 'intense', 'temporary', 'academic'],
        answer: 1,
        explanation: 'In this context, "fierce skepticism" refers to strong or intense doubt and opposition.',
        type: 'multiple-choice',
        highlight: 'fierce',
        paragraphIndex: 0,
        marker: 'A'
      },
      {
        id: 'pt-q2',
        question: 'According to Paragraph 1, what was the primary reason Wegener\'s theory was initially rejected?',
        options: [
          'He lacked physical evidence of fossil distributions on different continents.',
          'He could not define a physical mechanism that explained how continents moved.',
          'His calculations of continental shapes were mathematically incorrect.',
          'Contemporary geologists believed mid-ocean ridges were stationary.'
        ],
        answer: 1,
        explanation: 'Paragraph 1 explicitly notes that Wegener\'s "inability to provide a physical mechanism capable of moving entire continents across the ocean floor" was the main criticism.',
        type: 'multiple-choice'
      },
      {
        id: 'pt-q3',
        question: 'According to Paragraph 2, all of the following helped prove seafloor spreading EXCEPT:',
        options: [
          'Mapping the topography of the ocean floor',
          'Discovering mid-ocean ridges and deep-sea trenches',
          'Finding paleomagnetic anomalies in seafloor rocks',
          'Documenting Wegener\'s historical journals on oceanic climates'
        ],
        answer: 3,
        explanation: 'Wegener\'s historical journals on oceanic climates are not mentioned in Paragraph 2 as part of the mid-twentieth-century discoveries.',
        type: 'multiple-choice'
      },
      {
        id: 'pt-q4',
        question: 'What is the purpose of Paragraph 3?',
        options: [
          'To describe how modern plate tectonics integrates and updates early drift ideas.',
          'To argue that plate boundaries are the only source of volcanic activity.',
          'To prove that Earth\'s lithosphere is completely solid and unchanging.',
          'To explain how Wegener calculated asthenospheric convection currents.'
        ],
        answer: 0,
        explanation: 'Paragraph 3 explains that modern plate tectonics expands on Wegener\'s idea, serving as a unifying framework for geological interactions.',
        type: 'multiple-choice'
      },
      {
        id: 'pt-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 0,
        explanation: 'The sentence adds detail about Wegener\'s contemporary opposition, which fits after Wegener\'s initial proposal and skepticism.',
        type: 'sentence-insertion',
        sentenceToInsert: 'Geologists of the era argued that the solid rock of the ocean floors was far too rigid to permit continental passage.'
      }
    ]
  },
  {
    id: 'symbiotic-reefs',
    title: 'Symbiotic Relationships in Coral Reefs',
    content: [
      "Coral reefs are among the most biodiverse ecosystems on Earth, yet they thrive in nutrient-deficient tropical waters. This paradox is resolved by a highly [A] specialized mutualistic relationship between coral polyps and microscopic algae called zooxanthellae. The algae live inside the coral tissues, where they perform photosynthesis. In exchange, the host coral polyps provide the zooxanthellae with a protected environment and the waste compounds necessary for chlorophyll production. [SQ-A]",
      "The benefits of this symbiosis are profound for both organisms. Photosynthesis by zooxanthellae generates glucose, glycerol, and amino acids, which are transferred to the coral host. These carbon-rich nutrients satisfy up to ninety percent of the coral's energy requirements, enabling them to build massive calcium carbonate skeletons. [SQ-B] Without the algae, corals would struggle to grow, and the building of vast reefs would be impossible. [SQ-C]",
      "However, this relationship is highly sensitive to environmental stressors, especially elevated sea temperatures. When water temperatures rise even slightly above normal, corals undergo stress and expel their zooxanthellae. [SQ-D] Because the algae give corals their vibrant colors, this separation results in a stark white appearance known as coral bleaching. Lacking their energy source, bleached corals become highly susceptible to disease and starvation, highlighting the delicate balance of reef ecosystems."
    ],
    questions: [
      {
        id: 'sr-q1',
        question: 'The word "specialized" in the passage is closest in meaning to',
        options: ['uncommon', 'adapted', 'impermanent', 'complicated'],
        answer: 1,
        explanation: 'In this context, a "specialized" relationship means one that is highly adapted specifically for this mutual benefit.',
        type: 'multiple-choice',
        highlight: 'specialized',
        paragraphIndex: 0,
        marker: 'A'
      },
      {
        id: 'sr-q2',
        question: 'According to Paragraph 2, how much of the coral\'s energy needs can be met by zooxanthellae?',
        options: ['Ten percent', 'Fifty percent', 'Ninety percent', 'One hundred percent'],
        answer: 2,
        explanation: 'Paragraph 2 states that these carbon-rich nutrients "satisfy up to ninety percent of the coral\'s energy requirements."',
        type: 'multiple-choice'
      },
      {
        id: 'sr-q3',
        question: 'According to the passage, all of the following are exchanged between corals and algae EXCEPT:',
        options: [
          'Protected environments for the algae',
          'Glucose and amino acids for the corals',
          'Raw waste compounds for the algae',
          'Calcium carbonate skeletons for the algae'
        ],
        answer: 3,
        explanation: 'The coral builds the calcium carbonate skeleton for its own structure; it is not sent or exchanged to the algae.',
        type: 'multiple-choice'
      },
      {
        id: 'sr-q4',
        question: 'What can be inferred about bleached corals?',
        options: [
          'They cannot survive unless sea temperatures cool down and allow algae to return.',
          'They instantly dissolve when water temperatures rise.',
          'They quickly adapt by performing photosynthesis on their own.',
          'They find alternative food sources from marine herbivores.'
        ],
        answer: 0,
        explanation: 'Bleaching happens when stress expels the algae, leaving host corals susceptible to starvation, implying survival depends on cooling and re-establishing symbiosis.',
        type: 'multiple-choice'
      },
      {
        id: 'sr-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 3,
        explanation: 'This sentence fits after elevated sea temperatures are introduced, adding detail on the threshold leading to expulsion.',
        type: 'sentence-insertion',
        sentenceToInsert: 'Prolonged exposure to these high temperatures causes corals to break down the photosynthetic factories of their algal tenants.'
      }
    ]
  },
  {
    id: 'maya-civilization',
    title: 'The Rise of the Maya Civilization',
    content: [
      "The Maya civilization rose to prominence in the tropical seasonal forests of the Mesoamerican lowlands. Classic Maya culture, from 250 to 900 CE, was marked by sophisticated agricultural practices, remarkable hieroglyphic writing, and complex astronomical science. Unlike other ancient empires, the Maya were not unified under a single ruler; instead, they consisted of numerous semi-independent city-states. These polities engaged in dynamic networks of trade, diplomacy, and periodic [A] warfare. [SQ-A]",
      "The agricultural basis of Maya success lay in their ingenious environmental modifications. Facing poor tropical soils and alternating seasons of rain and drought, they developed high-yield raised fields, terraced hillsides, and expansive reservoirs. [SQ-B] Reservoirs allowed them to store millions of gallons of water, keeping populations supplied during the intense dry season. [SQ-C] These modifications supported dense urban environments in cities like Tikal and Copán.",
      "The cultural achievements of the Maya are preserved on stone monuments, or stelae, which depict royal lineages, conquest narratives, and ritual occurrences. Their mathematical system, featuring the concept of zero, allowed for precise astronomical calendars that tracked celestial bodies over thousands of years. [SQ-D] This complex intellectual heritage illustrates the remarkable height of pre-Columbian achievements in the Americas."
    ],
    questions: [
      {
        id: 'mc-q1',
        question: 'The word "warfare" in the passage is closest in meaning to',
        options: ['military conflict', 'trade competition', 'cultural exchange', 'legal dispute'],
        answer: 0,
        explanation: '"Warfare" refers to military action or armed conflict between groups or states.',
        type: 'multiple-choice',
        highlight: 'warfare',
        paragraphIndex: 0,
        marker: 'A'
      },
      {
        id: 'mc-q2',
        question: 'According to Paragraph 1, how did the political structure of the Maya differ from other ancient empires?',
        options: [
          'They had no formal rulers or nobility.',
          'They were divided into multiple semi-independent city-states.',
          'They was entirely unified under one centralized emperor.',
          'They relied exclusively on religious leaders to draft laws.'
        ],
        answer: 1,
        explanation: 'The passage notes: "the Maya were not unified under a single ruler; instead, they consisted of numerous semi-independent city-states."',
        type: 'multiple-choice'
      },
      {
        id: 'mc-q3',
        question: 'According to Paragraph 2, all of the following were environmental modifications used by the Maya EXCEPT:',
        options: [
          'Raised fields in low areas',
          'Terraced hillsides',
          'Expansive stone aqueducts bringing water from distant mountains',
          'Deep reservoirs for water storage'
        ],
        answer: 2,
        explanation: 'Paragraph 2 mentions raised fields, terracing, and reservoirs, but does not state they built distant mountain aqueducts.',
        type: 'multiple-choice'
      },
      {
        id: 'mc-q4',
        question: 'Why does the author mention "the concept of zero" in Paragraph 3?',
        options: [
          'To argue that the Maya mathematical system was superior to modern systems.',
          'To provide an example of the sophistication of Maya intellectual efforts.',
          'To explain why the Maya were unable to build tall stone stelae.',
          'To illustrate how Maya merchants calculated trade taxes.'
        ],
        answer: 1,
        explanation: 'Mentioning the concept of zero illustrates their advanced mathematical capacity, pointing to their complex intellectual heritage.',
        type: 'multiple-choice'
      },
      {
        id: 'mc-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 2,
        explanation: 'This sentence describes the critical necessity of storing seasonal rain, which belongs directly in the discussion of reservoirs and agricultural infrastructure.',
        type: 'sentence-insertion',
        sentenceToInsert: 'Because rainfall was highly seasonal, storing these summer rains was essential to survive the parched winters.'
      }
    ]
  },
  {
    id: 'glacial-cycles',
    title: 'Glacial Cycles and Ice Ages',
    content: [
      "Earth's climate has periodically swung between warm interglacial states and cold, ice-dominated glacial epochs. These massive climate shifts, collectively known as ice ages, are driven primarily by orbital variations called Milankovitch cycles. Milankovitch identified three orbital changes: eccentricity (how circular or oval Earth's orbit is), obliquity (the tilt of Earth's axis), and precession (the wobble of the axis). [SQ-A] Together, these variables alter the spatial distribution and concentration of [A] solar radiation reaching Earth's surface.",
      "The key trigger for a glacial cycle is the solar radiation received at high northern latitudes during the summer. If summer sunlight is weak, snow accumulated over the winter does not melt entirely. [SQ-B] Over centuries, this persistent snowpacks thickens, compacts into ice, and begins flowing under its own weight as colossal glaciers. [SQ-C] As these massive white sheets expand, they reflect more summer sunlight back into space, initiating a cooling feedback loop that speeds up glacial growth.",
      "During peak glacial cycles, sea levels plummeted by over a hundred meters as oceans supplied water to the expanding terrestrial ice sheets. Land bridges emerged, allowing major animal and human migrations. [SQ-D] Understanding these past cycles helps modern climatologists construct reliable baselines to evaluate human influence on global climates."
    ],
    questions: [
      {
        id: 'gc-q1',
        question: 'The word "solar radiation" in the passage is closest in meaning to',
        options: ['atmospheric wind', 'sunlight energy', 'terrestrial heat', 'tidal pressure'],
        answer: 1,
        explanation: '"Solar radiation" refers to light and radiant energy emitted by the sun.',
        type: 'multiple-choice',
        highlight: 'solar radiation',
        paragraphIndex: 0,
        marker: 'A'
      },
      {
        id: 'gc-q2',
        question: 'According to Paragraph 1, what are the three parts of Milankovitch cycles?',
        options: [
          'Precipitation, wind speeds, and cloud formations',
          'Luminescence, core core currents, and solar wind',
          'Eccentricity, obliquity, and axial precession',
          'Reflective ice, marine levels, and continental drift'
        ],
        answer: 2,
        explanation: 'Paragraph 1 lists: "eccentricity (how circular or oval Earth\'s orbit is), obliquity (the tilt of Earth\'s axis), and precession (the wobble of the axis)."',
        type: 'multiple-choice'
      },
      {
        id: 'gc-q3',
        question: 'According to Paragraph 2, what serves as the crucial trigger initiating a glacial period?',
        options: [
          'Unusual volcanic activity in equatorial areas',
          'Weak solar radiation at high northern latitudes during the summer',
          'Heavy rainfall over southern terrestrial oceans',
          'The complete melting of high-latitude winter glaciers'
        ],
        answer: 1,
        explanation: 'The paragraph states: "The key trigger for a glacial cycle is the solar radiation received at high northern latitudes during the summer. If summer sunlight is weak..."',
        type: 'multiple-choice'
      },
      {
        id: 'gc-q4',
        question: 'What is the "cooling feedback loop" described in Paragraph 2?',
        options: [
          'Snowfall reflecting heat, leading to more local warming cycles.',
          'Melting glaciers increasing ocean currents that carry deep heat away.',
          'Expanding ice reflecting sunlight, which cools the planet and grows more ice.',
          'Persistent cloud cover cooling ocean floors and freezing continental plates.'
        ],
        answer: 2,
        explanation: 'Paragraph 2 explains: "As these massive white sheets expand, they reflect more summer sunlight back into space, initiating a cooling feedback loop that speeds up glacial growth."',
        type: 'multiple-choice'
      },
      {
        id: 'gc-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 3,
        explanation: 'This sentence describes the physical result of oceans supplying water to land ice, fitting perfectly after the plummeting sea levels and before modern baselines.',
        type: 'sentence-insertion',
        sentenceToInsert: 'Vast zones of continental shelves that were once deeply submerged became entirely dry, hospitable valleys.'
      }
    ]
  },
  {
    id: 'cetacean-evolution',
    title: 'The Evolution of Cetaceans',
    content: [
      "The evolutionary transition of cetaceans (whales, dolphins, and porpoises) from terrestrial mammals to aquatic masters represents one of paleontology's most complete narratives. Fossil discoveries over the past few decades have uncovered a series of transitional species linking modern cetaceans to land dwelling ancestors called raoellids. [SQ-A] These early ancestors lived near ancient shorelines, gradually spending more time in shallow water to escape terrestrial predators or locate food resources. [SQ-B]",
      "The iconic intermediate species Pakicetus, living fifty million years ago, was a four-legged land animal that possessed a skull shape and ear bones unique to modern whales. Moving further along the evolutionary timeline, Ambulocetus, also known as the \"walking whale,\" possessed webbed feet and was [A] suited for both swimming and walking. Basilosaurus, which lived forty million years ago, displayed tiny, vestigial hind legs that could no longer support its weight, demonstrating that it was fully aquatic but retained anatomical ties to its land-dwelling past. [SQ-C]",
      "As whales became fully aquatic, their bodies underwent radical transformations. Nostrils migrated to the top of the skull to form blowholes, modern forelimbs morphed into steering flippers, and heavy hind legs completely vanished. [SQ-D] These modifications allowed cetaceans to successfully colonize diverse marine environments across the globe, illustrating how ecological niches steer morphological adaptation."
    ],
    questions: [
      {
        id: 'ce-q1',
        question: 'The word "suited" in the passage is closest in meaning to',
        options: ['prepared', 'adapted', 'promoted', 'destined'],
        answer: 1,
        explanation: '"Suited" in this context means adapted or fittingly designed for both swimming and walking.',
        type: 'multiple-choice',
        highlight: 'suited',
        paragraphIndex: 1,
        marker: 'A'
      },
      {
        id: 'ce-q2',
        question: 'According to Paragraph 2, how does Basilosaurus show its evolutionary transition?',
        options: [
          'It lacked any skull characteristics resembling whales.',
          'It spent ninety percent of its time on dry land to escape marine hunters.',
          'It possessed tiny, vestigial hind legs that could not support its weight.',
          'It relied on massive gills instead of lungs to process oxygen.'
        ],
        answer: 2,
        explanation: 'Paragraph 2 mentions: "Basilosaurus... displayed tiny, vestigial hind legs that could no longer support its weight," documenting its fully aquatic life with connections to land ancestral history.',
        type: 'multiple-choice'
      },
      {
        id: 'ce-q3',
        question: 'According to the passage, all of the following morphological changes occurred as cetaceans became fully aquatic EXCEPT:',
        options: [
          'Nostrils migrated to the top of the skull to form blowholes.',
          'Forelimbs transformed into steering flippers.',
          'Hind legs disappeared completely.',
          'The respiratory system changed to gill-based breathing.'
        ],
        answer: 3,
        explanation: 'Cetaceans are mammals and continued to breathe air through lungs via a blowhole, not gills.',
        type: 'multiple-choice'
      },
      {
        id: 'ce-q4',
        question: 'What is the author\'s main point in describing Pakicetus?',
        options: [
          'To demonstrate that the earliest whale ancestors were fully aquatic fish-eaters.',
          'To show how a land creature carried distinct skeletal elements that connect it to modern whales.',
          'To prove that Ambulocetus walked faster on land than Pakicetus.',
          'To explain the role of raoellids in shallow marine valleys.'
        ],
        answer: 1,
        explanation: 'Pakicetus is described as a "four-legged land animal that possessed a skull shape and ear bones unique to modern whales," illustrating the connection.',
        type: 'multiple-choice'
      },
      {
        id: 'ce-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 1,
        explanation: 'This sentence introduces fossil records of coastal transition, belonging after the initial mention of early ancestors in shallow waters.',
        type: 'sentence-insertion',
        sentenceToInsert: 'Over subsequent generations, these organisms developed adaptations that enhanced swimming efficiency, like flattened tails.'
      }
    ]
  },
  {
    id: 'writing-systems',
    title: 'The Development of Writing Systems',
    content: [
      "The invention of writing is arguably humanity's most transformative intellectual breakthrough. It allowed information to transcend the limits of face-to-face speech, permitting laws, records, and ideas to be stored and transmitted across both space and time. Writing did not emerge from a single source; instead, it arose [A] independently in several distinct regions around 3000 BCE, including Sumer in Mesopotamia, Egypt, and Shang-era China. [SQ-A]",
      "The earliest writing systems were not alphabetic, but pictographic and ideographic. Standard Sumerian cuneiform began as simple pictographs inscribed on soft clay tablets to tally agricultural goods, like livestock and grain shipments. [SQ-B] As administrative demands escalated, these pictographs became increasingly abstract, representing phonetic syllables rather than mere physical objects. [SQ-C] This crucial shift from concrete icons to complex phonetic signs transformed cuneiform into a highly versatile writing system capable of expressing intricate legal and literary concepts.",
      "In contrast, the Phoenicians developed the world's first consonantal alphabet, or abjad, around 1000 BCE. By associating single letters with individual spoke sounds instead of whole words or syllables, they drastically reduced the number of symbols a scribe had to memorize. [SQ-D] This revolutionary simplicity democratized literacy, paving the way for modern writing networks across the Mediterranean and beyond."
    ],
    questions: [
      {
        id: 'ws-q1',
        question: 'The word "independently" in the passage is closest in meaning to',
        options: ['rapidly', 'without external influence', 'sequentially', 'with religious purpose'],
        answer: 1,
        explanation: '"Independently" means separately, without relying on or being influenced by others.',
        type: 'multiple-choice',
        highlight: 'independently',
        paragraphIndex: 0,
        marker: 'A'
      },
      {
        id: 'ws-q2',
        question: 'According to Paragraph 2, how did cuneiform evolve over time?',
        options: [
          'It shifted from clay tablets to highly portable papyrus rolls.',
          'It evolved from simple agricultural tallies into abstract phonetic syllables.',
          'It became much simpler by reducing its vocabulary to twenty-two root letters.',
          'It was restricted entirely to tracking royal lineages and military victories.'
        ],
        answer: 1,
        explanation: 'Paragraph 2 notes that Sumerian cuneiform shifted from pictographs used to tally goods into "abstract" characters representing "phonetic syllables," expressing complex ideas.',
        type: 'multiple-choice'
      },
      {
        id: 'ws-q3',
        question: 'According to Paragraph 3, what was the primary advantage of the Phoenician consonantal alphabet?',
        options: [
          'It could be easily carved into stone stelae.',
          'It matched Sumerian clay tablets perfectly.',
          'It required memorizing far fewer symbols than syllable-based systems.',
          'It was used exclusively by wealthy rulers to restrict access to records.'
        ],
        answer: 2,
        explanation: 'The Phoenician alphabet associated letters with individual sounds rather than whole syllables, which "drastically reduced the number of symbols a scribe had to memorize."',
        type: 'multiple-choice'
      },
      {
        id: 'ws-q4',
        question: 'What is the relationship between cuneiform and Phoenician writing?',
        options: [
          'Phoenician text was an advanced form of cuneiform adapted for dry clay.',
          'Both systems originated in the same Sumerian temple administrative networks.',
          'Cuneiform was phonetic and ideographic, whereas Phoenician utilized a simplified alphabetic code.',
          'Cuneiform was imported to Phoenicia by Shang-era Chinese merchant networks.'
        ],
        answer: 2,
        explanation: 'The passage describes Sumerian cuneiform as evolving into phonetic syllables, whereas Phoenicians created an alphabet matching individual sounds, lowering the barrier to literacy.',
        type: 'multiple-choice'
      },
      {
        id: 'ws-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 1,
        explanation: 'This sentence describes the physical implements of early cuneiform writing, placeable after cuneiform clay tablets are introduced.',
        type: 'sentence-insertion',
        sentenceToInsert: 'Scribes pressed a sharp reed stylus into these wet clay surfaces to create wedge-shaped indentations.'
      }
    ]
  },
  {
    id: 'stellar-fusion',
    title: 'The Physics of Stellar Fusion',
    content: [
      "Stars are massive celestial nuclear reactors, held in a delicate balance between the inward pull of gravity and the outward pressure of thermal energy. This outward energy is generated in stellar cores through nuclear fusion, a process where light atomic nuclei combine to form heavier elements. In main-sequence stars like our Sun, the dominant fusion pathway is the proton-proton chain, where hydrogen is [A] converted into helium. [SQ-A]",
      "For fusion to occur, stellar cores must reach temperatures exceeding fifteen million Kelvin and extreme pressures. These extreme conditions are necessary to overcome the electrostatic repulsion, or Coulomb barrier, between positively charged protons. [SQ-B] Once protons are squeezed close enough, the strong nuclear force takes over, binding them together. [SQ-C] Because the mass of the resulting helium nucleus is slightly less than the sum of the original protons, the lost mass is converted into vast amounts of energy, calculated by Einstein's equation, E equals mc squared.",
      "As a star consumes its hydrogen, its core contracts and heats up, enabling the fusion of heavier elements like carbon, oxygen, and silicon. In massive stars, this process continues until a dense iron core forms. [SQ-D] Because iron fusion requires more energy than it releases, the star can no longer generate outward pressure, leading to gravitational collapse and a supernova explosion."
    ],
    questions: [
      {
        id: 'sf-q1',
        question: 'The word "converted" in the passage is closest in meaning to',
        options: ['compressed', 'transformed', 'released', 'accelerated'],
        answer: 1,
        explanation: '"Converted" means changed or transformed from one state or substance into another.',
        type: 'multiple-choice',
        highlight: 'converted',
        paragraphIndex: 0,
        marker: 'A'
      },
      {
        id: 'sf-q2',
        question: 'According to Paragraph 2, why are high temperatures and pressures required for nuclear fusion?',
        options: [
          'To cool the outer layers of the star.',
          'To overcome the electrostatic repulsion between positively charged protons.',
          'To generate gravitational magnetic fields in stellar cores.',
          'To accelerate the speed of the strong nuclear force.'
        ],
        answer: 1,
        explanation: 'High temperatures and pressures "are necessary to overcome the electrostatic repulsion, or Coulomb barrier, between positively charged protons."',
        type: 'multiple-choice'
      },
      {
        id: 'sf-q3',
        question: 'According to Paragraph 3, what occurs when a massive star develops an iron core?',
        options: [
          'The star produces twice as much outward chemical energy.',
          'The core expands and cools down instantly.',
          'The star can no longer generate outward pressure, resulting in collapse.',
          'The star transforms back into a stable main-sequence stage.'
        ],
        answer: 2,
        explanation: 'The text notes: "Because iron fusion requires more energy than it releases, the star can no longer generate outward pressure, leading to gravitational collapse..."',
        type: 'multiple-choice'
      },
      {
        id: 'sf-q4',
        question: 'What is the "lost mass" mentioned in Paragraph 2?',
        options: [
          'Mass ejected into space as stellar winds to freeze surrounding planets.',
          'Mass that converted into helium-3 without releasing thermal energy.',
          'The difference in mass between hydrogen protons and the resulting helium nucleus, which becomes energy.',
          'Mass condensed into the core that is calculated by obliquity rates.'
        ],
        answer: 2,
        explanation: 'The passage explains that helium has slightly less mass than the sum of the protons, and this mass difference is converted to energy via Einstein\'s formula.',
        type: 'multiple-choice'
      },
      {
        id: 'sf-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 1,
        explanation: 'This sentence explains the behavior of protons under general conditions, fitting well right after the primary electrostatic repulsion is introduced.',
        type: 'sentence-insertion',
        sentenceToInsert: 'Under normal circumstances, these positive charges forcefully repel one another like matching magnets.'
      }
    ]
  },
  {
    id: 'primary-succession',
    title: 'The Role of Lichens in Primary Succession',
    content: [
      "Primary ecological succession occurs in completely barren environments where no soil or organic material exists, such as newly formed volcanic islands or landscapes exposed by retreating glaciers. In these [A] desolate zones, the establishment of life seems impossible. Yet, pioneer species rise to the challenge, with lichens acting as the crucial initial colonizers. [SQ-A] A lichen is not a single organism, but a symbiotic partnership between a fungus and a photosynthetic partner, typically algae or cyanobacteria.",
      "Lichens are exceptionally adapted to survive in extreme physical environments. Lacking roots, they absorb moisture and nutrients directly from the Atmosphere and rain, allowing them to cling directly to bare rock. [SQ-B] As they grow, they produce weak organic acids that chemically break down the rock face over centuries. [SQ-C] This biochemical weathering, combined with physical cracking from freeze-thaw cycles, creates tiny fissures and releases essential minerals.",
      "Over generations, decaying lichen matter mixes with these mineral rock fragments, creating the very first thin layer of organic soil. Soil layer development allows mosses and small ferns to establish roots, replacing lichens. [SQ-D] Gradually, as soil depth increases, larger plants and eventually mature forests colonize the landscape, illustrating how pioneer species prepare the foundation for complex ecosystems."
    ],
    questions: [
      {
        id: 'ps-q1',
        question: 'The word "desolate" in the passage is closest in meaning to',
        options: ['unvisited', 'barren', 'mysterious', 'diverse'],
        answer: 1,
        explanation: '"Desolate" refers to a place that is empty, barren, or devoid of life.',
        type: 'multiple-choice',
        highlight: 'desolate',
        paragraphIndex: 0,
        marker: 'A'
      },
      {
        id: 'ps-q2',
        question: 'According to Paragraph 2, how do lichens chemically break down rock?',
        options: [
          'They use strong roots to crack the solid surface.',
          'They produce weak organic acids as they grow.',
          'They absorb minerals from volcanic soil layers.',
          'They extract heavy minerals by releasing warm water.'
        ],
        answer: 1,
        explanation: 'Paragraph 2 notes that lichens "produce weak organic acids that chemically break down the rock face..."',
        type: 'multiple-choice'
      },
      {
        id: 'ps-q3',
        question: 'According to the passage, all of the following are characteristics of lichens EXCEPT:',
        options: [
          'They are a symbiotic partnership between fungi and algae/cyanobacteria.',
          'They absorb moisture directly from the atmosphere and rain.',
          'They require a thick layer of organic soil to establish deep roots.',
          'They weather rock surfaces chemically over centuries.'
        ],
        answer: 2,
        explanation: 'Lichen lack roots and do not require soil; in fact, they establish themselves on bare rock before soil exists.',
        type: 'multiple-choice'
      },
      {
        id: 'ps-q4',
        question: 'What is the role of the decaying lichen matter mentioned in Paragraph 3?',
        options: [
          'It provides acidic runoff that prevents other plants from growing.',
          'It mixes with mineral rock particles to form the first organic soil.',
          'It feeds the herbivores that colonize the volcanic island.',
          'It protects the volcanic rock from freeze-thaw cycles.'
        ],
        answer: 1,
        explanation: 'Paragraph 3 explains: "decaying lichen matter mixes with these mineral rock fragments, creating the very first thin layer of organic soil."',
        type: 'multiple-choice'
      },
      {
        id: 'ps-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 1,
        explanation: 'This sentence elaborates on how they cling to rocks, fitting after they are introduced as being rootless and absorbing nutrients from rain.',
        type: 'sentence-insertion',
        sentenceToInsert: 'This surface attachment is so powerful that they remain secured despite high winds and heavy downpours.'
      }
    ]
  },
  {
    id: 'early-cinema',
    title: 'Early Cinematic Revolutions',
    content: [
      "The birth of cinema in the late nineteenth century revolutionized human entertainment and visual culture. The earliest moving pictures, developed by Inventors like Thomas Edison and the Lumière brothers, were short, non-narrative clips of daily occurrences, such as a train arriving at a station. [SQ-A] These displays, called \"actualities,\" fascinated viewers simply through the spectacle of captured motion, requiring no plot or character development. [SQ-B]",
      "The shift from simple actualities to narrative cinema was pioneered by filmmakers like Georges Méliès. A former magician, Méliès recognized the camera's potential to create illusion. He developed early special effects like stop-tricks, double exposure, and hand-painted color. His landmark 1902 film, *A Trip to the Moon*, was a [A] whimsical narrative that took audiences on an imaginative journey. [SQ-C] Through editing and staging, Méliès proved that cinema could tell stories, transforming it from a scientific novelty into an art form.",
      "Soon after, Edwin S. Porter introduced cross-cutting, or parallel editing, in his film *The Great Train Robbery*. By alternating between shots of different events occurring simultaneously, Porter built suspense and established complex story structures. [SQ-D] This editing breakthrough became the cornerstone of classical cinematic language, proving that camera manipulation, rather than theatrical staging, drove visual storytelling."
    ],
    questions: [
      {
        id: 'ec-q1',
        question: 'The word "whimsical" in the passage is closest in meaning to',
        options: ['realistic', 'fanciful', 'terrifying', 'academic'],
        answer: 1,
        explanation: '"Whimsical" means playful, fanciful, or amusingly imaginative.',
        type: 'multiple-choice',
        highlight: 'whimsical',
        paragraphIndex: 1,
        marker: 'A'
      },
      {
        id: 'ec-q2',
        question: 'According to Paragraph 1, what were "actualities"?',
        options: [
          'Detailed historical documentaries with narrators.',
          'Short, non-narrative clips recording everyday events.',
          'Animated sequences depicting mystical occurrences.',
          'Silent theatrical plays filmed on elaborate stages.'
        ],
        answer: 1,
        explanation: 'The passage defines actualities as "short, non-narrative clips of daily occurrences, such as a train arriving at a station."',
        type: 'multiple-choice'
      },
      {
        id: 'ec-q3',
        question: 'According to the passage, all of the following were cinematic developments introduced by Georges Méliès EXCEPT:',
        options: [
          'Stop-tricks',
          'Double exposure',
          'Cross-cutting between simultaneous actions',
          'Hand-painted color frames'
        ],
        answer: 2,
        explanation: 'Cross-cutting was introduced by Edwin S. Porter, not Georges Méliès, according to Paragraph 3.',
        type: 'multiple-choice'
      },
      {
        id: 'ec-q4',
        question: 'What made Porter\'s editing in "The Great Train Robbery" revolutionary?',
        options: [
          'It used hand-painted frames to depict massive explosions.',
          'It allowed actors to speak using early sound technologies.',
          'It built suspense by alternating shots of actions happening at the same time.',
          'It was filmed on location inside a real volcanic crater.'
        ],
        answer: 2,
        explanation: 'Porter introduced cross-cutting, which alternated between shots of simultaneous events to build suspense and drive the narrative structure.',
        type: 'multiple-choice'
      },
      {
        id: 'ec-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 2,
        explanation: 'This sentence describes Méliès\' film achievement, fitting best directly after mentions of his special effects and *A Trip to the Moon*.',
        type: 'sentence-insertion',
        sentenceToInsert: 'He utilized theatrical scenery and fantastical costumes to construct elaborate, other-worldly settings.'
      }
    ]
  },
  {
    id: 'bird-migration',
    title: 'The Mechanics of Bird Migration',
    content: [
      "Every year, billions of birds embark on colossal migrations to travel between seasonal nesting grounds and wintering habitats. Navigating over thousands of miles, they maintain precise courses across oceans, deserts, and mountain ranges. Researchers have discovered that birds do not rely on a single navigation tool; instead, they integrate multiple sensory systems. These include visual compasses tracking the Sun and stars, and an innate [A] magnetic sense that senses Earth's magnetic fields.",
      "The avian magnetic sense, known as magnetoreception, is particularly fascinating. Scientists have identified light-sensitive proteins called cryptochromes in the eyes of migratory songbirds. [SQ-A] When struck by specific wavelengths of blue light, these proteins undergo chemical reactions that are influenced by the direction of magnetic fields. [SQ-B] This biochemical process essentially allows birds to \"see\" magnetic lines, guiding their orientation even on cloudy nights. [SQ-C]",
      "In addition to compass navigation, birds rely on a cognitive map formed through experience. Older, experienced birds can correct for wind drift and geographic displacement, whereas young, first-time migrants often fail to adjust when blown off course. [SQ-D] This distinction highlights that while general direction is genetically programmed, precise route optimization is a product of learning and geographical memory."
    ],
    questions: [
      {
        id: 'bm-q1',
        question: 'The word "magnetic" in the passage refers to a sense that detects',
        options: ['atmospheric currents', 'electrical flows', 'geomagnetic fields', 'gravitational changes'],
        answer: 2,
        explanation: '"Magnetic sense" refers to magnetoreception, which detects geomagnetism.',
        type: 'multiple-choice',
        highlight: 'magnetic',
        paragraphIndex: 0,
        marker: 'A'
      },
      {
        id: 'bm-q2',
        question: 'According to Paragraph 2, how do cryptochromes help birds navigate?',
        options: [
          'They store iron particles that point to the geographical north.',
          'They react to blue light to let birds perceive magnetic field directions.',
          'They measure atmospheric pressure variations at high altitudes.',
          'They record star patterns on clear nights.'
        ],
        answer: 1,
        explanation: 'The passage explains that cryptochromes undergo chemical reactions "when struck by specific wavelengths of blue light" which "are influenced by the direction of magnetic fields."',
        type: 'multiple-choice'
      },
      {
        id: 'bm-q3',
        question: 'According to the passage, experienced migrants differ from first-time migrants because experienced migrants:',
        options: [
          'Can correct for wind drift and displacement.',
          'Rely solely on stars rather than magnetoreception.',
          'Fly much faster and cover twice the distance.',
          'Migrate during the day to avoid visual confusion.'
        ],
        answer: 0,
        explanation: 'Paragraph 3 notes: "experienced birds can correct for wind drift and geographic displacement, whereas young, first-time migrants often fail to adjust..."',
        type: 'multiple-choice'
      },
      {
        id: 'bm-q4',
        question: 'All of the following navigation tools are mentioned in the passage EXCEPT:',
        options: [
          'Tracking the position of the Sun',
          'Sensing Earth\'s magnetic fields',
          'Listening for sound echoes from geographic mountains',
          'Observing the arrangement of stars'
        ],
        answer: 2,
        explanation: 'Echo sounding or mountain echo listening is not listed as a migration mechanism.',
        type: 'multiple-choice'
      },
      {
        id: 'bm-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 2,
        explanation: 'This sentence adds detail about how the magnetic vision manifests, which fits perfectly after explaining how chemical reactions let birds "see" magnetic lines.',
        type: 'sentence-insertion',
        sentenceToInsert: 'This visual overlay appears to birds as light or dark patches across their normal field of view.'
      }
    ]
  },
  {
    id: 'silk-road',
    title: 'The Silk Road and Global Trade',
    content: [
      "The Silk Road was not a single, continuous paved highway, but a vast network of overland and maritime trade routes connecting China and East Asia with the Mediterranean world. Established during the Han Dynasty in 130 BCE, it facilitated the transfer of valuable commodities, most notably Chinese silk. [SQ-A] Central Asian merchants acted as intermediaries, moving goods in camel caravans across inhospitable deserts and high mountain passes, which made transport exceptionally expensive. Only luxury goods with high profit margins were [A] traded over such vast distances. [SQ-B]",
      "While commercial exchange was highly lucrative, the true legacy of the Silk Road lies in its role as a channel for cultural and technological transmission. Religions, languages, and philosophies spread along these trade arteries. For example, Buddhism traveled from India to China via merchant routes, transforming Chinese culture. [SQ-C] Similarly, monumental technological innovations, such as papermaking and gunpowder, traveled westward from China, reshaping Eurasian medieval history.",
      "The network began decline in the fourteenth century with the rise of the Ottoman Empire, which restricted overland trade, and the development of European maritime trade. [SQ-D] The transition to sea lanes proved cheaper, faster, and safer, shifting global economic leverage from landlocked corridors to powerful coastal empires."
    ],
    questions: [
      {
        id: 'sr-q1',
        question: 'The word "traded" in the passage is closest in meaning to',
        options: ['produced', 'exchanged', 'discovered', 'taxed'],
        answer: 1,
        explanation: 'To "trade" goods over distances refers to exchanging, selling, or bartering them.',
        type: 'multiple-choice',
        highlight: 'traded',
        paragraphIndex: 0,
        marker: 'A'
      },
      {
        id: 'sr-q2',
        question: 'According to Paragraph 1, why were Central Asian merchants so critical to the Silk Road?',
        options: [
          'They produced the majority of the silk sold in Western markets.',
          'They acted as intermediaries moving cargo across deserts and mountain passes.',
          'They built deep sea vessels for oceanic caravans.',
          'They constructed stone highways to allow vehicles to travel quickly.'
        ],
        answer: 1,
        explanation: 'Paragraph 1 mentions: "Central Asian merchants acted as intermediaries, moving goods in camel caravans..."',
        type: 'multiple-choice'
      },
      {
        id: 'sr-q3',
        question: 'According to Paragraph 2, all of the following traveled westward along the Silk Road EXCEPT:',
        options: [
          'Buddhism',
          'Papermaking technology',
          'Gunpowder',
          'Valuable printing systems'
        ],
        answer: 0,
        explanation: 'Buddhism traveled *eastward* from India into China, and was not a westward export from China like papermaking and gunpowder.',
        type: 'multiple-choice'
      },
      {
        id: 'sr-q4',
        question: 'Why did the Silk Road decline in the fourteenth century?',
        options: [
          'A sudden global ice age blocked desert corridors with glaciers.',
          'Ottoman trade restrictions and the development of cheaper European sea lanes.',
          'The collapse of the Chinese Han Dynasty in East Asia.',
          'A complete depletion of the world\'s silk production capabilities.'
        ],
        answer: 1,
        explanation: 'Paragraph 3 notes: "decline in the fourteenth century with the rise of the Ottoman Empire, which restricted overland trade, and the development of European maritime trade" which was cheaper and faster.',
        type: 'multiple-choice'
      },
      {
        id: 'sr-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 1,
        explanation: 'This sentence describes the physical nature of caravans, which fits right after the first introduction of Central Asian intermediaries in camel caravans.',
        type: 'sentence-insertion',
        sentenceToInsert: 'These massive structures traveled in tightly organized groups to deter bandits and pool water resources.'
      }
    ]
  },
  {
    id: 'deepsea-vents',
    title: 'Deep Sea Hydrothermal Ecosystems',
    content: [
      "Until late twentieth century, scientists assumed that all life on Earth relied ultimately on solar energy. This paradigm was shattered in 1977 with the discovery of hydrothermal vents along the Galápagos Rift, thousands of meters below the ocean surface. In this [A] pitch-black environment, researchers found thriving, complex communities of giant tube worms, crabs, and shrimp. Lacking sunlight, these ecosystems rely on chemosynthesis rather than photosynthesis to produce energy.",
      "The primary producers in these dark habitats are specialized chemosynthetic bacteria. These microbes utilize dissolved hydrogen sulfide venting from the seabed, combining it with oxygen to produce glucose and sulfur. [SQ-A] Many vent animals, such as the giant tube worm *Riftia pachyptila*, have evolved symbiotic relationships with these bacteria. [SQ-B] The tube worms possess a specialized organ called a trophosome filled with chemosynthetic bacteria, which supply host worms with vital carbon compound nutrients. [SQ-C]",
      "These hydrothermal vents are highly dynamic and temporary geologic structures. Driven by volcanic activity, they can shut down abruptly when magma channels shift, freezing the surrounding vents and starving local communities. [SQ-D] The study of these resilient marine complexes has expanded our understanding of life's ecological limits, raising the possibility of similar microbial ecosystems on icy outer moons like Europa."
    ],
    questions: [
      {
        id: 'ds-q1',
        question: 'The word "pitch-black" in the passage is closest in meaning to',
        options: ['cold', 'completely dark', 'highly pressurized', 'mineral-rich'],
        answer: 1,
        explanation: '"Pitch-black" means intense darkness, which fits the environment thousands of meters deep where light from the sun cannot reach.',
        type: 'multiple-choice',
        highlight: 'pitch-black',
        paragraphIndex: 0,
        marker: 'A'
      },
      {
        id: 'ds-q2',
        question: 'According to Paragraph 2, how do chemosynthetic bacteria generate energy?',
        options: [
          'By absorbing thermal radiation from active underwater volcanoes.',
          'By using dissolved hydrogen sulfide and combining it with oxygen.',
          'By performing photosynthesis using weak ambient light.',
          'By consuming decaying tissues of tube worms.'
        ],
        answer: 1,
        explanation: 'The passage states: "These microbes utilize dissolved hydrogen sulfide venting from the seabed, combining it with oxygen..."',
        type: 'multiple-choice'
      },
      {
        id: 'ds-q3',
        question: 'According to the passage, all of the following are animals found near hydrothermal vents EXCEPT:',
        options: ['Giant tube worms', 'Crabs', 'Shrimp', 'Marine iguanas'],
        answer: 3,
        explanation: 'Marine iguanas are shallow diving organisms, not deep-sea hydrothermal vent dwellers.',
        type: 'multiple-choice'
      },
      {
        id: 'ds-q4',
        question: 'Why are hydrothermal vent structures described as "temporary"?',
        options: [
          'They dissolve in ocean water within a single year.',
          'They rely on volcanic systems that can shut down when magma channels shift.',
          'They are regularly mined by deep-sea robotic exploration structures.',
          'They depend on cold ocean currents that only move seasonally.'
        ],
        answer: 1,
        explanation: 'The third paragraph points out: "they can shut down abruptly when magma channels shift, freezing the surrounding vents..."',
        type: 'multiple-choice'
      },
      {
        id: 'ds-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 2,
        explanation: 'This sentence describes the specialized biological features of the giant tube worm Riftia pachyptila, belonging directly after the worm is introduced in Paragraph 2.',
        type: 'sentence-insertion',
        sentenceToInsert: 'Because they lack mouths, guts, or digestive systems, these worms are entirely dependent on their internal bacterial partners.'
      }
    ]
  },
  {
    id: 'impact-extinctions',
    title: 'Impact Crater Events and Extinctions',
    content: [
      "The theory that a giant asteroid impact triggered the extinction of the non-avian dinosaurs sixty-six million years ago was initially met with resistance. Proposed by Luis and Walter Alvarez in 1980, the hypothesis was based on a global layer of clay enriched with iridium, an element [A] abundant in asteroids but rare in Earth's crust. [SQ-A] The discovery of the massive Chicxulub crater under the Yucatán Peninsula in Mexico provided the definitive location, silencing critics and confirming the extraterrestrial theory.",
      "The consequences of the Chicxulub impact were swift and catastrophic. The initial collision released energy equivalent to billions of atomic bombs, triggering global forest fires, severe tsunamis, and intense volcanic activity. [SQ-B] However, the most lethal consequence was the lofting of gigatons of vaporized rock and sulfur high into the atmosphere. [SQ-C] This global aerosol layer blocked sunlight for years, halting photosynthesis and causing a severe food chain collapse.",
      "This astronomical event ended the Cretaceous Period, exterminating up to seventy-five percent of all species on Earth. [SQ-D] While devastating, this catastrophic extinction opened up ecological space for small mammals to evolve, eventually leading to the radiation of diverse mammal species we see today."
    ],
    questions: [
      {
        id: 'ie-q1',
        question: 'The word "abundant" in the passage is closest in meaning to',
        options: ['highly reactive', 'plentiful', 'frozen', 'unusable'],
        answer: 1,
        explanation: 'If iridium is "abundant in asteroids", it means it is plentiful or present in large quantities in asteroids.',
        type: 'multiple-choice',
        highlight: 'abundant',
        paragraphIndex: 0,
        marker: 'A'
      },
      {
        id: 'ie-q2',
        question: 'What evidence first led Luis and Walter Alvarez to propose the asteroid impact theory?',
        options: [
          'Detailed fossil tracks of asteroid strikes in early oceans',
          'A global clay layer heavily enriched with iridium',
          'An ancient meteor crater preserved in north-central Asia',
          'Sudden changes in solar obliquity and cosmic dust'
        ],
        answer: 1,
        explanation: 'The hypothesis was based on finding "a global layer of clay enriched with iridium, an element abundant in asteroids but rare in Earth\'s crust."',
        type: 'multiple-choice'
      },
      {
        id: 'ie-q3',
        question: 'According to the passage, what was the most lethal consequence of the Chicxulub impact?',
        options: [
          'Massive tsunamis flooding all coastal bays',
          'An atmospheric aerosol blanket that blocked sunlight and stopped photosynthesis',
          'Droughts that directly depleted the asteroid\'s iridium content',
          'Intense local volcanic heat around the Yucatan region'
        ],
        answer: 1,
        explanation: 'The passage explicitly says "the most lethal consequence was the lofting of gigatons of vaporized rock... This global aerosol layer blocked sunlight for years, halting photosynthesis..."',
        type: 'multiple-choice'
      },
      {
        id: 'ie-q4',
        question: 'How did the Cretaceous extinction event benefit mammals?',
        options: [
          'It allowed them to feed on volcanic mineral nutrients.',
          'It wiped out dinosaurs, freeing up ecological space for mammal evolution and expansion.',
          'It triggered adaptations that allowed them to live on asteroid rock.',
          'It forced mammals to develop aquatic breathing systems.'
        ],
        answer: 1,
        explanation: 'Paragraph 3 notes: "this catastrophic extinction opened up ecological space for small mammals to evolve, eventually leading to the radiation of diverse mammal species..."',
        type: 'multiple-choice'
      },
      {
        id: 'ie-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 2,
        explanation: 'This sentence describes the thermal block associated with atmospheric particles, fitting right after block of sunlight and halts to photosynthesis.',
        type: 'sentence-insertion',
        sentenceToInsert: 'Known as an "impact winter," this period caused global temperatures to drop to near-freezing levels.'
      }
    ]
  },
  {
    id: 'printing-press',
    title: 'The Invention and Spread of Printing',
    content: [
      "The development of movable type printing in mid-fifteenth-century Germany represents a monumental turning point in global communication. Johannes Gutenberg developed a system that combined movable metal letters, oil-based inks, and a mechanical wooden press. [SQ-A] Before Gutenberg, books in Europe were painstakingly handwritten by monks or printed using woodblock matrices, making them [A] scarce luxury goods available only to elites. Gutenberg's press drastically expedited production, lowering costs and making books highly accessible. [SQ-B]",
      "The rapid spread of printing presses across Europe catalyzed the Renaissance, the Scientific Revolution, and the Reformation. Information could now be shared rapidly, accurately, and in localized vernacular languages rather than Latin. [SQ-C] Scientists could publish their research with exact botanical illustrations and mathematical charts, and ideas could circle the globe, breaking the Catholic Church's long monopoly on information.",
      "The rise of print shops also fostered the development of a public sphere, encouraging literacy, critical debate, and political awareness. [SQ-D] By making written knowledge an affordable commodity, the printing press laid the intellectual foundation for modern democracies, illustrating how technological innovation accelerates socio political evolution."
    ],
    questions: [
      {
        id: 'pp-q1',
        question: 'The word "scarce" in the passage is closest in meaning to',
        options: ['illiterate', 'rare', 'fragile', 'valuable'],
        answer: 1,
        explanation: '"Scarce" means hard to find, rare, or in short supply, which describes books before movable type.',
        type: 'multiple-choice',
        highlight: 'scarce',
        paragraphIndex: 0,
        marker: 'A'
      },
      {
        id: 'pp-q2',
        question: 'According to Paragraph 1, what components did Gutenberg combine to create his printing system?',
        options: [
          'Papyrus scrolls, animal skin bindings, and clay inks.',
          'Movable metal letters, oil-based inks, and a mechanical wooden press.',
          'Handwritten stencils, iron engravings, and mechanical roll mills.',
          'Wax tablets, copper block prints, and water press machines.'
        ],
        answer: 1,
        explanation: 'Gutenberg "developed a system that combined movable metal letters, oil-based inks, and a mechanical wooden press."',
        type: 'multiple-choice'
      },
      {
        id: 'pp-q3',
        question: 'According to Paragraph 2, how did the scientific community benefit from the printing press?',
        options: [
          'They were able to build larger wooden laboratories.',
          'They could publish research with exact illustrations and mathematical charts.',
          'The Catholic Church hired them exclusively to write in Latin.',
          'Printing shops paid them high salaries to manage printing machinery.'
        ],
        answer: 1,
        explanation: 'Paragraph 2 notes: "Scientists could publish their research with exact botanical illustrations and mathematical charts..."',
        type: 'multiple-choice'
      },
      {
        id: 'pp-q4',
        question: 'All of the following are mentioned as societal changes catalyzed by the printing press EXCEPT:',
        options: [
          'Fostering the development of a public sphere',
          'Breaking the Catholic Church\'s absolute monopoly on information',
          'Encouraging literacy and critical debate',
          'Restricting writing to select Latin-speaking elites'
        ],
        answer: 3,
        explanation: 'The printing press democratized literacy and promoted local vernacular languages, rather than restricting it to Latin-reading elites.',
        type: 'multiple-choice'
      },
      {
        id: 'pp-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 1,
        explanation: 'This sentence contrasts the previous speed of paper copying, fitting naturally after the description of pre-Gutenberg hand copying and Gutenberg\'s rapid production.',
        type: 'sentence-insertion',
        sentenceToInsert: 'A single print shop could produce as many books in a single week as a scribe could complete in a lifetime.'
      }
    ]
  },
  {
    id: 'primate-cognition',
    title: 'Cognitive Development in Primates',
    content: [
      "Primate cognitive research explores the evolutionary pathways of intelligence, self-awareness, and social dynamics. Studies of non-human primates, particularly chimpanzees and bonobos, have revealed cognitive abilities once thought unique to humans. These include tool development and use, symbolic communication, and complex spatial learning. In laboratory and field settings, chimpanzees demonstrate [A] remarkable problem-solving skills, passing complex tasks designed to evaluate mental planning. [SQ-A]",
      "A key aspect of primate cognition is 'Theory of Mind'—the ability to attribute mental states (beliefs, intents, desires, and knowledge) to oneself and others. [SQ-B] Researchers have demonstrated that chimpanzees understand what their competitors can and cannot see, adjusting their food gathering strategies accordingly. This capacity suggests primates are not merely reacting to social behaviors, but are predicting behaviors based on an understanding of others' focus and goals.",
      "Primate intelligence is also shaped by the 'social brain hypothesis,' which suggests that complex social networks drove the evolution of large primate brains. Navigating alliances, hierarchies, and cooperation requires significant computing power. [SQ-C] Over generations, individuals with superior social intelligence were more successful at reproducing, establishing a clear link between social complexity and neurological growth. [SQ-D]"
    ],
    questions: [
      {
        id: 'pc-q1',
        question: 'The word "remarkable" in the passage is closest in meaning to',
        options: ['unplanned', 'extraordinary', 'unnoticeable', 'traditional'],
        answer: 1,
        explanation: '"Remarkable" means extraordinary, highly unusual, or worthy of notice.',
        type: 'multiple-choice',
        highlight: 'remarkable',
        paragraphIndex: 0,
        marker: 'A'
      },
      {
        id: 'pc-q2',
        question: 'According to Paragraph 2, how do chimpanzees demonstrate "Theory of Mind"?',
        options: [
          'By memorizing star patterns and navigating at night.',
          'By understanding what competitors can and cannot see, adjusting their behaviors.',
          'By mimicking spoken human vowels in laboratory settings.',
          'By performing complicated mathematics using forest rocks.'
        ],
        answer: 1,
        explanation: 'Paragraph 2 highlights that chimpanzees "understand what their competitors can and cannot see, adjusting their food gathering strategies accordingly," showing an early Theory of Mind.',
        type: 'multiple-choice'
      },
      {
        id: 'pc-q3',
        question: 'According to the passage, what does the "social brain hypothesis" suggest?',
        options: [
          'Large brains evolved to help primates navigate complex social networks.',
          'Primate brains grew larger simply to process raw visual information.',
          'Social cooperation led to an immediate decline in tool usage.',
          'Volcanic climates stimulated cerebral growth in isolated primates.'
        ],
        answer: 0,
        explanation: 'The paragraph notes that the "social brain hypothesis... suggests that complex social networks drove the evolution of large primate brains."',
        type: 'multiple-choice'
      },
      {
        id: 'pc-q4',
        question: 'According to the passage, all of the following cognitive abilities have been identified in non-human primates EXCEPT:',
        options: [
          'The building and use of complex tools',
          'Spoken grammatical languages used to construct literature',
          'Symbolic signs and communication',
          'Complex spatial memory and learning'
        ],
        answer: 1,
        explanation: 'While primates communicate symbolically and through signs, they have not been documented as developing spoken grammatical spoken languages for literature.',
        type: 'multiple-choice'
      },
      {
        id: 'pc-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 2,
        explanation: 'This sentence details the mental challenges of social grouping, placeable in the paragraph talking about the social brain hypothesis.',
        type: 'sentence-insertion',
        sentenceToInsert: 'Managing these social alliances demands constant mental tracking of who is friendly or hostile to whom.'
      }
    ]
  },
  {
    id: 'soil-salinization',
    title: 'The Chemistry of Soil Salinization',
    content: [
      "Soil salinization is a severe land degradation process where water-soluble salts accumulate in the root zone, negatively affecting agricultural productivity. This issue is especially [A] acute in arid and semi-arid regions where low rainfall and high evaporation rates prevent salts from leaching down into the subsoil. [SQ-A] While salinization can occur naturally, it is frequently accelerated by human agricultural practices, particularly unsustainable irrigation methods. [SQ-B]",
      "In regions where modern irrigation relies on mineral-rich groundwater, crops absorb water but leave trace minerals behind. Over time, these mineral salts build up in the upper soil profile. [SQ-C] In addition, excessive irrigation, combined with poor drainage systems, causes the water table beneath the surface to rise. As the water table reaches near the root zone, saline groundwater is pulled upward by capillary action. When this capillary water reaches the surface, it evaporates, leaving a massive, crusty layer of white salt that chokes plant roots.",
      "The chemical impacts of salinity on plants are devastating. Highly saline soils have high osmotic pressure, drawing water out of plant roots and causing severe biological thirst, even in wet soils. Additionally, sodium ions have toxic effects on plant enzyme systems, halting photosynthesis. [SQ-D] Mitigating this issue requires advanced drip irrigation, salt-tolerant crops, and improved agricultural drainage networks."
    ],
    questions: [
      {
        id: 'ss-q1',
        question: 'The word "acute" in the passage is closest in meaning to',
        options: ['avoided', 'severe', 'unnoticed', 'temporary'],
        answer: 1,
        explanation: '"Acute" in this chemical and agricultural context means severe or intense.',
        type: 'multiple-choice',
        highlight: 'acute',
        paragraphIndex: 0,
        marker: 'A'
      },
      {
        id: 'ss-q2',
        question: 'According to Paragraph 2, how does excessive irrigation cause the water table to rise?',
        options: [
          'By increasing local atmospheric humidity and rain.',
          'By combining with poor drainage to allow water to accumulate underground.',
          'By evaporating rapidly and condensing into deep clay crevices.',
          'By triggering immediate seismic activities that push rock plates down.'
        ],
        answer: 1,
        explanation: 'Excessive irrigation, "combined with poor drainage systems, causes the water table beneath the surface to rise," bringing saline water to the roots.',
        type: 'multiple-choice'
      },
      {
        id: 'ss-q3',
        question: 'Why do highly saline soils cause "biological thirst" in plants?',
        options: [
          'The crusty salt layer blocks all rain from entering the soil.',
          'High osmotic pressure in saline soil draws moisture *out* of plant roots.',
          'Sodium ions destroy the specialized xylem structures inside stems.',
          'The salt triggers immediate root shedding, stopping water collection.'
        ],
        answer: 1,
        explanation: 'The text notes: "Highly saline soils have high osmotic pressure, drawing water out of plant roots and causing severe biological thirst..."',
        type: 'multiple-choice'
      },
      {
        id: 'ss-q4',
        question: 'According to the passage, all of the following are mentioned as methods to mitigate soil salinization EXCEPT:',
        options: [
          'Installing improved agricultural drainage networks',
          'Deploying advanced drip irrigation systems',
          'Cultivating specialized salt-tolerant crops',
          'Substantially increasing the volume of mineral-rich groundwater irrigation'
        ],
        answer: 3,
        explanation: 'Increasing the use of mineral-rich groundwater would worsen salinization, whereas of drip irrigation, drainage, and salt-tolerant crops are mitigation methods.',
        type: 'multiple-choice'
      },
      {
        id: 'ss-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 1,
        explanation: 'This sentence introduces the agricultural impact, which fits after naturally occurring vs. human accelerated salinization is introduced in Paragraph 1.',
        type: 'sentence-insertion',
        sentenceToInsert: 'When salt levels become too high, even the most resilient crops struggle to survive, eventually leaving fields entirely barren.'
      }
    ]
  },
  {
    id: 'gothic-architecture',
    title: 'Gothic Architecture and Engineering',
    content: [
      "In the twelfth century, a revolutionary architectural style emerged in northern France, replacing the solid, heavy Romanesque cathedrals with light, soaring Gothic monuments. Romanesque structures required massive stone walls and small windows to support the weight of heavy stone vaults, creating dark, fort-like interiors. Gothic master-builders, however, developed a series of ingenious engineering solutions that allowed them to build incredibly [A] lofty towers with vast, stained-glass windows. [SQ-A]",
      "The engineering basis of Gothic cathedral design relied on three core structural elements: the pointed arch, the ribbed vault, and the flying buttress. Pointed arches distributed weight downward rather than outward, reducing lateral forces. [SQ-B] Ribbed vaults acted as skeletal networks of stone ribs, supporting thin, lightweight masonry webs. [SQ-C] Most importantly, the flying buttress—a stone arch that bridged the exterior wall of a nave to an outlying masonry pier—effectively diverted the massive diagonal thrust of mountain-height vaults away from the main walls.",
      "By redirecting weight to exterior piers, flying buttresses freed interior walls from their load-bearing duties. This allowed builders to replace solid stonework with towering stained glass partitions, filling cathedrals with colorful light. [SQ-D] This structural shift illustrated how artistic vision and materials engineering combined to redefine human sacred spaces."
    ],
    questions: [
      {
        id: 'ga-q1',
        question: 'The word "lofty" in the passage is closest in meaning to',
        options: ['thick', 'tall', 'isolated', 'fragile'],
        answer: 1,
        explanation: '"Lofty" means high, soaring, or tall.',
        type: 'multiple-choice',
        highlight: 'lofty',
        paragraphIndex: 0,
        marker: 'A'
      },
      {
        id: 'ga-q2',
        question: 'According to Paragraph 1, why did Romanesque cathedrals have dark, fort-like interiors?',
        options: [
          'They were built exclusively inside military forts.',
          'They required thick stonework and very small windows to bear the heavy vaults.',
          'Architects did not know how to cut glass.',
          'They were designed to withstand severe volcanic eruptions.'
        ],
        answer: 1,
        explanation: 'Paragraph 1 notes: "Romanesque structures required massive stone walls and small windows to support the weight of heavy stone vaults, creating dark, fort-like interiors."',
        type: 'multiple-choice'
      },
      {
        id: 'ga-q3',
        question: 'What was the specific function of the flying buttress in Gothic construction?',
        options: [
          'To supply external scaffolding during early construction phases.',
          'To divert the massive diagonal thrust of the vault away from the main walls.',
          'To block excessive sunlight from blinding the congregation.',
          'To decorative the outer spires with mystical stone animal statues.'
        ],
        answer: 1,
        explanation: 'Paragraph 2 notes that the flying buttress is a stone arch that "effectively diverted the massive diagonal thrust of mountain-height vaults away from the main walls."',
        type: 'multiple-choice'
      },
      {
        id: 'ga-q4',
        question: 'According to the passage, all of the following were core elements of Gothic engineering EXCEPT:',
        options: [
          'The pointed arch',
          'The external flying buttress',
          'Solid, windowless load-bearing interior stone walls',
          'The lightweight ribbed vault'
        ],
        answer: 2,
        explanation: 'Gothic cathedrals replaced windowless load-bearing walls with stained glass, thanks to weight diversion via external buttresses.',
        type: 'multiple-choice'
      },
      {
        id: 'ga-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 1,
        explanation: 'This sentence describes pointed arches, which fits after pointed arches are first mentioned in the list of core elements.',
        type: 'sentence-insertion',
        sentenceToInsert: 'Unlike rounded Romanesque arches, these pointed structures could be raised to any height regardless of their width.'
      }
    ]
  },
  {
    id: 'honeybee-eusociality',
    title: 'The Evolution of Honeybee Eusociality',
    content: [
      "Eusociality represents the highest level of social organization in kingdoms of life, characterized by cooperative brood care, overlapping generations, and a division of labor into reproductive and non-reproductive castes. [SQ-A] Honeybees (*Apis mellifera*) are classic examples of eusocial insects, living in cooperative colonies ruled by a single queen and maintained by thousands of sterile female workers. [SQ-B] The evolutionary pathway of this self-sacrificing behavior initially puzzled Charles Darwin, as sterile worker bees do not pass on their genes directly.",
      "This evolutionary paradox is resolved by the concept of kin selection. In honeybee colonies, males are haploid (developing from unfertilized eggs and carrying one set of chromosomes), while females are diploid (developing from fertilized eggs). [SQ-C] Consequently, sisters share seventy five percent of their genes, whereas their genetic relatedness to their own offspring would only be fifty percent. [SQ-D] By [A] prioritizing the care of their sisters, workers pass on more copies of their shared genetic data than if they reproduced individually.",
      "This genetic math provides the evolutionary foundation for complex social behaviors, such as the elaborate 'waggle dance' used to communicate food coordinates. Eusociality illustrates that cooperation is not merely a social virtue, but a powerful survival strategy driven by molecular biology."
    ],
    questions: [
      {
        id: 'he-q1',
        question: 'The word "prioritizing" in the passage is closest in meaning to',
        options: ['avoiding', 'giving precedence to', 'limiting', 'recording'],
        answer: 1,
        explanation: '"Prioritizing" means treating something as more important or giving it precedence over options.',
        type: 'multiple-choice',
        highlight: 'prioritizing',
        paragraphIndex: 1,
        marker: 'A'
      },
      {
        id: 'he-q2',
        question: 'According to Paragraph 1, what are the three defining characteristics of eusociality?',
        options: [
          'Individual hunting, territorial nesting, and immediate independence.',
          'Cooperative brood care, overlapping generations, and caste division of labor.',
          'Spoken communications, complex tools, and agricultural farming.',
          'Seasonal hibernation, high mobility, and predatory defense.'
        ],
        answer: 1,
        explanation: 'The passage explicitly lists: "cooperative brood care, overlapping generations, and a division of labor into reproductive and non-reproductive castes."',
        type: 'multiple-choice'
      },
      {
        id: 'he-q3',
        question: 'According to the passage, why did the behavior of sterile worker bees puzzle Charles Darwin?',
        options: [
          'They refused to collect pollen from tropical flowers.',
          'They cannot pass their genes directly since they are sterile.',
          'They engaged in aggressive fights against the queen.',
          'They regularly migrated to other colonies during winters.'
        ],
        answer: 1,
        explanation: 'Darwin was puzzled because "sterile worker bees do not pass on their genes directly," challenging default ideas of natural selection focusing only on direct offspring.',
        type: 'multiple-choice'
      },
      {
        id: 'he-q4',
        question: 'What is the role of the "waggle dance" mentioned in Paragraph 3?',
        options: [
          'To select the next fertile queen for the colony.',
          'To scare off predatory insects and wasps.',
          'To communicate the location of distant food coordinates to other workers.',
          'To raise the temperature in the winter hive.'
        ],
        answer: 2,
        explanation: 'The waggle dance is described as an elaborate dance "used to communicate food coordinates."',
        type: 'multiple-choice'
      },
      {
        id: 'he-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 2,
        explanation: 'This sentence explains the genetic relatedness calculation, fitting directly after females and males are introduced in the kin selection paragraph.',
        type: 'sentence-insertion',
        sentenceToInsert: 'This specialized genetic system is known as haplodiploidy and creates highly unusual kinship dynamics.'
      }
    ]
  },
  {
    id: 'roman-aqueducts',
    title: 'Roman Aqueducts and Civil Engineering',
    content: [
      "The aqueducts of ancient Rome are outstanding achievements of ancient civil engineering, supplying millions of gallons of fresh water to public baths, private homes, and massive decorative fountains. Before their development, city populations were restricted to local streams and wells, which were easily depleted during summer droughts. [SQ-A] Roman engineers, however, recognized that abundant water supplies were critical to support a major imperial capital, [A] embarking on major pipeline efforts to source water from mountain springs miles away. [SQ-B]",
      "The construction of Roman aqueducts relied entirely on gravity. Spring water was directed into stone, brick, or concrete channels that flowed with a consistent, gentle downward slope. To maintain this gradient across jagged terrain, engineers utilized complex surveying instruments called groma, chorobates, and dioptra. [SQ-C] When channels encountered deep valleys, they constructed magnificent stone bridges consisting of multiple tiers of arches to keep water flowing continuously, while flat plains used siphons and lead pipes.",
      "Once water reached the city gates, it was delivered into massive storage tanks called castella, which separated supplies for public basins, baths, and private villas. [SQ-D] This equitable delivery system ensured that even the poorest citizens had access to clean drinking water, demonstrating Rome\'s advanced grasp of utility engineering and urban planning."
    ],
    questions: [
      {
        id: 'ra-q1',
        question: 'The word "embarking" in the passage is closest in meaning to',
        options: ['concluding', 'beginning', 'opposing', 'canceling'],
        answer: 1,
        explanation: 'To "embark" on an effort or journey means to start or begin it.',
        type: 'multiple-choice',
        highlight: 'embarking',
        paragraphIndex: 0,
        marker: 'A'
      },
      {
        id: 'ra-q2',
        question: 'According to Paragraph 2, what was the primary driving force behind aqueduct water flow?',
        options: [
          'Steam-powered pump stations along rivers',
          'Gentle downward slopes relying entirely on gravity',
          'Massive wooden wheels driven by beasts of burden',
          'Naturally high volcanic pressures at mountain sources'
        ],
        answer: 1,
        explanation: 'The text states: "The construction of Roman aqueducts relied entirely on gravity... flowing with a consistent, gentle downward slope."',
        type: 'multiple-choice'
      },
      {
        id: 'ra-q3',
        question: 'What was the specific function of a "castellum" mentioned in Paragraph 3?',
        options: [
          'An external fort to protect aqueducts from barbarian raids',
          'A filtration tank that removed fine sands and volcanic minerals',
          'A massive storage tank at city gates that separated water supplies',
          'A stone arch bridge used to span deep river gorges'
        ],
        answer: 2,
        explanation: 'Paragraph 3 notes: "water reached the city gates, it was delivered into massive storage tanks called castella, which separated supplies..."',
        type: 'multiple-choice'
      },
      {
        id: 'ra-q4',
        question: 'All of the following surveying instruments are mentioned in the passage EXCEPT:',
        options: ['groma', 'chorobates', 'castella', 'dioptra'],
        answer: 2,
        explanation: 'Castella are storage tanks, not surveying instruments. The surveying instruments mentioned are groma, chorobates, and dioptra.',
        type: 'multiple-choice'
      },
      {
        id: 'ra-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 2,
        explanation: 'This sentence describes the gradient calculations, fitting nicely with surveying and structural gradient details in Paragraph 2.',
        type: 'sentence-insertion',
        sentenceToInsert: 'If the slope was too steep, the rushing water would wear down the stone pipes; if too flat, the flow would stagnate.'
      }
    ]
  },
  {
    id: 'hydroelectric-power',
    title: 'Hydroelectric Power and Hydrology',
    content: [
      "Hydroelectric power utilizes the gravitational kinetic energy of flowing water to produce massive amounts of clean electricity. Liquid water, cycling from oceans to clouds, falls onto high continental elevations. Standard hydroelectric facilities construct massive concrete dams across river pathways, creating an elevated reservoir. [SQ-A] By capturing and directing this water through massive pipes called penstocks, engineers [A] utilize the immense pressure to spin colossal turbines, which drive electronic generators to produce electrical power. [SQ-B]",
      "The hydrological foundation of hydro power relies on the concept of potential energy. The volume of water and the vertical distance, or head, that the water drops determine the raw energy potential. [SQ-C] Higher heads translate to greater pressure, spinning turbines faster. However, this process alters local river ecologies, blocking fish migrations (such as salmon returning to spawn) and altering sedimentation downstream, where nutrients can become depleted.",
      "To mitigate ecological issues, modern dams are equipped with fish ladders, allowing species to scale the concrete structures safely. [SQ-D] Additionally, hydrologists carefully coordinate water releases to mimic natural seasonal flooding cycles, balancing human power demands with the delicate equilibrium of surrounding river basins."
    ],
    questions: [
      {
        id: 'hp-q1',
        question: 'The word "utilize" in the passage is closest in meaning to',
        options: ['measure', 'make use of', 'diminish', 'withstand'],
        answer: 1,
        explanation: '"Utilize" means to make use of or employ for a practical purpose.',
        type: 'multiple-choice',
        highlight: 'utilize',
        paragraphIndex: 0,
        marker: 'A'
      },
      {
        id: 'hp-q2',
        question: 'According to Paragraph 1, what are the pipes that direct elevated reservoir water to the turbines called?',
        options: ['reservoirs', 'penstocks', 'astrolabes', 'aqueducts'],
        answer: 1,
        explanation: 'Paragraph 1 mentions that water is directed "through massive pipes called penstocks..."',
        type: 'multiple-choice'
      },
      {
        id: 'hp-q3',
        question: 'According to Paragraph 2, what factors determine the raw potential energy of a facility?',
        options: [
          'The chemical purity and pH level of the mountain water',
          'The volume of water and the vertical distance it falls',
          'The thickness of the concrete dam base',
          'The speed of sea winds above outer reservoirs'
        ],
        answer: 1,
        explanation: 'The passage notes: "The volume of water and the vertical distance, or head, that the water drops determine the raw energy potential."',
        type: 'multiple-choice'
      },
      {
        id: 'hp-q4',
        question: 'All of the following ecological issues are mentioned as consequences of dams EXCEPT:',
        options: [
          'Blocking fish migrations upriver to nesting sites',
          'Disrupting natural sediment transport and nutrients downstream',
          'Depleting trace minerals from mountain spring sources',
          'Altering downstream riverine thermal cycles and patterns'
        ],
        answer: 2,
        explanation: 'Dams do not deplete trace minerals from the mountain springs themselves; they block sediment downstream and stop fish migration.',
        type: 'multiple-choice'
      },
      {
        id: 'hp-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 3,
        explanation: 'This sentence introduces ecological solutions, which fits at the start of Paragraph 3 discussing fish ladders and mitigations.',
        type: 'sentence-insertion',
        sentenceToInsert: 'These engineering designs allow environmental specialists to restore some of the river\'s ecological connectivity.'
      }
    ]
  },
  {
    id: 'photosynthesis-origin',
    title: 'The Evolutionary Origin of Photosynthesis',
    content: [
      "The emergence of photosynthesis altered Earth's geosphere and biosphere, transitioning the planet from an anaerobic state to an oxygen-rich haven. Early Earth's atmosphere was filled with carbon dioxide, nitrogen, and methane, but lacked oxygen. [SQ-A] The earliest microbes, living near submarine hydrothermal vents, relied on anaerobic chemosynthesis. [SQ-B] However, around three billion years ago, primitive single-celled organisms called cyanobacteria developed the ability to [A] harness abundant solar energy, converting water and carbon dioxide into sugars and free oxygen. [SQ-C]",
      "This process, called oxygenic photosynthesis, had profound planetary impacts. Over millions of years, the oxygen produced by cyanobacteria accumulated in the oceans and eventually entered the atmosphere. This sudden surplus of oxygen triggered the Great Oxidation Event around 2.4 billion years ago. While this event proved highly toxic to many dominant anaerobic species, it allowed for the evolution of complex, multicellular life that relied on oxygen.",
      "Furthermore, atmospheric oxygen reacted under solar UV rays to form the ozone layer. [SQ-D] The ozone layer acted as a colossal cosmic shield, absorbing harmful radiation and allowing early organisms to safely migrate from protective ocean depths onto dry terrestrial land sheets, reshaping global evolutionary paths."
    ],
    questions: [
      {
        id: 'po-q1',
        question: 'The word "harness" in the passage is closest in meaning to',
        options: ['calculate', 'exploit', 'restrict', 'resist'],
        answer: 1,
        explanation: 'To "harness" energy means to capture, exploit, or control it for use.',
        type: 'multiple-choice',
        highlight: 'harness',
        paragraphIndex: 0,
        marker: 'A'
      },
      {
        id: 'po-q2',
        question: 'According to Paragraph 1, how did cyanobacteria generate glucose?',
        options: [
          'By extracting chemical hydrogen from molten core rifts.',
          'By utilizing solar energy to combine water and carbon dioxide.',
          'By absorbing thermal vents in complete oceanic darkness.',
          'By consuming tissues of complex multicellular land organisms.'
        ],
        answer: 1,
        explanation: 'Cyanobacteria converted "water and carbon dioxide into sugars and free oxygen" by harnessing "solar energy."',
        type: 'multiple-choice'
      },
      {
        id: 'po-q3',
        question: 'What was the Great Oxidation Event?',
        options: [
          'A rapid depletion of oxygen levels in the atmospheric sheets',
          'The accumulation of oxygen which toxicified anaerobic life but enabled complex multicellular life',
          'A massive volcanic eruption that filled the skies with carbon dioxide',
          'The first freezing cycle caused by orbital precession changes'
        ],
        answer: 1,
        explanation: 'The Great Oxidation Event was caused by cyanobacterial oxygen accumulation. It proved toxic to anaerobic organisms but paved the way for oxygen-breathing multicellular organisms.',
        type: 'multiple-choice'
      },
      {
        id: 'po-q4',
        question: 'According to Paragraph 3, how did the ozone layer affect biological evolution?',
        options: [
          'It cooled Earth\'s oceans so that glaciers could expand.',
          'It blocked solar ultraviolet radiation, enabling organisms to live on dry land.',
          'It produced sugar compounds that rained down onto early fields.',
          'It blocked oxygen from escaping back into deep space.'
        ],
        answer: 1,
        explanation: 'The ozone layer "acted as a colossal cosmic shield, absorbing harmful radiation and allowing early organisms to safely migrate from protective ocean depths onto dry terrestrial land..."',
        type: 'multiple-choice'
      },
      {
        id: 'po-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 1,
        explanation: 'This sentence describes early anaerobic constraints, fitting after early anaerobic chemosynthesis is introduced.',
        type: 'sentence-insertion',
        sentenceToInsert: 'These early creatures were highly sensitive to oxygen, viewing it as a lethal chemical poison.'
      }
    ]
  },
  {
    id: 'ice-age-refugia',
    title: 'Glacial Refugia and Biological Survival',
    content: [
      "During the peak of the last glacial maximum, colossal ice sheets covered massive tracts of North America and northern Europe, rendering these regions completely uninhabitable. Entire forests and ecosystems were forced to shift southward ahead of creeping glaciers. [SQ-A] Yet, despite massive environmental collapse, global species lists did not plummet entirely. [SQ-B] Instead, species survived in isolated, relatively warm geographic pocket zones called glacial refugia. [SQ-C]",
      "Glacial refugia were local regions that maintained unique microclimates suitable for life, isolated from surrounding ice sheets. In Europe, the Iberian, Italian, and Balkan peninsulas acted as major refugia. Mediterranean and maritime winds kept these zones temperate enough to preserve diverse plants, insects, and temperate forest trees. [SQ-D] Grounded in these pocket zones, isolated populations underwent rapid genetic [A] divergence, accumulating unique mutations that did not mix with outer populations.",
      "When the ice sheets eventually began to melt and retreat fifteen thousand years ago, surviving populations expanded outward from these refugia. This rapid recolonization of flat northern fields left distinct genetic signatures, allowing modern biologists to trace the exact migration paths of forest species."
    ],
    questions: [
      {
        id: 'ar-q1',
        question: 'The word "divergence" in the passage refers to a process of becoming',
        options: ['isolated', 'genetically different', 'physically identical', 'fully extinct'],
        answer: 1,
        explanation: 'In genetic terms, "divergence" refers to populations accumulating distinct mutations, becoming genetically different from each other.',
        type: 'multiple-choice',
        highlight: 'divergence',
        paragraphIndex: 1,
        marker: 'A'
      },
      {
        id: 'ar-q2',
        question: 'According to Paragraph 2, why did European peninsulas serve as excellent glacial refugia?',
        options: [
          'They were situated directly underneath slow flowing ice sheets.',
          'Temperate winds kept their microclimates warm enough to support forest species.',
          'They lacked any insect populations, saving plants from diseases.',
          'High volcanic soil salinization prevented trees from growing too tall.'
        ],
        answer: 1,
        explanation: 'Paragraph 2 notes that "Mediterranean and maritime winds kept these zones temperate enough to preserve diverse plants, insects, and temperate forest trees."',
        type: 'multiple-choice'
      },
      {
        id: 'ar-q3',
        question: 'According to Paragraph 3, what happened fifteen thousand years ago?',
        options: [
          'European peninsulas sank beneath rising ocean levels.',
          'Ice sheets began melting, and species expanded outward from refugia.',
          'Species became completely extinct due to sudden heatwaves.',
          'New land bridges arose, allowing forest trees to migrate to deep seas.'
        ],
        answer: 1,
        explanation: 'Paragraph 3 notes: "When the ice sheets eventually began to melt and retreat fifteen thousand years ago, surviving populations expanded outward..."',
        type: 'multiple-choice'
      },
      {
        id: 'ar-q4',
        question: 'All of the following are mentioned as European peninsulas that acted as refugia EXCEPT:',
        options: ['The Iberian peninsula', 'The Italian peninsula', 'The Balkan peninsula', 'The Scandinavian peninsula'],
        answer: 3,
        explanation: 'The text lists Iberian, Italian, and Balkan peninsulas. Scandinavian was likely covered in ice during the glacial maximum and is not listed as a refugium.',
        type: 'multiple-choice'
      },
      {
        id: 'ar-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 2,
        explanation: 'This sentence explains the definition of refugia, fitting naturally after the first introduction of glacial refugia in Paragraph 1.',
        type: 'sentence-insertion',
        sentenceToInsert: 'These areas served as biological sanctuaries, protecting fragile genes until climates stabilized.'
      }
    ]
  },
  {
    id: 'mesopotamian-irrigation',
    title: 'Mesopotamian Irrigation and Civilization',
    content: [
      "The dry plains of southern Mesopotamia lack consistent seasonal rainfall, yet they witnessed the rise of humanity's earliest complex urban societies, the Sumerian city states. This paradoxical rise was made possible by civil engineering efforts centered on two massive river veins: the Tigris and the Euphrates. [SQ-A] These rivers carried massive volumes of mountain meltwater, but their flooding was highly unpredictable and destructive, occurring in late spring during harvest cycles when water was least needed. [SQ-B]",
      "To build sustainable agricultural communities, early Sumerians constructed expansive, highly coordinated irrigation complexes. They built colossal dirt levees to contain high river flows, and excavated deep canals to direct water to dry agricultural fields. [SQ-C] They also built wooden floodgates, which allowed farmers to carefully regulate individual water flows, ensuring that crops received [A] steady moisture during the long, dry summer. [SQ-D]",
      "However, this massive water manipulation carried unintended long term costs. Mesopotamian soils suffered from poor natural drainage, which, combined with intense heat and rapid evaporation, caused a slow accumulation of toxic salts in the root zone. Over centuries, this salinization severely depressed crop yields, forcing a shift from wheat to more salt-tolerant barley, and eventually contributing to the region's geopolitical decline."
    ],
    questions: [
      {
        id: 'mi-q1',
        question: 'The word "steady" in the passage is closest in meaning to',
        options: ['heavy', 'consistent', 'unpredictable', 'scant'],
        answer: 1,
        explanation: '"Steady" moisture means continuous, stable, or consistent watering.',
        type: 'multiple-choice',
        highlight: 'steady',
        paragraphIndex: 1,
        marker: 'A'
      },
      {
        id: 'mi-q2',
        question: 'According to Paragraph 1, what made Tigris and Euphrates flooding particularly problematic?',
        options: [
          'They only flooded during major volcanic eruptions.',
          'They flooded unpredictably in late spring during harvest cycles when least needed.',
          'Their waters were completely saturated with toxic iron salts.',
          'They regularly dried up entirely for decades.'
        ],
        answer: 1,
        explanation: 'The first paragraph states: "their flooding was highly unpredictable and destructive, occurring in late spring during harvest cycles when water was least needed."',
        type: 'multiple-choice'
      },
      {
        id: 'mi-q3',
        question: 'According to Paragraph 3, how did soil changes affect Mesopotamian grains?',
        options: [
          'They prevented farmers from cultivating barley entirely.',
          'They forced a decline in wheat cultivation, shifting farms toward salt-tolerant barley.',
          'They stimulated rapid growth in corn and potato fields.',
          'They forced farmers to rely on mountain rain rather than river channels.'
        ],
        answer: 1,
        explanation: 'Paragraph 3 notes: "severely depressed crop yields, forcing a shift from wheat to more salt-tolerant barley..."',
        type: 'multiple-choice'
      },
      {
        id: 'mi-q4',
        question: 'All of the following were parts of Sumerian engineering efforts EXCEPT:',
        options: [
          'Dirt levees to block unexpected flood waters',
          'Deeply excavated canals to bring water to fields',
          'Pointed stone aqueducts spanning deep mountain gorges',
          'Wooden floodgates to balance water distribution'
        ],
        answer: 2,
        explanation: 'Sumerians used levees, canals, and floodgates. External stone aqueducts for gorges are associated with Roman civil engineering and are not listed here.',
        type: 'multiple-choice'
      },
      {
        id: 'mi-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 1,
        explanation: 'This sentence introduces the agricultural danger preceding irrigation, fitting directly after the destructive river flooding is introduced in Paragraph 1.',
        type: 'sentence-insertion',
        sentenceToInsert: 'Without human intervention, the rivers would wash away newly planted crops or leave them to wither in dry soils.'
      }
    ]
  },
  {
    id: 'volcanic-climatology',
    title: 'Volcanic Activity and Global Climatology',
    content: [
      "While massive volcanic eruptions pose immediate, catastrophic threats to nearby landscapes, their long-range impacts on global climate are far more profound. Scientists have noted that major eruptions can cause immediate temperature drops across entire hemispheres. Interestingly, this cooling is not caused by the dark ash falling from skies, which settles quickly. [SQ-A] Instead, the primary driver is the release of giant columns of sulfur dioxide gas high into the stratosphere. [SQ-B]",
      "Once in the stratosphere, sulfur dioxide reacts chemically with water vapor, forming a highly reflective blanket of liquid sulfate aerosols. [SQ-C] Suspended tens of kilometers above Earth, these tiny droplets act as mirrors, scattering incoming solar radiation back into space. Because this aerosol layer is insulated from rain, it can persist for several years, causing global temperatures to plummet. The famous 1815 eruption of Mount Tambora, for example, caused the \"Year Without a Summer\" in 1816, leading to [A] widespread food shortages across North America and Europe.",
      "Furthermore, these temporary climate cooling blocks have historic social impacts. Climatologists have linked major volcanic peaks to poor harvests, famines, and subsequent political disruptions. [SQ-D] Understanding this mechanical link helps researchers evaluate current geoengineering proposals that seek to artificially inject sulfate particles to curb modern global warming."
    ],
    questions: [
      {
        id: 'vc-q1',
        question: 'The word "widespread" in the passage is closest in meaning to',
        options: ['unnoticeable', 'extensive', 'unpredictable', 'fictional'],
        answer: 1,
        explanation: '"Widespread" food shortages means extensive, far-reaching, or common across regions.',
        type: 'multiple-choice',
        highlight: 'widespread',
        paragraphIndex: 1,
        marker: 'A'
      },
      {
        id: 'vc-q2',
        question: 'According to Paragraph 1, why does volcanic ash NOT cause long-term hemispheric cooling?',
        options: [
          'Ash is transparent to solar radiation.',
          'It is rapidly washed away or settles out of the atmosphere.',
          'It reacts chemically with carbon dioxide to generate heat.',
          'Ash is confined exclusively to active marine vents.'
        ],
        answer: 1,
        explanation: 'The passage notes that the cooling is "not caused by the dark ash falling from skies, which settles quickly."',
        type: 'multiple-choice'
      },
      {
        id: 'vc-q3',
        question: 'According to the passage, what occurred following the 1815 eruption of Mount Tambora?',
        options: [
          'A rapid warming trend occurred across high latitudes.',
          'A "Year Without a Summer" in 1816 with extensive food shortages.',
          'The complete filling of agricultural soils with iron salinity.',
          'The sudden collapse of ocean tables and tsunamis.'
        ],
        answer: 1,
        explanation: 'Mount Tambora "caused the \'Year Without a Summer\' in 1816, leading to widespread food shortages..."',
        type: 'multiple-choice'
      },
      {
        id: 'vc-q4',
        question: 'How do sulfate aerosols cooling Earth\'s surface in the stratosphere?',
        options: [
          'They create warm winds that blow atmospheric cold waves down.',
          'They act as reflective mirrors, scattering solar radiation back into space.',
          'They block warm rainwater from hitting polar ice sheets.',
          'They chemically neutralize carbon dioxide molecules, reducing greenhouse effects.'
        ],
        answer: 1,
        explanation: 'Sulfate aerosols "act as mirrors, scattering incoming solar radiation back into space."',
        type: 'multiple-choice'
      },
      {
        id: 'vc-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 2,
        explanation: 'This sentence describes the chemical conversion forming the aerosols, fitting directly after sulfur dioxide meets stratosphere water vapor in Paragraph 2.',
        type: 'sentence-insertion',
        sentenceToInsert: 'This chemical transformation occurs over a period of weeks, forming an invisible, shiny haze layer.'
      }
    ]
  },
  {
    id: 'chaco-canyon',
    title: 'The Enigma of Chaco Canyon',
    content: [
      "In the arid San Juan Basin of New Mexico sits Chaco Canyon, the historical center of a complex Ancestral Puebloan culture that thrived between 850 and 1150 CE. Chacoans constructed massive multi-story sandstone complexes called Great Houses, the largest of which, Pueblo Bonito, was a towering semi-circular monument with over six hundred rooms. [SQ-A] The sheer size of these complexes, combined with the dry desert climate, was once thought to indicate a dense, urban farming center. [SQ-B] However, recent archaeological evidence has cast [A] doubts on this interpretation, suggesting the canyon was not a permanent city.",
      "Analysis of excavated rooms reveals a surprising lack of domestic debris, such as cooking hearths, daily simple pottery, or animal bone garbage. [SQ-C] Instead, Great Houses were filled with massive caches of exotic luxury goods, including cylindrical drinking vessels, turquoise beads, and macaw feathers imported from Mesoamerica. These findings suggest that Chaco was a sacred ritual node and pilgrimage center. Regional populations gathered here seasonally to perform astronomical ceremonies and exchange commodities, returning home to outlying valleys.",
      "This ritual model is supported by an intricate network of wide, straight sandstone roads radiating outward from Chaco Canyon. Scientists have noted that these roads were crafted with little regard for terrain, scaling steep cliffs using hand-carved stone staircases. [SQ-D] This alignment suggests Chaco served as a highly centralized sacred landscapes, illustrating how ancient societies leveraged civil architecture to bind distant communities together."
    ],
    questions: [
      {
        id: 'cc-q1',
        question: 'The word "doubts" in the passage is closest in meaning to',
        options: ['certainties', 'skepticism', 'discoveries', 'confirmations'],
        answer: 1,
        explanation: 'To "cast doubts" on an interpretation means to raise skepticism or uncertainty about it.',
        type: 'multiple-choice',
        highlight: 'doubts',
        paragraphIndex: 0,
        marker: 'A'
      },
      {
        id: 'cc-q2',
        question: 'According to Paragraph 2, what excavation evidence indicates Chaco Canyon was not a heavily populated domestic city?',
        options: [
          'The complete absence of sandstone structures.',
          'A remarkable lack of domestic debris like cooking hearths and bone leftovers.',
          'Numerous weapons showing massive ancient wars.',
          'Glacial structures blocking entrance to rooms.'
        ],
        answer: 1,
        explanation: 'Excavators noticed "a surprising lack of domestic debris, such as cooking hearths, daily simple pottery, or animal bone garbage," indicating low daily populations.',
        type: 'multiple-choice'
      },
      {
        id: 'cc-q3',
        question: 'According to the passage, all of the following were found archived inside Chaco structures EXCEPT:',
        options: [
          'Exotic cylindrical chocolate drinking vessels',
          'Thousands of blue turquoise beads',
          'Handwritten codices tracking solar calendars',
          'Vibrant macaw feathers imported from Mesoamerica'
        ],
        answer: 2,
        explanation: 'Handwritten paper codices are not listed as artifacts found inside Chaco houses, unlike drinking vessels, turquoise, and macaw feathers.',
        type: 'multiple-choice'
      },
      {
        id: 'cc-q4',
        question: 'What was unique about the wide Chacoan road network described in Paragraph 3?',
        options: [
          'They were paved with thick layers of volcanic asphalt.',
          'They scaled steep cliffs directly using hand-carved stone staircases.',
          'They were built exclusively inside circular Great Houses.',
          'They connected Chaco Canyon directly to European ocean paths.'
        ],
        answer: 1,
        explanation: 'The road networks "were crafted with little regard for terrain, scaling steep cliffs using hand-carved stone staircases."',
        type: 'multiple-choice'
      },
      {
        id: 'cc-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: ['[A]', '[B]', '[C]', '[D]'],
        answer: 1,
        explanation: 'This sentence introduces the agricultural constraints of the desert, explaining why permanent urban farming was highly unlikely.',
        type: 'sentence-insertion',
        sentenceToInsert: 'Furthermore, soil analysis indicates that the canyon floor lacked the water nutrients necessary to sustain intense farming.'
      }
    ]
  }
];
