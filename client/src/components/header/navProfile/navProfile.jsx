import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";

import { getCurrentUserData } from "../../../store/users";
import { SpinnerLoader } from "../../ui/spinnerLoader";

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUserData());

  return !currentUser ? (
    <SpinnerLoader />
  ) : (
    <>
      <Menu
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        <MenuHandler>
          <button className="mr-4 bg-transparent p-0">
            <Avatar src={currentUser.image} variant="rounded" size="sm" />
          </button>
        </MenuHandler>
        <MenuList>
          <MenuItem>
            <Link to={`/user/${currentUser._id}`}>{currentUser.login}</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/logout">Выйти</Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default NavProfile;
