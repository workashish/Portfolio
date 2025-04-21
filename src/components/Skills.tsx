
import { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Code, Cpu, Database, Layout, Lightbulb, Layers, Wrench, Server, Globe, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
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

  // Define skill categories and their skills
  const skillCategories = [
    {
      id: 'languages',
      title: 'Languages',
      icon: <Code className="h-4 w-4" />,
      skills: [
        { name: 'JavaScript/TypeScript', level: 90, experience: '5+ years' },
        { name: 'Python', level: 85, experience: '4+ years' },
        { name: 'Java', level: 75, experience: '3+ years' },
        { name: 'C/C++', level: 70, experience: '3+ years' },
        { name: 'PHP', level: 65, experience: '2+ years' },
      ],
    },
    {
      id: 'frontend',
      title: 'Frontend',
      icon: <Layout className="h-4 w-4" />,
      skills: [
        { name: 'React & Next.js', level: 95, experience: '4+ years' },
        { name: 'HTML5/CSS3', level: 90, experience: '5+ years' },
        { name: 'Tailwind CSS', level: 85, experience: '3+ years' },
        { name: 'Angular', level: 65, experience: '1+ year' },
        { name: 'UI/UX Design', level: 80, experience: '3+ years' },
      ],
    },
    {
      id: 'backend',
      title: 'Backend',
      icon: <Server className="h-4 w-4" />,
      skills: [
        { name: 'Node.js/Express', level: 90, experience: '4+ years' },
        { name: 'Laravel', level: 70, experience: '2+ years' },
      ],
    },
    {
      id: 'database',
      title: 'Database',
      icon: <Database className="h-4 w-4" />,
      skills: [
        { name: 'MongoDB', level: 90, experience: '4+ years' },
        { name: 'MySQL', level: 80, experience: '5+ years' },
        { name: 'Firebase', level: 85, experience: '3+ years' },
      ],
    },
    {
      id: 'devops',
      title: 'DevOps',
      icon: <Cpu className="h-4 w-4" />,
      skills: [
        { name: 'Docker', level: 85, experience: '3+ years' },
        { name: 'AWS', level: 80, experience: '3+ years' },
        { name: 'Git/GitHub', level: 95, experience: '5+ years' },
        { name: 'Linux', level: 85, experience: '4+ years' },
      ],
    },
  ];

  // Filter skills based on active category
  const filteredCategories = activeCategory === 'all'
    ? skillCategories
    : skillCategories.filter(category => category.id === activeCategory);

  // Function to get level color
  const getLevelColor = (level: number) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 80) return 'bg-emerald-500';
    if (level >= 70) return 'bg-blue-500';
    if (level >= 60) return 'bg-violet-500';
    return 'bg-slate-500';
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-12 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl -z-10"></div>

      <div className="section-container">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Lightbulb size={14} className="mr-2" />
            Skills & Expertise
          </div>
          <h2 className="section-title mx-auto">My Technical Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            I've worked with a variety of technologies and tools throughout my career.
            Here's a comprehensive overview of my technical expertise.
          </p>
        </div>

        <div className="mb-10 flex justify-center">
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full max-w-3xl">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
              <TabsTrigger value="all" className="flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                All
              </TabsTrigger>
              {skillCategories.map(category => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center">
                  {category.icon}
                  <span className="ml-2 hidden sm:inline">{category.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredCategories.map((category, categoryIndex) => (
            <Card
              key={category.id}
              className={cn(
                "border border-border/50 shadow-sm hover:shadow-md transition-all duration-500",
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              )}
              style={{ transitionDelay: `${categoryIndex * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, index) => (
                    <div key={`${category.id}-${skill.name}`} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{skill.name}</span>
                          {skill.level >= 90 && (
                            <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
                              <CheckCircle className="h-3 w-3 mr-1" /> Expert
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{skill.experience}</span>
                      </div>
                      <div className="relative h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full transition-all duration-1000", getLevelColor(skill.level))}
                          style={{
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${(categoryIndex * 100) + (index * 100)}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" className="gap-2">
            <Code className="h-4 w-4" />
            View My GitHub Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Skills;
