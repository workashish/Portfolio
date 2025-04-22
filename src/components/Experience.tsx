
import { useEffect, useState, useRef } from 'react';
import { BriefcaseIcon, Calendar } from 'lucide-react';

export const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const experience = [
    {
      company: "Incredible India Techxpert Pvt. Ltd.",
      position: "Full Stack Web Developer Intern",
      duration: "Dec 2022 - Apr 2023",
      description: "Led the front-end development of e-commerce features, improving workflows and implementing responsive designs using modern web technologies.",
      technologies: ["HTML", "CSS", "JavaScript", ".NET MVC", "MySQL"],
      achievements: [
        "Built e-commerce features that improved user experience and conversion rates",
        "Optimized database queries resulting in 25% faster page loads",
        "Collaborated with the design team to implement responsive layouts"
      ]
    }
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-8 bg-secondary/30"
    >
      <div className="section-container">
        <div className="text-center mb-8">
          <h2 className="section-title mx-auto">Internship Experience</h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transition-all duration-1000 ease-out ${
              isVisible ? 'h-full' : 'h-0'
            }`}
          ></div>

          <div className="space-y-12">
            {experience.map((item, index) => (
              <div key={index} className="relative z-10">
                {/* Timeline circle */}
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center border-4 border-background transition-all duration-500 ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                  style={{ transitionDelay: `${600}ms` }}
                >
                  <BriefcaseIcon className="text-primary-foreground" size={20} />
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                  {/* Left side - Company & Position */}
                  <div
                    className={`text-right transition-all duration-700 ${
                      isVisible
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-12'
                    }`}
                    style={{ transitionDelay: `${index * 200 + 300}ms` }}
                  >
                    <div className="bg-card p-6 rounded-lg shadow-md inline-block">
                      <h3 className="text-xl font-bold font-heading">{item.company}</h3>
                      <h4 className="text-primary font-medium">{item.position}</h4>
                      <div className="flex items-center justify-end mt-2 text-muted-foreground">
                        <Calendar size={16} className="mr-1" />
                        <span className="text-sm">{item.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Description & Achievements */}
                  <div
                    className={`transition-all duration-700 ${
                      isVisible
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-12'
                    }`}
                    style={{ transitionDelay: `${index * 200 + 600}ms` }}
                  >
                    <div className="bg-card p-6 rounded-lg shadow-md">
                      <p className="mb-4">{item.description}</p>

                      <div className="mb-4">
                        <h5 className="font-semibold mb-2">Technologies:</h5>
                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((tech, idx) => (
                            <span key={idx} className="px-2 py-1 bg-secondary text-xs rounded-md">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-semibold mb-2">Key Achievements:</h5>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {item.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
