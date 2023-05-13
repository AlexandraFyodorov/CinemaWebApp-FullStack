const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');
const membersDal = require('./DAL/membersWS');
const moviesDal = require('./DAL/moviesWS')

const moviesRouter = require('./routers/moviesRouter');
const membersRouter = require('./routers/membersRouter');
const subscriptionsRouter = require('./routers/subscriptionsRouter');


const app = express();
const port = 8000;

connectDB();
membersDal();
moviesDal();

app.use(cors());
app.use(express.json());
//Routers
app.use('/movies', moviesRouter);//http://localhost:8000/movies
app.use('/members', membersRouter);//http://localhost:8000/members
app.use('/subscriptions', subscriptionsRouter);//http://localhost:8000/subscriptions

app.listen(port, ()=>{
    console.log(`app is listening at http://localhost:${port}`);
})