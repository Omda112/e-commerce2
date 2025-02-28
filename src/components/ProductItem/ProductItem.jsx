import React, { useContext, useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';

export default function ProductItem({ product, addproduct, loading, currentIds, addWL }) {
  const [box, setBox] = useState(null);
  const [loadingCart, setLoadingCart] = useState(false); // حالة تحميل للسلة
  const [loadingWishlist, setLoadingWishlist] = useState(false); // حالة تحميل لقائمة الأمنيات

  const { iconPosition } = useContext(CartContext);
  const elementRef = useRef(null);

  const moveToIcon = (rect) => {
    if (elementRef.current) {
      const newBox = {
        id: Date.now(),
        x: iconPosition.left - rect.x,
        y: iconPosition.top - rect.y,
      };
      setBox(newBox);
      setTimeout(() => {
        setBox(null);
      }, 1000);
    }
  };

  function getBoundingClientRect() {
    const timeoutId = setTimeout(() => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        moveToIcon(rect);
      }
    }, 100);
    return () => clearTimeout(timeoutId);
  }

  // عند إضافة منتج للسلة
  const handleAddProduct = async (productId) => {
    setLoadingCart(true); // تفعيل الـ Loader
    getBoundingClientRect();
    await addproduct(product.id); // تأكد من أن الدالة تعيد Promise
    setLoadingCart(false); // إلغاء تفعيل الـ Loader بعد انتهاء العملية
  };

  // عند إضافة منتج لقائمة الأمنيات
  const handleAddToWishlist = async (productId) => {
    setLoadingWishlist(true); // تفعيل الـ Loader
    await addWL(product.id); // تأكد من أن الدالة تعيد Promise
    setLoadingWishlist(false); // إلغاء تفعيل الـ Loader بعد انتهاء العملية
  };

  useEffect(() => {
    if (box) {
      console.log('Box updated:', box);
    }
  }, [box]);

  return (
    <div className="p-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
      <div className="bg-white border border-green-300 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <Link to={`/productDetails/${product.id}/${product.category._id}`}>
          <div className="relative w-full h-64 bg-gray-50">
            <img ref={elementRef} src={product.imageCover} className="absolute inset-0 w-full h-full object-contain" alt="" />
          </div>

          <div className="p-3">
            <span className="text-sm text-green-600 font-medium">{product.category?.name}</span>
            <h2 className="font-semibold text-lg text-gray-800 mb-2">{product.title.split(' ').splice(0, 2).join(' ')}</h2>
            <div className="flex justify-between items-center">
              <span className="text-green-700 font-bold">{product.price} EGP</span>
              <span className="flex items-center text-yellow-400">
                {product.ratingsAverage} <i className="fa fa-star ml-1"></i>
              </span>
            </div>
          </div>
        </Link>

        <div className="flex justify-between gap-2 px-3 pb-3">
          {/* زر إضافة للسلة */}
          <button
            className="flex-1 bg-green-400 text-white py-2 rounded-lg hover:bg-green-500 transition-colors duration-300"
            onClick={() => handleAddProduct(product.id)}
            disabled={loadingCart}
          >
            {loadingCart ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              <span> Add to <i className="fa fa-cart-shopping"></i> </span>
            )}
          </button>

          {/* زر إضافة لقائمة الأمنيات */}
          <button
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
            onClick={() => handleAddToWishlist(product.id)}
            disabled={loadingWishlist}
          >
            {loadingWishlist ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              <span>Add to <i className="fa-solid fa-heart"></i> </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
