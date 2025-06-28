import { useEffect, useState } from 'react';
import { fetchUsers } from './api/user';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then(data => setUsers(data))
      .catch(err => console.error('API error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Users from Laravel API</h1>
      {loading ? (
        <p>Loading...</p>
      ) : users.length ? (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.first_name} {user.last_name} — {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default App;
