import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.sub) {
          setUsername(decodedToken.sub);
          localStorage.setItem('username', decodedToken.sub);
          setIsLoggedIn(true);
        } else {
          console.error("No username in token:", decodedToken);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        handleLogout();
      }
    }
  }, [token]);
  
  const handleLogout = () => {
    setToken(null);
    setIsLoggedIn(false);
    setUsername(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
  };

  return (
    <UserProvider>
          <Container className="mb-4">
              <div>
                {isLoggedIn && <p className='alert alert-success'>Welcome, {username || localStorage.getItem('username')}!</p>}
                <Navbar isLoggedIn={isLoggedIn} username={username} handleLogout={handleLogout} />
                <Routes>
                  <Route path="/" element={<Home setCategory={setCategory}/>} />
                  <Route path="/About" element={<About />} />
                  <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} setToken={setToken} />} />
                  <Route path="/register" element={<RegisterForm />} />
                  <Route path="/user-details" element={<UserDetails/>} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/payment-confirmation" element={<PaymentConfirmation/>} />
                </Routes>
              </div>
          </Container>
    </UserProvider>
    
  );
}

const ProductDetailsWrapper = () => {
  const { productId } = useParams<{ productId: string }>();

  return <ProductDetails productId={Number(productId)} />;
};


export default App;
