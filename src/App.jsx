import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import DiseaseAnalyticsDashboard from './components/Dashboard/DiseaseAnalyticsDashboard';
import RegionalAnalytics from './components/Analytics/RegionalAnalytics';

// Placeholder components for other tabs
const FieldOperations = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-secondary-900 mb-4">Field Operations & Staff Management</h2>
      <p className="text-secondary-600 mb-8">Manage field staff, track locations, and coordinate operations</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="card text-center">
          <h3 className="font-semibold text-secondary-900 mb-2">Staff Directory</h3>
          <p className="text-sm text-secondary-600">View and manage field staff</p>
        </div>
        <div className="card text-center">
          <h3 className="font-semibold text-secondary-900 mb-2">Location Tracking</h3>
          <p className="text-sm text-secondary-600">Real-time staff locations</p>
        </div>
        <div className="card text-center">
          <h3 className="font-semibold text-secondary-900 mb-2">Task Assignment</h3>
          <p className="text-sm text-secondary-600">Assign and track tasks</p>
        </div>
      </div>
    </div>
  </div>
);

const PolicyHub = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-secondary-900 mb-4">Policy Hub & Communications</h2>
      <p className="text-secondary-600 mb-8">Manage policies, guidelines, and communications</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="card text-center">
          <h3 className="font-semibold text-secondary-900 mb-2">Active Policies</h3>
          <p className="text-sm text-secondary-600">Current policy documents</p>
        </div>
        <div className="card text-center">
          <h3 className="font-semibold text-secondary-900 mb-2">Draft Policies</h3>
          <p className="text-sm text-secondary-600">Policies under review</p>
        </div>
        <div className="card text-center">
          <h3 className="font-semibent text-secondary-900 mb-2">Communications</h3>
          <p className="text-sm text-secondary-600">Messages and announcements</p>
        </div>
      </div>
    </div>
  </div>
);

const Communications = () => (
  <div className="space-y-6 animate-fade-in">
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-secondary-900 mb-4">Communications Center</h2>
      <p className="text-secondary-600 mb-8">Manage messages, alerts, and announcements</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <div className="card text-center">
          <h3 className="font-semibold text-secondary-900 mb-2">Messages</h3>
          <p className="text-sm text-secondary-600">Internal communications</p>
        </div>
        <div className="card text-center">
          <h3 className="font-semibold text-secondary-900 mb-2">Alerts</h3>
          <p className="text-sm text-secondary-600">Emergency notifications</p>
        </div>
      </div>
    </div>
  </div>
);

const PlaceholderComponent = ({ title, description }) => (
  <div className="space-y-6 animate-fade-in">
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-secondary-900 mb-4">{title}</h2>
      <p className="text-secondary-600 mb-8">{description}</p>
      <div className="card max-w-md mx-auto text-center">
        <h3 className="font-semibold text-secondary-900 mb-2">Coming Soon</h3>
        <p className="text-sm text-secondary-600">This feature is under development</p>
      </div>
    </div>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'disease-analytics':
        return <DiseaseAnalyticsDashboard />;
      case 'analytics':
        return <RegionalAnalytics />;
      case 'field-operations':
        return <FieldOperations />;
      case 'policy-hub':
        return <PolicyHub />;
      case 'communications':
        return <Communications />;
      case 'biosecurity':
        return <PlaceholderComponent 
          title="Biosecurity Management" 
          description="Monitor and manage biosecurity protocols and compliance" 
        />;
      case 'reports':
        return <PlaceholderComponent 
          title="Reports & Analytics" 
          description="Generate comprehensive reports and analytics" 
        />;
      case 'calendar':
        return <PlaceholderComponent 
          title="Calendar & Scheduling" 
          description="Manage events, schedules, and appointments" 
        />;
      case 'data-management':
        return <PlaceholderComponent 
          title="Data Management" 
          description="Manage and organize system data" 
        />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <Header 
        onMenuToggle={handleMenuToggle} 
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <div className="flex">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isMobileMenuOpen={isMobileMenuOpen}
          onClose={handleMenuClose}
        />
        
        <main className="flex-1 lg:ml-0">
          <div className="p-4 sm:p-6 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;