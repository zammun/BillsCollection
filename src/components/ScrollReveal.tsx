import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: string;
  className?: string; 
}

export default function ScrollReveal({ children, delay = "" , className = "" }: ScrollRevealProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      /* FIXED: Changed duration-700 to duration-1000 for a slower, more premium fade-in sweep */
      className={`transition-all duration-1000 ease-out transform ${delay} ${className}
        ${isIntersecting 
          ? "opacity-100 translate-y-0 filter blur-none" 
          : "opacity-0 translate-y-8 filter blur-[1px]"
        }`}
    >
      {children}
    </div>
  );
}