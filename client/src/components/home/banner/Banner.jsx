import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import SocialNetwork from "../socialNetwork/socialNetwork";

const Banner = () => {
  return (
    <>
      <section className="relative left-0 right-0 top-16 z-10 max-w-screen-3xl px-4 sm:px-5 lg:top-52">
        <Typography variant="h2" className="sr-only" aria-label="Баннер">
          Баннер
        </Typography>
        <div
          className={`banner-img absolute right-0 top-[200px] h-[80vw] w-[80vw] rounded-lg bg-banner sm:left-[20vw] sm:right-auto sm:top-0 sm:h-[50vw] sm:w-[70vw] lg:h-[40vw]`}
        ></div>
        <div className="relative max-w-lg sm:top-[15vw]">
          <Typography
            variant="h3"
            className={`banner-title absolute whitespace-nowrap font-md-bt dark:text-main-white dark:mix-blend-difference sm:top-[-3vw]`}
          >
            Комнатные растения
          </Typography>
          <span className="banner-txt  left-[30vw] top-[10vw] text-green-1 sm:left-[20vw] sm:top-[3vw]">
            с любовью...
          </span>
          <Typography className="absolute top-[20vw] font-bk-rt leading-[24px] dark:text-main-white dark:mix-blend-difference sm:top-[15vw] lg:top-40">
            Мы поможем вам подобрать лучшие растения для вашего помещения,
            оранжереи и сада, доставим их к вашей двери и поможем ухаживать за
            ними.
          </Typography>
          <div>
            <Link
              to="/catalog"
              className="absolute top-56 m-0 rounded-lg border-2 border-green-1 bg-main-white px-5 py-2 font-bk-rt text-main-black transition hover:bg-green-1 hover:text-main-white focus:bg-green-1 focus:text-main-white focus:outline-none sm:top-64 sm:px-8 sm:py-3"
              role="button"
            >
              Просмотреть каталог
            </Link>
          </div>
        </div>

        <SocialNetwork styles="absolute top-[290px] left-[-5px] sm:left-auto sm:top-[15vw] sm:right-5" />
      </section>
    </>
  );
};

export default Banner;
