import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Бургер Премиум',
    description: 'Сочная котлета из мраморной говядины, бекон, сыр чеддер, свежие овощи',
    price: 450,
    image: 'https://cdn.poehali.dev/projects/a3bd4b33-778a-4734-8464-a9341cda0b4b/files/3a2a4ce8-614f-4947-8d9e-ab1af2d3437f.jpg',
    category: 'Основные блюда',
    popular: true,
  },
  {
    id: 2,
    name: 'Цезарь с курицей',
    description: 'Классический салат с курицей-гриль, пармезаном и хрустящими гренками',
    price: 380,
    image: 'https://cdn.poehali.dev/projects/a3bd4b33-778a-4734-8464-a9341cda0b4b/files/3cf72283-b634-4e30-bd6e-4fc8c9830c27.jpg',
    category: 'Салаты',
    popular: true,
  },
  {
    id: 3,
    name: 'Пицца Пепперони',
    description: 'Итальянская пицца с пепперони, моцареллой и томатным соусом на тонком тесте',
    price: 520,
    image: 'https://cdn.poehali.dev/projects/a3bd4b33-778a-4734-8464-a9341cda0b4b/files/b59209bf-7173-42f7-add8-767714699fb2.jpg',
    category: 'Основные блюда',
    popular: true,
  },
  {
    id: 4,
    name: 'Паста Карбонара',
    description: 'Спагетти с беконом, яйцом, пармезаном и сливочным соусом',
    price: 420,
    image: 'https://cdn.poehali.dev/projects/a3bd4b33-778a-4734-8464-a9341cda0b4b/files/3a2a4ce8-614f-4947-8d9e-ab1af2d3437f.jpg',
    category: 'Основные блюда',
  },
  {
    id: 5,
    name: 'Греческий салат',
    description: 'Свежие овощи, сыр фета, маслины, заправка из оливкового масла',
    price: 320,
    image: 'https://cdn.poehali.dev/projects/a3bd4b33-778a-4734-8464-a9341cda0b4b/files/3cf72283-b634-4e30-bd6e-4fc8c9830c27.jpg',
    category: 'Салаты',
  },
  {
    id: 6,
    name: 'Капучино',
    description: 'Ароматный кофе с молочной пенкой',
    price: 180,
    image: 'https://cdn.poehali.dev/projects/a3bd4b33-778a-4734-8464-a9341cda0b4b/files/3a2a4ce8-614f-4947-8d9e-ab1af2d3437f.jpg',
    category: 'Напитки',
  },
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState('menu');
  const [bonusPoints, setBonusPoints] = useState(350);

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    const existingItem = cart.find((cartItem) => cartItem.id === id);
    if (existingItem && existingItem.quantity > 1) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    } else {
      setCart(cart.filter((cartItem) => cartItem.id !== id));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const categories = ['Все', ...Array.from(new Set(menuItems.map((item) => item.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
        <div className="bg-gradient-to-r from-primary via-secondary to-accent text-white p-6 pb-8 rounded-b-3xl shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1">🍕 Вкусно</h1>
              <p className="text-white/90 text-sm">Доставка за 30 минут</p>
            </div>
            <div className="relative">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full w-12 h-12 shadow-lg"
                onClick={() => setActiveTab('cart')}
              >
                <Icon name="ShoppingCart" size={20} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-400 rounded-full w-12 h-12 flex items-center justify-center">
                <Icon name="Star" size={24} className="text-yellow-700" />
              </div>
              <div>
                <p className="text-sm text-white/80">Ваши бонусы</p>
                <p className="text-2xl font-bold">{bonusPoints} баллов</p>
              </div>
            </div>
            <Button variant="secondary" size="sm" className="rounded-full shadow-md">
              Использовать
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 px-4 mt-4 bg-muted/50">
            <TabsTrigger value="menu" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="UtensilsCrossed" size={18} />
            </TabsTrigger>
            <TabsTrigger value="cart" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="ShoppingBag" size={18} />
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="MessageCircle" size={18} />
            </TabsTrigger>
            <TabsTrigger value="profile" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="User" size={18} />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="px-4 pb-24 mt-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4 text-foreground">Популярное</h2>
              <div className="grid gap-4">
                {menuItems
                  .filter((item) => item.popular)
                  .map((item) => (
                    <Card
                      key={item.id}
                      className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer animate-fade-in"
                    >
                      <div className="flex gap-4">
                        <div className="relative w-32 h-32 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          {item.popular && (
                            <Badge className="absolute top-2 left-2 bg-accent shadow-md">
                              <Icon name="TrendingUp" size={12} className="mr-1" />
                              ХИТ
                            </Badge>
                          )}
                        </div>
                        <div className="flex-1 p-4 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-lg mb-1 text-foreground">{item.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xl font-bold text-primary">{item.price} ₽</span>
                            <Button
                              size="sm"
                              onClick={() => addToCart(item)}
                              className="rounded-full shadow-md hover:shadow-lg"
                            >
                              <Icon name="Plus" size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 text-foreground">Все меню</h2>
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant="outline"
                    className="cursor-pointer whitespace-nowrap hover:bg-primary hover:text-white transition-colors"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              <div className="grid gap-4">
                {menuItems.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer animate-fade-in"
                  >
                    <div className="flex gap-4">
                      <div className="relative w-32 h-32 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold text-lg mb-1 text-foreground">{item.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xl font-bold text-primary">{item.price} ₽</span>
                          <Button
                            size="sm"
                            onClick={() => addToCart(item)}
                            className="rounded-full shadow-md hover:shadow-lg"
                          >
                            <Icon name="Plus" size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cart" className="px-4 pb-24 mt-6">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Корзина</h2>
            {cart.length === 0 ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="mb-4 text-6xl">🛒</div>
                <p className="text-muted-foreground text-lg">Корзина пуста</p>
                <Button
                  onClick={() => setActiveTab('menu')}
                  className="mt-6 rounded-full shadow-md"
                >
                  Перейти в меню
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-24 animate-slide-up">
                  {cart.map((item) => (
                    <Card key={item.id} className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground">{item.name}</h3>
                          <p className="text-primary font-bold mt-1">{item.price} ₽</p>
                          <div className="flex items-center gap-3 mt-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 rounded-full"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Icon name="Minus" size={14} />
                            </Button>
                            <span className="font-bold text-foreground">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8 rounded-full"
                              onClick={() => addToCart(item)}
                            >
                              <Icon name="Plus" size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl p-4 max-w-md mx-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Итого:</p>
                      <p className="text-3xl font-bold text-foreground">{getTotalPrice()} ₽</p>
                      <p className="text-xs text-green-600 font-medium mt-1">
                        +{Math.floor(getTotalPrice() * 0.05)} бонусов
                      </p>
                    </div>
                    <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl px-8">
                      Оформить
                      <Icon name="ArrowRight" size={18} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="px-4 pb-24 mt-6">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Отзывы</h2>
            <div className="space-y-4 animate-fade-in">
              {[
                { name: 'Анна', rating: 5, text: 'Отличная кухня! Бургер просто восхитительный, доставили быстро и горячим.', date: '2 дня назад' },
                { name: 'Михаил', rating: 5, text: 'Пицца превзошла все ожидания. Тесто тонкое, начинки много. Рекомендую!', date: '5 дней назад' },
                { name: 'Елена', rating: 4, text: 'Салат Цезарь очень вкусный, свежие ингредиенты. Одна звезда снята за небольшую задержку доставки.', date: 'неделю назад' },
              ].map((review, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="User" size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-bold text-foreground">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {[...Array(review.rating)].map((_, i) => (
                          <Icon key={i} name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <p className="text-sm text-foreground/80">{review.text}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="px-4 pb-24 mt-6">
            <div className="animate-fade-in">
              <Card className="p-6 mb-6 bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="User" size={32} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Иван Петров</h3>
                    <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 bg-white rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-primary">{bonusPoints}</p>
                    <p className="text-xs text-muted-foreground">Баллов</p>
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-accent">15</p>
                    <p className="text-xs text-muted-foreground">Заказов</p>
                  </div>
                </div>
              </Card>

              <h3 className="text-xl font-bold mb-4 text-foreground">История заказов</h3>
              <div className="space-y-3">
                {[
                  { date: '20 декабря', items: 'Бургер Премиум, Капучино', total: 630, status: 'Доставлен' },
                  { date: '15 декабря', items: 'Пицца Пепперони', total: 520, status: 'Доставлен' },
                  { date: '10 декабря', items: 'Цезарь с курицей, Греческий салат', total: 700, status: 'Доставлен' },
                ].map((order, index) => (
                  <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-foreground">{order.date}</p>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{order.items}</p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-primary">{order.total} ₽</p>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                        Повторить
                        <Icon name="RotateCw" size={14} className="ml-1" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
