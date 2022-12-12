import React, { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import auth from "../auth/auth-helper";
import { update } from "./api-query.js";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

export default function UpdateCollected(props) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const jwt = auth.isAuthenticated();
  const clickButton = () => {
    setOpen(true);
  };

  const updateQuery = (query) => {
    update(
      {
        queryId: props.query._id,
        storageId: props.query.storage,
      },
      {
        t: jwt.token,
      },
      query
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setOpen(false);
        props.onUpdateCollected(props.query);
      }
    });
  };
  const addCollected = () => {
    props.query.collected += parseInt(quantity);
    props.query.demand -= parseInt(quantity);

    if (props.query.demand < 0) {
      props.query.demand = 0;
    }
    updateQuery(props.query);
  };

  const minusCollected = () => {
    props.query.collected -= parseInt(quantity);
    if (props.query.collected < 0) {
      props.query.collected = 0;
    }
    updateQuery(props.query);
  };

  const changeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleRequestClose = () => {
    setOpen(false);
  };
  return (
    <span>
      <Tooltip title="Change collected value">
        <IconButton
          aria-label="AddIcon"
          onClick={clickButton}
          color="secondary"
        >
          <ShoppingCartIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Change collected " + props.query.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Query demand {props.query.demand}
            <br />
            Collected {props.query.collected}
            <br />
            <TextField
              id="quantity"
              label="Quantity"
              //className={classes.textField}
              value={quantity}
              onChange={changeQuantity}
              margin="normal"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Tooltip title="Add collected items">
            <Button
              onClick={addCollected}
              color="secondary"
              autoFocus="autoFocus"
            >
              <AddIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Substract collected items">
            <Button
              onClick={minusCollected}
              color="secondary"
              autoFocus="autoFocus"
            >
              <RemoveIcon />
            </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </span>
  );
}
UpdateCollected.propTypes = {
  query: PropTypes.object.isRequired,
  onUpdateCollected: PropTypes.func.isRequired,
};
