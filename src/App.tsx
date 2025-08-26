import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from './context/UserContext';
import Home from './components/Home';
import LoginForm from './components/User/LoginForm';
import RegisterForm from './components/User/RegisterForm';
import Navbar from './components/Navbar/Navbar';
import UserDetails from './components/UserDetails';
import AdminPanel from './components/Admin/AdminPanel';


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
          {isLoggedIn && user && <p className='text-green-700 px-4 py-3 rounded mb-4'>
            Welcome, {user.email}!
          </p>}
          <Routes>    
            <Route path="/" element={<Home/>}/>        
            <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} setToken={setToken} />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/user-details" element={<UserDetails />} />
            {user?.role === 'admin' && <Route path="/admin" element={<AdminPanel />} />}
          </Routes>
        </div>
    </div>
  );
}

export default App;