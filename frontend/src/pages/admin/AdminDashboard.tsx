import {
  Briefcase,
  Users,
  Bell,
  TrendingUp,
  Activity,
  DollarSign,
  FileText,
  Zap,
} from 'lucide-react';
import { StatsCard } from '@/components/admin/StatsCard';
import { adminStats, jobAnalytics, userAnalytics } from '@/data/adminMockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

export default function AdminDashboard() {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Jobs"
          value={formatNumber(adminStats.totalJobs)}
          change="+12% from last week"
          changeType="positive"
          icon={Briefcase}
          iconColor="bg-blue-100 text-blue-600"
        />
        <StatsCard
          title="Active Jobs"
          value={formatNumber(adminStats.activeJobs)}
          change="+8% from last week"
          changeType="positive"
          icon={Activity}
          iconColor="bg-green-100 text-green-600"
        />
        <StatsCard
          title="Total Users"
          value={formatNumber(adminStats.totalUsers)}
          change="+18% from last month"
          changeType="positive"
          icon={Users}
          iconColor="bg-purple-100 text-purple-600"
        />
        <StatsCard
          title="Revenue"
          value={formatCurrency(adminStats.revenue)}
          change="+24% from last month"
          changeType="positive"
          icon={DollarSign}
          iconColor="bg-amber-100 text-amber-600"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Premium Users"
          value={formatNumber(adminStats.premiumUsers)}
          change="11.2% of total"
          changeType="neutral"
          icon={TrendingUp}
          iconColor="bg-indigo-100 text-indigo-600"
        />
        <StatsCard
          title="Ultra Users"
          value={formatNumber(adminStats.ultraUsers)}
          change="3% of total"
          changeType="neutral"
          icon={Zap}
          iconColor="bg-orange-100 text-orange-600"
        />
        <StatsCard
          title="Applications Today"
          value={formatNumber(adminStats.applicationsToday)}
          change="+5% from yesterday"
          changeType="positive"
          icon={FileText}
          iconColor="bg-teal-100 text-teal-600"
        />
        <StatsCard
          title="Notifications Sent"
          value={formatNumber(adminStats.notificationsSent)}
          change="This month"
          changeType="neutral"
          icon={Bell}
          iconColor="bg-pink-100 text-pink-600"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userAnalytics}>
                  <defs>
                    <linearGradient id="colorFree" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPremium" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorUltra" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="free"
                    stroke="hsl(var(--primary))"
                    fill="url(#colorFree)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="premium"
                    stroke="#8b5cf6"
                    fill="url(#colorPremium)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="ultra"
                    stroke="#f59e0b"
                    fill="url(#colorUltra)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Job Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Job Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jobAnalytics}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="posted" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="applications" fill="hsl(var(--primary-glow))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="/admin/jobs"
              className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
            >
              <Briefcase className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Add New Job</p>
                <p className="text-sm text-muted-foreground">Post a new job listing</p>
              </div>
            </a>
            <a
              href="/admin/notifications"
              className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
            >
              <Bell className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Send Notification</p>
                <p className="text-sm text-muted-foreground">Broadcast to users</p>
              </div>
            </a>
            <a
              href="/admin/users"
              className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
            >
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Manage Users</p>
                <p className="text-sm text-muted-foreground">View user analytics</p>
              </div>
            </a>
            <a
              href="/admin/crawlers"
              className="flex items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
            >
              <Activity className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Crawler Status</p>
                <p className="text-sm text-muted-foreground">Monitor job crawlers</p>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
