import React, { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';

interface LoginData {
    email: string;
    password: string;
}

interface LoginFormProps {
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
    setToken: Dispatch<SetStateAction<string | null>>;
}

function LoginForm({ setIsLoggedIn, setToken }: LoginFormProps) {
    const { fetchUserDetails } = useUserContext();

    const[formEmail, setFormEmail] = useState<string>('');
    const[password, setPassword] = useState<string>('');

    const login = async (loginData: LoginData) => {
        try {
            const response = await axios.post('http://localhost:8000/api/login', loginData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const loginResponse = response.data;

            if(response.status === 200) {
                if(loginResponse.token) {
                    setIsLoggedIn(true);
                    localStorage.setItem('authToken', loginResponse.token);
                    setToken(loginResponse.token);
                    fetchUserDetails();
                    alert("Login successful!");
                } else {
                    console.error("Login response missing token", loginResponse);
                }
            } else {
                console.error("Login failed:", loginResponse.message);
            }
        }catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="container">
      <h2 className="my-4">Login</h2>
      <form onSubmit={(e) => { e.preventDefault(); login({ email: formEmail, password }); }}>
        <div className="mb-3 row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-3 row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </div>
        </div>
      </form>
    </div>
    );
}

export default LoginForm;