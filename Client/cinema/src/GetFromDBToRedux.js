import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

function GetFromDBToRedux() {
    const moviesURL = 'http://localhost:8000/movies';
    const membersURL = 'http://localhost:8000/members';
    const subscriptionsURL = 'http://localhost:8000/subscriptions';
    const dispatch = useDispatch(); // Save data in store
    useEffect(() => {
        const MoviesData = async () => {
            const { data: movies } = await axios.get(moviesURL);
            dispatch({ type: 'LOADMOVIES', payload: movies });
        }
        MoviesData();
        const SubscriptionsData = async () => {
            const { data: subscriptions } = await axios.get(subscriptionsURL);
            dispatch({ type: 'LOADSUBSCRIPTIONS', payload: subscriptions });
        }
        SubscriptionsData();
        const MembersData = async () => {
            const { data: members } = await axios.get(membersURL);
            dispatch({ type: 'LOADMEMBERS', payload: members });
        }
        MembersData();
        const UsersData = async () => {
            const { data: users } = await axios.get('http://localhost:8080/users');
            dispatch({ type: "LOADUSERS", payload: users });
        }
          UsersData();
    }, [])
}
export default GetFromDBToRedux;