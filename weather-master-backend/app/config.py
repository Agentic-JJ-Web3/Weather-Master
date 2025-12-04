from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    WEATHER_API_KEY: str
    WEATHER_API_BASE_URL: str = "https://weatherapi.com/v1"
    CORS_ORIGINS: str = "http://localhost:3000,https://weather-master-three.vercel.app"
    GEMINI_API_KEY: str = "AIzaSyD5YYcbIviamb9w9y3xBX2eoQ8A-TtqTLI"
    
    class Config:
        env_file = ".env"

settings = Settings()
