import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import auth from "./../auth/auth-helper";
import Typography from "@material-ui/core/Typography";
import DeleteStorage from "./DeleteStorage";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import StorageIcon from '@material-ui/icons/Storage';
import { makeStyles } from "@material-ui/core/styles";
import { create, read } from "./api-storage.js";
import { Link, Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(12),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  input: {
    display: "none",
  },
  filename: {
    marginLeft: "10px",
  },
}));

export default function Storage({ match }) {
  const [storage, setStorage] = useState({});
  const [values, setValues] = useState({
    redirect: false,
    error: "",
  });
  const classes = useStyles();
  const jwt = auth.isAuthenticated();
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ storageId: match.params.storageId }, { t: jwt.token }, signal).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setStorage(data);
        }
      }
    );
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.storageId]);

  const removeStorage = (storage) => {
    setValues({ ...values, redirect: true });
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (values.redirect) {
    return <Redirect to={"/storages"} />;
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
      {storage.name}
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <StorageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={storage.contactPerson} secondary={storage.location} />{" "}
          {auth.isAuthenticated().user && (
            <ListItemSecondaryAction>
              <Link to={"/storage/edit/" + storage._id}>
                <IconButton aria-label="Edit" color="primary">
                  <Edit />
                </IconButton>
              </Link>
              <DeleteStorage storage={storage} onRemove={removeStorage} />
            </ListItemSecondaryAction>
          )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={"Created: " + new Date(storage.created).toDateString()}
          />
        </ListItem>
      </List>
    </Paper>
  );
}
