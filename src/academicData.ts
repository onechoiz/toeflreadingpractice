export interface AcademicQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number; // index of correct option
  explanation: string;
  type: 'multiple-choice' | 'sentence-insertion';
  highlight?: string;
  paragraphIndex?: number;
  marker?: string;
  sentenceToInsert?: string;
}

export interface AcademicArticle {
  id: string;
  title: string;
  content: string[]; // Array of paragraphs
  questions: AcademicQuestion[];
}

export const ACADEMIC_DATA: AcademicArticle[] = [
  {
    id: 'prehistoric-diet-1',
    title: 'Prehistoric Diet (Set 1)',
    content: [
      "Early human diets have long intrigued researchers. Recently, scientists have discovered surprising evidence that prehistoric humans consumed a diverse range of foods. This evidence comes from the analysis of ancient teeth and bones, which reveal traces of plant and animal matter. While it was once believed that early humans predominantly ate meat, new findings suggest they also consumed significant amounts of plant-based foods. These included tubers, nuts, seeds, and fruits.",
      "The consumption of seafood is another intriguing aspect of prehistoric diets. Coastal communities likely relied on fish and shellfish, providing essential omega-3 fatty acids. These nutrients are crucial for brain development, indicating that seafood may have played a significant role in the cognitive evolution of humans. Moreover, the variety in their diet helped early humans adapt to different environments. Communities in arid regions relied more on drought-resistant plants for a reliable food source, while those in fertile areas had access to a wider range of dietary options.",
      "Understanding humans' prehistoric diet also sheds light on social structures. Sharing food resources might have fostered cooperation and social bonds within communities. This cooperative behavior was essential for survival, enabling groups to hunt, gather, and share food effectively, thus enhancing their chances of thriving in challenging environments."
    ],
    questions: [
      {
        id: 'pd1-q1',
        question: 'Why is seafood significant in understanding early human diets?',
        options: [
          'It was the primary food source for all prehistoric communities.',
          'It may have had a role in human cognitive evolution.',
          'It was easier to gather than plant-based foods.',
          'It may have replaced plant-based foods in coastal communities.'
        ],
        answer: 1,
        explanation: 'The passage states that seafood provides omega-3 fatty acids which are "crucial for brain development, indicating that seafood may have played a significant role in the cognitive evolution of humans."',
        type: 'multiple-choice'
      },
      {
        id: 'pd1-q2',
        question: 'How did the variety in prehistoric diets benefit early humans?',
        options: [
          'It allowed them to migrate to different continents.',
          'It helped them adapt to diverse environments.',
          'It led to the domestication of animals.',
          'It enabled them to develop strong teeth and bones.'
        ],
        answer: 1,
        explanation: 'The text mentions: "Moreover, the variety in their diet helped early humans adapt to different environments."',
        type: 'multiple-choice'
      },
      {
        id: 'pd1-q3',
        question: 'What role did sharing food resources play in prehistoric communities?',
        options: [
          'It strengthened cooperation and social bonds.',
          'It enabled the development of agricultural practices.',
          'It reduced the reliance on hunting.',
          'It increased competition for resources.'
        ],
        answer: 0,
        explanation: 'The third paragraph states: "Sharing food resources might have fostered cooperation and social bonds within communities."',
        type: 'multiple-choice'
      },
      {
        id: 'pd1-q4',
        question: 'What evidence suggests that prehistoric humans consumed plant-based foods?',
        options: [
          'Analysis of their teeth and bones',
          'Discovery of ancient cooking tools',
          'Studies of modern hunter-gatherer societies',
          'Observations of coastal communities'
        ],
        answer: 0,
        explanation: 'The first paragraph notes: "This evidence comes from the analysis of ancient teeth and bones, which reveal traces of plant and animal matter."',
        type: 'multiple-choice'
      },
      {
        id: 'pd1-q5',
        question: 'The word "enhancing" in the passage is closest in meaning to',
        options: [
          'improving',
          'ensuring',
          'simplifying',
          'shifting'
        ],
        answer: 0,
        explanation: '"Enhancing" means to increase or improve in value, quality, or desirability. In this context, it refers to improving their chances of thriving.',
        type: 'multiple-choice',
        highlight: 'enhancing',
        paragraphIndex: 2
      }
    ]
  },
  {
    id: 'circadian-rhythms-1',
    title: 'Circadian Rhythms (Set 1)',
    content: [
      "Circadian rhythms are biological processes that follow a roughly 24-hour cycle, influencing various physiological functions such as sleep, hormone production, and body temperature. These rhythms are regulated by the suprachiasmatic nucleus, a group of cells located in the hypothalamus. Exposure to light is a primary cue for resetting circadian clocks, ensuring alignment with the external environment.",
      "Disruptions to circadian rhythms can lead to health issues, including sleep disorders, metabolic problems, and mood disturbances. Recent research has highlighted the importance of maintaining regular circadian rhythms for overall health. For example, studies show that shift workers, who often experience irregular sleep patterns, are at higher risk for cardiovascular diseases and diabetes. In contrast, individuals with consistent sleep schedules tend to have better mental and physical health. Researchers are exploring ways to help people maintain regular circadian rhythms, such as using light therapy or scheduling activities to align with natural sleep-wake cycles.",
      "Interestingly, circadian rhythms are not unique to humans. Many animals and plants exhibit similar cycles, adapting their behavior and physiology to environmental changes. This universal nature of circadian rhythms underscores their fundamental role in life on Earth."
    ],
    questions: [
      {
        id: 'cr1-q1',
        question: 'All of the following are true of circadian rhythms EXCEPT:',
        options: [
          'They occur every 24 hours exactly.',
          'They impact other physiological functions.',
          'They are regulated by cells located in the hypothalamus.',
          'They are triggered and cued by light exposure.'
        ],
        answer: 0,
        explanation: 'The passage says they follow a "roughly 24-hour cycle", not "exactly".',
        type: 'multiple-choice'
      },
      {
        id: 'cr1-q2',
        question: 'What is one function influenced by circadian rhythms mentioned in the passage?',
        options: [
          'Digestion',
          'Body temperature',
          'Heart rate',
          'Blood pressure'
        ],
        answer: 1,
        explanation: 'The first sentence mentions "physiological functions such as sleep, hormone production, and body temperature."',
        type: 'multiple-choice'
      },
      {
        id: 'cr1-q3',
        question: 'The word "disruptions" in the second paragraph is closest in meaning to',
        options: [
          'interruptions',
          'connections',
          'developments',
          'improvements'
        ],
        answer: 0,
        explanation: 'Disruptions refer to disturbances or interruptions in a process.',
        type: 'multiple-choice',
        highlight: 'Disruptions',
        paragraphIndex: 1
      },
      {
        id: 'cr1-q4',
        question: 'According to the second paragraph, shift workers are at higher risk for which of the following health issues?',
        options: [
          'Metabolic problems',
          'Mood disturbances',
          'Heart diseases',
          'Sleep disorders'
        ],
        answer: 2,
        explanation: 'The text specifically states: "shift workers... are at higher risk for cardiovascular diseases and diabetes." Cardiovascular diseases are heart diseases.',
        type: 'multiple-choice'
      },
      {
        id: 'cr1-q5',
        question: 'How do researchers suggest people maintain regular circadian rhythms?',
        options: [
          'By increasing physical activity',
          'By using light therapy',
          'By reducing screen time',
          'By adjusting their diet'
        ],
        answer: 1,
        explanation: 'The passage mentions: "Researchers are exploring ways... such as using light therapy."',
        type: 'multiple-choice'
      },
      {
        id: 'cr1-q6',
        question: 'What is the author\'s purpose in mentioning "many animals and plants exhibit similar cycles"?',
        options: [
          'To highlight the predictability of circadian rhythms',
          'To show the universal nature of circadian rhythms',
          'To explain how circadian rhythms affect behavior',
          'To suggest that circadian rhythms are unique to humans'
        ],
        answer: 1,
        explanation: 'The text says: "This universal nature of circadian rhythms underscores their fundamental role in life on Earth."',
        type: 'multiple-choice',
        highlight: 'many animals and plants exhibit similar cycles',
        paragraphIndex: 2
      }
    ]
  },
  {
    id: 'origins-of-agriculture',
    title: 'The Origins of Agriculture',
    content: [
      "The origins of agriculture mark a significant turning point in human history. Before farming, humans were hunter-gatherers, relying on wild plants and animals for sustenance. About 12,000 years ago, humans began cultivating crops and domesticating animals, enabling permanent settlements and complex societies.",
      "Agriculture likely originated independently in several regions, including the Fertile Crescent in the Middle East, the Yangtze River basin in China, and the highlands of New Guinea. It also spread to other regions—for example, from New Guinea to the Bismarck Archipelago. Each region developed unique agricultural practices suited to their environments. For example, wheat and barley were cultivated in the Fertile Crescent, while rice was grown in the Yangtze River basin.",
      "The transition to agriculture had profound implications for human health and society. Farming provided a more reliable food supply, leading to population growth and technological advancements. However, it also introduced challenges, such as nutritional deficiencies and the spread of infectious diseases due to proximity to domesticated animals. Despite these challenges, the benefits of agriculture outweighed the drawbacks, paving the way for civilizations. Producing surplus food allowed societies to support specialized roles, such as craftsmen, traders, and leaders, contributing to the complexity and progress of human societies."
    ],
    questions: [
      {
        id: 'oa-q1',
        question: 'Which of the following did agriculture make possible?',
        options: [
          'The development of permanent settlements',
          'The use of wild plants for sustenance',
          'The spread of effective hunting techniques',
          'The discovery of effective solutions to complex social issues'
        ],
        answer: 0,
        explanation: 'The first paragraph states: "humans began cultivating crops and domesticating animals, enabling permanent settlements and complex societies."',
        type: 'multiple-choice'
      },
      {
        id: 'oa-q2',
        question: 'Which of the following is NOT mentioned as a region where agriculture likely originated?',
        options: [
          'The Fertile Crescent',
          'The Yangtze River basin',
          'The highlands of New Guinea',
          'The Bismarck Archipelago'
        ],
        answer: 3,
        explanation: 'The Bismarck Archipelago is mentioned as a place agriculture *spread to*, not where it originated.',
        type: 'multiple-choice'
      },
      {
        id: 'oa-q3',
        question: 'The word "profound" in the passage is closest in meaning to',
        options: [
          'unusual',
          'significant',
          'limited',
          'common'
        ],
        answer: 1,
        explanation: '"Profound" in this context means having deep or significant impact.',
        type: 'multiple-choice',
        highlight: 'profound',
        paragraphIndex: 2
      },
      {
        id: 'oa-q4',
        question: 'Why does the author mention "nutritional deficiencies"?',
        options: [
          'To explain the importance of domesticating animals',
          'To support the claim about the spread of infectious diseases',
          'To illustrate a difficulty associated with the shift to agriculture',
          'To stress the need for a reliable food supply'
        ],
        answer: 2,
        explanation: 'The text lists nutritional deficiencies as one of the "challenges" introduced by the transition to agriculture.',
        type: 'multiple-choice',
        highlight: 'nutritional deficiencies',
        paragraphIndex: 2
      },
      {
        id: 'oa-q5',
        question: 'In which of the following ways did agriculture change society?',
        options: [
          'It made possible the development of specialized roles.',
          'It reduced the spread of infectious diseases.',
          'It controlled the spread of new technologies.',
          'It eliminated the challenges of rapid population growth.'
        ],
        answer: 0,
        explanation: 'The final paragraph mentions: "Producing surplus food allowed societies to support specialized roles..."',
        type: 'multiple-choice'
      }
    ]
  },
  {
    id: 'prehistoric-diets-2',
    title: 'Prehistoric Diets (Set 2)',
    content: [
      "The study of prehistoric diets offers fascinating insights into the lives of early humans. By examining fossilized remains and archaeological sites, researchers can infer what ancient populations ate and how they [A] obtained their food. [SQ-A]",
      "Evidence suggests that prehistoric diets were diverse and included a mix of plants and animals. Early humans were hunters and gatherers, relying on seasonal availability and geographical location to determine their food sources. Recent findings indicate that prehistoric diets were not only varied but also nutritionally rich. [SQ-B] Analyses of dental remains have revealed traces of grains, fruits, nuts, and meats. This diversity helped early humans maintain balanced nutrition and adapt to their environments. For example, populations living near coastal areas often consumed seafood, which is rich in omega-3 fatty acids essential for brain development. [SQ-C]",
      "However, the transition to agriculture brought significant changes to human diets. Farming allowed for the reliable production of food but also led to a less varied diet. Staple crops like wheat, rice, and maize became dominant, potentially reducing the intake of essential nutrients. Despite these changes, the study of prehistoric diets continues to shed light on the relationship between food and human evolution. [SQ-D]"
    ],
    questions: [
      {
        id: 'pd2-q1',
        question: 'The word "obtained" in the first paragraph is closest in meaning to',
        options: [
          'diversified',
          'sought',
          'acquired',
          'cooked'
        ],
        answer: 2,
        explanation: '"Obtained" means to get or acquire something.',
        type: 'multiple-choice',
        highlight: 'obtained',
        paragraphIndex: 0
      },
      {
        id: 'pd2-q2',
        question: 'What can be inferred about prehistoric diets from the passage?',
        options: [
          'They were mainly made up of certain types of animals.',
          'They were varied and nutritionally rich.',
          'They consisted mainly of seafood.',
          'They were based on agriculture.'
        ],
        answer: 1,
        explanation: 'The text explicitly states: "Recent findings indicate that prehistoric diets were not only varied but also nutritionally rich."',
        type: 'multiple-choice'
      },
      {
        id: 'pd2-q3',
        question: 'How did prehistoric coastal populations adapt their diet to their environment?',
        options: [
          'They relied on agriculture for their food.',
          'They consumed foods rich in healthy fatty acids.',
          'They had access to a stable food supply.',
          'They ate a diet predominantly consisting of grains.'
        ],
        answer: 1,
        explanation: 'The passage mentions coastal populations consuming seafood rich in omega-3 fatty acids.',
        type: 'multiple-choice'
      },
      {
        id: 'pd2-q4',
        question: 'What is the author\'s purpose in mentioning "the transition to agriculture"?',
        options: [
          'To highlight the benefits of farming',
          'To explain how agriculture improved human diets',
          'To introduce a cause behind the change in prehistoric diets',
          'To compare different agricultural practices'
        ],
        answer: 2,
        explanation: 'The transition to agriculture is presented as the reason for the "significant changes to human diets."',
        type: 'multiple-choice',
        highlight: 'the transition to agriculture',
        paragraphIndex: 2
      },
      {
        id: 'pd2-q5',
        question: 'What was one impact the transition to agriculture had on human diets?',
        options: [
          'It increased the variety of foods consumed.',
          'It reduced the consumption of meats.',
          'It led to the dominance of staple crops.',
          'It improved the nutritional value of diets.'
        ],
        answer: 2,
        explanation: 'The text says: "Staple crops like wheat, rice, and maize became dominant..."',
        type: 'multiple-choice'
      },
      {
        id: 'pd2-q6',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: [
          '[A]',
          '[B]',
          '[C]',
          '[D]'
        ],
        answer: 0,
        explanation: 'This sentence asks for evidence right after the claim that researchers can infer what ancient populations ate.',
        type: 'sentence-insertion',
        sentenceToInsert: 'What is the evidence for this?'
      }
    ]
  },
  {
    id: 'art-restoration',
    title: 'Art Restoration Techniques',
    content: [
      "Restoring artwork is a delicate and complex process, balancing preservation with the artist's original intent. One evolving technique in the field is laser cleaning, which offers precision cleaning without the abrasiveness of traditional methods. The technology uses light pulses to remove layers of grime and varnish from paintings. This method, however, is not without its challenges. Experts must calibrate the laser's intensity to avoid damaging the pigments underneath.",
      "Another innovative approach involves the use of nanotechnology. Researchers have developed nanogels that gently lift dirt from paintings while preserving the integrity of the paint. Unlike solvents, these nanogels can be fine-tuned to target specific contaminants, making them highly effective for fragile surfaces.",
      "While both techniques show promise, they also highlight the importance of interdisciplinary collaboration. Chemists, physicists, and art historians must work together to assess the suitability of these methods for different types of artwork. The field of art restoration will likely continue to evolve, incorporating new technologies to better preserve our cultural heritage."
    ],
    questions: [
      {
        id: 'ar-q1',
        question: 'Why is laser cleaning considered an advanced technique in art restoration?',
        options: [
          'It relies on input from artists.',
          'It allows the varnish to remain in place.',
          'It is more precise than older techniques.',
          'It improves the quality of the pigment.'
        ],
        answer: 2,
        explanation: 'The passage states laser cleaning "offers precision cleaning without the abrasiveness of traditional methods."',
        type: 'multiple-choice'
      },
      {
        id: 'ar-q2',
        question: 'The word "calibrate" in the passage is closest in meaning to',
        options: [
          'adjust',
          'measure',
          'dismantle',
          'identify'
        ],
        answer: 0,
        explanation: 'To calibrate intensity means to adjust it to a specific standard or level.',
        type: 'multiple-choice',
        highlight: 'calibrate',
        paragraphIndex: 0
      },
      {
        id: 'ar-q3',
        question: 'What is the main advantage of using nanogels in art restoration?',
        options: [
          'They are less expensive than most solvents.',
          'They can be designed to remove specific contaminants.',
          'They are easier to apply than solvents.',
          'They work faster than lasers.'
        ],
        answer: 1,
        explanation: 'The text says nanogels "can be fine-tuned to target specific contaminants."',
        type: 'multiple-choice'
      },
      {
        id: 'ar-q4',
        question: 'What is suggested in the passage about interdisciplinary collaboration?',
        options: [
          'It is necessary for learning how to use nanotechnology.',
          'It ensures that lasers don\'t damage artwork.',
          'It aids in decisions about the applicability of new restoration techniques.',
          'It provides a way to reduce restoration costs.'
        ],
        answer: 2,
        explanation: 'The text says experts "must work together to assess the suitability of these methods for different types of artwork."',
        type: 'multiple-choice'
      },
      {
        id: 'ar-q5',
        question: 'What does the passage suggest about the future of art restoration?',
        options: [
          'It will become less complex.',
          'It will rely primarily on nanotechnology.',
          'It will include more traditional methods.',
          'It will change and improve as new techniques are developed.'
        ],
        answer: 3,
        explanation: 'The final sentence says the field "will likely continue to evolve, incorporating new technologies..."',
        type: 'multiple-choice'
      }
    ]
  },
  {
    id: 'industrial-revolution',
    title: 'Industrial Revolution and Its Impact',
    content: [
      "The Industrial Revolution, starting in the late eighteenth century, transformed economies and societies. It marked the shift from agrarian to industrial economies, mainly in Europe and North America. This period saw the rise of factories, mechanized production, and technologies like the steam engine. These developments increased production and efficiency but also brought dramatic social changes. [SQ-A]",
      "One significant impact of the Industrial Revolution involved urbanization. As factories emerged, people moved from rural areas to cities for work. This migration led to overcrowded cities, poor living conditions, and slums. [SQ-B] However, despite these challenges, cities became centers of economic activity and innovation. [SQ-C]",
      "Working conditions in factories were often harsh. Workers, including children, faced long hours, low wages, and unsafe environments. This exploitation of workers prompted the rise of labor unions, which fought for better wages, safer conditions, and reasonable hours, leading to labor reforms that improved workers' lives. [SQ-D]",
      "The Industrial Revolution also impacted the environment. The increased use of coal and fossil fuels led to pollution and environmental degradation. It sparked innovations in transportation, with railways and steamships facilitating movement. Overall, it set the stage for the modern industrial world, with consequences still felt today."
    ],
    questions: [
      {
        id: 'ir-q1',
        question: 'Why did people move from rural areas to cities during the Industrial Revolution?',
        options: [
          'To join families living there',
          'To improve their living conditions',
          'To escape overcrowded small towns',
          'To find work in factories'
        ],
        answer: 3,
        explanation: 'The passage states: "As factories emerged, people moved from rural areas to cities for work."',
        type: 'multiple-choice'
      },
      {
        id: 'ir-q2',
        question: 'All of the following were mentioned as a negative consequence of the rise in factory work EXCEPT:',
        options: [
          'employing children in factories',
          'long daily commutes to and from the factories',
          'low pay rates',
          'dangerous work environments'
        ],
        answer: 1,
        explanation: 'Commutes are not mentioned; child labor, low wages, and unsafe environments are.',
        type: 'multiple-choice'
      },
      {
        id: 'ir-q3',
        question: 'What does the passage suggest about the role of labor unions?',
        options: [
          'They were formed to increase production.',
          'They fought for improved working conditions.',
          'They were opposed to technological advancements.',
          'They helped cause environmental degradation.'
        ],
        answer: 1,
        explanation: 'The text says unions "fought for better wages, safer conditions, and reasonable hours..."',
        type: 'multiple-choice'
      },
      {
        id: 'ir-q4',
        question: 'The word "prompted" in the passage is closest in meaning to',
        options: [
          'led to',
          'delayed',
          'accompanied',
          'forced'
        ],
        answer: 0,
        explanation: '"Prompted" means to cause or bring about an action.',
        type: 'multiple-choice',
        highlight: 'prompted',
        paragraphIndex: 2
      },
      {
        id: 'ir-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: [
          '[A]',
          '[B]',
          '[C]',
          '[D]'
        ],
        answer: 3,
        explanation: 'This sentence provides a specific example of the "unsafe environments" mentioned in the third paragraph.',
        type: 'sentence-insertion',
        sentenceToInsert: 'In textile mills, workers had to operate large, fast-moving machinery, which led to frequent injuries and even fatalities.'
      }
    ]
  },
  {
    id: 'deep-sea-exploration',
    title: 'Deep-Sea Exploration',
    content: [
      "The deep sea remains one of the least explored frontiers on Earth. Characterized by extreme pressure, near-freezing temperatures, and total darkness, it presents significant challenges for researchers. Despite these [A] harsh conditions, the deep sea is home to a surprising variety of life forms, many of which have adapted in unique ways to survive. [SQ-A]",
      "One of the most remarkable discoveries in deep-sea exploration is the existence of hydrothermal vents. These vents, located on the ocean floor, release mineral-rich water heated by volcanic activity. [SQ-B] Unlike most life on Earth, which relies on photosynthesis, organisms near hydrothermal vents depend on chemosynthesis. Bacteria use the chemicals from the vents to produce energy, forming the base of a complex food web. This enables the organisms to live without sunlight. [SQ-C]",
      "Technological advancements have played a crucial role in deep-sea research. Remotely operated vehicles (ROVs) and autonomous underwater vehicles (AUVs) allow scientists to explore and collect samples from depths that are inaccessible to humans. These tools have provided valuable data on deep-sea ecosystems and the potential for deep-sea mining. However, the environmental impact of such activities remains a subject of intense debate. [SQ-D]"
    ],
    questions: [
      {
        id: 'ds-q1',
        question: 'The word "harsh" in the passage is closest in meaning to',
        options: [
          'severe',
          'diverse',
          'unknown',
          'stable'
        ],
        answer: 0,
        explanation: '"Harsh" in this context refers to the extreme and difficult conditions of the deep sea.',
        type: 'multiple-choice',
        highlight: 'harsh',
        paragraphIndex: 0
      },
      {
        id: 'ds-q2',
        question: 'What enables hydrothermal vent organisms to withstand the high pressure of their environment?',
        options: [
          'Their reliance on chemosynthesis',
          'The mineral-rich water from the vents',
          'Unique physiological adaptations',
          'The energy produced by bacteria'
        ],
        answer: 2,
        explanation: 'The passage mentions that life forms "have adapted in unique ways to survive" the extreme pressure.',
        type: 'multiple-choice'
      },
      {
        id: 'ds-q3',
        question: 'What can be inferred from the passage about organisms near hydrothermal vents?',
        options: [
          'They are more diverse than organisms in other parts of the ocean.',
          'They do not require sunlight to survive.',
          'They are threatened by deep-sea mining.',
          'They are the only life forms in the deep sea.'
        ],
        answer: 1,
        explanation: 'The text says: "This enables the organisms to live without sunlight."',
        type: 'multiple-choice'
      },
      {
        id: 'ds-q4',
        question: 'What does the passage suggest could prevent deep-sea research from continuing in the future?',
        options: [
          'The lack of technological advancements',
          'The extreme conditions of the deep sea',
          'The high cost of ROVs and AUVs',
          'The debate over the environmental impact of deep-sea mining'
        ],
        answer: 3,
        explanation: 'The text mentions that the environmental impact of activities like mining "remains a subject of intense debate," which could affect future research and exploration.',
        type: 'multiple-choice'
      },
      {
        id: 'ds-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: [
          '[A]',
          '[B]',
          '[C]',
          '[D]'
        ],
        answer: 2,
        explanation: 'This sentence explains the result of the chemosynthesis process described in the previous sentences.',
        type: 'sentence-insertion',
        sentenceToInsert: 'This enables the organisms to live without sunlight.'
      }
    ]
  },
  {
    id: 'adaptive-memory',
    title: 'Adaptive Memory',
    content: [
      "Memory is often viewed as a storage system for past experiences, but researchers are increasingly exploring its adaptive nature. Adaptive memory refers to the idea that our memory systems have evolved to prioritize information that is relevant to survival and reproduction. This perspective suggests that memory is not a [A] dynamic recording of every event but rather a selective tool shaped by evolutionary pressures. [SQ-A]",
      "Studies have shown that people are better at remembering information related to survival scenarios compared to neutral ones. For example, participants in experiments remembered words more effectively when they were asked to rate their relevance to a survival situation, such as being stranded in the grasslands. [SQ-B] This \"survival processing effect\" suggests that our brains are \"tuned\" to certain types of information. [SQ-C]",
      "Furthermore, adaptive memory extends to social information. Humans are social animals, and remembering information about others—such as their reliability or social status—is crucial for navigating complex social environments. [SQ-D] These findings all demonstrate that human memory is not a simple storage device but an adaptive tool shaped by evolutionary pressures."
    ],
    questions: [
      {
        id: 'am-q1',
        question: 'The word "dynamic" in the passage is closest in meaning to',
        options: [
          'constant',
          'detailed',
          'changing',
          'accurate'
        ],
        answer: 2,
        explanation: '"Dynamic" in this context refers to a process that is active or changing, rather than a static recording.',
        type: 'multiple-choice',
        highlight: 'dynamic',
        paragraphIndex: 0
      },
      {
        id: 'am-q2',
        question: 'Why does the author mention "experiments in which participants remembered words relevant to survival"?',
        options: [
          'To illustrate the "survival processing effect"',
          'To show that memory is a simple storage device',
          'To explain how evolutionary pressures shape memory',
          'To compare survival scenarios with neutral ones'
        ],
        answer: 0,
        explanation: 'The author uses these experiments to demonstrate the "survival processing effect" mentioned in the next sentence.',
        type: 'multiple-choice'
      },
      {
        id: 'am-q3',
        question: 'All of the following are part of adaptive memory EXCEPT:',
        options: [
          'prioritizing information relevant to survival',
          'remembering every event in detail',
          'tuning the brain to certain types of information',
          'remembering social information about others'
        ],
        answer: 1,
        explanation: 'The passage says memory is "not a dynamic recording of every event," so it does NOT include remembering every event in detail.',
        type: 'multiple-choice'
      },
      {
        id: 'am-q4',
        question: 'What is the relationship between paragraphs 2 and 3?',
        options: [
          'Paragraph 3 provides a counterargument to the claims in paragraph 2.',
          'Paragraph 3 expands the concept of adaptive memory to include social information.',
          'Paragraph 3 explains the physiological basis for the effects described in paragraph 2.',
          'Paragraph 3 summarizes the findings of the experiments mentioned in paragraph 2.'
        ],
        answer: 1,
        explanation: 'Paragraph 2 discusses survival information, and paragraph 3 says "Furthermore, adaptive memory extends to social information."',
        type: 'multiple-choice'
      },
      {
        id: 'am-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: [
          '[A]',
          '[B]',
          '[C]',
          '[D]'
        ],
        answer: 3,
        explanation: 'This sentence serves as a concluding summary for the points made in the entire passage.',
        type: 'sentence-insertion',
        sentenceToInsert: 'These findings all demonstrate that human memory is not a simple storage device but an adaptive tool shaped by evolutionary pressures.'
      }
    ]
  },
  {
    id: 'circadian-rhythms-2',
    title: 'Circadian Rhythms (Set 2)',
    content: [
      "Circadian rhythms are internal biological clocks that regulate the timing of various physiological and behavioral processes. These rhythms are influenced by external cues, most notably the light-dark cycle of the environment. In humans, the suprachiasmatic nucleus (SCN) in the hypothalamus serves as the primary master clock, [A] aligning our internal processes with the external world. [SQ-A]",
      "The impact of circadian rhythms is evident in our sleep-wake cycles, hormone release, and even cognitive performance. Disruptions to these rhythms, such as those caused by jet lag or shift work, can have significant effects on health and well-being. [SQ-B] For instance, irregular sleep patterns have been linked to an increased risk of metabolic disorders and cardiovascular diseases. [SQ-C]",
      "Interestingly, circadian rhythms also play a role in the behavior of other organisms. Nocturnal animals are active during the night, while diurnal animals are active during the day, reflecting their adaptation to specific environmental niches. [SQ-D] When light enters our eyes, cells send a message to our brain that it can stop producing melatonin, the hormone that helps us sleep."
    ],
    questions: [
      {
        id: 'cr2-q1',
        question: 'Why does the author mention nocturnal and diurnal animals?',
        options: [
          'To explain the role of the master clock in humans',
          'To show how circadian rhythms affect different organisms',
          'To highlight the importance of the light-dark cycle',
          'To compare the sleep patterns of different species'
        ],
        answer: 1,
        explanation: 'The author mentions these animals to show that "circadian rhythms also play a role in the behavior of other organisms."',
        type: 'multiple-choice'
      },
      {
        id: 'cr2-q2',
        question: 'All of the following are affected by circadian rhythms in humans EXCEPT:',
        options: [
          'sleep-wake cycles',
          'hormone release',
          'cognitive performance',
          'geographical location'
        ],
        answer: 3,
        explanation: 'The text mentions sleep-wake cycles, hormone release, and cognitive performance, but not geographical location.',
        type: 'multiple-choice'
      },
      {
        id: 'cr2-q3',
        question: 'The word "aligning" in the passage is closest in meaning to',
        options: [
          'connecting',
          'adjusting',
          'matching',
          'separating'
        ],
        answer: 2,
        explanation: '"Aligning" means to bring into line or to match with something else.',
        type: 'multiple-choice',
        highlight: 'aligning',
        paragraphIndex: 0
      },
      {
        id: 'cr2-q4',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: [
          '[A]',
          '[B]',
          '[C]',
          '[D]'
        ],
        answer: 0,
        explanation: 'This sentence explains the mechanism of how light influences the internal clock, fitting well after the mention of the SCN and light-dark cycles.',
        type: 'sentence-insertion',
        sentenceToInsert: 'When light enters our eyes, cells send a message to our brain that it can stop producing melatonin, the hormone that helps us sleep.'
      }
    ]
  },
  {
    id: 'nudge-theory',
    title: 'Nudge Theory in Behavioral Economics',
    content: [
      "Nudge theory, a concept in behavioral economics, suggests that small, [A] subtly designed changes in the environment can significantly influence people's decisions without restricting their choices. These \"nudges\" are based on the idea that humans often make decisions based on heuristics and biases rather than purely rational calculations. [SQ-A]",
      "One common example of a nudge is the placement of healthy food at eye level in a cafeteria. By making healthy options more prominent, people are more likely to choose them, even if other options are still available. [SQ-B] Nudge theory has been applied in various fields, including public policy, healthcare, and finance, to encourage behaviors such as saving for retirement or increasing organ donation rates. [SQ-C]",
      "However, nudge theory is not without its critics. Some argue that nudges can be manipulative and undermine individual autonomy. They suggest that people should be aware of the nudges they are being exposed to and have the ability to opt out. [SQ-D] Despite these criticisms, nudge theory continues to be a popular tool for policymakers and organizations seeking to influence behavior in a positive way. For example, fitness apps often use nudges, such as notifications and progress bars, to encourage users to stay active."
    ],
    questions: [
      {
        id: 'nt-q1',
        question: 'The word "subtly" in the first paragraph is closest in meaning to',
        options: [
          'overtly',
          'quietly',
          'aggressively',
          'directly'
        ],
        answer: 1,
        explanation: '"Subtly" means in a quiet or indirect way, which is the opposite of "overtly" or "directly".',
        type: 'multiple-choice',
        highlight: 'subtly',
        paragraphIndex: 0
      },
      {
        id: 'nt-q2',
        question: 'What is suggested in the passage about nudge theory?',
        options: [
          'It restricts people\'s choices to encourage better decisions.',
          'It is based on the idea that humans are always rational.',
          'It uses small environmental changes to influence behavior.',
          'It is primarily used in the field of finance.'
        ],
        answer: 2,
        explanation: 'The text says nudge theory suggests "small, subtly designed changes in the environment can significantly influence people\'s decisions."',
        type: 'multiple-choice'
      },
      {
        id: 'nt-q3',
        question: 'What does the passage suggest is a criticism of nudge theory?',
        options: [
          'It is too expensive to implement.',
          'It is not effective in influencing behavior.',
          'It can be manipulative and undermine autonomy.',
          'It only works in certain geographical regions.'
        ],
        answer: 2,
        explanation: 'The text states: "Some argue that nudges can be manipulative and undermine individual autonomy."',
        type: 'multiple-choice'
      },
      {
        id: 'nt-q4',
        question: 'Why does the author mention "fitness apps"?',
        options: [
          'To provide an example of how nudges are used in technology',
          'To show that nudges are only effective for physical health',
          'To argue that fitness apps are manipulative',
          'To explain the role of progress bars in behavioral economics'
        ],
        answer: 0,
        explanation: 'Fitness apps are used as an example of how nudges (notifications, progress bars) are used to influence behavior.',
        type: 'multiple-choice',
        highlight: 'fitness apps',
        paragraphIndex: 2
      },
      {
        id: 'nt-q5',
        question: 'What is the relationship between paragraphs 3 and 4?',
        options: [
          'Paragraph 4 provides a solution to the problems mentioned in paragraph 3.',
          'Paragraph 4 gives a specific example that supports the general point in paragraph 3.',
          'Paragraph 4 introduces a new concept that contradicts paragraph 3.',
          'Paragraph 4 summarizes the main arguments of the entire passage.'
        ],
        answer: 1,
        explanation: 'Paragraph 3 discusses the popularity of nudge theory despite criticisms, and paragraph 4 (the last part of para 3 in my split) gives the fitness app example.',
        type: 'multiple-choice'
      },
      {
        id: 'nt-q6',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: [
          '[A]',
          '[B]',
          '[C]',
          '[D]'
        ],
        answer: 3,
        explanation: 'This sentence fits perfectly in the section discussing criticisms of nudge theory.',
        type: 'sentence-insertion',
        sentenceToInsert: 'Critics argue that nudges can sometimes undermine individual autonomy.'
      }
    ]
  },
  {
    id: 'solar-eclipses',
    title: 'Solar Eclipses',
    content: [
      "A solar eclipse occurs when the Moon passes between the Earth and the Sun, obscuring the Sun's light. This astronomical event has fascinated humans for centuries, often being interpreted as a sign of divine intervention or impending [A] upheavals. [SQ-A]",
      "There are three main types of solar eclipses: total, partial, and annular. A total solar eclipse occurs when the Moon completely covers the Sun, revealing the Sun's outer atmosphere, or corona. [SQ-B] This rare event provides scientists with a unique opportunity to study the corona, which is normally obscured by the Sun's bright light. Partial and annular eclipses occur when the Moon only partially covers the Sun or appears smaller than the Sun, respectively. [SQ-C]",
      "Predicting solar eclipses has been a goal of astronomers since ancient times. Ancient Greek philosophers, such as Thales of Miletus, are credited with making some of the earliest recorded predictions. [SQ-D] Today, with advanced technology and mathematical models, astronomers can predict solar eclipses with remarkable accuracy, allowing people around the world to witness these spectacular events."
    ],
    questions: [
      {
        id: 'se-q1',
        question: 'The word "upheavals" in the passage is closest in meaning to',
        options: [
          'discoveries',
          'disturbances',
          'celebrations',
          'alignments'
        ],
        answer: 1,
        explanation: '"Upheavals" refers to sudden or violent changes or disturbances.',
        type: 'multiple-choice',
        highlight: 'upheavals',
        paragraphIndex: 0,
        marker: 'A'
      },
      {
        id: 'se-q2',
        question: 'What is suggested about ancient Greek philosophers in the passage?',
        options: [
          'They were the first to understand the cause of solar eclipses.',
          'They used advanced technology to predict eclipses.',
          'They were among the first to record eclipse predictions.',
          'They viewed solar eclipses as signs of divine intervention.'
        ],
        answer: 2,
        explanation: 'The text says they "are credited with making some of the earliest recorded predictions."',
        type: 'multiple-choice'
      },
      {
        id: 'se-q3',
        question: 'What normally prevents scientists from gathering information about the corona?',
        options: [
          'The Moon\'s position between the Earth and the Sun',
          'The Sun\'s bright light',
          'The extreme temperatures of the corona',
          'The lack of advanced technology'
        ],
        answer: 1,
        explanation: 'The passage states the corona "is normally obscured by the Sun\'s bright light."',
        type: 'multiple-choice'
      },
      {
        id: 'se-q4',
        question: 'The passage answers all of the following questions EXCEPT:',
        options: [
          'What causes a solar eclipse?',
          'What are the different types of solar eclipses?',
          'How do scientists study the corona during an eclipse?',
          'Why did ancient people fear solar eclipses?'
        ],
        answer: 3,
        explanation: 'The passage mentions they were interpreted as signs of upheavals, but it doesn\'t explicitly explain *why* they feared them beyond that interpretation.',
        type: 'multiple-choice'
      },
      {
        id: 'se-q5',
        question: 'Where would the following sentence best fit? Select a location [•] to add the sentence to the passage.',
        options: [
          '[A]',
          '[B]',
          '[C]',
          '[D]'
        ],
        answer: 3,
        explanation: 'This sentence fits well after the mention of early predictions, adding detail about the difficulty of the task.',
        type: 'sentence-insertion',
        sentenceToInsert: 'These variations also made predicting solar eclipses a complex task for early astronomers.'
      }
    ]
  }
];
