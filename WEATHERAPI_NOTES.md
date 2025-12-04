# WeatherAPI.com Integration Notes

## API Change Summary

The backend has been updated to use **WeatherAPI.com** instead of OpenWeatherMap.

## Key Differences

### API Endpoints
- **Current Weather**: `http://api.weatherapi.com/v1/current.json`
- **Forecast**: `http://api.weatherapi.com/v1/forecast.json`
- **Search/Geocoding**: `http://api.weatherapi.com/v1/search.json`

### Parameter Changes
- API key parameter: `key` (instead of `appid`)
- No need to specify units (returns both Fahrenheit and Celsius)
- UV index included in current weather response

### Free Tier Limitations
- **Forecast days**: 3 days (free tier) vs 5 days requested
  - The code automatically limits to 3 days: `days = min(days, 3)`
- **Calls per month**: 1 million (generous free tier)

## Updated Files

1. **config.py**: Changed base URL to `http://api.weatherapi.com/v1`
2. **weather_service.py**: 
   - Updated endpoints to use `.json` format
   - Changed parameter from `appid` to `key`
   - Updated response parsing for WeatherAPI.com structure
   - UV index now included directly (no separate call needed)
3. **geocoding_service.py**: Updated to use WeatherAPI search endpoint
4. **.env**: Template updated with WeatherAPI.com configuration
5. **README.md**: Documentation updated throughout

## Getting Your API Key

1. Visit: https://www.weatherapi.com/signup.aspx
2. Sign up for free account
3. Get your API key from the dashboard
4. Add to `.env` file:
   ```
   WEATHER_API_KEY=your_actual_key_here
   ```

## Response Structure Differences

### Current Weather
```python
# WeatherAPI.com structure
data["location"]["name"]           # City name
data["current"]["temp_f"]          # Temperature in Fahrenheit
data["current"]["feelslike_f"]     # Feels like temperature
data["current"]["condition"]["text"] # Condition description
data["current"]["humidity"]        # Humidity percentage
data["current"]["wind_mph"]        # Wind speed in mph
data["current"]["uv"]              # UV index (included!)
```

### Forecast
```python
# WeatherAPI.com structure
data["forecast"]["forecastday"]    # Array of forecast days
day["date"]                        # Date string
day["day"]["maxtemp_f"]           # High temperature
day["day"]["mintemp_f"]           # Low temperature
day["day"]["condition"]["text"]   # Condition
day["day"]["daily_chance_of_rain"] # Precipitation chance
```

## Benefits of WeatherAPI.com

✅ **Simpler API**: More straightforward response structure
✅ **UV Index Included**: No need for separate API call
✅ **Better Free Tier**: 1 million calls/month
✅ **Cleaner Data**: Well-organized JSON responses
✅ **Active Support**: Good documentation and community

## Note on Forecast Days

The UI shows "5-Day Forecast" but WeatherAPI.com free tier provides 3 days. You can:
1. Keep it as is (shows 3 days)
2. Upgrade to paid plan for more days
3. Update UI text to "3-Day Forecast"
