import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import React from "react";

interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
    children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const restoreUser = async () => {
            const token = localStorage.getItem('authToken');
            const expiresAt = localStorage.getItem('tokenExpiresAt');
           
            if (token && expiresAt) {
                const now = new Date();
                const expiration = new Date(expiresAt);

                if(now > expiration) {
                    console.log('Token expired, logging out...');
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('tokenExpiresAt');
                    setUser(null);
                    setIsLoading(false);
                    return;
                }

                try {
                    const response = await axios.get('http://localhost:8000/api/user', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    });
                
                    if (response.status === 200) {
                        const userData = {
                            userId: response.data.data.id,
                            firstName: response.data.data.first_name,
                            lastName: response.data.data.last_name,
                            email: response.data.data.email,
                            role: response.data.data.role
                        };
                        
                        setUser(userData);
                    }
                } catch (error) {
                    console.error('Token validation failed:', error);
                    // Remove invalid token
                    localStorage.removeItem('authToken');
                }
            }
            setIsLoading(false);
        };

        restoreUser();
    }, []); // Run once on mount

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};