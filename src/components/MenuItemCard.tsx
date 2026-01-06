import React, { useState } from 'react';
import { Plus, Minus, X } from 'lucide-react';
import { MenuItem, Variation, AddOn } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity?: number, variation?: Variation, addOns?: AddOn[]) => void;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onAddToCart,
  quantity,
  onUpdateQuantity
}) => {
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<Variation | undefined>(
    item.variations?.[0]
  );
  const [selectedAddOns, setSelectedAddOns] = useState<(AddOn & { quantity: number })[]>([]);

  const calculatePrice = () => {
    // Use effective price (discounted or regular) as base
    let price = item.effectivePrice || item.basePrice;
    if (selectedVariation) {
      price = (item.effectivePrice || item.basePrice) + selectedVariation.price;
    }
    selectedAddOns.forEach(addOn => {
      price += addOn.price * addOn.quantity;
    });
    return price;
  };

  const handleAddToCart = () => {
    if (item.variations?.length || item.addOns?.length) {
      setShowCustomization(true);
    } else {
      onAddToCart(item, 1);
    }
  };

  const handleCustomizedAddToCart = () => {
    // Convert selectedAddOns back to regular AddOn array for cart
    const addOnsForCart: AddOn[] = selectedAddOns.flatMap(addOn =>
      Array(addOn.quantity).fill({ ...addOn, quantity: undefined })
    );
    onAddToCart(item, 1, selectedVariation, addOnsForCart);
    setShowCustomization(false);
    setSelectedAddOns([]);
  };

  const handleIncrement = () => {
    onUpdateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onUpdateQuantity(item.id, quantity - 1);
    }
  };

  const updateAddOnQuantity = (addOn: AddOn, quantity: number) => {
    setSelectedAddOns(prev => {
      const existingIndex = prev.findIndex(a => a.id === addOn.id);

      if (quantity === 0) {
        // Remove add-on if quantity is 0
        return prev.filter(a => a.id !== addOn.id);
      }

      if (existingIndex >= 0) {
        // Update existing add-on quantity
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], quantity };
        return updated;
      } else {
        // Add new add-on with quantity
        return [...prev, { ...addOn, quantity }];
      }
    });
  };

  const groupedAddOns = item.addOns?.reduce((groups, addOn) => {
    const category = addOn.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(addOn);
    return groups;
  }, {} as Record<string, AddOn[]>);

  return (
    <>
      <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group animate-scale-in border border-koibito-gray ${!item.available ? 'opacity-60' : ''}`}>
        {/* Image Container with Badges */}
        <div className="relative h-56 bg-koibito-gray">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`absolute inset-0 flex items-center justify-center ${item.image ? 'hidden' : ''}`}>
            <div className="text-6xl opacity-10 text-koibito-dark font-display">🍱</div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {item.isOnDiscount && item.discountPrice && (
              <div className="bg-koibito-red text-white text-[10px] font-bold px-3 py-1 rounded-sm shadow-sm tracking-widest uppercase">
                SALE
              </div>
            )}
            {item.popular && (
              <div className="bg-koibito-accent text-white text-[10px] font-bold px-3 py-1 rounded-sm shadow-sm tracking-widest uppercase">
                ⭐ BEST SELLER
              </div>
            )}
          </div>

          {!item.available && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white/90 text-koibito-red text-xs font-bold px-4 py-2 rounded-sm shadow-lg tracking-[0.1em] uppercase">
                UNAVAILABLE
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-display text-2xl text-koibito-dark leading-tight flex-1 pr-2">{item.name}</h4>
          </div>

          <p className={`text-sm mb-6 font-sans leading-relaxed ${!item.available ? 'text-gray-400' : 'text-gray-600'}`}>
            {!item.available ? 'This item is currently out of stock.' : item.description}
          </p>

          {/* Pricing Section */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex-1">
              {item.isOnDiscount && item.discountPrice ? (
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-display text-koibito-red">
                      ₱{item.discountPrice.toFixed(0)}
                    </span>
                    <span className="text-sm text-gray-400 font-sans line-through decoration-red-900/40">
                      ₱{item.basePrice.toFixed(0)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-2xl font-display text-koibito-dark">
                  ₱{item.basePrice.toFixed(0)}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex-shrink-0">
              {!item.available ? (
                <button
                  disabled
                  className="border border-gray-200 text-gray-400 px-6 py-2 rounded-sm cursor-not-allowed font-sans text-xs uppercase tracking-widest"
                >
                  SOLD OUT
                </button>
              ) : quantity === 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="bg-koibito-red text-white px-6 py-2 rounded-sm hover:opacity-90 transition-all duration-300 font-sans text-xs uppercase tracking-[0.1em] shadow-sm active:scale-95"
                >
                  {item.variations?.length || item.addOns?.length ? 'Customize' : 'Add Order'}
                </button>
              ) : (
                <div className="flex items-center space-x-3 bg-koibito-gray px-2 py-1 rounded-sm border border-gray-200">
                  <button
                    onClick={handleDecrement}
                    className="p-1.5 hover:bg-white rounded-sm transition-all duration-200 text-koibito-dark"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-display text-xl text-koibito-dark min-w-[24px] text-center">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    className="p-1.5 hover:bg-white rounded-sm transition-all duration-200 text-koibito-dark"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customization Modal */}
      {showCustomization && (
        <div className="fixed inset-0 bg-koibito-dark/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-sm max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-koibito-red/10">
            <div className="sticky top-0 bg-white border-b border-koibito-gray p-4 md:p-6 flex items-center justify-between z-10">
              <div>
                <h3 className="font-display text-xl md:text-2xl text-koibito-dark tracking-tight">Customize {item.name}</h3>
                <p className="text-[9px] md:text-sm font-sans text-gray-400 mt-0.5 uppercase tracking-widest leading-none">Select your order details</p>
              </div>
              <button
                onClick={() => setShowCustomization(false)}
                className="p-2 hover:bg-koibito-gray rounded-full transition-colors duration-200"
              >
                <X className="h-5 w-5 text-koibito-dark" />
              </button>
            </div>

            <div className="p-4 md:p-6 pb-32 md:pb-36">
              {/* Size Variations */}
              {item.variations && item.variations.length > 0 && (
                <div className="mb-8">
                  <h4 className="font-display text-xl text-koibito-dark mb-4">Select Option</h4>
                  <div className="space-y-3">
                    {item.variations.map((variation) => (
                      <label
                        key={variation.id}
                        className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer transition-all duration-200 ${selectedVariation?.id === variation.id
                          ? 'border-koibito-red bg-koibito-red/5'
                          : 'border-koibito-gray hover:border-gray-300 hover:bg-gray-50'
                          }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="variation"
                            checked={selectedVariation?.id === variation.id}
                            onChange={() => setSelectedVariation(variation)}
                            className="text-koibito-red focus:ring-koibito-red"
                          />
                          <span className="font-sans text-sm font-medium text-koibito-dark">{variation.name}</span>
                        </div>
                        <span className="font-display text-lg text-koibito-red">
                          ₱{((item.effectivePrice || item.basePrice) + variation.price).toFixed(0)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Add-ons */}
              {groupedAddOns && Object.keys(groupedAddOns).length > 0 && (
                <div className="mb-8">
                  <h4 className="font-display text-xl text-koibito-dark mb-4">Extras</h4>
                  {Object.entries(groupedAddOns).map(([category, addOns]) => (
                    <div key={category} className="mb-6 last:mb-0">
                      <h5 className="text-[10px] font-bold text-koibito-red uppercase tracking-[0.2em] mb-3">
                        {category.replace('-', ' ')}
                      </h5>
                      <div className="space-y-3">
                        {addOns.map((addOn) => (
                          <div
                            key={addOn.id}
                            className="flex items-center justify-between p-4 border border-koibito-gray rounded-sm hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                          >
                            <div className="flex-1">
                              <span className="font-sans text-sm text-koibito-dark">{addOn.name}</span>
                              <div className="text-xs text-gray-400 font-sans mt-0.5">
                                {addOn.price > 0 ? `+ ₱${addOn.price.toFixed(0)}` : 'Included'}
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              {selectedAddOns.find(a => a.id === addOn.id) ? (
                                <div className="flex items-center space-x-3 bg-koibito-gray px-2 py-1 rounded-sm border border-gray-200">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = selectedAddOns.find(a => a.id === addOn.id);
                                      updateAddOnQuantity(addOn, (current?.quantity || 1) - 1);
                                    }}
                                    className="p-1 hover:bg-white rounded-sm transition-all duration-200"
                                  >
                                    <Minus className="h-3 w-3 text-koibito-dark" />
                                  </button>
                                  <span className="font-display text-lg text-koibito-dark min-w-[20px] text-center">
                                    {selectedAddOns.find(a => a.id === addOn.id)?.quantity || 0}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = selectedAddOns.find(a => a.id === addOn.id);
                                      updateAddOnQuantity(addOn, (current?.quantity || 0) + 1);
                                    }}
                                    className="p-1 hover:bg-white rounded-sm transition-all duration-200"
                                  >
                                    <Plus className="h-3 w-3 text-koibito-dark" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => updateAddOnQuantity(addOn, 1)}
                                  className="px-4 py-1.5 bg-koibito-red text-white rounded-sm hover:opacity-90 transition-all duration-200 text-[10px] font-bold uppercase tracking-widest shadow-sm"
                                >
                                  ADD
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Price Summary Sticky Footer */}
            <div className="sticky bottom-0 bg-white border-t border-koibito-gray p-4 md:p-6 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-lg md:text-xl text-koibito-dark uppercase tracking-widest">Total Price</span>
                <span className="font-display text-2xl md:text-3xl text-koibito-red">₱{calculatePrice().toFixed(0)}</span>
              </div>
              <button
                onClick={handleCustomizedAddToCart}
                className="w-full bg-koibito-red text-white py-4 rounded-sm hover:opacity-90 transition-all duration-300 font-display text-xl tracking-widest shadow-md active:scale-[0.98]"
              >
                ADD TO ORDERS
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemCard;