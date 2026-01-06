import React from 'react';
import { useCategories } from '../hooks/useCategories';

interface MobileNavProps {
  activeCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeCategory, onCategoryClick }) => {
  const { categories } = useCategories();

  return (
    <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-koibito-gray md:hidden shadow-sm">
      <div className="flex overflow-x-auto scrollbar-hide px-4 py-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className={`flex-shrink-0 flex items-center space-x-2 px-5 py-2 rounded-sm mr-2 transition-all duration-300 ${activeCategory === category.id
                ? 'bg-koibito-red text-white'
                : 'bg-koibito-gray text-koibito-dark hover:bg-gray-200'
              }`}
          >
            <span className="text-lg opacity-80">{category.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;