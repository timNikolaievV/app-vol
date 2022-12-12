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
import auth from "../auth/auth-helper";
import Tooltip from "@material-ui/core/Tooltip";
import { remove } from "./api-user.js";
import { Redirect } from "react-router-dom";

export default function DeleteUser(props) {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const jwt = auth.isAuthenticated();
  const clickButton = () => {
    setOpen(true);
  };
  const deleteAccount = () => {
    remove(
      {
        userId: props.userId,
      },
      { t: jwt.token }
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        if (!auth.inRole("admin")) {
          auth.clearJWT(() => console.log("deleted"));
        }
        setRedirect(true);
      }
    });
  };
  const handleRequestClose = () => {
    setOpen(false);
  };

  if (redirect) {
    if (auth.inRole("admin")) {
      return <Redirect to="/users" />;
    }
    return <Redirect to="/" />;
  }
  return (
    <span>
      <Tooltip title="Delete">
        <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete account.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteAccount}
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
// DeleteUser.propTypes = {
//   userId: PropTypes.string.isRequired,
// };
