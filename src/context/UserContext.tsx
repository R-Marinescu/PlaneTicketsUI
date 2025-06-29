import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import React from "react";

interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    
}

interface DecodedToken {
    exp: number;
    sub: string;
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