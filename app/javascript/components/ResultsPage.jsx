import React, { useState, useEffect } from 'react';

const ResultsPage = () => {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResults();

        const interval = setInterval(fetchResults, 10000);
        return () => clearInterval(interval);
    }, []);

    const fetchResults = async () => {
        try {
            const response = await fetch('/api/results');
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error fetching results:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="text-white text-xl">Loading results...</div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    🏆 Festival Voting Results
                </h2>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            {results.total_votes}
                        </div>
                        <div className="text-blue-800">Total Votes</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">
                            {results.total_candidates}
                        </div>
                        <div className="text-purple-800">Candidates</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">
                            Live
                        </div>
                        <div className="text-green-800">Real-time Results</div>
                    </div>
                </div>

                {results.candidates.length === 0 ? (
                    <div className="text-center py-8 text-gray-600">
                        <p className="text-xl">No votes cast yet!</p>
                        <p>Be the first to vote for your favorite performer.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {results.candidates.map((candidate, index) => (
                            <div
                                key={candidate.id}
                                className="border border-gray-200 rounded-lg p-4"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                                                index === 0
                                                    ? 'bg-yellow-500'
                                                    : index === 1
                                                    ? 'bg-gray-400'
                                                    : index === 2
                                                    ? 'bg-orange-600'
                                                    : 'bg-blue-500'
                                            }`}
                                        >
                                            {index + 1}
                                        </div>
                                        <h3 className="font-semibold text-lg text-gray-800">
                                            {candidate.name}
                                        </h3>
                                        {index === 0 &&
                                            candidate.vote_count > 0 && (
                                                <span className="text-yellow-500 text-xl">
                                                    👑
                                                </span>
                                            )}
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-lg text-gray-800">
                                            {candidate.vote_count} votes
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {candidate.percentage}%
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className={`h-3 rounded-full transition-all duration-500 ${
                                            index === 0
                                                ? 'bg-yellow-500'
                                                : index === 1
                                                ? 'bg-gray-400'
                                                : index === 2
                                                ? 'bg-orange-600'
                                                : 'bg-blue-500'
                                        }`}
                                        style={{
                                            width: `${candidate.percentage}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="text-center mt-6 text-sm text-gray-500">
                    Results update automatically every 10 seconds
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;
