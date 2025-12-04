'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';
import ForecastCard from '@/components/ForecastCard';
import ClothingSuggestions from '@/components/ClothingSuggestions';
import ActivitySuggestions from '@/components/ActivitySuggestions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { weatherApi } from '@/services/api';
import { CompleteSuggestions } from '@/types/weather';

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<CompleteSuggestions | null>(null);

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
        <main className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4">
            <div className="max-w-7xl mx-auto py-8">
                <div className="text-center mb-8">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
                        ☀️ Weather Master
                    </h1>
                    <p className="text-white/90 text-lg">
                        Smart weather forecasts with personalized suggestions
                    </p>
                </div>

                <SearchBar onSearch={handleSearch} />

                {loading && <LoadingSpinner />}

                {error && (
                    <div className="max-w-2xl mx-auto bg-red-500/20 backdrop-blur-md border border-red-300/50 text-white px-6 py-4 rounded-lg shadow-lg animate-fade-in">
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
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                                <span className="mr-2">📅</span>
                                5-Day Forecast
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {data.forecast.map((item, idx) => (
                                    <ForecastCard key={idx} forecast={item} />
                                ))}
                            </div>
                        </div>

                        <ClothingSuggestions suggestions={data.clothing} />

                        <ActivitySuggestions suggestions={data.activities} />
                    </div>
                )}

                {!data && !loading && !error && (
                    <div className="text-center text-white/80 py-12">
                        <p className="text-xl">👆 Enter a city name above to get started</p>
                    </div>
                )}
            </div>
        </main>
    );
}
