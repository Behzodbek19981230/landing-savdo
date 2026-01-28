import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Eye, X, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();
    const [isImageOpen, setIsImageOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
    };

    const handleImageClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsImageOpen(true);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    return (
        <>
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
                    <img onClick={handleImageClick}
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full cursor-pointer object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Action Buttons - Show on Hover */}
                    {/* <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <motion.button
                            onClick={handleImageClick}
                            className="p-3 bg-white text-gray-900 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                            whileTap={{ scale: 0.9 }}
                            initial={{ y: 20 }}
                            whileHover={{ y: 0 }}
                        >
                            <Eye size={20} strokeWidth={2.5} />
                        </motion.button>

                        <motion.button
                            onClick={handleQuickAdd}
                            className="p-3 bg-market-pink text-white rounded-full shadow-lg hover:bg-market-orange transition-colors"
                            whileTap={{ scale: 0.9 }}
                            initial={{ y: 20 }}
                            whileHover={{ y: 0 }}
                        >
                            <ShoppingCart size={20} strokeWidth={2.5} />
                        </motion.button>
                    </div> */}

                    {/* Category Tag */}
                    <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-900 rounded-full">
                        {product.category}
                    </span>
                </div>

                {/* Info */}
                <div className="space-y-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-gray-900 text-lg leading-tight">
                            {product.name}
                        </h3>
                    </div>
                    <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-market-orange to-market-pink">
                        {product.price.toLocaleString('uz-UZ')} so'm
                    </p>
                </div>
            </motion.div>

            {/* Image Modal */}
            <AnimatePresence>
                {isImageOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                        onClick={() => setIsImageOpen(false)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsImageOpen(false)}
                            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
                        >
                            <X size={24} />
                        </button>

                        {/* Image Container */}
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="relative max-w-4xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={product.images[currentImageIndex]}
                                alt={product.name}
                                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
                            />

                            {/* Navigation Arrows */}
                            {product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors backdrop-blur-sm"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="15 18 9 12 15 6"></polyline>
                                        </svg>
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors backdrop-blur-sm"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </button>

                                    {/* Image Counter */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                                        {currentImageIndex + 1} / {product.images.length}
                                    </div>
                                </>
                            )}

                            {/* Product Info */}
                            {/* <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white">
                                <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                                <p className="text-2xl font-bold text-market-orange">
                                    {product.price.toLocaleString('uz-UZ')} so'm
                                </p>
                            </div> */}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}