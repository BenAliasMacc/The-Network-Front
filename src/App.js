import { useEffect, useState } from "react";
import Router from "./components/Router/Router";
import { AuthContext } from "./context/AppContext";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { fetchUser } from "./redux/reducers/userSlice";

function App() {

  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);  

  useEffect( () => {
    const getToken = async () => {
      try {
        const res = await axios.get('/jwtid', {
          withCredentials: true
        });        
        setUserId(res.data);   
        dispatch(fetchUser(res.data))
      } catch (error) {
        console.log(error);
      }
    }    
    getToken();
  }, [dispatch]);

  return (
    <AuthContext.Provider value={userId} >
        <Router />
    </AuthContext.Provider>
  );
}

export default App;
