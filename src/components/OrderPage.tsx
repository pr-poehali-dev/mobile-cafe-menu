import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderPageProps {
  cart: CartItem[];
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const OrderPage = ({ cart, updateQuantity, clearCart }: OrderPageProps) => {
  const { toast } = useToast();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = () => {
    toast({
      title: 'Заказ оформлен!',
      description: `Ваш заказ на сумму ${total} ₽ принят в обработку`,
    });
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
        <Icon name="ShoppingCart" size={64} className="text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Корзина пуста</h2>
        <p className="text-muted-foreground text-center">Добавьте блюда из меню</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Ваш заказ</h1>
        <p className="text-muted-foreground">Проверьте детали перед оформлением</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="ShoppingBag" size={24} />
            Состав заказа
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="flex-1">
                <p className="font-semibold text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.price} ₽</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
              <p className="font-bold text-primary w-20 text-right">
                {item.price * item.quantity} ₽
              </p>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Итого:</span>
            <span className="text-primary text-2xl">{total} ₽</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="MapPin" size={24} />
            Данные доставки
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Имя</Label>
            <Input id="name" placeholder="Ваше имя" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Адрес доставки</Label>
            <Input id="address" placeholder="Улица, дом, квартира" />
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handleOrder}
        className="w-full h-14 text-lg bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <Icon name="CheckCircle" size={24} className="mr-2" />
        Оформить заказ на {total} ₽
      </Button>
    </div>
  );
};

export default OrderPage;
