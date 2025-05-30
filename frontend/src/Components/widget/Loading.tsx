import React from 'react';

const BarLoader = ({ color = 'bg-blue-500', width = 'w-16' }: { color?: string; width?: string }) => {
  return (
    <div className={`${width} h-1.5 rounded-full overflow-hidden bg-gray-200`}>
      <div className={`h-full ${color} animate-progress`} />
    </div>
  );
};

export default BarLoader;