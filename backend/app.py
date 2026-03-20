from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import joblib
import numpy as np
import os
app = Flask(__name__, static_folder="../frontend/dist", static_url_path="/")CORS(app)

# load your trained model
model = joblib.load("mental_stress_model.pkl")

@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def serve_react(path):    
    return send_from_directory(app.static_folder, "index.html")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    try:
        age = float(data["age"])
        stress = float(data["stress_level"])
        sleep = float(data["sleep_quality"])
    except:
        return jsonify({"error":"Invalid input. Please enter numeric values."})

    features = np.array([age, stress, sleep]).reshape(1,-1)

    prediction = model.predict(features)

    return jsonify({"prediction": int(prediction[0])})

if __name__ == "__main__":
    port = int(os.environ.get("PORT",5000))
    app.run(host="0.0.0.0",port=port)