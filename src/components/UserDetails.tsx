import { useUserContext } from '../context/UserContext';

function UserDetails() {
    const { user } = useUserContext();

    if (!user) {
        return (
            <div 
                className="text-red-600 text-center mt-4 p-4 bg-red-50 rounded-lg"
                role="alert"
                aria-live="polite"
            >
                Please log in to view your details.
            </div>
        );
    }

    return (
        <section 
            className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto mt-8"
            aria-labelledby="user-details-heading"
        >
            <h2 
                id="user-details-heading"
                className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2"
            >
                User Profile
            </h2>
            
            <dl className="space-y-3">
                <div className="flex flex-wrap">
                    <dt className="w-1/3 font-semibold text-gray-600">First Name:</dt>
                    <dd className="w-2/3 text-gray-800">{user.firstName}</dd>
                </div>
                <div className="flex flex-wrap">
                    <dt className="w-1/3 font-semibold text-gray-600">Last Name:</dt>
                    <dd className="w-2/3 text-gray-800">{user.lastName}</dd>
                </div>
                <div className="flex flex-wrap">
                    <dt className="w-1/3 font-semibold text-gray-600">Email:</dt>
                    <dd className="w-2/3 text-gray-800 break-all">{user.email}</dd>
                </div>
            </dl>
        </section>
    );
}

export default UserDetails;