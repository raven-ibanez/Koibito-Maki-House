import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface FloatingCartButtonProps {
  itemCount: number;
  onCartClick: () => void;
}

const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({ itemCount, onCartClick }) => {
  if (itemCount === 0) return null;

  return (
    <button
      onClick={onCartClick}
      className="fixed bottom-6 right-6 bg-koibito-red text-white p-4 rounded-full shadow-2xl hover:opacity-90 transition-all duration-300 transform active:scale-90 z-40 md:hidden border-2 border-white"
    >
      <div className="relative">
        <ShoppingCart className="h-6 w-6" />
        <span className="absolute -top-3 -right-3 bg-white text-koibito-red text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-sm">
          {itemCount}
        </span>
      </div>
    </button>
  );
};

export default FloatingCartButton;