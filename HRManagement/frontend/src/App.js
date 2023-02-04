import React, { useState } from "react";
import Login from "./pages/Login";
import Callback from "./pages/Callback"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  
  return (
    <Router>
    <Routes>
      <Route exact path='/' element={<Login user={user} setUser={setUser}/>}></Route>
      <Route exact path='/dashboard' element={<Callback user={user}/> }></Route>
    </Routes>
  </Router>
  );
}

export default App;
