import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartProvider } from './hooks/useCart';
export function App() {
  return <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </Router>
    </CartProvider>;
}