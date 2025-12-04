'use client';

import React, { useRef, useEffect } from 'react';
import { WeatherResponse } from '@/types/weather';
import { formatTemperature, formatTime, getWeatherIcon } from '@/utils/formatters';
import { slideIn, staggerIn } from '@/utils/animations';

interface WeatherCardProps {
    weather: WeatherResponse;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const metricsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        slideIn(cardRef.current, 'left', 0.6, 0.2);

        if (metricsRef.current) {
            const metrics = metricsRef.current.querySelectorAll('.metric-item');
            staggerIn(Array.from(metrics), 0.3, 0.1, 0.5);
        }
    }, [weather]);

    return (
        <div
            ref={cardRef}
            className="bg-white/20 dark:bg-slate-800/40 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/30 dark:border-slate-700/50 opacity-0"
        >
            <div className="text-center mb-6">
                <h2 className="text-4xl font-bold text-white dark:text-slate-100 mb-2">
                    {weather.location}
                </h2>
                <p className="text-white/80 dark:text-slate-300">
                    {formatTime(weather.timestamp)}
                </p>
            </div>

            <div className="flex items-center justify-center mb-8">
                <div className="text-8xl mr-6">{getWeatherIcon(weather.condition)}</div>
                <div>
                    <div className="text-6xl font-bold text-white dark:text-slate-100">
                        {formatTemperature(weather.current_temp)}
                    </div>
                    <div className="text-xl text-white/80 dark:text-slate-300">
                        Feels like {formatTemperature(weather.feels_like)}
                    </div>
                    <div className="text-2xl text-white/90 dark:text-slate-200 mt-2 capitalize">
                        {weather.condition}
                    </div>
                </div>
            </div>

            <div ref={metricsRef} className="grid grid-cols-3 gap-4 text-center">
                <div className="metric-item bg-white/10 dark:bg-slate-700/40 rounded-lg p-4 opacity-0">
                    <div className="text-white/70 dark:text-slate-400 text-sm mb-1">Humidity</div>
                    <div className="text-white dark:text-slate-100 text-2xl font-semibold">
                        {weather.humidity}%
                    </div>
                </div>
                <div className="metric-item bg-white/10 dark:bg-slate-700/40 rounded-lg p-4 opacity-0">
                    <div className="text-white/70 dark:text-slate-400 text-sm mb-1">Wind Speed</div>
                    <div className="text-white dark:text-slate-100 text-2xl font-semibold">
                        {weather.wind_speed} mph
                    </div>
                </div>
                <div className="metric-item bg-white/10 dark:bg-slate-700/40 rounded-lg p-4 opacity-0">
                    <div className="text-white/70 dark:text-slate-400 text-sm mb-1">UV Index</div>
                    <div className="text-white dark:text-slate-100 text-2xl font-semibold">
                        {weather.uv_index}
                    </div>
                </div>
            </div>
        </div>
    );
}
