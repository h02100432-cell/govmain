import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, TriangleAlert as AlertTriangle, Shield, Heart, ChartBar as BarChart3, RefreshCw, Download, ListFilter as Filter, Calendar, MapPin } from 'lucide-react';
import InteractivePieChart from '../Charts/InteractivePieChart';
import MetricCard from './MetricCard';
import { diseaseAnalyticsAPI } from '../../services/api';

const DiseaseAnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [error, setError] = useState(null);

  // Dashboard data states
  const [riskLevelData, setRiskLevelData] = useState([]);
  const [diseaseDistributionData, setDiseaseDistributionData] = useState([]);
  const [mortalityData, setMortalityData] = useState([]);
  const [healthStatusData, setHealthStatusData] = useState([]);
  const [vaccinationData, setVaccinationData] = useState([]);
  const [summaryMetrics, setSummaryMetrics] = useState({});

  // Mock data for development (replace with API calls)
  const mockData = {
    riskLevels: [
      { name: 'Low Risk', value: 65, color: '#22c55e' },
      { name: 'Medium Risk', value: 25, color: '#eab308' },
      { name: 'High Risk', value: 10, color: '#ef4444' }
    ],
    diseaseDistribution: [
      { name: 'Fever', value: 35, color: '#ef4444' },
      { name: 'Cold', value: 20, color: '#3b82f6' },
      { name: 'Pox', value: 15, color: '#8b5cf6' },
      { name: 'Respiratory Issues', value: 12, color: '#f97316' },
      { name: 'Digestive Problems', value: 10, color: '#06b6d4' },
      { name: 'Others', value: 8, color: '#84cc16' }
    ],
    mortalityByDisease: [
      { name: 'Fever', value: 40, color: '#ef4444' },
      { name: 'Pox', value: 25, color: '#8b5cf6' },
      { name: 'Respiratory Issues', value: 20, color: '#f97316' },
      { name: 'Cold', value: 10, color: '#3b82f6' },
      { name: 'Others', value: 5, color: '#84cc16' }
    ],
    healthStatus: [
      { name: 'Healthy', value: 720, color: '#22c55e' },
      { name: 'Affected by Disease', value: 80, color: '#ef4444' }
    ],
    vaccination: [
      { name: 'Vaccinated', value: 78, color: '#22c55e' },
      { name: 'Not Vaccinated', value: 22, color: '#ef4444' }
    ]
  };

  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'north', label: 'Northern Region' },
    { value: 'south', label: 'Southern Region' },
    { value: 'east', label: 'Eastern Region' },
    { value: 'west', label: 'Western Region' },
    { value: 'central', label: 'Central Region' }
  ];

  const periods = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 3 Months' },
    { value: '1y', label: 'Last Year' }
  ];

  useEffect(() => {
    loadDashboardData();
  }, [selectedRegion, selectedPeriod]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // For now, using mock data. Replace with actual API calls:
      // const [riskLevels, diseaseDistribution, mortality, healthStatus, vaccination] = await Promise.all([
      //   diseaseAnalyticsAPI.getNationalRiskLevels(),
      //   diseaseAnalyticsAPI.getDiseaseDistribution(),
      //   diseaseAnalyticsAPI.getMortalityByDisease(),
      //   diseaseAnalyticsAPI.getAnimalHealthStatus(),
      //   diseaseAnalyticsAPI.getVaccinationCoverage()
      // ]);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setRiskLevelData(mockData.riskLevels);
      setDiseaseDistributionData(mockData.diseaseDistribution);
      setMortalityData(mockData.mortalityByDisease);
      setHealthStatusData(mockData.healthStatus);
      setVaccinationData(mockData.vaccination);

      setSummaryMetrics({
        totalAnimals: 800,
        totalFarms: 1250,
        affectedAnimals: 80,
        totalDeaths: 15,
        vaccinationRate: 78,
        highRiskFarms: 125
      });

    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard data loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const handleSegmentClick = (data, chartType) => {
    console.log(`Clicked on ${chartType}:`, data);
    // Implement drill-down functionality here
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting dashboard data...');
  };

  if (error) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="card text-center py-12">
          <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
          <h2 className="text-xl font-semibold text-secondary-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-secondary-600 mb-4">{error}</p>
          <button onClick={loadDashboardData} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Disease Analytics Dashboard</h1>
          <p className="text-secondary-600 mt-1">
            Comprehensive analysis of animal health and disease patterns
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleRefresh}
            disabled={refreshing}
            className="btn-secondary text-sm flex items-center space-x-2"
          >
            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
          <button 
            onClick={handleExport}
            className="btn-primary text-sm flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 bg-white p-4 rounded-xl border border-secondary-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <MapPin size={16} className="text-secondary-400" />
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="input-field text-sm min-w-40"
            >
              {regions.map(region => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Calendar size={16} className="text-secondary-400" />
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="input-field text-sm min-w-40"
            >
              {periods.map(period => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-secondary-500">
          <span>Last updated: 2 hours ago</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <MetricCard
          title="Total Animals"
          value={summaryMetrics.totalAnimals}
          icon={Heart}
          color="blue"
          subtitle="Registered livestock"
          loading={loading}
        />
        
        <MetricCard
          title="Total Farms"
          value={summaryMetrics.totalFarms}
          icon={MapPin}
          color="green"
          subtitle="Active farms"
          loading={loading}
        />
        
        <MetricCard
          title="Affected Animals"
          value={summaryMetrics.affectedAnimals}
          change={-5.2}
          changeType="decrease"
          icon={AlertTriangle}
          color="red"
          subtitle="Currently diseased"
          loading={loading}
        />
        
        <MetricCard
          title="Animal Deaths"
          value={summaryMetrics.totalDeaths}
          change={-12.5}
          changeType="decrease"
          icon={Activity}
          color="red"
          subtitle="Disease-related"
          loading={loading}
        />
        
        <MetricCard
          title="Vaccination Rate"
          value={`${summaryMetrics.vaccinationRate}%`}
          change={3.2}
          changeType="increase"
          icon={Shield}
          color="green"
          subtitle="Coverage percentage"
          loading={loading}
        />
        
        <MetricCard
          title="High-Risk Farms"
          value={summaryMetrics.highRiskFarms}
          change={-8.1}
          changeType="decrease"
          icon={TrendingUp}
          color="yellow"
          subtitle="Requiring attention"
          loading={loading}
        />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. National Risk Level Distribution */}
        <InteractivePieChart
          title="National Farm Risk Level Distribution"
          subtitle="Percentage of farms by risk assessment level"
          data={riskLevelData}
          colors={['#22c55e', '#eab308', '#ef4444']}
          loading={loading}
          onSegmentClick={(data) => handleSegmentClick(data, 'risk-level')}
          centerLabel={{
            value: '1,250',
            label: 'Total Farms'
          }}
        />

        {/* 2. Disease Distribution in Animals */}
        <InteractivePieChart
          title="Disease Distribution in Animals"
          subtitle="Percentage breakdown of diseases affecting livestock"
          data={diseaseDistributionData}
          loading={loading}
          onSegmentClick={(data) => handleSegmentClick(data, 'disease-distribution')}
          centerLabel={{
            value: '100%',
            label: 'Affected Animals'
          }}
        />

        {/* 3. Animal Deaths by Disease */}
        <InteractivePieChart
          title="Animal Mortality by Disease Type"
          subtitle="Percentage of deaths attributed to each disease"
          data={mortalityData}
          loading={loading}
          onSegmentClick={(data) => handleSegmentClick(data, 'mortality')}
          centerLabel={{
            value: '15',
            label: 'Total Deaths'
          }}
        />

        {/* 4. Animal Health Status */}
        <InteractivePieChart
          title="Overall Animal Health Status"
          subtitle="Healthy vs. disease-affected animals"
          data={healthStatusData}
          colors={['#22c55e', '#ef4444']}
          loading={loading}
          onSegmentClick={(data) => handleSegmentClick(data, 'health-status')}
          centerLabel={{
            value: '800',
            label: 'Total Animals'
          }}
        />
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vaccination Coverage */}
        <InteractivePieChart
          title="Vaccination Coverage"
          subtitle="Percentage of animals vaccinated vs. not vaccinated"
          data={vaccinationData}
          colors={['#22c55e', '#ef4444']}
          loading={loading}
          onSegmentClick={(data) => handleSegmentClick(data, 'vaccination')}
          centerLabel={{
            value: '78%',
            label: 'Coverage Rate'
          }}
        />

        {/* Regional Performance Summary */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-secondary-900">Regional Performance</h3>
              <p className="text-sm text-secondary-600">Key metrics by region</p>
            </div>
            <BarChart3 className="text-secondary-400" size={20} />
          </div>
          
          <div className="space-y-4">
            {[
              { region: 'Northern', risk: 'Low', animals: 180, affected: 12, rate: 93 },
              { region: 'Southern', risk: 'Medium', animals: 160, affected: 18, rate: 89 },
              { region: 'Eastern', risk: 'High', animals: 140, affected: 25, rate: 82 },
              { region: 'Western', risk: 'Low', animals: 170, affected: 15, rate: 91 },
              { region: 'Central', risk: 'Medium', animals: 150, affected: 10, rate: 95 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.risk === 'Low' ? 'bg-green-500' : 
                    item.risk === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <span className="font-medium text-secondary-900">{item.region}</span>
                </div>
                <div className="flex items-center space-x-6 text-sm text-secondary-600">
                  <span>{item.animals} animals</span>
                  <span>{item.affected} affected</span>
                  <span className="font-medium text-green-600">{item.rate}% healthy</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button className="card text-left hover:shadow-lg transition-shadow duration-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-secondary-900">High-Risk Alerts</h4>
              <p className="text-sm text-secondary-500">View critical cases</p>
            </div>
          </div>
        </button>

        <button className="card text-left hover:shadow-lg transition-shadow duration-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Shield className="text-green-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-secondary-900">Vaccination Drive</h4>
              <p className="text-sm text-secondary-500">Plan campaigns</p>
            </div>
          </div>
        </button>

        <button className="card text-left hover:shadow-lg transition-shadow duration-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-blue-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-secondary-900">Detailed Reports</h4>
              <p className="text-sm text-secondary-500">Generate analytics</p>
            </div>
          </div>
        </button>

        <button className="card text-left hover:shadow-lg transition-shadow duration-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Activity className="text-purple-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-secondary-900">Field Operations</h4>
              <p className="text-sm text-secondary-500">Coordinate activities</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default DiseaseAnalyticsDashboard;