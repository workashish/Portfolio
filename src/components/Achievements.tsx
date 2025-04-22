import { useEffect, useState, useRef } from 'react';
import { Award, Calendar, ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';

interface Achievement {
  title: string;
  event: string;
  organizer: string;
  date: string;
  description: string;
  position: string;
  images: {
    url: string;
    alt: string;
  }[];
  link?: string;
}

export const Achievements = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
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

  const achievements: Achievement[] = [
    {
      title: "Blockchain-based Solution",
      event: "Digital India Alt Hack",
      organizer: "IIT Delhi & IBC Media",
      date: "July 2023",
      position: "First Runner-up",
      description: "Our team developed a blockchain-based solution at the 'Digital India Alt Hack' event sponsored by Polkadot. The hackathon was an 8-day Web3 event held at the IIT Delhi campus, where we competed against numerous teams and secured the second position for having one of the most promising startup ideas in the Web3 space.",
      images: [
        {
          url: "https://media.licdn.com/dms/image/v2/D4D22AQE8PoV3dxGaiw/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1693851211679?e=1748476800&v=beta&t=TTc3d0AQpWmm1ebY9a-hciJKrmwu5nOxQ02FV9t7i8U",
          alt: "Me and my team holding certification with professor of IIT Delhi"
        },
        {
          url: "https://media.licdn.com/dms/image/v2/D4D22AQGzXW-v59fQ6g/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1693851211668?e=1748476800&v=beta&t=HSo8i-UzBLYe7TyPLWXK0jLpvBSZtlabb9ZC1Y1TUEs",
          alt: "Whole winners in one frame with professors of IIT Delhi"
        },
        {
          url: "https://media.licdn.com/dms/image/v2/D4D22AQGTcgQ-jtmmIQ/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1688059281594?e=1748476800&v=beta&t=KiEaNYlOj5eD2idk5Jm4XPawVtLZGBnwc4WqWqCUzpQ",
          alt: "Me presenting my ideas"
        },
        {
          url: "https://media.licdn.com/dms/image/v2/D4D22AQEVpjWY9Ok5qA/feedshare-shrink_1280/feedshare-shrink_1280/0/1688059288361?e=1748476800&v=beta&t=HPInJR7vLOxHfIbqN-_VlrbDl-1Yg-k_gt-_5sZklsU",
          alt: "All 3 winner teams in one frame"
        }
      ],
      link: "https://www.linkedin.com/posts/0x0kyoshi_web3-firesidechat-activity-7080233843932184576-MsLT?utm_source=share&utm_medium=member_desktop&rcm=ACoAADrLoj0BpD-bA5atmyyjaZUV-UyLPO2QXDI"
    }
  ];

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-8 bg-background"
    >
      <div className="section-container">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Award size={14} className="mr-2" />
            Recognition
          </div>
          <h2 className="section-title mx-auto">Achievements</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Recognitions and awards that highlight my journey and contributions in the tech world.
          </p>
        </div>

        <div className="space-y-12 mt-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                {/* Left side - Images */}
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  {achievement.images.slice(0, 4).map((image, imgIndex) => (
                    <div
                      key={imgIndex}
                      className={`rounded-lg overflow-hidden shadow-md transition-all duration-700 cursor-pointer ${
                        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}
                      style={{ transitionDelay: `${index * 200 + imgIndex * 150}ms` }}
                      onClick={() => {
                        setSelectedImage(image.url);
                        setModalOpen(true);
                      }}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-32 sm:h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>

                {/* Right side - Details */}
                <div className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                }`}
                style={{ transitionDelay: `${index * 200 + 300}ms` }}
                >
                  <div className="bg-card p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold font-heading">{achievement.title}</h3>
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {achievement.position}
                      </span>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-primary">{achievement.event}</h4>
                      <div className="flex items-center text-muted-foreground mt-1">
                        <span>{achievement.organizer}</span>
                        <span className="mx-2">•</span>
                        <Calendar size={14} className="mr-1" />
                        <span>{achievement.date}</span>
                      </div>
                    </div>

                    <p className="mb-6 text-muted-foreground">{achievement.description}</p>

                    {achievement.link && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => window.open(achievement.link, '_blank')}
                      >
                        <ExternalLink size={14} />
                        View on LinkedIn
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-transparent border-none">
          <div className="relative w-full h-full">
            <DialogClose className="absolute top-2 right-2 z-10 rounded-full bg-background/80 p-2 backdrop-blur-sm hover:bg-background/90 transition-colors">
              <X className="h-6 w-6" />
            </DialogClose>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Achievement"
                className="w-full h-full object-contain max-h-[80vh]"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Achievements;
