import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container } from 'react-bootstrap';



const Callback = ({user}) => {
  const[users, setUsers] = useState([])
  const navigate = useNavigate()
  const getUsers = async() => {
    const response = await axios.get("http://localhost:5000/api/users");
    setUsers(response.data);
  };
  getUsers();
  // useEffect(() => {
  //   const code = new URLSearchParams(window.location.search).get("code");
  //   axios
  //     .post("http://localhost:5000/auth/microsoft/callback", { code })
  //     .then((res) => {
  //       localStorage.setItem("user", JSON.stringify(res.data));
  //       console.log(JSON.parse(localStorage.getItem("user")));
  //     });
  // }, []);

  const _handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/')
  }


  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Button onClick={_handleLogout}>
        Logout
      </Button>
      <h1>Hello, {user.displayName}</h1>
      <div className='row ps-4 col-md-12 justify-content-center'>

{
    // A map function to return the cards
    users.map((item, key) => (
        <Card className="col-sm-4 border-0 my-2">
            <Card.Body className="shadow rounded-2 border border-1">
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                    {item.desc}
                </Card.Text>
                <Card.Text>
                    <span className='fw-bold'>Duration</span><br /> 
                </Card.Text>
                <Card.Text>
                    <span className='fw-bold'>Activity Type</span><br />
                </Card.Text>            
            </Card.Body>
        </Card>
    ))
}

</div>
      
      <p>Hello, {user.displayName}</p>
    </div>
  );
};

export default Callback;