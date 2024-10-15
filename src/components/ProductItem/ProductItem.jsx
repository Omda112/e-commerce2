import React, { useContext, useEffect, useRef, useState,Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion,MotionConfig, useMotionValue } from 'framer-motion';
import { CartContext } from '../../Context/CartContext';
import useMeasure from "react-use-measure";
// import './ProductItem.module.css'
// import { Shapes } from '../Shapes/Shapes';
// import { transition } from '../Setting/Setting';

export default function ProductItem({ product, addproduct, loading, currentIds, addWL }) {
  let [box, setBox] = useState(null);
  let { iconPosition } = useContext(CartContext);
  const elementRef = useRef(null);

  const moveToIcon = (rect) => {
    console.log(iconPosition);
    
    if (elementRef.current) {
      const newBox = {
        id: Date.now(),
        x: iconPosition.left-rect.x,  
        y: iconPosition.top-rect.y,
      };
      setBox(newBox);
      console.log(box);
      
      setTimeout(() => {
        setBox(null);
      }, 1000);
    }
  };
  

  // const [ref, bounds] = useMeasure({ scroll: false });
  // const [isHover, setIsHover] = useState(false);
  // const [isPress, setIsPress] = useState(false);
  // const mouseX = useMotionValue(0);
  // const mouseY = useMotionValue(0);

  // const resetMousePosition = () => {
  //   mouseX.set(0);
  //   mouseY.set(0);
  // };


  function getBoundingClientRect(){
    console.log("hello from get boundries");
    
    const timeoutId = setTimeout(() => {
      if (elementRef.current) {
          const rect = elementRef.current.getBoundingClientRect();
          console.log(rect);
          moveToIcon(rect)
      }
  }, 100);

  return () => clearTimeout(timeoutId);
  }

  const handleAddProduct = (productId) => {
    getBoundingClientRect()
    addproduct(product.id);
  };

  useEffect(() => {
    if (box) {
      console.log('Box updated:', box);
    }
  }, [box]);

  
  return (
    <div className="w-1/6 p-1">
      <div className="product overflow-hidden hover:rounded-md">
        <Link to={`/productDetails/${product.id}/${product.category._id}`}>
          <div>
            {box && (
              <motion.img
              src={product.imageCover}
              key={box.id}
              animate={{ x: box ? box.x : 0, y: box ? box.y : 0 }}
              transition={10}
              style={{
                width: 50,
                height: 50,
                position: 'absolute',
                zIndex: 999,
              }}
              />
            )}
            <img ref={elementRef} src={product.imageCover} className="w-full relative" alt="" />
          </div>

          <div className="p-2">
            <span>{product.category?.name}</span>
            <h2 className="font-bold mb-3">{product.title.split(' ').splice(0, 2).join(' ')}</h2>
            <div className="flex justify-between">
              <span className="text-green-500">{product.price} EGP</span>
              <span>{product.ratingsAverage} <i className="fa fa-star text-yellow-300"></i></span>
            </div>
          </div>
        </Link>


    {/* <MotionConfig transition={transition}>
      <motion.button
        ref={ref}
        initial={false}
        animate={isHover ? "hover" : "rest"}
        whileTap="press"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.5 },
          press: { scale: 1.4 }
        }}
        onHoverStart={() => {
          resetMousePosition();
          setIsHover(true);
        }}
        onHoverEnd={() => {
          resetMousePosition();
          setIsHover(false);
        }}
        onTapStart={() => setIsPress(true)}
        onTap={() => setIsPress(false)}
        onTapCancel={() => setIsPress(false)}
        onPointerMove={(e) => {
          mouseX.set(e.clientX - bounds.x - bounds.width / 2);
          mouseY.set(e.clientY - bounds.y - bounds.height / 2);
        }}
      >
        <motion.div
          className="shapes"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 }
          }}
        >
          <div className="pink blush" />
          <div className="blue blush" />
          <div className="container">
            <Suspense fallback={null}>
              <Shapes
                isHover={isHover}
                isPress={isPress}
                mouseX={mouseX}
                mouseY={mouseY}
              />
            </Suspense>
          </div>
        </motion.div>
        <motion.div
          variants={{ hover: { scale: 0.85 }, press: { scale: 1.1 } }}
          className="label"
        >
          play
        </motion.div>
      </motion.button>
    </MotionConfig> */}

        <div className="px-3 pb-3">
          <button className="btnnn" onClick={() => handleAddProduct(product.id)}>
            {loading && currentIds[product.id] ? <i className="fa fa-spinner fa-spin"></i> : <span> Add to <i className='fa fa-cart-shopping'></i> </span>}
          </button>
        </div>
        <div className="px-3 pb-3">
          <button className="btnnn" onClick={() =>addWL(product.id)}>
            {loading && currentIds[product.id] ? (
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
