import streamlit as st
import tensorflow as tf
import numpy as np
from PIL import Image
import torch
from torchvision import transforms
from transformers import SegformerForImageClassification
import google.generativeai as genai
import io

# Initialize Gemini API
genai.configure(api_key="####")
gemini_model = genai.GenerativeModel('gemini-2.0-flash')

# Load the MRI vs Non-MRI model
mri_classifier = tf.keras.models.load_model("alzheimers_detection_model.h5")

# Load Alzheimer's and Brain Tumor models
alzheimers_model = SegformerForImageClassification.from_pretrained('nvidia/mit-b1')
alzheimers_model.classifier = torch.nn.Linear(alzheimers_model.classifier.in_features, 4)
alzheimers_model.load_state_dict(torch.load('alzheimers_model.pth', map_location=torch.device('cpu')))
alzheimers_model.eval()

brain_tumor_model = SegformerForImageClassification.from_pretrained('nvidia/mit-b1')
brain_tumor_model.classifier = torch.nn.Linear(brain_tumor_model.classifier.in_features, 4)
brain_tumor_model.load_state_dict(torch.load('brain_tumor_model.pth', map_location=torch.device('cpu')))
brain_tumor_model.eval()

# Define class labels
mri_classes = ["Brain MRI", "Not a Brain MRI"]
alzheimers_classes = ['Mild Dementia', 'Moderate Dementia', 'Non Demented', 'Very mild Dementia']
brain_tumor_classes = ['glioma', 'meningioma', 'notumor', 'pituitary']

# Define transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

def generate_medical_report(diagnosis):
    prompt = f"""
    Generate a detailed medical report for a patient diagnosed with {diagnosis}.
    Include possible causes, symptoms, treatment options, and prognosis.
    Conclude the report with the signature: Team BrainTech.ai.
    """
    response = gemini_model.generate_content(prompt)
    return response.text.strip()

def predict_pipeline(image, model_type):
    # Step 1: Check if it's an MRI
    image_resized = image.resize((224, 224))
    image_array = np.array(image_resized) / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    mri_prediction = mri_classifier.predict(image_array)
    mri_class = mri_classes[np.argmax(mri_prediction)]
    mri_confidence = np.max(mri_prediction) * 100  # Confidence score in %

    if mri_class == "Not a Brain MRI":
        return "Not a Brain MRI", None, None

    # Step 2: Classify MRI
    image_tensor = transform(image).unsqueeze(0)
    if model_type == "Alzheimer's":
        with torch.no_grad():
            outputs = alzheimers_model(image_tensor).logits
        probabilities = torch.nn.functional.softmax(outputs, dim=1)
        confidence = torch.max(probabilities).item() * 100  # Confidence in %
        predicted_class = alzheimers_classes[torch.argmax(outputs).item()]
    elif model_type == "Brain Tumor":
        with torch.no_grad():
            outputs = brain_tumor_model(image_tensor).logits
        probabilities = torch.nn.functional.softmax(outputs, dim=1)
        confidence = torch.max(probabilities).item() * 100  # Confidence in %
        predicted_class = brain_tumor_classes[torch.argmax(outputs).item()]
    
    # Step 3: Generate medical report
    report = generate_medical_report(predicted_class)

    return predicted_class, confidence, report

def download_report(report_text):
    """Convert report text into a downloadable format."""
    buffer = io.BytesIO()
    buffer.write(report_text.encode())
    buffer.seek(0)
    return buffer

# Streamlit UI
st.title("MRI Scan Classification Pipeline with Gemini AI")
st.write("Upload an image to check if it's an MRI, classify it, view confidence scores, and get an AI-generated medical report.")

uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])
model_type = st.selectbox("Select Model Type", ["Alzheimer's", "Brain Tumor"])

if st.button("Predict") and uploaded_file is not None:
    image = Image.open(uploaded_file)
    st.image(image, caption='Uploaded Image', use_column_width=True)
    st.write("Classifying...")

    # Run the prediction pipeline
    result, confidence, report = predict_pipeline(image, model_type)

    # Display results
    st.write(f"**Prediction:** {result}")
    if confidence is not None:
        st.write(f"**Confidence Score:** {confidence:.2f}%")

    # Display AI-Generated Report
    if report:
        st.subheader("AI-Generated Medical Report")
        st.write(report)

        # Download Report Button
        report_buffer = download_report(report)
        st.download_button(
            label="Download Medical Report",
            data=report_buffer,
            file_name=f"medical_report_{result.replace(' ', '_')}.txt",
            mime="text/plain"
        )

        # Warning Banner
        st.warning("⚠️ Please consult a doctor before taking any medical decisions based on this report.")