import { Product } from '../types';

export const products: Product[] = [
    {
        id: '1',
        name: 'Klassik Chinni Kosa',
        price: 45000,
        category: 'Kosalar',
        description:
            'Yuqori sifatli chinni kosalar to\'plami. Issiq va sovuq ichimliklar uchun ideal. Zamonaviy dizayn va bardoshlilik.',
        images: [
            '/images/photo_2026-01-28_15-00-41.jpg',
            'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80'],

        colors: ['#FFFFFF', '#E8F4F8', '#F5E6D3'],
        sizes: ['250ml', '350ml', '500ml'],
        rating: 4.8
    },
    {
        id: '2',
        name: 'Zamonaviy Chinni Likopchalar',
        price: 65000,
        category: 'Likopchalar',
        description:
            'Oilaviy foydalanish uchun chiroyli chinni likopchalar to\'plami. 6 dona likopcha va noyob dizayn. Yuvilish mashinasida yuvish mumkin.',
        images: [
            '/images/photo_2026-01-28_15-00-51.jpg',
            'https://images.unsplash.com/photo-1587132117816-061c97700ac4?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=800&q=80'],

        colors: ['#FFFFFF', '#D4E4F7', '#FFE8D6'],
        sizes: ['150ml', '200ml', '250ml'],
        rating: 4.9
    },
    {
        id: '3',
        name: 'Premium Chinni Tarelkalar',
        price: 120000,
        category: 'Tarelkalar',
        description:
            'Nafis chinni tarelkalar to\'plami. 12 dona turli o\'lchamdagi tarelkalar. Bayram dasturxonlari va kundalik foydalanish uchun.',
        images: [
            '/images/photo_2026-01-28_15-00-56.jpg',
            'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=80'],

        colors: ['#FFFFFF', '#E8F0F8', '#F0E6D3'],
        sizes: ['Kichik (18cm)', 'O\'rta (22cm)', 'Katta (28cm)'],
        rating: 4.7
    },
    {
        id: '4',
        name: 'Klassik Chinni Choynak',
        price: 85000,
        category: 'Choyniklar',
        description:
            'An\'anaviy uslubdagi chinni choynak. 1.2 litr sig\'im. Issiqlikni uzoq vaqt saqlaydi. Oilaviy choy marosimi uchun ideal.',
        images: [
            '/images/photo_2026-01-28_15-01-00.jpg',
            'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80'],

        colors: ['#FFFFFF', '#E8F4F8', '#FFE8D6'],
        sizes: ['0.8L', '1.2L', '1.5L'],
        rating: 5.0
    },
    {
        id: '5',
        name: 'Elegant Chinni Karafka',
        price: 95000,
        category: 'Karafkalar',
        description:
            'Zamonaviy dizayndagi chinni karafka. Suv, sharbat va boshqa ichimliklar uchun. Muzlatgichda saqlash mumkin.',
        images: [
            '/images/photo_2026-01-28_15-01-04.jpg',
            'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1578500351865-d8bb7d9e5a7e?auto=format&fit=crop&w=800&q=80'],

        colors: ['#FFFFFF', '#E8F0F8', '#D4E4F7'],
        sizes: ['1L', '1.5L', '2L'],
        rating: 4.6
    },
    {
        id: '6',
        name: 'Naqshli Chinni Kosalar To\'plami',
        price: 75000,
        category: 'Kosalar',
        description:
            'O\'zbekona naqshli chinni kosalar. 6 dona turli xil naqshli kosa. Milliy uslubda bezatilgan va zamonaviy sifat.',
        images: [
            '/images/photo_2026-01-28_15-01-07.jpg',
            'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80'],

        colors: ['#FFFFFF', '#4A90E2', '#D4AF37'],
        sizes: ['200ml', '300ml', '400ml'],
        rating: 4.8
    },
    {
        id: '7',
        name: 'Lux Chinni Likopchalar Komplekti',
        price: 110000,
        category: 'Likopchalar',
        description:
            'Premium chinni likopchalar. Oltin rangli naqshlar bilan bezatilgan. 12 dona likopcha. Maxsus tadbirlarga mos.',
        images: [
            '/images/photo_2026-01-28_15-01-11.jpg',
            'https://images.unsplash.com/photo-1587132117816-061c97700ac4?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=800&q=80'],

        colors: ['#FFFFFF', '#FFE8D6', '#D4AF37'],
        sizes: ['180ml', '220ml', '280ml'],
        rating: 4.9
    },
    {
        id: '8',
        name: 'Bayrma Tarelkalar Seti',
        price: 180000,
        category: 'Tarelkalar',
        description:
            'Bayram dasturxonlari uchun maxsus chinni tarelkalar. 18 dona turli o\'lchamdagi tarelka. Nozik naqshlar va yuqori sifat.',
        images: [
            '/images/photo_2026-01-28_15-01-16.jpg',
            'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=80'],

        colors: ['#FFFFFF', '#FFE8D6', '#D4AF37'],
        sizes: ['Kichik', 'O\'rta', 'Katta'],
        rating: 4.9
    },
    {
        id: '9',
        name: 'Turk Uslubidagi Choynak',
        price: 135000,
        category: 'Choyniklar',
        description:
            'Turk uslubidagi noyob chinni choynak. Qo\'l bilan bezatilgan naqshlar. 1.5 litr sig\'im. Kolleksiya uchun ham mos.',
        images: [
            'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80'],

        colors: ['#4A90E2', '#D4AF37', '#FFFFFF'],
        sizes: ['1L', '1.5L', '2L'],
        rating: 4.5
    },
];