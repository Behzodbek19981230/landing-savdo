import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Star, Check, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../hooks/useCart';
import { ProductCarousel } from '../components/ProductCarousel';
import { Button } from '../components/ui/Button';
import { Cart } from '../components/Cart';
export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, setIsOpen } = useCart();
  const product = products.find((p) => p.id === id);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [isAdded, setIsAdded] = useState(false);
  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }
  const handleAddToCart = () => {
    addItem(product, 1, selectedColor, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };
  return (
    <div className="min-h-screen bg-market-bg">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-20 p-4 flex justify-between items-center pointer-events-none">
        <button
          onClick={() => navigate(-1)}
          className="pointer-events-auto p-3 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all hover:scale-105">

          <ArrowLeft size={24} />
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto p-3 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all hover:scale-105">

          <X size={24} />
        </button>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Images */}
          <motion.div
            initial={{
              opacity: 0,
              x: -50
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.6
            }}>

            <ProductCarousel images={product.images} name={product.name} />
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6,
              delay: 0.2
            }}
            className="space-y-8">

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-market-orange/10 text-market-orange font-bold rounded-full text-sm">
                  {product.category}
                </span>
                <div className="flex items-center text-yellow-400">
                  <Star size={16} fill="currentColor" />
                  <span className="ml-1 text-gray-600 font-semibold">
                    {product.rating}
                  </span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-market-orange to-market-pink">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-6">
              {/* Colors */}
              {product.colors &&
              <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                    Select Color
                  </h3>
                  <div className="flex gap-3">
                    {product.colors.map((color) =>
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor === color ? 'border-market-pink scale-110 shadow-lg' : 'border-transparent hover:scale-105'}`}
                    style={{
                      backgroundColor: color
                    }}>

                        {selectedColor === color &&
                    <Check
                      size={16}
                      className={
                      color === '#FFFFFF' ? 'text-black' : 'text-white'
                      } />

                    }
                      </button>
                  )}
                  </div>
                </div>
              }

              {/* Sizes */}
              {product.sizes &&
              <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                    Select Size
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) =>
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all ${selectedSize === size ? 'bg-gray-900 text-white shadow-lg scale-105' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>

                        {size}
                      </button>
                  )}
                  </div>
                </div>
              }
            </div>

            <div className="pt-6 border-t border-gray-200">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full text-lg h-16">

                {isAdded ?
                <motion.div
                  initial={{
                    scale: 0.5
                  }}
                  animate={{
                    scale: 1
                  }}
                  className="flex items-center gap-2">

                    <Check size={24} /> Added to Cart!
                  </motion.div> :

                'Add to Cart'
                }
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <Cart />
    </div>);

}