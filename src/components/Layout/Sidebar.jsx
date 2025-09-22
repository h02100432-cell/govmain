import React from 'react';
import { 
  BarChart3, 
  Map, 
  Users, 
  FileText, 
  MessageSquare, 
  Settings,
  Home,
  Activity,
  Shield,
  TrendingUp,
  Calendar,
  Database
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isMobileMenuOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'Overview & metrics' },
    { id: 'analytics', label: 'Regional Analytics', icon: BarChart3, description: 'Data insights' },
    { id: 'field-operations', label: 'Field Operations', icon: Map, description: 'Staff & locations' },
    { id: 'policy-hub', label: 'Policy Hub', icon: FileText, description: 'Policies & guidelines' },
    { id: 'communications', label: 'Communications', icon: MessageSquare, description: 'Messages & alerts' },
    { id: 'biosecurity', label: 'Biosecurity', icon: Shield, description: 'Security protocols' },
    { id: 'reports', label: 'Reports', icon: TrendingUp, description: 'Analytics & reports' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, description: 'Events & schedules' },
    { id: 'data-management', label: 'Data Management', icon: Database, description: 'Data operations' }
  ];

  const handleItemClick = (itemId) => {
    setActiveTab(itemId);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-secondary-200 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="p-6 border-b border-secondary-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <Activity className="text-white" size={20} />
              </div>
              <div>
                <h2 className="font-bold text-secondary-900">AgriGov</h2>
                <p className="text-xs text-secondary-500">Management Portal</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group
                    ${isActive 
                      ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                      : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900'
                    }
                  `}
                >
                  <Icon 
                    size={20} 
                    className={`
                      transition-colors duration-200
                      ${isActive ? 'text-primary-600' : 'text-secondary-400 group-hover:text-secondary-600'}
                    `}
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm ${isActive ? 'text-primary-900' : ''}`}>
                      {item.label}
                    </p>
                    <p className={`text-xs ${isActive ? 'text-primary-600' : 'text-secondary-500'}`}>
                      {item.description}
                    </p>
                  </div>
                  {isActive && (
                    <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-secondary-200">
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-secondary-600 hover:bg-secondary-50 hover:text-secondary-900 transition-all duration-200">
              <Settings size={20} className="text-secondary-400" />
              <div className="flex-1 text-left">
                <p className="font-medium text-sm">Settings</p>
                <p className="text-xs text-secondary-500">System preferences</p>
              </div>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;