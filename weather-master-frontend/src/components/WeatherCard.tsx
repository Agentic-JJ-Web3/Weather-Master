import React from 'react';
import { WeatherResponse } from '@/types/weather';
import { formatTemperature, formatTime, getWeatherIcon } from '@/utils/formatters';

interface WeatherCardProps {
    weather: WeatherResponse;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
    return (
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/30 animate-fade-in">
            <div className="text-center mb-6">
                <h2 className="text-4xl font-bold text-white mb-2">{weather.location}</h2>
                <p className="text-white/80">{formatTime(weather.timestamp)}</p>
            </div>

            <div className="flex items-center justify-center mb-8">
                <div className="text-8xl mr-6">{getWeatherIcon(weather.condition)}</div>
                <div>
                    <div className="text-6xl font-bold text-white">
                        {formatTemperature(weather.current_temp)}
                    </div>
                    <div className="text-xl text-white/80">
                        Feels like {formatTemperature(weather.feels_like)}
                    </div>
                    <div className="text-2xl text-white/90 mt-2 capitalize">
                        {weather.condition}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-white/70 text-sm mb-1">Humidity</div>
                    <div className="text-white text-2xl font-semibold">{weather.humidity}%</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-white/70 text-sm mb-1">Wind Speed</div>
                    <div className="text-white text-2xl font-semibold">{weather.wind_speed} mph</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-white/70 text-sm mb-1">UV Index</div>
                    <div className="text-white text-2xl font-semibold">{weather.uv_index}</div>
                </div>
            </div>
        </div>
    );
}
