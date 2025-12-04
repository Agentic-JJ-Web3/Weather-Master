import React from 'react';
import { ForecastItem } from '@/types/weather';
import { formatDate, formatTemperature, getWeatherIcon } from '@/utils/formatters';

interface ForecastCardProps {
    forecast: ForecastItem;
}

export default function ForecastCard({ forecast }: ForecastCardProps) {
    return (
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/30 text-center hover:bg-white/30 transition-all duration-200 animate-slide-up">
            <div className="text-white/80 text-sm font-medium mb-2">
                {formatDate(forecast.date)}
            </div>

            <div className="text-5xl mb-3">
                {getWeatherIcon(forecast.condition)}
            </div>

            <div className="text-white font-semibold mb-1">
                {formatTemperature(forecast.temp_high)}
            </div>

            <div className="text-white/70 text-sm mb-2">
                {formatTemperature(forecast.temp_low)}
            </div>

            <div className="text-white/60 text-xs capitalize">
                {forecast.condition}
            </div>

            {forecast.precipitation_chance > 0 && (
                <div className="text-blue-200 text-xs mt-2">
                    💧 {forecast.precipitation_chance}%
                </div>
            )}
        </div>
    );
}
