import React, { useState, useEffect } from 'react';
import MetricCard from './MetricCard';
import QuickChart from './QuickChart';
import RecentActivity from './RecentActivity';
import { 
  Users, 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle, 
  Syringe,
  MapPin,
  Activity
} from 'lucide-react';
import { dashboardMetrics, chartData, recentActivities } from '../../data/mockData';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('monthly');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const timeframeOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Dashboard Overview</h1>
          <p className="text-secondary-600 mt-1">
            Real-time insights into agricultural operations and compliance
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="input-field text-sm"
          >
            {timeframeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button className="btn-primary text-sm">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Farms Registered"
          value={dashboardMetrics.totalFarms}
          change={5.2}
          changeType="increase"
          icon={MapPin}
          color="primary"
          subtitle="Active agricultural facilities"
          loading={loading}
        />
        
        <MetricCard
          title="Active Biosecurity Plans"
          value={dashboardMetrics.activeBiosecurityPlans}
          change={2.1}
          changeType="increase"
          icon={Shield}
          color="green"
          subtitle="Currently implemented"
          loading={loading}
        />
        
        <MetricCard
          title="Disease Incidents"
          value={dashboardMetrics.diseaseIncidents}
          change={12}
          changeType="decrease"
          icon={AlertTriangle}
          color="red"
          subtitle="This month"
          loading={loading}
        />
        
        <MetricCard
          title="Average Risk Score"
          value={dashboardMetrics.averageRiskScore}
          change={0}
          changeType="neutral"
          icon={Activity}
          color="yellow"
          subtitle="Risk assessment metric"
          loading={loading}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Compliance Rate"
          value={`${dashboardMetrics.complianceRate}%`}
          change={3.5}
          changeType="increase"
          icon={CheckCircle}
          color="green"
          subtitle="Overall compliance"
          loading={loading}
        />
        
        <MetricCard
          title="Vaccination Coverage"
          value={`${dashboardMetrics.vaccinationCoverage}%`}
          change={1.8}
          changeType="increase"
          icon={Syringe}
          color="blue"
          subtitle="Regional average"
          loading={loading}
        />
        
        <MetricCard
          title="High-Risk Farms"
          value={dashboardMetrics.highRiskFarms}
          change={8}
          changeType="decrease"
          icon={AlertTriangle}
          color="red"
          subtitle="Requiring attention"
          loading={loading}
        />
        
        <MetricCard
          title="Field Staff Active"
          value={dashboardMetrics.fieldStaff}
          change={0}
          changeType="neutral"
          icon={Users}
          color="purple"
          subtitle="Currently deployed"
          loading={loading}
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Disease Incidents Chart */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-secondary-900">Disease Incidents Trend</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-secondary-600">Incidents</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-secondary-600">Resolved</span>
                </div>
              </div>
            </div>
            <QuickChart data={chartData.diseaseIncidents} type="line" loading={loading} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-secondary-900 mb-6">Recent Activity</h3>
          <RecentActivity activities={recentActivities.slice(0, 5)} loading={loading} />
        </div>
      </div>

      {/* Regional Performance */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-secondary-900">Regional Compliance Rates</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View Details
          </button>
        </div>
        <QuickChart data={chartData.complianceRates} type="bar" loading={loading} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="card text-left hover:shadow-lg transition-shadow duration-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <MapPin className="text-primary-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-secondary-900">Schedule Inspection</h4>
              <p className="text-sm text-secondary-500">Plan field visits</p>
            </div>
          </div>
        </button>

        <button className="card text-left hover:shadow-lg transition-shadow duration-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Syringe className="text-green-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-secondary-900">Vaccination Drive</h4>
              <p className="text-sm text-secondary-500">Organize campaigns</p>
            </div>
          </div>
        </button>

        <button className="card text-left hover:shadow-lg transition-shadow duration-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-secondary-900">Report Incident</h4>
              <p className="text-sm text-secondary-500">Log new cases</p>
            </div>
          </div>
        </button>

        <button className="card text-left hover:shadow-lg transition-shadow duration-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-blue-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-secondary-900">Generate Report</h4>
              <p className="text-sm text-secondary-500">Analytics & insights</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;