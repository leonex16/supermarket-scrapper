import React from 'react';

export function ProductCardLoader () {
  return (
    <svg
      width={250}
      height={490}
      aria-labelledby='loading-aria'
      viewBox='0 0 250 490'
      preserveAspectRatio='none'
    >
      <rect
        width={250}
        height='100%'
        clipPath='url(#a)'
        style={{
          fill: 'url(#b)'
        }}
      />
      <defs>
        <linearGradient id='b'>
          <stop offset={0.6} stopColor='#eee'>
            <animate
              attributeName='offset'
              values='-2; -2; 1'
              keyTimes='0; 0.25; 1'
              dur='2s'
              repeatCount='indefinite'
            />
          </stop>
          <stop offset={1.6} stopColor='#D1D8E0'>
            <animate
              attributeName='offset'
              values='-1; -1; 2'
              keyTimes='0; 0.25; 1'
              dur='2s'
              repeatCount='indefinite'
            />
          </stop>
          <stop offset={2.6} stopColor='#eee'>
            <animate
              attributeName='offset'
              values='0; 0; 3'
              keyTimes='0; 0.25; 1'
              dur='2s'
              repeatCount='indefinite'
            />
          </stop>
        </linearGradient>
        <clipPath id='a'>
          <rect x={0} y={0} rx={8} ry={8} width={250} height={5} />
          <rect x={0} y={0} rx={8} ry={8} width={5} height={490} />
          <rect x={0} y={485} rx={8} ry={8} width={250} height={5} />
          <rect x={245} y={0} rx={8} ry={8} width={5} height={490} />
          <rect x={20} y={24} rx={8} ry={8} width={210} height={250} />
          <rect x={20} y={290} rx={8} ry={8} width={105} height={12} />
          <rect x={20} y={328} rx={8} ry={8} width={150} height={12} />
          <rect x={20} y={355} rx={8} ry={8} width={171} height={12} />
          <rect x={20} y={395} rx={8} ry={8} width={70} height={12} />
          <rect x={20} y={435} rx={8} ry={8} width={210} height={40} />
          <circle cx={100} cy={401} r={6} />
        </clipPath>
      </defs>
    </svg>
  );
}
