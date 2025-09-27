import React, { useState } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, LineChart, Line, BarChart, Bar, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, Legend,
  Treemap, Cell, FunnelChart, Funnel, LabelList
} from 'recharts';
import { TrendingUp, Activity, TriangleAlert as AlertTriangle, Shield } from 'lucide-react';

// Advanced Scatter Plot for Disease Severity Analysis
export const DiseaseSeverityScatter = ({ data, loading = false }) => {
  const [activePoint, setActivePoint] = useState(null);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-secondary-200 rounded-lg shadow-lg">
          <p className="font-semibold text-secondary-900">{data.name}</p>
          <p className="text-sm text-secondary-600">Cases: {data.cases.toLocaleString()}</p>
          <p className="text-sm text-secondary-600">Deaths: {data.deaths.toLocaleString()}</p>
          <p className="text-sm text-secondary-600">Mortality Rate: {data.mortalityRate}%</p>
          <p className="text-sm text-secondary-600">Prevalence: {data.prevalence}%</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            type="number" 
            dataKey="cases" 
            name="Total Cases"
            tick={{ fontSize: 12, fill: '#64748b' }}
            label={{ value: 'Total Cases', position: 'insideBottom', offset: -10 }}
          />
          <YAxis 
            type="number" 
            dataKey="mortalityRate" 
            name="Mortality Rate (%)"
            tick={{ fontSize: 12, fill: '#64748b' }}
            label={{ value: 'Mortality Rate (%)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter 
            name="Diseases" 
            data={data} 
            fill="#ef4444"
            onClick={(data) => setActivePoint(data)}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={
                  parseFloat(entry.mortalityRate) > 15 ? '#dc2626' :
                  parseFloat(entry.mortalityRate) > 10 ? '#ea580c' :
                  parseFloat(entry.mortalityRate) > 5 ? '#ca8a04' : '#16a34a'
                }
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

// Advanced Time Series Chart
export const TimeSeriesChart = ({ data, loading = false }) => {
  const [selectedMetrics, setSelectedMetrics] = useState(['newCases', 'deaths', 'vaccinations']);

  const metrics = [
    { key: 'newCases', name: 'New Cases', color: '#ef4444' },
    { key: 'deaths', name: 'Deaths', color: '#dc2626' },
    { key: 'vaccinations', name: 'Vaccinations', color: '#22c55e' },
    { key: 'farms', name: 'Affected Farms', color: '#3b82f6' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-secondary-200 rounded-lg shadow-lg">
          <p className="font-semibold text-secondary-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Metric Selection */}
      <div className="flex flex-wrap gap-2">
        {metrics.map(metric => (
          <button
            key={metric.key}
            onClick={() => {
              if (selectedMetrics.includes(metric.key)) {
                setSelectedMetrics(selectedMetrics.filter(m => m !== metric.key));
              } else {
                setSelectedMetrics([...selectedMetrics, metric.key]);
              }
            }}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedMetrics.includes(metric.key)
                ? 'bg-primary-100 text-primary-800 border border-primary-300'
                : 'bg-secondary-100 text-secondary-600 border border-secondary-300'
            }`}
          >
            <span 
              className="inline-block w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: metric.color }}
            />
            {metric.name}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {selectedMetrics.includes('newCases') && (
              <Area
                type="monotone"
                dataKey="newCases"
                stackId="1"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.3}
                name="New Cases"
              />
            )}
            
            {selectedMetrics.includes('deaths') && (
              <Line
                type="monotone"
                dataKey="deaths"
                stroke="#dc2626"
                strokeWidth={3}
                dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
                name="Deaths"
              />
            )}
            
            {selectedMetrics.includes('vaccinations') && (
              <Bar
                dataKey="vaccinations"
                fill="#22c55e"
                fillOpacity={0.7}
                name="Vaccinations"
              />
            )}
            
            {selectedMetrics.includes('farms') && (
              <Line
                type="monotone"
                dataKey="farms"
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                name="Affected Farms"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Regional Performance Radar Chart
export const RegionalRadarChart = ({ data, loading = false }) => {
  const [selectedRegion, setSelectedRegion] = useState(data[0]?.region || '');

  const radarData = data.map(region => ({
    region: region.region,
    'Vaccination Rate': parseFloat(region.vaccinationRate),
    'Mortality Rate': 100 - parseFloat(region.mortalityRate), // Inverted for better visualization
    'Farm Count': (region.totalFarms / Math.max(...data.map(d => d.totalFarms))) * 100,
    'Animal Health': 100 - parseFloat(region.affectionRate),
    'Risk Score': 100 - (parseFloat(region.avgRiskScore) / 4) * 100
  }));

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Region Selection */}
      <div className="flex flex-wrap gap-2">
        {data.map(region => (
          <button
            key={region.region}
            onClick={() => setSelectedRegion(region.region)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedRegion === region.region
                ? 'bg-primary-100 text-primary-800 border border-primary-300'
                : 'bg-secondary-100 text-secondary-600 border border-secondary-300'
            }`}
          >
            {region.region}
          </button>
        ))}
      </div>

      {/* Radar Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData.filter(d => d.region === selectedRegion)}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis tick={{ fontSize: 12, fill: '#64748b' }} />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fontSize: 10, fill: '#64748b' }}
            />
            <Radar
              name={selectedRegion}
              dataKey="Vaccination Rate"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Radar
              name="Mortality Rate"
              dataKey="Mortality Rate"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Radar
              name="Animal Health"
              dataKey="Animal Health"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Disease Treemap Visualization
export const DiseaseTreemap = ({ data, loading = false }) => {
  const [selectedMetric, setSelectedMetric] = useState('cases');

  const treemapData = data.map(disease => ({
    name: disease.name,
    size: selectedMetric === 'cases' ? disease.cases : disease.deaths,
    cases: disease.cases,
    deaths: disease.deaths,
    mortalityRate: disease.mortalityRate
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-secondary-200 rounded-lg shadow-lg">
          <p className="font-semibold text-secondary-900">{data.name}</p>
          <p className="text-sm text-secondary-600">Cases: {data.cases.toLocaleString()}</p>
          <p className="text-sm text-secondary-600">Deaths: {data.deaths.toLocaleString()}</p>
          <p className="text-sm text-secondary-600">Mortality Rate: {data.mortalityRate}%</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Metric Selection */}
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedMetric('cases')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedMetric === 'cases'
              ? 'bg-primary-600 text-white'
              : 'bg-secondary-100 text-secondary-600'
          }`}
        >
          By Cases
        </button>
        <button
          onClick={() => setSelectedMetric('deaths')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedMetric === 'deaths'
              ? 'bg-primary-600 text-white'
              : 'bg-secondary-100 text-secondary-600'
          }`}
        >
          By Deaths
        </button>
      </div>

      {/* Treemap */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={treemapData}
            dataKey="size"
            ratio={4/3}
            stroke="#fff"
            strokeWidth={2}
          >
            <Tooltip content={<CustomTooltip />} />
          </Treemap>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Risk Assessment Funnel Chart
export const RiskFunnelChart = ({ data, loading = false }) => {
  const funnelData = [
    { name: 'Total Farms', value: data.totalFarms, fill: '#3b82f6' },
    { name: 'Farms with Animals', value: data.totalFarms, fill: '#22c55e' },
    { name: 'Farms with Affected Animals', value: Math.round(data.totalFarms * 0.3), fill: '#eab308' },
    { name: 'High-Risk Farms', value: Math.round(data.totalFarms * 0.1), fill: '#f97316' },
    { name: 'Critical Farms', value: Math.round(data.totalFarms * 0.05), fill: '#ef4444' }
  ];

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <FunnelChart>
          <Tooltip />
          <Funnel
            dataKey="value"
            data={funnelData}
            isAnimationActive
          >
            <LabelList position="center" fill="#fff" stroke="none" />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
};

// Performance Metrics Dashboard
export const PerformanceMetrics = ({ data, loading = false }) => {
  const metrics = [
    {
      title: 'Overall Mortality Rate',
      value: `${data.overallMortalityRate}%`,
      change: -2.3,
      icon: Activity,
      color: 'red'
    },
    {
      title: 'Vaccination Coverage',
      value: `${data.overallVaccinationRate}%`,
      change: 5.7,
      icon: Shield,
      color: 'green'
    },
    {
      title: 'Disease Prevalence',
      value: `${data.overallMorbidityRate}%`,
      change: -1.2,
      icon: AlertTriangle,
      color: 'yellow'
    },
    {
      title: 'Avg Animals/Farm',
      value: data.averageAnimalsPerFarm.toLocaleString(),
      change: 0.8,
      icon: TrendingUp,
      color: 'blue'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-secondary-200">
              <div className="h-4 bg-secondary-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-secondary-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-secondary-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const colorClasses = {
          red: 'from-red-500 to-red-600',
          green: 'from-green-500 to-green-600',
          blue: 'from-blue-500 to-blue-600',
          yellow: 'from-yellow-500 to-yellow-600'
        };

        return (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-secondary-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-secondary-600">{metric.title}</h3>
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${colorClasses[metric.color]} flex items-center justify-center`}>
                <Icon className="text-white" size={20} />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-secondary-900">{metric.value}</span>
                <div className={`flex items-center space-x-1 ${
                  metric.change > 0 ? 'text-green-600' : metric.change < 0 ? 'text-red-600' : 'text-secondary-500'
                }`}>
                  <TrendingUp size={16} className={metric.change < 0 ? 'rotate-180' : ''} />
                  <span className="text-sm font-medium">{Math.abs(metric.change)}%</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};