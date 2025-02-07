import React from 'react';
import { ProductCard } from '../components/ProductCard';

const PRODUCTS = [
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
  {
    id: '4',
    name: 'Smart Home Hub',
    description: 'Control your entire home with voice commands',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1000',
    category: 'Smart Home',
    features: ['Voice control', 'Device compatibility', 'Energy monitoring'],
  },
  {
    id: '5',
    name: 'Gaming Laptop',
    description: 'Ultimate gaming performance on the go',
    price: 1999.99,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=1000',
    category: 'Gaming',
    features: ['RTX 4080', '32GB RAM', '1TB SSD'],
  },
  {
    id: '6',
    name: 'Wireless Earbuds',
    description: 'Crystal clear audio in a compact form',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=1000',
    category: 'Audio',
    features: ['Active noise cancellation', 'Wireless charging', 'Water resistant'],
  },
];

export function ProductList() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <div className="flex gap-4">
          <select className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Wearables">Wearables</option>
            <option value="Photography">Photography</option>
            <option value="Smart Home">Smart Home</option>
            <option value="Gaming">Gaming</option>
            <option value="Audio">Audio</option>
          </select>
          <select className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}