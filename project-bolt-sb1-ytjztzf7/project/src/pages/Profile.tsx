import React from 'react';
import { Settings, ShoppingBag, Heart, LogOut } from 'lucide-react';

export function Profile() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">JD</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
            <p className="text-gray-600">john.doe@example.com</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900">Total Orders</h3>
            <p className="text-2xl font-bold text-blue-600">12</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900">Wishlist Items</h3>
            <p className="text-2xl font-bold text-blue-600">5</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900">Reviews</h3>
            <p className="text-2xl font-bold text-blue-600">8</p>
          </div>
        </div>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Order History</span>
            </div>
          </button>
          
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Wishlist</span>
            </div>
          </button>
          
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Settings</span>
            </div>
          </button>
          
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-red-600">
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}