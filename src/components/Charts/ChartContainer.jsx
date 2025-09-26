import React, { useState } from 'react';
import { Download, Maximize2, Minimize2, RefreshCw, Info } from 'lucide-react';

const ChartContainer = ({ 
  title, 
  subtitle, 
  children, 
  loading = false,
  error = null,
  onRefresh = null,
  onExport = null,
  onFullscreen = null,
  className = "",
  actions = []
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (onFullscreen) {
      onFullscreen(!isFullscreen);
    }
  };

  const handleExport = () => {
    if (onExport) {
      onExport();
    }
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  if (error) {
    return (
      <div className={`card ${className}`}>
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">Error Loading Chart</h3>
          <p className="text-secondary-600 mb-4">{error}</p>
          {onRefresh && (
            <button onClick={handleRefresh} className="btn-primary">
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`card ${isFullscreen ? 'fixed inset-4 z-50 overflow-auto' : ''} ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-secondary-900">{title}</h3>
            <button className="text-secondary-400 hover:text-secondary-600 transition-colors">
              <Info size={16} />
            </button>
          </div>
          {subtitle && (
            <p className="text-sm text-secondary-600 mt-1">{subtitle}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {onRefresh && (
            <button 
              onClick={handleRefresh}
              className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCw size={16} />
            </button>
          )}
          
          {onExport && (
            <button 
              onClick={handleExport}
              className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
              title="Export"
            >
              <Download size={16} />
            </button>
          )}
          
          {onFullscreen && (
            <button 
              onClick={handleFullscreen}
              className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          )}
          
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
              title={action.title}
            >
              {action.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className={loading ? 'animate-pulse' : ''}>
        {children}
      </div>
    </div>
  );
};

export default ChartContainer;