from fastapi import APIRouter, HTTPException, Query
from app.models.weather import (
    LocationRequest,
    WeatherResponse,
    ForecastItem,
    CompleteSuggestions
)
from app.services import weather_service, suggestion_service
from typing import List

router = APIRouter()


@router.get("/weather/current", response_model=WeatherResponse)
async def get_current_weather(location: str = Query(..., description="City name")):
    """
    Get current weather for a location.
    
    Args:
        location: City name (e.g., "London", "New York")
    
    Returns:
        Current weather data
    """
    try:
        weather_data = await weather_service.get_current_weather(location)
        return WeatherResponse(**weather_data)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Location not found: {str(e)}")


@router.get("/weather/forecast", response_model=List[ForecastItem])
async def get_forecast(
    location: str = Query(..., description="City name"),
    days: int = Query(5, ge=1, le=7, description="Number of days")
):
    """
    Get weather forecast for a location.
    
    Args:
        location: City name
        days: Number of days to forecast (1-7)
    
    Returns:
        List of forecast items
    """
    try:
        forecast_data = await weather_service.get_forecast(location, days)
        return [ForecastItem(**item) for item in forecast_data]
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Forecast not available: {str(e)}")


@router.post("/suggestions", response_model=CompleteSuggestions)
async def get_complete_suggestions(request: LocationRequest):
    """
    Get complete weather data with clothing and activity suggestions.
    
    Args:
        request: Location request with city name
    
    Returns:
        Complete suggestions including weather, forecast, clothing, and activities
    """
    try:
        # Get weather data
        weather_data = await weather_service.get_current_weather(request.location)
        forecast_data = await weather_service.get_forecast(request.location, 5)
        
        # Generate suggestions
        clothing = suggestion_service.get_clothing_suggestions(weather_data)
        activities = suggestion_service.get_activity_suggestions(weather_data)
        
        # Combine all data
        return CompleteSuggestions(
            weather=WeatherResponse(**weather_data),
            forecast=[ForecastItem(**item) for item in forecast_data],
            clothing=clothing,
            activities=activities
        )
    except Exception as e:
        raise HTTPException(
            status_code=404,
            detail=f"Unable to fetch suggestions: {str(e)}"
        )
