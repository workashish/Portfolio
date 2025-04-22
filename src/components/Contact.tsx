
import { useEffect, useState, useRef } from 'react';
import { Mail, Linkedin, Github, Send, MapPin, Phone, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

export const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    services: [] as string[],
    budget: '',
    timeframe: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (service: string) => {
    setFormData(prev => {
      const services = prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service];
      return { ...prev, services };
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // In a real app, you would send the data to a server
        console.log('Form submitted:', formData);

        // Show success message
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
          duration: 5000,
        });

        // Reset the form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          message: '',
          services: [],
          budget: '',
          timeframe: ''
        });

        setIsSuccess(true);

        // Reset success state after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } catch (error) {
        toast({
          title: "Error sending message",
          description: "There was a problem sending your message. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Scroll to the first error
      const firstErrorField = Object.keys(formErrors).find(
        key => formErrors[key as keyof typeof formErrors] !== ''
      );

      if (firstErrorField && formRef.current) {
        const errorElement = formRef.current.querySelector(`[name="${firstErrorField}"]`);
        errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const services = [
    'Web Development',
    'UI/UX Design',
    'Mobile App Development',
    'Enterprise Solutions',
    'Consulting'
  ];

  const budgetOptions = [
    'Less than $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+'
  ];

  const timeframeOptions = [
    'Less than 1 month',
    '1-3 months',
    '3-6 months',
    '6+ months'
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-8 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl -z-10"></div>

      <div className="section-container">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Mail size={14} className="mr-2" />
            Contact
          </div>
          <h2 className="section-title mx-auto">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Have a project in mind or want to explore collaboration opportunities?
            I'm here to help turn your ideas into reality.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info - Left Sidebar */}
          <Card className={cn(
            "lg:col-span-2 border-border/40 bg-card/50 backdrop-blur-sm h-fit",
            "transition-all duration-1000",
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Feel free to reach out through any of these channels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <a
                  href="mailto:workashishp@gmail.com"
                  className="flex items-center gap-4 p-4 hover:bg-background rounded-lg transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-muted-foreground text-sm">workashishp@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/ashish-pathak-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 hover:bg-background rounded-lg transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Linkedin className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">LinkedIn</h4>
                    <p className="text-muted-foreground text-sm">linkedin.com/in/ashish-pathak-dev</p>
                  </div>
                </a>

                <a
                  href="https://github.com/workashish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 hover:bg-background rounded-lg transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Github className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">GitHub</h4>
                    <p className="text-muted-foreground text-sm">github.com/workashish</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 hover:bg-background rounded-lg transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MapPin className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="text-muted-foreground text-sm">New Delhi, India (IST)</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 hover:bg-background rounded-lg transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Clock className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Availability</h4>
                    <p className="text-muted-foreground text-sm">Mon-Fri: 9:00 AM - 6:00 PM IST</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start border-t border-border/40 pt-6">
              <h4 className="font-semibold mb-2">Connect with me</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Follow me on social media for updates on my latest projects and insights.
              </p>
              <div className="flex gap-3">
                {['Twitter', 'Instagram', 'Dribbble', 'Medium'].map((platform) => (
                  <Button key={platform} variant="outline" size="sm" className="rounded-full">
                    {platform}
                  </Button>
                ))}
              </div>
            </CardFooter>
          </Card>

          {/* Contact Form - Right Side */}
          <div className={cn(
            "lg:col-span-3 transition-all duration-1000 delay-200",
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}>
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
              {isSuccess ? (
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <CheckCircle2 className="text-primary h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground max-w-md">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6"
                      onClick={() => setIsSuccess(false)}
                    >
                      Send another message
                    </Button>
                  </div>
                </CardContent>
              ) : (
                <Tabs defaultValue="contact" onValueChange={setActiveTab} className="w-full">
                  <CardHeader>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="contact">Contact</TabsTrigger>
                      <TabsTrigger value="project">Project Inquiry</TabsTrigger>
                    </TabsList>
                  </CardHeader>

                  <CardContent>
                    <TabsContent value="contact" className="mt-0">
                      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">
                            Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            className={cn(formErrors.name && "border-destructive")}
                          />
                          {formErrors.name && (
                            <p className="text-sm text-destructive flex items-center gap-1">
                              <AlertCircle size={12} />
                              {formErrors.name}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            className={cn(formErrors.email && "border-destructive")}
                          />
                          {formErrors.email && (
                            <p className="text-sm text-destructive flex items-center gap-1">
                              <AlertCircle size={12} />
                              {formErrors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">
                          Subject <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What is this regarding?"
                          className={cn(formErrors.subject && "border-destructive")}
                        />
                        {formErrors.subject && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle size={12} />
                            {formErrors.subject}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">
                          Message <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Your message here..."
                          rows={5}
                          className={cn(formErrors.message && "border-destructive")}
                        />
                        {formErrors.message && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle size={12} />
                            {formErrors.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-pulse">Sending...</span>
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={16} className="ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                    <TabsContent value="project" className="mt-0">
                      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">
                              Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Your full name"
                              className={cn(formErrors.name && "border-destructive")}
                            />
                            {formErrors.name && (
                              <p className="text-sm text-destructive flex items-center gap-1">
                                <AlertCircle size={12} />
                                {formErrors.name}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">
                              Email <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="your.email@example.com"
                              className={cn(formErrors.email && "border-destructive")}
                            />
                            {formErrors.email && (
                              <p className="text-sm text-destructive flex items-center gap-1">
                                <AlertCircle size={12} />
                                {formErrors.email}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="company">Company</Label>
                            <Input
                              id="company"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              placeholder="Your company name"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+91 8800272100"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">
                            Project Title <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Brief title for your project"
                            className={cn(formErrors.subject && "border-destructive")}
                          />
                          {formErrors.subject && (
                            <p className="text-sm text-destructive flex items-center gap-1">
                              <AlertCircle size={12} />
                              {formErrors.subject}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label>Services Required</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {services.map((service) => (
                              <div key={service} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id={`service-${service}`}
                                  checked={formData.services.includes(service)}
                                  onChange={() => handleCheckboxChange(service)}
                                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <Label htmlFor={`service-${service}`} className="text-sm font-normal">
                                  {service}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="budget">Budget Range</Label>
                            <select
                              id="budget"
                              name="budget"
                              value={formData.budget}
                              onChange={handleChange}
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                              <option value="">Select a budget range</option>
                              {budgetOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="timeframe">Timeframe</Label>
                            <select
                              id="timeframe"
                              name="timeframe"
                              value={formData.timeframe}
                              onChange={handleChange}
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                              <option value="">Select a timeframe</option>
                              {timeframeOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">
                            Project Details <span className="text-destructive">*</span>
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Please describe your project, goals, and any specific requirements..."
                            rows={5}
                            className={cn(formErrors.message && "border-destructive")}
                          />
                          {formErrors.message && (
                            <p className="text-sm text-destructive flex items-center gap-1">
                              <AlertCircle size={12} />
                              {formErrors.message}
                            </p>
                          )}
                        </div>

                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="animate-pulse">Sending...</span>
                            </>
                          ) : (
                            <>
                              Submit Project Inquiry
                              <Send size={16} className="ml-2" />
                            </>
                          )}
                        </Button>
                      </form>
                    </TabsContent>
                  </CardContent>
                </Tabs>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
