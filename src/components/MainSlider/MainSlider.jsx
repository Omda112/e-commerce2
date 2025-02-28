import React from 'react';
import Slider from 'react-slick';
import Slider1 from '../../assets/assets/images/slider-image-1.jpeg';
import Slider2 from '../../assets/assets/images/slider-image-2.jpeg';
import Slider3 from '../../assets/assets/images/slider-image-3.jpeg';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
    dotsClass: "slick-dots custom-dots"
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 py-8 px-4 md:px-10 bg-green-50 rounded-xl shadow-lg mt-5">
      {/* Main Slider */}
      <div className="md:w-3/4 w-full rounded-lg overflow-hidden">
        <Slider {...settings}>
          {[Slider1, Slider2, Slider3].map((slide, index) => (
            <div key={index}>
              <img src={slide} alt={`Slide ${index + 1}`} className="h-[500px] w-full object-cover rounded-lg transition-transform duration-500 hover:scale-105" />
            </div>
          ))}
        </Slider>
      </div>

      {/* Side Images */}
      <div className="md:w-1/4 w-full flex flex-col gap-4">
        {[Slider2, Slider3].map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Side Image ${index + 1}`}
            className="h-[245px] w-full object-cover rounded-lg shadow-md transition-transform duration-500 hover:scale-105"
          />
        ))}
      </div>
    </div>
  );
}
