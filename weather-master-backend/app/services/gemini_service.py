import google.generativeai as genai
from app.config import settings
from typing import Dict, List
import json

class GeminiService:
    """Service for generating AI-powered suggestions using Google Gemini."""
    
    def __init__(self):
        """Initialize Gemini AI with API key."""
        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel('gemini-2.5-flash')
            self.enabled = True
        else:
            self.enabled = False
    
    def _build_weather_context(self, weather_data: dict, forecast_data: List[dict]) -> str:
        """Build comprehensive weather context for AI."""
        context = f"""
Current Weather Information:
- Location: {weather_data.get('location', 'Unknown')}
- Temperature: {weather_data.get('current_temp', 0)}°F
- Feels Like: {weather_data.get('feels_like', 0)}°F
- Condition: {weather_data.get('condition', 'Unknown')}
- Humidity: {weather_data.get('humidity', 0)}%
- Wind Speed: {weather_data.get('wind_speed', 0)} mph
- UV Index: {weather_data.get('uv_index', 0)}
- Visibility: {weather_data.get('visibility', 0)} miles

5-Day Forecast:
"""
        for day in forecast_data[:5]:
            context += f"- {day.get('date', 'Unknown')}: {day.get('condition', 'Unknown')}, High: {day.get('max_temp', 0)}°F, Low: {day.get('min_temp', 0)}°F\n"
        
        return context
    
    async def generate_clothing_suggestions(self, weather_data: dict, forecast_data: List[dict]) -> List[Dict]:
        """Generate AI-powered clothing suggestions."""
        if not self.enabled:
            return []
        
        try:
            context = self._build_weather_context(weather_data, forecast_data)
            
            prompt = f"""{context}

Based on the current weather conditions and forecast, provide clothing suggestions organized by category.
Return ONLY a valid JSON array with this exact structure (no markdown, no code blocks, just raw JSON):
[
  {{"category": "Outerwear", "items": ["item1", "item2"], "reason": "explanation"}},
  {{"category": "Top", "items": ["item1", "item2"], "reason": "explanation"}},
  {{"category": "Bottom", "items": ["item1", "item2"], "reason": "explanation"}},
  {{"category": "Footwear", "items": ["item1", "item2"], "reason": "explanation"}},
  {{"category": "Accessories", "items": ["item1", "item2"], "reason": "explanation"}}
]

Consider:
- Current temperature and feels-like temperature
- Weather conditions (rain, snow, sun, etc.)
- Wind speed and UV index
- Upcoming forecast changes
- Practical and stylish recommendations"""

            response = self.model.generate_content(prompt)
            
            # Clean the response text
            text = response.text.strip()
            # Remove markdown code blocks if present
            if text.startswith("```"):
                text = text.split("```")[1]
                if text.startswith("json"):
                    text = text[4:]
                text = text.strip()
            
            suggestions = json.loads(text)
            return suggestions
            
        except Exception as e:
            print(f"Gemini clothing suggestions error: {str(e)}")
            return []
    
    async def generate_activity_suggestions(self, weather_data: dict, forecast_data: List[dict]) -> List[Dict]:
        """Generate AI-powered activity suggestions."""
        if not self.enabled:
            return []
        
        try:
            context = self._build_weather_context(weather_data, forecast_data)
            
            prompt = f"""{context}

Based on the current weather conditions and forecast, suggest 5 activities with suitability scores.
Return ONLY a valid JSON array with this exact structure (no markdown, no code blocks, just raw JSON):
[
  {{"activity": "Activity Name", "description": "Why this is suitable", "suitability_score": 9}},
  {{"activity": "Activity Name", "description": "Why this is suitable", "suitability_score": 8}}
]

Requirements:
- Provide exactly 5 activities
- Suitability scores from 1-10 (10 being perfect)
- Mix of indoor and outdoor activities based on conditions
- Consider temperature, precipitation, wind, and UV
- Be creative and practical
- Sort by suitability score (highest first)"""

            response = self.model.generate_content(prompt)
            
            # Clean the response text
            text = response.text.strip()
            # Remove markdown code blocks if present
            if text.startswith("```"):
                text = text.split("```")[1]
                if text.startswith("json"):
                    text = text[4:]
                text = text.strip()
            
            suggestions = json.loads(text)
            return suggestions[:5]  # Ensure only 5 activities
            
        except Exception as e:
            print(f"Gemini activity suggestions error: {str(e)}")
            return []

# Singleton instance
gemini_service = GeminiService()


