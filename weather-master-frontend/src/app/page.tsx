'use client';

import { useState, useEffect, useRef } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import ForecastCard from '@/components/ForecastCard';
import ClothingSuggestions from '@/components/ClothingSuggestions';
import ActivitySuggestions from '@/components/ActivitySuggestions';
import LoadingSpinner from '@/components/LoadingSpinner';
import ThemeToggle from '@/components/ThemeToggle';
import { weatherApi } from '@/services/api';
import { CompleteSuggestions } from '@/types/weather';
import { pageEntranceSequence } from '@/utils/animations';

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<CompleteSuggestions | null>(null);

    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const searchBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Page entrance animation
        pageEntranceSequence({
            title: titleRef.current,
            subtitle: subtitleRef.current,
            searchBar: searchBarRef.current,
        });
    }, []);

    const handleSearch = async (location: string) => {
        setLoading(true);
        setError(null);
        try {
            const suggestions = await weatherApi.getSuggestions(location);
            setData(suggestions);
        } catch (err) {
            setError('Failed to fetch weather data. Please check the city name and try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 transition-colors duration-300">
            <ThemeToggle />

            <div className="max-w-7xl mx-auto py-8">
                <div className="text-center mb-8">
                    <h1
                        ref={titleRef}
                        className="text-5xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg opacity-0"
                    >
                        ☀️ Weather Master
                    </h1>
                    <p
                        ref={subtitleRef}
                        className="text-white/90 dark:text-slate-300 text-lg opacity-0"
                    >
                        Smart weather forecasts with AI-powered suggestions
                    </p>
                </div>

                <div ref={searchBarRef} className="opacity-0">
                    <SearchBar onSearch={handleSearch} />
                </div>

                {loading && <LoadingSpinner />}

                {error && (
                    <div className="max-w-2xl mx-auto bg-red-500/20 dark:bg-red-900/30 backdrop-blur-md border border-red-300/50 dark:border-red-700/50 text-white px-6 py-4 rounded-lg shadow-lg animate-fade-in">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">⚠️</span>
                            <div>
                                <p className="font-semibold">Error</p>
                                <p className="text-sm">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {data && !loading && (
                    <div className="space-y-6">
                        <WeatherCard weather={data.weather} />

                        <div>
                            <h2 className="text-2xl font-bold text-white dark:text-slate-100 mb-4 flex items-center">
                                <span className="mr-2">📅</span>
                                5-Day Forecast
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {data.forecast.map((item, idx) => (
                                    <ForecastCard key={idx} forecast={item} index={idx} />
                                ))}
                            </div>
                        </div>

                        <ClothingSuggestions suggestions={data.clothing} />

                        <ActivitySuggestions suggestions={data.activities} />
                    </div>
                )}

                {!data && !loading && !error && (
                    <div className="text-center text-white/80 dark:text-slate-400 py-12">
                        <p className="text-xl">👆 Enter a city name above to get started</p>
                    </div>
                )}
            </div>
        </main>
    );
}
