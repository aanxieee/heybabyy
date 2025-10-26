import React from 'react';
import { Link } from 'react-router-dom';
import { Apple, Baby, Droplets, Moon, Shirt, Shield, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  {
    id: 'foods',
    name: 'Foods',
    icon: Apple,
    description: 'Iron-fortified cereal, purees, teething crackers'
  },
  {
    id: 'feeding',
    name: 'Feeding',
    icon: Baby,
    description: 'Bottles, nipples, sterilizer, breast pump, milk storage bags, bottle brush'
  },
  {
    id: 'bath-hygiene',
    name: 'Bath & Hygiene', 
    icon: Droplets,
    description: 'Baby wash, lotion, diaper cream, wipes, nail clipper, soft towels'
  },
  {
    id: 'sleep',
    name: 'Sleep',
    icon: Moon,
    description: 'Swaddles, wearable blankets, white-noise machine, night light'
  },
  {
    id: 'clothing',
    name: 'Clothing',
    icon: Shirt,
    description: 'Bodysuits, mittens, socks, caps (sensitive-skin fabric)'
  },
  {
    id: 'safety',
    name: 'Safety',
    icon: Shield,
    description: 'Digital thermometer, nasal aspirator, outlet covers, corner guards'
  },
  {
    id: 'travel',
    name: 'Travel',
    icon: Car,
    description: 'Stroller, baby carrier, diaper bag, portable changing mat'
  }
];

const ProductsDropdown: React.FC = () => {
  return (
    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-border p-6 z-50">
      <h3 className="text-lg font-semibold mb-4 text-primary">Product Categories</h3>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Link
              key={category.id}
              to={`/products#${category.id}`}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <IconComponent className="h-5 w-5 text-primary mt-1" />
              <div>
                <h4 className="font-medium text-sm">{category.name}</h4>
                <p className="text-xs text-muted-foreground">{category.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t">
        <Link to="/products">
          <Button variant="outline" size="sm" className="w-full">
            View All Products →
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductsDropdown;