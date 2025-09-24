import { Project, Account, ACVA, Validation, Verification, DashboardStats, Notification } from '../types';

export const mockStats: DashboardStats = {
  totalProjects: 156,
  totalCarbonRemoved: 45230,
  totalCreditsIssued: 38750,
  totalBufferCredits: 6480
};

export const mockNotifications: Notification[] = [
  { id: '1', type: 'kyc', message: 'Pending KYCs', count: 12, timestamp: '2024-01-15T10:30:00Z' },
  { id: '2', type: 'validation', message: 'Pending Validations', count: 8, timestamp: '2024-01-15T09:15:00Z' },
  { id: '3', type: 'verification', message: 'Pending Verifications', count: 15, timestamp: '2024-01-15T08:45:00Z' },
  { id: '4', type: 'credits', message: 'Carbon credits issued', count: 2340, timestamp: '2024-01-15T07:20:00Z' }
];

export const mockProjects: Project[] = [
  {
    id: 'PRJ-001',
    accountId: 'ACC-001',
    creditsIssued: 1250,
    startDate: '2023-06-15',
    riskAssessment: 'Low',
    bufferCredits: 125,
    country: 'Brazil',
    status: 'Active',
    timeline: [
      { date: '2023-06-15', event: 'Project Started', status: 'Completed' },
      { date: '2023-08-20', event: 'Validation Completed', creditsIssued: 0, acvaId: 'ACVA-001', status: 'Completed' },
      { date: '2023-12-15', event: 'First Verification', creditsIssued: 625, acvaId: 'ACVA-001', status: 'Completed' },
      { date: '2024-06-15', event: 'Second Verification', creditsIssued: 625, acvaId: 'ACVA-001', status: 'Completed' }
    ],
    metadata: {
      area: 500,
      methodology: 'VM0007',
      documentation: ['PDD.pdf', 'Monitoring_Report_1.pdf', 'Monitoring_Report_2.pdf'],
      ownership: 'Green Forest Initiative',
      coordinates: { lat: -15.7942, lng: -47.8822 }
    }
  },
  {
    id: 'PRJ-002',
    accountId: 'ACC-002',
    creditsIssued: 890,
    startDate: '2023-09-10',
    riskAssessment: 'Medium',
    bufferCredits: 89,
    country: 'Indonesia',
    status: 'Active',
    timeline: [
      { date: '2023-09-10', event: 'Project Started', status: 'Completed' },
      { date: '2023-11-25', event: 'Validation Completed', creditsIssued: 0, acvaId: 'ACVA-002', status: 'Completed' },
      { date: '2024-03-10', event: 'First Verification', creditsIssued: 890, acvaId: 'ACVA-002', status: 'Completed' }
    ],
    metadata: {
      area: 750,
      methodology: 'VM0015',
      documentation: ['PDD.pdf', 'Monitoring_Report_1.pdf'],
      ownership: 'Tropical Conservation Corp',
      coordinates: { lat: -2.5489, lng: 118.0149 }
    }
  }
];

export const mockAccounts: Account[] = [
  {
    id: 'ACC-001',
    companyName: 'Green Forest Initiative',
    projects: ['PRJ-001', 'PRJ-003'],
    kycDocument: 'kyc_green_forest.pdf',
    accountType: 'Project Proponent',
    email: 'contact@greenforest.com',
    registrationDate: '2023-05-20',
    kycStatus: 'Done'
  },
  {
    id: 'ACC-002',
    companyName: 'Tropical Conservation Corp',
    projects: ['PRJ-002'],
    kycDocument: 'kyc_tropical_conservation.pdf',
    accountType: 'Project Proponent',
    email: 'info@tropicalconservation.org',
    registrationDate: '2023-08-15',
    kycStatus: 'Done'
  },
  {
    id: 'ACC-003',
    companyName: 'Carbon Trade Solutions',
    projects: [],
    kycDocument: 'kyc_carbon_trade.pdf',
    accountType: 'Trader',
    email: 'admin@carbontradesolutions.com',
    registrationDate: '2024-01-10',
    kycStatus: 'Pending'
  }
];

export const mockACVAs: ACVA[] = [
  {
    id: 'ACVA-001',
    agencyName: 'Global Carbon Verification',
    country: 'United States',
    projectsAssigned: ['PRJ-001', 'PRJ-004'],
    status: 'Active',
    accreditationDocs: ['accreditation_gcv.pdf', 'iso_certificate.pdf'],
    contactInfo: {
      email: 'verification@globalcarbon.com',
      phone: '+1-555-0123'
    }
  },
  {
    id: 'ACVA-002',
    agencyName: 'EcoVerify International',
    country: 'Germany',
    projectsAssigned: ['PRJ-002', 'PRJ-005'],
    status: 'Active',
    accreditationDocs: ['accreditation_evi.pdf'],
    contactInfo: {
      email: 'contact@ecoverify.de',
      phone: '+49-30-12345678'
    }
  }
];

export const mockValidations: Validation[] = [
  {
    projectId: 'PRJ-003',
    accountId: 'ACC-001',
    startDate: '2024-01-15',
    pddDocument: 'pdd_prj003.pdf',
    validationReport: 'validation_report_prj003.pdf',
    acvaId: 'ACVA-001',
    status: 'Pending',
    submissionDate: '2024-01-20'
  },
  {
    projectId: 'PRJ-004',
    accountId: 'ACC-004',
    startDate: '2024-02-01',
    pddDocument: 'pdd_prj004.pdf',
    acvaId: 'ACVA-002',
    status: 'Pending',
    submissionDate: '2024-02-05'
  }
];

export const mockVerifications: Verification[] = [
  {
    projectId: 'PRJ-001',
    accountId: 'ACC-001',
    cyclesDone: 2,
    currentCycle: 3,
    acvaId: 'ACVA-001',
    verificationReport: 'verification_report_prj001_cycle3.pdf',
    creditsRecommended: 650,
    bufferCreditsDeducted: 65,
    status: 'Pending',
    verificationDate: '2024-12-15'
  },
  {
    projectId: 'PRJ-002',
    accountId: 'ACC-002',
    cyclesDone: 1,
    currentCycle: 2,
    acvaId: 'ACVA-002',
    creditsRecommended: 720,
    bufferCreditsDeducted: 72,
    status: 'Pending',
    verificationDate: '2024-09-10'
  }
];