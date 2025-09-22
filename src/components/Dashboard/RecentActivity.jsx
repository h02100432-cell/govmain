import React from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  User,
  Syringe,
  FileText,
  Shield
} from 'lucide-react';

const RecentActivity = ({ activities, loading = false }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'inspection':
        return <Shield className="text-blue-600" size={16} />;
      case 'vaccination':
        return <Syringe className="text-green-600" size={16} />;
      case 'alert':
        return <AlertTriangle className="text-red-600" size={16} />;
      case 'training':
        return <FileText className="text-purple-600" size={16} />;
      default:
        return <Clock className="text-secondary-400" size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'in-progress':
        return 'text-yellow-600 bg-yellow-50';
      case 'resolved':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-secondary-600 bg-secondary-50';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-secondary-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
                <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary-50 transition-colors duration-200">
          <div className="w-8 h-8 bg-white border border-secondary-200 rounded-full flex items-center justify-center flex-shrink-0">
            {getActivityIcon(activity.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-secondary-900 mb-1">
              {activity.description}
            </p>
            
            <div className="flex items-center space-x-4 text-xs text-secondary-500">
              <div className="flex items-center space-x-1">
                <MapPin size={12} />
                <span>{activity.location}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <User size={12} />
                <span>{activity.officer}</span>
              </div>
              
              <span>{formatTime(activity.timestamp)}</span>
            </div>
            
            <div className="mt-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                {activity.status === 'completed' && <CheckCircle size={12} className="mr-1" />}
                {activity.status === 'in-progress' && <Clock size={12} className="mr-1" />}
                {activity.status}
              </span>
            </div>
          </div>
        </div>
      ))}
      
      <div className="pt-4 border-t border-secondary-200">
        <button className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium py-2 rounded-lg hover:bg-primary-50 transition-colors duration-200">
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;