"""
Utility helper functions for data transformation and formatting.
"""

def format_temperature(temp: float, unit: str = "F") -> str:
    """
    Format temperature with unit symbol.
    
    Args:
        temp: Temperature value
        unit: Unit (F or C)
    
    Returns:
        Formatted temperature string
    """
    return f"{temp:.1f}°{unit}"


def kelvin_to_fahrenheit(kelvin: float) -> float:
    """
    Convert Kelvin to Fahrenheit.
    
    Args:
        kelvin: Temperature in Kelvin
    
    Returns:
        Temperature in Fahrenheit
    """
    return (kelvin - 273.15) * 9/5 + 32


def kelvin_to_celsius(kelvin: float) -> float:
    """
    Convert Kelvin to Celsius.
    
    Args:
        kelvin: Temperature in Kelvin
    
    Returns:
        Temperature in Celsius
    """
    return kelvin - 273.15
