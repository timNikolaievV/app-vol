import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import ArrowForward from "@material-ui/icons/ArrowForward";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { listCategories, listByStorage } from "./api-query.js";

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

export default function QueriesByStorage({ match }) {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);

  const [values, setValues] = useState({
    category: "",
    search: "",
    results: [],
    storage: { _id: "", name: "" },
    searched: false,
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listByStorage({ storageId: match.params.storageId }, signal).then(
      (data) => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          setValues({
            ...values,
            results: data.queries,
            storage: data.storage,
            searched: true,
          });
        }
      }
    );

    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.storageId]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listCategories(signal).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const search = () => {
    if (values.search) {
      list({
        search: values.search || undefined,
        category: values.category,
      }).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, results: data, searched: true });
        }
      });
    }
  };
  const enterKey = (event) => {
    if (event.keyCode == 13) {
      event.preventDefault();
      search();
    }
  };
  return (
    <div>
      <Paper>
        <Card className={classes.card}>
          <TextField
            id="select-category"
            select
            label="Select category"
            className={classes.textField}
            value={values.category}
            onChange={handleChange("category")}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
          >
            <MenuItem value="All">All</MenuItem>
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="search"
            label="Search queries"
            type="search"
            onKeyDown={enterKey}
            onChange={handleChange("search")}
            className={classes.searchField}
            margin="normal"
          />
          <Button
            variant="contained"
            color={"primary"}
            className={classes.searchButton}
            onClick={search}
          >
            <SearchIcon />
          </Button>
          <span className={classes.addButton}>
            <Link to={`/queriesByStorage/${values.storage._id}/new`}>
              <Button color="primary" variant="contained">
                <Icon className={classes.leftIcon}>add_box</Icon> New Query
              </Button>
            </Link>
          </span>
          <Divider />
          <List dense>
            {values.results.map((item, i) => {
              return (
                <Link to={"/query/" + item._id} key={i}>
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
        </Card>
      </Paper>
    </div>
  );
}
