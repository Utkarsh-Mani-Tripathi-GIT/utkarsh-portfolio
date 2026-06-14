import React from "react";

export const SpideyMask = ({
  className = "",
}: {
  className?: string;
  animate?: boolean; // kept for backwards compatibility
  drawDuration?: number; // kept for backwards compatibility
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
    >
      <g fill="currentColor">
        {/* Central Body (Head & Abdomen) */}
        <path d="
          M 50 16 
          L 53 13 L 56 16 
          C 58 20, 56 24, 53 26 
          L 58 35 L 53 62 L 50 58
          L 47 62 L 42 35 L 47 26
          C 44 24, 42 20, 44 16
          L 47 13 Z
        "/>

        {/* Right Legs */}
        <path d="M 56 26 Q 62 14 68 12 Q 74 25 75 45 Q 68 25 66 22 Q 62 26 58 30 Z" />
        <path d="M 58 30 Q 66 24 72 22 Q 80 40 80 55 Q 73 35 70 30 Q 65 32 60 34 Z" />
        <path d="M 59 36 Q 68 35 75 35 Q 85 55 88 70 Q 80 50 75 42 Q 68 40 59 39 Z" />
        <path d="M 58 43 Q 66 48 72 52 Q 78 70 75 90 Q 70 65 65 58 Q 62 50 56 48 Z" />

        {/* Left Legs */}
        <path d="M 44 26 Q 38 14 32 12 Q 26 25 25 45 Q 32 25 34 22 Q 38 26 42 30 Z" />
        <path d="M 42 30 Q 34 24 28 22 Q 20 40 20 55 Q 27 35 30 30 Q 35 32 40 34 Z" />
        <path d="M 41 36 Q 32 35 25 35 Q 15 55 12 70 Q 20 50 25 42 Q 32 40 41 39 Z" />
        <path d="M 42 43 Q 34 48 28 52 Q 22 70 25 90 Q 30 65 35 58 Q 38 50 44 48 Z" />
      </g>
    </svg>
  );
};
