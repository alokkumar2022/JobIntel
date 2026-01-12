import { Referral } from '@/types';
import { mockJobs } from './mockData';

export interface AdminReferral {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  referrer: {
    id: string;
    name: string;
    email: string;
    company: string;
    verified: boolean;
  };
  seeker: {
    id: string;
    name: string;
    email: string;
  };
  status: 'pending' | 'in-progress' | 'submitted' | 'accepted' | 'rejected' | 'completed';
  price: number;
  commission: number;
  createdAt: string;
  updatedAt: string;
  proofUrl?: string;
  notes?: string;
}

export const adminReferrals: AdminReferral[] = [
  {
    id: 'ref-1',
    jobId: '1',
    jobTitle: 'Senior Frontend Engineer',
    company: 'Google',
    referrer: {
      id: 'emp-1',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@google.com',
      company: 'Google',
      verified: true,
    },
    seeker: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    status: 'completed',
    price: 5000,
    commission: 500,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    proofUrl: 'https://example.com/proof/ref-1.pdf',
    notes: 'Candidate got selected after 3 rounds of interview',
  },
  {
    id: 'ref-2',
    jobId: '2',
    jobTitle: 'Software Development Engineer II',
    company: 'Amazon',
    referrer: {
      id: 'emp-2',
      name: 'Priya Patel',
      email: 'priya.patel@amazon.com',
      company: 'Amazon',
      verified: true,
    },
    seeker: {
      id: 'user-2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
    status: 'in-progress',
    price: 4000,
    commission: 400,
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-22T11:00:00Z',
  },
  {
    id: 'ref-3',
    jobId: '4',
    jobTitle: 'Full Stack Developer',
    company: 'Stripe',
    referrer: {
      id: 'emp-3',
      name: 'Amit Kumar',
      email: 'amit.kumar@stripe.com',
      company: 'Stripe',
      verified: true,
    },
    seeker: {
      id: 'user-3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
    },
    status: 'pending',
    price: 3500,
    commission: 350,
    createdAt: '2024-01-20T15:00:00Z',
    updatedAt: '2024-01-20T15:00:00Z',
  },
  {
    id: 'ref-4',
    jobId: '3',
    jobTitle: 'Product Manager - AI/ML',
    company: 'Meta',
    referrer: {
      id: 'emp-4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@meta.com',
      company: 'Meta',
      verified: false,
    },
    seeker: {
      id: 'user-4',
      name: 'Alex Brown',
      email: 'alex.brown@example.com',
    },
    status: 'submitted',
    price: 6000,
    commission: 600,
    createdAt: '2024-01-18T12:00:00Z',
    updatedAt: '2024-01-21T16:00:00Z',
    proofUrl: 'https://example.com/proof/ref-4.pdf',
  },
  {
    id: 'ref-5',
    jobId: '6',
    jobTitle: 'Software Engineer - New Grad 2024',
    company: 'Microsoft',
    referrer: {
      id: 'emp-5',
      name: 'Neha Gupta',
      email: 'neha.gupta@microsoft.com',
      company: 'Microsoft',
      verified: true,
    },
    seeker: {
      id: 'user-5',
      name: 'Chris Lee',
      email: 'chris.lee@example.com',
    },
    status: 'accepted',
    price: 3000,
    commission: 300,
    createdAt: '2024-01-12T08:00:00Z',
    updatedAt: '2024-01-22T10:00:00Z',
  },
  {
    id: 'ref-6',
    jobId: '1',
    jobTitle: 'Senior Frontend Engineer',
    company: 'Google',
    referrer: {
      id: 'emp-1',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@google.com',
      company: 'Google',
      verified: true,
    },
    seeker: {
      id: 'user-6',
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
    },
    status: 'rejected',
    price: 5000,
    commission: 0,
    createdAt: '2024-01-08T14:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
    notes: 'Candidate did not meet experience requirements',
  },
];

export const referralStats = {
  totalReferrals: 156,
  pendingReferrals: 23,
  completedReferrals: 89,
  totalRevenue: 425000,
  totalCommissions: 42500,
  avgReferralPrice: 4200,
  successRate: 78,
  verifiedReferrers: 45,
};
