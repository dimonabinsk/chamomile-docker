import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LinkCategory = () => {
  return (
    <>
      <section className="relative top-[750px] w-full bg-inherit px-3 font-md-bt uppercase sm:top-[650px] lg:top-[1000px] lg:px-5">
        <Typography
          variant="h3"
          className="sr-only"
          aria-label="ссылки на категории сайтов"
        >
          Ссылки на категории сайтов
        </Typography>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="live-plants h-[289px] w-full overflow-hidden rounded-lg bg-live text-center sm:h-[524px] ">
            <Link
              to="/catalog"
              className="mt-24 text-2xl text-main-black transition-all hover:scale-105 hover:text-green-2 sm:text-2xl lg:text-5xl"
              aria-label="открывает каталог"
            >
              каталог цветов
              {
                <FontAwesomeIcon
                  icon={faArrowRightLong}
                  size="2xs"
                  width={80}
                />
              }
            </Link>
          </div>
          <div className="grid w-full gap-5">
            <div className=" access h-[289px]  overflow-hidden  rounded-lg bg-pots text-center sm:h-[252px]">
              <Link
                to="/accessories"
                className="mt-16 text-2xl text-main-black transition-all hover:scale-105 hover:text-green-2 sm:text-3xl lg:text-5xl"
                aria-label="открывает аксессуары"
              >
                аксессуары
                {
                  <FontAwesomeIcon
                    icon={faArrowRightLong}
                    size="2xs"
                    width={80}
                  />
                }
              </Link>
            </div>
            <div className=" plant-care h-[289px] overflow-hidden rounded-lg bg-plant text-center sm:h-[252px]">
              <Link
                to="/plantcare"
                className="mt-16 text-2xl text-main-black transition-all hover:scale-105 hover:text-green-2 sm:text-3xl lg:text-5xl"
                aria-label="открывает уход за растениями"
              >
                Уход&nbsp; за растениями
                {
                  <FontAwesomeIcon
                    icon={faArrowRightLong}
                    size="2xs"
                    width={80}
                  />
                }
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LinkCategory;
