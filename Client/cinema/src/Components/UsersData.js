import { Container } from '@mui/system'
import { Grid, Button, Typography, Card, CardMedia, CardContent, } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
function UsersData() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();
  const DeleteUser = async (personID) => {
    dispatch({ type: 'DELETEUSER', payload: personID });
    //delete in DB 'http://localhost:8080/users'
    await axios.delete(`${'http://localhost:8080/users'}/${personID}`);
  }
  return (
    <Container sx={{ marginTop: 5 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {
          users.map((person) => {
            return <div key={person.id}>
              <Container sx={{ marginTop: 2, color: 'default' }}>
                <Card sx={{ padding: 1, marginLeft: 2, background: '#B4C9C7', width: 500 }} elevation={3}>
                  <CardMedia height="200"><h2>{person.firstName + ' ' + person.lastName}</h2></CardMedia>
                  <CardContent>
                    <Typography>Full Name:  {person.firstName + ' ' + person.lastName}</Typography>
                    <Typography mt={2}>User Name:  {person.username}</Typography>
                    <Typography mt={2}>Session time out:  {person.sessionTimeOut} minutes</Typography>
                    <Typography mt={2}>Created data:  {person.createdData}</Typography>
                    <Typography mt={2}>Permissions:</Typography>
                    <Typography mt={2}>- {person.permissions.join(' - ')}</Typography>
                    <Button sx={{ padding: 1, marginTop: 2 }} variant="outlined" type='submit' onClick={() => navigate('/mainPage/usersManagement/editUser', { state: { person } })}>Edit</Button>
                    <Button sx={{ padding: 1, marginTop: 2, marginLeft: 2 }} variant="outlined" type='submit' onClick={() => DeleteUser(person.id)}>Delete</Button>
                  </CardContent>
                </Card>
              </Container>
            </div>
          })
        }
      </Grid>
    </Container>
  );
}
export default UsersData;
