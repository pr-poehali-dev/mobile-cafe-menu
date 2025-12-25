import { useState } from 'react';
import { MenuCard } from '@/components/MenuCard';
import { menuItems } from '@/data/menuData';
import { MenuItem, CartItem } from '@/types/menu';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface MenuProps {
  onCartUpdate: (cart: CartItem[]) => void;
  cart: CartItem[];
}

export const Menu = ({ onCartUpdate, cart }: MenuProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const { toast } = useToast();

  const categories = ['Все', ...Array.from(new Set(menuItems.map(item => item.category)))];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      onCartUpdate(
        cart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      onCartUpdate([...cart, { ...item, quantity: 1 }]);
    }

    toast({
      title: 'Добавлено в корзину',
      description: `${item.name} добавлен в вашу корзину`,
    });
  };

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
        <div className="max-w-md mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-4">Меню кафе 🍽️</h1>
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск блюд..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 mt-4">
        <Tabs defaultValue="Все" className="w-full mb-6">
          <TabsList className="w-full grid grid-cols-4 h-auto">
            {categories.map(category => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setSelectedCategory(category)}
                className="text-xs py-2"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 gap-4 mb-6">
          {filteredItems.map(item => (
            <MenuCard
              key={item.id}
              item={item}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Блюда не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
};
