import { useEffect, useState } from "react";
import Router from "./components/Router/Router";
import { AuthContext } from "./context/AppContext";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { fetchUser } from "./redux/reducers/userSlice";
import requests from "./api/requests";

function App() {

  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null); 

  useEffect( () => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${requests.baseURL}/jwtid`,
      },
      {
        withCredentials: true
      })
        .then((res) => {
          setUserId(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    userId && dispatch(fetchUser(userId));
  }, [userId, dispatch]);

  return (
    <AuthContext.Provider value={userId} >
        <Router />
    </AuthContext.Provider>
  );
}

export default App;
