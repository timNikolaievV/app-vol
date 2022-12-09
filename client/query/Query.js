import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import auth from "./../auth/auth-helper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import DeleteQuery from "./DeleteQuery";
import Divider from "@material-ui/core/Divider";

import { makeStyles } from "@material-ui/core/styles";
import { create, read } from "./api-query.js";
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
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
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

export default function Query({ match }) {
  const [values, setValues] = useState({
    name: "",
    demand: "",
    collected: "",
    unitOfMeasure: "",
    category: "",
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
          setValues({
            ...values,
            name: data.name,
            demand: data.demand,
            collected: data.collected,
            unitOfMeasure: data.unitOfMeasure,
            category: data.category,
          });
        }
      }
    );
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.storageId]);

  const removeQuery = () => {
    setValues({ ...values, redirect: true });
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (values.redirect) {
    return <Redirect to={"/queriesByStorage/" + match.params.storageId} />;
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          title={values.name}
          action={
            <>
              {auth.isAuthenticated().user && (
                <span className={classes.action}>
                  <Link to={"/query/edit/" + values._id}>
                    <IconButton aria-label="Edit" color="secondary">
                      <Edit />
                    </IconButton>
                  </Link>

                  <DeleteQuery query={values} onRemove={removeQuery} />
                </span>
              )}
            </>
          }
        />

        <div className={classes.details}>
          <Typography variant="body1" className={classes.subheading}>
            {values.demand}
            <br />
          </Typography>

          <Typography variant="body1" className={classes.subheading}>
            {values.collected}
            <br />
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {values.unitOfMeasure}
            <br />
          </Typography>
          <Typography variant="body1" className={classes.subheading}>
            {values.category}
            <br />
          </Typography>
        </div>
        <Divider />
      </Card>
    </div>
  );
}
