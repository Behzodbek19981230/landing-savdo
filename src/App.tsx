import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartProvider } from './hooks/useCart';

export function App() {
    useEffect(() => {
        const tg = (window as any).Telegram?.WebApp;
        if (tg) {
            // Enable fullscreen mode
            tg.ready();
            tg.expand();

            // Set theme colors
            tg.setHeaderColor('bg_color');
            tg.setBackgroundColor('bg_color');

            // Disable vertical swipes to prevent accidental closes
            if (tg.disableVerticalSwipes) {
                tg.disableVerticalSwipes();
            }

            // Enable closing confirmation
            tg.enableClosingConfirmation();

            // Set max width for the app
            const rootElement = document.getElementById('root');
            if (rootElement) {
                rootElement.style.maxWidth = '1000px';
                rootElement.style.margin = '0 auto';
            }

            // Handle viewport changes for proper fullscreen
            const handleViewportChange = () => {
                if (tg.viewportHeight) {
                    document.body.style.height = `${tg.viewportHeight}px`;
                }
            };

            tg.onEvent('viewportChanged', handleViewportChange);
            handleViewportChange();

            // Cleanup
            return () => {
                tg.offEvent('viewportChanged', handleViewportChange);
            };
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
