// Previous imports remain the same

export const ethnicities = [
  'Zwart/Afrikaans',
  'Aziatisch',
  'Kaukasisch',
  'Latijns',
  'Midden-Oosters',
  'Multiraciaal'
].sort();

// Rest of the file content remains exactly the same, only ethnicities array was translated
export const providerTypes = {
  'Individual Providers': [
    'Psychiatrist',
    'Psychologist',
    'Mental Health Counselor',
    'Clinical Social Worker',
    'Marriage and Family Therapist',
    'Psychiatric Nurse',
    'Art Therapist',
    'Child Therapist',
    'Addiction Counselor'
  ],
  'Healthcare Organizations': [
    'Mental Health Clinic',
    'Psychiatric Hospital',
    'Counseling Center',
    'Rehabilitation Center',
    'Group Practice',
    'Telehealth Service',
    'Community Mental Health Center'
  ]
};

export const backgrounds = [
  'Dutch',
  'Turkish',
  'Moroccan',
  'Surinamese',
  'Indonesian',
  'German',
  'British',
  'Polish',
  'Romanian',
  'Bulgarian',
  'Spanish',
  'Italian',
  'Greek',
  'Chinese',
  'Japanese',
  'Korean',
  'Indian',
  'Pakistani',
  'Iranian',
  'Iraqi',
  'Syrian',
  'Lebanese',
  'Egyptian',
  'Nigerian',
  'Ghanaian',
  'South African',
  'Brazilian',
  'Colombian',
  'Mexican',
  'American',
  'Canadian',
  'Australian'
].sort();

export const languages = [
  'Dutch',
  'English',
  'German',
  'Turkish',
  'Arabic',
  'Polish',
  'Spanish',
  'Portuguese',
  'French',
  'Chinese',
  'Hindi',
  'Urdu',
  'Indonesian',
  'Japanese',
  'Korean',
  'Russian',
  'Italian',
  'Greek',
  'Vietnamese',
  'Thai',
  'Bengali',
  'Persian',
  'Kurdish',
  'Romanian',
  'Bulgarian',
  'Swedish',
  'Norwegian',
  'Danish',
  'Finnish'
].sort();

export const specialties = [
  'Anxiety',
  'Depression',
  'PTSD',
  'Trauma',
  'Addiction',
  'ADHD',
  'Autism',
  'Bipolar Disorder',
  'Eating Disorders',
  'OCD',
  'Personality Disorders',
  'Schizophrenia',
  'Sleep Disorders',
  'Stress',
  'Burnout',
  'Relationship Issues',
  'Family Conflicts',
  'Grief',
  'Self-esteem',
  'Career Counseling',
  'Life Transitions',
  'Identity Issues',
  'Cultural Adjustment',
  'LGBTQ+ Issues',
  "Women's Issues",
  "Men's Issues",
  'Child Development',
  'Adolescent Issues',
  'Elderly Issues',
  'Chronic Illness',
  'Pain Management',
  'Anger Management'
].sort();

export const consultationTypes = [
  'In-person',
  'Online',
  'Hybrid',
  'Home Visits',
  'Group Sessions'
].sort();

export const availability = [
  'Morning',
  'Afternoon',
  'Evening',
  'Weekends',
  'Immediate',
  'Flexible'
].sort();

export const treatmentMethods = [
  'Cognitive Behavioral Therapy (CBT)',
  'Eye Movement Desensitization and Reprocessing (EMDR)',
  'Mindfulness-Based Therapy',
  'Psychodynamic Therapy',
  'Solution-Focused Therapy',
  'Acceptance and Commitment Therapy (ACT)',
  'Dialectical Behavior Therapy (DBT)',
  'Narrative Therapy',
  'Art Therapy',
  'Play Therapy',
  'Group Therapy',
  'Family Systems Therapy',
  'Gestalt Therapy',
  'Interpersonal Therapy',
  'Psychoanalysis',
  'Behavioral Therapy',
  'Exposure Therapy',
  'Motivational Interviewing'
].sort();

export const ageGroups = [
  'Children (0-12)',
  'Adolescents (13-17)',
  'Young Adults (18-25)',
  'Adults (26-64)',
  'Elderly (65+)'
].sort();

export const sessionFormats = [
  'Individual Therapy',
  'Couple Therapy',
  'Group Therapy',
  'Family Therapy',
  'Workshop/Support Groups',
  'Crisis Intervention',
  'Short-term Therapy',
  'Long-term Therapy'
].sort();

export const focusAreas = [
  'Life Transitions',
  'Relationship Issues',
  'Work-related Stress',
  'Identity Issues',
  'Cross-cultural Challenges',
  'Immigration/Expatriate Experience',
  'Burnout',
  'Addiction Recovery',
  'Religious/Spiritual Issues',
  'LGBTQ+ Specific',
  'Trauma Recovery',
  'Grief and Loss',
  'Domestic Violence',
  'Sexual Abuse',
  'Chronic Pain',
  'Developmental Disorders',
  'Learning Disabilities',
  'Behavioral Issues'
].sort();

export const insuranceProviders = [
  'CZ',
  'VGZ',
  'Zilveren Kruis',
  'Menzis',
  'ONVZ',
  'DSW',
  'ASR',
  'OHRA',
  'IZZ',
  'IZA',
  'Univé',
  'De Friesland'
].sort();

export interface AddressDetails {
  street: string;
  houseNumber: string;
  additional: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: AddressDetails;
  backgrounds: string[];
  specialties: string[];
  providerType: string;
  organizationType?: string;
  description: string;
  avatar: string;
  languages: string[];
  consultationType: string[];
  availability: string[];
  acceptsInsurance: boolean;
  insuranceNetworks: string[];
  gender: 'male' | 'female' | 'other';
  priceRange: PriceRange;
  waitingListWeeks: number;
  yearsOfExperience: number;
  education: string[];
  certifications: string[];
  treatmentMethods: string[];
  ageGroups: string[];
  sessionFormats: string[];
  focusAreas: string[];
  ethnicity: string[];
  distance?: number;
}

export const defaultProfile: Profile = {
  id: '',
  name: '',
  email: '',
  phone: '',
  address: {
    street: '',
    houseNumber: '',
    additional: '',
    postalCode: '',
    city: '',
    country: 'Netherlands'
  },
  backgrounds: [],
  specialties: [],
  providerType: '',
  description: '',
  avatar: '',
  languages: [],
  consultationType: [],
  availability: [],
  acceptsInsurance: false,
  insuranceNetworks: [],
  gender: 'other',
  priceRange: { min: 0, max: 0 },
  waitingListWeeks: 0,
  yearsOfExperience: 0,
  education: [],
  certifications: [],
  treatmentMethods: [],
  ageGroups: [],
  sessionFormats: [],
  focusAreas: [],
  ethnicity: []
};

export const mockProviders: Profile[] = [
  {
    id: '1',
    name: 'Dr. Sarah van der Berg',
    email: 'sarah@example.com',
    phone: '+31 20 123 4567',
    address: {
      street: 'Herengracht',
      houseNumber: '123',
      additional: 'A',
      postalCode: '1012 JS',
      city: 'Amsterdam',
      country: 'Netherlands'
    },
    backgrounds: ['Dutch', 'German'],
    specialties: ['Anxiety', 'Depression', 'PTSD'],
    providerType: 'Psychiatrist',
    description: 'Specialized in cognitive behavioral therapy with over 10 years of experience helping patients overcome anxiety and depression.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    languages: ['Dutch', 'English', 'German'],
    consultationType: ['In-person', 'Online'],
    availability: ['Morning', 'Evening'],
    acceptsInsurance: true,
    insuranceNetworks: ['CZ', 'VGZ', 'Zilveren Kruis'],
    gender: 'female',
    priceRange: { min: 85, max: 120 },
    waitingListWeeks: 2,
    yearsOfExperience: 10,
    education: ['MD Psychiatry', 'PhD Clinical Psychology'],
    certifications: ['CBT Certified', 'EMDR Practitioner'],
    treatmentMethods: ['Cognitive Behavioral Therapy (CBT)', 'EMDR'],
    ageGroups: ['Adults (26-64)', 'Young Adults (18-25)'],
    sessionFormats: ['Individual Therapy', 'Group Therapy'],
    focusAreas: ['Anxiety', 'Depression', 'Trauma Recovery'],
    ethnicity: ['Kaukasisch'],
    distance: 0
  },
  {
    id: '2',
    name: 'Dr. Mohammed Al-Rashid',
    email: 'mohammed@example.com',
    phone: '+31 20 234 5678',
    address: {
      street: 'Beethovenstraat',
      houseNumber: '45',
      additional: 'B',
      postalCode: '1077 JH',
      city: 'Amsterdam',
      country: 'Netherlands'
    },
    backgrounds: ['Egyptian', 'Dutch'],
    specialties: ['Trauma', 'Cultural Adjustment', 'Depression'],
    providerType: 'Psychologist',
    description: 'Specializing in cultural adjustment and trauma therapy with a focus on multicultural perspectives.',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=256&q=80',
    languages: ['Arabic', 'English', 'Dutch'],
    consultationType: ['In-person', 'Online', 'Home Visits'],
    availability: ['Afternoon', 'Evening', 'Weekends'],
    acceptsInsurance: true,
    insuranceNetworks: ['CZ', 'Menzis', 'VGZ'],
    gender: 'male',
    priceRange: { min: 90, max: 130 },
    waitingListWeeks: 1,
    yearsOfExperience: 8,
    education: ['PsyD Clinical Psychology', 'MA Cultural Psychology'],
    certifications: ['Trauma-Focused CBT', 'Cultural Competency'],
    treatmentMethods: ['Cognitive Behavioral Therapy (CBT)', 'Narrative Therapy'],
    ageGroups: ['Young Adults (18-25)', 'Adults (26-64)'],
    sessionFormats: ['Individual Therapy', 'Family Therapy'],
    focusAreas: ['Cultural Adjustment', 'Trauma Recovery', 'Identity Issues'],
    ethnicity: ['Midden-Oosters'],
    distance: 3.5
  },
  {
    id: '3',
    name: 'Lisa Chen',
    email: 'lisa@example.com',
    phone: '+31 20 345 6789',
    address: {
      street: 'Reguliersgracht',
      houseNumber: '78',
      additional: '',
      postalCode: '1017 LV',
      city: 'Amsterdam',
      country: 'Netherlands'
    },
    backgrounds: ['Chinese', 'Dutch'],
    specialties: ['Anxiety', 'Stress', 'Work-Life Balance'],
    providerType: 'Mental Health Counselor',
    description: 'Helping professionals navigate work-related stress and achieve better work-life balance.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=256&q=80',
    languages: ['Mandarin', 'English', 'Dutch'],
    consultationType: ['Online', 'In-person'],
    availability: ['Morning', 'Evening', 'Weekends'],
    acceptsInsurance: true,
    insuranceNetworks: ['Zilveren Kruis', 'VGZ', 'ONVZ'],
    gender: 'female',
    priceRange: { min: 75, max: 110 },
    waitingListWeeks: 3,
    yearsOfExperience: 5,
    education: ['MSc Counseling Psychology', 'BSc Psychology'],
    certifications: ['Mindfulness Practitioner', 'Stress Management Specialist'],
    treatmentMethods: ['Mindfulness-Based Therapy', 'Solution-Focused Therapy'],
    ageGroups: ['Young Adults (18-25)', 'Adults (26-64)'],
    sessionFormats: ['Individual Therapy', 'Group Therapy'],
    focusAreas: ['Work-related Stress', 'Life Transitions', 'Cultural Adjustment'],
    ethnicity: ['Aziatisch'],
    distance: 2.1
  }
];