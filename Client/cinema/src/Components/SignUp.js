import { Container } from '@mui/system'
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [userLogin, setUserLogin] = useState({ username: String, password: String });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = { username: userLogin.username, password: userLogin.password }
    try {
      const { data: accessToken } = await axios.post('http://localhost:8080/users/signup', obj);
      sessionStorage['accessToken'] = accessToken;
      navigate(`/`);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  }
  return (
    <Container>
      <h3>Create an Account</h3>
      <TextField label="User name" id="outlined-user-name" onChange={(e) => setUserLogin({ ...userLogin, username: e.target.value })} /><br /><br />
      <TextField label="Password" id="outlined-user-name" onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })} />
      <br />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <Button sx={{ padding: 1, marginTop: 2 }} variant="outlined" size="small" type='submit' color="primary" onClick={handleSubmit}>Create</Button>
    </Container>
  );
}
export default SignUp;
