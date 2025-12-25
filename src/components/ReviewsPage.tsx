import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

const ReviewsPage = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      author: 'Анна К.',
      rating: 5,
      text: 'Отличное кафе! Бургеры просто восхитительные, а обслуживание на высоте. Обязательно вернусь!',
      date: '2 дня назад',
    },
    {
      id: 2,
      author: 'Дмитрий М.',
      rating: 4,
      text: 'Очень вкусная паста и приятная атмосфера. Единственный минус - долго ждали заказ.',
      date: '5 дней назад',
    },
    {
      id: 3,
      author: 'Елена С.',
      rating: 5,
      text: 'Салат Цезарь — лучший в городе! Свежие ингредиенты и щедрые порции.',
      date: '1 неделю назад',
    },
  ]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = () => {
    if (!newReview.trim()) return;

    const review: Review = {
      id: Date.now(),
      author: 'Вы',
      rating,
      text: newReview,
      date: 'только что',
    };

    setReviews([review, ...reviews]);
    setNewReview('');
    setRating(5);

    toast({
      title: 'Отзыв отправлен!',
      description: 'Спасибо за ваше мнение',
    });
  };

  return (
    <div className="p-4 space-y-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Отзывы</h1>
        <p className="text-muted-foreground">Поделитесь своим мнением</p>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div>
            <p className="font-semibold mb-2">Ваша оценка</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Icon
                    name="Star"
                    size={32}
                    className={star <= rating ? 'fill-secondary text-secondary' : 'text-muted'}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <Textarea
              placeholder="Расскажите о вашем опыте..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              rows={4}
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Icon name="Send" size={20} className="mr-2" />
            Отправить отзыв
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {review.author[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-foreground">{review.author}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{review.text}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
