import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Search, UserCheck, Calendar, Heart, MessageSquare, Shield } from 'lucide-react';

export function HowItWorksPage() {
  return (
    <div className="container max-w-4xl mx-auto py-20 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          How Gemoedje.nl Works
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your journey to finding the perfect mental healthcare provider
        </p>
      </div>

      <div className="space-y-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <h2 className="text-2xl font-bold">For Clients</h2>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Search className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">1. Search & Filter</h3>
                  <p className="text-muted-foreground">
                    Use our advanced search to find providers based on location, specialties, languages, and cultural background.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <UserCheck className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">2. Review Profiles</h3>
                  <p className="text-muted-foreground">
                    Browse detailed provider profiles, including their experience, approach, and client reviews.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Calendar className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">3. Make Contact</h3>
                  <p className="text-muted-foreground">
                    Reach out to providers directly to schedule an initial consultation.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Heart className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">4. Begin Your Journey</h3>
                  <p className="text-muted-foreground">
                    Start your therapy journey with a provider who understands your unique needs.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <MessageSquare className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">5. Ongoing Support</h3>
                  <p className="text-muted-foreground">
                    Maintain regular sessions and track your progress with your chosen provider.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <h2 className="text-2xl font-bold">For Healthcare Providers</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Join Our Network</h3>
                <p className="text-muted-foreground">
                  Register as a provider to create your profile and connect with clients who match your expertise and cultural background.
                </p>
                <ul className="mt-4 space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Create a detailed professional profile</li>
                  <li>Specify your areas of expertise and cultural competencies</li>
                  <li>Set your availability and consultation types</li>
                  <li>Manage your client communications</li>
                  <li>Access provider resources and support</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}