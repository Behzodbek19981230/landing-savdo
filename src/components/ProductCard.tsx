import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronDown, Share2, Download } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ApiProduct } from '../api/types';

interface ProductCardProps {
	product: ApiProduct;
	isDescriptionOpen?: boolean;
	onDescriptionToggle?: () => void;
}

export function ProductCard({ product, isDescriptionOpen = false, onDescriptionToggle }: ProductCardProps) {
	const [isImageOpen, setIsImageOpen] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const handleImageClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsImageOpen(true);
	};

	const nextImage = () => {
		setCurrentImageIndex((prev) => (prev === (product?.images?.length ?? 1) - 1 ? 0 : prev + 1));
	};

	const prevImage = () => {
		setCurrentImageIndex((prev) => (prev === 0 ? (product?.images?.length ?? 1) - 1 : prev - 1));
	};

	const closeModal = () => {
		setIsImageOpen(false);
		setCurrentImageIndex(0);
	};

	const handleShareToTelegram = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		const imageUrl = product.images?.[currentImageIndex]?.file;
		const productName = product.model_detail?.name;

		if (!imageUrl) return;

		// Telegram share link yaratish
		const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(imageUrl)}&text=${encodeURIComponent(productName ?? '')}`;

		// Telegram Web App orqali share sahifasini ochish
		if (window.Telegram?.WebApp) {
			if (window.Telegram.WebApp.openTelegramLink) {
				// Telegram'ning o'z share funksiyasini ishlatish
				window.Telegram.WebApp.openTelegramLink(telegramShareUrl);
			} else if (window.Telegram.WebApp.openLink) {
				// openLink orqali ochish
				window.Telegram.WebApp.openLink(telegramShareUrl);
			} else {
				// Fallback: oddiy link ochish
				window.open(telegramShareUrl, '_blank');
			}
		} else {
			// Agar Telegram Web App mavjud bo'lmasa, oddiy link ochish
			window.open(telegramShareUrl, '_blank');
		}
	};

	const handleDownloadImage = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		const image = product.images?.[currentImageIndex];
		const productName = product.model_detail?.name;

		if (!image) return;

		const imageUrl = typeof image === 'string' ? image : image.file;

		try {
			// Rasmni fetch qilib, blob formatida olish
			const response = await fetch(imageUrl);
			const blob = await response.blob();

			// Blob'ni URL'ga o'tkazish
			const blobUrl = window.URL.createObjectURL(blob);

			// Download link yaratish
			const link = document.createElement('a');
			link.href = blobUrl;
			link.download = `${productName}_${currentImageIndex + 1}.jpg`;
			document.body.appendChild(link);
			link.click();

			// Tozalash
			document.body.removeChild(link);
			window.URL.revokeObjectURL(blobUrl);
		} catch (error) {
			console.error('Rasmni yuklab olishda xatolik:', error);
			// Fallback: to'g'ridan-to'g'ri link orqali yuklab olish
			const link = document.createElement('a');
			link.href = imageUrl;
			link.download = `${productName}_${currentImageIndex + 1}.jpg`;
			link.target = '_blank';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	};

	return (
		<>
			<motion.div
				className='group relative h-full bg-white rounded-2xl p-3 shadow-market transition-all duration-300 hover:shadow-market-hover'
				whileHover={{
					y: -4,
				}}
				initial={{
					opacity: 0,
					y: 20,
				}}
				animate={{
					opacity: 1,
					y: 0,
				}}
			>
				{/* Image Container */}
				<div
					className='relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-100 mb-3'
					onClick={handleImageClick}
				>
					<img
						src={product?.images?.[0]?.file || '/placeholder-image.png'}
						alt={product.model_detail?.name}
						className='h-full w-full cursor-pointer object-cover object-center transition-transform duration-300 group-hover:scale-105'
					/>

					{/* Gradient Overlay on Hover */}
					<div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

					{/* Category Tag */}
					{product.branch_detail && (
						<span className='absolute top-2 left-2 px-2 py-0.5 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-900 rounded-full'>
							{product.branch_detail.name}
						</span>
					)}

					{/* Stock Badge */}
					{product.count !== undefined && product.count < 10 && product.count > 0 && (
						<span className='absolute top-2 right-2 px-2 py-0.5 bg-red-500/90 backdrop-blur-sm text-xs font-bold text-white rounded-full'>
							{product.count} ta
						</span>
					)}
				</div>

				{/* Info */}
				<div className='space-y-2'>
					<div>
						<h3 className='font-bold text-gray-900 text-base leading-tight mb-2 line-clamp-2'>
							{product.model_detail?.name}
						</h3>

						{/* Product Details - Compact Horizontal Layout */}
						<div className='text-xs text-gray-600 space-y-1 bg-gray-50 rounded-lg p-2'>
							<div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
								{product.type_detail && (
									<div className='flex items-center gap-1.5'>
										<span className='font-medium text-gray-700 text-xs'>Turi:</span>
										<span className='text-gray-900 text-xs'>{product.type_detail.name}</span>
									</div>
								)}

								{product.size_detail && (
									<div className='flex items-center gap-1.5'>
										<span className='font-medium text-gray-700 text-xs'>O'lcham:</span>
										<span className='text-gray-900 text-xs'>
											{product.size_detail.size} {product.size_detail?.unit_detail?.code}
										</span>
									</div>
								)}

								{product.count !== undefined && (
									<div className='flex items-center gap-1.5'>
										<span className='font-medium text-gray-700 text-xs'>Qoldi:</span>
										<span
											className={`font-semibold text-xs ${product.count < 10 ? 'text-red-600' : 'text-green-600'}`}
										>
											{product.count}
										</span>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Batafsil Button */}
					{product.note && (
						<>
							<button
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									onDescriptionToggle?.();
								}}
								className='w-full flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-market-orange to-market-pink text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200'
							>
								<span>Batafsil</span>
								<ChevronDown
									size={14}
									strokeWidth={2.5}
									className={`transition-transform duration-300 ${isDescriptionOpen ? 'rotate-180' : ''}`}
								/>
							</button>

							{/* Description */}
							<AnimatePresence>
								{isDescriptionOpen && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: 'auto', opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.3 }}
										className='overflow-hidden'
									>
										<div className='mt-2 p-3 bg-blue-50 rounded-lg text-sm text-gray-700 leading-relaxed'>
											{product.note}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</>
					)}
				</div>
			</motion.div>

			{/* Image Modal with react-zoom-pan-pinch */}
			<AnimatePresence>
				{isImageOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4'
						onClick={closeModal}
					>
						{/* Close Button */}
						<button
							onClick={closeModal}
							className='absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-30'
						>
							<X size={24} />
						</button>

						{/* Image Container */}
						<motion.div
							initial={{ scale: 0.9 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.9 }}
							className='relative w-full max-w-5xl h-[85vh]'
							onClick={(e) => e.stopPropagation()}
						>
							<TransformWrapper
								initialScale={1}
								minScale={1}
								maxScale={4}
								doubleClick={{ mode: 'toggle', step: 0.7 }}
								wheel={{ step: 0.1 }}
								pinch={{ step: 5 }}
								panning={{ velocityDisabled: true }}
							>
								{({ zoomIn, zoomOut, resetTransform, instance }) => {
									const currentScale = instance?.transformState?.scale || 1;

									return (
										<>
											{/* Zoom Controls */}
											<div className='absolute top-4 left-4 flex flex-col gap-2 z-20'>
												<button
													onClick={(e) => {
														e.stopPropagation();
														zoomIn();
													}}
													className='p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm'
													title='Zoom In'
												>
													<ZoomIn size={20} />
												</button>
												<button
													onClick={(e) => {
														e.stopPropagation();
														zoomOut();
													}}
													className='p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm'
													title='Zoom Out'
												>
													<ZoomOut size={20} />
												</button>
												{currentScale > 1 && (
													<button
														onClick={(e) => {
															e.stopPropagation();
															resetTransform();
														}}
														className='p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm'
														title='Reset'
													>
														<RotateCcw size={20} />
													</button>
												)}
											</div>

											{/* Share and Download Buttons */}
											<div className='absolute top-4 right-16 flex items-center gap-2 z-20'>
												<button
													onClick={handleDownloadImage}
													className='p-3 bg-green-500/90 hover:bg-green-600 rounded-full text-white transition-colors backdrop-blur-sm shadow-lg'
													title='Yuklab olish'
												>
													<Download size={20} />
												</button>
												<button
													onClick={handleShareToTelegram}
													className='p-3 bg-blue-500/90 hover:bg-blue-600 rounded-full text-white transition-colors backdrop-blur-sm shadow-lg'
													title='Telegramga yuborish'
												>
													<Share2 size={20} />
												</button>
											</div>

											{/* Zoom Indicator */}
											{currentScale > 1 && (
												<div className='absolute top-4 right-20 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm font-medium z-20'>
													{Math.round(currentScale * 100)}%
												</div>
											)}

											{/* Transform Component */}
											<TransformComponent
												wrapperClass='!w-full !h-full'
												contentClass='!w-full !h-full flex items-center justify-center'
											>
												<img
													src={
														product.images?.[currentImageIndex]?.file ||
														'/placeholder-image.png'
													}
													alt={product.model_detail?.name}
													className='max-w-full max-h-full object-contain select-none rounded-xl'
													draggable={false}
												/>
											</TransformComponent>

											{/* Navigation Arrows */}
											{(product.images?.length ?? 0) > 1 && (
												<>
													<button
														onClick={(e) => {
															e.stopPropagation();
															prevImage();
															resetTransform();
														}}
														className='absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors backdrop-blur-sm z-20'
													>
														<svg
															width='24'
															height='24'
															viewBox='0 0 24 24'
															fill='none'
															stroke='currentColor'
															strokeWidth='2.5'
														>
															<polyline points='15 18 9 12 15 6'></polyline>
														</svg>
													</button>
													<button
														onClick={(e) => {
															e.stopPropagation();
															nextImage();
															resetTransform();
														}}
														className='absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors backdrop-blur-sm z-20'
													>
														<svg
															width='24'
															height='24'
															viewBox='0 0 24 24'
															fill='none'
															stroke='currentColor'
															strokeWidth='2.5'
														>
															<polyline points='9 18 15 12 9 6'></polyline>
														</svg>
													</button>

													{/* Image Counter */}
													<div className='absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full text-white text-sm font-medium z-20'>
														{currentImageIndex + 1} / {product.images?.length ?? 0}
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
