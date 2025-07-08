import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavLink from './NavLink';
import Container from '../container/Container';

interface NavbarProps {
    isLoggedIn: boolean;
    handleLogout: () => void;
}

const Navbar = ({ isLoggedIn, handleLogout }: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    return (
        <nav className="sticky top-0 shadow-sm bg-white mb-4 z-50 w-full">
            <Container>
                <div className="flex items-center py-4 min-h-[64px]">
                    <button
                        className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-gray-900 text-sm"
                        aria-controls="navbarNav"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg 
                            className="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div className={`${isMenuOpen ? 'block' : '!hidden'} md:flex md:items-center md:space-x-6 text-base`}>
                        <NavLink as={Link} to="/">Home</NavLink>
                        <NavLink as={Link} to="/login">Login</NavLink>
                        <NavLink as={Link} to="/register">Register</NavLink>
                        <NavLink as={Link} to="/user-details">Profile</NavLink>
                        <NavLink as={Link} to="/About">About</NavLink>
                        {isLoggedIn && (
                            <button
                                onClick={handleLogout}
                                className="text-gray-900 hover:text-gray-600 px-3 py-2"
                            >
                                Logout
                            </button>)}
                    </div>
                </div>
            </Container>
        </nav>
    )
}

export default Navbar;