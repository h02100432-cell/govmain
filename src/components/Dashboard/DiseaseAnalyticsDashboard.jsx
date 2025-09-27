import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, TriangleAlert as AlertTriangle, Shield, Heart, ChartBar as BarChart3, RefreshCw, Download, ListFilter as Filter, Calendar, MapPin, Zap, Target, Brain, Layers, Globe, Microscope } from 'lucide-react';
import InteractivePieChart from '../Charts/InteractivePieChart';
import MetricCard from './MetricCard';
import ChartContainer from '../Charts/ChartContainer';
import {
  DiseaseSeverityScatter,
  TimeSeriesChart,
  RegionalRadarChart,
  DiseaseTreemap,
  RiskFunnelChart,
  PerformanceMetrics
} from '../Charts/AdvancedCharts';
import {
  nationalRiskLevels,
  diseaseDistribution,
  mortalityByDisease,
  animalHealthStatus,
  vaccinationCoverage,
  regionalAnalysis,
  timeSeriesData,
  diseaseSeverityMatrix,
  riskMetrics
} from '../../data/mockData';

const DiseaseAnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [activeTab, setActiveTab] = useState('overview');

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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Globe },
    { id: 'advanced', label: 'Advanced Analytics', icon: Brain },
    { id: 'regional', label: 'Regional Analysis', icon: MapPin },
    { id: 'predictions', label: 'AI Insights', icon: Zap }
  ];

  useEffect(() => {
    loadDashboardData();
  }, [selectedRegion, selectedPeriod]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
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

  const handleExport = () => {
    console.log('Exporting dashboard data...');
  };

  const handleSegmentClick = (data, chartType) => {
    console.log(`Clicked on ${chartType}:`, data);
  };

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* Performance Metrics */}
      <div>
        <h2 className="text-xl font-bold text-secondary-900 mb-6 flex items-center">
          <Target className="mr-2 text-primary-600" size={24} />
          Key Performance Indicators
        </h2>
        <PerformanceMetrics data={riskMetrics} loading={loading} />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* National Risk Level Distribution */}
        <ChartContainer
          title="National Farm Risk Assessment"
          subtitle="Distribution of farms by risk level classification"
          onRefresh={handleRefresh}
          onExport={handleExport}
        >
          <InteractivePieChart
            data={nationalRiskLevels}
            colors={['#22c55e', '#eab308', '#f97316', '#ef4444']}
            loading={loading}
            onSegmentClick={(data) => handleSegmentClick(data, 'risk-level')}
            centerLabel={{
              value: riskMetrics.totalFarms?.toLocaleString() || '0',
              label: 'Total Farms'
            }}
            showLegend={true}
            showTooltip={true}
          />
        </ChartContainer>

        {/* Disease Distribution */}
        <ChartContainer
          title="Disease Distribution Analysis"
          subtitle="Breakdown of diseases affecting livestock population"
          onRefresh={handleRefresh}
          onExport={handleExport}
        >
          <InteractivePieChart
            data={diseaseDistribution}
            loading={loading}
            onSegmentClick={(data) => handleSegmentClick(data, 'disease-distribution')}
            centerLabel={{
              value: '100%',
              label: 'Affected Animals'
            }}
            showLegend={true}
            showTooltip={true}
          />
        </ChartContainer>

        {/* Mortality Analysis */}
        <ChartContainer
          title="Mortality Analysis by Disease"
          subtitle="Deaths attributed to each disease type"
          onRefresh={handleRefresh}
          onExport={handleExport}
        >
          <InteractivePieChart
            data={mortalityByDisease}
            loading={loading}
            onSegmentClick={(data) => handleSegmentClick(data, 'mortality')}
            centerLabel={{
              value: riskMetrics.totalDeaths?.toLocaleString() || '0',
              label: 'Total Deaths'
            }}
            showLegend={true}
            showTooltip={true}
          />
        </ChartContainer>

        {/* Animal Health Status */}
        <ChartContainer
          title="Overall Animal Health Status"
          subtitle="Healthy vs. disease-affected animals"
          onRefresh={handleRefresh}
          onExport={handleExport}
        >
          <InteractivePieChart
            data={animalHealthStatus}
            colors={['#22c55e', '#ef4444']}
            loading={loading}
            onSegmentClick={(data) => handleSegmentClick(data, 'health-status')}
            centerLabel={{
              value: riskMetrics.totalAnimals?.toLocaleString() || '0',
              label: 'Total Animals'
            }}
            showLegend={true}
            showTooltip={true}
          />
        </ChartContainer>
      </div>

      {/* Vaccination Coverage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartContainer
          title="Vaccination Coverage Analysis"
          subtitle="Percentage of vaccinated vs. unvaccinated animals"
          onRefresh={handleRefresh}
          onExport={handleExport}
        >
          <InteractivePieChart
            data={vaccinationCoverage}
            colors={['#22c55e', '#ef4444']}
            loading={loading}
            onSegmentClick={(data) => handleSegmentClick(data, 'vaccination')}
            centerLabel={{
              value: `${riskMetrics.overallVaccinationRate}%`,
              label: 'Coverage Rate'
            }}
            showLegend={true}
            showTooltip={true}
          />
        </ChartContainer>

        {/* Risk Assessment Funnel */}
        <ChartContainer
          title="Risk Assessment Funnel"
          subtitle="Farm risk progression analysis"
          onRefresh={handleRefresh}
          onExport={handleExport}
        >
          <RiskFunnelChart data={riskMetrics} loading={loading} />
        </ChartContainer>
      </div>
    </div>
  );

  const renderAdvancedTab = () => (
    <div className="space-y-8">
      {/* Disease Severity Scatter Plot */}
      <ChartContainer
        title="Disease Severity Matrix"
        subtitle="Correlation between disease prevalence and mortality rates"
        onRefresh={handleRefresh}
        onExport={handleExport}
      >
        <DiseaseSeverityScatter data={diseaseSeverityMatrix} loading={loading} />
      </ChartContainer>

      {/* Time Series Analysis */}
      <ChartContainer
        title="Temporal Disease Trends"
        subtitle="Multi-metric time series analysis of disease patterns"
        onRefresh={handleRefresh}
        onExport={handleExport}
      >
        <TimeSeriesChart data={timeSeriesData} loading={loading} />
      </ChartContainer>

      {/* Disease Treemap */}
      <ChartContainer
        title="Disease Impact Visualization"
        subtitle="Hierarchical view of disease impact by cases and deaths"
        onRefresh={handleRefresh}
        onExport={handleExport}
      >
        <DiseaseTreemap data={diseaseSeverityMatrix} loading={loading} />
      </ChartContainer>
    </div>
  );

  const renderRegionalTab = () => (
    <div className="space-y-8">
      {/* Regional Performance Radar */}
      <ChartContainer
        title="Regional Performance Analysis"
        subtitle="Multi-dimensional comparison of regional health metrics"
        onRefresh={handleRefresh}
        onExport={handleExport}
      >
        <RegionalRadarChart data={regionalAnalysis} loading={loading} />
      </ChartContainer>

      {/* Regional Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regionalAnalysis.slice(0, 6).map((region, index) => (
          <div key={index} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-secondary-900">{region.region}</h3>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                parseFloat(region.avgRiskScore) <= 2 ? 'bg-green-100 text-green-800' :
                parseFloat(region.avgRiskScore) <= 3 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                Risk: {region.avgRiskScore}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-secondary-600">Total Farms:</span>
                <span className="font-medium">{region.totalFarms}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-600">Animals:</span>
                <span className="font-medium">{region.totalAnimals.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-600">Vaccination Rate:</span>
                <span className="font-medium text-green-600">{region.vaccinationRate}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-600">Mortality Rate:</span>
                <span className="font-medium text-red-600">{region.mortalityRate}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPredictionsTab = () => (
    <div className="space-y-8">
      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center mb-4">
            <Brain className="text-blue-600 mr-3" size={24} />
            <h3 className="text-lg font-semibold text-blue-900">Predictive Analysis</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-blue-700">Outbreak Risk (Next 30 days):</span>
              <span className="font-bold text-red-600">Medium (68%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-700">Recommended Vaccinations:</span>
              <span className="font-bold text-green-600">+15,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-700">High-Risk Regions:</span>
              <span className="font-bold text-orange-600">Eastern, Central</span>
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center mb-4">
            <Zap className="text-green-600 mr-3" size={24} />
            <h3 className="text-lg font-semibold text-green-900">Optimization Insights</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-green-700">Resource Allocation:</span>
              <span className="font-bold text-blue-600">Optimized</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-green-700">Cost Savings Potential:</span>
              <span className="font-bold text-green-600">₹2.3M</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-green-700">Efficiency Improvement:</span>
              <span className="font-bold text-purple-600">+23%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="card">
        <h3 className="text-lg font-semibold text-secondary-900 mb-6 flex items-center">
          <Microscope className="mr-2 text-primary-600" size={20} />
          AI-Powered Recommendations
        </h3>
        
        <div className="space-y-4">
          {[
            {
              priority: 'High',
              title: 'Immediate Vaccination Drive in Eastern Region',
              description: 'Deploy mobile vaccination units to cover 15,000 animals in high-risk areas.',
              impact: 'Reduce outbreak risk by 45%',
              color: 'red'
            },
            {
              priority: 'Medium',
              title: 'Enhanced Surveillance in Central Region',
              description: 'Increase monitoring frequency and deploy additional field staff.',
              impact: 'Early detection improvement by 60%',
              color: 'yellow'
            },
            {
              priority: 'Low',
              title: 'Farmer Education Program',
              description: 'Conduct awareness sessions on disease prevention and biosecurity.',
              impact: 'Long-term risk reduction by 25%',
              color: 'green'
            }
          ].map((rec, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-secondary-50 rounded-lg">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                rec.color === 'red' ? 'bg-red-100 text-red-800' :
                rec.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {rec.priority}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-secondary-900 mb-1">{rec.title}</h4>
                <p className="text-sm text-secondary-600 mb-2">{rec.description}</p>
                <p className="text-sm font-medium text-primary-600">Expected Impact: {rec.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900 flex items-center">
            <Activity className="mr-3 text-primary-600" size={32} />
            Disease Analytics Dashboard
          </h1>
          <p className="text-secondary-600 mt-2">
            Advanced AI-powered analysis of animal health and disease patterns
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
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 bg-white p-6 rounded-xl border border-secondary-200 shadow-sm">
        <div className="flex items-center space-x-6">
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
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live Data • Updated 2 min ago</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl border border-secondary-200 shadow-sm">
        <div className="flex overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600 bg-primary-50'
                    : 'border-transparent text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-screen">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'advanced' && renderAdvancedTab()}
        {activeTab === 'regional' && renderRegionalTab()}
        {activeTab === 'predictions' && renderPredictionsTab()}
      </div>
    </div>
  );
};

export default DiseaseAnalyticsDashboard;