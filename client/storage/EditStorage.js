import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { read, update } from "./api-storage.js";
import { Link, Redirect } from "react-router-dom";
import auth from "./../auth/auth-helper";

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

  const [values, setValues] = useState({
    name: "",
    location: "",
    contactPerson: "",
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
        setValues({
          ...values,
          name: data.name,
          location: data.location,
          contactPerson: data.contactPerson,
        });
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.storageId]);

  const jwt = auth.isAuthenticated();

  const clickSubmit = () => {
    const storage = {
      name: values.name || undefined,
      location: values.location || undefined,
      contactPerson: values.contactPerson || undefined,
    };
    update(
      {
        storageId: match.params.storageId,
      },
      {
        t: jwt.token,
      },
      storage
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
    return <Redirect to={"/storage/" + values._id} />;
  }
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Edit Storage
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
            id="location"
            label="Location"
            value={values.location}
            onChange={handleChange("location")}
            className={classes.textField}
            margin="normal"
          />
          <br />
          <TextField
            id="contactPerson"
            label="ContactPerson"
            className={classes.textField}
            value={values.contactPerson}
            onChange={handleChange("contactPerson")}
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
          <Link to="/storages" className={classes.submit}>
            <Button variant="contained">Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}
