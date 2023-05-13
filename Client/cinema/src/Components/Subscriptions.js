import { Container } from '@mui/system'
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
function Subscriptions() {
  const navigate = useNavigate();
  const userOnline = sessionStorage.getItem('userOnline');
  const user = JSON.parse(userOnline);
  useEffect(() => {  
    navigate('membersData')
  }, [])
  return (
    <Container>
       <h3 style={{ textAlign: 'center', fontFamily: 'Comic Sans MS', fontSize: '3rem', color: '#4a6baf' }}>Subscriptions</h3>
      <Button sx={{ padding: 1, marginTop: 2 }} variant="outlined" size="small" type='submit' color="primary" onClick={() => navigate(`membersData`)}>All Members</Button>
      {user.permissions.includes('Create Subscriptions') && <Button sx={{ padding: 1, marginTop: 2, marginLeft: 2 }} variant="outlined" size="small" type='submit' color="primary" onClick={() => navigate(`addNewMember`)}>Add Member</Button>}
      <Outlet />
    </Container>
  );
}
export default Subscriptions;