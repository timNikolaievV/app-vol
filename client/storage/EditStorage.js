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
import { read, update } from "./api-storage.js";
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

export default function EditStorage({ match }) {
  const classes = useStyles();
  const [storage, setStorage] = useState({
    name: "",
    location: "",
    contactPerson: "",
  });
  const [values, setValues] = useState({
    redirect: false,
    error: "",
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ storageId: match.params.storageId }, signal).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setStorage(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.storageId]);

  const jwt = auth.isAuthenticated();

  const handleChange = (name) => (event) => {
    const value = name === "name" ? event.target.files[0] : event.target.value;
    setCourse({ ...course, [name]: value });
  };
  const clickSubmit = () => {
    let storageData = new FormData();
    storage.name && storageData.append("name", storage.name);
    storage.location && storageData.append("location", storage.location);
    storage.contactPerson &&
      storageData.append("contactPerson", storage.contactPerson);

    update(
      {
        storageId: match.params.storageId,
      },
      {
        t: jwt.token,
      },
      storageData
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, redirect: true });
      }
    });
  };
  if (values.redirect) {
    return <Redirect to={"/storage/" + storage._id} />;
  }
  return (
    <div className={classes.root}>
      <Card className={classes.card}>{storage.name}</Card>
    </div>
  );
}
