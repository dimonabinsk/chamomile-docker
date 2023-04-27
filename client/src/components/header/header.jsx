import PropTypes from "prop-types";

import NavBar from "./navBar/navBar";

const Header = ({ fixed }) => {
  return (
    <>
      <header
        className={`${
          fixed ? "fixed animate-birth" : "relative "
        } top-2 left-0 right-0 z-50`}
      >
        <NavBar />
      </header>
    </>
  );
};

Header.propTypes = {
  fixed: PropTypes.bool
};

export default Header;
