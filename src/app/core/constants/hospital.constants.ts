export const HOSPITAL = {
  name: 'Oluchukwu Specialist Hospital and Endoscopy',
  shortName: 'Oluchukwu Specialist Hospital',
  tagline: 'Specialist Surgical and Endoscopic Care in Nnewi',
  description: 'A leading specialist hospital in Nnewi providing comprehensive surgical and endoscopic services with experienced medical professionals and modern facilities.',
  address: 'Raphael Obimdike Street, Inyagba Ngo Umudim Nnewi, Along Traffic Light - Ozubulu Rd Axis, Anambra State',
  city: 'Nnewi, Anambra State',
  emergency: '+2348106666850',
  phone: '+2348106666850',
  email: 'info@oluchukwuhospital.com',
  mission: 'To provide accessible, high-quality specialist surgical and endoscopic care to every patient with compassion, precision, and integrity.',
  vision: 'To be the foremost specialist surgical and endoscopy centre in South-East Nigeria, setting the standard for clinical excellence and patient-centred care.',
  mapUrl: 'https://maps.google.com/?q=Nnewi+Anambra+State+Nigeria',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966!2d6.9!3d6.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNnewi!5e0!3m2!1sen!2sng!4v1'
};

export const SERVICES = [
  {
    id: '1',
    slug: 'upper-gi-endoscopy',
    name: 'Upper GI Endoscopy',
    category: 'endoscopy',
    iconName: 'microscope',
    shortDescription: 'Diagnostic and therapeutic examination of the upper gastrointestinal tract.',
    description: 'Upper GI Endoscopy (Gastroscopy) is a procedure that allows our specialists to examine the lining of the upper digestive system — the oesophagus, stomach, and duodenum — using a thin, flexible tube with a camera.',
    indications: [
      'Persistent heartburn or acid reflux',
      'Difficulty swallowing',
      'Unexplained abdominal pain',
      'Nausea or vomiting',
      'Gastrointestinal bleeding',
      'Screening for ulcers or cancer'
    ],
    preparation: [
      'Fast for at least 6 hours before the procedure',
      'Inform your doctor of all medications you are taking',
      'Arrange for someone to drive you home',
      'Remove dentures or glasses before the procedure'
    ],
    aftercare: [
      'You may experience mild bloating or a sore throat — this is normal',
      'Rest for the remainder of the day',
      'Avoid driving or operating machinery for 24 hours if sedation was used',
      'Resume normal diet unless advised otherwise'
    ],
    isFeatured: true
  },
  {
    id: '2',
    slug: 'colonoscopy',
    name: 'Colonoscopy',
    category: 'endoscopy',
    iconName: 'activity',
    shortDescription: 'Thorough examination of the large intestine for diagnosis and treatment.',
    description: 'Colonoscopy is a procedure used to examine the inner lining of the large intestine (colon and rectum). It is used to detect abnormalities such as polyps, inflammation, ulcers, and cancer.',
    indications: [
      'Rectal bleeding or blood in stool',
      'Changes in bowel habits',
      'Unexplained weight loss',
      'Abdominal pain or cramping',
      'Colorectal cancer screening',
      'Follow-up after polyp removal'
    ],
    preparation: [
      'Follow a clear liquid diet the day before',
      'Take the prescribed bowel preparation medication',
      'Fast from midnight before the procedure',
      'Arrange for someone to accompany you'
    ],
    aftercare: [
      'Mild bloating and gas are expected and will pass',
      'Rest for the rest of the day',
      'Avoid driving for 24 hours if sedation was used',
      'Contact us immediately if you experience severe pain or heavy bleeding'
    ],
    isFeatured: true
  },
  {
    id: '3',
    slug: 'laparoscopic-cholecystectomy',
    name: 'Laparoscopic Cholecystectomy',
    category: 'laparoscopic',
    iconName: 'scissors',
    shortDescription: 'Minimally invasive surgical removal of the gallbladder.',
    description: 'Laparoscopic Cholecystectomy is the minimally invasive surgical removal of the gallbladder. It is performed through small incisions using a camera and specialised instruments, resulting in faster recovery and less pain than open surgery.',
    indications: [
      'Gallstones causing pain or complications',
      'Acute or chronic cholecystitis',
      'Gallbladder polyps',
      'Biliary dyskinesia'
    ],
    preparation: [
      'Fast for at least 8 hours before surgery',
      'Stop blood-thinning medications as advised',
      'Arrange for post-operative care at home',
      'Complete all pre-operative tests as requested'
    ],
    aftercare: [
      'Most patients go home the same day or the next day',
      'Avoid heavy lifting for 2–4 weeks',
      'Resume light activities within a few days',
      'Follow-up appointment within 1–2 weeks'
    ],
    isFeatured: true
  },
  {
    id: '4',
    slug: 'laparoscopic-appendectomy',
    name: 'Laparoscopic Appendectomy',
    category: 'laparoscopic',
    iconName: 'scissors',
    shortDescription: 'Minimally invasive surgical removal of the appendix.',
    description: 'Laparoscopic Appendectomy is the minimally invasive removal of the appendix, typically performed as an emergency procedure for appendicitis. Small incisions and a camera allow for precise surgery with faster recovery.',
    indications: [
      'Acute appendicitis',
      'Chronic appendicitis',
      'Appendiceal tumours (selected cases)'
    ],
    preparation: [
      'This is often an emergency procedure — preparation is done quickly',
      'Fast as directed by your surgeon',
      'Blood tests and imaging will be performed before surgery'
    ],
    aftercare: [
      'Hospital stay is typically 1–2 days',
      'Avoid strenuous activity for 2–3 weeks',
      'Keep incision sites clean and dry',
      'Return immediately if fever, severe pain, or wound discharge occurs'
    ],
    isFeatured: true
  },
  {
    id: '5',
    slug: 'surgical-services',
    name: 'Comprehensive Surgical Services',
    category: 'surgery',
    iconName: 'hospital',
    shortDescription: 'Multidisciplinary specialist surgical care across a range of conditions.',
    description: 'Our surgical team provides comprehensive and multidisciplinary surgical services covering a wide range of conditions. We combine specialist expertise with modern surgical techniques to deliver safe, effective outcomes for every patient.',
    indications: [
      'Hernia repair',
      'Thyroid and parathyroid surgery',
      'Breast surgery',
      'Colorectal surgery',
      'Other specialist surgical conditions'
    ],
    preparation: [
      'Pre-operative assessment will be arranged',
      'Follow fasting and medication instructions provided',
      'Arrange post-operative support at home'
    ],
    aftercare: [
      'Recovery varies by procedure — your surgeon will advise',
      'Attend all follow-up appointments',
      'Report any unusual symptoms promptly'
    ],
    isFeatured: false
  }
];

export const SERVICE_CATEGORIES = [
  { key: 'endoscopy', label: 'Endoscopy Services' },
  { key: 'laparoscopic', label: 'Laparoscopic Surgery' },
  { key: 'surgery', label: 'General & Specialist Surgery' }
];

export const WHY_CHOOSE_US = [
  {
    iconName: 'microscope',
    title: 'Specialist Endoscopy Care',
    description: 'Dedicated endoscopy suite with experienced gastroenterologists performing upper GI and lower GI procedures.'
  },
  {
    iconName: 'scissors',
    title: 'Laparoscopic Expertise',
    description: 'Minimally invasive surgical techniques that mean less pain, smaller scars, and faster recovery for our patients.'
  },
  {
    iconName: 'heart',
    title: 'Patient-Centred Service',
    description: 'Every patient receives personalised attention. We take time to explain procedures and answer your questions.'
  },
  {
    iconName: 'map-pin',
    title: 'Accessible in Nnewi',
    description: 'Conveniently located along the Traffic Light - Ozubulu Road axis, serving Nnewi and surrounding communities.'
  }
];
