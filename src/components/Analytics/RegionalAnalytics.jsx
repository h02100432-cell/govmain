import React, { useState } from 'react';
import { 
  Map, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  Syringe,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import { regionalAnalytics, regions, chartData } from '../../data/mockData';
import QuickChart from '../Dashboard/QuickChart';

const RegionalAnalytics = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('disease-outbreaks');
  const [viewMode, setViewMode] = useState('map');

  const metrics = [
    { id: 'disease-outbreaks', label: 'Disease Outbreaks', icon: AlertTriangle, color: 'red' },
    { id: 'compliance-rates', label: 'Compliance Rates', icon: Shield, color: 'green' },
    { id: 'vaccination-coverage', label: 'Vaccination Coverage', icon: Syringe, color: 'blue' },
    { id: 'risk-levels', label: 'Risk Levels', icon: TrendingUp, color: 'yellow' }
  ];

  const viewModes = [
    { id: 'map', label: 'Map View', icon: Map },
    { id: 'chart', label: 'Chart View', icon: BarChart3 }
  ];

  const MapView = () => (
    <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 min-h-96">
      {/* Simulated map interface */}
      <div className="absolute inset-4 bg-white rounded-lg shadow-inner overflow-hidden">
        <div className="relative w-full h-full bg-gradient-to-br from-green-100 via-yellow-50 to-red-100">
          {/* Region markers */}
          <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-red-500 rounded-full animate-pulse cursor-pointer hover:scale-125 transition-transform">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium opacity-0 hover:opacity-100 transition-opacity">
              High Risk Area
            </div>
          </div>
          <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-yellow-500 rounded-full animate-pulse cursor-pointer hover:scale-125 transition-transform">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium opacity-0 hover:opacity-100 transition-opacity">
              Medium Risk
            </div>
          </div>
          <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-green-500 rounded-full animate-pulse cursor-pointer hover:scale-125 transition-transform">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium opacity-0 hover:opacity-100 transition-opacity">
              Low Risk
            </div>
          </div>
          
          {/* Map overlay info */}
          <div className="absolute top-4 left-4 bg-white rounded-lg p-4 shadow-lg">
            <h4 className="font-semibold text-secondary-900 mb-2">Legend</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>High Risk (10+ incidents)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Medium Risk (5-10 incidents)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Low Risk (&lt;5 incidents)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Regional Analytics & Field Operations</h1>
          <p className="text-secondary-600 mt-1">
            Comprehensive view of regional performance and field operations
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="btn-secondary text-sm flex items-center space-x-2">
            <RefreshCw size={16} />
            <span>Refresh</span>
          </button>
          <button className="btn-primary text-sm flex items-center space-x-2">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 bg-white p-4 rounded-xl border border-secondary-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-secondary-700">Region:</label>
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="input-field text-sm min-w-40"
            >
              <option value="all">All Regions</option>
              {regions.map(region => (
                <option key={region.id} value={region.code}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-secondary-400" />
            <select 
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="input-field text-sm min-w-48"
            >
              {metrics.map(metric => (
                <option key={metric.id} value={metric.id}>
                  {metric.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center bg-secondary-100 rounded-lg p-1">
          {viewModes.map(mode => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  viewMode === mode.id 
                    ? 'bg-white text-secondary-900 shadow-sm' 
                    : 'text-secondary-600 hover:text-secondary-900'
                }`}
              >
                <Icon size={16} />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-secondary-600">Disease Outbreaks</h3>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
          </div>
          <div className="text-2xl font-bold text-secondary-900 mb-1">
            {regionalAnalytics.diseaseOutbreaks}%
          </div>
          <p className="text-xs text-secondary-500">Current outbreak rate</p>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-secondary-600">Compliance Rates</h3>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Shield className="text-green-600" size={20} />
            </div>
          </div>
          <div className="text-2xl font-bold text-secondary-900 mb-1">
            {regionalAnalytics.complianceRates}%
          </div>
          <p className="text-xs text-secondary-500">Overall compliance</p>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-secondary-600">Vaccination Coverage</h3>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Syringe className="text-blue-600" size={20} />
            </div>
          </div>
          <div className="text-2xl font-bold text-secondary-900 mb-1">
            {regionalAnalytics.vaccinationCoverage}%
          </div>
          <p className="text-xs text-secondary-500">Regional average</p>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-secondary-600">High-Risk Farms</h3>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-yellow-600" size={20} />
            </div>
          </div>
          <div className="text-2xl font-bold text-secondary-900 mb-1">22</div>
          <p className="text-xs text-secondary-500">Requiring attention</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map/Chart View */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-secondary-900">
                {viewMode === 'map' ? 'Regional Risk Map' : 'Analytics Chart'}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-secondary-500">
                <span>Last updated: 2 hours ago</span>
              </div>
            </div>
            
            {viewMode === 'map' ? (
              <MapView />
            ) : (
              <QuickChart data={chartData.complianceRates} type="bar" />
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Data Layer Controls */}
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Data Layer</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="rounded border-secondary-300" />
                <span className="text-sm text-secondary-700">Heatmaps</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="rounded border-secondary-300" />
                <span className="text-sm text-secondary-700">Pins</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-secondary-300" />
                <span className="text-sm text-secondary-700">Boundaries</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-secondary-300" />
                <span className="text-sm text-secondary-700">Satellite</span>
              </label>
            </div>
          </div>

          {/* Field Staff Filter */}
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Field Staff Filter</h3>
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Search staff..." 
                className="input-field text-sm"
              />
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-secondary-700">All Staff</span>
                  <span className="text-secondary-500">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-700">Veterinarians</span>
                  <span className="text-secondary-500">42</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-700">Field Officers</span>
                  <span className="text-secondary-500">68</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-700">Extension Workers</span>
                  <span className="text-secondary-500">34</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-700">Lab Technicians</span>
                  <span className="text-secondary-500">12</span>
                </div>
              </div>
            </div>
          </div>

          {/* Output Share */}
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Output Share</h3>
            <div className="flex items-center space-x-2">
              <button className="btn-secondary text-sm flex-1">Share</button>
              <button className="btn-secondary text-sm flex-1">Export</button>
              <button className="btn-primary text-sm flex-1">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalAnalytics;