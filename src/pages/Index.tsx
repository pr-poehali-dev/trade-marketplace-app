import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HomeTab from '@/components/HomeTab';
import CatalogTab from '@/components/CatalogTab';
import SubscriptionsTab from '@/components/SubscriptionsTab';
import SupportTab from '@/components/SupportTab';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10">
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && <HomeTab setActiveTab={setActiveTab} />}
        
        {activeTab === 'catalog' && (
          <CatalogTab
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            addToCart={addToCart}
          />
        )}
        
        {activeTab === 'subscriptions' && (
          <SubscriptionsTab subscriptionPlans={subscriptionPlans} />
        )}
        
        {activeTab === 'support' && <SupportTab />}
      </main>
    </div>
  );
}
