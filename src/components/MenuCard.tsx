import { MenuItem } from '@/types/menu';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export const MenuCard = ({ item, onAddToCart }: MenuCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        {item.popular && (
          <Badge className="absolute top-3 right-3 bg-secondary">
            <Icon name="Star" size={14} className="mr-1" />
            Популярное
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="font-bold text-lg mb-1">{item.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-primary">{item.price} ₽</span>
          <Button
            onClick={() => onAddToCart(item)}
            size="sm"
            className="gap-2"
          >
            <Icon name="Plus" size={16} />
            В корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
