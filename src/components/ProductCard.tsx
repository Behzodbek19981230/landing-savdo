import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
interface ProductCardProps {
    product: Product;
}
export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();
    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
    };
    return (
        <Link to={`/product/${product.id}`} className="block h-full">
            <motion.div
                className="group relative h-full bg-white rounded-3xl p-4 shadow-market transition-all duration-300 hover:shadow-market-hover"
                whileHover={{
                    y: -8
                }}
                initial={{
                    opacity: 0,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}>

                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 mb-4">
                    <motion.img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover object-center"
                        whileHover={{
                            scale: 1.05
                        }}
                        transition={{
                            duration: 0.4
                        }} />


                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-market-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Quick Add Button */}
                    <motion.button
                        onClick={handleQuickAdd}
                        className="absolute bottom-3 right-3 p-3 bg-white text-market-pink rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-market-pink hover:text-white"
                        whileTap={{
                            scale: 0.9
                        }}>

                        <Plus size={20} strokeWidth={3} />
                    </motion.button>

                    {/* Category Tag */}
                    <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-900 rounded-full">
                        {product.category}
                    </span>
                </div>

                {/* Info */}
                <div className="space-y-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-market-pink transition-colors">
                            {product.name}
                        </h3>
                    </div>
                    <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-market-orange to-market-pink">
                        {product.price.toLocaleString('uz-UZ')} so'm
                    </p>
                </div>
            </motion.div>
        </Link>);

}