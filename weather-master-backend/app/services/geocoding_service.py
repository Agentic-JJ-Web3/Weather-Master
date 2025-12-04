import httpx
from app.config import settings

async def geocode_location(location: str) -> dict:
    """
    Convert city name to coordinates using WeatherAPI.com Search API.
    
    Args:
        location: City name
    
    Returns:
        Dictionary with lat, lon, and formatted location name
    """
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{settings.WEATHER_API_BASE_URL}/search.json",
            params={
                "key": settings.WEATHER_API_KEY,
                "q": location
            }
        )
        response.raise_for_status()
        data = response.json()
        
        if not data:
            raise ValueError(f"Location '{location}' not found")
        
        result = data[0]
        return {
            "lat": result["lat"],
            "lon": result["lon"],
            "name": result["name"],
            "country": result.get("country", "")
        }
