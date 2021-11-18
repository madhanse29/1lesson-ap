import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export function AddUsers({ users, setUsers }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [job, setJob] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");

  const addUser = () => {
    console.log("adiing", name, avatar, job, zipcode, country);
    const newUser = { name, avatar, job, zipcode, country };
    console.log(newUser);

    setUsers([...users, newUser]);

  };

  return (
    <div className="addusers">
      <TextField value={name}
        onChange={(event) => setName(event.target.value)} label="name" variant="standard" />
      <TextField value={avatar}
        onChange={(event) => setAvatar(event.target.value)} label="avatar" variant="standard" />
      <TextField value={job}
        onChange={(event) => setJob(event.target.value)} label="job" variant="standard" />
      <TextField
        value={zipcode}
        onChange={(event) => setZipcode(event.target.value)} label="zipcode" variant="standard" />
      <TextField
        value={country}
        onChange={(event) => setCountry(event.target.value)} label="country" variant="standard" />
      <Button onClick={addUser} variant="outlined">AddUser</Button>

    </div>
  );
}
