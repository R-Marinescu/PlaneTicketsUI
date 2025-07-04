import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from './context/UserContext';
import Container from './components/container/Container';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar/Navbar';


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

  return (
    <div className="min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
        <div>
          {isLoggedIn && user && <p className='alert alert-success'>Welcome, {user.email}!</p>}
          <Routes>            
            <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} setToken={setToken} />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;