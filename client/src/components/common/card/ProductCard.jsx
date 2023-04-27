import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Card ,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

const ProductCard = ({ src, alt, title, price, path, description }) => {
  return (
    <Card className="">
      <CardHeader color="blue-gray" className=" h-72">
        <Link
          to={path}
          className="after:absolute after:top-[80%]  after:left-[calc(50%-60px)] after:w-[120px]  after:cursor-pointer after:rounded-md after:bg-green-1 after:bg-opacity-70 after:p-1  after:text-center after:font-bk-rt after:text-lg after:text-main-white after:opacity-0 after:content-['подробнее...'] hover:after:opacity-100"
        >
          <img
            src={src}
            alt={alt}
            className=" h-full w-full object-cover transition hover:scale-[1.05] "
          />
        </Link>
      </CardHeader>
      <CardBody className="h-40 overflow-auto text-center scroll_card">
        <Typography variant="h5" className="mb-2 font-miama">
          {title}
        </Typography>
        <Typography className="font-bk-rt">
          {description}
        </Typography>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">{price} руб</Typography>
        <Button ripple={true} color="green" className=" font-bk-rt">
          <FontAwesomeIcon icon={faBagShopping} className="mr-3" size="lg" />
          Купить
        </Button>
      </CardFooter>
    </Card>
  );
};

ProductCard.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  path: PropTypes.string,
  description:PropTypes.string
};

export default ProductCard;
