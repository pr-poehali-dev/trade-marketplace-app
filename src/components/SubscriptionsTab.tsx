import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular: boolean;
}

interface SubscriptionsTabProps {
  subscriptionPlans: SubscriptionPlan[];
}

export default function SubscriptionsTab({ subscriptionPlans }: SubscriptionsTabProps) {
  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Выберите свой план
        </h2>
        <p className="text-xl text-muted-foreground">
          Начните продавать бесплатно или выберите профессиональный план
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {subscriptionPlans.map(plan => (
          <Card
            key={plan.id}
            className={`relative bg-card/50 backdrop-blur transition-all hover:scale-105 ${
              plan.popular
                ? 'border-2 border-primary shadow-2xl shadow-primary/20'
                : 'border-primary/20'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1">
                  Популярный
                </Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {plan.price === 0 ? 'Бесплатно' : `${plan.price.toLocaleString('ru-RU')} ₽`}
                </span>
                {plan.price > 0 && <span className="text-muted-foreground">/месяц</span>}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Icon name="Check" size={18} className="text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  plan.popular
                    ? 'bg-gradient-to-r from-primary to-secondary hover:opacity-90'
                    : 'bg-primary/20 hover:bg-primary/30'
                }`}
              >
                {plan.price === 0 ? 'Начать бесплатно' : 'Выбрать план'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
