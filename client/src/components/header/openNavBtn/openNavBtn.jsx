import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@material-tailwind/react";

const OpenNavBtn = ({ open, onOpen }) => {
  return (
    <IconButton
      variant="text"
      className="w-6 h-6 ml-auto text-graphite hover:bg-transparent focus:bg-transparent active:bg-transparent dark:text-main-white lg:hidden"
      ripple={false}
      onClick={onOpen}
    >
      {open ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="w-6 h-6"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
    </IconButton>
  );
};

OpenNavBtn.propTypes = {
  open: PropTypes.bool,
  onOpen: PropTypes.func,
};

export default OpenNavBtn;
