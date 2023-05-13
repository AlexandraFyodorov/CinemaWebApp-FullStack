import { Container } from '@mui/system'
import { Button, FormControl, InputLabel, Select, OutlinedInput, MenuItem } from '@mui/material';
import { useLocation,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'

function SubscribeToNewMovie() {
  const dispatch = useDispatch();
  const location = useLocation()
  const member = location.state.member;
  const movies = useSelector((state) => state.movies);
  const [movieData, setMovieData] = useState({ memberId: member._id, movies: [] });
  const storedMovies = sessionStorage.getItem('moviesToShow');
  const parsedMovies = JSON.parse(storedMovies);
  const handleSubmit = async () => {
    //Save movie to member subscriptions 'http://localhost:8000/subscriptions'
    const resp = await axios.post('http://localhost:8000/subscriptions', movieData)
    dispatch({ type: 'ADDSUBSCRIPTION', payload: resp.data });
  }
  const handleMovieChange = (e) => {
    setMovieData((prevMovieData) => ({
      ...prevMovieData,
      movies: {
        ...prevMovieData.movies,
        movieId: e.target.value
      }
    }));
  };
  const handleDateChange = (e) => {
    setMovieData((prevMovieData) => ({
      ...prevMovieData,
      movies: {
        ...prevMovieData.movies,
        date: e.target.value
      }
    }));
  };
  return (
    <Container>
      <br />
      <h2 style={{ fontFamily: 'Monospace ', color: '#00bfa5' }}>Add New Movie</h2>
      <FormControl required sx={{ m: 1, width: 300, }}>
        <InputLabel id="demo-simple-select-required-label" >Movies</InputLabel>
        <Select labelId="demo-multiple-movies-label" id="demo-multiple-movies"
          defaultValue='' name='movieId' onChange={handleMovieChange} input={<OutlinedInput label="Movies" />}>
          {
            movies.filter(mov=>!parsedMovies.includes(mov._id)).map(movie => {
              return <MenuItem value={movie._id} key={movie._id}>{movie.name}</MenuItem>
            })
          }
        </Select>
      </FormControl>
      <br />
      <input style={{ padding: 18.5, marginTop: 8, width: 260, borderColor: 'lightgrey ', borderWidth: 1, borderRadius: 5 }}
        defaultValue=' ' type='date' name='date' onChange={handleDateChange} /><br /><br />
      <Button sx={{ padding: 1, marginTop: 2 }} variant="outlined" type='submit' onClick={()=>handleSubmit()}>Subscribe</Button>
    </Container>
  );
}
export default SubscribeToNewMovie;