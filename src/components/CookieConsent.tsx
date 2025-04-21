import { useState, useEffect } from 'react';
import { X, Cookie, Info, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    
    if (!hasConsented) {
      // Show the banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'all');
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('cookieConsent', 'necessary');
    setIsVisible(false);
  };

  const handleCustomize = () => {
    setIsDialogOpen(true);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', 'custom');
    setIsDialogOpen(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-background border-t border-border shadow-lg animate-slide-up">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Cookie className="text-primary h-6 w-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Cookie Consent</h3>
              <p className="text-muted-foreground text-sm mt-1 max-w-2xl">
                This website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleCustomize}
            >
              Customize
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAcceptNecessary}
            >
              Accept Necessary
            </Button>
            <Button 
              size="sm" 
              onClick={handleAcceptAll}
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5" />
              Cookie Preferences
            </DialogTitle>
            <DialogDescription>
              Customize your cookie preferences for this website
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="necessary" className="mt-4">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="necessary">Necessary</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="necessary" className="space-y-4 mt-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold">Necessary Cookies</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    These cookies are essential for the website to function properly. They enable basic functions like page navigation, 
                    secure areas, and remembering your preferences. The website cannot function properly without these cookies.
                  </p>
                </div>
                <div className="ml-auto flex-shrink-0">
                  <input 
                    type="checkbox" 
                    checked 
                    disabled 
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-4 mt-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold">Analytics Cookies</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    These cookies collect information about how you use the website, which pages you visited and which links you clicked on. 
                    All of the data is anonymized and cannot be used to identify you.
                  </p>
                </div>
                <div className="ml-auto flex-shrink-0">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="marketing" className="space-y-4 mt-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold">Marketing Cookies</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    These cookies are used to track visitors across websites. The intention is to display ads that are relevant and 
                    engaging for the individual user and thereby more valuable for publishers and third-party advertisers.
                  </p>
                </div>
                <div className="ml-auto flex-shrink-0">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSavePreferences}>
              Save Preferences
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;
