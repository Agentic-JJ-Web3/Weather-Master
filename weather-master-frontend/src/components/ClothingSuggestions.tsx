import React from 'react';
import { ClothingSuggestion } from '@/types/weather';

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
    return (
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/30 animate-fade-in">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="mr-2">👔</span>
                What to Wear
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestions.map((suggestion, index) => (
                    <div
                        key={index}
                        className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all duration-200"
                    >
                        <div className="flex items-center mb-3">
                            <span className="text-3xl mr-2">
                                {categoryIcons[suggestion.category] || '👗'}
                            </span>
                            <div>
                                <h4 className="text-white font-semibold">{suggestion.category}</h4>
                                <p className="text-white/60 text-xs">{suggestion.reason}</p>
                            </div>
                        </div>

                        <ul className="space-y-1">
                            {suggestion.items.map((item, idx) => (
                                <li key={idx} className="text-white/90 text-sm flex items-start">
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
