from typing import List
from app.models.weather import ClothingSuggestion, ActivitySuggestion

def get_clothing_suggestions(weather_data: dict) -> List[ClothingSuggestion]:
    """
    Generate clothing suggestions based on weather conditions.
    
    Args:
        weather_data: Dictionary with current weather information
    
    Returns:
        List of clothing suggestions by category
    """
    temp = weather_data["current_temp"]
    condition = weather_data["condition"].lower()
    wind = weather_data["wind_speed"]
    uv = weather_data["uv_index"]
    
    suggestions = []
    
    # OUTERWEAR
    if temp < 32:
        suggestions.append(ClothingSuggestion(
            category="Outerwear",
            items=["Heavy winter coat", "Insulated jacket"],
            reason="Freezing temperatures"
        ))
    elif temp < 50:
        suggestions.append(ClothingSuggestion(
            category="Outerwear",
            items=["Light jacket", "Sweater"],
            reason="Cold weather"
        ))
    elif temp < 65:
        suggestions.append(ClothingSuggestion(
            category="Outerwear",
            items=["Light cardigan", "Hoodie"],
            reason="Cool temperature"
        ))
    
    # TOP
    if temp > 85:
        suggestions.append(ClothingSuggestion(
            category="Top",
            items=["Light t-shirt", "Tank top", "Breathable fabric"],
            reason="Hot weather"
        ))
    elif temp > 70:
        suggestions.append(ClothingSuggestion(
            category="Top",
            items=["T-shirt", "Short sleeve"],
            reason="Warm weather"
        ))
    elif temp > 50:
        suggestions.append(ClothingSuggestion(
            category="Top",
            items=["Long sleeve shirt", "Light sweater"],
            reason="Mild weather"
        ))
    else:
        suggestions.append(ClothingSuggestion(
            category="Top",
            items=["Thermal shirt", "Thick sweater"],
            reason="Cold weather"
        ))
    
    # BOTTOM
    if temp > 75:
        suggestions.append(ClothingSuggestion(
            category="Bottom",
            items=["Shorts", "Light pants"],
            reason="Hot weather"
        ))
    else:
        suggestions.append(ClothingSuggestion(
            category="Bottom",
            items=["Jeans", "Long pants"],
            reason="Cool weather"
        ))
    
    # FOOTWEAR
    if "rain" in condition or "snow" in condition:
        suggestions.append(ClothingSuggestion(
            category="Footwear",
            items=["Waterproof boots", "Rain boots"],
            reason="Wet conditions"
        ))
    elif temp < 40:
        suggestions.append(ClothingSuggestion(
            category="Footwear",
            items=["Winter boots", "Warm shoes"],
            reason="Cold weather"
        ))
    elif temp > 80:
        suggestions.append(ClothingSuggestion(
            category="Footwear",
            items=["Sandals", "Light sneakers"],
            reason="Hot weather"
        ))
    else:
        suggestions.append(ClothingSuggestion(
            category="Footwear",
            items=["Sneakers", "Casual shoes"],
            reason="Comfortable weather"
        ))
    
    # ACCESSORIES
    accessories = []
    if "rain" in condition:
        accessories.append("Umbrella")
    if uv > 6:
        accessories.extend(["Sunglasses", "Sunscreen", "Hat"])
    if wind > 15:
        accessories.append("Windbreaker")
    if temp < 40:
        accessories.extend(["Gloves", "Scarf", "Beanie"])
    
    if accessories:
        suggestions.append(ClothingSuggestion(
            category="Accessories",
            items=accessories,
            reason="Weather protection"
        ))
    
    return suggestions


def get_activity_suggestions(weather_data: dict) -> List[ActivitySuggestion]:
    """
    Generate activity suggestions based on weather conditions.
    
    Args:
        weather_data: Dictionary with current weather information
    
    Returns:
        List of activity suggestions with suitability scores
    """
    temp = weather_data["current_temp"]
    condition = weather_data["condition"].lower()
    wind = weather_data["wind_speed"]
    
    activities = []
    
    # OUTDOOR ACTIVITIES
    if "clear" in condition or "sunny" in condition:
        if 60 <= temp <= 85:
            activities.append(ActivitySuggestion(
                activity="Outdoor Picnic",
                description="Perfect weather for dining outdoors",
                suitability_score=10
            ))
            activities.append(ActivitySuggestion(
                activity="Hiking",
                description="Great conditions for a nature walk",
                suitability_score=9
            ))
            activities.append(ActivitySuggestion(
                activity="Cycling",
                description="Ideal temperature for bike riding",
                suitability_score=9
            ))
        if temp > 85:
            activities.append(ActivitySuggestion(
                activity="Swimming",
                description="Hot weather perfect for pool or beach",
                suitability_score=10
            ))
            activities.append(ActivitySuggestion(
                activity="Ice Cream Run",
                description="Cool down with a frozen treat",
                suitability_score=8
            ))
    
    # RAINY DAY ACTIVITIES
    if "rain" in condition:
        activities.append(ActivitySuggestion(
            activity="Visit a Museum",
            description="Stay dry while exploring art and culture",
            suitability_score=9
        ))
        activities.append(ActivitySuggestion(
            activity="Movie Theater",
            description="Cozy indoor entertainment",
            suitability_score=8
        ))
        activities.append(ActivitySuggestion(
            activity="Read a Book at Café",
            description="Perfect weather for a hot beverage and reading",
            suitability_score=9
        ))
    
    # FITNESS ACTIVITIES
    if wind < 10 and not ("rain" in condition or "snow" in condition):
        if 50 <= temp <= 75:
            activities.append(ActivitySuggestion(
                activity="Outdoor Running",
                description="Comfortable temperature for cardio",
                suitability_score=9
            ))
        else:
            activities.append(ActivitySuggestion(
                activity="Indoor Gym Workout",
                description="Better to exercise indoors",
                suitability_score=7
            ))
    else:
        activities.append(ActivitySuggestion(
            activity="Yoga or Home Workout",
            description="Indoor fitness option",
            suitability_score=8
        ))
    
    # SOCIAL ACTIVITIES
    if 65 <= temp <= 80 and "clear" in condition:
        activities.append(ActivitySuggestion(
            activity="Outdoor Café",
            description="Perfect for meeting friends outside",
            suitability_score=9
        ))
    
    # COLD WEATHER ACTIVITIES
    if temp < 40:
        if "snow" in condition:
            activities.append(ActivitySuggestion(
                activity="Skiing or Snowboarding",
                description="Great conditions for winter sports",
                suitability_score=10
            ))
        activities.append(ActivitySuggestion(
            activity="Cozy Movie Night",
            description="Bundle up indoors with hot chocolate",
            suitability_score=9
        ))
    
    # Sort by suitability score and return top 5
    activities.sort(key=lambda x: x.suitability_score, reverse=True)
    return activities[:5]
