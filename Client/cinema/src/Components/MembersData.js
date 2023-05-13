import { Container } from '@mui/system'
import { useSelector,useDispatch } from 'react-redux';
import { Button, Card, Grid, Typography, ListItem, List, CardMedia, CardContent } from '@mui/material';
import { useNavigate, Outlet, useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'

function MembersData() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members);
  const subscriptions = useSelector((state) => state.subscriptions);
  const movies = useSelector((state) => state.movies);
  const location = useLocation();
  const [selectedMember, setSelectedMember] = useState(null);
  const userOnline = sessionStorage.getItem('userOnline');
  const user = JSON.parse(userOnline);
  const handleSubscribe = (member) => {
    setSelectedMember(member);
    const subscriptionsUser = subscriptions.filter(subscription=> subscription.memberId===member._id);
    if(subscriptionsUser.length!==0){
      const subMovies = subscriptionsUser[0];
      const movIDs = subMovies.movies.map(x=>x.movieId);
      const moviesToShow = JSON.stringify(movIDs);
      sessionStorage.setItem('moviesToShow', moviesToShow);
    }
    else{
      const moviesToShow = JSON.stringify('0');
      sessionStorage.setItem('moviesToShow', moviesToShow);
    }
    const isSubscribeToNewMovie = location.pathname === "/mainPage/subscriptions/membersData/subscribeToNewMovie";
    if (isSubscribeToNewMovie) {
      navigate("/mainPage/subscriptions/membersData");
    } else {
      navigate('subscribeToNewMovie', { state: { member } });
    }
  };
  const DeleteUser = async (memberID) => {
    dispatch({ type: 'DELETEMEMBER', payload: memberID });
    //delete in DB 'http://localhost:8000/members'  and   'http://localhost:8000/subscriptions'
    await axios.delete(`${'http://localhost:8000/members'}/${memberID}`);
    const subscriptionsUser = subscriptions.filter(subscription=> subscription.memberId===memberID);
    if(subscriptionsUser.length!==0)
    {
      dispatch({ type: 'DELETESUBSCRIPTION', payload: memberID });
      await axios.delete(`${'http://localhost:8000/subscriptions'}/${memberID}`);
    }
  }
  return (
    <Container sx={{ marginTop: 5 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {
          members.map((member) => {
            return (
              <Card key={member._id} sx={{ width: 600, padding: 1, margin: 2, background: '#B4C9C7'}} elevation={3}>
                <CardMedia height="200" ><h2>{member.name}</h2></CardMedia>
                <CardContent>
                    <Typography mt={2}>Email:  {member.email}</Typography>
                    <Typography mt={2}>City:  {member.city}</Typography>
                </CardContent>
                {user.permissions.includes('Update Subscriptions') &&<Button sx={{ padding: 1, marginTop: 2 }} variant="outlined" type='submit' onClick={() => navigate('/mainPage/subscriptions/editMember', { state: { member } })}>Edit</Button>}
                {user.permissions.includes('Delete Subscriptions') &&<Button sx={{ padding: 1, marginTop: 2, marginLeft: 2 }} variant="outlined" type='submit' onClick={(e) => DeleteUser(member._id)}>Delete</Button>}
                <Card sx={{ width: 450, padding: 1, margin: 2, background: '#eeeefff' }} elevation={3}>
                <CardMedia><h3 style={{ fontFamily: 'Comic Sans MS', color: '#4a6baf' }}>Movies watched</h3></CardMedia>
                  <Button sx={{ padding: 1 }} size='small' variant="outlined" type='submit' onClick={() => handleSubscribe(member)}>Subscribe to new movie</Button>
                  <br /><br />
                  {selectedMember && selectedMember._id === member._id && <Outlet />}
                  <ul>
                    {
                      subscriptions.filter(x => x.memberId === member._id).map(item => {
                        return <div key={item._id}>
                          {
                            <List sx={{ width: '100%', overflow: 'auto', height: 150 }} >
                              {
                                item.movies.map(mov => {
                                  return <div key={mov._id}>
                                    {
                                      movies.filter(x => x._id === mov.movieId).map(show => {
                                        return <div key={show._id}>
                                          <ListItem key={`item-${show._id}-${show}`}>
                                            <Grid item xs>
                                              <Typography gutterBottom variant="h6" component="div">
                                                <Link to={'/mainPage/movies2'} state={show.name} ><h5 >{show.name}</h5></Link>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs>
                                              <Typography gutterBottom variant="h6" component="div">
                                                <h5 style={{ fontFamily: 'Comic Sans MS', color: '#4a6baf' }}>{new Date(mov.date).toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", })}</h5>
                                              </Typography>
                                            </Grid>
                                          </ListItem>
                                        </div>
                                      })
                                    }
                                  </div>
                                })}
                            </List>
                          }
                        </div>
                      })
                    }
                  </ul>
                </Card>
              </Card>
            );
          })
        }
      </Grid>
    </Container>
  );
}
export default MembersData;
