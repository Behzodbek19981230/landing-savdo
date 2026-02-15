import { useState, useRef, useEffect } from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDown, Search, X } from 'lucide-react';

const ALL_VALUE = 'all';

export interface FilterSelectOption {
	value: string;
	label: string;
}

interface FilterSelectProps {
	value: string | undefined;
	onValueChange: (value: string | undefined) => void;
	placeholder: string;
	options: FilterSelectOption[];
	className?: string;
}

export function FilterSelect({
	value,
	onValueChange,
	placeholder,
	options,
	className = '',
}: FilterSelectProps) {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const selectValue = value === undefined || value === '' ? ALL_VALUE : value;
	const allOption = { value: ALL_VALUE, label: placeholder };

	const searchLower = search.trim().toLowerCase();
	const filteredOptions = [
		allOption,
		...options.filter((opt) =>
			opt.label.toLowerCase().includes(searchLower),
		),
	];

	useEffect(() => {
		if (open) {
			setSearch('');
			const isTouch = typeof window !== 'undefined' && 'ontouchstart' in window;
			if (!isTouch) {
				const t = setTimeout(() => inputRef.current?.focus(), 100);
				return () => clearTimeout(t);
			}
		}
	}, [open]);

	return (
		<>
			{open && (
				<div
					className='fixed inset-0 z-40'
					aria-hidden
					onClick={() => setOpen(false)}
					onPointerDown={() => setOpen(false)}
				/>
			)}
			<Select.Root
				value={selectValue}
				onValueChange={(v) => onValueChange(v === ALL_VALUE ? undefined : v)}
				open={open}
				onOpenChange={setOpen}
			>
					<Select.Trigger
					className={
						'relative inline-flex min-w-[160px] items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white py-2.5 pl-4 pr-9 text-sm text-gray-900 shadow-sm transition-all hover:border-gray-300 focus:border-market-orange focus:outline-none focus:ring-2 focus:ring-market-orange/20 data-[placeholder]:text-gray-500 ' +
						(open ? ' z-[41] ' : '') +
						className
					}
				>
					<Select.Value placeholder={placeholder} />
					<Select.Icon asChild>
						<ChevronDown
							size={18}
							className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
						/>
					</Select.Icon>
				</Select.Trigger>
					<Select.Portal container={typeof document !== 'undefined' ? document.getElementById('root') ?? undefined : undefined}>
					<Select.Content
						position='popper'
						sideOffset={4}
						className='z-50 w-[var(--radix-select-trigger-width)] min-w-[200px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg'
						onCloseAutoFocus={(e) => e.preventDefault()}
						onPointerDownOutside={(e) => e.preventDefault()}
					>
						<div
							className='border-b border-gray-100 p-2'
							onTouchStart={(e) => e.stopPropagation()}
							onTouchEnd={(e) => e.stopPropagation()}
						>
							<div className='flex items-center gap-2'>
								<div className='relative flex-1 min-w-0'>
									<Search
										size={16}
										className='absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400'
									/>
									<input
										ref={inputRef}
										type='text'
										value={search}
										onChange={(e) => setSearch(e.target.value)}
										onKeyDown={(e) => e.stopPropagation()}
										onPointerDown={(e) => e.stopPropagation()}
										onTouchStart={(e) => e.stopPropagation()}
										placeholder='Qidirish...'
										className='w-full rounded-lg border border-gray-200 py-2 pl-8 pr-3 text-sm placeholder:text-gray-400 focus:border-market-orange focus:outline-none focus:ring-1 focus:ring-market-orange/30'
									/>
								</div>
								<button
									type='button'
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setOpen(false);
									}}
									className='shrink-0 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors'
									title='Yopish'
								>
									<X size={18} strokeWidth={2} />
								</button>
							</div>
						</div>
						<Select.Viewport
							className='max-h-[220px] overflow-y-auto p-1'
							onTouchStart={(e) => e.stopPropagation()}
							onTouchEnd={(e) => e.stopPropagation()}
						>
							{filteredOptions.length === 0 ? (
							<div className='py-4 text-center text-sm text-gray-500'>
								Topilmadi
							</div>
							) : (
								filteredOptions.map((opt) => (
									<Select.Item
										key={opt.value}
										value={opt.value}
										className='relative flex cursor-default select-none items-center rounded-lg py-2 pl-3 pr-8 text-sm outline-none data-[highlighted]:bg-market-orange/10 data-[highlighted]:text-market-orange'
									>
										<Select.ItemText>{opt.label}</Select.ItemText>
									</Select.Item>
								))
							)}
						</Select.Viewport>
					</Select.Content>
				</Select.Portal>
			</Select.Root>
		</>
	);
}
