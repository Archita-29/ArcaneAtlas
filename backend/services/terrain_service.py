import requests

def get_terrain(lat, lng):
    """
    Fetch terrain elevation from OpenTopoData (test dataset).
    """
    url = f"https://api.opentopodata.org/v1/test-dataset?locations={lat},{lng}"
    r = requests.get(url)

    if r.status_code != 200:
        return {
            "error": "Terrain API failed",
            "status": r.status_code,
            "source": "OpenTopoData API"
        }

    data = r.json()
    data["source"] = "OpenTopoData API"

    # Add fallback if no elevation
    if "results" in data and data["results"]:
        if data["results"][0].get("elevation") is None:
            data["results"][0]["elevation"] = "unknown"

    return data
