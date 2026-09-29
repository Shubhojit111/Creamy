import React from 'react';

interface CreamWaveProps {
  className?: string;
  fillColor?: string;
}

const TILE = 1440;

/** One seamless wave tile — starts & ends at the same height so it loops perfectly */
const WaveTile: React.FC<{ fill: string; flip?: boolean }> = ({ fill, flip }) => (
  <svg
    viewBox={`0 0 ${TILE} 400`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    className="h-full block shrink-0"
    style={{ width: TILE }}
  >
    <path
      d={
        flip
          ? `M 0 190 Q 180 110 360 190 T 720 190 T 1080 190 T ${TILE} 190 L ${TILE} 400 L 0 400 Z`
          : `M 0 150 Q 180 230 360 150 T 720 150 T 1080 150 T ${TILE} 150 L ${TILE} 400 L 0 400 Z`
      }
      fill={fill}
    />
  </svg>
);

export const CreamWave: React.FC<CreamWaveProps> = ({
  className = '',
  fillColor = '#FFF5D6',
}) => {
  return (
    <div className={`pointer-events-none w-full overflow-hidden relative ${className}`}>
      {/* back highlight wave — slow drift */}
      <div className="absolute inset-0 opacity-50 translate-y-3">
        <div className="flex w-max h-full wave-drift-slow">
          <WaveTile fill="rgba(255,255,255,0.65)" flip />
          <WaveTile fill="rgba(255,255,255,0.65)" flip />
        </div>
      </div>
      {/* icy shimmer riding the crest */}
      <div className="absolute inset-0 opacity-30 translate-y-6">
        <div className="flex w-max h-full wave-drift-slow">
          <WaveTile fill="rgba(207,244,255,0.7)" />
          <WaveTile fill="rgba(207,244,255,0.7)" />
        </div>
      </div>
      {/* front cream wave — faster drift */}
      <div className="absolute inset-0">
        <div className="flex w-max h-full wave-drift-fast">
          <WaveTile fill={fillColor} />
          <WaveTile fill={fillColor} />
        </div>
      </div>
    </div>
  );
};
