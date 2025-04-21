import { useEffect, useState, useRef } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  avatar?: string;
  rating: number;
  text: string;
}

export const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "VP of Digital",
      company: "Global Retail Inc.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      text: "Working with Ashish was a game-changer for our digital transformation. His technical expertise combined with strategic thinking helped us implement solutions that significantly improved our customer experience and operational efficiency."
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "CTO",
      company: "FinTech Solutions",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      rating: 5,
      text: "Ashish's work on our platform redesign exceeded our expectations. He has a rare combination of technical depth, design sensibility, and business acumen. The solutions he delivered were not only technically sound but also aligned perfectly with our business goals."
    },
    {
      id: 3,
      name: "Alexandra Rivera",
      position: "Head of Product",
      company: "TechCorp",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 5,
      text: "I've worked with many developers, but Ashish stands out for his attention to detail and commitment to quality. He doesn't just write code; he solves problems and thinks about the long-term implications of technical decisions."
    },
    {
      id: 4,
      name: "David Kim",
      position: "Founder",
      company: "StartupX",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 5,
      text: "As a startup founder, finding a developer who understands both technical and business aspects is crucial. Ashish not only delivered a robust technical solution but also provided valuable insights that helped shape our product strategy."
    },
    {
      id: 5,
      name: "Emily Watson",
      position: "Director of UX",
      company: "Design Innovations",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      rating: 5,
      text: "Ashish's collaborative approach made our project a success. He seamlessly integrated with our design team, providing technical guidance while respecting our creative vision. The result was a beautiful, performant product that our users love."
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
    if (autoplay) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplay, testimonials.length]);

  const handlePrev = () => {
    setAutoplay(false);
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setAutoplay(false);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setAutoplay(false);
    setActiveIndex(index);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-12 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl -z-10"></div>

      <div className="section-container">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Quote size={14} className="mr-2" />
            Testimonials
          </div>
          <h2 className="section-title mx-auto">What Clients Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Don't just take my word for it. Here's what clients and collaborators have to say about working with me.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className={cn(
                    "border-border/40 bg-card/50 backdrop-blur-sm h-full",
                    "transition-all duration-700",
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  )}>
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-14 w-14 border-2 border-primary/20">
                            {testimonial.avatar ? (
                              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            ) : (
                              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <h4 className="font-bold text-lg">{testimonial.name}</h4>
                            <p className="text-muted-foreground text-sm">
                              {testimonial.position}, {testimonial.company}
                            </p>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="relative">
                        <Quote className="absolute -top-2 -left-2 text-primary/10 h-8 w-8" />
                        <p className="text-muted-foreground relative z-10 pl-4">
                          "{testimonial.text}"
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                className="rounded-full"
              >
                <ChevronLeft size={18} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="rounded-full"
              >
                <ChevronRight size={18} />
              </Button>
            </div>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeIndex === index
                      ? 'bg-primary w-6'
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Logos */}
        <div className="mt-20">
          <p className="text-center text-muted-foreground text-sm mb-8">Trusted by leading companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {['Microsoft', 'Google', 'Amazon', 'Adobe', 'IBM'].map((company) => (
              <div
                key={company}
                className="text-2xl font-bold text-muted-foreground/50 hover:text-primary transition-colors"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
