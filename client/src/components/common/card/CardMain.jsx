import React from "react";
// import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

import config from "../../../config/config.json";

const pathBase = config.API_BASE_URL;

const CardMain = () => {
  return (
    <>
      <Card className="mt-10">
        <CardHeader>
          <img src={pathBase + "/images/catalog/jasmine-1.jpg"} alt="plant" />
        </CardHeader>
        <CardBody>
          <Typography variant="h3" className=" font-miama">
            Красавица Индии
          </Typography>
        </CardBody>
      </Card>
    </>
  );
};

export default CardMain;
