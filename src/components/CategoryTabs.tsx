import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Laptop, Shirt, Home, Coffee } from 'lucide-react';
import { Category } from '../types';
interface CategoryTabsProps {
  selected: Category;
  onSelect: (category: Category) => void;
}
const categories: {
  id: Category;
  label: string;
  icon: React.ElementType;
}[] = [
{
  id: 'All',
  label: 'All Items',
  icon: ShoppingBag
},
{
  id: 'Electronics',
  label: 'Tech',
  icon: Laptop
},
{
  id: 'Fashion',
  label: 'Style',
  icon: Shirt
},
{
  id: 'Home',
  label: 'Living',
  icon: Home
},
{
  id: 'Food',
  label: 'Snacks',
  icon: Coffee
}];

export function CategoryTabs({ selected, onSelect }: CategoryTabsProps) {
  return (
    <div className="w-full overflow-x-auto pb-4 pt-2 no-scrollbar">
      <div className="flex space-x-2 min-w-max px-1">
        {categories.map((cat) => {
          const isSelected = selected === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className="relative px-6 py-3 rounded-2xl outline-none group">

              {isSelected &&
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gray-900 rounded-2xl shadow-lg shadow-gray-900/20"
                transition={{
                  type: 'spring',
                  bounce: 0.2,
                  duration: 0.6
                }} />

              }

              <span
                className={`relative z-10 flex items-center gap-2 font-bold transition-colors duration-200 ${isSelected ? 'text-white' : 'text-gray-500 group-hover:text-gray-900'}`}>

                <motion.div
                  animate={
                  isSelected ?
                  {
                    rotate: [0, -10, 10, 0],
                    scale: 1.1
                  } :
                  {
                    rotate: 0,
                    scale: 1
                  }
                  }
                  transition={{
                    duration: 0.4
                  }}>

                  <Icon size={18} />
                </motion.div>
                {cat.label}
              </span>
            </button>);

        })}
      </div>
    </div>);

}