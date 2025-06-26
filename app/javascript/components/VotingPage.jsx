import React, { useState, useEffect } from 'react';

const VotingPage = ({ user, onUserUpdate }) => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [voting, setVoting] = useState(false);
    const [message, setMessage] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCandidateName, setNewCandidateName] = useState('');

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const response = await fetch('/api/candidates');
            const data = await response.json();
            setCandidates(data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVote = async (candidateId) => {
        setVoting(true);
        setMessage('');

        try {
            const response = await fetch('/cast_vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector(
                        '[name="csrf-token"]'
                    ).content,
                },
                body: JSON.stringify({ candidate_id: candidateId }),
            });

            const data = await response.json();

            if (data.success) {
                setMessage('✅ ' + data.message);
                onUserUpdate({ ...user, voted: true });
                fetchCandidates(); // Refresh vote counts
            } else {
                setMessage('❌ ' + (data.error || 'Vote failed'));
            }
        } catch (error) {
            setMessage('❌ Network error. Please try again.');
        } finally {
            setVoting(false);
        }
    };

    const handleAddCandidate = async (e) => {
        e.preventDefault();
        if (!newCandidateName.trim()) return;

        setVoting(true);
        setMessage('');

        try {
            const response = await fetch('/add_candidate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector(
                        '[name="csrf-token"]'
                    ).content,
                },
                body: JSON.stringify({ name: newCandidateName.trim() }),
            });

            const data = await response.json();

            if (data.success) {
                setMessage('✅ ' + data.message);
                onUserUpdate({ ...user, voted: true, write_in_used: true });
                setNewCandidateName('');
                setShowAddForm(false);
                fetchCandidates(); // Refresh candidates list
            } else {
                setMessage('❌ ' + (data.error || 'Failed to add candidate'));
            }
        } catch (error) {
            setMessage('❌ Network error. Please try again.');
        } finally {
            setVoting(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="text-white text-xl">Loading candidates...</div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
                    🎵 Vote for Your Favorite Performer
                </h2>
                <p className="text-center text-gray-600 mb-4">
                    Choose your favorite performer or add a new one!
                </p>

                {message && (
                    <div
                        className={`p-4 rounded-md mb-4 ${
                            message.includes('✅')
                                ? 'bg-green-100 border border-green-400 text-green-700'
                                : 'bg-red-100 border border-red-400 text-red-700'
                        }`}
                    >
                        {message}
                    </div>
                )}

                {user.voted ? (
                    <div className="text-center py-8">
                        <div className="text-green-600 text-xl font-semibold mb-2">
                            ✅ Thank you for voting!
                        </div>
                        <p className="text-gray-600">
                            You have already cast your vote in this election.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            {candidates.map((candidate) => (
                                <div
                                    key={candidate.id}
                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                >
                                    <h3 className="font-semibold text-lg mb-2 text-gray-800">
                                        {candidate.name}
                                    </h3>
                                    <p className="text-gray-600 mb-3">
                                        Current votes: {candidate.vote_count}
                                    </p>
                                    <button
                                        onClick={() => handleVote(candidate.id)}
                                        disabled={voting}
                                        className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {voting
                                            ? 'Voting...'
                                            : 'Vote for ' + candidate.name}
                                    </button>
                                </div>
                            ))}
                        </div>

                        {!user.write_in_used && candidates.length < 10 && (
                            <div className="border-t pt-6">
                                {!showAddForm ? (
                                    <div className="text-center">
                                        <button
                                            onClick={() => setShowAddForm(true)}
                                            className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                                        >
                                            ➕ Add New Performer
                                        </button>
                                        <p className="text-sm text-gray-600 mt-2">
                                            Don't see your favorite? Add them
                                            and vote!
                                        </p>
                                    </div>
                                ) : (
                                    <form
                                        onSubmit={handleAddCandidate}
                                        className="max-w-md mx-auto"
                                    >
                                        <h3 className="font-semibold text-lg mb-4 text-center">
                                            Add New Performer
                                        </h3>
                                        <div className="space-y-4">
                                            <input
                                                type="text"
                                                value={newCandidateName}
                                                onChange={(e) =>
                                                    setNewCandidateName(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter performer name"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                                required
                                            />
                                            <div className="flex space-x-2">
                                                <button
                                                    type="submit"
                                                    disabled={
                                                        voting ||
                                                        !newCandidateName.trim()
                                                    }
                                                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    {voting
                                                        ? 'Adding...'
                                                        : 'Add & Vote'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setShowAddForm(false);
                                                        setNewCandidateName('');
                                                    }}
                                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        )}

                        {user.write_in_used && (
                            <div className="text-center text-gray-600 border-t pt-6">
                                <p>
                                    You have already used your write-in
                                    candidate opportunity.
                                </p>
                            </div>
                        )}

                        {candidates.length >= 10 && (
                            <div className="text-center text-gray-600 border-t pt-6">
                                <p>
                                    Maximum number of candidates reached (10).
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default VotingPage;
