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
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
    };

    const handleImageClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsImageOpen(true);
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setScale((prev) => Math.min(Math.max(1, prev + delta), 4));
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (scale > 1) {
            e.preventDefault();
            setIsDragging(true);
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && scale > 1) {
            e.preventDefault();
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const touchStartRef = React.useRef({ x: 0, y: 0, distance: 0 });

    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            // Pinch zoom start
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            touchStartRef.current = { x: position.x, y: position.y, distance };
        } else if (e.touches.length === 1 && scale > 1) {
            // Pan start
            const touch = e.touches[0];
            setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            const initialDistance = touchStartRef.current.distance;
            if (initialDistance > 0) {
                const newScale = Math.min(Math.max(1, scale * (distance / initialDistance)), 4);
                setScale(newScale);
                touchStartRef.current.distance = distance;
            }
        } else if (e.touches.length === 1 && scale > 1) {
            // Pan
            e.preventDefault();
            const touch = e.touches[0];
            setPosition({
                x: touch.clientX - dragStart.x,
                y: touch.clientY - dragStart.y
            });
        }
    };

    const handleDoubleClick = () => {
        if (scale > 1) {
            setScale(1);
            setPosition({ x: 0, y: 0 });
        } else {
            setScale(2);
        }
    };

    const resetZoom = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
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
                    <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-900 rounded-full">
                        {product.category}
                    </span>
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
                    <button
                        onClick={handleQuickAdd}
                        className="w-full py-3 px-4 bg-gradient-to-r from-market-orange to-market-pink text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <ShoppingCart size={18} strokeWidth={2.5} />
                        Savatchaga qo'shish
                    </button>
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
                        onClick={() => {
                            setIsImageOpen(false);
                            resetZoom();
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => {
                                setIsImageOpen(false);
                                resetZoom();
                            }}
                            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-20"
                        >
                            <X size={24} />
                        </button>

                        {/* Zoom Controls */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setScale((prev) => Math.min(prev + 0.5, 4));
                                }}
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="11" y1="8" x2="11" y2="14"></line>
                                    <line x1="8" y1="11" x2="14" y2="11"></line>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setScale((prev) => Math.max(prev - 0.5, 1));
                                }}
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="8" y1="11" x2="14" y2="11"></line>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </button>
                            {scale > 1 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        resetZoom();
                                    }}
                                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm text-xs font-bold"
                                >
                                    1:1
                                </button>
                            )}
                        </div>

                        {/* Image Container */}
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="relative max-w-4xl w-full"
                            onClick={(e) => e.stopPropagation()}
                            onWheel={handleWheel}
                        >
                            <div
                                className={`relative overflow-hidden rounded-2xl ${scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
                                onMouseDown={handleMouseDown}
                                onMouseMove={handleMouseMove}
                                onMouseUp={handleMouseUp}
                                onMouseLeave={handleMouseUp}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onDoubleClick={handleDoubleClick}
                                style={{
                                    touchAction: scale > 1 ? 'none' : 'auto'
                                }}
                            >
                                <img
                                    src={product.images[currentImageIndex]}
                                    alt={product.name}
                                    className="w-full h-auto max-h-[80vh] object-contain select-none"
                                    style={{
                                        transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                                        transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                                        transformOrigin: 'center center'
                                    }}
                                    draggable={false}
                                />

                            </div>

                            {/* Navigation Arrows */}
                            {product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            prevImage();
                                        }}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors backdrop-blur-sm z-10"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="15 18 9 12 15 6"></polyline>
                                        </svg>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            nextImage();
                                        }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors backdrop-blur-sm z-10"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </button>

                                    {/* Image Counter */}
                                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm z-10">
                                        {currentImageIndex + 1} / {product.images.length}
                                    </div>
                                </>
                            )}

                            {/* Zoom Indicator */}
                            {scale > 1 && (
                                <div className="absolute top-4 right-20 px-3 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm z-10">
                                    {Math.round(scale * 100)}%
                                </div>
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