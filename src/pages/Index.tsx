import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  seller: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  { id: 1, name: 'Смартфон Pro X', price: 89990, image: '/placeholder.svg', category: 'Электроника', seller: 'TechStore' },
  { id: 2, name: 'Наушники Premium', price: 12990, image: '/placeholder.svg', category: 'Аудио', seller: 'SoundHub' },
  { id: 3, name: 'Умные часы Elite', price: 24990, image: '/placeholder.svg', category: 'Гаджеты', seller: 'WearTech' },
  { id: 4, name: 'Ноутбук Gaming', price: 124990, image: '/placeholder.svg', category: 'Компьютеры', seller: 'TechStore' },
  { id: 5, name: 'Планшет Studio', price: 54990, image: '/placeholder.svg', category: 'Электроника', seller: 'DigitalWorld' },
  { id: 6, name: 'Камера 4K', price: 67990, image: '/placeholder.svg', category: 'Фото', seller: 'PhotoPro' },
];

const subscriptionPlans = [
  {
    id: 'free',
    name: 'Базовый',
    price: 0,
    features: ['1 товар в месяц', 'Базовая аналитика', 'Email поддержка'],
    popular: false,
  },
  {
    id: 'pro',
    name: 'Профессиональный',
    price: 2990,
    features: ['Безлимитные товары', 'Продвинутая аналитика', 'Приоритетная поддержка', 'API доступ'],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Корпоративный',
    price: 9990,
    features: ['Все из Pro', 'Персональный менеджер', 'Кастомизация', 'SLA 99.9%'],
    popular: false,
  },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories = ['Все', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Store" className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MarketHub
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'home' ? 'bg-primary text-white' : 'hover:bg-primary/10'
                }`}
              >
                <Icon name="Home" size={20} />
                Главная
              </button>
              <button
                onClick={() => setActiveTab('catalog')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'catalog' ? 'bg-primary text-white' : 'hover:bg-primary/10'
                }`}
              >
                <Icon name="ShoppingBag" size={20} />
                Каталог
              </button>
              <button
                onClick={() => setActiveTab('subscriptions')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'subscriptions' ? 'bg-primary text-white' : 'hover:bg-primary/10'
                }`}
              >
                <Icon name="Crown" size={20} />
                Подписки
              </button>
              <button
                onClick={() => setActiveTab('support')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'support' ? 'bg-primary text-white' : 'hover:bg-primary/10'
                }`}
              >
                <Icon name="MessageCircle" size={20} />
                Поддержка
              </button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button className="relative bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Icon name="ShoppingCart" size={20} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {cartItemCount > 0 ? `${cartItemCount} товаров` : 'Пусто'}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      {cart.map(item => (
                        <Card key={item.id} className="bg-card/50 backdrop-blur border-primary/20">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                              <div className="flex-1">
                                <h4 className="font-semibold">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">{item.price.toLocaleString('ru-RU')} ₽</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-auto text-destructive hover:text-destructive"
                                  >
                                    <Icon name="Trash2" size={16} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <div className="border-t border-primary/20 pt-4">
                        <div className="flex justify-between text-lg font-bold mb-4">
                          <span>Итого:</span>
                          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {totalPrice.toLocaleString('ru-RU')} ₽
                          </span>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
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
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Каталог товаров
              </h2>
              <div className="flex gap-2 flex-wrap">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? 'bg-gradient-to-r from-primary to-secondary' : ''}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card
                  key={product.id}
                  className="bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all hover:scale-105 overflow-hidden group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-110"
                    />
                    <Badge className="absolute top-4 right-4 bg-accent">{product.category}</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between">
                      <span>{product.name}</span>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Icon name="Store" size={14} />
                      {product.seller}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </span>
                      <Button
                        onClick={() => addToCart(product)}
                        className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      >
                        <Icon name="ShoppingCart" size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'subscriptions' && (
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
        )}

        {activeTab === 'support' && (
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
        )}
      </main>
    </div>
  );
}
