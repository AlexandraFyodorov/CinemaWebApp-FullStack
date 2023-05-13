import { Container } from '@mui/system'
import { Button, AppBar, TextField} from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [userLogin, setUserLogin] = useState({ username: String, password: String });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    try{
      const resp = await axios.post('http://localhost:8080/users/signin', userLogin);
      const { accessToken,expiration } = resp.data;
      sessionStorage['username'] = userLogin.username;
      sessionStorage['accessToken'] = accessToken;
      sessionStorage['expiration'] = expiration;
      navigate(`/mainPage/imageComponent`);
    } catch(error){
      setErrorMessage(error.response.data.message);
    }
  }
  return (
    <Container>
      <AppBar position="static" color='default'>
      </AppBar>
      <h3>Log in Page</h3>
      <TextField label="User name" id="outlined-user-name" onChange={(e) => setUserLogin({ ...userLogin, username: e.target.value })} /><br /><br />
      <TextField  label="Password" id="outlined-user-name" onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })} />
      <br />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <Button sx={{ padding: 1, marginTop: 2 }} variant="outlined" size="small" type='submit' color="primary" onClick={handleSubmit}>Login</Button>
      <h3>New User? : {<Link to={`/signUp`} >Create Account</Link>}</h3>
    </Container>
  );
}
export default Login;
