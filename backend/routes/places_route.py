from flask import Blueprint, jsonify
from database.supabase_client import supabase
from services.weather_service import get_weather
from services.terrain_service import get_terrain
from services.hazard_service import get_hazards

places_bp = Blueprint("places", __name__)

# -------------------------------------------------
# GET ALL PLACES (CARD VIEW)
# -------------------------------------------------
@places_bp.route("/places", methods=["GET"])
def get_all_places():
    try:
        result = (
            supabase
            .table("places")
            .select(
                "id, name, state, category, description_short, photo_url, latitude, longitude"
            )
            .execute()
        )
        return jsonify(result.data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------------------------------------
# GET PLACE DETAILS (DETAIL VIEW)
# -------------------------------------------------
@places_bp.route("/places/<int:place_id>/details", methods=["GET"])
def get_place_details(place_id):
    try:
        result = (
            supabase
            .table("places")
            .select(
                """
                id,
                name,
                state,
                category,
                photo_url,
                latitude,
                longitude,
                description_short,
                description_long,
                best_months,
                traditions,
                safety_rating_base
                """
            )
            .eq("id", place_id)
            .single()
            .execute()
        )

        db_place = result.data
        if not db_place:
            return jsonify({"error": "Place not found"}), 404

        lat = db_place["latitude"]
        lon = db_place["longitude"]

        # 🔁 MAP DB FIELDS → FRONTEND FIELDS
        place = {
            "id": db_place["id"],
            "name": db_place["name"],
            "state": db_place["state"],
            "category": db_place["category"],
            "photo_url": db_place["photo_url"],
            "latitude": lat,
            "longitude": lon,
            "description_short": db_place["description_short"],
            "long_description": db_place["description_long"],
            "best_month": ", ".join(db_place["best_months"] or []),
            "traditions": db_place["traditions"],
            "safety_rating": db_place["safety_rating_base"]
        }

        # External services
        weather = get_weather(lat, lon)
        terrain = get_terrain(lat, lon)
        hazards = get_hazards(lat, lon)

        return jsonify({
            "place": place,
            "weather": weather,
            "terrain": terrain,
            "hazards": hazards
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
