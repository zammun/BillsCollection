import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: string;
  className?: string; 
}

export default function ScrollReveal({ children, delay = "", className = "" }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Sets to true when entering the screen, false when leaving
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      // duration-1000 slows down the animation to 1 second
      className={`transition-all duration-1500 ease-out transform-gpu ${delay} ${className}
        ${isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-4 pointer-events-none"
        }`}
    >
      {children}
    </div>
  );
}