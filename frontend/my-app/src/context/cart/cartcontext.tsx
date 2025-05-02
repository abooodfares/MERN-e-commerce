import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ProductCart } from '../../types';
import { AddCartItem } from '../../api/Authapi';
import { useauth } from '../auth/authcontext';

interface CartContextType {
  products: ProductCart[];
  totalPrice: number;
  addProduct: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const Auth = useauth();
  const [products, setProducts] = useState<ProductCart[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  

  const addProduct = async (proudctid: string) => {
    setIsLoading(true);
    try {
      const response = await AddCartItem(Auth!.token, {proudctid, quantity: 1})
      const data = await response.json();
      setTotalPrice(data['totalprice']);
     data['items'].forEach((item: any) => {
      const newproduct = {
        _id: item.item._id,
        name: item.item.name,
        unitPrice:  item.unitprice,
        quantity: item.quantity,
        img: item.item.image
      }
  
      setProducts([...products, newproduct]);
     });
  

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }

  };

  const value = {
    products,
    totalPrice,
    addProduct

  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 