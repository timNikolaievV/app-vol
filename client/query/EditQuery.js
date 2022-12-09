import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import ArrowUp from "@material-ui/icons/ArrowUpward";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import { read, update } from "./api-query.js";
import { Link, Redirect } from "react-router-dom";
import auth from "./../auth/auth-helper";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 800,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(12),
  }),
  flex: {
    display: "flex",
    marginBottom: 20,
  },
  card: {
    padding: "24px 40px 40px",
  },
  subheading: {
    margin: "10px",
    color: theme.palette.openTitle,
  },
  details: {
    margin: "16px",
  },
  upArrow: {
    border: "2px solid #f57c00",
    marginLeft: 3,
    marginTop: 10,
    padding: 4,
  },
  sub: {
    display: "block",
    margin: "3px 0px 5px 0px",
    fontSize: "0.9em",
  },
  media: {
    height: 250,
    display: "inline-block",
    width: "50%",
    marginLeft: "16px",
  },
  icon: {
    verticalAlign: "sub",
  },
  textfield: {
    width: 350,
  },
  action: {
    margin: "8px 24px",
    display: "inline-block",
  },
  input: {
    display: "none",
  },
  filename: {
    marginLeft: "10px",
  },
  list: {
    backgroundColor: "#f3f3f3",
  },
}));

export default function EditQuery({ match }) {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: "",
    demand: "",
    collected: "",
    unitOfMeasure: "",
    category: "",
    redirect: false,
    error: "",
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ queryId: match.params.queryId }, signal).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          demand: data.demand,
          collected: data.collected,
          unitOfMeasure: data.unitOfMeasure,
          category: data.category,
        });
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.queryId]);

  const jwt = auth.isAuthenticated();

  const clickSubmit = () => {
    const query = {
      name: values.name || undefined,
      demand: values.demand || undefined,
      collected: values.collected || undefined,
    };
    update(
      {
        queryId: match.params.queryId,
      },
      {
        t: jwt.token,
      },
      query
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, _id: data._id, redirect: true });
      }
    });
  };
  if (values.redirect) {
    return <Redirect to={"/query/" + values._id} />;
  }
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Edit Query
          </Typography>
          <br />
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
          />
          <br />
          <TextField
            id="demand"
            label="Demand"
            value={values.demand}
            onChange={handleChange("demand")}
            className={classes.textField}
            margin="normal"
          />
          <br />
          <TextField
            id="collected"
            label="Collected"
            className={classes.textField}
            value={values.collected}
            onChange={handleChange("collected")}
            margin="normal"
          />
          <br />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Update
          </Button>
          <Link to="/querys" className={classes.submit}>
            <Button variant="contained">Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}
