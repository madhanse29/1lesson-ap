import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory} from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';

export function AddUsers() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [job, setJob] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const history=useHistory();
  const formValidationSchema = Yup.object({
    name: Yup.string().required("why not give name "),
    avatar: Yup.string().required("why not give avatar url 😊 ").min(4, "need url"),
    job: Yup.string().required("why not give job ⭐ ").min(0).max(10),
    zipcode: Yup.number().required("why not give zipcode 🔢 ").min(0).max(6),
    country: Yup.string().required("why not give country © ").min(3).max(15),
  });

  const { handleSubmit, handleBlur, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      name: "",
      avatar: "",
      job: "",
      zipcode: "",
      country: ""
    },
    // validate : validateform,
    validationSchema: formValidationSchema,

    onSubmit: (newUser) => {
      console.log("on", newUser);
      addUser(newUser);
    }
  });

 
 
 
  const addUser = () => {
    console.log("adiing", name, avatar, job, zipcode, country);
    const newUser = { name, avatar, job, zipcode, country };
    console.log(newUser);
    fetch("https://61921f11aeab5c0017105d60.mockapi.io/users",{
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {'Content-Type': 'application/json'},
    })
    .then(()=>history.push("/users/"));

  };

  return (
  
    <form onSubmit={handleSubmit} className="addusers">
    <TextField id="name"
    name="name"
    value={values.name}
    onChange={handleChange}
    onBlur={handleBlur}
    label="enter user name"
    error={errors.name && touched.name}
    helperText={errors.name && touched.name && errors.name}
    variant="standard" />

  <TextField id="avatar"
    name="avatar"
    value={values.avatar}
    onChange={handleChange}
    onBlur={handleBlur}
    label="enter user avatar"
    error={errors.avatar && touched.avatar}
    helperText={errors.avatar && touched.avatar && errors.avatar}
    variant="standard" />

  <TextField id="job"
    name="job"
    value={values.job}
    onChange={handleChange}
    onBlur={handleBlur}
    label="enter user job"
    error={errors.job && touched.job}
    helperText={errors.job && touched.job && errors.job}
    variant="standard" />


  <TextField id="zipcode"
    name="zipcode"
    value={values.zipcode}
    onChange={handleChange}
    onBlur={handleBlur}
    label="enter user zipcode"
    error={errors.zipcode && touched.zipcode}
    helperText={errors.zipcode && touched.zipcode && errors.zipcode}
    variant="standard" />

  <TextField id="country"
    name="country"
    value={values.country}
    onChange={handleChange}
    onBlur={handleBlur}
    label="enter user country "
    error={errors.country && touched.country}
    helperText={errors.country && touched.country && errors.country}
    variant="standard" />

  <Button type="submit" variant="outlined">add user</Button>

</form>
  
  );
}
