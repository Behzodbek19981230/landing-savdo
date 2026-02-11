import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Loader2, Search, X } from 'lucide-react';
import { CategoryTabs } from '../components/CategoryTabs';
import { ProductCard } from '../components/ProductCard';
import { Cart } from '../components/Cart';
import { useCart } from '../hooks/useCart';
import { useCategories } from '../hooks/useCategories';
import { useProducts } from '../hooks/useProducts';
import { ApiProduct } from '../api/types';

export function ShopPage() {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
    const [openDescriptionId, setOpenDescriptionId] = useState<number | null>(null);
    const [page, setPage] = useState(1);
    const [limit] = useState(20); // Default limit (changed to 20)
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const { totalItems, setIsOpen } = useCart();

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Fetch categories and products
    const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
    const { data: productsData, isLoading: productsLoading } = useProducts(
        selectedCategoryId,
        page,
        limit,
        debouncedSearch,
    );

    const categories = categoriesData?.results || [];

    // Accumulate paginated results for infinite scroll
    const pageResults = useMemo(() => productsData?.results || [], [productsData?.results]);
    const [allProducts, setAllProducts] = useState<ApiProduct[]>([]);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    const pagination = productsData?.pagination;
    const isLoading = categoriesLoading || productsLoading;

    // Reset page and products when category or search changes
    useEffect(() => {
        setPage(1);
        setAllProducts([]);
        // Scroll to top when category or search changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [selectedCategoryId, debouncedSearch]);

    // Accumulate products when new page results arrive
    useEffect(() => {
        if (!pageResults || pageResults.length === 0) return;

        if (page === 1) {
            // First page - replace all products
            setAllProducts(pageResults);
        } else {
            // Save scroll position before adding new products
            const savedScrollY = window.scrollY;

            // Subsequent pages - append new products (avoid duplicates)
            setAllProducts((prev) => {
                const existingIds = new Set(prev.map((p) => p.id));
                const newProducts = pageResults.filter((p) => !existingIds.has(p.id));
                return [...prev, ...newProducts];
            });

            // Restore scroll position after DOM updates
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    window.scrollTo({
                        top: savedScrollY,
                        behavior: 'auto',
                    });
                });
            });
        }
    }, [pageResults, page]);

    // IntersectionObserver to load next page when sentinel is visible
    useEffect(() => {
        const node = sentinelRef.current;
        if (!node || isLoading) return;

        const currentPageNum = pagination?.currentPage || page;
        const lastPage = pagination?.lastPage || 1;

        // Don't observe if we've reached the last page
        if (currentPageNum >= lastPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isLoading && currentPageNum < lastPage) {
                        setPage((p) => p + 1);
                    }
                });
            },
            { root: null, rootMargin: '200px', threshold: 0.1 },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [isLoading, pagination, page]);

    // Handle description toggle - close others when one opens
    const handleDescriptionToggle = (productId: number) => {
        setOpenDescriptionId((prev) => (prev === productId ? null : productId));
    };
    return (
        <div className='min-h-screen pb-20'>
            {/* Header */}
            <header className='sticky top-0 z-30 bg-market-bg/80 backdrop-blur-md border-b border-blue-100'>
                <div className=' mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <div className='w-10 h-10 bg-gradient-to-tr from-market-orange to-market-pink rounded-xl flex items-center justify-center text-white shadow-lg shadow-market-orange/30'>
                            <ShoppingBag size={20} strokeWidth={3} />
                        </div>
                        <h1 className='text-2xl font-extrabold tracking-tight'>
                            <span className='text-gray-900'>Elegant</span>
                            <span className='text-transparent bg-clip-text bg-gradient-to-r from-market-orange to-market-pink'>
                                Chinni
                            </span>
                        </h1>
                    </div>

                    <div className='flex items-center gap-4'>
                        <button
                            onClick={() => setIsOpen(true)}
                            className='relative p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 group'
                        >
                            <ShoppingBag
                                size={24}
                                className='text-gray-700 group-hover:text-market-orange transition-colors'
                            />

                            {totalItems > 0 && (
                                <span className='absolute -top-1 -right-1 w-6 h-6 bg-market-pink text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white'>
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            <main className=' mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Search Bar */}
                <div className='mb-6 max-w-2xl mx-auto'>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                            <Search className='h-5 w-5 text-gray-400' />
                        </div>
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Mahsulotlarni qidirish...'
                            className='w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-market-orange focus:border-transparent transition-all shadow-sm hover:shadow-md'
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors'
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Categories */}
                {!categoriesLoading && (
                    <div className='mb-10 flex justify-center'>
                        <CategoryTabs
                            categories={categories}
                            selectedId={selectedCategoryId}
                            onSelect={setSelectedCategoryId}
                        />
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className='flex justify-center items-center py-20'>
                        <Loader2 className='w-12 h-12 animate-spin text-market-orange' />
                    </div>
                )}

                {/* Grid */}
                {!isLoading && (
                    <>
                        <motion.div layout className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6'>
                            {allProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                    }}
                                >
                                    <ProductCard
                                        product={product}
                                        isDescriptionOpen={openDescriptionId === product.id}
                                        onDescriptionToggle={() => handleDescriptionToggle(product.id)}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>

                        <div ref={sentinelRef} />

                        {productsLoading && allProducts.length > 0 && (
                            <div className='flex justify-center items-center py-6'>
                                <Loader2 className='w-8 h-8 animate-spin text-market-orange' />
                            </div>
                        )}
                    </>
                )}

                {/* Empty State */}
                {!isLoading && allProducts.length === 0 && (
                    <div className='text-center py-20'>
                        {searchQuery ? (
                            <>
                                <p className='text-xl text-gray-500 mb-2'>
                                    "{searchQuery}" bo'yicha mahsulot topilmadi.
                                </p>
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className='text-market-orange hover:text-market-pink font-semibold transition-colors'
                                >
                                    Qidiruvni tozalash
                                </button>
                            </>
                        ) : (
                            <p className='text-xl text-gray-500'>Bu kategoriyada mahsulot topilmadi.</p>
                        )}
                    </div>
                )}
            </main>

            <Cart />
        </div>
    );
}
