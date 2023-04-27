import React from "react";
import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ChangeThemeBtn = ({ onChangeTheme, darkMode, classes }) => {
  return (
    <IconButton variant="text" className={classes} onClick={onChangeTheme}>
      {darkMode ? (
        <Tooltip
          content="Включить свет"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
          className="bg-transparent font-bk-rt text-main-white"
        >
          <FontAwesomeIcon color="#f7f7f7" size="2xl" icon={faMoon} />
        </Tooltip>
      ) : (
        <Tooltip
          content="Выключить свет"
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}
          className="bg-transparent font-bk-rt text-sun"
        >
          <FontAwesomeIcon color="#ff8c00" size="2xl" icon={faSun} />
        </Tooltip>
      )}
    </IconButton>
  );
};

ChangeThemeBtn.propTypes = {
  onChangeTheme: PropTypes.func,
  darkMode: PropTypes.bool,
  classes: PropTypes.string,
};

export default ChangeThemeBtn;
