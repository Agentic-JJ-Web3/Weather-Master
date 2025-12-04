import httpx
from datetime import datetime
from app.config import settings
from app.models.weather import WeatherResponse, ForecastItem

async def get_current_weather(location: str) -> dict:
    """
    Fetch current weather data from WeatherAPI.com.
    
    Args:
        location: City name (e.g., "London", "New York")
    
    Returns:
        Dictionary with current weather data
    """
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{settings.WEATHER_API_BASE_URL}/current.json",
            params={
                "key": settings.WEATHER_API_KEY,
                "q": location,
                "aqi": "no"
            }
        )
        response.raise_for_status()
        data = response.json()
        
        # Transform WeatherAPI response to our model format
        return {
            "location": data["location"]["name"],
            "current_temp": data["current"]["temp_f"],
            "feels_like": data["current"]["feelslike_f"],
            "condition": data["current"]["condition"]["text"],
            "humidity": data["current"]["humidity"],
            "wind_speed": data["current"]["wind_mph"],
            "uv_index": int(data["current"]["uv"]),
            "timestamp": datetime.now()
        }

async def get_forecast(location: str, days: int = 5) -> list:
    """
    Fetch weather forecast from WeatherAPI.com.
    
    Args:
        location: City name
        days: Number of days to forecast (default 5, max 10 for free tier)
    
    Returns:
        List of forecast items
    """
    # WeatherAPI free tier supports up to 3 days, adjust if needed
    days = min(days, 3)
    
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{settings.WEATHER_API_BASE_URL}/forecast.json",
            params={
                "key": settings.WEATHER_API_KEY,
                "q": location,
                "days": days,
                "aqi": "no",
                "alerts": "no"
            }
        )
        response.raise_for_status()
        data = response.json()
        
        # Convert to forecast items
        forecast_list = []
        for day in data["forecast"]["forecastday"]:
            forecast_list.append({
                "date": day["date"],
                "temp_high": day["day"]["maxtemp_f"],
                "temp_low": day["day"]["mintemp_f"],
                "condition": day["day"]["condition"]["text"],
                "precipitation_chance": int(day["day"]["daily_chance_of_rain"])
            })
        
        return forecast_list

async def get_uv_index(lat: float, lon: float) -> int:
    """
    UV index is included in current weather data from WeatherAPI.
    This function is kept for compatibility but not needed separately.
    
    Args:
        lat: Latitude
        lon: Longitude
    
    Returns:
        UV index (0-11+)
    """
    return 5  # Default value, actual UV comes from current weather
