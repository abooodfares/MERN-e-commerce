import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ProductCart } from '../../types';
import { AddCartItem, DeleteCartItem, GetCartItems, UpdateCartItem, DeleteAllCartItems, CompleteOrder } from '../../api/Authapi';
import { useauth } from '../auth/authcontext';
interface IOrderitem {
  itemname: string;
  quantity: number;
  price: number;
}
interface IOrder {
  totalprice: number;
  address: string;
  items: IOrderitem[];
}
interface CartContextType {
  products: ProductCart[];
  totalPrice: number;
  addProduct: (productId: string) => void;
  updateProduct: (proudctid: string, quantity: number) => void;
  deleteProduct: (proudctid: string) => void;
  deleteAll: () => void;
  completeOrder: (address: string) => void;
  order: IOrder;
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
  const [order, setOrder] = useState<IOrder>({
    address: '',
    items: [],
    totalprice: 0
  });

  // Fetch initial cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!Auth?.token) return;
      try {
        const response = await GetCartItems(Auth.token);
        const data = await response.json();
        setTotalPrice(data.totalprice || 0);
        const cartItems = data.items?.map((item: any) => ({
          _id: item.item._id,
          name: item.item.name,
          unitPrice: item.unitprice,
          quantity: item.quantity,
          img: item.item.image
        })) || [];
        setProducts(cartItems);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    fetchCartItems();
  }, [Auth?.token]);

  const addProduct = async (proudctid: string) => {
    setIsLoading(true);
    try {
      const response = await AddCartItem(Auth!.token, {proudctid, quantity: 1});
      const data = await response.json();
      setTotalPrice(data['totalprice']);
      
      // Update products with the new cart items
      const cartItems = data.items?.map((item: any) => ({
        _id: item.item._id,
        name: item.item.name,
        unitPrice: item.unitprice,
        quantity: item.quantity,
        img: item.item.image
      })) || [];
      setProducts(cartItems);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  const updateProduct = async (proudctid: string, quantity: number) => {
    if(quantity<1){
      return;
    }
    setIsLoading(true);
    try {
      const response = await UpdateCartItem(Auth!.token, proudctid, quantity);
      const data = await response.json();
      setTotalPrice(data['totalprice']);
      
      // Update products with the new cart items
      const cartItems = data.items?.map((item: any) => ({
        _id: item.item._id,
        name: item.item.name,
        unitPrice: item.unitprice,
        quantity: item.quantity,
        img: item.item.image
      })) || [];
      setProducts(cartItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  const deleteProduct = async (proudctid: string) => {
    setIsLoading(true);
    try {
      const response = await DeleteCartItem(Auth!.token, proudctid);
      const data = await response.json();
      setTotalPrice(data['totalprice']);
      const cartItems = data.items?.map((item: any) => ({
        _id: item.item._id,
        name: item.item.name,
        unitPrice: item.unitprice,
        quantity: item.quantity,
        img: item.item.image
      })) || [];
      setProducts(cartItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  const deleteAll = async () => {
    setIsLoading(true); 
    try {
      const response = await DeleteAllCartItems(Auth!.token);
      const data = await response.json();
      setTotalPrice(data['totalprice']);
      setProducts([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const completeOrder = async (address: string) => {
    setIsLoading(true);
    try {
      const response = await CompleteOrder(Auth!.token, { address });
      const data = await response.json();
     setOrder(data);
      setTotalPrice(0);
      setProducts([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };


  const value = {
    products,
    totalPrice,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteAll,
    completeOrder,
    order
  };
  

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};


