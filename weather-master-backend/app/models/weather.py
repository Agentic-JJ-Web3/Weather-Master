from pydantic import BaseModel
from datetime import datetime
from typing import List

class LocationRequest(BaseModel):
    location: str  # city name or coordinates

class WeatherResponse(BaseModel):
    location: str
    current_temp: float
    feels_like: float
    condition: str  # sunny, rainy, cloudy, etc.
    humidity: int
    wind_speed: float
    uv_index: int
    timestamp: datetime

class ForecastItem(BaseModel):
    date: str
    temp_high: float
    temp_low: float
    condition: str
    precipitation_chance: int

class ClothingSuggestion(BaseModel):
    category: str  # outerwear, top, bottom, footwear, accessories
    items: List[str]
    reason: str

class ActivitySuggestion(BaseModel):
    activity: str
    description: str
    suitability_score: int  # 1-10

class CompleteSuggestions(BaseModel):
    weather: WeatherResponse
    forecast: List[ForecastItem]
    clothing: List[ClothingSuggestion]
    activities: List[ActivitySuggestion]
