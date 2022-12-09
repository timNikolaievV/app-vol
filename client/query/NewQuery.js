import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import auth from "./../auth/auth-helper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { create } from "./api-query.js";
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

export default function NewQueries({ match }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    demand: "",
    collected: "",
    unitOfMeasure: "",
    category: "",
    storage: "",
    redirect: false,
    error: "",
  });
  const jwt = auth.isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const clickSubmit = () => {
    const queries = {
      name: values.name || undefined,
      demand: values.demand || undefined,
      collected: values.collected || undefined,
      unitOfMeasure: values.unitOfMeasure || undefined,
      category: values.category || undefined,
      storage: match.params.storageId || undefined,
    };
    create(queries, {
      t: jwt.token,
    }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          error: "",
          redirect: true,
        });
      }
    });
  };

  if (values.redirect) {
    return <Redirect to={"/queriesByStorage/" + match.params.storageId} />;
  }
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            New Queries
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
          <TextField
            id="unitOfMeasure"
            label="UnitOfMeasure"
            className={classes.textField}
            value={values.unitOfMeasure}
            onChange={handleChange("unitOfMeasure")}
            margin="normal"
          />
          <br />
          <TextField
            id="category"
            label="Category"
            className={classes.textField}
            value={values.category}
            onChange={handleChange("category")}
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
            Submit
          </Button>
          <Link to="/queries" className={classes.submit}>
            <Button variant="contained">Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}
