import React from "react";

import { Typography } from "@material-tailwind/react";

import CardMain from "../../common/card/CardMain";

const SectionCardMain = () => {
  return (
    <>
      <section className=" relative top-[1124px] px-3 lg:px-5">
        <Typography
          variant="h2"
          aria-label="Наши любимые цветы"
          className="mb-8 font-bk-rt dark:text-main-white dark:mix-blend-difference"
        >
          Любимые наши цветы
        </Typography>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 sm:gap-2 lg:grid-cols-4 lg:gap-4">
          <CardMain />
          <CardMain />
          <CardMain />
          <CardMain />
        </div>
      </section>
    </>
  );
};

export default SectionCardMain;
