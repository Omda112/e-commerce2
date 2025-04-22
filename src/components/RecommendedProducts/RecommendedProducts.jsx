import { useContext, useState } from 'react';
import axios from 'axios';
import ProductItem from '../ProductItem/ProductItem';
import { useQuery } from '@tanstack/react-query';
import { HashLoader } from 'react-spinners';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';
import toast from 'react-hot-toast';

export default function RecommendedProducts() {
  const [loading, setLoading] = useState(false);
  const { addProductToCart, cartItemsNo, setCartItemsNo } = useContext(CartContext);
  const { addProductToWishList, WishListNo, setWishListNo } = useContext(WishListContext);
  const [currentIds, setCurrentIds] = useState({});
  const [currentIdsWl, setCurrentIdsWl] = useState({});

  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  async function addProduct(id) {
    setLoading(true);
    
    // Create a new object to properly trigger state update
    setCurrentIds(prev => ({
      ...prev,
      [id]: true
    }));

    try {
      const res = await addProductToCart(id);
      
      if (res.status === "success") {
        setCartItemsNo(prev => prev + 1);
        toast.success(res.message, {
          position: 'bottom-right'
        });
      } else {
        toast.error(res.message, {
          position: 'bottom-right'
        });
      }
    } catch (error) {
      toast.error("Failed to add product to cart", {
        position: 'bottom-right'
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function addWL(productId) {
    setLoading(true);
    
    // Create a new object to properly trigger state update
    setCurrentIdsWl(prev => ({
      ...prev,
      [productId]: true
    }));

    try {
      const res = await addProductToWishList(productId);
      
      if (res.status === "success") {
        // Update wishlist count, not cart count
        setWishListNo(prev => prev + 1);
        toast.success(res.message, { 
          position: 'bottom-right' 
        });
      } else {
        toast.error(res.message, { 
          position: 'bottom-right' 
        });
      }
    } catch (error) {
      toast.error("Failed to add product to wishlist", {
        position: 'bottom-right'
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const { isLoading, data } = useQuery({
    queryKey: ['Products'],
    queryFn: getProducts
  });

  if (isLoading) {
    return (
      <div className="flex justify-center w-full">
        <HashLoader color='#10B981' />
      </div>
    );
  }

  return (
    <>
      <div className='row mt-5'>
        {data?.data?.data.map(product => (
          <ProductItem
            key={product.id}
            currentIds={currentIds}
            currentIdsWl={currentIdsWl}
            loading={loading}
            addproduct={addProduct}
            addWL={addWL}
            product={product}
          />
        ))}
      </div>
    </>
  );
}