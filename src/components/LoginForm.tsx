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
    const { setUser } = useUserContext();
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
            console.log("Login response:", loginResponse.user);

            if(response.status === 200) {
                if(loginResponse.token) {
                  const expiresAt = loginResponse.expires_at;
                  
                    setIsLoggedIn(true);
                    localStorage.setItem('authToken', loginResponse.token);
                    localStorage.setItem('tokenExpiresAt', expiresAt);
                    setToken(loginResponse.token);
                    
                    const userData = {
                        userId: loginResponse.user.id,
                        firstName: loginResponse.user.first_name,
                        lastName: loginResponse.user.last_name,
                        email: loginResponse.user.email
                    };
                  
                    setUser(userData);
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
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-full max-w-md p-8 mx-4 bg-white rounded-lg shadow-md">
      <form onSubmit={(e) => { 
        e.preventDefault(); 
        login({ email: formEmail, password }); 
      }}>
        <div className="mb-6">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
            Username
          </label>
          <input
            type="text"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
            id="username"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
            placeholder="email@email.com"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
            Password
          </label>
          <input
            type="password"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Login
        </button>
      </form>
    </div>
  </div>
);
}

export default LoginForm;