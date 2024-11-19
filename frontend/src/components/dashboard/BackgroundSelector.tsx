import { useState, useCallback } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { backgrounds } from '@/lib/data';
import { cn } from '@/lib/utils';

interface BackgroundSelectorProps {
  selectedBackgrounds: string[];
  onBackgroundsChange: (backgrounds: string[]) => void;
}

export function BackgroundSelector({
  selectedBackgrounds = [],
  onBackgroundsChange,
}: BackgroundSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const filteredBackgrounds = backgrounds.filter((background) =>
    background.toLowerCase().includes(searchValue.toLowerCase())
  );

  const toggleBackground = useCallback((background: string) => {
    onBackgroundsChange(
      selectedBackgrounds.includes(background)
        ? selectedBackgrounds.filter((b) => b !== background)
        : [...selectedBackgrounds, background]
    );
  }, [selectedBackgrounds, onBackgroundsChange]);

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            type="button"
          >
            {selectedBackgrounds.length === 0
              ? "Select backgrounds..."
              : `${selectedBackgrounds.length} selected`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="Search backgrounds..." 
              value={searchValue}
              onValueChange={setSearchValue}
            />
            <CommandEmpty>No background found.</CommandEmpty>
            <CommandGroup>
              {filteredBackgrounds.map((background) => (
                <CommandItem
                  key={background}
                  value={background}
                  onSelect={() => {
                    toggleBackground(background);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedBackgrounds.includes(background)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {background}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedBackgrounds.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedBackgrounds.map((background) => (
            <div
              key={background}
              className="bg-secondary text-secondary-foreground px-2.5 py-0.5 rounded-md text-sm flex items-center gap-1"
            >
              {background}
              <button
                type="button"
                onClick={() => toggleBackground(background)}
                className="text-secondary-foreground/50 hover:text-secondary-foreground"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}