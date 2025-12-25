import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const ProfilePage = () => {
  const loyaltyPoints = 450;
  const nextRewardAt = 500;
  const progress = (loyaltyPoints / nextRewardAt) * 100;

  return (
    <div className="p-4 space-y-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Профиль</h1>
        <p className="text-muted-foreground">Ваши данные и бонусы</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                ИП
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Иван Петров</h2>
              <p className="text-muted-foreground">ivan@example.com</p>
              <Badge className="mt-2 bg-accent text-accent-foreground">Золотой клиент</Badge>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <Icon name="Settings" size={20} className="mr-2" />
            Редактировать профиль
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Gift" size={24} className="text-secondary" />
            Программа лояльности
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Ваши баллы</span>
              <span className="text-3xl font-bold text-primary">{loyaltyPoints}</span>
            </div>
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground text-center">
              Еще {nextRewardAt - loyaltyPoints} баллов до следующей награды
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
              <div className="bg-primary/10 p-2 rounded-full">
                <Icon name="Percent" size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Скидка 10%</p>
                <p className="text-sm text-muted-foreground">На следующий заказ</p>
              </div>
              <Badge className="bg-accent text-accent-foreground">Доступно</Badge>
            </div>

            <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
              <div className="bg-secondary/10 p-2 rounded-full">
                <Icon name="Coffee" size={20} className="text-secondary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">Бесплатный напиток</p>
                <p className="text-sm text-muted-foreground">К заказу от 1000 ₽</p>
              </div>
              <Badge variant="outline">50 баллов</Badge>
            </div>

            <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
              <div className="bg-accent/10 p-2 rounded-full">
                <Icon name="Sparkles" size={20} className="text-accent" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">VIP статус</p>
                <p className="text-sm text-muted-foreground">Дополнительные привилегии</p>
              </div>
              <Badge variant="outline">1000 баллов</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Clock" size={24} />
            История заказов
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { date: '23 дек 2024', items: 'Бургер Премиум, Паста', total: 830, points: 83 },
            { date: '18 дек 2024', items: 'Цезарь с курицей', total: 320, points: 32 },
            { date: '10 дек 2024', items: 'Бургер Премиум', total: 450, points: 45 },
          ].map((order, i) => (
            <div key={i} className="flex items-center gap-3 p-3 border border-border rounded-lg">
              <div className="bg-muted p-2 rounded-full">
                <Icon name="Receipt" size={20} className="text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground text-sm">{order.items}</p>
                <p className="text-xs text-muted-foreground">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{order.total} ₽</p>
                <p className="text-xs text-accent">+{order.points} баллов</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
