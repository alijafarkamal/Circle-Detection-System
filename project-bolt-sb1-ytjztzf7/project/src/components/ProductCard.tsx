import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../lib/store';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <button
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          aria-label="Add to wishlist"
        >
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="mt-1 text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product, 1)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}