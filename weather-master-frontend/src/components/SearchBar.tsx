import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (location: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [location, setLocation] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (location.trim()) {
            onSearch(location.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex gap-2 max-w-2xl mx-auto">
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter city name (e.g., London, New York)"
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:border-white/50 backdrop-blur-sm"
                />
                <button
                    type="submit"
                    className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200 shadow-lg"
                >
                    Search
                </button>
            </div>
        </form>
    );
}
