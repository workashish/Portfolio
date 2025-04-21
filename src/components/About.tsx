
import { useEffect, useState, useRef } from 'react';

export const About = () => {
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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-12 bg-secondary/30"
    >
      <div className="section-container">
        <div className="text-center mb-8">
          <h2 className="section-title mx-auto">About Me</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-x-[-30px]'}`}>
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full mx-auto overflow-hidden border-4 border-primary/20">
                <img
                  src="https://avatars.githubusercontent.com/u/161757546?v=4"
                  alt="Ashish Pathak"
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full z-[-1]"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/10 rounded-full z-[-1]"></div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-x-[30px]'}`}>
            <h3 className="text-2xl font-bold mb-4 font-heading">
              I'm Ashish, a problem-solver with expertise in modern web technologies.
            </h3>

            <p className="text-muted-foreground mb-6">
              I craft intuitive, performant web apps and thrive in collaborative Agile environments.
              My passion lies in creating clean, efficient code that delivers exceptional user experiences.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                </div>
                <div>
                  <h4 className="font-bold">Technical Expertise</h4>
                  <p className="text-sm text-muted-foreground">
                    Proficient in C, C++, JavaScript, React, PHP and modern web technologies.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </div>
                <div>
                  <h4 className="font-bold">UI/UX Design</h4>
                  <p className="text-sm text-muted-foreground">
                    Creating intuitive interfaces with focus on usability, accessibility, and aesthetics.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M16 10h4a2 2 0 0 1 0 4h-4"></path><path d="M5 14h4a2 2 0 0 0 0-4H5"></path><path d="M8.5 2h7a2.5 2.5 0 0 1 0 5h-7A2.5 2.5 0 0 1 8.5 2z"></path><path d="M8.5 17h7a2.5 2.5 0 0 1 0 5h-7a2.5 2.5 0 0 1 0-5z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold">Collaborative Approach</h4>
                  <p className="text-sm text-muted-foreground">
                    Thrives in team environments with strong communication and problem-solving skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
