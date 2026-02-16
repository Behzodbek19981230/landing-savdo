'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, Plus, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const ALL_VALUE = 'all';

export interface FilterSelectOption {
	value: string;
	label: string;
}

const SEARCH_DEBOUNCE_MS = 300;

interface FilterSelectProps {
	value: string | undefined;
	onValueChange: (value: string | undefined) => void;
	placeholder: string;
	options: FilterSelectOption[];
	className?: string;
	searchPlaceholder?: string;
	emptyText?: string;
	disabled?: boolean;
	allowCreate?: boolean;
	onCreateNew?: (name: string) => Promise<{ id: number; name: string } | null>;
	createText?: string;
	isLoading?: boolean;
	/** Backendga qidiruv: berilsa client-side filter o'chadi, qidiruv onSearchChange orqali backendga yuboriladi */
	onSearchChange?: (search: string) => void;
	/** Scroll oxiriga yetganda keyingi sahifa (load more) */
	onScrollToBottom?: () => void;
	hasMore?: boolean;
	isLoadingMore?: boolean;
}

export function FilterSelect({
	value,
	onValueChange,
	placeholder,
	options,
	className = '',
	searchPlaceholder = 'Qidirish...',
	emptyText = 'Topilmadi',
	disabled = false,
	allowCreate = false,
	onCreateNew,
	createText = "Yangi qo'shish",
	isLoading = false,
	onSearchChange,
	onScrollToBottom,
	hasMore = false,
	isLoadingMore = false,
}: FilterSelectProps) {
	const [open, setOpen] = React.useState(false);
	const [searchValue, setSearchValue] = React.useState('');
	const [isCreating, setIsCreating] = React.useState(false);
	const listRef = React.useRef<HTMLDivElement>(null);

	const selectValue = value === undefined || value === '' ? ALL_VALUE : value;
	const allOption: FilterSelectOption = { value: ALL_VALUE, label: placeholder };

	const selectedOption = [allOption, ...options].find((option) => option.value === selectValue);
	const serverSearch = typeof onSearchChange === 'function';

	// Backend qidiruv: debounce
	React.useEffect(() => {
		if (!serverSearch) return;
		const t = setTimeout(() => {
			onSearchChange?.(searchValue.trim());
		}, SEARCH_DEBOUNCE_MS);
		return () => clearTimeout(t);
	}, [searchValue, serverSearch, onSearchChange]);

	// Reset search when popover closes
	React.useEffect(() => {
		if (!open) {
			setSearchValue('');
		}
	}, [open]);

	// Ro'yxat (CommandList) ichida scroll ishlashi: Dialog/modal ichida ham wheel ro'yxatda qolsin, boshqa handler'lar ishlamasin
	React.useEffect(() => {
		if (!open || !listRef.current) return;

		const listEl = listRef.current;
		const popoverEl = listEl.closest('[role="dialog"]') || listEl.closest('[data-radix-portal]')?.parentElement;

		// 1) Document da capture fazada: ro'yxat ustidagi wheel boshqa (masalan Dialog) ga yetmasin
		const onDocCapture = (e: Event) => {
			const wheelEvent = e as WheelEvent;
			// Faqat wheel event bo'lsa ishlaydi
			// Faqat ro'yxat ichida bo'lsa, event'ni to'xtatamiz (lekin scroll tabiiy ishlaydi)
			if (listEl.contains(wheelEvent.target as Node)) {
				// Event'ni to'xtatamiz, lekin scroll tabiiy ishlaydi (passive: true tufayli)
				wheelEvent.stopImmediatePropagation();
			}
		};
		document.addEventListener('wheel', onDocCapture, { capture: true, passive: true });

		// 2) Ro'yxatning o'zida bubble listener — scroll tabiiy ishlaydi, event yuqoriga (dialogga) ketmaydi
		const onListWheel = (e: Event) => {
			const wheelEvent = e as WheelEvent;
			// Scroll oxiriga yetganda keyingi sahifani yuklash
			if (onScrollToBottom) {
				const threshold = 60;
				setTimeout(() => {
					if (listEl.scrollHeight - listEl.scrollTop <= listEl.clientHeight + threshold) {
						onScrollToBottom();
					}
				}, 50);
			}
			// Event'ni to'xtatamiz, lekin scroll allaqachon ishlagan bo'ladi (passive: true tufayli)
			wheelEvent.stopPropagation();
		};
		listEl.addEventListener('wheel', onListWheel, { passive: true });

		if (!popoverEl) {
			return () => {
				document.removeEventListener('wheel', onDocCapture, { capture: true });
				listEl.removeEventListener('wheel', onListWheel);
			};
		}

		// 3) Qidiruv inputi va boshqa joyda wheel — scroll ni ro'yxatga yo'naltiramiz
		const handlePopoverWheel = (e: Event) => {
			const wheelEvent = e as WheelEvent;
			if (listEl.contains(wheelEvent.target as Node)) return;
			if (popoverEl.contains(wheelEvent.target as Node)) {
				// Faqat input yoki boshqa elementlar ustida wheel bo'lsa
				const target = wheelEvent.target as HTMLElement;
				if (target.tagName === 'INPUT' || target.closest('[cmdk-input-wrapper]')) {
					wheelEvent.preventDefault();
					wheelEvent.stopPropagation();
					listEl.scrollTop += wheelEvent.deltaY;
					if (onScrollToBottom) {
						const threshold = 60;
						setTimeout(() => {
							if (listEl.scrollHeight - listEl.scrollTop <= listEl.clientHeight + threshold) {
								onScrollToBottom();
							}
						}, 50);
					}
				}
			}
		};
		// Faqat wheel event'lar uchun listener qo'shamiz
		popoverEl.addEventListener('wheel', handlePopoverWheel, { passive: false });
		return () => {
			document.removeEventListener('wheel', onDocCapture, { capture: true });
			listEl.removeEventListener('wheel', onListWheel);
			popoverEl.removeEventListener('wheel', handlePopoverWheel);
		};
	}, [open, onScrollToBottom]);

	// Client-side filter faqat serverSearch bo'lmaganda
	const filteredOptions = serverSearch
		? options
		: options.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()));

	// All option har doim birinchi bo'lsin
	const displayOptions = [allOption, ...filteredOptions];

	const handleCreateNew = async () => {
		if (!onCreateNew) return;

		// Agar search value bo'sh bo'lsa, dialogni ochmaslik
		if (!searchValue.trim()) {
			// Foydalanuvchi biror narsa kiritishini kutamiz
			return;
		}

		setIsCreating(true);
		try {
			const newItem = await onCreateNew(searchValue.trim());
			if (newItem) {
				onValueChange(String(newItem.id));
				setSearchValue('');
				setOpen(false);
			}
		} finally {
			setIsCreating(false);
		}
	};

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const el = e.currentTarget;
		if (!onScrollToBottom || !el) return;
		const threshold = 60;
		if (el.scrollHeight - el.scrollTop <= el.clientHeight + threshold) {
			onScrollToBottom();
		}
	};

	const handleWheel = React.useCallback(
		(e: React.WheelEvent<HTMLDivElement>) => {
			const el = e.currentTarget;
			if (!el) return;

			// Scroll oxiriga yetganda keyingi sahifani yuklash
			if (onScrollToBottom) {
				const threshold = 60;
				// Wheel event scroll'dan keyin ishlaydi, shuning uchun kechikish bilan tekshiramiz
				const checkScroll = () => {
					if (el.scrollHeight - el.scrollTop <= el.clientHeight + threshold) {
						onScrollToBottom();
					}
				};
				// Kichik kechikish bilan tekshirish
				setTimeout(checkScroll, 50);
			}
		},
		[onScrollToBottom],
	);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					disabled={disabled || isLoading}
					size='sm'
					className={cn(
						'w-full justify-between font-normal min-w-[120px] sm:min-w-[140px] text-xs sm:text-sm rounded-lg border-gray-200 bg-white text-gray-900 shadow-sm hover:border-gray-300 focus:border-market-orange focus:ring-2 focus:ring-market-orange/20',
						className,
					)}
				>
					{isLoading ? (
						<span className='text-gray-500 flex items-center gap-2'>
							<Loader2 className='h-4 w-4 animate-spin' />
							Yuklanmoqda...
						</span>
					) : selectedOption ? (
						selectedOption.label
					) : (
						<span className='text-gray-500'>{placeholder}</span>
					)}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className='w-[--radix-popover-trigger-width] p-0 overflow-hidden rounded-xl border-gray-200 bg-white shadow-lg'
				align='start'
			>
				<Command shouldFilter={false} className='flex flex-col overflow-hidden'>
					<CommandInput placeholder={searchPlaceholder} value={searchValue} onValueChange={setSearchValue} />
					<CommandList
						ref={listRef}
						onScroll={handleScroll}
						onWheel={handleWheel}
						className='max-h-[400px] overflow-y-auto overflow-x-hidden'
						style={{
							maxHeight: '400px',
							overscrollBehavior: 'contain',
							WebkitOverflowScrolling: 'touch',
						}}
					>
						{displayOptions.length === 0 && !allowCreate && !isLoading && (
							<CommandEmpty>{emptyText}</CommandEmpty>
						)}
						<CommandGroup>
							{displayOptions.map((option) => {
								const handleSelect = () => {
									onValueChange(option.value === ALL_VALUE ? undefined : option.value);
									setSearchValue('');
									setOpen(false);
								};
								return (
									<CommandItem
										key={option.value}
										value={String(option.value)}
										disabled={false}
										onSelect={handleSelect}
										onClick={(e) => {
											// Click event'ni ham qo'llab-quvvatlash
											e.preventDefault();
											e.stopPropagation();
											handleSelect();
										}}
										onPointerDown={(e) => {
											// PointerDown event'ni ham qo'llab-quvvatlash
											e.preventDefault();
											e.stopPropagation();
											handleSelect();
										}}
										className={cn(
											'cursor-pointer rounded-lg py-1 pl-1 pr-2 text-xs outline-none',
											selectValue === option.value
												? 'bg-market-orange/10 text-market-orange'
												: 'hover:bg-market-orange/5',
										)}
									>
										<Check
											className={cn(
												'mr-2 h-4 w-4 shrink-0',
												selectValue === option.value ? 'opacity-100' : 'opacity-0',
											)}
										/>
										<span className='flex-1 min-w-0 whitespace-normal break-words'>
											{option.label}
										</span>
									</CommandItem>
								);
							})}
						</CommandGroup>
						{hasMore && (
							<div className='flex items-center justify-center py-2 border-t border-gray-200'>
								{isLoadingMore ? (
									<Loader2 className='h-4 w-4 animate-spin text-gray-500' />
								) : (
									<span className='text-xs text-gray-500'>
										Yana yuklash uchun pastga scroll qiling
									</span>
								)}
							</div>
						)}
						{allowCreate && (
							<>
								{filteredOptions.length > 0 && <CommandSeparator />}
								<CommandGroup>
									<CommandItem
										onSelect={handleCreateNew}
										disabled={isCreating || !searchValue.trim()}
										className={cn(
											'text-market-orange cursor-pointer',
											!searchValue.trim() && 'opacity-50',
										)}
									>
										{isCreating ? (
											<Loader2 className='mr-2 h-4 w-4 animate-spin' />
										) : (
											<Plus className='mr-2 h-4 w-4' />
										)}
										{searchValue.trim() ? `${createText}: "${searchValue}"` : `${createText}...`}
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
