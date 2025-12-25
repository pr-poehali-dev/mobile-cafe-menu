import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '@/types/menu';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface CheckoutProps {
  cart: CartItem[];
  onCartUpdate: (cart: CartItem[]) => void;
}

export const Checkout = ({ cart, onCartUpdate }: CheckoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !address) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все обязательные поля',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Заказ оформлен! 🎉',
      description: 'Ваш заказ принят в обработку. Ожидайте звонка.',
    });

    onCartUpdate([]);
    navigate('/');
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
        <div className="max-w-md mx-auto px-4 py-6 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/cart')}
            className="text-white hover:bg-white/20"
          >
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h1 className="text-3xl font-bold">Оформление заказа</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <Icon name="User" size={20} />
                Контактные данные
              </h2>
              
              <div className="space-y-2">
                <Label htmlFor="name">Имя *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Введите ваше имя"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (999) 999-99-99"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Адрес доставки *</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Улица, дом, квартира"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-4">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <Icon name="CreditCard" size={20} />
                Способ оплаты
              </h2>
              
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                    <Icon name="CreditCard" size={18} />
                    Картой онлайн
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer">
                    <Icon name="Wallet" size={18} />
                    Наличными при получении
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-3">
              <h2 className="font-bold text-lg">Ваш заказ</h2>
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x {item.quantity}</span>
                  <span className="font-semibold">{item.price * item.quantity} ₽</span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="font-bold text-lg">Итого:</span>
                <span className="font-bold text-2xl text-primary">{total} ₽</span>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" size="lg">
            Подтвердить заказ
            <Icon name="Check" size={20} className="ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
};
