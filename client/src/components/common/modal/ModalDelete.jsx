import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";

const ModalDelete = ({
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
  handleDelete,
}) => {
  return (
    <>
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
          <Typography variant="h4" color="red">
            Предупреждение!
          </Typography>
          <Typography variant="lead">
            Нажимая кнопку удалить приведёт к полному удалению товара из базы
            данных, без возможности восстановления
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="green"
            onClick={handler}
            className="mr-1"
          >
            <span>{cancel}</span>
          </Button>
          <Button
            variant="gradient"
            color="red"
            type="submit"
            onClick={handleDelete}
          >
            <span>{confirm}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

ModalDelete.propTypes = {
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

export default ModalDelete;
