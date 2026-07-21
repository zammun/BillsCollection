import { useState, useRef, type ReactNode, type TouchEvent } from "react";

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh?: () => void;
}

const PULL_THRESHOLD = 80;

const PullToRefresh = ({ children, onRefresh }: PullToRefreshProps) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const touchStartY = useRef(0);
  const hasVibrated = useRef(false);

  const isAtTop = () => {
    return (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0) <= 0;
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (isAtTop()) {
      touchStartY.current = e.touches[0].clientY;
      hasVibrated.current = false;
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isAtTop() || touchStartY.current === 0) return;

    const currentY = e.touches[0].clientY;
    const distance = currentY - touchStartY.current;

    if (distance > 0) {
      const dampenedDistance = Math.min(distance * 0.45, 120);
      setPullDistance(dampenedDistance);

      if (dampenedDistance >= PULL_THRESHOLD && !hasVibrated.current) {
        if ("vibrate" in navigator) {
          navigator.vibrate(15);
        }
        hasVibrated.current = true;
      }
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance >= PULL_THRESHOLD) {
      setIsRefreshing(true);
      setPullDistance(50);
      
      setTimeout(() => {
        if (onRefresh) {
          onRefresh();
        } else {
          window.location.reload();
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
      className="relative min-h-screen overscroll-y-none"
    >
      {/* Elastic Pull Wrapper */}
      <div
        className="relative"
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: touchStartY.current === 0 ? "transform 0.3s cubic-bezier(0.1, 0.8, 0.3, 1)" : "none",
        }}
      >
        {/* FIXED: Loading Indicator is now attached inside the pulled wrapper at -top-12 
            so it reveals itself directly inside the gap pulled down underneath the navbar */}
        <div
          className="absolute -top-12 left-0 right-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: Math.min(pullDistance / PULL_THRESHOLD, 1),
          }}
        >
          <div
            className={`w-7 h-7 border-2 border-slate-900 border-t-transparent rounded-full shadow-md bg-white p-1 ${
              isRefreshing ? "animate-spin" : ""
            }`}
          />
        </div>

        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;