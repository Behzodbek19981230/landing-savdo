import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
  'inline-flex items-center justify-center font-bold rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary:
    'bg-gradient-to-r from-market-orange to-market-pink text-white shadow-lg shadow-market-orange/30 hover:shadow-market-orange/50 focus:ring-market-pink',
    secondary:
    'bg-market-yellow text-gray-900 shadow-lg shadow-market-yellow/30 hover:shadow-market-yellow/50 focus:ring-market-yellow',
    outline:
    'border-2 border-gray-200 hover:border-market-orange text-gray-700 hover:text-market-orange bg-transparent',
    ghost: 'text-gray-600 hover:text-market-pink hover:bg-market-pink/10',
    icon: 'p-2 text-gray-700 hover:text-market-orange hover:bg-market-orange/10 rounded-full aspect-square'
  };
  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-8 py-4'
  };
  // Override size for icon variant
  const sizeClass = variant === 'icon' ? '' : sizes[size];
  return (
    <motion.button
      whileHover={{
        scale: 1.05
      }}
      whileTap={{
        scale: 0.95
      }}
      className={`${baseStyles} ${variants[variant]} ${sizeClass} ${className}`}
      {...props}>

      {children}
    </motion.button>);

}