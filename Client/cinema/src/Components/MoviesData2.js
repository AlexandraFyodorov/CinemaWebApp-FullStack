import { Container } from '@mui/system'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Grid, Typography, ListItem, List, CardMedia, CardContent } from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import axios from 'axios'

function MoviesData2() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members);
  const subscriptions = useSelector((state) => state.subscriptions);
  let movies = useSelector((state) => state.movies);
  const userOnline = sessionStorage.getItem('userOnline');
  const user = JSON.parse(userOnline);
  let showName = location.state;
  const DeleteMovie = async (movID) => {
    dispatch({ type: 'DELETEMOVIE', payload: movID });
    //delete in DB 'http://localhost:8000/members'  and   'http://localhost:8000/subscriptions'
    await axios.delete(`${'http://localhost:8000/movies'}/${movID}`);
    await axios.put(`${'http://localhost:8000/subscriptions'}/${movID}`, movID)
  }
  return (
    <Container sx={{ marginTop: 5 }}>
      <ul>
        {showName && showName.findMovie && typeof showName.findMovie === 'string'
          ? movies.filter(movie => {
            if (showName.findMovie) {
              return movie.name.toLowerCase().includes(showName.findMovie.toLowerCase());
            } else {
              return true; // Include all movies when showName.findMovie is null or undefined
            }
          }).map((movie) => {
            return <div key={movie._id}>
              <Card sx={{ padding: 1, marginLeft: 2, background: '#eeeeee' }} elevation={3}>
                <CardMedia sx={{ color: "#004d40" }}><h2>{movie.name} , {new Date(movie.premiered).getFullYear()}</h2></CardMedia>
                <CardContent>
                  <Typography mt={2}> Genres:  {movie.genres.join(", ")}</Typography>
                </CardContent>
                <Container style={{ display: "flex" }}>
                  {<img src={movie.image} alt="pic" />}
                  <Card sx={{ padding: 1, marginLeft: 2, background: '#eeeeee', width: 500 }} elevation={3}>
                    <CardMedia height="200"><h3 style={{ textAlign: 'center', fontFamily: 'Comic Sans MS', color: '#4a6baf' }}>Subscriptions watched</h3></CardMedia>
                    <CardContent>
                      <List sx={{ width: '100%', overflow: 'auto', height: 150 }} subheader={<li />}>
                        {subscriptions.map(sub => {
                          return <div key={sub._id}>
                            {

                              sub.movies.filter(mov => mov.movieId === movie._id).map(item => {
                                return <div key={movie._id}>
                                  {
                                    members.filter(member => member._id === sub.memberId).map(member => {
                                      return <div key={member._id}>
                                        {
                                          <ListItem key={`item-${movie._id}-${member._id}`}>
                                            <Grid item xs>
                                              <Typography gutterBottom variant="h6" component="div">
                                                <Link to={"/mainPage/subscriptions/membersData"} state={member.name} >{member.name}</Link>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs>
                                              <Typography gutterBottom variant="h6" component="div">
                                                {console.log('showName map')}
                                                <h5>{new Date(item.date).toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", })}</h5>
                                              </Typography>
                                            </Grid>
                                          </ListItem>
                                        }
                                      </div>
                                    })
                                  }
                                </div>
                              })
                            }
                          </div>
                        })
                        }
                      </List>
                    </CardContent>
                  </Card>
                </Container>
                {user.permissions.includes('Update Movies') && <Button sx={{ padding: 1, marginTop: 2, marginLeft: 3 }} variant="outlined" type='submit' onClick={() => navigate('/mainPage/movies2/editMovie', { state: { movie } })}>Edit</Button>}
                {user.permissions.includes('Delete Movies') && <Button sx={{ padding: 1, marginTop: 2, marginLeft: 2 }} variant="outlined" type='submit' onClick={() => DeleteMovie(movie._id)}>Delete</Button>}
              </Card><br />
            </div>
          })
          : movies.map((movie) => {
            return <div key={movie._id}>
              <Card sx={{ padding: 1, marginLeft: 2, background: '#eeeeee' }} elevation={3}>
                <CardMedia sx={{ color: "#004d40" }}><h2>{movie.name} , {new Date(movie.premiered).getFullYear()}</h2></CardMedia>
                <CardContent>
                  <Typography mt={2}> Genres:  {movie.genres.join(", ")}</Typography>
                </CardContent>
                <Container style={{ display: "flex" }}>
                  {<img src={movie.image} alt="pic" />}
                  <Card sx={{ padding: 1, marginLeft: 2, background: '#eeeeee', width: 500 }} elevation={3}>
                    <CardMedia height="200"><h3 style={{ textAlign: 'center', fontFamily: 'Comic Sans MS', color: '#4a6baf' }}>Subscriptions watched</h3></CardMedia>
                    <CardContent>
                      <List sx={{ width: '100%', overflow: 'auto', height: 150 }} subheader={<li />}>
                        {subscriptions.map(sub => {
                          return <div key={sub._id}>
                            {
                              sub.movies.filter(mov => mov.movieId === movie._id).map(item => {
                                return <div key={movie._id}>
                                  {
                                    members.filter(member => member._id === sub.memberId).map(member => {
                                      return <div key={member._id}>
                                        {
                                          <ListItem key={`item-${movie._id}-${member._id}`}>
                                            <Grid item xs>
                                              <Typography gutterBottom variant="h6" component="div">
                                                <Link to={"/mainPage/subscriptions/membersData"} state={member.name} >{member.name}</Link>
                                              </Typography>
                                            </Grid>
                                            <Grid item xs>
                                              <Typography gutterBottom variant="h6" component="div">
                                                <h5>{new Date(item.date).toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", })}</h5>
                                              </Typography>
                                            </Grid>
                                          </ListItem>
                                        }
                                      </div>
                                    })
                                  }
                                </div>
                              })
                            }
                          </div>
                        })
                        }
                      </List>
                    </CardContent>
                  </Card>
                </Container>
                {user.permissions.includes('Update Movies') && <Button sx={{ padding: 1, marginTop: 2, marginLeft: 3 }} variant="outlined" type='submit' onClick={() => navigate('/mainPage/movies2/editMovie', { state: { movie } })}>Edit</Button>}
                {user.permissions.includes('Delete Movies') && <Button sx={{ padding: 1, marginTop: 2, marginLeft: 2 }} variant="outlined" type='submit' onClick={() => DeleteMovie(movie._id)}>Delete</Button>}
              </Card><br />
            </div>
          })
        }
      </ul>
    </Container>
  );
}

export default MoviesData2;
