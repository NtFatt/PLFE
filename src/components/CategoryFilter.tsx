import { Coffee, IceCream, Cake, Salad, Wine, UtensilsCrossed } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', name: 'Tất cả', icon: UtensilsCrossed },
  { id: 'coffee', name: 'Cà phê', icon: Coffee },
  { id: 'tea', name: 'Trà', icon: Wine },
  { id: 'smoothie', name: 'Sinh tố', icon: IceCream },
  { id: 'cake', name: 'Bánh', icon: Cake },
  { id: 'snack', name: 'Đồ ăn nhẹ', icon: Salad },
];

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

export const CategoryFilter = ({ selected, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selected === category.id;
        
        return (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={cn(
              "flex flex-col items-center justify-center gap-2 min-w-[100px] p-4 rounded-2xl transition-all duration-300",
              isSelected
                ? "bg-gradient-primary text-primary-foreground shadow-medium scale-105"
                : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:scale-102"
            )}
          >
            <Icon className="w-6 h-6" />
            <span className="text-sm font-medium whitespace-nowrap">
              {category.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};
