import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import LoginForm from './components/LoginForm';
import { useUserContext } from './context/UserContext';

function App() {
  const { user } = useUserContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);
  
  const handleLogout = () => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('email');
  };
//console.log("User context:", user);
  return (
    <Container className="mb-4">
        <div>
          
          {isLoggedIn && user && <p className='alert alert-success'>Welcome, {user.email}!</p>}
          <Routes>            
            <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} setToken={setToken} />} />
          </Routes>
        </div>
    </Container>
  );
}

export default App;
