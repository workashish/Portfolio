
import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Download, ArrowRight, Briefcase, Mail } from 'lucide-react';
import AnimatedText from './ui/AnimatedText';

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Particle class for background animation
  class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;

    constructor(canvas: HTMLCanvasElement) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.color = `hsla(var(--primary), ${Math.random() * 0.3})`;
    }

    update(canvas: HTMLCanvasElement) {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width) this.x = 0;
      else if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      else if (this.y < 0) this.y = canvas.height;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);

    // Initialize canvas for particle animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Initialize particles
      particlesRef.current = [];
      for (let i = 0; i < 100; i++) {
        particlesRef.current.push(new Particle(canvas));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        particle.update(canvas);
        particle.draw(ctx);
      });

      // Draw connections between particles
      ctx.strokeStyle = 'hsla(var(--primary), 0.05)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      window.scrollTo({
        top: projectsSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const roles = [
    "Full-Stack Developer",
    "React Specialist",
    "UI/UX Architect",
    "Digital Innovator"
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particle canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>

      {/* 3D geometric shapes */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>

      {/* Content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="text-left order-2 md:order-1">
            <div
              className={`transition-all duration-700 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Available for new opportunities
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-heading leading-tight">
                Hi, I'm <span className="text-gradient">Ashish Pathak</span>
              </h1>

              <div className="text-xl md:text-2xl lg:text-3xl font-heading mb-6 h-10">
                <AnimatedText texts={roles} className="inline-block" />
              </div>

              <p className="text-muted-foreground text-lg max-w-xl mb-8">
                I craft intuitive, enterprise-grade web applications with modern technologies and pixel-perfect design that drive business growth and enhance user experiences.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={scrollToProjects}
                  className="btn-primary group"
                >
                  View Portfolio
                  <Briefcase size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={scrollToContact}
                  className="btn-outline group"
                >
                  Contact Me
                  <Mail size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>


            </div>
          </div>

          {/* Right column - 3D illustration or image */}
          <div className="relative order-1 md:order-2 flex justify-center">
            <div
              className={`transition-all duration-1000 delay-300 transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                {/* 3D-like layered effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-lg"></div>
                <div className="absolute inset-8 bg-gradient-to-br from-primary/40 to-accent/40 rounded-full blur-md"></div>

                {/* Profile image with border */}
                <div className="absolute inset-12 rounded-full overflow-hidden border-4 border-white/50 shadow-2xl">
                  <img
                    src="https://avatars.githubusercontent.com/u/161757546?v=4"
                    alt="Ashish Pathak"
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent/10 rounded-full animate-pulse delay-300"></div>
                <div className="absolute top-1/2 -right-8 w-8 h-8 bg-white/10 rounded-full animate-pulse delay-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-primary" size={32} />
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
    </section>
  );
};
