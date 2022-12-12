import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import auth from "./../auth/auth-helper";
import { remove } from "./api-storage.js";
import Tooltip from "@material-ui/core/Tooltip";

export default function DeleteStorage(props) {
  const [open, setOpen] = useState(false);

  const jwt = auth.isAuthenticated();
  const clickButton = () => {
    setOpen(true);
  };
  const deleteStorage = () => {
    remove(
      {
        storageId: props.storage._id,
      },
      { t: jwt.token }
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOpen(false);
        props.onRemove(props.storage);
      }
    });
  };
  const handleRequestClose = () => {
    setOpen(false);
  };
  return (
    <span>
      <Tooltip title="Delete">
        <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete " + props.storage.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your storage {props.storage.name}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteStorage}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
DeleteStorage.propTypes = {
  storage: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};
