from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import weather

app = FastAPI(title="Weather Master API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    Access-Control-Allow-Origin=settings.CORS_ORIGINS.split(",")
)

# Include routers
app.include_router(weather.router, prefix="/api", tags=["weather"])

@app.get("/")
async def root():
    return {"message": "Weather Master API"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}
