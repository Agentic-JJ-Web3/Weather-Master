export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const DEFAULT_LOCATION = 'New York';

export const TEMPERATURE_UNITS = {
    FAHRENHEIT: 'F',
    CELSIUS: 'C',
} as const;

export const WEATHER_CONDITIONS = {
    CLEAR: 'Clear',
    CLOUDS: 'Clouds',
    RAIN: 'Rain',
    SNOW: 'Snow',
    THUNDERSTORM: 'Thunderstorm',
    DRIZZLE: 'Drizzle',
    MIST: 'Mist',
} as const;
