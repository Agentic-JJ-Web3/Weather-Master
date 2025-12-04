'use client';

import React, { useRef, useEffect } from 'react';
import { ForecastItem } from '@/types/weather';
import { formatDate, formatTemperature, getWeatherIcon } from '@/utils/formatters';
import { gsap } from 'gsap';

interface ForecastCardProps {
    forecast: ForecastItem;
    index?: number;
}

export default function ForecastCard({ forecast, index = 0 }: ForecastCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cardRef.current) {
            gsap.fromTo(
                cardRef.current,
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    delay: 0.5 + index * 0.1,
                    ease: 'power2.out',
                }
            );
        }
    }, [index]);

    return (
        <div
            ref={cardRef}
            className="bg-white/20 dark:bg-slate-800/40 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/30 dark:border-slate-700/50 text-center hover:bg-white/30 dark:hover:bg-slate-700/60 hover:scale-105 transition-all duration-200 opacity-0"
        >
            <div className="text-white/80 dark:text-slate-300 text-sm font-medium mb-2">
                {formatDate(forecast.date)}
            </div>

            <div className="text-5xl mb-3">
                {getWeatherIcon(forecast.condition)}
            </div>

            <div className="text-white dark:text-slate-100 font-semibold mb-1">
                {formatTemperature(forecast.temp_high)}
            </div>

            <div className="text-white/70 dark:text-slate-400 text-sm mb-2">
                {formatTemperature(forecast.temp_low)}
            </div>

            <div className="text-white/60 dark:text-slate-500 text-xs capitalize">
                {forecast.condition}
            </div>

            {forecast.precipitation_chance > 0 && (
                <div className="text-blue-200 dark:text-cyan-300 text-xs mt-2">
                    💧 {forecast.precipitation_chance}%
                </div>
            )}
        </div>
    );
}
