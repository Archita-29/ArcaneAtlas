import requests
from datetime import datetime

def get_hazards(lat, lng):
    """
    Fetch hazard / earthquake risks from USGS API within 200 km radius.
    """
    url = (
        "https://earthquake.usgs.gov/fdsnws/event/1/query?"
        f"format=geojson&latitude={lat}&longitude={lng}&maxradiuskm=200"
    )

    r = requests.get(url)

    if r.status_code != 200:
        return {
            "error": "Hazards API failed",
            "status": r.status_code,
            "source": "USGS Earthquake API"
        }

    data = r.json()

    # Convert metadata timestamp (ms) -> readable
    if "metadata" in data and "generated" in data["metadata"]:
        data["metadata"]["generated"] = datetime.utcfromtimestamp(
            data["metadata"]["generated"] / 1000
        ).isoformat()

    # If no hazards, add a safe placeholder
    if "features" in data and len(data["features"]) == 0:
        data["features"].append({
            "type": "Feature",
            "properties": {
                "mag": 0.0,
                "place": "No recent seismic activity detected nearby",
                "time": datetime.utcnow().isoformat()
            },
            "geometry": {
                "type": "Point",
                "coordinates": [lng, lat, 0]
            },
            "id": "safe_zone"
        })

    data["source"] = "USGS Earthquake API"
    return data
