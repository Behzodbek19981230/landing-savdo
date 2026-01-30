import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Eye, X, ShoppingCart, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
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

    const closeModal = () => {
        setIsImageOpen(false);
        setCurrentImageIndex(0);
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
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 mb-4" onClick={handleImageClick}>
                    <img
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
                    {product.category_name && (
                        <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-900 rounded-full">
                            {product.category_name}
                        </span>
                    )}

                    {/* Stock Badge */}
                    {product.count !== undefined && product.count < 10 && product.count > 0 && (
                        <span className="absolute top-3 right-3 px-3 py-1 bg-red-500/90 backdrop-blur-sm text-xs font-bold text-white rounded-full">
                            {product.count} ta qoldi
                        </span>
                    )}
                </div>

                {/* Info */}
                <div className="space-y-3">
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">
                            {product.name}
                        </h3>
                        <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-market-orange to-market-pink">
                            {product.price.toLocaleString('uz-UZ')} so'm
                        </p>
                    </div>

                    {/* Add to Cart Button */}
                    {/* <button
                        onClick={handleQuickAdd}
                        className="w-full py-3 px-4 bg-gradient-to-r from-market-orange to-market-pink text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <ShoppingCart size={18} strokeWidth={2.5} />
                        Savatchaga qo'shish
                    </button> */}
                </div>
            </motion.div>

            {/* Image Modal with react-zoom-pan-pinch */}
            <AnimatePresence>
                {isImageOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                        onClick={closeModal}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-30"
                        >
                            <X size={24} />
                        </button>

                        {/* Image Container */}
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative w-full max-w-5xl h-[85vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <TransformWrapper
                                initialScale={1}
                                minScale={1}
                                maxScale={4}
                                doubleClick={{ mode: "toggle", step: 0.7 }}
                                wheel={{ step: 0.1 }}
                                pinch={{ step: 5 }}
                                panning={{ velocityDisabled: true }}
                            >
                                {({ zoomIn, zoomOut, resetTransform, instance }) => {
                                    const currentScale = instance?.transformState?.scale || 1;

                                    return (
                                        <>
                                            {/* Zoom Controls */}
                                            <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        zoomIn();
                                                    }}
                                                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
                                                    title="Zoom In"
                                                >
                                                    <ZoomIn size={20} />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        zoomOut();
                                                    }}
                                                    className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
                                                    title="Zoom Out"
                                                >
                                                    <ZoomOut size={20} />
                                                </button>
                                                {currentScale > 1 && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            resetTransform();
                                                        }}
                                                        className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
                                                        title="Reset"
                                                    >
                                                        <RotateCcw size={20} />
                                                    </button>
                                                )}
                                            </div>

                                            {/* Zoom Indicator */}
                                            {currentScale > 1 && (
                                                <div className="absolute top-4 right-20 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm font-medium z-20">
                                                    {Math.round(currentScale * 100)}%
                                                </div>
                                            )}

                                            {/* Transform Component */}
                                            <TransformComponent
                                                wrapperClass="!w-full !h-full"
                                                contentClass="!w-full !h-full flex items-center justify-center"
                                            >
                                                <img
                                                    src={product.images[currentImageIndex]}
                                                    alt={product.name}
                                                    className="max-w-full max-h-full object-contain select-none rounded-xl"
                                                    draggable={false}
                                                />
                                            </TransformComponent>

                                            {/* Navigation Arrows */}
                                            {product.images.length > 1 && (
                                                <>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            prevImage();
                                                            resetTransform();
                                                        }}
                                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors backdrop-blur-sm z-20"
                                                    >
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                            <polyline points="15 18 9 12 15 6"></polyline>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            nextImage();
                                                            resetTransform();
                                                        }}
                                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors backdrop-blur-sm z-20"
                                                    >
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                            <polyline points="9 18 15 12 9 6"></polyline>
                                                        </svg>
                                                    </button>

                                                    {/* Image Counter */}
                                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm font-medium z-20">
                                                        {currentImageIndex + 1} / {product.images.length}
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    );
                                }}
                            </TransformWrapper>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}