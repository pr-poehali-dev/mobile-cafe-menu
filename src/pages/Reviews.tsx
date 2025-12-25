import { Card, CardContent } from '@/components/ui/card';
import { reviews } from '@/data/reviewsData';
import Icon from '@/components/ui/icon';

export const Reviews = () => {
  const averageRating = (
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  ).toFixed(1);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name={i < rating ? 'Star' : 'Star'}
        size={18}
        className={i < rating ? 'fill-accent text-accent' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
        <div className="max-w-md mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-2">Отзывы ⭐</h1>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">{renderStars(5)}</div>
            <span className="text-2xl font-bold">{averageRating}</span>
            <span className="text-white/80">({reviews.length} отзывов)</span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {reviews.map(review => (
          <Card key={review.id} className="animate-fade-in">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">{review.name}</h3>
                  <div className="flex gap-1 mt-1">{renderStars(review.rating)}</div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(review.date).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                  })}
                </span>
              </div>
              <p className="text-muted-foreground">{review.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
