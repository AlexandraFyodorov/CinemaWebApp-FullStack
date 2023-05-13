import { Container } from "@mui/system";
import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {AppBar,Button,IconButton,Toolbar,Typography,Avatar,Stack,} from "@mui/material";
import axios from "axios";
function MainPage() {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username"); 
  const expiration = sessionStorage.getItem("expiration");
  const timeRemaining = expiration - Math.floor(Date.now() / 1000);
  const [user, setUser] = useState({});
  const [usersManagementVisible, setUsersManagementVisible] = useState(false);
  const [subscriptionsVisible, setSubscriptionsVisible] = useState(false);
  const [moviesVisible, setMoviesVisible] = useState(false);
  const [time, setTime] = useState(timeRemaining);
  useEffect(() => {
    const UsersData = async () => {
      try {
        const resp = await axios.get(`http://localhost:8080/users/${username}`);
        setUser(resp.data);
        const userStr = JSON.stringify(resp.data);
        sessionStorage.setItem('userOnline', userStr);
        if (resp.data.role === "admin") {
          setUsersManagementVisible(true);
          setSubscriptionsVisible(true);
          setMoviesVisible(true);
        }
        else{
        if(resp.data.permissions.includes("View Subscriptions"))
        {
          setSubscriptionsVisible(true);
        }
        if(resp.data.permissions.includes("View Movies"))
        {
          setMoviesVisible(true);
        }
      }
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    UsersData();
    const timeoutId = setTimeout(() => {
      navigate("/");
    }, timeRemaining * 1000);
    
    return () => {
      clearTimeout(timeoutId)
    };
  }, []);
  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the time remaining
      const timeRemaining = expiration - Math.floor(Date.now() / 1000);
      // Update the state
      setTime(timeRemaining);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const logOutSubmit = async (e) => {
    navigate(`/`);
  };
  return (
    <Container>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton size="small" edge="start" color="inherit" aria-label="menu" sx={{ mr: 70 }} disabled >
            <h5>Movies-Subscriptions Web Site</h5>
          </IconButton>
          <Stack direction="row" spacing={2}>
            <Avatar src="/broken-image.jpg" />
            <h3>{user.firstName + " " + user.lastName}</h3>
            <Button sx={{ padding: 1, marginTop: 1 }} variant="outlined" size="small" type="submit" color="primary" onClick={logOutSubmit} >Log Out</Button>
          </Stack>
        </Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0.1, borderColor: "divider" }} >
          {moviesVisible && <Button onClick={() => navigate(`/mainPage/movies2/moviesData2`)}>Movies</Button>}
          {subscriptionsVisible && <Button onClick={() => navigate(`/mainPage/subscriptions/membersData`)}>Subscriptions</Button>}
          {usersManagementVisible && <Button onClick={() => navigate(`/mainPage/usersManagement/usersData`)}>Users Management</Button>}
          <Button sx={{ paddingLeft:"430px"}} disabled onClick={() => navigate(`/mainPage/usersManagement/usersData`)}>Expiration time:{time} seconds</Button>
        </Typography>
      </AppBar>
      <Outlet />
    </Container>
  );
}
export default MainPage;
