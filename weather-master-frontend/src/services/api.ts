import axios from 'axios';
import { CompleteSuggestions, WeatherResponse, ForecastItem } from '@/types/weather';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const weatherApi = {
    getCurrentWeather: async (location: string): Promise<WeatherResponse> => {
        const response = await api.get(`/api/weather/current`, {
            params: { location },
        });
        return response.data;
    },

    getForecast: async (location: string, days: number = 5): Promise<ForecastItem[]> => {
        const response = await api.get(`/api/weather/forecast`, {
            params: { location, days },
        });
        return response.data;
    },

    getSuggestions: async (location: string): Promise<CompleteSuggestions> => {
        const response = await api.post(`/api/suggestions`, { location });
        return response.data;
    },
};
