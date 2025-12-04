'use client';

import React, { useRef, useEffect } from 'react';
import { ClothingSuggestion } from '@/types/weather';
import { staggerIn } from '@/utils/animations';

interface ClothingSuggestionsProps {
    suggestions: ClothingSuggestion[];
}

const categoryIcons: { [key: string]: string } = {
    'Outerwear': '🧥',
    'Top': '👕',
    'Bottom': '👖',
    'Footwear': '👟',
    'Accessories': '🎒',
};

export default function ClothingSuggestions({ suggestions }: ClothingSuggestionsProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const cards = containerRef.current.querySelectorAll('.clothing-card');
            staggerIn(Array.from(cards), 0.4, 0.1, 0.7);
        }
    }, [suggestions]);

    return (
        <div className="bg-white/20 dark:bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/30 dark:border-slate-700/50">
            <h3 className="text-2xl font-bold text-white dark:text-slate-100 mb-4 flex items-center">
                <span className="mr-2">👔</span>
                What to Wear
            </h3>

            <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestions.map((suggestion, index) => (
                    <div
                        key={index}
                        className="clothing-card bg-white/10 dark:bg-slate-700/40 rounded-lg p-4 hover:bg-white/20 dark:hover:bg-slate-600/60 hover:scale-105 transition-all duration-200 opacity-0"
                    >
                        <div className="flex items-center mb-3">
                            <span className="text-3xl mr-2">
                                {categoryIcons[suggestion.category] || '👗'}
                            </span>
                            <div>
                                <h4 className="text-white dark:text-slate-100 font-semibold">
                                    {suggestion.category}
                                </h4>
                                <p className="text-white/60 dark:text-slate-400 text-xs">
                                    {suggestion.reason}
                                </p>
                            </div>
                        </div>

                        <ul className="space-y-1">
                            {suggestion.items.map((item, idx) => (
                                <li key={idx} className="text-white/90 dark:text-slate-200 text-sm flex items-start">
                                    <span className="mr-2">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
