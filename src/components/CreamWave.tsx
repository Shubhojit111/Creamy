import React from 'react';

interface CreamWaveProps {
  className?: string;
  fillColor?: string;
}

interface TileProps {
  fill: string;
  width: number;
  base: number;
  amp: number;
}

/**
 * One seamless wave tile with 4 humps. Starts and ends at the same height
 * with matching tangents, so two identical tiles loop without a visible seam.
 * Each layer MUST animate only within [-50%, 0] of its own (2-tile) width —
 * drifting any further uncovers the edge and the loop visibly "breaks".
 */
const WaveTile: React.FC<TileProps> = ({ fill, width, base, amp }) => {
  const seg = width / 4;
  const d =
    `M 0 ${base} ` +
    `Q ${seg / 2} ${base + amp} ${seg} ${base} ` +
    `T ${seg * 2} ${base} T ${seg * 3} ${base} T ${width} ${base} ` +
    `L ${width} 400 L 0 400 Z`;
  return (
    <svg
      viewBox={`0 0 ${width} 400`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="h-full block shrink-0"
      style={{ width }}
    >
      <path d={d} fill={fill} />
    </svg>
  );
};

export const CreamWave: React.FC<CreamWaveProps> = ({
  className = '',
  fillColor = '#FFF5D6',
}) => {
  return (
    <div className={`pointer-events-none w-full overflow-hidden relative ${className}`}>
      {/* back highlight wave — wide tile, slow drift */}
      <div className="absolute inset-0 opacity-50 translate-y-3">
        <div className="flex w-max h-full wave-drift-slow">
          <WaveTile fill="rgba(255,255,255,0.65)" width={1120} base={190} amp={-80} />
          <WaveTile fill="rgba(255,255,255,0.65)" width={1120} base={190} amp={-80} />
        </div>
      </div>
      {/* icy shimmer riding the crest — narrow tile, own rhythm */}
      <div className="absolute inset-0 opacity-30 translate-y-6">
        <div className="flex w-max h-full wave-drift-shimmer">
          <WaveTile fill="rgba(207,244,255,0.7)" width={960} base={150} amp={80} />
          <WaveTile fill="rgba(207,244,255,0.7)" width={960} base={150} amp={80} />
        </div>
      </div>
      {/* front cream wave — faster drift */}
      <div className="absolute inset-0">
        <div className="flex w-max h-full wave-drift-fast">
          <WaveTile fill={fillColor} width={1440} base={150} amp={80} />
          <WaveTile fill={fillColor} width={1440} base={150} amp={80} />
        </div>
      </div>
    </div>
  );
};
