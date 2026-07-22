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
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform,filter] duration-1000 ease-out transform-gpu ${delay} ${className}
        ${isVisible 
          ? "opacity-100 translate-y-0 blur-none" 
          : "opacity-0 translate-y-6 blur-[1px]"
        }`}
    >
      {children}
    </div>
  );
}