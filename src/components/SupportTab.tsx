import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function SupportTab() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Центр поддержки
        </h2>
        <p className="text-xl text-muted-foreground">Мы всегда на связи</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
          <CardHeader>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
              <Icon name="Mail" className="text-white" size={24} />
            </div>
            <CardTitle>Email</CardTitle>
            <CardDescription>support@markethub.ru</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Ответим в течение 24 часов
            </p>
            <Button variant="outline" className="w-full">
              Написать письмо
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
          <CardHeader>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4">
              <Icon name="MessageCircle" className="text-white" size={24} />
            </div>
            <CardTitle>Онлайн-чат</CardTitle>
            <CardDescription>Доступен 24/7</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Моментальные ответы от нашей команды
            </p>
            <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              Открыть чат
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
          <CardHeader>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4">
              <Icon name="Phone" className="text-white" size={24} />
            </div>
            <CardTitle>Телефон</CardTitle>
            <CardDescription>+7 (495) 123-45-67</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Пн-Пт: 9:00 - 18:00 МСК
            </p>
            <Button variant="outline" className="w-full">
              Позвонить
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
          <CardHeader>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
              <Icon name="BookOpen" className="text-white" size={24} />
            </div>
            <CardTitle>База знаний</CardTitle>
            <CardDescription>150+ статей</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Гайды, инструкции и FAQ
            </p>
            <Button variant="outline" className="w-full">
              Перейти
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
