import { Link } from 'react-router-dom';

interface NavLinkProps {
    to : string;
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}

const NavLink = ({ to, children, className = ''}: NavLinkProps) => (
    <Link to={to}   className={`text-gray-900 hover:text-gray-600 px-5 py-3 text-lg tracking-wide font-medium ${className}`}>
        {children}
    </Link>
);

export default NavLink;