export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Barchasi' | 'Kosalar' | 'Likopchalar' | 'Tarelkalar' | 'Choyniklar' | 'Karafkalar';
  description: string;
  images: string[];
  colors: string[];
  sizes?: string[];
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export type Category = 'Barchasi' | 'Kosalar' | 'Likopchalar' | 'Tarelkalar' | 'Choyniklar' | 'Karafkalar';

// Telegram Web App Types
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        sendData: (data: string) => void;
        enableClosingConfirmation: () => void;
        disableClosingConfirmation: () => void;
        disableVerticalSwipes?: () => void;
        setHeaderColor: (color: string) => void;
        setBackgroundColor: (color: string) => void;
        onEvent: (eventType: string, eventHandler: () => void) => void;
        offEvent: (eventType: string, eventHandler: () => void) => void;
        viewportHeight: number;
        viewportStableHeight: number;
        initDataUnsafe?: {
          user?: {
            id: number;
            first_name?: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
          query_id?: string;
          auth_date?: number;
          hash?: string;
        };
      };
    };
  }
}