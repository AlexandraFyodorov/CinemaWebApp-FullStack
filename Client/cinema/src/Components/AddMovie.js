import { Container } from '@mui/system'
import { Button, TextField, Card, CardMedia, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import axios from 'axios'
function AddMovie() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [movieData, setMovieData] = useState({ name: String, genres: String, imageUrl: String, premiered: String });
  const SaveMovieSubmit = async () => {
    //Save movie in DB and 'http://localhost:8000/movies'
    const resp = await axios.post('http://localhost:8000/movies',movieData)
     const obj = {
      _id: resp.data,
      name: movieData.name,
      genres: [movieData.genres],
      imageUrl: movieData.imageUrl,
      premiered: movieData.premiered
    };
    dispatch({ type: 'ADDMOVIE', payload: obj });
    navigate(`/mainPage/movies2/moviesData2`)
  }
  return (
    <Container>
      <br />
      <Card sx={{ padding: 1, marginTop: 2, background: '#B4C9C7', width: 500 }} elevation={3}>
        <CardMedia height="200"><h2 style={{ fontFamily: 'Comic Sans MS', color: '#4a6baf' }}>ADD Movie</h2></CardMedia>
        <CardContent>
      <TextField sx={{ padding: 1, marginTop: 2, width: 300 }} required label=" Movie Name" id="outlined-movie-name" onChange={(e) => setMovieData({ ...movieData, name: e.target.value })} /><br />
      <TextField sx={{ padding: 1, marginTop: 2, width: 300 }} required label=" Genres" id="outlined-genres" onChange={(e) => setMovieData({ ...movieData, genres: e.target.value })} /><br />
      <TextField sx={{ padding: 1, marginTop: 2, width: 300 }} required label=" Image URL" id="outlined-image-url" onChange={(e) => setMovieData({ ...movieData, imageUrl: e.target.value })} /><br />
      <input style={{ padding: 18.5, marginTop: 8, width: 260, borderColor: 'lightgrey ', borderWidth: 1, borderRadius: 5 }} type='date' name='date' onChange={(e) => setMovieData({ ...movieData, premiered: e.target.value })} /><br />
      <Button sx={{ padding: 1, marginTop: 2 }} variant="outlined" type='submit' onClick={()=>SaveMovieSubmit()}>Save</Button>
      <Button sx={{ padding: 1, marginTop: 2, marginLeft: 2 }} variant="outlined" type='submit' onClick={() => navigate(`/mainPage/movies2/moviesData2`)}>Cancel</Button>
      </CardContent>
      </Card>
    </Container>
  );
}
export default AddMovie;

