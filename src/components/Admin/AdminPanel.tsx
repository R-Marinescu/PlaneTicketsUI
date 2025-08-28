import UsersList from '../User/UsersList';

function AdminPanel() {
    return (
         <div>
            <h1>Admin Panel</h1>
            <p>Welcome to the admin panel. Here you can manage users and settings.</p>
            <div className="admin-sections">
                <UsersList />
            </div>
        </div>
    );
}

export default AdminPanel;