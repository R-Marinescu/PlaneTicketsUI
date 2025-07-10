import { useState } from 'react';
import axios from 'axios';
import ErrorComponent from './ErrorComponent';

interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

function RegisterForm() {
    const [formData, setFormData] = useState<RegisterData>({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const register = async (data: RegisterData) => {

        const payload = {
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            password: data.password
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 201) {
                alert("Registration successful! Please log in.");
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                });
            } else {
                setError("Registration failed. Please try again.");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error during registration:', error.response?.data?.errors.password );
                console.error('Error during registration:', error.response?.data?.errors.email);
                setEmailError(error.response?.data?.errors.email || null);
                setPasswordError(error.response?.data?.errors.password || null);
            } else {
                console.error('Unexpected error:', error);
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md p-8 mx-4 bg-white rounded-lg shadow-md">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    register(formData);
                }}>
                    <div className="mb-6">
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                            Email
                        </label>
                        <input
                            type="text"
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                        <ErrorComponent error={emailError} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                            id="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                        <ErrorComponent error={passwordError} />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;