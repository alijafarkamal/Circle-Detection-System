import React from 'react';
import { Trash2 } from 'lucide-react';
import { useStore } from '../lib/store';

export function Cart() {
  const { cart, removeFromCart } = useStore();
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600">Start shopping to add items to your cart!</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 space-y-6">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between border-b border-gray-200 pb-6 last:border-0 last:pb-0"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.product.name}
                  </h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-blue-600 font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Remove item"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 p-6 rounded-b-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-blue-600">
              ${total.toFixed(2)}
            </span>
          </div>
          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}