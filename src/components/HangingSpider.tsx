import React from "react";

export const HangingSpider = ({ className = "" }: { className?: string }) => {
  return (
    <svg viewBox="0 0 200 300" className={className}>
      {/* Thread */}
      <line x1="100" y1="0" x2="100" y2="80" stroke="currentColor" strokeWidth="4" />

      {/* Spider fill color */}
      <g fill="currentColor" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        {/* Large upper body (abdomen) */}
        <circle cx="100" cy="120" r="40" stroke="none" />

        {/* Smaller lower body (cephalothorax) */}
        <circle cx="100" cy="180" r="25" stroke="none" />

        {/* Fangs */}
        <line x1="85" y1="200" x2="85" y2="225" />
        <line x1="115" y1="200" x2="115" y2="225" />

        {/* Left Legs */}
        {/* L1 (top) */}
        <polyline points="70,140 40,110 50,60" fill="none" />
        {/* L2 */}
        <polyline points="65,155 20,155 30,190" fill="none" />
        {/* L3 */}
        <polyline points="70,175 40,200 40,240" fill="none" />
        {/* L4 (bottom) */}
        <polyline points="80,195 50,240 70,280" fill="none" />

        {/* Right Legs */}
        {/* R1 (top) */}
        <polyline points="130,140 160,110 150,60" fill="none" />
        {/* R2 */}
        <polyline points="135,155 180,155 170,190" fill="none" />
        {/* R3 */}
        <polyline points="130,175 160,200 160,240" fill="none" />
        {/* R4 (bottom) */}
        <polyline points="120,195 150,240 130,280" fill="none" />
      </g>
    </svg>
  );
};
