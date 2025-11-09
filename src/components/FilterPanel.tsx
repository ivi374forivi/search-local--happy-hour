import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  BeerBottle, 
  Wine, 
  Martini, 
  ForkKnife,
  CurrencyDollar,
  Clock
} from '@phosphor-icons/react';
import { DealType, PriceLevel, FilterState } from '@/lib/types';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const dealTypeOptions: { type: DealType; label: string; icon: React.ReactNode }[] = [
    { type: 'beer', label: 'Beer', icon: <BeerBottle weight="fill" /> },
    { type: 'wine', label: 'Wine', icon: <Wine weight="fill" /> },
    { type: 'cocktails', label: 'Cocktails', icon: <Martini weight="fill" /> },
    { type: 'food', label: 'Food', icon: <ForkKnife weight="fill" /> },
  ];

  const priceLevelOptions: PriceLevel[] = [1, 2, 3];

  const toggleDealType = (type: DealType) => {
    const newTypes = filters.dealTypes.includes(type)
      ? filters.dealTypes.filter(t => t !== type)
      : [...filters.dealTypes, type];
    onFiltersChange({ ...filters, dealTypes: newTypes });
  };

  const togglePriceLevel = (level: PriceLevel) => {
    const newLevels = filters.priceLevel.includes(level)
      ? filters.priceLevel.filter(l => l !== level)
      : [...filters.priceLevel, level];
    onFiltersChange({ ...filters, priceLevel: newLevels });
  };

  const hasActiveFilters = 
    filters.dealTypes.length > 0 || 
    filters.priceLevel.length > 0 || 
    filters.activeNow;

  const clearFilters = () => {
    onFiltersChange({
      dealTypes: [],
      priceLevel: [],
      activeNow: false,
      searchQuery: filters.searchQuery
    });
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="active-now" className="flex items-center gap-2 cursor-pointer">
            <Clock className="w-4 h-4" weight="fill" />
            Active Now
          </Label>
          <Switch
            id="active-now"
            checked={filters.activeNow}
            onCheckedChange={(checked) => 
              onFiltersChange({ ...filters, activeNow: checked })
            }
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-sm font-medium">Deal Type</Label>
        <div className="grid grid-cols-2 gap-2">
          {dealTypeOptions.map(option => {
            const isSelected = filters.dealTypes.includes(option.type);
            return (
              <Button
                key={option.type}
                variant={isSelected ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleDealType(option.type)}
                className="justify-start gap-2"
              >
                {option.icon}
                {option.label}
              </Button>
            );
          })}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-sm font-medium flex items-center gap-2">
          <CurrencyDollar className="w-4 h-4" weight="fill" />
          Price Level
        </Label>
        <div className="flex gap-2">
          {priceLevelOptions.map(level => {
            const isSelected = filters.priceLevel.includes(level);
            return (
              <Badge
                key={level}
                variant={isSelected ? 'default' : 'outline'}
                className="cursor-pointer px-4 py-2"
                onClick={() => togglePriceLevel(level)}
              >
                {'$'.repeat(level)}
              </Badge>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
