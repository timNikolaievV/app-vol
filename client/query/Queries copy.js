import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Person from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { Redirect, Link } from "react-router-dom";
import { list, listByStorage } from "./api-query.js";

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

export default function Queries({ match }) {
  const classes = useStyles();
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listByStorage({ storageId: match.params.storageId }, signal).then(
      (data) => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          setQueries(data);
        }
      }
    );

    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.storageId]);

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        All Queriess
        <span className={classes.addButton}>
          <Link to="/storage/query/new">
            <Button color="primary" variant="contained">
              <Icon className={classes.leftIcon}>add_box</Icon> New Queries
            </Button>
          </Link>
        </span>
      </Typography>
      <List dense>
        {queries.map((item, i) => {
          return (
            <Link to={"/storage/queries/" + item._id} key={i}>
              <ListItem button>
                <ListItemText primary={item.name} />
                <ListItemText primary={item.demand} />
                <ListItemText primary={item.collected} />
                <ListItemText primary={item.unitOfMeasure} />
                <ListItemText primary={item.category} />
                <ListItemText primary={item.storage} />
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
