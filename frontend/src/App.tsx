import { useState } from 'react';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { LoginForm } from '@/components/auth/LoginForm';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { ProviderSearch } from '@/components/home/ProviderSearch';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';
import { HowItWorksPage } from '@/components/pages/HowItWorksPage';
import { AboutPage } from '@/components/pages/AboutPage';
import { ContactPage } from '@/components/pages/ContactPage';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type View = 'home' | 'login' | 'signup' | 'dashboard' | 'about' | 'contact' | 'how-it-works';

function App() {
  const [view, setView] = useState<View>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('home');
  };

  const handleSignUpSuccess = () => {
    setView('home');
    toast({
      title: "Aanvraag ontvangen",
      description: "We zullen je aanvraag beoordelen en contact met je opnemen zodra deze is goedgekeurd.",
    });
  };

  const scrollToProviders = () => {
    const providersSection = document.getElementById('providers-section');
    if (providersSection) {
      providersSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isAuthenticated) {
    return <DashboardLayout onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div 
            className="flex gap-2 items-center cursor-pointer" 
            onClick={() => setView('home')}
          >
            <Brain className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Gemoedje.nl</span>
          </div>
          <nav className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => setView('home')}
              className={cn("transition-colors", view === 'home' ? 'bg-secondary' : '')}
            >
              Home
            </Button>
            <Button 
              variant="ghost"
              onClick={() => setView('about')}
              className={cn("transition-colors", view === 'about' ? 'bg-secondary' : '')}
            >
              About
            </Button>
            <Button 
              variant="ghost"
              onClick={() => setView('contact')}
              className={cn("transition-colors", view === 'contact' ? 'bg-secondary' : '')}
            >
              Contact
            </Button>
            {view !== 'login' && view !== 'signup' && (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => setView('login')}
                  className="transition-transform hover:scale-105"
                >
                  Provider Login
                </Button>
                <Button 
                  onClick={() => setView('signup')}
                  className="transition-transform hover:scale-105"
                >
                  Register as Provider
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="min-h-[calc(100vh-4rem)]">
        {view === 'home' && (
          <>
            <section className="container max-w-4xl mx-auto text-center py-20">
              <h1 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Your Journey to Mental Wellness Starts Here
              </h1>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
                Connect with therapists who truly understand your cultural background 
                and unique experiences. Take the first step towards a healthier mind today.
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  size="lg" 
                  className="h-12 px-8 transition-transform hover:scale-105"
                  onClick={scrollToProviders}
                >
                  Find Your Therapist
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-12 px-8 transition-transform hover:scale-105"
                  onClick={() => setView('how-it-works')}
                >
                  How It Works
                </Button>
              </div>
            </section>
            <div id="providers-section">
              <ProviderSearch />
            </div>
          </>
        )}

        {view === 'login' && (
          <div className="container max-w-md mx-auto py-20">
            <LoginForm onLoginSuccess={handleLoginSuccess} />
            <p className="text-center mt-4">
              Don't have an account?{' '}
              <Button variant="link" onClick={() => setView('signup')}>
                Sign up
              </Button>
            </p>
          </div>
        )}

        {view === 'signup' && (
          <div className="container max-w-md mx-auto py-20">
            <SignUpForm onSignUpSuccess={handleSignUpSuccess, handleLoginSuccess} />
            <p className="text-center mt-4">
              Already have an account?{' '}
              <Button variant="link" onClick={() => setView('login')}>
                Login
              </Button>
            </p>
          </div>
        )}

        {view === 'about' && <AboutPage />}
        {view === 'contact' && <ContactPage />}
        {view === 'how-it-works' && <HowItWorksPage />}
      </main>

      <footer className="border-t py-8 mt-auto">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 Gemoedje.nl. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;