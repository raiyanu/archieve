import React from "react";
import { GlobeAltIcon } from "@heroicons/react/20/solid";
const Brands = () => {
  const deg = 12;
  const style = {
    icon:
      "h-[100px] rotate-[-12deg]  text-[darkslategrey] inline aspect-square ml-12" +
      " " +
      `rotate-[${"-" + deg.toString() + "deg"}]`,
  };
  return (
    <marquee
      className={
        " my-12 bg-[cadetblue] max-sm:w-[110%]  flex max-sm:ml-[-20px] " +
        " " +
        `max-sm:rotate-[${deg.toString()}deg]`
      }
      alternate="true"
    >
      <GlobeAltIcon className={style.icon} />
      <GlobeAltIcon className={style.icon} />
      <GlobeAltIcon className={style.icon} />
      <GlobeAltIcon className={style.icon} />
      <GlobeAltIcon className={style.icon} />
      <GlobeAltIcon className={style.icon} />
      <GlobeAltIcon className={style.icon} />
      <GlobeAltIcon className={style.icon} />
      <GlobeAltIcon className={style.icon} />
      <GlobeAltIcon className={style.icon} />
      <GlobeAltIcon className={style.icon} />
      <GlobeAltIcon className={style.icon} />
      <GlobeAltIcon className={style.icon} />
    </marquee>
  );
};

export default Brands;
