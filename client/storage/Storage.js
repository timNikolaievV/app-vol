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
import DeleteStorage from "./DeleteStorage";
import Divider from "@material-ui/core/Divider";

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
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          title={storage.name}
          action={
            <>
              {auth.isAuthenticated().user && (
                <span className={classes.action}>
                  <Link to={"/storage/edit/" + storage._id}>
                    <IconButton aria-label="Edit" color="secondary">
                      <Edit />
                    </IconButton>
                  </Link>

                  <DeleteStorage storage={storage} onRemove={removeStorage} />
                </span>
              )}
            </>
          }
        />

        <div className={classes.details}>
          <Typography variant="body1" className={classes.subheading}>
            {storage.location}
            <br />
          </Typography>

          <Typography variant="body1" className={classes.subheading}>
            {storage.contactPerson}
            <br />
          </Typography>
        </div>
        <Divider />
      </Card>
    </div>
  );
}
