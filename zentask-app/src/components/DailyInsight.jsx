import React from 'react';

const DailyInsight = () => {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="h-48 relative">
        <img 
          className="w-full h-full object-cover" 
          alt="A serene minimalist landscape illustration" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4dVd_T2hZwBSNromNSAnrD8WM2RY0xGSBdVE5-XzyWEHBPj9oQFMIJEpMXnBtaVzl_79t3DR3oQD_02wJBMo_xGktIwtyuD8sCAGpptcRihoA7U-kAwZ33REGbjc-cYGSY6SfcYLs4ORmto_9FzIn0QcU0bLpkGlC8tJPzGihFymVmv6nyFXQth-YOKGANcVRzLZ4XW_7wl6RZbAS_ATUHOIp8d_YGncfucUpX6fuADJbBTVJ8DuR"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
      </div>
      <div className="p-md text-center">
        <p className="font-label-md text-label-md text-primary mb-xs">Daily Insight</p>
        <p className="text-on-surface-variant font-body-md text-body-md italic">"Focus on being productive instead of busy."</p>
      </div>
    </div>
  );
};

export default DailyInsight;
