import { useState } from 'react';  
import { Button } from '@/components/ui/button';  
import { Input } from '@/components/ui/input';  
import { Label } from '@/components/ui/label';  
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';  
import { useToast } from '@/hooks/use-toast';  
import axios from 'axios';   
import {  
  Select,  
  SelectContent,  
  SelectItem,  
  SelectTrigger,  
  SelectValue,  
} from '@/components/ui/select';  
import { LoginForm } from './LoginForm'; // Import LoginForm component  

type FormData = {  
  email: string;  
  firstName: string;  
  lastName: string;  
  registrationType: RegistrationType;  
  bigRegistration: string;  
  kvkNumber: string;  
  practiceAddress: string;  
  phone: string;  
  password: string;  
};  

interface SignUpFormProps {  
  onSignUpSuccess: (userInfo: FormData) => void;  
  onSignUpError?: (error: Error) => void;  
}  

type RegistrationType = 'big' | 'individual';  

export function SignUpForm({ onSignUpSuccess, handleLoginSuccess }: SignUpFormProps) {  
  const [formData, setFormData] = useState<FormData>({  
    password: '',  
    email: '',  
    firstName: '',  
    lastName: '',  
    registrationType: '' as RegistrationType,  
    bigRegistration: '',  
    kvkNumber: '',  
    practiceAddress: '',  
    phone: '',  
  });  
  const { toast } = useToast();  
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const [isSuccess, setIsSuccess] = useState(false);  

  const handleSignUpSuccess = async (formData: FormData) => {   
    try {  
      console.log("handle");  
      const response = await axios.post('http://192.168.135.8:5000/api/signup', formData);  

      if (response.status.toString()[0] === "2") {  
        toast({  
          title: "Succesvol geregistreerd",  
          description: "Je registratie is succesvol verwerkt.",  
        });  
        onSignUpSuccess(formData);  
        setIsSuccess(true);
      } else {  
        throw new Error('Registratie mislukt');  
      }  
    } catch (error) {  
      toast({  
        title: "Error",  
        description: "Er is een probleem opgetreden bij het registreren. Probeer het opnieuw.",  
        variant: "destructive",  
      });  
    } finally {  
      setIsSubmitting(false);  
    }  
  };  

  const handleSubmit = (e: React.FormEvent) => {  
    e.preventDefault();  
    setIsSubmitting(true);  

    if (formData.registrationType === 'big' && !/^\d{8}$/.test(formData.bigRegistration)) {  
      toast({  
        title: "Ongeldige BIG-registratie",  
        description: "Voer een geldig BIG-nummer in (8 cijfers)",  
        variant: "destructive",  
      });  
      setIsSubmitting(false);  
      return;  
    }  

    if (!/^\d{8}$/.test(formData.kvkNumber)) {  
      toast({  
        title: "Ongeldig KvK-nummer",  
        description: "Voer een geldig KvK-nummer in (8 cijfers)",  
        variant: "destructive",  
      });  
      setIsSubmitting(false);  
      return;  
    }  

    toast({  
      title: "Aanvraag ontvangen",  
      description: "We zullen je gegevens controleren en contact met je opnemen.",  
    });  

    handleSignUpSuccess(formData);  
  };  

  return (  
    !isSuccess ? (  
      <Card className="w-full max-w-md">  
        <CardHeader className="space-y-1">  
          <h2 className="text-2xl font-bold">Registreer als Zorgverlener</h2>  
          <p className="text-sm text-muted-foreground">  
            Vul je gegevens in voor verificatie van je zorgverlenersaccount  
          </p>  
        </CardHeader>  
        <form onSubmit={handleSubmit}>  
          <CardContent className="space-y-4">  
            <div className="grid grid-cols-2 gap-4">  
              <div className="space-y-2">  
                <Label htmlFor="firstName">Voornaam</Label>  
                <Input  
                  id="firstName"  
                  value={formData.firstName}  
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}  
                  required  
                />  
              </div>  
              <div className="space-y-2">  
                <Label htmlFor="lastName">Achternaam</Label>  
                <Input  
                  id="lastName"  
                  value={formData.lastName}  
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}  
                  required  
                />  
              </div>  
            </div>  

            <div className="space-y-2">  
              <Label htmlFor="email">Zakelijk e-mailadres</Label>  
              <Input  
                id="email"  
                type="email"  
                value={formData.email}  
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}  
                required  
              />  
            </div>  

            <div className="space-y-2">  
              <Label htmlFor="phone">Telefoonnummer</Label>  
              <Input  
                id="phone"  
                type="tel"  
                value={formData.phone}  
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}  
                required  
              />  
            </div>  

            <div className="space-y-2">  
              <Label>Type Registratie</Label>  
              <Select  
                value={formData.registrationType}  
                onValueChange={(value: RegistrationType) =>   
                  setFormData({ ...formData, registrationType: value })  
                }  
              >  
                <SelectTrigger>  
                  <SelectValue placeholder="Selecteer type registratie" />  
                </SelectTrigger>  
                <SelectContent>  
                  <SelectItem value="big">BIG-registratie</SelectItem>  
                  <SelectItem value="individual">Individuele therapeut</SelectItem>  
                </SelectContent>  
              </Select>  
            </div>  

            {formData.registrationType === 'big' && (  
              <div className="space-y-2">  
                <Label htmlFor="bigRegistration">BIG-registratienummer</Label>  
                <Input  
                  id="bigRegistration"  
                  value={formData.bigRegistration}  
                  onChange={(e) => setFormData({ ...formData, bigRegistration: e.target.value })}  
                  placeholder="12345678"  
                  required  
                />  
              </div>  
            )}  

            <div className="space-y-2">  
              <Label htmlFor="kvkNumber">KvK-nummer</Label>  
              <Input  
                id="kvkNumber"  
                value={formData.kvkNumber}  
                onChange={(e) => setFormData({ ...formData, kvkNumber: e.target.value })}  
                placeholder="12345678"  
                required  
              />  
            </div>  

            <div className="space-y-2">  
              <Label htmlFor="password">Password</Label>  
              <Input  
                id="password"  
                value={formData.password}  
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}  
                placeholder="password"  
                required  
              />  
            </div>  

            <div className="space-y-2">  
              <Label htmlFor="practiceAddress">Praktijkadres</Label>  
              <Input  
                id="practiceAddress"  
                value={formData.practiceAddress}  
                onChange={(e) => setFormData({ ...formData, practiceAddress: e.target.value })}  
                required  
              />  
            </div>  

            <div className="text-sm text-muted-foreground">  
              <p>Door te registreren ga je akkoord met onze voorwaarden en privacybeleid.</p>  
              <p className="mt-2">  
                Na registratie zullen we je gegevens verifiëren. Dit proces kan enkele werkdagen duren.  
              </p>  
            </div>  
          </CardContent>  
          <CardFooter>  
            <Button type="submit" disabled={isSubmitting} className="w-full">  
              {isSubmitting ? 'Registreer...' : 'Registratie Aanvragen'}  
            </Button>  
          </CardFooter>  
        </form>  
      </Card>  
    ) : (  
      <div className="container max-w-md mx-auto py-20">  
        <LoginForm onLoginSuccess={handleLoginSuccess} />  
        <p className="text-center mt-4">  
          Don't have an account?{' '}  
          <Button variant="link" onClick={() => setIsSuccess(false)}>  
            Sign up  
          </Button>  
        </p>  
      </div>  
    )  
  );  
}