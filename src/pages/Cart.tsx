import { CartItem } from '@/types/menu';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface CartProps {
  cart: CartItem[];
  onCartUpdate: (cart: CartItem[]) => void;
}

export const Cart = ({ cart, onCartUpdate }: CartProps) => {
  const navigate = useNavigate();

  const updateQuantity = (id: number, delta: number) => {
    onCartUpdate(
      cart
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="pb-20">
        <div className="sticky top-0 z-40 bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
          <div className="max-w-md mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">Корзина 🛒</h1>
          </div>
        </div>
        <div className="max-w-md mx-auto px-4 py-12 text-center">
          <Icon name="ShoppingCart" size={64} className="mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold mb-2">Корзина пуста</h2>
          <p className="text-muted-foreground mb-6">Добавьте блюда из меню</p>
          <Button onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Вернуться в меню
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
        <div className="max-w-md mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Корзина 🛒</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {cart.map(item => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-bold mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.price} ₽
                  </p>
                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="h-8 w-8 p-0"
                    >
                      <Icon name="Minus" size={16} />
                    </Button>
                    <span className="font-bold w-8 text-center">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                    <span className="ml-auto font-bold text-primary">
                      {item.price * item.quantity} ₽
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-border shadow-lg p-4 z-40">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">Итого:</span>
            <span className="text-2xl font-bold text-primary">{total} ₽</span>
          </div>
          <Button className="w-full" size="lg" onClick={() => navigate('/checkout')}>
            Оформить заказ
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
