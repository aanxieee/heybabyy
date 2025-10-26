import React, { useState } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';

const categories = [
  {
    id: 'foods',
    name: 'Foods',
    description: 'Iron-fortified cereal, purees, teething crackers',
    products: [
      { id: 1, name: 'Organic Baby Cereal', note: 'Iron-fortified for healthy development', image: '/placeholder.svg' },
      { id: 2, name: 'Fruit Puree Pouches', note: 'No added sugar, 100% natural', image: '/placeholder.svg' },
      { id: 3, name: 'Teething Crackers', note: 'Dissolves easily, promotes self-feeding', image: '/placeholder.svg' }
    ]
  },
  {
    id: 'feeding',
    name: 'Feeding',
    description: 'Bottles, nipples, sterilizer, breast pump, milk storage bags',
    products: [
      { id: 4, name: 'Anti-Colic Bottles', note: 'Reduces gas and fussiness', image: '/placeholder.svg' },
      { id: 5, name: 'Breast Pump Kit', note: 'Hospital-grade double electric pump', image: '/placeholder.svg' },
      { id: 6, name: 'UV Sterilizer', note: 'Kills 99.9% of germs without chemicals', image: '/placeholder.svg' }
    ]
  },
  {
    id: 'bath-hygiene',
    name: 'Bath & Hygiene',
    description: 'Baby wash, lotion, diaper cream, wipes, nail clipper',
    products: [
      { id: 7, name: 'Gentle Baby Wash', note: 'Tear-free formula with natural ingredients', image: '/placeholder.svg' },
      { id: 8, name: 'Moisturizing Lotion', note: 'Hypoallergenic, dermatologist tested', image: '/placeholder.svg' },
      { id: 9, name: 'Diaper Rash Cream', note: 'Zinc oxide barrier protection', image: '/placeholder.svg' }
    ]
  },
  {
    id: 'sleep',
    name: 'Sleep',
    description: 'Swaddles, wearable blankets, white-noise machine',
    products: [
      { id: 10, name: 'Muslin Swaddle Blankets', note: 'Breathable, gets softer with each wash', image: '/placeholder.svg' },
      { id: 11, name: 'Sleep Sack', note: 'Wearable blanket for safe sleep', image: '/placeholder.svg' },
      { id: 12, name: 'White Noise Machine', note: 'Multiple soothing sounds included', image: '/placeholder.svg' }
    ]
  },
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Bodysuits, mittens, socks, caps (sensitive-skin fabric)',
    products: [
      { id: 13, name: 'Organic Cotton Bodysuits', note: 'Soft, hypoallergenic fabric', image: '/placeholder.svg' },
      { id: 14, name: 'Scratch Mittens', note: 'Protects delicate skin from scratching', image: '/placeholder.svg' },
      { id: 15, name: 'Bamboo Socks', note: 'Naturally antibacterial and breathable', image: '/placeholder.svg' }
    ]
  },
  {
    id: 'safety',
    name: 'Safety',
    description: 'Digital thermometer, nasal aspirator, outlet covers',
    products: [
      { id: 16, name: 'Digital Thermometer', note: 'Quick 1-second readings', image: '/placeholder.svg' },
      { id: 17, name: 'Nasal Aspirator', note: 'Gentle suction for stuffy noses', image: '/placeholder.svg' },
      { id: 18, name: 'Outlet Safety Plugs', note: 'Child-proof electrical outlets', image: '/placeholder.svg' }
    ]
  },
  {
    id: 'travel',
    name: 'Travel',
    description: 'Stroller, baby carrier, diaper bag, portable changing mat',
    products: [
      { id: 19, name: 'Lightweight Stroller', note: 'One-hand fold, smooth ride', image: '/placeholder.svg' },
      { id: 20, name: 'Ergonomic Baby Carrier', note: 'Distributes weight evenly', image: '/placeholder.svg' },
      { id: 21, name: 'Diaper Backpack', note: 'Multiple compartments, wipeable lining', image: '/placeholder.svg' }
    ]
  }
];

const ageRanges = ['All Ages', '0-3m', '3-6m', '6-12m', '12-24m'];
const sensitivityOptions = ['All Products', 'Fragrance-free', 'Hypoallergenic'];

export const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAge, setSelectedAge] = useState<string>('All Ages');
  const [selectedSensitivity, setSelectedSensitivity] = useState<string>('All Products');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCategories = selectedCategory === 'all' 
    ? categories 
    : categories.filter(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <Navbar activeSection="products" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">Baby Products</h1>
          <p className="text-muted-foreground text-lg">
            Premium baby care products for your little one's health and happiness
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-md rounded-lg p-6 mb-8 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Age Range</label>
              <Select value={selectedAge} onValueChange={setSelectedAge}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ageRanges.map(age => (
                    <SelectItem key={age} value={age}>{age}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Sensitivity</label>
              <Select value={selectedSensitivity} onValueChange={setSelectedSensitivity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sensitivityOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Category Cards */}
        <div className="space-y-12">
          {filteredCategories.map(category => (
            <div key={category.id} className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-primary mb-2">{category.name}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {category.products.map(product => (
                  <Card key={product.id} className="bubble hover:shadow-glow transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                        <div className="text-4xl">👶</div>
                      </div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>{product.note}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Badge variant="secondary">0-12m</Badge>
                          <Badge variant="outline">Hypoallergenic</Badge>
                        </div>
                        <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                          View / Buy
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};