import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Package } from 'lucide-react';
import { ApiCategory } from '../api/types';

interface CategoryTabsProps {
    categories: ApiCategory[];
    selectedId?: number;
    onSelect: (categoryId: number | undefined) => void;
}

export function CategoryTabs({ categories, selectedId, onSelect }: CategoryTabsProps) {
    // Add "All" category at the beginning
    const allCategories = [
        { id: 0, name: 'Barchasi', sorting: 0, is_delete: false },
        ...categories.filter(cat => !cat.is_delete).sort((a, b) => a.sorting - b.sorting)
    ];
  return (
    <div className="w-full overflow-x-auto pb-4 pt-2 no-scrollbar">
      <div className="flex space-x-2 min-w-max px-1">
                {allCategories.map((cat) => {
                    const isSelected = selectedId === (cat.id === 0 ? undefined : cat.id);
                    const Icon = cat.id === 0 ? ShoppingBag : Package;
                    
          return (
            <button
              key={cat.id}
                            onClick={() => onSelect(cat.id === 0 ? undefined : cat.id)}
              className="relative px-6 py-3 rounded-2xl outline-none group">

                            {isSelected && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gray-900 rounded-2xl shadow-lg shadow-gray-900/20"
                transition={{
                  type: 'spring',
                  bounce: 0.2,
                  duration: 0.6
                                    }}
                                />
                            )}

              <span
                                className={`relative z-10 flex items-center gap-2 font-bold transition-colors duration-200 ${
                                    isSelected ? 'text-white' : 'text-gray-500 group-hover:text-gray-900'
                                }`}>

                <motion.div
                  animate={
                                        isSelected
                                            ? {
                    rotate: [0, -10, 10, 0],
                    scale: 1.1
                                            }
                                            : {
                    rotate: 0,
                    scale: 1
                  }
                  }
                  transition={{
                    duration: 0.4
                  }}>
                  <Icon size={18} />
                </motion.div>
                                {cat.name}
              </span>
                        </button>
                    );
        })}
      </div>
        </div>
    );
}