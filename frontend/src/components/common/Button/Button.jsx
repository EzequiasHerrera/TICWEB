import React from "react";
import { Link } from "react-router-dom";

const Button = ({ to, onClick, children, api }) => {
  if (to) {
    return (
      <Link
        to={to}
        className="bg-amber-100 rounded-2xl p-2 text-black hover:bg-amber-300 cursor-pointer"
      >
        {children}
      </Link>
    );
  }

  if (api) {
    return (
      <a
        className="bg-amber-100 rounded-2xl p-2 text-black hover:bg-amber-300 cursor-pointer"
        href={api}
        type="button"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className="bg-amber-100 rounded-2xl p-2 text-black hover:bg-amber-300 cursor-pointer"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
