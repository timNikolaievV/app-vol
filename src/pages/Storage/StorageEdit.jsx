import React, { ReactElement, FC, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { getStorageById } from "../../api";

const StorageEdit = () => {
  const [storage, setStorage] = useState();
  const navigate = useNavigate();
  const param = useParams();
  const [storageId, setStorageId] = useState("");
  const [storageName, setStorageName] = useState("");
  const [location, setLocation] = useState("");
  const [contactPersonId, setContactPersonId] = useState("");

  useEffect(() => {
    const fetch = async () => {
      if (param.id) {
        const data = await getStorageById(param.id);

        setStorageId(data.storageId);
        setStorageName(data.storageName);
        setLocation(data.location);
        setContactPersonId(data.contactPersonId);

        setStorage(data);
      } else {
        console.error("No storage found");
      }
    };

    fetch();
  }, []);

  const storageNameChangeHandler = (event) => {
    setStorageName(event.target.value);
  };

  const submitActionHandler = (event) => {
    event.preventDefault();
    const data = {
      storageId: storageId,
      storageName: storageName,
      location: location,
      contactPersonId: contactPersonId,
    };

    console.log(JSON.stringify(data));
  };

  return (
    <Box
      component="form"
      onSubmit={submitActionHandler}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField label="storageId" value={storageId}></TextField>
        <TextField
          label="storageName"
          value={storageName}
          onChange={storageNameChangeHandler}
        ></TextField>
      </div>
      <div>
        <TextField label="location" value={location}></TextField>
        <TextField label="contactPersonId" value={contactPersonId}></TextField>
      </div>
      <Button type="submit" variant="text">
        Submit
      </Button>
      <Button variant="text">Cancel</Button>
    </Box>
  );
};

export default StorageEdit;
