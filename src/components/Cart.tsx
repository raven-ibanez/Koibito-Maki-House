import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  getTotalPrice,
  onContinueShopping,
  onCheckout
}) => {
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 pb-40">
        <div className="text-center py-16">
          <div className="text-7xl mb-6 opacity-20">🍱</div>
          <h2 className="text-4xl font-display text-koibito-dark mb-4">Your basket is empty</h2>
          <p className="font-sans text-gray-500 mb-10 uppercase tracking-widest text-xs">Add some authentic Maki to get started!</p>
          <button
            onClick={onContinueShopping}
            className="bg-koibito-red text-white px-10 py-3 rounded-sm hover:opacity-90 transition-all duration-300 font-sans text-xs font-bold uppercase tracking-widest shadow-md"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pb-40">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <button
          onClick={onContinueShopping}
          className="flex items-center space-x-2 text-gray-400 hover:text-koibito-dark transition-colors duration-300 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest">Back to Menu</span>
        </button>
        <h1 className="text-5xl font-display text-koibito-dark text-center">ORDER BASKET</h1>
        <button
          onClick={clearCart}
          className="text-gray-400 hover:text-koibito-red transition-colors duration-300 font-sans text-[10px] font-bold uppercase tracking-widest"
        >
          Clear All
        </button>
      </div>

      <div className="bg-white rounded-sm shadow-sm border border-koibito-gray overflow-hidden mb-12">
        {cartItems.map((item, index) => (
          <div key={item.id} className={`p-8 ${index !== cartItems.length - 1 ? 'border-b border-koibito-gray' : ''}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-display text-koibito-dark mb-2 tracking-tight">{item.name}</h3>
                <div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  {item.selectedVariation && (
                    <span className="bg-koibito-gray px-2 py-1 rounded-sm">Size: {item.selectedVariation.name}</span>
                  )}
                  {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                    <span className="bg-koibito-gray px-2 py-1 rounded-sm">
                      Extras: {item.selectedAddOns.map(addOn =>
                        addOn.quantity && addOn.quantity > 1
                          ? `${addOn.name} x${addOn.quantity}`
                          : addOn.name
                      ).join(', ')}
                    </span>
                  )}
                </div>
                <p className="font-display text-xl text-koibito-red mt-4">₱{item.totalPrice.toFixed(0)} <span className="text-[10px] text-gray-400 uppercase tracking-widest font-sans ml-1">each</span></p>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4 bg-koibito-gray rounded-sm p-1.5 border border-gray-200">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1.5 hover:bg-white rounded-sm transition-all duration-200 text-koibito-dark"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-display text-2xl text-koibito-dark min-w-[32px] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 hover:bg-white rounded-sm transition-all duration-200 text-koibito-dark"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="text-right min-w-[100px]">
                  <p className="font-display text-2xl text-koibito-dark">₱{(item.totalPrice * item.quantity).toFixed(0)}</p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-300 hover:text-koibito-red transition-all duration-300"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-koibito-gray rounded-sm p-10 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-300">
          <span className="font-display text-2xl text-koibito-dark uppercase tracking-widest">Grand Total</span>
          <span className="font-display text-4xl text-koibito-red font-bold">₱{getTotalPrice().toFixed(0)}</span>
        </div>

        <button
          onClick={onCheckout}
          className="w-full bg-koibito-red text-white py-5 rounded-sm hover:opacity-95 transition-all duration-300 transform active:scale-[0.98] font-display text-2xl tracking-widest shadow-lg"
        >
          COMPLETE ORDER
        </button>
      </div>
    </div>
  );
};

export default Cart;