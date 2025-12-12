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
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-slate-200 dark:border-slate-600/50 bg-white dark:bg-slate-800/50 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-400 dark:focus:border-orange-500/50 transition-all duration-200 shadow-sm"
                />
                <button
                    type="submit"
                    className="px-8 py-3 bg-orange-500 dark:bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-600 dark:hover:bg-orange-500 transition-all duration-200 shadow-lg hover:shadow-orange-500/30 hover:scale-105"
                >
                    Search
                </button>
            </div>
        </form>
    );
}
