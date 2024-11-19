import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Brain, Users, Globe, Shield, Heart, Sparkles, Award, Lock, Target, HandHeart, Lightbulb, Building2 } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="container max-w-4xl mx-auto py-20 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          About Gemoedje.nl
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Breaking down barriers in mental healthcare through cultural understanding and accessibility.
        </p>
      </div>

      <Card className="mb-12 hover:shadow-lg transition-shadow">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Target className="h-8 w-8 text-primary shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Why We Exist</h2>
                <p className="text-muted-foreground">
                  In the Netherlands' diverse society, many individuals struggle to find mental healthcare providers who truly understand their cultural background, speak their language, and appreciate their unique life experiences. Gemoedje.nl was created to bridge this gap, ensuring everyone has access to culturally sensitive mental healthcare that resonates with their personal journey.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-12 hover:shadow-lg transition-shadow">
        <CardHeader>
          <h2 className="text-2xl font-bold">Who We Serve</h2>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Individuals Seeking Care</h3>
                <p className="text-muted-foreground">
                  People from diverse cultural backgrounds looking for therapists who understand their unique perspectives and experiences.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">International Community</h3>
                <p className="text-muted-foreground">
                  Expats, immigrants, and international students seeking mental healthcare in their preferred language.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Healthcare Providers</h3>
                <p className="text-muted-foreground">
                  Mental health professionals who offer culturally sensitive care and want to reach diverse communities.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <HandHeart className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold">Support Networks</h3>
                <p className="text-muted-foreground">
                  Organizations and communities supporting mental health initiatives for diverse populations.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 space-y-2">
            <Brain className="h-8 w-8 text-primary mb-2" />
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p className="text-muted-foreground">
              To make mental healthcare accessible to everyone by connecting clients with therapists who truly understand their cultural context and unique experiences.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 space-y-2">
            <Lightbulb className="h-8 w-8 text-primary mb-2" />
            <h3 className="text-xl font-semibold">Our Vision</h3>
            <p className="text-muted-foreground">
              A world where cultural background never stands as a barrier to accessing quality mental healthcare.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-lg transition-shadow mb-12">
        <CardHeader>
          <h2 className="text-2xl font-bold">Our Core Values</h2>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Accessibility</h3>
            </div>
            <p className="text-muted-foreground">
              Making mental healthcare available to everyone, regardless of their background or language preferences.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Cultural Sensitivity</h3>
            </div>
            <p className="text-muted-foreground">
              Understanding and respecting the diverse cultural backgrounds of our clients and providers.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Professional Excellence</h3>
            </div>
            <p className="text-muted-foreground">
              Maintaining high standards for all healthcare providers on our platform.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Innovation</h3>
            </div>
            <p className="text-muted-foreground">
              Continuously improving our platform to better serve the mental health needs of our diverse community.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <h2 className="text-2xl font-bold">Our Commitment</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4">
            <Shield className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Quality Assurance</h3>
              <p className="text-muted-foreground">
                Every healthcare provider on our platform is thoroughly vetted, ensuring they meet our high standards for professional qualifications and cultural competency. We regularly review and update our provider network to maintain the highest quality of care.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Lock className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Privacy & Security</h3>
              <p className="text-muted-foreground">
                We adhere to strict GDPR guidelines and implement industry-leading security measures to protect your personal information. All communications between clients and providers are encrypted and confidential.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}