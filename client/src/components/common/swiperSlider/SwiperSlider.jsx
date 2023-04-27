import React from "react";
import PropTypes from "prop-types";
import config from "../../../config/config.json";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const SwiperSlider = ({ product }) => {
  const pathBase = config.API_BASE_URL;
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      loop={true}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="rounded-lg lg:w-[80%]"
    >
      {product.images.map((img, i) => (
        <SwiperSlide key={i + "img"}>
          <figure className="max-h-[400px] w-[100%] lg:max-h-[600px]">
            <img
              src={pathBase + img}
              alt=""
              className="h-full w-full object-cover"
            />
          </figure>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

SwiperSlider.propTypes = {
  product: PropTypes.object,
};

export default SwiperSlider;
