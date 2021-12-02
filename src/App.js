
import './App.css';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useState ,useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Switch, Route,useHistory,useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { AddUsers } from './AddUsers';
import TextField from '@mui/material/TextField';

function App() {

  const [mode,SetMode] = useState("dark")
  const history=useHistory();


 const theme = createTheme({
  palette: {
    mode: mode
  },
});
 
  useEffect(()=>{
    fetch("https://61921f11aeab5c0017105d60.mockapi.io/users")
    .then((data)=>data.json())
    .then ((usr)=> setUsers(usr))
  },[])
  const[users,setUsers]=useState([])
  return (
    <ThemeProvider theme ={theme}>
      <Paper elevation={4} style 
   = {{minHeight:"100vh"}}>
    <div className="App">
       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Button onClick={()=>{
          history.push("/users")}} variant="text" color="inherit">USERS</Button>
        <Button onClick={()=>{
          history.push("/addusers")}} variant="text" color="inherit">ADDUSERS</Button>
          <Button style={{marginLeft : "auto "}}
           onClick={()=> SetMode(mode === "light" ? "dark" : "light")}variant="text" color="inherit">
            {mode === "light" ? "dark" : "light"} MODE</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Switch>
<Route exact path="/users">
<Userslist /> </Route>   
  <Route path="/addusers">
  <AddUsers />
  </Route>
  <Route path="/users/edit/:id">
   <EditUsers users={users} setUsers={setUsers} />
</Route>
 <Route path="/">Click users</Route>
 <Route path="**">Not found 404</Route>
  </Switch>
  
    </div>
    </Paper>
    </ThemeProvider>
  );
}
export default App;



function Msg({name,avatar,zipcode,job,country,id,deleteButton}) {
  // const name ="mad"
  const history=useHistory();
  return(
    <Card sx={{ minWidth: 275 }}>
    <CardContent>
    <div className="users" > 
      <img className="profpic" src={avatar} alt={name}/>
     <div className="specs">
      <h3 className="head">{name}</h3>
      <p>Job : {job}</p>
      <p>Zipcode : {zipcode}</p>
      <p>Country : {country}</p>
      </div>   </div>
      </CardContent>
      <CardActions>
     {deleteButton}
      </CardActions>
    </Card>
  )
  
}
function Userslist(){
const getUsers = () =>{
  fetch("https://61921f11aeab5c0017105d60.mockapi.io/users")
  .then((data)=>data.json())
  .then ((usr)=> setUsers(usr))
}

  useEffect(getUsers,[])
  const[users,setUsers]=useState([])
 const deleteUser = (id)=>{
  fetch(`https://61921f11aeab5c0017105d60.mockapi.io/users/${id}`
          ,{method:"DELETE"})
          .then(()=>getUsers());
 }
  return (
  <div className="userslist">
      {users.map(({name,avatar,zipcode,country,job,id})=>(<Msg 
      name={name} avatar={avatar}
      zipcode={zipcode} country={country}
       job={job} id={id} key={id}
deleteButton ={<IconButton
      onClick={()=>deleteUser(id)} aria-label="delete"  color="error">
        <DeleteIcon />
      </IconButton>} />
      ))}
  </div>
)
}
function EditUsers(){
  const{id} = useParams();
  const[user,setUsers] = useState(null);
  useEffect(()=>{
    fetch(`https://61921f11aeab5c0017105d60.mockapi.io/users/${id}`,
    {method:"GET"})
    .then((data)=>data.json())
    .then ((us)=> setUsers(us))
  },[])
  return user ? <UpdateUser user={user}/> : "";
}
function UpdateUser({user}){

 
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [job, setJob] = useState(user.job);
  const [zipcode, setZipcode] = useState(user.zipcode);
  const [country, setCountry] = useState(user.country);
  const history=useHistory();
  const editUser=()=>{
    
      const updateUser = {
      name, avatar, job, zipcode, country };

fetch(`https://61921f11aeab5c0017105d60.mockapi.io/users/${user.id}`,{
  method: "PUT",
  body: JSON.stringify(updateUser),
  headers: {'Content-Type': 'application/json'},
}).then(()=>history.push("/users/"));
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
      <Button onClick={editUser} variant="outlined">SaveUser</Button>

    </div>
  )
}