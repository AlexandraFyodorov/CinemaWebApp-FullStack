import { Container } from '@mui/system'
import { Button, TextField, Card, CardMedia, CardContent } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios'

function AddMember() {
 const dispatch = useDispatch();
  const navigate = useNavigate();
  const [memberData, setMemberData] = useState({ name: String, email: String, city: String });
  const handleSubmit = async (e) => {
    //Save member in DB 'http://localhost:8000/members'
    const resp = await axios.post('http://localhost:8000/members', memberData)
    let newMember = {
      _id: resp.data,
      name:memberData.name,
      email:memberData.email,
      city:memberData.city
    };
    dispatch({ type: 'ADDMEMBER', payload: newMember });
    navigate('/mainPage/subscriptions/membersData')
  }
  return (
    <Container>
      <Card sx={{ padding: 1, marginTop: 2, background: '#B4C9C7', width: 500 }} elevation={3}>
        <CardMedia height="200"><h2 style={{ fontFamily: 'Comic Sans MS', color: '#4a6baf' }}>Add New Member</h2></CardMedia>
        <CardContent>
          <TextField sx={{ padding: 1, marginTop: 0.5 }} required label="Full Name" id="outlined-fullname" onChange={(e) => setMemberData({ ...memberData, name: e.target.value })} /><br />
          <TextField sx={{ padding: 1, marginTop: 0.5 }} required label=" Email" id="outlined-last-email" onChange={(e) => setMemberData({ ...memberData, email: e.target.value })} /><br />
          <TextField sx={{ padding: 1, marginTop: 0.5 }} required label=" City" id="outlined-last-city" onChange={(e) => setMemberData({ ...memberData, city: e.target.value })} /><br />
          <Button sx={{ padding: 1, marginTop: 2 }} variant="outlined" type='submit' onClick={handleSubmit}>Save</Button>
          <Button sx={{ padding: 1, marginTop: 2, marginLeft: 2 }} variant="outlined" type='submit' onClick={() => navigate('/mainPage/subscriptions/membersData')}>Cancel</Button>
        </CardContent>
      </Card>
    </Container>
  );
}
export default AddMember;
