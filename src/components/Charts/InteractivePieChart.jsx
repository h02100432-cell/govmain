import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Info, Download, Maximize2 } from 'lucide-react';

const InteractivePieChart = ({ 
  data, 
  title, 
  subtitle, 
  colors, 
  loading = false,
  showLegend = true,
  showTooltip = true,
  centerLabel = null,
  onSegmentClick = null,
  className = ""
}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const defaultColors = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', 
    '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f59e0b'
  ];

  const chartColors = colors || defaultColors;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-4 border border-secondary-200 rounded-lg shadow-lg">
          <p className="font-semibold text-secondary-900">{data.name}</p>
          <p className="text-sm text-secondary-600">
            Value: <span className="font-medium">{data.value.toLocaleString()}</span>
          </p>
          <p className="text-sm text-secondary-600">
            Percentage: <span className="font-medium">{data.payload.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry, index) => (
        <div 
          key={index} 
          className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onSegmentClick && onSegmentClick(entry.payload)}
        >
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-secondary-700">{entry.value}</span>
        </div>
      ))}
    </div>
  );

  const onPieEnter = (_, index) => {
    setHoveredIndex(index);
  };

  const onPieLeave = () => {
    setHoveredIndex(null);
  };

  const handleSegmentClick = (data, index) => {
    setActiveIndex(activeIndex === index ? null : index);
    if (onSegmentClick) {
      onSegmentClick(data);
    }
  };

  if (loading) {
    return (
      <div className={`card ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-secondary-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-secondary-200 rounded w-1/2 mb-6"></div>
          <div className="h-64 bg-secondary-200 rounded"></div>
        </div>
      </div>
    );
  }

  const processedData = data.map((item, index) => ({
    ...item,
    percentage: ((item.value / data.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(1)
  }));

  return (
    <div className={`card ${className}`}>
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
          <button className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors">
            <Download size={16} />
          </button>
          <button className="p-2 text-secondary-400 hover:text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={processedData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={centerLabel ? 40 : 0}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              onClick={handleSegmentClick}
              animationBegin={0}
              animationDuration={800}
            >
              {processedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={chartColors[index % chartColors.length]}
                  stroke={activeIndex === index ? '#374151' : 'none'}
                  strokeWidth={activeIndex === index ? 2 : 0}
                  style={{
                    filter: hoveredIndex === index ? 'brightness(1.1)' : 'none',
                    cursor: 'pointer',
                    transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                    transformOrigin: 'center',
                    transition: 'all 0.2s ease-in-out'
                  }}
                />
              ))}
            </Pie>
            
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            {showLegend && <Legend content={<CustomLegend />} />}
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        {centerLabel && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary-900">
                {centerLabel.value}
              </div>
              <div className="text-sm text-secondary-600">
                {centerLabel.label}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Data Summary */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {processedData.slice(0, 6).map((item, index) => (
          <div 
            key={index}
            className="flex items-center space-x-3 p-3 rounded-lg bg-secondary-50 hover:bg-secondary-100 transition-colors cursor-pointer"
            onClick={() => handleSegmentClick(item, index)}
          >
            <div 
              className="w-4 h-4 rounded-full flex-shrink-0" 
              style={{ backgroundColor: chartColors[index % chartColors.length] }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-secondary-900 truncate">
                {item.name}
              </p>
              <p className="text-xs text-secondary-600">
                {item.percentage}% ({item.value.toLocaleString()})
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractivePieChart;