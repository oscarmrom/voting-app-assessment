import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        zip_code: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector(
                        '[name="csrf-token"]'
                    ).content,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                onLogin(data.user);
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Login to Vote
            </h2>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email Address *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="your.email@example.com"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Password *
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter any password"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        (Any password will work for this demo)
                    </p>
                </div>

                <div>
                    <label
                        htmlFor="zip_code"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Zip Code *
                    </label>
                    <input
                        type="text"
                        id="zip_code"
                        name="zip_code"
                        required
                        value={formData.zip_code}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="12345"
                        pattern="[0-9]{5}"
                        maxLength="5"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? 'Signing In...' : 'Sign In to Vote'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
