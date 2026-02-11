import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 640); // sm breakpoint
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        // Mobile: show fewer pages
        const maxVisible = isMobile ? 4 : 5;
        const showEllipsis = !isMobile;

        if (totalPages <= maxVisible) {
            // Show all pages if total is less than max visible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (isMobile) {
                // Mobile: show current page and neighbors only
                if (currentPage === 1) {
                    pages.push(1, 2);
                    if (totalPages > 2) pages.push(totalPages);
                } else if (currentPage === totalPages) {
                    pages.push(1);
                    if (totalPages > 2) pages.push(totalPages - 1, totalPages);
                } else {
                    pages.push(1);
                    pages.push(currentPage);
                    pages.push(totalPages);
                }
            } else {
                // Desktop: show more pages with ellipsis
                // Always show first page
                pages.push(1);

                if (currentPage <= 3) {
                    // Near the start
                    for (let i = 2; i <= 4; i++) {
                        pages.push(i);
                    }
                    if (showEllipsis) pages.push('...');
                    pages.push(totalPages);
                } else if (currentPage >= totalPages - 2) {
                    // Near the end
                    if (showEllipsis) pages.push('...');
                    for (let i = totalPages - 3; i <= totalPages; i++) {
                        pages.push(i);
                    }
                } else {
                    // In the middle
                    if (showEllipsis) pages.push('...');
                    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                        pages.push(i);
                    }
                    if (showEllipsis) pages.push('...');
                    pages.push(totalPages);
                }
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className='flex items-center justify-center gap-1 sm:gap-2 mt-8 sm:mt-12 mb-6 sm:mb-8 px-2'>
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white border border-gray-200 hover:border-market-orange hover:bg-market-orange/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all disabled:hover:border-gray-200 disabled:hover:bg-white'
                aria-label='Previous page'
            >
                <ChevronLeft
                    size={isMobile ? 18 : 20}
                    className={`${currentPage === 1 ? 'text-gray-400' : 'text-gray-700'}`}
                />
            </button>

            {/* Page Numbers */}
            <div className='flex items-center gap-1 sm:gap-2'>
                {pageNumbers.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className='px-1 sm:px-2 text-gray-400 text-sm sm:text-base hidden sm:inline'
                            >
                                ...
                            </span>
                        );
                    }

                    const pageNum = page as number;
                    const isActive = pageNum === currentPage;

                    return (
                        <motion.button
                            key={pageNum}
                            onClick={() => onPageChange(pageNum)}
                            className={`relative px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all ${isActive
                                ? 'text-white'
                                : 'text-gray-700 bg-white border border-gray-200 hover:border-market-orange hover:bg-market-orange/5'
                                }`}
                            whileHover={!isActive ? { scale: 1.05 } : {}}
                            whileTap={!isActive ? { scale: 0.95 } : {}}
                            aria-label={`Go to page ${pageNum}`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId='activePage'
                                    className='absolute inset-0 bg-gradient-to-r from-market-orange to-market-pink rounded-lg sm:rounded-xl shadow-lg shadow-market-orange/30'
                                    transition={{
                                        type: 'spring',
                                        bounce: 0.2,
                                        duration: 0.4,
                                    }}
                                />
                            )}
                            <span className='relative z-10'>{pageNum}</span>
                        </motion.button>
                    );
                })}
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className='p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white border border-gray-200 hover:border-market-orange hover:bg-market-orange/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all disabled:hover:border-gray-200 disabled:hover:bg-white'
                aria-label='Next page'
            >
                <ChevronRight
                    size={isMobile ? 18 : 20}
                    className={`${currentPage === totalPages ? 'text-gray-400' : 'text-gray-700'}`}
                />
            </button>
        </div>
    );
}
