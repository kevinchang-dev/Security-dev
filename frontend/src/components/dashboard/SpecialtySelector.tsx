import { Button } from '@/components/ui/button';
import { specialties } from '@/lib/data';

interface SpecialtySelectorProps {
  selectedSpecialties: string[];
  onSpecialtiesChange: (specialties: string[]) => void;
}

export function SpecialtySelector({
  selectedSpecialties,
  onSpecialtiesChange,
}: SpecialtySelectorProps) {
  const toggleSpecialty = (specialty: string) => {
    onSpecialtiesChange(
      selectedSpecialties.includes(specialty)
        ? selectedSpecialties.filter((s) => s !== specialty)
        : [...selectedSpecialties, specialty]
    );
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {specialties.map((specialty) => (
        <Button
          key={specialty}
          type="button"
          variant={selectedSpecialties.includes(specialty) ? "default" : "outline"}
          className="justify-start"
          onClick={() => toggleSpecialty(specialty)}
        >
          {specialty}
        </Button>
      ))}
    </div>
  );
}