import gradio as gr
from keras._tf_keras.keras.models import load_model
import numpy as np
import tensorflow as tf
from PIL import Image
import google.generativeai as genai

# Load the trained model
model = load_model("alzheimers_detection_model.h5")

# Define label mapping
class_labels = ["Mild Dementia", "Moderate Dementia", "Non Demented", "Very Mild Dementia"]

# Configure Gemini API
genai.configure(api_key="AIzaSyDD8QW1BggDVVMLteDygHCHrD6Ff9Dy0e8")
gemini_model = genai.GenerativeModel("gemini-1.5-flash")

# Preprocess function
def preprocess_image(image):
    image = image.resize((224, 224))  # Resize to match the model's input shape
    image = np.array(image) / 255.0  # Normalize pixel values
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

# Format function for insights
def format_insights(insights):
    formatted_insights = insights.replace("\n", "<br>").replace("**", "<b>").replace("*", "</b>")
    return formatted_insights

# Prediction function
def predict_alzheimers(image):
    # Preprocess the input image
    processed_image = preprocess_image(image)
    # Make prediction
    predictions = model.predict(processed_image)
    # Get the predicted class
    predicted_class = class_labels[np.argmax(predictions)]
    # Confidence for each class
    confidences = {class_labels[i]: float(predictions[0][i]) for i in range(len(class_labels))}
    
    # Generate insight using Gemini
    query = f"Generate insights about Alzheimer's based on the prediction: {predicted_class}"
    response = gemini_model.generate_content(query)
    insights = response.text
    
    # Format insights
    formatted_insights = format_insights(insights)
    
    return f"Predicted Class: {predicted_class}", confidences, formatted_insights

# Build Gradio interface
interface = gr.Interface(
    fn=predict_alzheimers,
    inputs=gr.Image(type="pil", label="Upload Brain MRI Image"),
    outputs=[
        gr.Textbox(label="Diagnosis"),
        gr.Label(label="Confidence Scores"),
        gr.HTML(label="Insights")
    ],
    title="Alzheimer's Detection with Insights",
    description="Upload a brain MRI image to detect the stage of Alzheimer's disease and generate insights.",
)

# Launch the interface
interface.launch()
