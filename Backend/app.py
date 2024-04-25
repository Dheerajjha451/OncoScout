import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np

# Flask application initialization
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests
# Load the tumor  model
model = load_model("tumor_model.keras")
# List of class labels for the tumor prediction
class_names = ['Glioma', 'Meningioma', 'no tumor', 'Pituitary']


@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    try:
        
        image = Image.open(file)
         # Preprocess the image for the model's input format
        # (resize, convert to NumPy array, normalize pixel values)
        image = image.resize((256, 256))
        image = np.array(image)
        image = image / 255.0

        # Make a prediction using the loaded model
        prediction = model.predict(image[np.newaxis, ...])
        predicted_class = class_names[np.argmax(prediction)]

        
        return jsonify({"prediction": predicted_class})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)