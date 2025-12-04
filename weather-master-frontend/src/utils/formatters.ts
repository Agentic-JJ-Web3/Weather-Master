/**
 * Format date string to readable format
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
};

/**
 * Format temperature with unit
 */
export const formatTemperature = (temp: number, unit: string = 'F'): string => {
    return `${Math.round(temp)}°${unit}`;
};

/**
 * Format timestamp to time string
 */
export const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Get weather icon emoji based on condition
 */
export const getWeatherIcon = (condition: string): string => {
    const conditionLower = condition.toLowerCase();

    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
        return '☀️';
    } else if (conditionLower.includes('cloud')) {
        return '☁️';
    } else if (conditionLower.includes('rain')) {
        return '🌧️';
    } else if (conditionLower.includes('snow')) {
        return '❄️';
    } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
        return '⛈️';
    } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
        return '🌫️';
    } else if (conditionLower.includes('wind')) {
        return '💨';
    }

    return '🌤️';
};
