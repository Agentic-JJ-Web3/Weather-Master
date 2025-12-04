# Weather Master

A smart weather application that provides weather forecasts with intelligent suggestions for clothing and activities based on current and forecasted conditions.

## 🌟 Features

- **Current Weather**: Real-time weather data with temperature, humidity, wind speed, and UV index
- **5-Day Forecast**: Extended weather forecast with daily high/low temperatures
- **Clothing Suggestions**: Smart recommendations for what to wear based on weather conditions
- **Activity Suggestions**: Personalized activity recommendations with suitability scores
- **Beautiful UI**: Modern, responsive design with glassmorphism effects and smooth animations

## 🏗️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Pydantic** - Data validation and settings management
- **httpx** - Async HTTP client for API calls
- **WeatherAPI.com** - Weather data provider

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API communication

## 📦 Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- WeatherAPI.com API key (free at https://www.weatherapi.com/signup.aspx)

### Backend Setup

```bash
cd weather-master-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
# Edit .env file and add your WeatherAPI.com API key
WEATHER_API_KEY=your_api_key_here
WEATHER_API_BASE_URL=http://api.weatherapi.com/v1
```

### Frontend Setup

```bash
cd weather-master-frontend

# Install dependencies
npm install

# Configure environment variables
# .env.local is already configured for local development
```

## 🚀 Running the Application

### Start Backend Server

```bash
cd weather-master-backend
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000

### Start Frontend Development Server

```bash
cd weather-master-frontend
npm run dev
```

The application will be available at http://localhost:3000

## 📚 API Endpoints

### Health Check
```
GET /api/health
```

### Current Weather
```
GET /api/weather/current?location={city_name}
```

### Weather Forecast
```
GET /api/weather/forecast?location={city_name}&days={5}
```

### Complete Suggestions
```
POST /api/suggestions
Body: { "location": "New York" }
```

## 🎨 Project Structure

```
weather-master/
├── weather-master-backend/
│   ├── app/
│   │   ├── models/          # Pydantic models
│   │   ├── services/        # Business logic
│   │   ├── routers/         # API endpoints
│   │   ├── utils/           # Utility functions
│   │   ├── config.py        # Configuration
│   │   └── main.py          # FastAPI app
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env
└── weather-master-frontend/
    ├── src/
    │   ├── app/             # Next.js pages
    │   ├── components/      # React components
    │   ├── services/        # API client
    │   ├── types/           # TypeScript types
    │   └── utils/           # Utility functions
    ├── package.json
    └── .env.local
```

## 🧠 How It Works

### Clothing Suggestions Algorithm
The app analyzes:
- Temperature (for layering decisions)
- Precipitation (for waterproof items)
- Wind speed (for windbreakers)
- UV index (for sun protection)

### Activity Suggestions Algorithm
The app considers:
- Weather conditions (clear, rainy, snowy)
- Temperature range (for outdoor vs indoor activities)
- Wind conditions (for sports activities)
- Time-appropriate suggestions

## 🚢 Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Add environment variables
5. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

## 📝 Environment Variables

### Backend (.env)
```
WEATHER_API_KEY=your_weatherapi_key_here
WEATHER_API_BASE_URL=http://api.weatherapi.com/v1
CORS_ORIGINS=http://localhost:3000,https://your-frontend-url.vercel.app
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
# For production:
# NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Icons and emojis for visual enhancement
- Tailwind CSS for beautiful styling
