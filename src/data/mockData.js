// Mock data for the government agricultural management system

export const regions = [
  { id: 1, name: 'Northern Region', code: 'NR' },
  { id: 2, name: 'Southern Region', code: 'SR' },
  { id: 3, name: 'Eastern Region', code: 'ER' },
  { id: 4, name: 'Western Region', code: 'WR' },
  { id: 5, name: 'Central Region', code: 'CR' }
];

export const districts = [
  { id: 1, name: 'Jaipur District', regionId: 1, population: 6626178 },
  { id: 2, name: 'Jodhpur District', regionId: 1, population: 3687165 },
  { id: 3, name: 'Udaipur District', regionId: 2, population: 3068420 },
  { id: 4, name: 'Kota District', regionId: 2, population: 1951014 },
  { id: 5, name: 'Bikaner District', regionId: 3, population: 2363937 }
];

export const dashboardMetrics = {
  totalFarms: 12458,
  activeBiosecurityPlans: 10245,
  diseaseIncidents: 87,
  averageRiskScore: 28.5,
  complianceRate: 85,
  vaccinationCoverage: 78,
  highRiskFarms: 22,
  fieldStaff: 156
};

export const regionalAnalytics = {
  diseaseOutbreaks: 12,
  complianceRates: 85,
  vaccinationCoverage: 78,
  riskLevels: {
    low: 65,
    medium: 25,
    high: 10
  }
};

export const staffData = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    role: 'Veterinarian',
    district: 'Jaipur District',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@gov.in',
    experience: '8 years',
    specialization: 'Livestock Disease Control'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Field Officer',
    district: 'Jodhpur District',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    phone: '+91 98765 43211',
    email: 'priya.sharma@gov.in',
    experience: '5 years',
    specialization: 'Farm Inspection'
  },
  {
    id: 3,
    name: 'Amit Singh',
    role: 'Extension Worker',
    district: 'Udaipur District',
    status: 'on-leave',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    phone: '+91 98765 43212',
    email: 'amit.singh@gov.in',
    experience: '3 years',
    specialization: 'Farmer Education'
  },
  {
    id: 4,
    name: 'Dr. Sunita Patel',
    role: 'Lab Technician',
    district: 'Kota District',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    phone: '+91 98765 43213',
    email: 'sunita.patel@gov.in',
    experience: '6 years',
    specialization: 'Disease Testing'
  }
];

export const policies = [
  {
    id: 1,
    title: 'Disease Control Protocols',
    status: 'active',
    type: 'protocol',
    lastUpdated: '2024-01-15',
    description: 'Comprehensive guidelines for livestock disease prevention and control measures.'
  },
  {
    id: 2,
    title: 'Vaccination Guidelines',
    status: 'outdated',
    type: 'guideline',
    lastUpdated: '2023-11-20',
    description: 'Standard vaccination schedules and procedures for different livestock categories.'
  },
  {
    id: 3,
    title: 'Biosecurity Standards',
    status: 'outdated',
    type: 'standard',
    lastUpdated: '2023-10-05',
    description: 'Minimum biosecurity requirements for agricultural facilities and farms.'
  },
  {
    id: 4,
    title: 'Emergency Response Plans',
    status: 'outdated',
    type: 'plan',
    lastUpdated: '2023-12-10',
    description: 'Protocols for responding to disease outbreaks and agricultural emergencies.'
  }
];

export const communications = [
  {
    id: 1,
    type: 'message',
    title: 'Update on National Vaccination Drive',
    content: 'New vaccination protocols have been implemented across all regions.',
    timestamp: '2024-01-20T10:30:00Z',
    priority: 'high'
  },
  {
    id: 2,
    type: 'announcement',
    title: 'New Biosecurity Audit Framework',
    content: 'Enhanced audit procedures will be rolled out starting next month.',
    timestamp: '2024-01-19T14:15:00Z',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'alert',
    title: 'Regional Emergency Response Training Schedule',
    content: 'Mandatory training sessions scheduled for all field staff.',
    timestamp: '2024-01-18T09:00:00Z',
    priority: 'high'
  }
];

export const chartData = {
  diseaseIncidents: [
    { month: 'Jan', incidents: 45, resolved: 42 },
    { month: 'Feb', incidents: 52, resolved: 48 },
    { month: 'Mar', incidents: 38, resolved: 36 },
    { month: 'Apr', incidents: 61, resolved: 58 },
    { month: 'May', incidents: 49, resolved: 47 },
    { month: 'Jun', incidents: 43, resolved: 41 }
  ],
  complianceRates: [
    { region: 'Northern', rate: 88 },
    { region: 'Southern', rate: 92 },
    { region: 'Eastern', rate: 79 },
    { region: 'Western', rate: 85 },
    { region: 'Central', rate: 90 }
  ],
  vaccinationCoverage: [
    { district: 'Jaipur', coverage: 85 },
    { district: 'Jodhpur', coverage: 78 },
    { district: 'Udaipur', coverage: 82 },
    { district: 'Kota', coverage: 76 },
    { district: 'Bikaner', coverage: 80 }
  ]
};

export const recentActivities = [
  {
    id: 1,
    type: 'inspection',
    description: 'Farm inspection completed at Rajesh Dairy Farm',
    location: 'Jaipur District',
    timestamp: '2024-01-20T11:30:00Z',
    status: 'completed',
    officer: 'Dr. Rajesh Kumar'
  },
  {
    id: 2,
    type: 'vaccination',
    description: 'Vaccination drive initiated in rural areas',
    location: 'Jodhpur District',
    timestamp: '2024-01-20T09:15:00Z',
    status: 'in-progress',
    officer: 'Priya Sharma'
  },
  {
    id: 3,
    type: 'alert',
    description: 'Disease outbreak reported and contained',
    location: 'Udaipur District',
    timestamp: '2024-01-19T16:45:00Z',
    status: 'resolved',
    officer: 'Dr. Sunita Patel'
  },
  {
    id: 4,
    type: 'training',
    description: 'Farmer education session conducted',
    location: 'Kota District',
    timestamp: '2024-01-19T14:20:00Z',
    status: 'completed',
    officer: 'Amit Singh'
  }
];

export const mapData = {
  regions: [
    {
      id: 1,
      name: 'Northern Region',
      coordinates: { lat: 26.9124, lng: 75.7873 },
      riskLevel: 'medium',
      farms: 2847,
      incidents: 12
    },
    {
      id: 2,
      name: 'Southern Region',
      coordinates: { lat: 24.5854, lng: 73.7125 },
      riskLevel: 'low',
      farms: 1923,
      incidents: 5
    },
    {
      id: 3,
      name: 'Eastern Region',
      coordinates: { lat: 27.0238, lng: 74.2179 },
      riskLevel: 'high',
      farms: 3156,
      incidents: 18
    }
  ]
};