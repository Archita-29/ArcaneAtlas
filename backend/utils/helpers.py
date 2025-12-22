from datetime import datetime
import math

def to_iso(timestamp):
    """Convert UNIX timestamp -> ISO string."""
    if timestamp is None:
        return None
    return datetime.utcfromtimestamp(timestamp).isoformat()

def ms_to_iso(ms_timestamp):
    """Convert milliseconds timestamp -> ISO string."""
    if ms_timestamp is None:
        return None
    return datetime.utcfromtimestamp(ms_timestamp / 1000).isoformat()

def calculate_risk(hazards):
    """
    Given USGS hazard data, return a risk score from 1 (safe) to 5 (high risk).
    """
    if "features" not in hazards or len(hazards["features"]) == 0:
        return 1

    mags = []
    for f in hazards["features"]:
        try:
            mag = f["properties"].get("mag")
            if isinstance(mag, (int, float)):
                mags.append(mag)
        except Exception:
            continue

    if not mags:
        return 1

    m = max(mags)

    if m < 3: return 1
    if m < 4: return 2
    if m < 5: return 3
    if m < 6: return 4
    return 5

def calculate_distance(lat1, lon1, lat2, lon2):
    """
    Distance between two coordinates in KM using Haversine formula.
    """
    R = 6371  # km
    from math import radians, sin, cos, sqrt, atan2

    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)

    a = (
        sin(dlat/2)**2 +
        cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2)**2
    )
    c = 2 * atan2(sqrt(a), sqrt(1-a))
    return R * c
