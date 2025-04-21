
import { useEffect, useState, useRef } from 'react';
import { Filter, Grid3X3, LayoutGrid, Rows3, ArrowUpRight, Briefcase } from 'lucide-react';
import { ProjectCard } from './ui/ProjectCard';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

type ProjectType = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  liveDemo?: string;
  category: string;
  date?: string;
  client?: string;
  role?: string;
  featured?: boolean;
  detailedDescription?: string;
  features?: string[];
  challenges?: string[];
  outcomes?: string[];
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    company: string;
  };
  additionalImages?: string[];
};

export const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const sectionRef = useRef<HTMLElement>(null);

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

  const projects: ProjectType[] = [
    {
      title: "Enterprise E-Commerce Platform",
      description: "A full-featured e-commerce platform with product listings, shopping cart, payment integration, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2089&q=80",
      technologies: ["React.js", "Node.js", "Express", "MongoDB", "AWS"],
      category: "Web Development",
      github: "https://github.com/workashish",
      liveDemo: "https://ashishpathak.dev",
      date: "Jan 2023",
      client: "Global Retail Inc.",
      role: "Lead Frontend Developer",
      featured: true,
      detailedDescription: "Developed a comprehensive e-commerce solution for a global retail client that needed to unify their online presence across multiple regions. The platform supports multiple languages, currencies, and regional pricing strategies.",
      features: [
        "Multi-region support with localization",
        "Advanced product filtering and search",
        "Real-time inventory management",
        "Secure payment processing with multiple gateways",
        "Comprehensive admin dashboard with analytics"
      ],
      challenges: [
        "Implementing a scalable architecture to handle peak traffic periods",
        "Ensuring consistent user experience across different regions",
        "Integrating with legacy inventory systems"
      ],
      outcomes: [
        "Increased online sales by 45% within first quarter",
        "Reduced cart abandonment rate by 30%",
        "Improved page load times by 60%"
      ],
      testimonial: {
        quote: "The e-commerce platform delivered by Ashish's team transformed our online business. The attention to detail and performance optimization exceeded our expectations.",
        author: "Sarah Johnson",
        position: "VP of Digital",
        company: "Global Retail Inc."
      },
      additionalImages: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      ]
    },
    {
      title: "DigiLocker UI-UX Enhancement",
      description: "Redesigned the DigiLocker interface for improved user experience, focusing on accessibility and intuitive navigation.",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      technologies: ["Figma", "Adobe XD", "Prototyping", "User Research", "Accessibility"],
      category: "UI/UX Design",
      github: "https://github.com/workashish",
      liveDemo: "https://ashishpathak.dev/projects/digilocker",
      date: "Mar 2023",
      client: "FinTech Solutions",
      role: "UX Lead",
      featured: true,
      detailedDescription: "Led a comprehensive redesign of the DigiLocker platform, a secure document storage solution used by over 2 million users. The project focused on improving accessibility, simplifying navigation, and modernizing the visual design.",
      features: [
        "Accessibility-first design approach",
        "Simplified document categorization system",
        "Intuitive search and filter capabilities",
        "Dark mode and customizable themes",
        "Responsive design for all device types"
      ],
      challenges: [
        "Balancing security requirements with usability",
        "Accommodating a diverse user base with varying technical abilities",
        "Maintaining familiarity for existing users while improving the interface"
      ],
      outcomes: [
        "Improved user satisfaction scores by 42%",
        "Reduced support tickets related to UI issues by 65%",
        "Increased average session duration by 28%"
      ],
      testimonial: {
        quote: "The redesigned interface has transformed how our users interact with the platform. The thoughtful approach to accessibility and user experience has made a significant impact.",
        author: "Michael Chen",
        position: "Product Director",
        company: "FinTech Solutions"
      }
    },
    {
      title: "Smart Real Estate Platform",
      description: "A web application for real estate listings with advanced filtering, user authentication, and admin analytics.",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Google Maps API"],
      category: "Web Development",
      github: "https://github.com/workashish",
      liveDemo: "https://ashishpathak.dev/projects/realestate",
      date: "Jun 2023",
      client: "PropertyTech Inc.",
      role: "Full Stack Developer",
      detailedDescription: "Developed a comprehensive real estate platform that connects property buyers with sellers and agents. The platform features advanced search capabilities, virtual tours, and integrated analytics for property market trends.",
      features: [
        "AI-powered property recommendations",
        "Interactive map-based property search",
        "Virtual property tours integration",
        "Mortgage calculator and financing options",
        "Agent-client messaging system"
      ],
      challenges: [
        "Implementing real-time property updates and notifications",
        "Optimizing search performance with complex filtering options",
        "Ensuring data accuracy across multiple listing sources"
      ],
      outcomes: [
        "Platform adopted by 150+ real estate agencies",
        "Average property listing time reduced by 35%",
        "Mobile engagement increased by 48%"
      ]
    }
  ];

  const categories = [
    'All',
    'Web Development',
    'UI/UX Design'
  ];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.category === filter);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-12 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl -z-10"></div>

      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Briefcase size={14} className="mr-2" />
              Portfolio
            </div>
            <h2 className="section-title">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mt-4">
              Explore a selection of my professional work across various industries and technologies.
              Each project represents a unique challenge and innovative solution.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="gap-2"
            >
              <LayoutGrid size={16} />
              Grid
            </Button>
            <Button
              variant={viewMode === 'masonry' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('masonry')}
              className="gap-2"
            >
              <Rows3 size={16} />
              Masonry
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-background">All Projects</TabsTrigger>
              <TabsTrigger value="featured" className="data-[state=active]:bg-background">Featured</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-md">
              <Filter size={16} className="ml-2 text-muted-foreground" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-transparent border-none text-sm focus:outline-none focus:ring-0 py-2 pr-8 pl-1"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className={cn(
              "grid gap-8",
              viewMode === 'grid'
                ? "sm:grid-cols-2 lg:grid-cols-3"
                : "sm:grid-cols-2 lg:grid-cols-3 lg:[&>*:nth-child(3n+1)]:col-span-2 lg:[&>*:nth-child(3n+3)]:row-span-2"
            )}>
              {filteredProjects.map((project, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    technologies={project.technologies}
                    github={project.github}
                    liveDemo={project.liveDemo}
                    category={project.category}
                    date={project.date}
                    client={project.client}
                    role={project.role}
                    detailedDescription={project.detailedDescription}
                    features={project.features}
                    challenges={project.challenges}
                    outcomes={project.outcomes}
                    testimonial={project.testimonial}
                    additionalImages={project.additionalImages}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="mt-0">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    technologies={project.technologies}
                    github={project.github}
                    liveDemo={project.liveDemo}
                    category={project.category}
                    date={project.date}
                    client={project.client}
                    role={project.role}
                    detailedDescription={project.detailedDescription}
                    features={project.features}
                    challenges={project.challenges}
                    outcomes={project.outcomes}
                    testimonial={project.testimonial}
                    additionalImages={project.additionalImages}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center mt-12">
          <Button variant="outline" size="lg" className="gap-2 group">
            View All Projects
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
