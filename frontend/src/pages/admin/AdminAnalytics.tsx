import React from 'react';

export default function AdminAnalytics() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Analytics</h2>
      <p className="text-sm text-muted-foreground">Basic analytics and charts will appear here.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded">Total Jobs: --</div>
        <div className="bg-card p-4 rounded">Published: --</div>
        <div className="bg-card p-4 rounded">Revenue: --</div>
      </div>
    </div>
  );
}
