import React from "react";
import { Link } from "react-router-dom";
import logoPixel from "@/assets/images/logopixel.webp";

const TabletButton = ({ to, icon, name }) => {
  if (icon === "tic") {
    return (
      <Link
        to={to}
        className="transition-transform transform-gpu duration-50 ease-in-out hover:scale-105 flex flex-col items-center w-20 h-20 align-middle text-center pt-3"
      >
        <img
          className="size-9 sm:size-12 drop-shadow-[0_0_10px_#dc5b23] mb-3"
          src={logoPixel}
          alt="Icono Pixelart TIC"
        />
        <p className="sm:break-normal sm:text-sm sm:leading-4 leading-1 text-[10px]">{name}</p>
      </Link>
    );
  }
};

export default TabletButton;
