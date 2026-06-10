/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EverydayQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface EverydayTask {
  id: string;
  type: 'agenda' | 'chat' | 'email' | 'announcement' | 'form' | 'schedule' | 'visual' | 'menu' | 'social' | 'advertisement' | 'news' | 'invoice' | 'receipt' | 'academic';
  title: string;
  content: any;
  questions: EverydayQuestion[];
}

export const EVERYDAY_DATA: EverydayTask[] = [
  {
    id: 'task-1',
    type: 'agenda',
    title: 'Company Event Agenda',
    content: {
      header: 'Company Event Agenda for April 10',
      items: [
        { time: '10:00 A.M.', activity: 'Opening Remarks' },
        { time: '10:30 A.M.', activity: 'Team Building Activities' },
        { time: '12:00 P.M.', activity: 'Lunch Break' },
        { time: '1:00 P.M.', activity: 'Strategy Meeting' },
        { time: '3:00 P.M.', activity: 'Closing Remarks' }
      ]
    },
    questions: [
      {
        id: 't1-q1',
        question: 'What is scheduled at noon?',
        options: ['Opening Remarks', 'Team Building Activities', 'Lunch Break', 'Strategy Meeting'],
        answer: 2,
        explanation: 'The agenda explicitly lists "12:00 P.M.: Lunch Break".'
      },
      {
        id: 't1-q2',
        question: 'What happens at the end of the event?',
        options: ['Strategy Meeting', 'Closing Remarks', 'Lunch Break', 'Opening Remarks'],
        answer: 1,
        explanation: 'The final item on the agenda is "3:00 P.M.: Closing Remarks".'
      }
    ]
  },
  {
    id: 'task-2',
    type: 'chat',
    title: 'Technical Support Chat',
    content: {
      header: 'Live Chat',
      messages: [
        { sender: 'Customer', text: 'My laptop screen is flickering and sometimes goes completely black. What could be causing this?' },
        { sender: 'Technician', text: 'Could be the display cable, graphics card, or the screen itself. When did this start happening?' },
        { sender: 'Customer', text: 'About a week ago, but it’s getting worse. Should I bring it in for diagnosis?' },
        { sender: 'Technician', text: 'Yes, we’ll need to test the hardware to determine the exact cause. Diagnosis takes about two hours.' },
        { sender: 'Customer', text: 'How much does diagnosis cost, and what if I decide not to repair it?' },
        { sender: 'Technician', text: 'Diagnosis is 50 dollars. If you authorize repairs over 100 dollars, we waive the diagnostic fee.' },
        { sender: 'Customer', text: 'That seems fair. What’s your typical turnaround time for this type of repair?' }
      ]
    },
    questions: [
      {
        id: 't2-q1',
        question: 'What does the customer want to understand about their laptop?',
        options: [
          'Whether a problem with the laptop can be fixed without professional repair',
          'Whether the laptop is still under manufacturer warranty',
          'How to prevent similar problems with the laptop from occurring in the future',
          'What might be causing the screen issues they’re experiencing with the laptop'
        ],
        answer: 3,
        explanation: 'The customer starts the conversation by asking "What could be causing this?" in reference to their screen issues.'
      },
      {
        id: 't2-q2',
        question: 'What is the likely reason why the technician asks when the problem started happening?',
        options: [
          'To determine if the issue is covered under any warranty',
          'To help assess the severity and progression of the problem',
          'To estimate how long the repair process will take',
          'To identify what might have triggered the malfunction'
        ],
        answer: 1,
        explanation: 'The technician asks this to understand the timeline, which helps in assessing how the problem is progressing (as the customer notes it is "getting worse").'
      },
      {
        id: 't2-q3',
        question: 'How does the repair shop’s pricing structure encourage customers to proceed with repairs?',
        options: [
          'Diagnostic fees are waived for repairs above a certain cost threshold.',
          'Labor costs are reduced for customers who approve repairs immediately.',
          'Multiple-problem diagnosis is available at no additional charge.',
          'Customers receive discounts for referring other people needing repairs.'
        ],
        answer: 0,
        explanation: 'The technician mentions that the $50 diagnostic fee is waived if the customer authorizes repairs costing over $100.'
      }
    ]
  },
  {
    id: 'task-3',
    type: 'email',
    title: 'Maintenance Notification',
    content: {
      subject: 'Plumbing maintenance',
      from: 'Samantha Brown',
      to: 'Mr. Johnson',
      body: 'Dear Mr. Johnson,\n\nSince you are out of the office today, I am writing to inform you that the office will be closed for urgent plumbing maintenance from Monday, July 3, to Friday, July 7. During this period, you will need to work remotely. It is important to check that your home workspace is fully functional to avoid any disruptions to your work. Additionally, please ensure that you have all necessary files and equipment before the remote-work period begins. Use your time in the office on Friday, June 30, to strategize accordingly. Please contact the IT support team for assistance if needed during the remote-work period. Moreover, if you have any urgent matters that require in-person attention, please let me know as soon as possible so we can make the necessary arrangements. Thank you for your cooperation.\n\nBest regards,\nSamantha Brown'
    },
    questions: [
      {
        id: 't3-q1',
        question: 'What should Mr. Johnson do on June 30?',
        options: ['Work from home', 'Begin plumbing work', 'Plan for remote work', 'Clean his workspace'],
        answer: 2,
        explanation: 'The email instructs him to "Use your time in the office on Friday, June 30, to strategize accordingly" for the upcoming remote-work period.'
      },
      {
        id: 't3-q2',
        question: 'The word "Moreover" in the passage is closest in meaning to',
        options: ['Finally', 'Otherwise', 'However', 'Furthermore'],
        answer: 3,
        explanation: '"Moreover" is a transition word used to add information, making "Furthermore" the closest synonym.'
      }
    ]
  },
  {
    id: 'task-4',
    type: 'chat',
    title: 'Project Deadline Discussion',
    content: {
      header: 'CHAT',
      messages: [
        { sender: 'Jennifer Ward', time: '2:10 P.M.', text: 'The client just moved up the delivery date for the Henderson project by two weeks. They want everything completed by March 15 instead of March 29.' },
        { sender: 'Tom Braxton', time: '2:15 P.M.', text: 'That’s going to be tight. The original deadline has been brutal enough. My team is already working overtime on the Rivera account, and we have three other deadlines that same week.' },
        { sender: 'Jennifer Ward', time: '2:18 P.M.', text: 'I understand you’re swamped. My hands are full with the budget revisions. I need my team to focus on those. Would you mind taking over the client communications while I focus on getting additional resources for the new deadline push? With a few extra people, we should all be able to make the new deadline.' },
        { sender: 'Tom Braxton', time: '2:22 P.M.', text: 'Sure, I can handle the Henderson calls and emails. Let’s see if we can get some temporary help from the freelance pool.' }
      ]
    },
    questions: [
      {
        id: 't4-q1',
        question: 'What can be concluded about the Henderson project situation?',
        options: [
          'The client has provided additional funding for faster completion.',
          'The new deadline creates scheduling conflicts with other work.',
          'The original deadline for the project was not going to be met.',
          'Jennifer will personally handle all client communications.'
        ],
        answer: 1,
        explanation: 'Tom explains that his team is already working overtime and has "three other deadlines that same week," indicating a scheduling conflict.'
      },
      {
        id: 't4-q2',
        question: 'What does Tom suggest they should do about staffing?',
        options: [
          'Hire permanent employees immediately',
          'Postpone other projects until the Henderson project is complete',
          'See if temporary workers are available',
          'Ask the client for a deadline extension'
        ],
        answer: 2,
        explanation: 'Tom suggests looking for "temporary help from the freelance pool."'
      },
      {
        id: 't4-q3',
        question: 'At 2:18 p.m., what does Jennifer imply when she writes, "My hands are full with the budget revisions"?',
        options: [
          'Tom should help her complete the budget revisions.',
          'Tom needs to increase his team’s amount of overtime to meet the new deadline.',
          'She and her team cannot help meet the new deadline without assistance.',
          'She and her team need to concentrate on managing client communications for the Henderson project.'
        ],
        answer: 2,
        explanation: 'Jennifer is explaining her own workload to justify why she needs Tom to handle client communications while she seeks extra help, implying they are currently at capacity.'
      }
    ]
  },
  {
    id: 'task-5',
    type: 'email',
    title: 'Security Procedures',
    content: {
      subject: 'New security procedures',
      from: 'Jennifer (Security Department)',
      to: 'All Employees',
      body: 'Effective Monday, all visitors must check in at the front desk and receive a temporary badge before entering the building. Employees are responsible for escorting their guests at all times. Please inform any clients or vendors you’re expecting about this new requirement.\n\nSecurity Department\nJennifer'
    },
    questions: [
      {
        id: 't5-q1',
        question: 'What is the security department announcing?',
        options: [
          'A change in building access rules',
          'New employee identification cards',
          'Extended building hours',
          'Additional security staff'
        ],
        answer: 0,
        explanation: 'The email outlines new requirements for visitor check-in and escorting, which are changes to building access rules.'
      },
      {
        id: 't5-q2',
        question: 'What must employees do when they have visitors?',
        options: [
          'Register them in advance',
          'Meet them outside the building',
          'Accompany them throughout their visit',
          'Provide them with permanent badges'
        ],
        answer: 2,
        explanation: 'The email states: "Employees are responsible for escorting their guests at all times."'
      }
    ]
  },
  {
    id: 'task-6',
    type: 'form',
    title: 'Enrollment Form',
    content: {
      header: 'COMMUNITY COLLEGE CONTINUING EDUCATION ENROLLMENT FORM',
      sections: [
        {
          title: 'Student information',
          fields: ['Name', 'Phone', 'Email']
        },
        {
          title: 'Course selection',
          options: ['Computer Skills for Seniors', 'Small Business Accounting', 'Creative Writing Workshop', 'Home Gardening Basics']
        },
        {
          text: 'All courses meet for 8 weeks.\nEvening classes: Tuesday/Thursday 6:30–8:30 P.M.\nWeekend option: Saturday 9 A.M.–12 P.M.\n\nCourse fee: $125, including materials and textbooks\nPayment plan available: $65 at registration, $60 before session 4\n\nPriority given to town residents, then county residents, and finally out-of-area students'
        }
      ]
    },
    questions: [
      {
        id: 't6-q1',
        question: 'How is priority determined?',
        options: [
          'Based on the order in which completed applications are received',
          'According to students\' previous educational experience',
          'Through a lottery system when courses are oversubscribed',
          'By geographic location, with town residents getting preference'
        ],
        answer: 3,
        explanation: 'The form specifies that priority is given based on residency (town, then county, then out-of-area).'
      },
      {
        id: 't6-q2',
        question: 'What payment option is available for students who cannot pay the full fee immediately?',
        options: [
          'A scholarship program based on financial need',
          'Deferred payment until after course completion',
          'A two-part payment schedule',
          'Work-study arrangements to reduce course costs'
        ],
        answer: 2,
        explanation: 'The form mentions a payment plan of $65 at registration and $60 before session 4, which is a two-part schedule.'
      },
      {
        id: 't6-q3',
        question: 'What is this form designed for?',
        options: [
          'Applying for employment at a community college',
          'Registering for an educational course',
          'Requesting information about degree programs',
          'Scheduling appointments with academic advisors'
        ],
        answer: 1,
        explanation: 'The title of the form is "CONTINUING EDUCATION ENROLLMENT FORM", used for registering for the listed courses.'
      }
    ]
  },
  {
    id: 'task-7',
    type: 'announcement',
    title: 'Healthy Lifestyle Tips',
    content: {
      header: 'Top Tips for a Healthy Lifestyle',
      items: [
        'Eat a balanced diet with plenty of fruits and vegetables.',
        'Exercise regularly to maintain muscle tone.',
        'Get enough sleep to feel rested and energized.',
        'Stay hydrated by drinking water throughout the day.'
      ]
    },
    questions: [
      {
        id: 't7-q1',
        question: 'What should you do to stay hydrated?',
        options: ['Drink water', 'Eat vegetables', 'Exercise', 'Sleep well'],
        answer: 0,
        explanation: 'The article explicitly recommends "drinking water throughout the day" to stay hydrated.'
      },
      {
        id: 't7-q2',
        question: 'Which of the following is important for maintaining muscle tone?',
        options: [
          'Eating fruits and vegetables',
          'Getting enough sleep',
          'Exercising regularly',
          'Eating a balanced diet'
        ],
        answer: 2,
        explanation: 'The article states: "Exercise regularly to maintain muscle tone."'
      }
    ]
  },
  {
    id: 'task-8',
    type: 'email',
    title: 'Library Notification',
    content: {
      subject: 'Reserved book',
      from: 'Jonathan Clark',
      to: 'Ms. Lee',
      body: 'Dear Ms. Lee,\n\nThe book you reserved is now available for pickup at the City Library. You have until May 20 to collect it. Please be aware that parking may be limited due to ongoing construction. If you need any assistance, feel free to contact us.\n\nRegards,\nJonathan Clark'
    },
    questions: [
      {
        id: 't8-q1',
        question: 'What does the email mainly inform Ms. Lee about?',
        options: [
          'A reservation\'s cancellation',
          'An event schedule',
          'An address change',
          'A book\'s availability'
        ],
        answer: 3,
        explanation: 'The main message is that the reserved book is "now available for pickup".'
      },
      {
        id: 't8-q2',
        question: 'What may Ms. Lee have trouble doing?',
        options: ['Parking the car', 'Paying a fee', 'Contacting the library', 'Reserving a book'],
        answer: 0,
        explanation: 'The email warns that "parking may be limited due to ongoing construction."'
      }
    ]
  },
  {
    id: 'task-9',
    type: 'email',
    title: 'Delivery Confirmation',
    content: {
      subject: 'Delivery address change',
      from: 'Susan Green',
      to: 'Mr. Carter',
      body: 'Dear Mr. Carter,\n\nYour request to change the delivery address for your package has been processed. The package will now be sent to 22 Pine Road. You can expect delivery within the next 3-5 business days. We trust that you will enjoy your new laptop. Contact our customer service team with any questions.\n\nBest regards,\nSusan Green'
    },
    questions: [
      {
        id: 't9-q1',
        question: 'What is the main purpose of the email?',
        options: [
          'To confirm a change of address',
          'To cancel a delivery',
          'To recommend a product',
          'To request additional information'
        ],
        answer: 0,
        explanation: 'The email confirms that the request to change the delivery address "has been processed."'
      },
      {
        id: 't9-q2',
        question: 'What did Mr. Carter order?',
        options: ['A desk', 'A camera', 'A lamp', 'A computer'],
        answer: 3,
        explanation: 'The email mentions: "We trust that you will enjoy your new laptop."'
      }
    ]
  },
  {
    id: 'task-10',
    type: 'email',
    title: 'Repair Appointment',
    content: {
      subject: 'Laptop problem',
      from: 'Lauren Yem',
      to: 'Mr. Johnson',
      body: 'Dear Mr. Johnson,\n\nThanks for contacting me about your laptop problem. I should arrive tomorrow at about 3:00 P.M. I forgot to mention during our phone call that I only take cash. As you know, I charge $40.00 per hour. I look forward to meeting you and taking a look at the computer.\n\nBest,\nLauren Yem'
    },
    questions: [
      {
        id: 't10-q1',
        question: 'Who mostly likely is Lauren Yem?',
        options: [
          'A friend of Mr. Johnson',
          'A computer technician',
          'A computer salesperson',
          'An electrician'
        ],
        answer: 1,
        explanation: 'Lauren is coming to "take a look at the computer" regarding a "laptop problem" and charges an hourly rate, which are typical actions of a technician.'
      },
      {
        id: 't10-q2',
        question: 'What did Lauren Yem forget to mention during a phone call?',
        options: [
          'That she charges $40.00 per hour',
          'That she prefers to meet at her office',
          'That she only accepts cash',
          'That she will arrive later than expected'
        ],
        answer: 2,
        explanation: 'She explicitly writes: "I forgot to mention during our phone call that I only take cash."'
      }
    ]
  },
  {
    id: 'task-11',
    type: 'email',
    title: 'Meeting Invitation',
    content: {
      subject: 'Team meeting',
      from: 'John Smith',
      to: 'Ms. Lee',
      body: 'Dear Ms. Lee,\n\nPlease join us for the annual team meeting at 2:00 P.M. on Friday, May 15 in Room 305. We will discuss project updates and future plans. Refreshments will be provided.\n\nThanks,\nJohn Smith'
    },
    questions: [
      {
        id: 't11-q1',
        question: 'What will be discussed at the meeting?',
        options: ['Refreshments', 'The annual budget', 'Project updates', 'Team schedules'],
        answer: 2,
        explanation: 'The email states: "We will discuss project updates and future plans."'
      },
      {
        id: 't11-q2',
        question: 'What is the main purpose of the email?',
        options: [
          'To invite someone to a meeting',
          'To request a schedule',
          'To request feedback',
          'To order refreshments'
        ],
        answer: 0,
        explanation: 'The email is an invitation to join the annual team meeting.'
      }
    ]
  },
  {
    id: 'task-12',
    type: 'chat',
    title: 'Performance Review Discussion',
    content: {
      header: 'CHAT',
      messages: [
        { sender: 'HR Manager', text: 'These quarterly reviews are taking forever. Each manager spends three to four hours per employee, and we’re always behind schedule.' },
        { sender: 'Team Lead', text: 'What if we switched to a continuous feedback system instead of quarterly marathons?' },
        { sender: 'HR Manager', text: 'How would that work? We need formal documentation for performance records.' },
        { sender: 'Team Lead', text: 'Monthly fifteen-minute check-ins with digital tracking. Quarterly meetings become summary discussions instead of starting from scratch.' },
        { sender: 'HR Manager', text: 'That could work, but how do we ensure consistency across different managers?' },
        { sender: 'Team Lead', text: 'Standardized digital templates with required discussion points. Managers can add personalized feedback but core elements stay consistent.' },
        { sender: 'HR Manager', text: 'I like this approach. It spreads the workload and gives employees more regular feedback.' }
      ]
    },
    questions: [
      {
        id: 't12-q1',
        question: 'How does the proposed system address the HR manager’s concern about consistency?',
        options: [
          'By requiring all managers to attend training sessions to review best practices',
          'By having HR staff give brief presentations during all performance review meetings',
          'By using standardized digital templates with required discussion elements',
          'By limiting manager discretion in how they conduct performance discussions'
        ],
        answer: 2,
        explanation: 'The Team Lead suggests using "Standardized digital templates with required discussion points" to keep core elements consistent.'
      },
      {
        id: 't12-q2',
        question: 'What solution does the team lead propose to address the issue raised by the HR manager?',
        options: [
          'Reducing the frequency of performance reviews from quarterly to annually',
          'Hiring additional HR staff to assist with performance review scheduling',
          'Training managers to complete reviews more efficiently',
          'Implementing continuous feedback with brief monthly check-ins'
        ],
        answer: 3,
        explanation: 'The Team Lead proposes "Monthly fifteen-minute check-ins with digital tracking" as part of a continuous feedback system.'
      },
      {
        id: 't12-q3',
        question: 'What problem is the current quarterly review system creating?',
        options: [
          'Employees are not receiving adequate feedback about their performance.',
          'The review process is extremely time-consuming and causes scheduling delays.',
          'Different managers are using inconsistent criteria for evaluating employees.',
          'Quarterly reviews don’t provide enough documentation for legal compliance.'
        ],
        answer: 1,
        explanation: 'The HR Manager notes that reviews are "taking forever" and they are "always behind schedule."'
      }
    ]
  },
  {
    id: 'task-13',
    type: 'announcement',
    title: 'Community Workshop',
    content: {
      header: 'Free Digital Literacy Workshop',
      items: [
        'Learn the basics of using a computer and navigating the internet.',
        'Date: Saturday, October 15',
        'Time: 10:00 A.M. – 1:00 P.M.',
        'Location: Community Center, Room 204',
        'Registration: Required by October 12. Call 555-0199 to sign up.'
      ]
    },
    questions: [
      {
        id: 't13-q1',
        question: 'What is the main purpose of the workshop?',
        options: [
          'To teach people how to use computers',
          'To provide free internet access',
          'To repair broken laptops',
          'To sell digital equipment'
        ],
        answer: 0,
        explanation: 'The announcement states the workshop is to "Learn the basics of using a computer and navigating the internet."'
      },
      {
        id: 't13-q2',
        question: 'When is the deadline to register for the workshop?',
        options: [
          'October 10',
          'October 12',
          'October 15',
          'Anytime before the workshop starts'
        ],
        answer: 1,
        explanation: 'The announcement says "Registration: Required by October 12."'
      }
    ]
  },
  {
    id: 'task-14',
    type: 'email',
    title: 'New Office Policy',
    content: {
      subject: 'Updated remote work policy',
      from: 'HR Department',
      to: 'All Staff',
      body: 'Dear Team,\n\nStarting next month, we are implementing a new hybrid work schedule. All employees are expected to be in the office on Tuesdays and Thursdays for team collaboration. For the remaining three days, you have the option to work from home or from the office. Please update your shared calendars by the end of this week to reflect your planned schedule. If you have any specific concerns, please discuss them with your direct supervisor.\n\nThank you for your continued hard work.\n\nBest regards,\nHR Department'
    },
    questions: [
      {
        id: 't14-q1',
        question: 'On which days must employees be in the office?',
        options: [
          'Monday and Wednesday',
          'Tuesday and Thursday',
          'Monday, Tuesday, and Wednesday',
          'Every day of the week'
        ],
        answer: 1,
        explanation: 'The email states: "All employees are expected to be in the office on Tuesdays and Thursdays."'
      },
      {
        id: 't14-q2',
        question: 'What are employees asked to do by the end of the week?',
        options: [
          'Submit a formal request for remote work',
          'Meet with their direct supervisor',
          'Update their shared calendars',
          'Sign a new employment contract'
        ],
        answer: 2,
        explanation: 'The email says: "Please update your shared calendars by the end of this week."'
      }
    ]
  },
  {
    id: 'task-15',
    type: 'form',
    title: 'Volunteer Application',
    content: {
      header: 'CITY ANIMAL SHELTER VOLUNTEER APPLICATION',
      sections: [
        {
          title: 'Personal Details',
          fields: ['Full Name', 'Date of Birth', 'Address', 'Phone Number']
        },
        {
          title: 'Availability',
          options: ['Weekday Mornings', 'Weekday Afternoons', 'Weekend Mornings', 'Weekend Afternoons']
        },
        {
          text: 'Requirements:\n- Must be at least 18 years old.\n- Must commit to at least 4 hours per week.\n- Background check required for all volunteers.\n- Orientation session mandatory before starting.\n\nBenefits:\n- Training provided.\n- Opportunity to work with various animals.\n- Community service hours available.'
        }
      ]
    },
    questions: [
      {
        id: 't15-q1',
        question: 'What is the minimum weekly time commitment for volunteers?',
        options: [
          '2 hours',
          '4 hours',
          '8 hours',
          'There is no minimum commitment'
        ],
        answer: 1,
        explanation: 'The form states: "Must commit to at least 4 hours per week."'
      },
      {
        id: 't15-q2',
        question: 'What must happen before a volunteer can start working?',
        options: [
          'They must pay a registration fee',
          'They must complete a training course',
          'They must attend an orientation session',
          'They must provide their own equipment'
        ],
        answer: 2,
        explanation: 'The form says: "Orientation session mandatory before starting."'
      },
      {
        id: 't15-q3',
        question: 'Which of the following is NOT listed as a benefit of volunteering?',
        options: [
          'Receiving training',
          'Working with animals',
          'Getting community service hours',
          'Receiving a small stipend'
        ],
        answer: 3,
        explanation: 'The benefits listed are training, working with animals, and community service hours. A stipend is not mentioned.'
      }
    ]
  },
  {
    id: 'task-16',
    type: 'announcement',
    title: 'Library Closure Notice',
    content: {
      header: 'SUMMER MAINTENANCE CLOSURE',
      items: [
        'The Central Library will be closed for HVAC upgrades from July 1st to July 15th.',
        'During this time, the book drop will remain open for returns.',
        'Due dates for all items currently on loan will be extended until July 20th.',
        'Our online resources and e-book selection will still be accessible 24/7.',
        'We apologize for any inconvenience.'
      ]
    },
    questions: [
      {
        id: 't16-q1',
        question: 'When will the library reopen for normal operations?',
        options: ['July 1st', 'July 15th', 'July 16th', 'July 20th'],
        answer: 2,
        explanation: 'If it is closed "from July 1st to July 15th", it should reopen on the 16th.'
      },
      {
        id: 't16-q2',
        question: 'What happens to books that are currently checked out?',
        options: ['They must be returned by July 1st.', 'Their return dates are pushed back to late July.', 'They can only be returned through online portals.', 'They will be collected from patrons\' homes.'],
        answer: 1,
        explanation: 'The notice says due dates "will be extended until July 20th".'
      }
    ]
  },
  {
    id: 'task-17',
    type: 'announcement',
    title: 'No Parking Sign',
    content: {
      header: 'TEMPORARY NO PARKING',
      items: [
        'STREET CLEANING: THURSDAYS 8:00 AM - 12:00 PM',
        'VEHICLES PARKED DURING THESE TIMES WILL BE TOWED AT OWNER\'S EXPENSE.',
        'EFFECTIVE: JUNE 1 - AUGUST 31',
        'FOR MORE INFO: CALL 555-PARK'
      ]
    },
    questions: [
      {
        id: 't17-q1',
        question: 'When is parking prohibited on this street?',
        options: ['Every morning', 'Thursday afternoons', 'Thursday mornings', 'Every day during the summer'],
        answer: 2,
        explanation: 'The sign specifies "THURSDAYS 8:00 AM - 12:00 PM", which is Thursday morning.'
      }
    ]
  },
  {
    id: 'task-18',
    type: 'announcement',
    title: 'Found Dog Poster',
    content: {
      header: 'FOUND: GOLDEN RETRIEVER',
      items: [
        'Found wandering near Oak Park on Monday afternoon.',
        'Friendly male, no collar, roughly 2-3 years old.',
        'Currently being cared for at the North Side Shelter.',
        'Must provide proof of ownership (photos/records) to claim.',
        'Call: 555-0212'
      ]
    },
    questions: [
      {
        id: 't18-q1',
        question: 'What is required to get the dog back?',
        options: ['A small fee', 'Identification from the park', 'Evidence that the dog belongs to you', 'A new collar'],
        answer: 2,
        explanation: 'The poster states: "Must provide proof of ownership (photos/records) to claim."'
      }
    ]
  },
  {
    id: 'task-19',
    type: 'menu',
    title: 'The Green Bistro Lunch Menu',
    content: {
      header: 'LUNCH SPECIALS (11am - 3pm)',
      items: [
        { name: 'Garden Salad', price: '$8.50', desc: 'Fresh greens, cucumbers, tomatoes, balsamic vinaigrette.' },
        { name: 'Chicken Panini', price: '$12.00', desc: 'Grilled chicken, pesto, provolone, sun-dried tomatoes.' },
        { name: 'Tomato Soup', price: '$6.00', desc: 'Creamy tomato with a hint of basil. Served with crusty bread.' },
        { name: 'Daily Catch', price: '$18.00', desc: 'Fresh fish of the day with steamed vegetables.' }
      ],
      footer: 'Add a small coffee or tea to any lunch special for just $1.50!'
    },
    questions: [
      {
        id: 't19-q1',
        question: 'Which item is the most expensive on the lunch menu?',
        options: ['Garden Salad', 'Chicken Panini', 'Tomato Soup', 'Daily Catch'],
        answer: 3,
        explanation: 'The Daily Catch is priced at $18.00, which is higher than the other items.'
      },
      {
        id: 't19-q2',
        question: 'What is the benefit of ordering a lunch special?',
        options: ['Free crusty bread', 'A discounted hot beverage', 'Complimentary garden salad', 'Faster service'],
        answer: 1,
        explanation: 'The menu says you can add coffee or tea for "just $1.50", implying a special price with a meal.'
      }
    ]
  },
  {
    id: 'task-20',
    type: 'menu',
    title: 'City Roasters Coffee',
    content: {
      header: 'BREWED TO PERFECTION',
      items: [
        { name: 'Espresso', price: '$3.00', desc: 'Single shot of our dark roast.' },
        { name: 'Latte', price: '$4.50', desc: 'Espresso with steamed milk and foam.' },
        { name: 'Cold Brew', price: '$5.00', desc: 'Slow-steeped for 12 hours.' },
        { name: 'Muffin of the Day', price: '$3.50', desc: 'Freshly baked every morning.' }
      ]
    },
    questions: [
      {
        id: 't20-q1',
        question: 'How is the Cold Brew prepared differently from other coffee?',
        options: ['It uses a lighter roast.', 'It is served with extra foam.', 'It is made using a slow-steeping process.', 'It contains more espresso shots.'],
        answer: 2,
        explanation: 'The description for Cold Brew says "Slow-steeped for 12 hours."'
      }
    ]
  },
  {
    id: 'task-21',
    type: 'menu',
    title: 'Mama Mia\'s Pizza',
    content: {
      header: 'PIZZA BY THE SLICE OR WHOLE',
      items: [
        { name: 'Cheese', price: '$3.50 / $18.00', desc: 'Mozzarella and classic red sauce.' },
        { name: 'Pepperoni', price: '$4.00 / $22.00', desc: 'Spicy pepperoni and mozzarella.' },
        { name: 'Veggie Delite', price: '$4.50 / $24.00', desc: 'Mushrooms, peppers, onions, and olives.' }
      ]
    },
    questions: [
      {
        id: 't21-q1',
        question: 'What is the price of a whole Veggie Delite pizza?',
        options: ['$4.50', '$18.00', '$22.00', '$24.00'],
        answer: 3,
        explanation: 'The menu lists $4.50 for a slice and $24.00 for a whole Veggie Delite.'
      }
    ]
  },
  {
    id: 'task-22',
    type: 'social',
    title: 'Travel Blog: Lost in Tokyo',
    content: {
      header: 'Wanderlust Diaries',
      body: 'Day 3 in Tokyo and I’m finally adjusted to the time zone! Today I spent the morning in Shinjuku Gyoen National Garden. It’s hard to believe such a peaceful place exists in the middle of this neon city. If you’re coming here, make sure to bring cash for the entrance fee—some places still don’t take cards! #TokyoTravel #Japan #Shinjuku',
      stats: { likes: 1240, comments: 45 }
    },
    questions: [
      {
        id: 't22-q1',
        question: 'What advice does the blogger give to future visitors?',
        options: ['Visit the garden at night', 'Carry physical currency', 'Stay in the Shinjuku district', 'Avoid the city center during busy hours'],
        answer: 1,
        explanation: 'The blogger suggests: "make sure to bring cash for the entrance fee—some places still don’t take cards!"'
      }
    ]
  },
  {
    id: 'task-23',
    type: 'social',
    title: 'Charity Update: Clean Water Project',
    content: {
      header: 'Helping Hands Global',
      body: 'We are thrilled to announce that Phase 1 of the Malawi Well Project is complete! Thanks to your generous donations, three villages now have access to safe, clean drinking water. But we aren’t done yet. Phase 2 starts next month. Every $5 donated provides water for one person for a year. Link in bio to help! #CleanWater #GlobalHealth',
      stats: { likes: 856, comments: 12 }
    },
    questions: [
      {
        id: 't23-q1',
        question: 'What is the main goal of this social media post?',
        options: ['To recruit volunteers for Phase 2', 'To show the results of previous support and ask for more', 'To explain the technical process of digging wells', 'To warn about water shortages in Malawi'],
        answer: 1,
        explanation: 'The post announces completion of Phase 1 and asks for donations for Phase 2.'
      }
    ]
  },
  {
    id: 'task-24',
    type: 'social',
    title: 'Product Review: Ultra-Bass Headphones',
    content: {
      header: 'TechReviews by Sam',
      body: 'I’ve been testing the Ultra-Bass 500s for a week. The sound quality is insane for the price point. Very crisp mids and, as the name suggests, heavy bass. However, the battery life falls short of the advertised 20 hours—I only got about 14. Still, for $60, they’re a steal. 4/5 stars. ⭐⭐⭐⭐',
      stats: { likes: 210, comments: 34 }
    },
    questions: [
      {
        id: 't24-q1',
        question: 'What is Sam\'s primary criticism of the headphones?',
        options: ['The price is too high.', 'The bass is too loud.', 'The battery doesn\'t last as long as claimed.', 'The sound quality is muffled.'],
        answer: 2,
        explanation: 'Sam states: "the battery life falls short of the advertised 20 hours—I only got about 14."'
      }
    ]
  },
  {
    id: 'task-25',
    type: 'schedule',
    title: 'Express Bus Timetable',
    content: {
      header: 'ROUTE 402: DOWNTOWN TO AIRPORT',
      items: [
        { time: '5:30 AM', stop: 'Central Station' },
        { time: '6:15 AM', stop: 'Riverside Mall' },
        { time: '6:45 AM', stop: 'Airport Terminal 1' },
        { time: '7:00 AM', stop: 'Airport Terminal 2' }
      ],
      footer: 'Buses run every 45 minutes after the first departure.'
    },
    questions: [
      {
        id: 't25-q1',
        question: 'If you miss the 5:30 AM bus at Central Station, when is the next one scheduled?',
        options: ['6:00 AM', '6:15 AM', '6:30 AM', '7:00 AM'],
        answer: 1,
        explanation: 'The footer says "Buses run every 45 minutes". 5:30 + 45 min = 6:15.'
      }
    ]
  },
  {
    id: 'task-26',
    type: 'schedule',
    title: 'University Exam Hall',
    content: {
      header: 'FINALS WEEK: BUILDING B',
      items: [
        { date: 'June 10', subject: 'Psychology 101', room: 'B-201', time: '9:00 AM' },
        { date: 'June 10', subject: 'Microeconomics', room: 'B-105', time: '2:00 PM' },
        { date: 'June 11', subject: 'World History', room: 'B-302', time: '9:00 AM' }
      ]
    },
    questions: [
      {
        id: 't26-q1',
        question: 'Where should a student go for the Microeconomics exam?',
        options: ['B-201', 'B-105', 'B-302', 'Building A'],
        answer: 1,
        explanation: 'The table lists Microeconomics in room B-105.'
      }
    ]
  },
  {
    id: 'task-27',
    type: 'schedule',
    title: 'Peak Fitness Class Schedule',
    content: {
      header: 'MONDAY - WEDNESDAY CLASSES',
      items: [
        { day: 'Monday', time: '6:00 AM', class: 'High Intensity Yoga' },
        { day: 'Tuesday', time: '5:30 PM', class: 'Spinning' },
        { day: 'Wednesday', time: '12:00 PM', class: 'Pilates' }
      ],
      footer: 'Please arrive 10 minutes early to set up equipment.'
    },
    questions: [
      {
        id: 't27-q1',
        question: 'Which class is scheduled during the lunch hour?',
        options: ['Yoga', 'Spinning', 'Pilates', 'None of the above'],
        answer: 2,
        explanation: 'Pilates is scheduled for Wednesday at 12:00 PM, which is lunch hour.'
      }
    ]
  },
  {
    id: 'task-28',
    type: 'email',
    title: 'Interview Confirmation',
    content: {
      subject: 'Interview for Content Editor Position',
      from: 'Marcus Reed (HR Director)',
      to: 'Emily Vance',
      body: 'Dear Emily,\n\nWe would like to invite you for a second-round interview this Thursday at 10:00 AM. This will be a technical assessment where you will review a sample manuscript. Please bring a laptop and a valid ID to check in at security. The interview will take place in Conference Room C on the 4th floor.\n\nBest,\nMarcus'
    },
    questions: [
      {
        id: 't28-q1',
        question: 'What is the primary purpose of the technical assessment?',
        options: ['To meet the whole team', 'To evaluate editing skills on a manuscript', 'To discuss salary and benefits', 'To learn how to use company software'],
        answer: 1,
        explanation: 'The email says "This will be a technical assessment where you will review a sample manuscript."'
      }
    ]
  },
  {
    id: 'task-29',
    type: 'email',
    title: 'Project Update Request',
    content: {
      subject: 'Action Needed: Website Launch',
      from: 'Sarah Jenkins',
      to: 'The Design Team',
      body: 'Hi team,\n\nWe need to finalise the homepage assets by EOD Friday to stay on track for the Monday launch. Please upload all high-res images to the shared folder by tomorrow noon. If we miss this window, the developers won’t have enough time for the staging tests. Let’s make it happen!\n\nSarah'
    },
    questions: [
      {
        id: 't14-q2',
        question: 'What will happen if the images are uploaded late?',
        options: [
          'The project will be cancelled.',
          'The website will launch without images.',
          'Testing before the launch will be delayed.',
          'The design team will be fired.'
        ],
        answer: 2,
        explanation: 'Sarah notes that if they miss the window, "the developers won’t have enough time for the staging tests."'
      }
    ]
  },
  {
    id: 'task-30',
    type: 'email',
    title: 'Service Interruption',
    content: {
      subject: 'Scheduled Maintenance: Fiber Internet',
      from: 'NetStream Support',
      to: 'Valued Customer',
      body: 'Dear Customer,\n\nDue to infrastructure upgrades, your internet service will be temporarily unavailable on Tuesday, Oct 5, between 2:00 AM and 5:00 AM. We have chosen these hours to minimize impact on your daily routine. No action is required on your part; service will automatically restore once maintenance is complete. Thank you for your patience.\n\nNetStream'
    },
    questions: [
      {
        id: 't30-q1',
        question: 'Why did the company choose the specific time for maintenance?',
        options: ['It is when their staff is most available.', 'To cause the least amount of disturbance to users.', 'Because the weather is better at night.', 'To avoid peak data speeds.'],
        answer: 1,
        explanation: 'The email says the hours were chosen "to minimize impact on your daily routine."'
      }
    ]
  },
  {
    id: 'task-31',
    type: 'chat',
    title: 'Group Dinner Plans',
    content: {
      header: 'FRIENDS GROUP',
      messages: [
        { sender: 'Alice', text: 'Hey guys! Anyone up for pizza tonight? 🍕' },
        { sender: 'Bob', text: 'I’m in! But can we do 7:30? Still at the gym.' },
        { sender: 'Alice', text: 'Sure. Charlie, can you make it?' },
        { sender: 'Charlie', text: '7:30 works. Where?' },
        { sender: 'Alice', text: 'Let’s try that new place on 5th Street. I’ll book a table for 3.' }
      ]
    },
    questions: [
      {
        id: 't31-q1',
        question: 'At what time does the group plan to meet?',
        options: ['6:30', '7:00', '7:30', '8:00'],
        answer: 2,
        explanation: 'Bob suggests 7:30 and Alice and Charlie agree.'
      }
    ]
  },
  {
    id: 'task-32',
    type: 'chat',
    title: 'Package Delivery Inquiry',
    content: {
      header: 'CUSTOMER SUPPORT',
      messages: [
        { sender: 'User', text: 'My tracking says "delivered" but I don’t see it anywhere.' },
        { sender: 'Support', text: 'I’m sorry to hear that. Did you check behind the side gate or with a neighbor?' },
        { sender: 'User', text: 'Checked the gate. Nothing. I’ll go ask Mrs. Hudson next door.' },
        { sender: 'User', text: 'Found it! It was at her house. Thanks.' }
      ]
    },
    questions: [
      {
        id: 't32-q1',
        question: 'Where did the user eventually find their package?',
        options: ['Behind the side gate', 'At the post office', 'At a neighbor\'s house', 'In their mailbox'],
        answer: 2,
        explanation: 'The user says "Found it! It was at her house [the neighbor\'s]."'
      }
    ]
  },
  {
    id: 'task-33',
    type: 'chat',
    title: 'Missing Equipment',
    content: {
      header: 'PROJECT TEAM',
      messages: [
        { sender: 'Manager', text: 'Has anyone seen the green laser level? It’s missing from the toolbox.' },
        { sender: 'Devin', text: 'I used it yesterday on the third floor. I might have left it in room 305.' },
        { sender: 'Manager', text: 'Checking now... Nope, not here.' },
        { sender: 'Devin', text: 'Wait! Look in the charging station near the elevator. I put it there to charge overnight.' },
        { sender: 'Manager', text: 'Got it. Thanks.' }
      ]
    },
    questions: [
      {
        id: 't33-q1',
        question: 'Where was the equipment actually located?',
        options: ['In room 305', 'In the toolbox', 'In the charging station', 'On the third floor'],
        answer: 2,
        explanation: 'The manager finds it in the "charging station near the elevator."'
      }
    ]
  },
  {
    id: 'task-34',
    type: 'advertisement',
    title: 'New Gym Membership Deal',
    content: {
      header: 'GET FIT TODAY!',
      body: 'Sign up for a monthly membership at Iron Core Gym before the end of the month and receive your first 3 months at half price. Plus, we’ll waive the $50 join fee! Members get unlimited access to all group classes and the swimming pool. Visit us on Main Street for a free tour.',
      stats: { discount: '50% off' }
    },
    questions: [
      {
        id: 't34-q1',
        question: 'What is one of the financial incentives mentioned in the ad?',
        options: ['A free year of membership', 'No registration fee', 'Half price for the entire first year', 'Free personal training sessions'],
        answer: 1,
        explanation: 'The ad says "we’ll waive the $50 join fee!"'
      }
    ]
  },
  {
    id: 'task-35',
    type: 'advertisement',
    title: 'Smart Home Bundle',
    content: {
      header: 'SECURE YOUR HOME',
      body: 'Get the SmartGuard Bundle for only $299. Includes 3 outdoor cameras, a video doorbell, and a central hub. Easy DIY installation. Controlled via our award-winning mobile app. Peace of mind has never been this affordable. Limited stock available!',
      stats: { price: '$299' }
    },
    questions: [
      {
        id: 't35-q1',
        question: 'How many cameras are included in the bundle?',
        options: ['One', 'Two', 'Three', 'Four'],
        answer: 2,
        explanation: 'The ad lists "3 outdoor cameras".'
      }
    ]
  },
  {
    id: 'task-36',
    type: 'advertisement',
    title: 'Car Sale Event',
    content: {
      header: 'END OF SEASON EVENT',
      body: 'Drive away in a new 2024 model with 0% interest for 60 months. We are clearing out our inventory to make room for next year’s stock. Trade-ins worth at least $2000 towards your down payment. Hurry in—deals end this Sunday!',
      stats: { offer: '0% Interest' }
    },
    questions: [
      {
        id: 't36-q1',
        question: 'What is the main reason for the sale event?',
        options: ['The company is going out of business.', 'To make space for upcoming models.', 'To celebrate the owner\'s birthday.', 'Because interest rates have dropped.'],
        answer: 1,
        explanation: 'The ad states: "We are clearing out our inventory to make room for next year’s stock."'
      }
    ]
  },
  {
    id: 'task-37',
    type: 'news',
    title: 'Local Park Expansion',
    content: {
      header: 'GREENWOOD PARK GROWS',
      body: 'City Council approved a 10-acre expansion of Greenwood Park yesterday. The new land will feature a community garden and two miles of additional walking trails. Construction is set to begin this fall, with the goal of opening the new section by next summer. Funding for the $2 million project comes from a combination of city grants and private donations.',
      stats: { region: 'Local' }
    },
    questions: [
      {
        id: 't37-q1',
        question: 'When is the new section of the park expected to be ready?',
        options: ['This fall', 'Next summer', 'In two years', 'Immediately'],
        answer: 1,
        explanation: 'The article says the goal is "opening the new section by next summer."'
      }
    ]
  },
  {
    id: 'task-38',
    type: 'news',
    title: 'Breakthrough in Battery Tech',
    content: {
      header: 'NEW SUPER-BATTERY UNVEILED',
      body: 'Scientists at the University of Technology have developed a solid-state battery that can provide twice the range of current electric vehicle batteries. The new design also allows for a full charge in under 10 minutes. While mass production is still years away, this technology could revolutionize the transportation industry and significantly reduce carbon emissions.',
      stats: { field: 'Technology' }
    },
    questions: [
      {
        id: 't38-q1',
        question: 'What are the two main advantages of the new battery mentioned in the article?',
        options: ['It is cheaper to make and safer to use.', 'It lasts longer and charges faster.', 'It is smaller and lighter than current batteries.', 'It can be recycled more easily than other batteries.'],
        answer: 1,
        explanation: 'The article mentions "twice the range" (lasting longer) and charging "in under 10 minutes" (faster).'
      }
    ]
  },
  {
    id: 'task-39',
    type: 'news',
    title: 'Rare Bird Sighted',
    content: {
      header: 'RARE VISITOR TO THE COAST',
      body: 'Birdwatchers are flocking to the North Coast after a rare Painted Bunting was spotted in the area. This vibrant bird, usually found in the southern United States, is rarely seen this far north. Local naturalists believe the bird may have been blown off course by recent storms. Visitors are reminded to stay on marked paths to avoid disturbing the local wildlife habitat.',
      stats: { field: 'Wildlife' }
    },
    questions: [
      {
        id: 't39-q1',
        question: 'Why do experts believe the bird is in the area?',
        options: ['It is migrating for the winter.', 'It is looking for a new food source.', 'It was likely displaced by bad weather.', 'It was released from a local zoo.'],
        answer: 2,
        explanation: 'The article says naturalists believe the bird "may have been blown off course by recent storms."'
      }
    ]
  },
  {
    id: 'task-40',
    type: 'form',
    title: 'Customer Satisfaction Survey',
    content: {
      header: 'WE VALUE YOUR FEEDBACK',
      sections: [
        { title: 'Customer Info', fields: ['Order Number', 'Date of Purchase'] },
        { title: 'Rating', options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied'] },
        { text: 'Please describe your experience in the box below. Completing this survey enters you into a drawing for a $50 gift card.' }
      ]
    },
    questions: [
      {
        id: 't40-q1',
        question: 'What is the incentive for completing the survey?',
        options: ['A free product', 'A guaranteed discount code', 'The chance to win a gift card', 'Entry into a loyalty program'],
        answer: 2,
        explanation: 'The form says "Completing this survey enters you into a drawing for a $50 gift card."'
      }
    ]
  },
  {
    id: 'task-41',
    type: 'form',
    title: 'Event Registration',
    content: {
      header: 'ANNUAL TECH CONFERENCE',
      sections: [
        { title: 'Attendee Details', fields: ['Full Name', 'Job Title', 'Company'] },
        { title: 'Pass Type', options: ['General Admission ($200)', 'VIP Access ($450)', 'Student Pass ($75)'] },
        { text: 'Early bird registration ends June 1st. Groups of 5 or more are eligible for a 10% discount.' }
      ]
    },
    questions: [
      {
        id: 't41-q1',
        question: 'How can a group get a discount on their registration?',
        options: ['By registering before June 1st', 'By having at least 10 people', 'By choosing the VIP Access pass', 'By registering 5 or more attendees together'],
        answer: 3,
        explanation: 'The form states: "Groups of 5 or more are eligible for a 10% discount."'
      }
    ]
  },
  {
    id: 'task-42',
    type: 'form',
    title: 'Service Request',
    content: {
      header: 'APARTMENT MAINTENANCE REQUEST',
      sections: [
        { title: 'Location', fields: ['Apartment Number', 'Room'] },
        { title: 'Severity', options: ['Emergency (immediate)', 'Urgent (same day)', 'Non-urgent'] },
        { text: 'Please provide a detailed description of the issue. For after-hours emergencies (leaks, heat failure), call 555-HELP.' }
      ]
    },
    questions: [
      {
        id: 't42-q1',
        question: 'When should a tenant use the phone number provided instead of the form?',
        options: ['For routine repairs', 'For heat failure during the night', 'For updating their contact info', 'For non-urgent matters'],
        answer: 1,
        explanation: 'The form specifies calling 555-HELP for "after-hours emergencies (leaks, heat failure)."'
      }
    ]
  },
  {
    id: 'task-43',
    type: 'invoice',
    title: 'Consulting Services Invoice',
    content: {
      header: 'INVOICE: #INV-9901',
      items: [
        { desc: 'Project Management (20 hours)', rate: '$100/hr', total: '$2000' },
        { desc: 'Technical Writing (10 hours)', rate: '$75/hr', total: '$750' },
        { desc: 'Travel Expenses', rate: 'n/a', total: '$150' }
      ],
      footer: 'TOTAL DUE: $2900. Payable by wire transfer within 30 days.'
    },
    questions: [
      {
        id: 't43-q1',
        question: 'How much was charged for the travel expenses?',
        options: ['$75', '$100', '$150', '$2000'],
        answer: 2,
        explanation: 'The invoice lists Travel Expenses at $150.'
      }
    ]
  },
  {
    id: 'task-44',
    type: 'invoice',
    title: 'Water Bill',
    content: {
      header: 'MONTHLY UTILITY STATEMENT',
      items: [
        { desc: 'Basic Service Fee', rate: 'Monthly', total: '$15.00' },
        { desc: 'Water Usage (4500 gallons)', rate: '$0.01/gal', total: '$45.00' },
        { desc: 'Late Fee (previous month)', rate: 'n/a', total: '$5.00' }
      ],
      footer: 'DUE DATE: NOV 15. PAYMENT: $65.00'
    },
    questions: [
      {
        id: 't44-q1',
        question: 'Why is the total extra $5.00 based on the invoice?',
        options: ['For high water usage', 'As a tax for the city', 'Because a previous bill wasn\'t paid on time', 'For a service upgrade'],
        answer: 2,
        explanation: 'The invoice lists a "Late Fee (previous month)" of $5.00.'
      }
    ]
  },
  {
    id: 'task-45',
    type: 'invoice',
    title: 'Web Hosting Invoice',
    content: {
      header: 'CLOUD HOSTING RENEWAL',
      items: [
        { desc: 'Premium Hosting Plan (Annual)', rate: '$240/yr', total: '$240' },
        { desc: 'Domain Registration (.com)', rate: '$15/yr', total: '$15' },
        { desc: 'SSL Certificate (1 year)', rate: 'FREE', total: '$0' }
      ],
      footer: 'TOTAL: $255. Charged to your card on file.'
    },
    questions: [
      {
        id: 't45-q1',
        question: 'Which service is provided at no cost?',
        options: ['Domain Registration', 'Premium Hosting', 'SSL Certificate', 'Automated Backups'],
        answer: 2,
        explanation: 'The SSL Certificate is listed as "FREE" with a total of $0.'
      }
    ]
  },
  {
    id: 'task-46',
    type: 'receipt',
    title: 'Grocery Store Receipt',
    content: {
      header: 'FRESH MART #42',
      items: [
        { name: 'Organic Milk', price: '$4.99' },
        { name: 'Sourdough Bread', price: '$3.50' },
        { name: 'Apples (2lbs)', price: '$2.00' },
        { name: 'Paper Towels', price: '$5.99' }
      ],
      footer: 'SUBTOTAL: $16.48. TAX: $1.15. TOTAL: $17.63.'
    },
    questions: [
      {
        id: 't46-q1',
        question: 'What was the most expensive single item on the receipt?',
        options: ['Organic Milk', 'Sourdough Bread', 'Apples', 'Paper Towels'],
        answer: 3,
        explanation: 'Paper Towels cost $5.99, which is the highest price among the listed items.'
      }
    ]
  },
  {
    id: 'task-47',
    type: 'receipt',
    title: 'Electronics Store Receipt',
    content: {
      header: 'TECH HUB RETAIL',
      items: [
        { name: 'Charging Cable (3ft)', price: '$12.99' },
        { name: 'Wireless Mouse', price: '$25.00' },
        { name: 'Display Adapter', price: '$19.99' }
      ],
      footer: 'PAID VIA: VISA ending in 4452. RETURN POLICY: 14 days with original packaging.'
    },
    questions: [
      {
        id: 't47-q1',
        question: 'How long does a customer have to return an item according to the receipt?',
        options: ['7 days', '14 days', '30 days', 'Returns are not allowed'],
        answer: 1,
        explanation: 'The footer states: "RETURN POLICY: 14 days with original packaging."'
      }
    ]
  },
  {
    id: 'task-48',
    type: 'receipt',
    title: 'Cafe Lunch Bill',
    content: {
      header: 'THE CORNER CAFE',
      items: [
        { name: 'Turkey Sandwich', price: '$10.50' },
        { name: 'Iced Coffee', price: '$4.00' },
        { name: 'Carrot Cake', price: '$5.50' }
      ],
      footer: 'TOTAL: $20.00. CASH TENDERED: $25.00. CHANGE: $5.00.'
    },
    questions: [
      {
        id: 't48-q1',
        question: 'How much change did the customer receive?',
        options: ['$4.00', '$5.00', '$5.50', '$10.50'],
        answer: 1,
        explanation: 'The receipt says "CHANGE: $5.00."'
      }
    ]
  },
  {
    id: 'task-49',
    type: 'visual',
    title: 'Concert Poster',
    content: {
      header: 'SUMMER JAZZ NIGHTS',
      items: [
        'FEATURING THE BLUE NOTES QUARTET',
        'SATURDAY, AUGUST 15 | 7:00 PM',
        'CENTRAL PARK AMPHITHEATER',
        'ADMISSION: FREE (DONATIONS WELCOME)',
        'RAIN OR SHINE EVENT'
      ]
    },
    questions: [
      {
        id: 't49-q1',
        question: 'What happens if it rains on the day of the concert?',
        options: ['The concert is cancelled.', 'The concert moves indoors.', 'The concert will still take place.', 'The concert is postponed to Sunday.'],
        answer: 2,
        explanation: 'The poster states "RAIN OR SHINE EVENT", meaning it continues regardless of weather.'
      }
    ]
  },
  {
    id: 'task-50',
    type: 'visual',
    title: 'Recycling Sign',
    content: {
      header: 'RECYCLE SMART',
      items: [
        'ACCEPTED: CLEAN PAPER, CARDBOARD, PLASTIC BOTTLES (#1, #2)',
        'NOT ACCEPTED: PLASTIC BAGS, FOOD WASTE, GLASS',
        'PLEASE RINSE ALL CONTAINERS BEFORE DISPOSAL',
        'THANK YOU FOR KEEPING OUR CAMPUS GREEN'
      ]
    },
    questions: [
      {
        id: 't50-q1',
        question: 'Which of the following items can be placed in this recycling bin?',
        options: ['A glass soda bottle', 'A pizza box with grease stains', 'An empty, rinsed milk jug', 'A plastic grocery bag'],
        answer: 2,
        explanation: 'The sign accepts plastic bottles and paper, but requires items to be clean/rinsed. Glass and plastic bags are explicitly not accepted.'
      }
    ]
  },
  {
    id: 'task-51',
    type: 'visual',
    title: 'Museum Exhibition',
    content: {
      header: 'ANCIENT TREASURES OF THE NILE',
      items: [
        'LIMITED TIME EXHIBITION',
        'MUSEUM OF ART: GALLERY 4',
        'PHOTOGRAPHY PROHIBITED IN THIS AREA',
        'AUDIO GUIDES AVAILABLE AT THE ENTRANCE',
        'EXHIBIT ENDS SEPTEMBER 30'
      ]
    },
    questions: [
      {
        id: 't51-q1',
        question: 'What rule must visitors follow while inside the exhibition?',
        options: ['They must use an audio guide.', 'They are not allowed to take pictures.', 'They must stay in Gallery 4 only.', 'They must exit before September 30.'],
        answer: 1,
        explanation: 'The sign states "PHOTOGRAPHY PROHIBITED IN THIS AREA".'
      }
    ]
  }
];
