import { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Search, X, Filter, ChevronUp } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { FilterSelect } from '../components/FilterSelect';
import { Cart } from '../components/Cart';
import { useBranchCategories } from '../hooks/useBranchCategories';
import { useProductModels } from '../hooks/useProductModels';
import { useProductTypes } from '../hooks/useProductTypes';
import { useProducts } from '../hooks/useProducts';
import { ApiProduct } from '../api/types';

export function ShopPage() {
	const [selectedBranchCategoryId, setSelectedBranchCategoryId] = useState<number | undefined>(undefined);
	const [selectedModelId, setSelectedModelId] = useState<number | undefined>(undefined);
	const [selectedProductTypeId, setSelectedProductTypeId] = useState<number | undefined>(undefined);
	const [openDescriptionId, setOpenDescriptionId] = useState<number | null>(null);
	const [page, setPage] = useState(1);
	const [limit] = useState(20);
	const [searchQuery, setSearchQuery] = useState('');
	const [debouncedSearch, setDebouncedSearch] = useState('');
	const [showScrollTop, setShowScrollTop] = useState(false);
	// const { totalItems, setIsOpen } = useCart();

	// Scroll #root da bo'ladi (Telegram Web App layout), shu elementga listener
	const scrollThreshold = 200;
	useEffect(() => {
		const root = document.getElementById('root');
		if (!root) return;
		const onScroll = () => setShowScrollTop(root.scrollTop > scrollThreshold);
		onScroll();
		root.addEventListener('scroll', onScroll, { passive: true });
		return () => root.removeEventListener('scroll', onScroll);
	}, []);

	// Debounce search query
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(searchQuery);
		}, 500); // 500ms debounce

		return () => clearTimeout(timer);
	}, [searchQuery]);

	// Fetch filters and products (branch_category, product_model, product_type)
	const { data: branchCategoriesData } = useBranchCategories();
	const { data: productModelsData } = useProductModels();
	const { data: productTypesData } = useProductTypes();
	const { data: productsData, isLoading: productsLoading } = useProducts(
		undefined,
		page,
		limit,
		debouncedSearch,
		selectedBranchCategoryId,
		selectedModelId,
		selectedProductTypeId,
	);

	const branchCategories = branchCategoriesData?.results || [];
	const productTypesRaw = useMemo(() => productTypesData?.results || [], [productTypesData?.results]);
	// Product type: full list when model not selected; when model selected — only types for that model
	const productTypes = useMemo(() => {
		const list = productTypesRaw.filter((t) => !t.is_delete);
		if (!selectedModelId) return list.sort((a, b) => a.sorting - b.sorting || a.name.localeCompare(b.name));
		return list
			.filter((t) => t.madel === selectedModelId)
			.sort((a, b) => a.sorting - b.sorting || a.name.localeCompare(b.name));
	}, [productTypesRaw, selectedModelId]);
	const productModelsRaw = useMemo(() => productModelsData?.results || [], [productModelsData?.results]);
	const productModels = useMemo(() => {
		if (!selectedBranchCategoryId) return productModelsRaw;
		return productModelsRaw.filter((m) => !m.is_delete && m.branch_category === selectedBranchCategoryId);
	}, [productModelsRaw, selectedBranchCategoryId]);
	const productModelsAll = useMemo(() => productModelsRaw.filter((m) => !m.is_delete), [productModelsRaw]);

	// Accumulate paginated results for infinite scroll
	const pageResults = useMemo(() => productsData?.results || [], [productsData?.results]);
	const [allProducts, setAllProducts] = useState<ApiProduct[]>([]);
	const sentinelRef = useRef<HTMLDivElement | null>(null);
	const scrollRestoreRef = useRef<number | null>(null);

	const pagination = productsData?.pagination;
	const isInitialLoading = productsLoading && allProducts.length === 0;

	// Reset page and products when search or filters change
	useEffect(() => {
		setPage(1);
		setAllProducts([]);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [debouncedSearch, selectedBranchCategoryId, selectedModelId, selectedProductTypeId]);

	// When branch category changes, clear model if it no longer belongs
	useEffect(() => {
		if (!selectedModelId || !selectedBranchCategoryId) return;
		const model = productModelsRaw.find((m) => m.id === selectedModelId);
		if (model && model.branch_category !== selectedBranchCategoryId) setSelectedModelId(undefined);
	}, [selectedBranchCategoryId, selectedModelId, productModelsRaw]);

	// When model changes, clear product type if it no longer belongs to that model
	useEffect(() => {
		if (!selectedProductTypeId || !selectedModelId) return;
		const pt = productTypesRaw.find((t) => t.id === selectedProductTypeId);
		if (pt && pt.madel !== selectedModelId) setSelectedProductTypeId(undefined);
	}, [selectedModelId, selectedProductTypeId, productTypesRaw]);

	// Accumulate products when new page results arrive
	useEffect(() => {
		if (!pageResults || pageResults.length === 0) return;

		if (page === 1) {
			// First page - replace all products
			setAllProducts(pageResults);
		} else {
			const savedScrollY = window.scrollY;
			scrollRestoreRef.current = savedScrollY;

			// Subsequent pages - append new products (avoid duplicates)
			setAllProducts((prev) => {
				const existingIds = new Set(prev.map((p) => p.id));
				const newProducts = pageResults.filter((p) => !existingIds.has(p.id));
				return [...prev, ...newProducts];
			});
		}
	}, [pageResults, page]);

	// Restore scroll after DOM updates (loading more or new products appended) so list stays in place
	useLayoutEffect(() => {
		const y = scrollRestoreRef.current;
		if (y !== null) {
			scrollRestoreRef.current = null;
			window.scrollTo({ top: y, behavior: 'auto' });
		}
	});

	// IntersectionObserver to load next page when sentinel is visible
	useEffect(() => {
		const node = sentinelRef.current;
		if (!node || productsLoading) return;

		const currentPageNum = pagination?.currentPage || page;
		const lastPage = pagination?.lastPage || 1;

		// Don't observe if we've reached the last page
		if (currentPageNum >= lastPage) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !productsLoading && currentPageNum < lastPage) {
						scrollRestoreRef.current = window.scrollY;
						setPage((p) => p + 1);
					}
				});
			},
			{ root: null, rootMargin: '200px', threshold: 0.1 },
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [productsLoading, pagination, page]);

	// Handle description toggle - close others when one opens
	const handleDescriptionToggle = (productId: number) => {
		setOpenDescriptionId((prev) => (prev === productId ? null : productId));
	};
	return (
		<div className='min-h-screen pb-20'>
			{/* Sticky search bar (replaces header) */}
			<div className='sticky top-0 z-30 bg-market-bg/80 backdrop-blur-md border-b border-blue-100 px-4 sm:px-6 lg:px-8 py-4'>
				<div className='mx-auto max-w-2xl flex items-center gap-3'>
					<div className='relative flex-1 min-w-0'>
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
					{/* <button
                        onClick={() => setIsOpen(true)}
                        className='relative shrink-0 p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 group'
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
                    </button> */}
				</div>
			</div>

			<main className='mx-auto px-4 sm:px-6 lg:px-8 py-6'>
				{/* Filters: branch_category + product_model + product_type (type by model) */}
				{(branchCategories.length > 0 || productModelsAll.length > 0 || productTypesRaw.length > 0) && (
					<div className='mb-6 flex flex-wrap items-center gap-2'>
						<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500'>
							<Filter size={16} strokeWidth={2} />
						</div>
						<FilterSelect
							className='max-w-64'
							placeholder='Kategoriya turi — barchasi'
							value={
								selectedBranchCategoryId === undefined ? undefined : String(selectedBranchCategoryId)
							}
							onValueChange={(v) => setSelectedBranchCategoryId(v === undefined ? undefined : Number(v))}
							options={branchCategories
								.filter((c) => !c.is_delete)
								.sort((a, b) => a.sorting - b.sorting)
								.map((c) => ({ value: String(c.id), label: c.name }))}
						/>
						<FilterSelect
							className='max-w-44 text-wrap'
							placeholder='Model — barchasi'
							value={selectedModelId === undefined ? undefined : String(selectedModelId)}
							onValueChange={(v) => setSelectedModelId(v === undefined ? undefined : Number(v))}
							options={(selectedBranchCategoryId ? productModels : productModelsAll)
								.sort((a, b) => a.sorting - b.sorting || a.name.localeCompare(b.name))
								.map((m) => ({ value: String(m.id), label: m.name }))}
						/>
						<FilterSelect
							className='max-w-44 text-wrap'
							placeholder='Turi — barchasi'
							value={selectedProductTypeId === undefined ? undefined : String(selectedProductTypeId)}
							onValueChange={(v) => setSelectedProductTypeId(v === undefined ? undefined : Number(v))}
							options={productTypes.map((t) => ({ value: String(t.id), label: t.name }))}
						/>
						{(selectedBranchCategoryId !== undefined ||
							selectedModelId !== undefined ||
							selectedProductTypeId !== undefined) && (
							<button
								type='button'
								onClick={() => {
									setSelectedBranchCategoryId(undefined);
									setSelectedModelId(undefined);
									setSelectedProductTypeId(undefined);
								}}
								title='Tozalash'
								className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:text-market-orange'
							>
								<X size={16} strokeWidth={2.5} />
							</button>
						)}
					</div>
				)}

				{/* Loading State - only when no products yet (initial load), so pagination doesn't unmount grid and jump scroll */}
				{isInitialLoading && (
					<div className='flex justify-center items-center py-20'>
						<Loader2 className='w-12 h-12 animate-spin text-market-orange' />
					</div>
				)}

				{/* Grid - visible during pagination to keep scroll position */}
				{!isInitialLoading && (
					<>
						<motion.div layout className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
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
				{!isInitialLoading && allProducts.length === 0 && (
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
							<p className='text-xl text-gray-500'>Mahsulot topilmadi.</p>
						)}
					</div>
				)}
			</main>

			<Cart />

			{/* Yuqoriga scroll tugmasi — o'ng pastda */}
			{showScrollTop && (
				<button
					type='button'
					onClick={() => {
						const root = document.getElementById('root');
						root?.scrollTo({ top: 0, behavior: 'smooth' });
					}}
					title='Yuqoriga'
					className='fixed right-4 bottom-24 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 text-gray-700 hover:bg-market-orange hover:text-white hover:border-market-orange transition-all'
				>
					<ChevronUp size={22} strokeWidth={2.5} />
				</button>
			)}
		</div>
	);
}
