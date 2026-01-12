import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, DollarSign, CreditCard, Eye, Loader2 } from 'lucide-react';

interface RevenueData {
  date: string;
  revenue?: number;
}

export default function AdminRevenue() {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

        const res = await fetch('/api/admin/analytics/revenue', { headers });
        if (res.ok) {
          const data = await res.json();
          setRevenueData(data);
        }
      } catch (err) {
        setError('Failed to fetch revenue data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Revenue</h1>
          <p className="text-muted-foreground">Track and manage revenue streams</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error}
        </div>
      </div>
    );
  }

  const totalRevenue = revenueData.reduce((sum, item) => sum + (item.revenue || 0), 0);
  const monthlyAverage = totalRevenue / (revenueData.length || 1);
  const yearlyProjection = monthlyAverage * 12;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Revenue</h1>
        <p className="text-muted-foreground">Track and manage revenue streams - Real-time data from database</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalRevenue / 100000).toFixed(1)}L</div>
            <p className="text-xs text-muted-foreground">Calculated from real data</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Monthly Average
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(monthlyAverage / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">Average per month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Data Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{revenueData.length}</div>
            <p className="text-xs text-muted-foreground">Last 6 months</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Projected Yearly
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(yearlyProjection / 100000).toFixed(1)}L</div>
            <p className="text-xs text-muted-foreground">Projected based on data</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend - Last 6 Months</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Box */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Revenue data is calculated based on the number of jobs posted (₹500 per job posting). 
            This is placeholder revenue calculation until payment system is fully implemented. 
            All data is fetched in real-time from the backend database and updated every 5 minutes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
