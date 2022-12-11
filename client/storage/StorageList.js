import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Person from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { Redirect, Link } from "react-router-dom";
import { list } from "./api-storage.js";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    margin: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
  addButton: {
    float: "right",
  },
  leftIcon: {
    marginRight: "8px",
  },
}));

export default function StorageList() {
  const classes = useStyles();
  const [storages, setStorages] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setStorages(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        All Storages
      </Typography>
      <List dense>
        <ListItem>
          <ListItemText primary={"Name"} />
          <ListItemText primary={"Location"} />
          <ListItemText primary={"Person"} />
        </ListItem>
      </List>

      <List dense>
        {storages.map((item, i) => {
          return (
            <Link to={"/queriesByStorage/" + item._id} key={i}>
              <ListItem button>
                <ListItemText primary={item.name} />
                <ListItemText primary={item.location} />
                <ListItemText primary={item.contactPerson} />
                <ListItemSecondaryAction>
                  <IconButton>
                    <ArrowForward />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Paper>
  );
}
