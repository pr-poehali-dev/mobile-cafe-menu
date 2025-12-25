import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

export const Profile = () => {
  const [name, setName] = useState('Иван Петров');
  const [phone, setPhone] = useState('+7 (999) 123-45-67');
  const [email, setEmail] = useState('ivan@example.com');
  const [bonusPoints, setBonusPoints] = useState(250);
  const { toast } = useToast();

  const nextLevelPoints = 500;
  const progress = (bonusPoints / nextLevelPoints) * 100;

  const handleSave = () => {
    toast({
      title: 'Профиль обновлен',
      description: 'Ваши данные успешно сохранены',
    });
  };

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
        <div className="max-w-md mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Профиль 👤</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        <Card className="bg-gradient-to-br from-accent to-accent/80 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="User" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{name}</h2>
                <p className="text-white/80">Статус: Постоянный клиент</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Бонусные баллы</span>
                <span className="text-2xl font-bold">{bonusPoints}</span>
              </div>
              <Progress value={progress} className="h-2 bg-white/20" />
              <p className="text-xs text-white/80">
                До следующего уровня: {nextLevelPoints - bonusPoints} баллов
              </p>
            </div>

            <div className="mt-4 p-3 bg-white/10 rounded-lg">
              <p className="text-sm font-semibold mb-1">💰 Ваша скидка: 10%</p>
              <p className="text-xs text-white/80">
                Используйте баллы для оплаты заказов. 1 балл = 1 рубль
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Icon name="Settings" size={20} />
              Личные данные
            </h3>

            <div className="space-y-2">
              <Label htmlFor="profile-name">Имя</Label>
              <Input
                id="profile-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-phone">Телефон</Label>
              <Input
                id="profile-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-email">Email</Label>
              <Input
                id="profile-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button onClick={handleSave} className="w-full">
              <Icon name="Save" size={18} className="mr-2" />
              Сохранить изменения
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Icon name="Gift" size={20} />
              Преимущества программы лояльности
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-accent mt-0.5" />
                <span className="text-sm">Накапливайте баллы за каждый заказ (5% от суммы)</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-accent mt-0.5" />
                <span className="text-sm">Оплачивайте заказы бонусами (до 50% от суммы)</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-accent mt-0.5" />
                <span className="text-sm">Постоянная скидка 10% на всё меню</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Check" size={20} className="text-accent mt-0.5" />
                <span className="text-sm">Специальные предложения и акции</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
