import { useState } from 'react';  
import { Button } from '@/components/ui/button';  
import { Input } from '@/components/ui/input';  
import { Label } from '@/components/ui/label';  
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';  
import { useToast } from '@/hooks/use-toast';  
import axios from 'axios'; // Import axios  

interface LoginFormProps {  
  onLoginSuccess: () => void;  
}  

export function LoginForm({ onLoginSuccess }: LoginFormProps) {  
  const [credentials, setCredentials] = useState({  
    email: '',  
    password: '',  
  });  
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const { toast } = useToast();  

  const handleSubmit = async (e: React.FormEvent) => {  
    e.preventDefault();  
    setIsSubmitting(true);  

    try {  
      // Replace with your actual login endpoint  
      const response = await axios.post('http://10.96.45.68:5000/api/login', credentials);  

      if (response.status === 200) {  
        toast({  
          title: "Succesvol ingelogd",  
          description: "Welkom terug!",  
        });  
        onLoginSuccess(); // Trigger success callback  
      } else {  
        throw new Error('Login mislukt');  
      }  
    } catch (error) {  
      toast({  
        title: "Error",  
        description: "Fout bij inloggen. Controleer uw inloggegevens.",  
        variant: "destructive",  
      });  
    } finally {  
      setIsSubmitting(false);  
    }  
  };  

  return (  
    <Card className="w-full max-w-md">  
      <CardHeader className="space-y-1">  
        <h2 className="text-2xl font-bold">Inloggen</h2>  
        <p className="text-sm text-muted-foreground">  
          Voer je gegevens in om toegang te krijgen tot je account  
        </p>  
      </CardHeader>  
      <form onSubmit={handleSubmit}>  
        <CardContent className="space-y-4">  
          <div className="space-y-2">  
            <Label htmlFor="email">E-mailadres</Label>  
            <Input  
              id="email"  
              type="email"  
              placeholder="therapeut@voorbeeld.nl"  
              value={credentials.email}  
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}  
              required  
            />  
          </div>  
          <div className="space-y-2">  
            <Label htmlFor="password">Wachtwoord</Label>  
            <Input  
              id="password"  
              type="password"  
              value={credentials.password}  
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}  
              required  
            />  
          </div>  
        </CardContent>  
        <CardFooter className="flex-col space-y-2">  
          <Button type="submit" className="w-full" disabled={isSubmitting}>  
            {isSubmitting ? 'Bezig met inloggen...' : 'Inloggen'}  
          </Button>  
          <Button variant="link" className="text-sm">  
            Wachtwoord vergeten?  
          </Button>  
        </CardFooter>  
      </form>  
    </Card>  
  );  
}