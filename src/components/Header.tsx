import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onMenuClick }) => {
  const { siteSettings, loading } = useSiteSettings();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-koibito-gray shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <button
            onClick={onMenuClick}
            className="flex items-center space-x-3 text-koibito-dark hover:text-koibito-red transition-all duration-300"
          >
            {loading ? (
              <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse" />
            ) : (
              <img
                src={siteSettings?.site_logo || "/logo.jpg"}
                alt={siteSettings?.site_name || "Koibito Maki House"}
                className="w-10 h-10 md:w-12 md:h-12 rounded object-cover ring-2 ring-koibito-gray"
                onError={(e) => {
                  e.currentTarget.src = "/logo.jpg";
                }}
              />
            )}
            <div className="flex flex-col text-left">
              <span className="font-display text-2xl sm:text-3xl text-koibito-dark tracking-tighter leading-none">
                {loading ? "..." : (siteSettings?.site_name === "Ramen Yard" ? "KOIBITO" : siteSettings?.site_name)}
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-koibito-red font-semibold -mt-0.5">
                Authentic Maki Foodhouse
              </span>
            </div>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={onCartClick}
              className="relative p-2 text-koibito-dark hover:text-koibito-red hover:bg-koibito-gray/50 rounded-full transition-all duration-300"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-koibito-red text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full ring-2 ring-white">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;