import { useState, useRef, type ReactNode, type TouchEvent } from "react";

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh?: () => void;
}

const PULL_THRESHOLD = 80; // Distance in px needed to trigger refresh

const PullToRefresh = ({ children, onRefresh }: PullToRefreshProps) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const touchStartY = useRef(0);
  const hasVibrated = useRef(false);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (window.scrollY === 0) {
      touchStartY.current = e.touches[0].clientY;
      hasVibrated.current = false;
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (window.scrollY > 0 || touchStartY.current === 0) return;

    const currentY = e.touches[0].clientY;
    const distance = currentY - touchStartY.current;

    if (distance > 0) {
      // Add resistance so pulling feels elastic
      const dampenedDistance = Math.min(distance * 0.4, 120);
      setPullDistance(dampenedDistance);

      // Trigger haptic vibration once when crossing threshold
      if (dampenedDistance >= PULL_THRESHOLD && !hasVibrated.current) {
        if ("vibrate" in navigator) {
          navigator.vibrate(15); // Small 15ms haptic buzz
        }
        hasVibrated.current = true;
      }
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance >= PULL_THRESHOLD) {
      setIsRefreshing(true);
      setPullDistance(50); // Lock visual position while reloading
      
      setTimeout(() => {
        if (onRefresh) {
          onRefresh();
        } else {
          window.location.reload(); // Reload page
        }
      }, 300);
    } else {
      setPullDistance(0);
    }
    touchStartY.current = 0;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-screen"
    >
      {/* Loading Indicator */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-center z-50 pointer-events-none"
        style={{
          height: `${pullDistance}px`,
          opacity: Math.min(pullDistance / PULL_THRESHOLD, 1),
        }}
      >
        <div
          className={`w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full ${
            isRefreshing ? "animate-spin" : ""
          }`}
        />
      </div>

      {/* Elastic Pull Wrapper */}
      <div
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: touchStartY.current === 0 ? "transform 0.3s ease-out" : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;