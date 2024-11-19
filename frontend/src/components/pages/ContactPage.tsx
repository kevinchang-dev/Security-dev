import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Clock, MessagesSquare, ShieldCheck, HelpCircle, Send } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent successfully",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container max-w-4xl mx-auto py-20 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have questions, ideas, or want to collaborate? We'd love to hear from you! Fill out the form below, and our team will get back to you as soon as possible.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <Card className="hover:shadow-lg transition-shadow h-full">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">support@gemoedje.nl</p>
                  <p className="text-sm text-muted-foreground">
                    For general inquiries and support
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground">+31 (0)20 123 4567</p>
                  <p className="text-sm text-muted-foreground">
                    Available during business hours
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Office</h3>
                  <p className="text-muted-foreground">
                    Herengracht 182<br />
                    1016 BR Amsterdam<br />
                    Netherlands
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Business Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Friday: 9:00 - 17:00<br />
                    Saturday: 10:00 - 14:00<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Send us a message</h2>
            </div>
            <p className="text-muted-foreground">
              Whether you're a potential client, healthcare provider, or interested in collaboration, we're here to help.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  placeholder="What would you like to discuss?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  placeholder="Tell us more about your inquiry..."
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Common Inquiries</h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">For Clients</h3>
              <p className="text-muted-foreground">
                Questions about finding a therapist, using our platform, or understanding our services? We're here to guide you through the process.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">For Healthcare Providers</h3>
              <p className="text-muted-foreground">
                Interested in joining our platform? Contact us to learn about our provider network and how we can help you reach more clients.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">For Organizations</h3>
              <p className="text-muted-foreground">
                Looking to partner with us or integrate our services? Let's discuss how we can work together to improve mental healthcare accessibility.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Emergency Support</h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              If you're experiencing a mental health emergency or crisis, please contact:
            </p>
            <div className="space-y-2">
              <p className="font-semibold">Emergency Services: 112</p>
              <p className="font-semibold">Crisis Hotline: 0800-0113</p>
              <p className="text-sm text-muted-foreground">Available 24/7</p>
            </div>
            <p className="text-muted-foreground mt-4">
              For non-emergency support and questions about our services, please use the contact form or reach out during business hours.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}