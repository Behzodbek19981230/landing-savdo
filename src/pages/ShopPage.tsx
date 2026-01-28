import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Search } from 'lucide-react';
import { products } from '../data/products';
import { CategoryTabs } from '../components/CategoryTabs';
import { ProductCard } from '../components/ProductCard';
import { Cart } from '../components/Cart';
import { useCart } from '../hooks/useCart';
import { Category } from '../types';
export function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState<Category>('Barchasi');
    const { totalItems, setIsOpen } = useCart();
    const filteredProducts =
        selectedCategory === 'Barchasi' ?
            products :
            products.filter((p) => p.category === selectedCategory);
    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-market-bg/80 backdrop-blur-md border-b border-blue-100">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-tr from-market-orange to-market-pink rounded-xl flex items-center justify-center text-white shadow-lg shadow-market-orange/30">
                            <ShoppingBag size={20} strokeWidth={3} />
                        </div>
                        <h1 className="text-2xl font-extrabold tracking-tight">
                            <span className="text-gray-900">Elegant</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-market-orange to-market-pink">
                                Chinni
                            </span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="relative p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 group">

                            <ShoppingBag
                                size={24}
                                className="text-gray-700 group-hover:text-market-orange transition-colors" />

                            {totalItems > 0 &&
                                <span className="absolute -top-1 -right-1 w-6 h-6 bg-market-pink text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white">
                                    {totalItems}
                                </span>
                            }
                        </button>
                    </div>
                </div>
            </header>

            <main className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero / Welcome */}
                {/* <div className="mb-12 text-center max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Zamonaviy Savdo, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-market-orange to-market-pink">
                            Ishonchli Xizmat.
                        </span>
                    </h2>
                    <p className="text-lg text-gray-500">
                        Kundalik hayotingiz uchun eng yaxshi mahsulotlar to'plami.
                    </p>
                </div> */}

                {/* Categories */}
                <div className="mb-10 flex justify-center">
                    <CategoryTabs
                        selected={selectedCategory}
                        onSelect={setSelectedCategory} />

                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                    {filteredProducts.map((product) =>
                        <motion.div
                            key={product.id}
                            layout
                            initial={{
                                opacity: 0,
                                scale: 0.9
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.9
                            }}
                            transition={{
                                duration: 0.3
                            }}>

                            <ProductCard product={product} />
                        </motion.div>
                    )}
                </motion.div>

                {filteredProducts.length === 0 &&
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500">
                            Bu kategoriyada mahsulot topilmadi.
                        </p>
                    </div>
                }
            </main>

            <Cart />
        </div>);

}