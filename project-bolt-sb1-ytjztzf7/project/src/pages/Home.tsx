import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { Sparkles } from 'lucide-react';

const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Immersive sound quality with active noise cancellation',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000',
    category: 'Electronics',
    features: ['Noise cancellation', 'Bluetooth 5.0', '30h battery life'],
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your health and stay connected',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000',
    category: 'Wearables',
    features: ['Heart rate monitor', 'GPS tracking', 'Water resistant'],
  },
  {
    id: '3',
    name: 'Professional Camera Kit',
    description: 'Capture life\'s moments in stunning detail',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000',
    category: 'Photography',
    features: ['4K video', '24MP sensor', 'Interchangeable lenses'],
  },
];

export function Home() {
  return (
    <div>
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to AI Shop
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover products tailored just for you, powered by advanced AI recommendations
        </p>
      </section>

      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Recommended for You
          </h2>
          <div className="flex items-center gap-2 text-blue-600">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">AI-Powered Suggestions</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}