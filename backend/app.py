from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# load your trained model
model = joblib.load("mental_stress_model.pkl")

@app.route("/")
def home():
    return "Mental Stress Prediction API Running"

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
    app.run(debug=True)