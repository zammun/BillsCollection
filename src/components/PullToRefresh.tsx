import { useRef, type ReactNode, type TouchEvent } from "react";

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh?: () => void;
}

const PULL_THRESHOLD = 80;

const PullToRefresh = ({ children, onRefresh }: PullToRefreshProps) => {
  const touchStartY = useRef(0);
  const currentPull = useRef(0);
  const hasVibrated = useRef(false);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);

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
      const dampened = Math.min(distance * 0.4, 110);
      currentPull.current = dampened;

      // Direct GPU transform update without React re-renders
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${dampened}px)`;
        contentRef.current.style.transition = "none";
      }

      if (spinnerRef.current) {
        spinnerRef.current.style.opacity = `${Math.min(dampened / PULL_THRESHOLD, 1)}`;
      }

      if (dampened >= PULL_THRESHOLD && !hasVibrated.current) {
        if ("vibrate" in navigator) navigator.vibrate(15);
        hasVibrated.current = true;
      }
    }
  };

  const handleTouchEnd = () => {
    if (currentPull.current >= PULL_THRESHOLD) {
      if (contentRef.current) {
        contentRef.current.style.transition = "transform 0.25s ease-out";
        contentRef.current.style.transform = "translateY(50px)";
      }

      if (spinnerRef.current) {
        spinnerRef.current.classList.add("animate-spin");
      }

      setTimeout(() => {
        if (onRefresh) {
          onRefresh();
        } else {
          window.location.reload();
        }
      }, 300);
    } else {
      if (contentRef.current) {
        contentRef.current.style.transition = "transform 0.25s ease-out";
        contentRef.current.style.transform = "translateY(0px)";
      }
    }

    touchStartY.current = 0;
    currentPull.current = 0;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-screen"
    >
      <div ref={contentRef} className="relative will-change-transform">
        {/* Loading Indicator */}
        <div
          ref={spinnerRef}
          className="absolute -top-12 left-0 right-0 flex items-center justify-center pointer-events-none opacity-0"
        >
          <div className="w-7 h-7 border-2 border-slate-900 border-t-transparent rounded-full shadow-md bg-white p-1" />
        </div>

        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;