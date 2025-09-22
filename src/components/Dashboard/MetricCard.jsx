import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon, 
  color = 'primary',
  subtitle,
  loading = false 
}) => {
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    green: 'from-green-500 to-green-600',
    blue: 'from-blue-500 to-blue-600',
    yellow: 'from-yellow-500 to-yellow-600',
    red: 'from-red-500 to-red-600',
    purple: 'from-purple-500 to-purple-600'
  };

  const getTrendIcon = () => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp size={16} className="text-green-600" />;
      case 'decrease':
        return <TrendingDown size={16} className="text-red-600" />;
      default:
        return <Minus size={16} className="text-secondary-400" />;
    }
  };

  const getTrendColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-secondary-500';
    }
  };

  if (loading) {
    return (
      <div className="metric-card animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-secondary-200 rounded w-24"></div>
          <div className="w-10 h-10 bg-secondary-200 rounded-lg"></div>
        </div>
        <div className="h-8 bg-secondary-200 rounded w-20 mb-2"></div>
        <div className="h-3 bg-secondary-200 rounded w-16"></div>
      </div>
    );
  }

  return (
    <div className="metric-card group hover:scale-105 transition-transform duration-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-secondary-600 group-hover:text-secondary-900 transition-colors duration-200">
          {title}
        </h3>
        {Icon && (
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${colorClasses[color]} flex items-center justify-center shadow-sm`}>
            <Icon className="text-white" size={20} />
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-secondary-900">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
          {change && (
            <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="text-sm font-medium">
                {Math.abs(change)}%
              </span>
            </div>
          )}
        </div>
        
        {subtitle && (
          <p className="text-xs text-secondary-500">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default MetricCard;