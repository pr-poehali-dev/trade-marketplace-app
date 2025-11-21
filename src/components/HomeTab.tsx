import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface HomeTabProps {
  setActiveTab: (tab: string) => void;
}

export default function HomeTab({ setActiveTab }: HomeTabProps) {
  return (
    <div className="space-y-12 animate-fade-in">
      <section className="text-center py-20">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-scale-in">
          Продавайте проще. Зарабатывайте больше.
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Платформа нового поколения для электронной коммерции с умной системой подписок
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold"
            onClick={() => setActiveTab('catalog')}
          >
            <Icon name="ShoppingBag" size={20} className="mr-2" />
            Перейти в каталог
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/50 hover:bg-primary/10"
            onClick={() => setActiveTab('subscriptions')}
          >
            <Icon name="Crown" size={20} className="mr-2" />
            Стать продавцом
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
          <CardHeader>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <Icon name="TrendingUp" className="text-white" size={24} />
            </div>
            <CardTitle>15,000+</CardTitle>
            <CardDescription>Активных товаров</CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
          <CardHeader>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4">
              <Icon name="Users" className="text-white" size={24} />
            </div>
            <CardTitle>3,200+</CardTitle>
            <CardDescription>Продавцов на платформе</CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
          <CardHeader>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4">
              <Icon name="Award" className="text-white" size={24} />
            </div>
            <CardTitle>₽2.4M</CardTitle>
            <CardDescription>Оборот в месяц</CardDescription>
          </CardHeader>
        </Card>
      </section>
    </div>
  );
}
