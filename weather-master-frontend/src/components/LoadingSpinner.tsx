import React from 'react';

export default function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-white/30 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-white mt-4 text-lg">Loading weather data...</p>
        </div>
    );
}
