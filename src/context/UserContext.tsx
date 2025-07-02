import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import React from "react";

interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    
}

interface UserContextProps {
    user: User | null;
    isAdmin: boolean;
    error: string | null;
    fetchUserDetails: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

type UserProviderProps = {
    children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

        const fetchUserDetails = async () => {
            try {
                const storedToken = localStorage.getItem('authToken');
                
                if (!storedToken) {     
                    setError('No token found in UserContext');
                    return;
                }

                // Debug: Log the token to see what we're working with
                console.log('Stored token:', storedToken);
                
                // Since this is not a JWT token, we don't decode it
                // Just use it directly for API calls
                const response = await axios.get<User>('http://localhost:8000/api/users', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${storedToken}`
                    }
                });

                if (response.status === 200) {
                    setUser(response.data);
                    //setIsAdmin(response.data.role === 'ADMIN');
                } else {
                    setError('Failed to fetch user details');
                }
            } catch (error) {
                setError('Error fetching user details');
                console.error('Error fetching user details:', error);
            }
        };

        useEffect(() => {
            fetchUserDetails();
          }, []);

    return (
        <UserContext.Provider value={{ user, isAdmin, error, fetchUserDetails }}>
            {children}
        </UserContext.Provider>
    );
};
