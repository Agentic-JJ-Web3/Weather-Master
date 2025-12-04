'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface SearchBarProps {
    onSearch: (location: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [location, setLocation] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Add focus animation
        if (inputRef.current) {
            inputRef.current.addEventListener('focus', () => {
                gsap.to(inputRef.current, {
                    scale: 1.02,
                    duration: 0.2,
                    ease: 'power2.out',
                });
            });

            inputRef.current.addEventListener('blur', () => {
                gsap.to(inputRef.current, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out',
                });
            });
        }
    }, []);

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
                    ref={inputRef}
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter city name (e.g., London, New York)"
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-white/30 dark:border-slate-600/50 bg-white/20 dark:bg-slate-700/50 text-white placeholder-white/70 dark:placeholder-slate-400 focus:outline-none focus:border-white/50 dark:focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-200"
                />
                <button
                    type="submit"
                    className="px-8 py-3 bg-white dark:bg-cyan-500 text-blue-600 dark:text-white font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-cyan-400 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                >
                    Search
                </button>
            </div>
        </form>
    );
}
