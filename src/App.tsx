import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartProvider } from './hooks/useCart';
export function App() {
	useEffect(() => {
		const tg = (window as any).Telegram?.WebApp;
		if (tg) {
			tg.ready();
			tg.expand();
		}
	}, []);
	return (
		<CartProvider>
			<Router>
				<Routes>
					<Route path='/' element={<ShopPage />} />
					<Route path='/product/:id' element={<ProductDetailPage />} />
				</Routes>
			</Router>
		</CartProvider>
	);
}
