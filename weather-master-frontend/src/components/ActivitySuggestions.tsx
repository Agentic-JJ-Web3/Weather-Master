import React from 'react';
import { ActivitySuggestion } from '@/types/weather';

interface ActivitySuggestionsProps {
    suggestions: ActivitySuggestion[];
}

const getActivityIcon = (activity: string): string => {
    const activityLower = activity.toLowerCase();

    if (activityLower.includes('picnic')) return '🧺';
    if (activityLower.includes('hiking')) return '🥾';
    if (activityLower.includes('cycling') || activityLower.includes('bike')) return '🚴';
    if (activityLower.includes('swimming') || activityLower.includes('pool')) return '🏊';
    if (activityLower.includes('ice cream')) return '🍦';
    if (activityLower.includes('museum')) return '🏛️';
    if (activityLower.includes('movie')) return '🎬';
    if (activityLower.includes('read') || activityLower.includes('café')) return '📚';
    if (activityLower.includes('running')) return '🏃';
    if (activityLower.includes('gym')) return '💪';
    if (activityLower.includes('yoga')) return '🧘';
    if (activityLower.includes('café') || activityLower.includes('coffee')) return '☕';
    if (activityLower.includes('ski')) return '⛷️';
    if (activityLower.includes('snowboard')) return '🏂';

    return '🎯';
};

const getSuitabilityColor = (score: number): string => {
    if (score >= 9) return 'bg-green-500';
    if (score >= 7) return 'bg-blue-500';
    if (score >= 5) return 'bg-yellow-500';
    return 'bg-orange-500';
};

export default function ActivitySuggestions({ suggestions }: ActivitySuggestionsProps) {
    return (
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/30 animate-fade-in">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="mr-2">🎯</span>
                Recommended Activities
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestions.map((suggestion, index) => (
                    <div
                        key={index}
                        className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all duration-200 relative overflow-hidden"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center">
                                <span className="text-3xl mr-3">
                                    {getActivityIcon(suggestion.activity)}
                                </span>
                                <div>
                                    <h4 className="text-white font-semibold">{suggestion.activity}</h4>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className={`${getSuitabilityColor(suggestion.suitability_score)} text-white text-xs font-bold px-2 py-1 rounded`}>
                                    {suggestion.suitability_score}/10
                                </div>
                            </div>
                        </div>

                        <p className="text-white/80 text-sm">
                            {suggestion.description}
                        </p>

                        {/* Suitability bar */}
                        <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
                            <div
                                className={`${getSuitabilityColor(suggestion.suitability_score)} h-full transition-all duration-500`}
                                style={{ width: `${suggestion.suitability_score * 10}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
