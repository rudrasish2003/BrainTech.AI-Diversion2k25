from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import torch
from torchvision import transforms
from transformers import SegformerForImageClassification
import google.generativeai as genai
import io

app = Flask(__name__)

# Initialize Gemini API
genai.configure(api_key="AIzaSyDD8QW1BggDVVMLteDygHCHrD6Ff9Dy0e8")
gemini_model = genai.GenerativeModel('gemini-2.0-flash')

# Load models
mri_classifier = tf.keras.models.load_model("models/alzheimers_detection_model.h5")

alzheimers_model = SegformerForImageClassification.from_pretrained('nvidia/mit-b1')
alzheimers_model.classifier = torch.nn.Linear(alzheimers_model.classifier.in_features, 4)
alzheimers_model.load_state_dict(torch.load('models/alzheimers_model.pth', map_location=torch.device('cpu')))
alzheimers_model.eval()

brain_tumor_model = SegformerForImageClassification.from_pretrained('nvidia/mit-b1')
brain_tumor_model.classifier = torch.nn.Linear(brain_tumor_model.classifier.in_features, 4)
brain_tumor_model.load_state_dict(torch.load('models/brain_tumor_model.pth', map_location=torch.device('cpu')))
brain_tumor_model.eval()

# Class labels
mri_classes = ["Brain MRI", "Not a Brain MRI"]
alzheimers_classes = ['Mild Dementia', 'Moderate Dementia', 'Non Demented', 'Very mild Dementia']
brain_tumor_classes = ['glioma', 'meningioma', 'notumor', 'pituitary']

# Transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['file']
    model_type = request.form.get('model_type')
    
    image = Image.open(file)
    
    # MRI Validation
    image_resized = image.resize((224, 224))
    image_array = np.array(image_resized) / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    mri_prediction = mri_classifier.predict(image_array)
    mri_class = mri_classes[np.argmax(mri_prediction)]
    
    if mri_class == "Not a Brain MRI":
        return jsonify({'result': "Not a Brain MRI", 'confidence': None, 'report': None})

    # MRI Classification
    image_tensor = transform(image).unsqueeze(0)
    if model_type == "Alzheimer's":
        with torch.no_grad():
            outputs = alzheimers_model(image_tensor).logits
        predicted_class = alzheimers_classes[torch.argmax(outputs).item()]
        confidence = torch.max(torch.nn.functional.softmax(outputs, dim=1)).item() * 100
    elif model_type == "Brain Tumor":
        with torch.no_grad():
            outputs = brain_tumor_model(image_tensor).logits
        predicted_class = brain_tumor_classes[torch.argmax(outputs).item()]
        confidence = torch.max(torch.nn.functional.softmax(outputs, dim=1)).item() * 100
    else:
        return jsonify({'error': 'Invalid model type'}), 400

    # Generate Report
    report = generate_medical_report(predicted_class)

    return jsonify({'result': predicted_class, 'confidence': confidence, 'report': report})

def generate_medical_report(diagnosis):
    prompt = f"Generate a detailed medical report for {diagnosis}, including causes, symptoms, treatments, and prognosis. Conclude with: Team BrainTech.ai."
    response = gemini_model.generate_content(prompt)
    return response.text.strip()

if __name__ == '__main__':
    app.run(debug=True)
