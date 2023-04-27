import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

import { getBasket, getBasketLoadingStatus } from "../../../store/basket";
import config from "../../../config/config.json";

const pathBase = config.API_BASE_URL;

const NavBasket = ({ isLoggedIn }) => {
  const userBasket = useSelector(getBasket());
  const isLoadingBasket = useSelector(getBasketLoadingStatus());

  if (!isLoggedIn) {
    return <MenuNavBasket menuItem={"Авторизуйтесь"} />;
  } else {
    if (!isLoadingBasket) {
      if (userBasket[0].basket.product === false) {
        return (
          <Menu
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
          >
            <MenuHandler>
              <IconButton
                size="lg"
                className="flex flex-col font-bk-rt text-green-4 dark:text-green-1"
                variant="text"
              >
                <FontAwesomeIcon icon={faBagShopping} size="2xl" />
                <span className="absolute -bottom-2 left-3 rounded-lg bg-white px-1 text-green-4 dark:text-green-2">
                  0
                </span>
              </IconButton>
            </MenuHandler>
            <MenuList>
              <MenuItem className=" hover:bg-green-1 hover:text-main-white">
                <Link to={"/catalog"}>В каталог</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        );
      } else {
        const basket = Object.values(userBasket[0].basket).filter(
          (el) => el !== true
        );
        return (
          <Menu
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
          >
            <MenuHandler>
              <IconButton
                size="lg"
                className="p-4 font-bk-rt text-green-4 dark:text-green-1"
                variant="text"
              >
                <FontAwesomeIcon icon={faBagShopping} size="2xl" />
                <span className="absolute -bottom-2 -left-2 rounded-lg bg-orange-300 px-1 font-bold text-graphite ">
                  {userBasket[0].totalQuantity}
                </span>
              </IconButton>
            </MenuHandler>
            <MenuList className="max-h-[50vh]">
              {basket.map(({ name, img, quantity, totalPrice }, i) => (
                <MenuItem key={i + name} className="">
                  <Avatar
                    src={pathBase + img}
                    alt="avatar"
                    size="xl"
                    className="mr-2"
                  />
                  <Typography variant="h6" className="mt-0 font-bk-rt">
                    {name}
                  </Typography>

                  <Typography className="mt-0 p-0 font-bk-rt">
                    кол: {quantity}
                  </Typography>

                  <Typography className="mt-0 p-0 font-bk-rt">
                    Цена: {totalPrice} руб.
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem>
                <Typography className="cursor-default font-bk-rt">
                  Общая цена: {userBasket[0].totalPrice} руб.
                </Typography>
              </MenuItem>
              <MenuItem className="text-center font-bk-rt text-gray-900 hover:bg-green-600">
                <Link to={"/basket"} className="">
                  Перейти в корзину
                </Link>
              </MenuItem>
            </MenuList>
          </Menu>
        );
      }
    }
  }

  function MenuNavBasket({ menuItem }) {
    return (
      <Menu
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        <MenuHandler>
          <IconButton
            size="lg"
            className="flex flex-col font-bk-rt text-green-4 dark:text-green-1"
            variant="text"
          >
            <FontAwesomeIcon icon={faBagShopping} size="2xl" />
            <span className="absolute -bottom-2 left-3 rounded-lg bg-white px-1 text-green-4 dark:text-green-2">
              0
            </span>
          </IconButton>
        </MenuHandler>
        <MenuList>
          <MenuItem>{menuItem}</MenuItem>
        </MenuList>
      </Menu>
    );
  }
};
export default NavBasket;
