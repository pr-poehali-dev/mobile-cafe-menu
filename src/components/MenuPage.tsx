import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  discount?: number;
}

interface MenuPageProps {
  addToCart: (item: { id: number; name: string; price: number }) => void;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Бургер Премиум',
    description: 'Сочная говяжья котлета, бекон, сыр чеддер, свежие овощи',
    price: 450,
    image: 'https://cdn.poehali.dev/projects/a3bd4b33-778a-4734-8464-a9341cda0b4b/files/e44810e9-7c85-4256-a1da-2a83c6e396fa.jpg',
    category: 'Горячее',
    isNew: true,
  },
  {
    id: 2,
    name: 'Паста Карбонара',
    description: 'Классическая итальянская паста с беконом и сливочным соусом',
    price: 380,
    image: 'https://cdn.poehali.dev/projects/a3bd4b33-778a-4734-8464-a9341cda0b4b/files/28ac6ac1-9dee-4a8a-8a22-e0f9c0c96136.jpg',
    category: 'Горячее',
  },
  {
    id: 3,
    name: 'Цезарь с курицей',
    description: 'Свежий салат с курицей гриль, пармезаном и соусом цезарь',
    price: 320,
    image: 'https://cdn.poehali.dev/projects/a3bd4b33-778a-4734-8464-a9341cda0b4b/files/489df807-9938-45d3-80ad-62ed7686db46.jpg',
    category: 'Салаты',
    discount: 15,
  },
];

const MenuPage = ({ addToCart }: MenuPageProps) => {
  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Наше Меню</h1>
        <p className="text-muted-foreground">Выбирайте любимые блюда</p>
      </div>

      <div className="space-y-4">
        {menuItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              {item.isNew && (
                <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                  Новинка
                </Badge>
              )}
              {item.discount && (
                <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">
                  -{item.discount}%
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <Badge variant="outline" className="text-xs">{item.category}</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex flex-col">
                  {item.discount ? (
                    <>
                      <span className="text-2xl font-bold text-primary">
                        {Math.round(item.price * (1 - item.discount / 100))} ₽
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        {item.price} ₽
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-primary">{item.price} ₽</span>
                  )}
                </div>
                <Button
                  onClick={() => addToCart({ id: item.id, name: item.name, price: item.discount ? Math.round(item.price * (1 - item.discount / 100)) : item.price })}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Icon name="Plus" size={20} className="mr-2" />
                  В корзину
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
