import { Product } from '../types';

export const products: Product[] = [
{
  id: '1',
  name: 'Retro Boombox',
  price: 129.99,
  category: 'Electronics',
  description:
  'Blast your tunes with this colorful, vintage-inspired boombox. Features high-fidelity sound, Bluetooth connectivity, and a rechargeable battery that lasts all day.',
  images: [
  'https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80'],

  colors: ['#FF6B35', '#00D9FF', '#222222'],
  rating: 4.8
},
{
  id: '2',
  name: 'Neon Sneakers',
  price: 89.5,
  category: 'Fashion',
  description:
  'Step up your street style with these ultra-comfortable, eye-catching sneakers. Designed for urban explorers who want to stand out from the crowd.',
  images: [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80'],

  colors: ['#FF006E', '#B4FF39', '#FFFFFF'],
  sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
  rating: 4.9
},
{
  id: '3',
  name: 'Analog Instant Camera',
  price: 75.0,
  category: 'Electronics',
  description:
  'Capture memories instantly with this cute and compact analog camera. Perfect for parties, travel, and creating physical keepsakes.',
  images: [
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517260739337-6799d239ce83?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1621623728639-668c2b536288?auto=format&fit=crop&w=800&q=80'],

  colors: ['#FFD23F', '#FF006E', '#00D9FF'],
  rating: 4.7
},
{
  id: '4',
  name: 'Artisan Donuts',
  price: 24.0,
  category: 'Food',
  description:
  'A box of 6 handcrafted donuts with exotic glazes and toppings. Freshly baked every morning using premium ingredients.',
  images: [
  'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?auto=format&fit=crop&w=800&q=80'],

  colors: ['#FFC0CB', '#8B4513', '#FFFDD0'],
  rating: 5.0
},
{
  id: '5',
  name: 'Minimalist Plant Pot',
  price: 35.0,
  category: 'Home',
  description:
  'Add some greenery to your space with this sleek, ceramic plant pot. Features a drainage hole and matching saucer.',
  images: [
  'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=800&q=80'],

  colors: ['#FFFFFF', '#333333', '#B4FF39'],
  sizes: ['Small', 'Medium', 'Large'],
  rating: 4.6
},
{
  id: '6',
  name: 'Vintage Denim Jacket',
  price: 110.0,
  category: 'Fashion',
  description:
  'A classic denim jacket with a modern twist. Features custom embroidery and distressed details for a lived-in look.',
  images: [
  'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1527016021513-b09758b777d5?auto=format&fit=crop&w=800&q=80'],

  colors: ['#1E90FF', '#000000'],
  sizes: ['S', 'M', 'L', 'XL'],
  rating: 4.8
},
{
  id: '7',
  name: 'Mechanical Keyboard',
  price: 145.0,
  category: 'Electronics',
  description:
  'Clicky, tactile, and colorful. This mechanical keyboard improves your typing experience and brightens up your desk setup.',
  images: [
  'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'],

  colors: ['#FFFFFF', '#222222', '#FF006E'],
  rating: 4.9
},
{
  id: '8',
  name: 'Fresh Fruit Basket',
  price: 45.0,
  category: 'Food',
  description:
  "A curated selection of the season's freshest fruits. Locally sourced and delivered in a reusable woven basket.",
  images: [
  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519996529931-28324d1a6390?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80'],

  colors: ['#FFA500', '#FF0000', '#008000'],
  rating: 4.9
},
{
  id: '9',
  name: 'Abstract Wall Art',
  price: 65.0,
  category: 'Home',
  description:
  'Vibrant abstract print to bring energy to your walls. Printed on high-quality archival paper with fade-resistant inks.',
  images: [
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80'],

  colors: ['#FF6B35', '#8338EC', '#00D9FF'],
  sizes: ['12x18', '18x24', '24x36'],
  rating: 4.5
}];