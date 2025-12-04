'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function LoadingSpinner() {
    const spinnerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (spinnerRef.current) {
            gsap.to(spinnerRef.current, {
                rotation: 360,
                duration: 1,
                repeat: -1,
                ease: 'linear',
            });
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-white/30 dark:border-slate-600/30 rounded-full"></div>
                <div
                    ref={spinnerRef}
                    className="absolute top-0 left-0 w-full h-full border-4 border-white dark:border-cyan-400 border-t-transparent rounded-full"
                ></div>
            </div>
            <p className="text-white dark:text-slate-300 mt-4 text-lg animate-pulse-slow">
                Loading weather data...
            </p>
        </div>
    );
}
