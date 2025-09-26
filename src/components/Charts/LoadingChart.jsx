import React from 'react';

const LoadingChart = ({ height = 300, type = 'pie' }) => {
  if (type === 'pie') {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <div className="animate-pulse">
          <div className="w-48 h-48 bg-secondary-200 rounded-full mx-auto mb-4"></div>
          <div className="flex justify-center space-x-4">
            <div className="h-3 bg-secondary-200 rounded w-16"></div>
            <div className="h-3 bg-secondary-200 rounded w-20"></div>
            <div className="h-3 bg-secondary-200 rounded w-14"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'bar') {
    return (
      <div className="animate-pulse" style={{ height }}>
        <div className="flex items-end justify-between h-full space-x-2">
          {[...Array(6)].map((_, index) => (
            <div 
              key={index}
              className="bg-secondary-200 rounded-t"
              style={{ 
                height: `${Math.random() * 80 + 20}%`,
                width: '100%'
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse" style={{ height }}>
      <div className="h-full bg-secondary-200 rounded"></div>
    </div>
  );
};

export default LoadingChart;