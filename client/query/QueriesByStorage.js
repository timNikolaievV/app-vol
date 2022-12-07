import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { listCategories, listByStorage } from "./api-query.js";
import Search from "./Search";
import Categories from "./Categories";
import Queries from "./Queries.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
}));

export default function QueriesByStorage({ match }) {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [queries, setQueries] = useState([]);
  const [storage, setStorage] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listByStorage({ storageId: match.params.storageId }, signal).then(
      (data) => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          setQueries(data.queries);
          setStorage(data.storage);
        }
      }
    );

    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.storageId]);

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   const signal = abortController.signal;
  //   listCategories(signal).then((data) => {
  //     if (data.error) {
  //       console.log(data.error);
  //     } else {
  //       setCategories(data);
  //     }
  //   });
  //   return function cleanup() {
  //     abortController.abort();
  //   };
  // }, []);
  // <Queries queries={queries} searched={false} />

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={8} sm={8}></Grid>
      </Grid>
    </div>
  );
}
