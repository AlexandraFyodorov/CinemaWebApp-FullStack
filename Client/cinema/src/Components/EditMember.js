import { Container } from '@mui/system'
import { Button, TextField, Card, CardMedia, CardContent } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios'
function EditMember() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  const member = location.state.member;
  const [memberData, setMemberData] = useState({ name: String(member.name), email: String(member.email), city: String(member.city) });
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Save member in DB 'http://localhost:8000/members'
    await axios.put(`${'http://localhost:8000/members'}/${member._id}`,memberData)
    let newMember = {
      _id: member._id,
      name:memberData.name,
      email:memberData.email,
      city:memberData.city
    };
    dispatch({ type: 'UPDATEMEMBER', payload: newMember });
    navigate("/mainPage/subscriptions/membersData");
  }
  return (
    <Container>
      <br />
      <Card sx={{ padding: 1, marginTop: 2, background: '#B4C9C7', width: 500 }} elevation={3}>
        <CardMedia height="200"><h3 style={{ fontFamily: 'Comic Sans MS', color: '#4a6baf' }}>Edit Member : {member.name}</h3></CardMedia>
        <CardContent>
      <TextField sx={{ padding: 1, marginTop: 2 }} required label="Name" id="outlined-name" defaultValue={member.name} onChange={(e) => setMemberData({ ...memberData, name: e.target.value })} /><br />
      <TextField sx={{ padding: 1, marginTop: 2 }} required label=" Email" id="outlined-email" defaultValue={member.email} onChange={(e) => setMemberData({ ...memberData, email: e.target.value })} /><br />
      <TextField sx={{ padding: 1, marginTop: 2 }} required label=" City" id="outlined-city" defaultValue={member.city} onChange={(e) => setMemberData({ ...memberData, city: e.target.value })} /><br />

      <Button sx={{ padding: 1, marginTop: 2 }} variant="outlined" type='submit' onClick={handleSubmit}>Update</Button>
      <Button sx={{ padding: 1, marginTop: 2, marginLeft: 2 }} variant="outlined" type='submit' onClick={() => navigate('/mainPage/subscriptions/membersData')}>Cancel</Button>
      </CardContent>
      </Card>
    </Container>
  );
}
export default EditMember;
