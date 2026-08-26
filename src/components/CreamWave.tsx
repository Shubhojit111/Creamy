import React from 'react';

interface CreamWaveProps {
  className?: string;
  fillColor?: string;
}

export const CreamWave: React.FC<CreamWaveProps> = ({
  className = '',
  fillColor = '#FFF5D6',
}) => {
  return (
    <div className={`pointer-events-none w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1200 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-full block"
      >
        <path
          d="M 0 85 
             C 140 85, 200 135, 300 125 
             C 390 115, 430 25, 510 20 
             C 590 15, 630 130, 730 125 
             C 830 120, 900 45, 1000 50 
             C 1100 55, 1150 110, 1200 120 
             L 1200 400 
             L 0 400 
             Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};
