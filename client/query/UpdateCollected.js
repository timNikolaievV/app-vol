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
    props.query.collected += quantity;
    props.query.demand -= quantity;

    if (props.query.demand < 0) {
      props.query.demand = 0;
    }
    updateQuery(props.query);
  };

  const minusCollected = () => {
    props.query.collected -= quantity;
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
      <IconButton aria-label="AddIcon" onClick={clickButton} color="secondary">
        <ShoppingCartIcon />
      </IconButton>

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
          <Button
            onClick={addCollected}
            color="secondary"
            autoFocus="autoFocus"
          >
            +
          </Button>
          <Button
            onClick={minusCollected}
            color="secondary"
            autoFocus="autoFocus"
          >
            -
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
UpdateCollected.propTypes = {
  query: PropTypes.object.isRequired,
  onUpdateCollected: PropTypes.func.isRequired,
};
