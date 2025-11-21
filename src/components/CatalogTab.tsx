import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  seller: string;
}

interface CatalogTabProps {
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  addToCart: (product: Product) => void;
}

export default function CatalogTab({ products, selectedCategory, setSelectedCategory, addToCart }: CatalogTabProps) {
  const categories = ['Все', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Каталог товаров
        </h2>
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'bg-gradient-to-r from-primary to-secondary' : ''}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Card
            key={product.id}
            className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all hover:scale-105 overflow-hidden group"
          >
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover transition-transform group-hover:scale-110"
              />
              <Badge className="absolute top-4 right-4 bg-accent">{product.category}</Badge>
            </div>
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <span>{product.name}</span>
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Icon name="Store" size={14} />
                {product.seller}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {product.price.toLocaleString('ru-RU')} ₽
                </span>
                <Button
                  onClick={() => addToCart(product)}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  <Icon name="ShoppingCart" size={18} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
