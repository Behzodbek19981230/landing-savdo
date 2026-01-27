import React, { useEffect, useState, createContext, useContext } from 'react';
import { CartItem, Product } from '../types';
interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (
  product: Product,
  quantity?: number,
  color?: string,
  size?: string)
  => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}
const CartContext = createContext<CartContextType | undefined>(undefined);
export function CartProvider({ children }: {children: ReactNode;}) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('market-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    localStorage.setItem('market-cart', JSON.stringify(items));
  }, [items]);
  const addItem = (
  product: Product,
  quantity = 1,
  color?: string,
  size?: string) =>
  {
    setItems((current) => {
      const existingItem = current.find((item) => item.id === product.id);
      if (existingItem) {
        return current.map((item) =>
        item.id === product.id ?
        {
          ...item,
          quantity: item.quantity + quantity
        } :
        item
        );
      }
      return [
      ...current,
      {
        ...product,
        quantity,
        selectedColor: color,
        selectedSize: size
      }];

    });
    setIsOpen(true);
  };
  const removeItem = (productId: string) => {
    setItems((current) => current.filter((item) => item.id !== productId));
  };
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }
    setItems((current) =>
    current.map((item) =>
    item.id === productId ?
    {
      ...item,
      quantity
    } :
    item
    )
    );
  };
  const clearCart = () => setItems([]);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
      }}>

      {children}
    </CartContext.Provider>);

}
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}