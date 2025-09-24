export interface Project {
  id: string;
  accountId: string;
  creditsIssued: number;
  startDate: string;
  riskAssessment: 'Low' | 'Medium' | 'High';
  bufferCredits: number;
  country: string;
  status: 'Active' | 'Pending' | 'Completed';
  timeline: ProjectTimeline[];
  metadata: ProjectMetadata;
}

export interface ProjectTimeline {
  date: string;
  event: string;
  creditsIssued?: number;
  acvaId?: string;
  status: 'Completed' | 'Pending';
}

export interface ProjectMetadata {
  area: number;
  methodology: string;
  documentation: string[];
  ownership: string;
  coordinates: { lat: number; lng: number };
}

export interface Account {
  id: string;
  companyName: string;
  projects: string[];
  kycDocument: string;
  accountType: 'Project Proponent' | 'Trader';
  email: string;
  registrationDate: string;
  kycStatus: 'Done' | 'Pending' | 'In Process';
}

export interface ACVA {
  id: string;
  agencyName: string;
  country: string;
  projectsAssigned: string[];
  status: 'Active' | 'Pending' | 'Suspended';
  accreditationDocs: string[];
  contactInfo: {
    email: string;
    phone: string;
  };
}

export interface Validation {
  projectId: string;
  accountId: string;
  startDate: string;
  pddDocument: string;
  validationReport?: string;
  acvaId: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submissionDate: string;
}

export interface Verification {
  projectId: string;
  accountId: string;
  cyclesDone: number;
  currentCycle: number;
  acvaId: string;
  verificationReport?: string;
  creditsRecommended: number;
  bufferCreditsDeducted: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  verificationDate: string;
}

export interface XAIResult {
  claimed: number;
  predicted: number;
  confidence: number;
  featureImportance: {
    canopyDensity: number;
    treeHeights: number;
    satelliteImagery: number;
    other: number;
  };
}

export interface DashboardStats {
  totalProjects: number;
  totalCarbonRemoved: number;
  totalCreditsIssued: number;
  totalBufferCredits: number;
}

export interface Notification {
  id: string;
  type: 'kyc' | 'validation' | 'verification' | 'credits';
  message: string;
  count?: number;
  timestamp: string;
}