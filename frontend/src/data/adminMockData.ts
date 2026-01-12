import { AdminStats, AdminJob, AdminNotification, UserAnalytics, JobAnalytics, RevenueAnalytics } from '@/types/admin';

export const adminStats: AdminStats = {
  totalJobs: 1248,
  activeJobs: 456,
  totalUsers: 28450,
  premiumUsers: 3200,
  ultraUsers: 850,
  applicationsToday: 1842,
  notificationsSent: 12450,
  revenue: 425000,
};

export const adminJobs: AdminJob[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'Google',
    status: 'active',
    applicants: 234,
    postedAt: '2024-01-15',
    deadline: '2024-02-28',
    source: 'manual',
  },
  {
    id: '2',
    title: 'Software Development Engineer II',
    company: 'Amazon',
    status: 'active',
    applicants: 456,
    postedAt: '2024-01-10',
    deadline: '2024-02-15',
    source: 'crawler',
  },
  {
    id: '3',
    title: 'Product Manager - AI/ML',
    company: 'Meta',
    status: 'pending',
    applicants: 0,
    postedAt: '2024-01-22',
    source: 'api',
  },
  {
    id: '4',
    title: 'Full Stack Developer',
    company: 'Stripe',
    status: 'active',
    applicants: 178,
    postedAt: '2024-01-20',
    source: 'manual',
  },
  {
    id: '5',
    title: 'Data Scientist - Recommendations',
    company: 'Netflix',
    status: 'approved',
    applicants: 312,
    postedAt: '2024-01-12',
    deadline: '2024-02-20',
    source: 'crawler',
  },
  {
    id: '6',
    title: 'Software Engineer - New Grad 2024',
    company: 'Microsoft',
    status: 'active',
    applicants: 1205,
    postedAt: '2024-01-05',
    deadline: '2024-01-31',
    source: 'manual',
  },
  {
    id: '7',
    title: 'DevOps Engineer',
    company: 'Flipkart',
    status: 'pending',
    applicants: 0,
    postedAt: '2024-01-23',
    source: 'api',
  },
  {
    id: '8',
    title: 'Mobile Developer - React Native',
    company: 'Swiggy',
    status: 'rejected',
    applicants: 0,
    postedAt: '2024-01-21',
    source: 'crawler',
  },
];

export const adminNotifications: AdminNotification[] = [
  {
    id: '1',
    title: 'New Hot Jobs Alert!',
    message: 'Top companies like Google, Amazon, and Microsoft are hiring! Check out the latest opportunities.',
    channels: ['email', 'whatsapp', 'telegram'],
    targetAudience: 'all',
    status: 'sent',
    sentAt: '2024-01-20T10:00:00Z',
    recipientCount: 28450,
  },
  {
    id: '2',
    title: 'Premium Feature Update',
    message: 'We have added AI-powered job matching! Upgrade to Premium to get personalized recommendations.',
    channels: ['email'],
    targetAudience: 'free',
    status: 'sent',
    sentAt: '2024-01-18T14:30:00Z',
    recipientCount: 24400,
  },
  {
    id: '3',
    title: 'Application Deadline Reminder',
    message: 'Reminder: The deadline for Microsoft New Grad 2024 position is tomorrow!',
    channels: ['whatsapp', 'telegram'],
    targetAudience: 'premium',
    status: 'scheduled',
    scheduledAt: '2024-01-30T09:00:00Z',
  },
  {
    id: '4',
    title: 'Exclusive Ultra Benefits',
    message: 'As an Ultra member, you now have access to AI cover letter generation!',
    channels: ['email', 'whatsapp'],
    targetAudience: 'ultra',
    status: 'draft',
  },
];

export const userAnalytics: UserAnalytics[] = [
  { date: '2024-01-01', free: 22000, premium: 2800, ultra: 720 },
  { date: '2024-01-08', free: 23200, premium: 2900, ultra: 760 },
  { date: '2024-01-15', free: 24400, premium: 3000, ultra: 800 },
  { date: '2024-01-22', free: 24400, premium: 3200, ultra: 850 },
];

export const jobAnalytics: JobAnalytics[] = [
  { date: 'Mon', posted: 45, applications: 890 },
  { date: 'Tue', posted: 52, applications: 1120 },
  { date: 'Wed', posted: 38, applications: 980 },
  { date: 'Thu', posted: 61, applications: 1340 },
  { date: 'Fri', posted: 55, applications: 1560 },
  { date: 'Sat', posted: 28, applications: 720 },
  { date: 'Sun', posted: 18, applications: 540 },
];

export const revenueAnalytics: RevenueAnalytics[] = [
  { date: 'Jan', subscriptions: 85000, ads: 12000, referrals: 8000 },
  { date: 'Feb', subscriptions: 92000, ads: 14500, referrals: 9200 },
  { date: 'Mar', subscriptions: 98000, ads: 16000, referrals: 10500 },
  { date: 'Apr', subscriptions: 105000, ads: 18000, referrals: 12000 },
  { date: 'May', subscriptions: 112000, ads: 19500, referrals: 13500 },
  { date: 'Jun', subscriptions: 125000, ads: 22000, referrals: 15000 },
];
