import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import { Helmet } from 'react-helmet';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function TemplateName() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 6, // افتراضيًا لعرض 6 عناصر
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    pauseOnHover: true,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1536, // 2XL Screens
        settings: {
          slidesToShow: 6, 
        },
      },
      {
        breakpoint: 1280, // XL Screens
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024, // Large Screens
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768, // Medium Screens (Tablet)
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // Small Screens (Mobile)
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => setCategories(data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="w-full bg-green-50 py-5 px-3 sm:px-6 md:px-10 rounded-xl shadow-lg mt-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Category</title>
      </Helmet>

      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="p-2">
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-transform duration-500 transform hover:scale-105 overflow-hidden">
              <img
                src={category.image}
                className="h-40 sm:h-48 md:h-56 lg:h-64 w-full object-cover"
                alt={category.name}
              />
              <h2 className="text-center text-green-700 font-semibold py-2 text-sm sm:text-base capitalize">
                {category.name}
              </h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
