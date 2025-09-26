// Chart utility functions and helpers

export const formatChartData = (data, valueKey = 'value', nameKey = 'name') => {
  if (!Array.isArray(data)) return [];
  
  return data.map(item => ({
    name: item[nameKey] || item.name,
    value: Number(item[valueKey] || item.value || 0),
    ...item
  }));
};

export const calculatePercentages = (data, valueKey = 'value') => {
  const total = data.reduce((sum, item) => sum + (item[valueKey] || 0), 0);
  
  return data.map(item => ({
    ...item,
    percentage: total > 0 ? ((item[valueKey] / total) * 100).toFixed(1) : 0
  }));
};

export const generateChartColors = (count, baseColors = null) => {
  const defaultColors = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', 
    '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f59e0b'
  ];
  
  const colors = baseColors || defaultColors;
  const result = [];
  
  for (let i = 0; i < count; i++) {
    result.push(colors[i % colors.length]);
  }
  
  return result;
};

export const formatNumber = (num, options = {}) => {
  const {
    decimals = 0,
    suffix = '',
    prefix = '',
    locale = 'en-US'
  } = options;
  
  if (typeof num !== 'number') return num;
  
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
  
  return `${prefix}${formatted}${suffix}`;
};

export const exportChartData = (data, filename = 'chart-data') => {
  const csvContent = [
    ['Name', 'Value', 'Percentage'],
    ...data.map(item => [
      item.name,
      item.value,
      item.percentage || ((item.value / data.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(1)
    ])
  ].map(row => row.join(',')).join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
};

export const getColorByValue = (value, thresholds = { low: 30, medium: 70 }) => {
  if (value <= thresholds.low) return '#ef4444'; // red
  if (value <= thresholds.medium) return '#eab308'; // yellow
  return '#22c55e'; // green
};

export const aggregateDataByField = (data, field, valueField = 'value') => {
  const aggregated = {};
  
  data.forEach(item => {
    const key = item[field];
    if (!aggregated[key]) {
      aggregated[key] = { name: key, value: 0, count: 0 };
    }
    aggregated[key].value += item[valueField] || 0;
    aggregated[key].count += 1;
  });
  
  return Object.values(aggregated);
};

export const filterDataByDateRange = (data, startDate, endDate, dateField = 'timestamp') => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return data.filter(item => {
    const itemDate = new Date(item[dateField]);
    return itemDate >= start && itemDate <= end;
  });
};

export const sortDataByValue = (data, ascending = false) => {
  return [...data].sort((a, b) => {
    const aVal = a.value || 0;
    const bVal = b.value || 0;
    return ascending ? aVal - bVal : bVal - aVal;
  });
};