
import { useState } from 'react';
import { GithubIcon, ExternalLink, ArrowUpRight, Eye, Code, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ProjectCardProps {
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
}

export const ProjectCard = ({
  title,
  description,
  image,
  technologies,
  github,
  liveDemo,
  category,
  date = 'Jan 2023',
  client = 'Enterprise Client',
  role = 'Lead Developer',
  detailedDescription = 'This project involved creating a comprehensive solution that addressed specific business needs while maintaining high standards of performance and user experience.',
  features = ['Responsive Design', 'API Integration', 'Performance Optimization'],
  challenges = ['Complex data visualization requirements', 'Integration with legacy systems'],
  outcomes = ['Increased user engagement by 45%', 'Reduced load time by 30%'],
  testimonial = {
    quote: 'The solution delivered exceeded our expectations and has significantly improved our workflow efficiency.',
    author: 'John Smith',
    position: 'CTO',
    company: 'TechCorp',
  },
  additionalImages = [],
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Card
        className={cn(
          "overflow-hidden h-full flex flex-col border border-border/40 bg-card/50 backdrop-blur-sm",
          "transition-all duration-300 hover:shadow-xl hover:border-primary/20",
          "group cursor-pointer"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsDialogOpen(true)}
      >
        {/* Project Image */}
        <div className="relative overflow-hidden h-52">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out"
            style={{
              backgroundImage: `url(${image})`,
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />

          {/* Overlay gradient */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300"
            style={{ opacity: isHovered ? 1 : 0 }}
          />

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <Badge
              variant="secondary"
              className="font-medium bg-background/80 backdrop-blur-sm border border-border/50 text-xs"
            >
              {category}
            </Badge>
          </div>

          {/* Action buttons */}
          <div
            className="absolute bottom-4 left-4 right-4 transition-all duration-300 flex justify-between items-center"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <div className="flex space-x-2">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background/80 backdrop-blur-sm text-foreground p-2 rounded-full hover:bg-primary hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GithubIcon size={16} />
                </a>
              )}
              {liveDemo && (
                <a
                  href={liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background/80 backdrop-blur-sm text-foreground p-2 rounded-full hover:bg-primary hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>

            <Button
              size="sm"
              variant="secondary"
              className="bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-white text-xs gap-1"
            >
              View Details
              <ArrowUpRight size={14} />
            </Button>
          </div>
        </div>

        {/* Card content */}
        <CardHeader className="p-5 pb-0">
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar size={12} />
            {date}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-5 pt-3 flex-grow">
          <p className="text-muted-foreground text-sm mb-4">{description}</p>
        </CardContent>

        <CardFooter className="p-5 pt-0 flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-secondary/50 text-xs font-normal"
            >
              {tech}
            </Badge>
          ))}
        </CardFooter>
      </Card>

      {/* Detailed Project Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="font-medium">
                {category}
              </Badge>
              <Badge variant="secondary" className="font-medium">
                {date}
              </Badge>
            </div>
            <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {client} • {role}
            </DialogDescription>
          </DialogHeader>

          {/* Project Hero Image */}
          <div className="rounded-lg overflow-hidden h-64 md:h-80 my-4">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project Details */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-2">Overview</h3>
              <p className="text-muted-foreground mb-4">{detailedDescription}</p>

              <h3 className="text-lg font-semibold mb-2">Key Features</h3>
              <ul className="list-disc pl-5 mb-4 text-muted-foreground">
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-2">Challenges & Solutions</h3>
              <ul className="list-disc pl-5 mb-4 text-muted-foreground">
                {challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-2">Outcomes</h3>
              <ul className="list-disc pl-5 mb-4 text-muted-foreground">
                {outcomes.map((outcome, index) => (
                  <li key={index}>{outcome}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="bg-muted p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-secondary/50"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {testimonial && (
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold mb-2">Client Feedback</h3>
                  <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="mt-2 text-sm">
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-muted-foreground">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-2 mt-6">
                {github && (
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    asChild
                  >
                    <a href={github} target="_blank" rel="noopener noreferrer">
                      <Code size={16} />
                      View Code
                    </a>
                  </Button>
                )}
                {liveDemo && (
                  <Button
                    className="flex-1 gap-2"
                    asChild
                  >
                    <a href={liveDemo} target="_blank" rel="noopener noreferrer">
                      <Eye size={16} />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Additional Images */}
          {additionalImages.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {additionalImages.map((img, index) => (
                  <div key={index} className="rounded-lg overflow-hidden h-40">
                    <img
                      src={img}
                      alt={`${title} screenshot ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
