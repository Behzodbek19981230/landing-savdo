import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { Button } from './ui/Button';
import { getDefaultImage } from '../utils/defaultImage';
export function Cart() {
    const { isOpen, setIsOpen, items, removeItem, updateQuantity, totalPrice } =
        useCart();
    return (
        <AnimatePresence>
            {isOpen &&
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        exit={{
                            opacity: 0
                        }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />


                    {/* Cart Panel */}
                    <motion.div
                        initial={{
                            x: '100%'
                        }}
                        animate={{
                            x: 0
                        }}
                        exit={{
                            x: '100%'
                        }}
                        transition={{
                            type: 'spring',
                            damping: 30,
                            stiffness: 300
                        }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">

                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-market-orange/10 rounded-full text-market-orange">
                                    <ShoppingBag size={24} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Savatingiz</h2>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors">

                                <X size={24} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ?
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                        <ShoppingBag size={48} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">
                                            Savatingiz bo'sh
                                        </h3>
                                        <p className="text-gray-500 mt-2">
                                            Hali hech narsa qo'shmagansiz.
                                        </p>
                                    </div>
                                    <Button onClick={() => setIsOpen(false)} variant="secondary">
                                        Xaridni boshlash
                                    </Button>
                                </div> :

                                <AnimatePresence initial={false}>
                                    {items.map((item) =>
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{
                                                opacity: 0,
                                                y: 20
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0
                                            }}
                                            exit={{
                                                opacity: 0,
                                                x: -100
                                            }}
                                            className="flex gap-4">

                                            <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                                <img
                                                    src={item.images?.[0] || getDefaultImage()}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        if (target.src !== getDefaultImage()) {
                                                            target.src = getDefaultImage();
                                                        }
                                                    }}
                                                />

                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="font-bold text-gray-900">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {item.selectedColor}{' '}
                                                        {item.selectedSize && `• ${item.selectedSize}`}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1">
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(item.id, item.quantity - 1)
                                                            }
                                                            className="p-1 hover:text-market-orange transition-colors">

                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="font-semibold w-4 text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(item.id, item.quantity + 1)
                                                            }
                                                            className="p-1 hover:text-market-orange transition-colors">

                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-bold text-gray-900">
                                                            {(item.price * item.quantity).toLocaleString('uz-UZ')} so'm
                                                        </span>
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="text-gray-400 hover:text-red-500 transition-colors">

                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            }
                        </div>

                        {/* Footer */}
                        {items.length > 0 &&
                            <div className="p-6 border-t border-gray-100 bg-gray-50">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-500 font-medium">Jami</span>
                                    <span className="text-2xl font-bold text-gray-900">
                                        {totalPrice.toLocaleString('uz-UZ')} so'm
                                    </span>
                                </div>
                                <Button className="w-full" size="lg">
                                    To'lovga o'tish
                                </Button>
                            </div>
                        }
                    </motion.div>
                </>
            }
        </AnimatePresence>);

}