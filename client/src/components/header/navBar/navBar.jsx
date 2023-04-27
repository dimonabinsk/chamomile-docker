/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { Navbar, MobileNav, Tooltip } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { useDarkMode } from "../../../hooks/useDarkMode";
import OpenNavBtn from "../openNavBtn/openNavBtn";
import ChangeThemeBtn from "../changeThemeBtn/changeThemeBtn";
import { Logo } from "../logo";
import { Search } from "../../common/form/search";
import { NavList } from "../navList";
import { getIsLoggedIn } from "../../../store/users";
import { NavProfile } from "../navProfile";
import { NavBasket } from "../navBasket";

export default function NavBar() {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const [openNav, setOpenNav] = useState(false);
  const [isDarkMode, setDarkMode] = useDarkMode();
  const handleModeTheme = () => {
    isDarkMode ? setDarkMode() : setDarkMode();
  };

  const handleOpenNav = () => {
    setOpenNav((prev) => !prev);
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <Navbar
      className={` mx-auto max-w-screen-3xl border-none bg-main-white transition-all dark:bg-main-black dark:shadow-lg lg:top-5 lg:px-8 lg:py-4 lg:opacity-90`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {<Logo darkMode={isDarkMode} />}
        <div className="hidden lg:block">
          {<Search />}
          {<NavList />}
        </div>
        <div className="flex flex-grow justify-around lg:w-20 lg:flex-grow-0 lg:justify-between">
          {isLoggedIn ? (
            <NavProfile />
          ) : (
            <NavLink
              to={"/login"}
              className="mt-3 cursor-pointer text-green-4 hover:text-green-2 dark:text-green-3 dark:hover:text-green-1"
              exact
            >
              <Tooltip
                content="Авторизация"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
                className="bg-transparent font-bk-rt text-green-4 dark:text-green-1"
              >
                <FontAwesomeIcon icon={faUser} size="xl" />
              </Tooltip>
            </NavLink>
          )}

          <NavBasket isLoggedIn={isLoggedIn} />
        </div>

        {
          <ChangeThemeBtn
            onChangeTheme={handleModeTheme}
            darkMode={isDarkMode}
            classes={"hidden lg:inline-block relative -right-5"}
          />
        }

        {<OpenNavBtn open={openNav} onOpen={handleOpenNav} />}
      </div>
      <MobileNav open={openNav}>
        {<NavList onOpen={handleOpenNav} />}
        {<Search />}
        <div className="ml-0">
          {
            <ChangeThemeBtn
              onChangeTheme={handleModeTheme}
              darkMode={isDarkMode}
              classes={"inline-block lg:hidden"}
            />
          }
        </div>
      </MobileNav>
    </Navbar>
  );
}
