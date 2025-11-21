import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: CartItem[];
  updateQuantity: (productId: number, delta: number) => void;
  removeFromCart: (productId: number) => void;
}

export default function Navigation({ activeTab, setActiveTab, cart, updateQuantity, removeFromCart }: NavigationProps) {
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
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
  );
}
