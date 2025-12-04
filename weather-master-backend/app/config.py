from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    WEATHER_API_KEY: str
    WEATHER_API_BASE_URL: str = "http://api.weatherapi.com/v1"
    CORS_ORIGINS: str = "http://localhost:3000"
    
    class Config:
        env_file = ".env"

settings = Settings()
