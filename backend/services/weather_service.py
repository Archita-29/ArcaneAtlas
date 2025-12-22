import os
import requests
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")

def get_weather(lat, lng):
    """
    Fetch weather for given coordinates from OpenWeather API.
    """
    if not OPENWEATHER_API_KEY:
        return {"error": "Missing OPENWEATHER_API_KEY", "source": "OpenWeather"}

    url = (
        f"https://api.openweathermap.org/data/2.5/weather?"
        f"lat={lat}&lon={lng}&appid={OPENWEATHER_API_KEY}&units=metric"
    )
    r = requests.get(url)

    if r.status_code != 200:
        return {
            "error": "Weather API failed",
            "status": r.status_code,
            "source": "OpenWeather"
        }

    data = r.json()

    # Convert timestamps
    if "sys" in data:
        if "sunrise" in data["sys"]:
            data["sys"]["sunrise"] = datetime.utcfromtimestamp(
                data["sys"]["sunrise"]
            ).isoformat()
        if "sunset" in data["sys"]:
            data["sys"]["sunset"] = datetime.utcfromtimestamp(
                data["sys"]["sunset"]
            ).isoformat()

    if "dt" in data:
        data["dt"] = datetime.utcfromtimestamp(data["dt"]).isoformat()

    data["source"] = "OpenWeather"
    return data
