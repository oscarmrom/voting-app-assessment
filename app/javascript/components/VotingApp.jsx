import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import VotingPage from './VotingPage';
import ResultsPage from './ResultsPage';

const VotingApp = () => {
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState('login');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/current_user')
            .then((response) => response.json())
            .then((data) => {
                if (data.user) {
                    setUser(data.user);
                    setCurrentPage('vote');
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error checking login status:', error);
                setLoading(false);
            });
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        setCurrentPage('vote');
    };

    const handleLogout = () => {
        fetch('/logout', { method: 'DELETE' }).then(() => {
            setUser(null);
            setCurrentPage('login');
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-600 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-600">
            <nav className="bg-white shadow-lg">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-2xl font-bold text-gray-800">
                            🎵 Music Festival Voting
                        </h1>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setCurrentPage('results')}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                View Results
                            </button>
                            {user && (
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-600">
                                        Hello, {user.email}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="text-red-600 hover:text-red-800 font-medium"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8">
                {currentPage === 'login' && !user && (
                    <LoginForm onLogin={handleLogin} />
                )}

                {currentPage === 'vote' && user && (
                    <VotingPage user={user} onUserUpdate={setUser} />
                )}

                {currentPage === 'results' && <ResultsPage />}
            </main>
        </div>
    );
};

export default VotingApp;
