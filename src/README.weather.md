Weather Dashboard

This dashboard uses OpenWeatherMap's free APIs to fetch current weather and a 5-day forecast based on city name.

How to get an API key
1. Sign up for a free account at https://openweathermap.org/
2. Generate an API key from your account dashboard.

How to run the dashboard
1. Do NOT commit your API key. Instead enter it in the page's API key input and click "Save key" — it will be stored locally in your browser's localStorage only.
2. Open the page in a browser:
   - Serve the repo root with a static server (recommended):
     python3 -m http.server 8000
     Visit: http://localhost:8000/weather.html
   - Or open weather.html directly (some browsers block fetches when using file://).

Notes
- The client-side app calls the OpenWeatherMap endpoints directly from the browser. This is suitable for demo / learning. For production, consider using a server-side proxy to keep your API key secret.
- The app saves the API key in localStorage under key: `iyf:owm_api_key:v1` so you don't have to re-enter it each time.
