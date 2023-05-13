import { Container } from '@mui/system'
import { useNavigate, Outlet } from 'react-router-dom';
import { useEffect } from "react";
import {Button } from '@mui/material';

function UsersManagement() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/mainPage/usersManagement/usersData`)
  }, [])
  return (
    <Container>
    <h1 style={{ textAlign: 'center', fontFamily: 'Comic Sans MS', fontSize: '3rem', color: '#4a6baf' }}>Users</h1>
      <Button sx={{ padding: 1, marginTop: 2 }} variant="outlined" size="small" type='submit' color="primary" onClick={() => navigate(`usersData`)}>All Users</Button>
      <Button sx={{ padding: 1, marginTop: 2, marginLeft: 2 }} variant="outlined" size="small" type='submit' color="primary" onClick={() => navigate(`addNewUser`)}>Add User</Button>
      <Outlet />
    </Container>
  );
}
export default UsersManagement;
