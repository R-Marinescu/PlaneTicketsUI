import { useState, useEffect} from 'react';

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

function UsersList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/admin/users');
                const userData = await response.json();
                console.log(userData);
                setUsers(userData);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="user-list">
            <h2>User List</h2>
            <div className="users-grid">
                {users.map(user => (
                    <div key={user.id} className="user-card">
                        <h3>{user.firstName}</h3>
                        <h3>{user.lastName}</h3>
                        <p>{user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UsersList;
