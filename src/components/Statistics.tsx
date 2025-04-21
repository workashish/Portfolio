import { useEffect, useState, useRef } from 'react';
import { Code, Users, Award, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Statistic {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

export const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  const statistics: Statistic[] = [
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      value: 150,
      label: "Projects Completed",
      prefix: "+"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      value: 50,
      label: "Satisfied Clients",
      prefix: "+"
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      value: 99,
      label: "Success Rate",
      suffix: "%"
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      value: 8,
      label: "Years Experience",
      prefix: "+"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      
      const duration = 2000; // 2 seconds
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      
      let frame = 0;
      const countUp = () => {
        frame++;
        const progress = frame / totalFrames;
        const easedProgress = easeOutQuad(progress);
        
        setCounts(statistics.map(stat => Math.floor(easedProgress * stat.value)));
        
        if (frame < totalFrames) {
          requestAnimationFrame(countUp);
        } else {
          setCounts(statistics.map(stat => stat.value));
        }
      };
      
      requestAnimationFrame(countUp);
    }
  }, [isVisible, statistics]);

  // Easing function for smoother animation
  const easeOutQuad = (t: number) => t * (2 - t);

  return (
    <section
      ref={sectionRef}
      className="py-16 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <div 
              key={index}
              className={cn(
                "flex flex-col items-center text-center transition-all duration-700",
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="mb-4 p-4 rounded-full bg-primary/10">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
                {stat.prefix && <span>{stat.prefix}</span>}
                <span>{counts[index]}</span>
                {stat.suffix && <span>{stat.suffix}</span>}
              </h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
