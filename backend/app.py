from flask import Flask
from flask_cors import CORS
from routes.places_route import places_bp

app = Flask(__name__)
CORS(app)  # allow frontend (React) to call this API

# register routes
app.register_blueprint(places_bp, url_prefix="/api")

@app.route("/health")
def health():
    return {"status": "ok", "message": "Backend is running"}, 200

if __name__ == "__main__":
    app.run(debug=True)
