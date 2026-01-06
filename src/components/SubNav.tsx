import React from 'react';
import { useCategories } from '../hooks/useCategories';

interface SubNavProps {
  selectedCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const SubNav: React.FC<SubNavProps> = ({ selectedCategory, onCategoryClick }) => {
  const { categories, loading } = useCategories();

  return (
    <div className="sticky top-16 sm:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-koibito-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-6 overflow-x-auto py-4 scrollbar-hide">
          {loading ? (
            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-8 w-24 bg-koibito-gray flex-shrink-0 animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <button
                onClick={() => onCategoryClick('all')}
                className={`py-1 text-sm transition-all duration-300 border-b-2 uppercase tracking-widest font-sans font-bold flex-shrink-0 ${selectedCategory === 'all'
                    ? 'text-koibito-red border-koibito-red'
                    : 'text-gray-400 border-transparent hover:text-koibito-dark'
                  }`}
              >
                All Items
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onCategoryClick(c.id)}
                  className={`py-1 text-sm transition-all duration-300 border-b-2 uppercase tracking-widest font-sans font-bold flex-shrink-0 flex items-center space-x-2 ${selectedCategory === c.id
                      ? 'text-koibito-red border-koibito-red'
                      : 'text-gray-400 border-transparent hover:text-koibito-dark'
                    }`}
                >
                  <span className="text-lg">{c.icon}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubNav;


