import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartProvider } from './hooks/useCart';

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <CartProvider>
                <Router>
                    <Routes>
                        <Route path='/' element={<ShopPage />} />
                        <Route path='/product/:id' element={<ProductDetailPage />} />
                    </Routes>
                </Router>
            </CartProvider>
        </QueryClientProvider>
    );
}
