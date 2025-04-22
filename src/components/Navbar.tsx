
import { useState, useEffect, useRef } from 'react';
import { Menu, ChevronDown, Sun, Moon, Mail, Download } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavItem {
  name: string;
  id: string;
  children?: NavItem[];
  external?: boolean;
  href?: string;
}

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      const sections = ['hero', 'about', 'skills', 'experience', 'achievements', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Achievements', id: 'achievements' },
    { name: 'Projects', id: 'projects' }
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md py-2 border-b border-border/30'
          : 'bg-transparent py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a
            href="#"
            className="relative group"
            onClick={() => scrollToSection('hero')}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl font-bold mr-2 transition-transform group-hover:rotate-3 group-hover:scale-110 duration-300">
                AP
              </div>
              <span className="text-xl font-bold font-heading hidden sm:block">Ashish Pathak</span>
            </div>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              item.children ? (
                <DropdownMenu key={item.id}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 rounded-md transition-colors",
                        activeSection === item.id ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
                      )}
                    >
                      {item.name}
                      <ChevronDown size={16} className="opacity-70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48">
                    {item.children.map((child) => (
                      <DropdownMenuItem
                        key={`${item.id}-${child.name}`}
                        onClick={() => scrollToSection(child.id)}
                        className="cursor-pointer"
                      >
                        {child.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "px-3 py-2 rounded-md transition-colors",
                    activeSection === item.id ? 'text-primary font-medium' : 'text-foreground hover:text-primary hover:bg-primary/10'
                  )}
                >
                  {item.name}
                </Button>
              )
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search button removed */}

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden md:flex"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            {/* Resume button */}
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex gap-2"
              onClick={() => window.open('https://drive.google.com/file/d/16zC9KOACFtWOrTLtH9N0kiUoas1FNsnu/view?usp=sharing', '_blank')}
            >
              <Download size={16} />
              Resume
            </Button>

            {/* Contact button */}
            <Button
              size="sm"
              className="hidden md:flex gap-2"
              onClick={() => scrollToSection('contact')}
            >
              <Mail size={16} />
              Contact
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Toggle menu"
              onClick={toggleMenu}
            >
              <Menu size={24} />
            </Button>

            {/* Mobile Menu */}
            <div
              className={`fixed inset-0 bg-background z-40 lg:hidden transition-transform duration-300 ease-in-out ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
              style={{ top: '60px', height: 'calc(100vh - 60px)' }}
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-between items-center mb-8">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl font-bold">
                    AP
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={toggleTheme}>
                      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </Button>
                  </div>
                </div>

                <nav className="flex flex-col space-y-1 mb-8">
                  {navItems.map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        "justify-start px-3 py-6 text-lg rounded-md transition-colors",
                        activeSection === item.id ? 'text-primary font-medium bg-primary/10' : 'text-foreground hover:text-primary hover:bg-primary/5'
                      )}
                    >
                      {item.name}
                    </Button>
                  ))}
                </nav>

                <div className="mt-auto space-y-4">
                  <Button className="w-full gap-2" onClick={() => scrollToSection('contact')}>
                    <Mail size={18} />
                    Contact Me
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => window.open('https://drive.google.com/file/d/16zC9KOACFtWOrTLtH9N0kiUoas1FNsnu/view?usp=sharing', '_blank')}
                  >
                    <Download size={18} />
                    Download Resume
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search overlay removed */}
    </header>
  );
};
