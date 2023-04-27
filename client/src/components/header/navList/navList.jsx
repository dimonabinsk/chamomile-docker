import React from "react";
import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";

const NavList = ({ onOpen }) => {
  const linkList = [
    {
      id: 1,
      name: "Каталог цветов",
      path: "/catalog/",
    },
    {
      id: 2,
      name: "Аксессуары",
      path: "/accessories/",
    },
    {
      id: 3,
      name: "Уход за растениями",
      path: "/plantcare/",
    },
    {
      id: 4,
      name: "Блог",
      path: "/blog/",
    },
  ];
  const classes =
    "flex items-center border-b-2 border-b-transparent text-green-4 transition-all hover:border-b-green-3 hover:text-green-3  dark:text-green-3 dark:hover:border-b-green-2 dark:hover:text-green-2";

  const activeClasses =
    "text-green-2  dark:text-green-1 dark:border-b-green-1 border-b-green-2 border-b-2";

  return (
    <ul
      className={
        "mb-4 mt-2 inline-flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex lg:flex-row lg:items-center lg:gap-6"
      }
    >
      {linkList.map(({ id, name, path }) => (
        <li
          key={id}
          variant="small"
          className={" py-1 font-bk-bt tracking-wider "}
        >
          <NavLink
            to={path}
            className={classes}
            activeClassName={activeClasses}
            onClick={onOpen}
          >
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
//
NavList.propTypes = {
  onOpen: PropTypes.func,
};

export default NavList;
