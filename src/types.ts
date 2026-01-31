export interface Product {
  id: number;
  name: string;
  price: number;
  category_id?: number;
  category_name?: string;
  description: string;
  images: string[];
  colors?: string[];
  sizes?: string[];
  rating?: number;
  count?: number;
  model?: string;
  model_type?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

// Telegram Web App Types
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        sendData: (data: string) => void;
        openLink: (url: string, options?: { try_instant_view?: boolean }) => void;
        openTelegramLink: (url: string) => void;
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