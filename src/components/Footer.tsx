
import { Heart, Mail, Phone, MapPin, ArrowUpRight, Github, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections: FooterSection[] = [
    {
      title: 'Navigation',
      links: [
        { label: 'Home', href: '#hero' },
        { label: 'About', href: '#about' },
        { label: 'Skills', href: '#skills' },
        { label: 'Experience', href: '#experience' },
        { label: 'Achievements', href: '#achievements' },
        { label: 'Projects', href: '#projects' },
      ]
    },
  ];

  const socialLinks = [
    { icon: <Github size={20} />, href: 'https://github.com/workashish', label: 'GitHub' },
    { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/ashish-pathak-dev/', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section with logo, contact info, and links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and contact info */}
          <div className="lg:col-span-2">
            <a
              href="#"
              className="inline-flex items-center group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl font-bold mr-2 transition-transform group-hover:rotate-3 group-hover:scale-110 duration-300">
                AP
              </div>
              <span className="text-xl font-bold font-heading">Ashish Pathak</span>
            </a>

            <p className="text-muted-foreground mt-4 mb-6 max-w-md">
              Crafting innovative digital experiences and enterprise solutions that drive business growth and enhance user engagement.
            </p>

            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="text-primary mr-3" size={18} />
                <a href="mailto:workashishp@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                  workashishp@gmail.com
                </a>
              </div>

              <div className="flex items-center">
                <Phone className="text-primary mr-3" size={18} />
                <a href="tel:+918800272100" className="text-muted-foreground hover:text-primary transition-colors">
                  +91 8800272100
                </a>
              </div>

              <div className="flex items-center">
                <MapPin className="text-primary mr-3" size={18} />
                <span className="text-muted-foreground">
                  New Delhi, India (IST)
                </span>
              </div>
            </div>
          </div>

          {/* Footer sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                      {link.external && <ArrowUpRight size={14} className="ml-1" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter section removed */}

        {/* Bottom section with copyright and social links */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} Ashish Pathak. All rights reserved.
          </p>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Credits */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground text-xs flex items-center justify-center">
            Designed and built with <Heart size={12} className="mx-1 text-destructive" /> using React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
