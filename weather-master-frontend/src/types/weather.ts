export interface LocationRequest {
    location: string;
}

export interface WeatherResponse {
    location: string;
    current_temp: number;
    feels_like: number;
    condition: string;
    humidity: number;
    wind_speed: number;
    uv_index: number;
    timestamp: string;
}

export interface ForecastItem {
    date: string;
    temp_high: number;
    temp_low: number;
    condition: string;
    precipitation_chance: number;
}

export interface ClothingSuggestion {
    category: string;
    items: string[];
    reason: string;
}

export interface ActivitySuggestion {
    activity: string;
    description: string;
    suitability_score: number;
}

export interface CompleteSuggestions {
    weather: WeatherResponse;
    forecast: ForecastItem[];
    clothing: ClothingSuggestion[];
    activities: ActivitySuggestion[];
}
