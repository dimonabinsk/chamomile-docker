import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";

const ModalPrice = ({
  isOpen,
  handler,
  title,
  type,
  confirm,
  cancel,
  change,
  defaultValue,
  label,
  nameInput,
  handleSubmit,
}) => {
  //   console.log(prod);
  return (
    <Dialog
      open={isOpen}
      handler={handler}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader>
        <Typography variant="h4" color="gray">
          {title}
        </Typography>
      </DialogHeader>
      <DialogBody divider>
        <form onSubmit={handleSubmit} id="form-price">
          <Input
            type={type}
            onChange={change}
            label={label}
            min={100}
            defaultValue={defaultValue}
            name={nameInput}
            step={10}
            required
          />
        </form>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={handler} className="mr-1">
          <span>{cancel}</span>
        </Button>
        <Button
          variant="gradient"
          type="submit"
          color="green"
          form="form-price"
        >
          <span>{confirm}</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

ModalPrice.propTypes = {
  isOpen: PropTypes.bool,
  handler: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.string,
  confirm: PropTypes.string,
  cancel: PropTypes.string,
  change: PropTypes.func,
  defaultValue: PropTypes.number,
  label: PropTypes.string,
  nameInput: PropTypes.string,
  handleSubmit: PropTypes.func,
};

export default ModalPrice;
