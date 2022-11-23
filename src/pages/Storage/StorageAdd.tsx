import React, { ReactElement, FC, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import type { StorageDto } from '../../types';
import RemoteStorageDto from '../../services/remote-storage-dto';
import Button from '@mui/material/Button';
import { API_URL_STORAGE } from '../../constants';

const StorageEdit: FC<any> = (): ReactElement => {
  const [storage, setStorage] = useState<StorageDto>();
  const navigate = useNavigate();
  const param = useParams();

  const rep = new RemoteStorageDto(API_URL_STORAGE);

  useEffect(() => {
    const fetch = async () => {
      if (param.id) {
        const data: StorageDto = await rep.getOne(param.id);
        setStorage(data);
      } else {
        console.error('No storage found');
      }
    };
    fetch();
  }, []);



  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: 'whitesmoke',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <TextField error id="outlined-error" label="Error" defaultValue="Hello World" />
        <TextField error id="outlined-error-helper-text" label="Error" defaultValue="Hello World" helperText="Incorrect entry." />
      </div>
      <div>
        <TextField error id="filled-error" label="Error" defaultValue="Hello World" variant="filled" />
        <TextField
          error
          id="filled-error-helper-text"
          label="Error"
          defaultValue="Hello World"
          helperText="Incorrect entry."
          variant="filled"
        />
      </div>
      <div>
        <TextField error id="standard-error" label="Error" defaultValue="Hello World" variant="standard" />
        <TextField
          error
          id="standard-error-helper-text"
          label="Error"
          defaultValue="Hello World"
          helperText="Incorrect entry."
          variant="standard"
        />
      </div>
      <Button type="submit">Add Employee</Button>
      &nbsp;&nbsp;&nbsp;
      <Button type="submit" onClick={() => cancelHandler()}>
        Cancel
      </Button>
    </Box>
  );
};

export default StorageEdit;
