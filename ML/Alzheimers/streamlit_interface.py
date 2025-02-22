import streamlit as st
from keras._tf_keras.keras.models import load_model
import numpy as np
from PIL import Image

# Load the trained model
model = load_model("alzheimers_detection_model.h5")

# Define label mapping
class_labels = ["Mild Dementia", "Moderate Dementia", "Non Demented", "Very Mild Dementia"]

# Preprocess function
def preprocess_image(image):
    image = image.resize((224, 224))  # Resize to match the model's input shape
    image = np.array(image) / 255.0  # Normalize pixel values
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

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
    return predicted_class, confidences

# Streamlit Interface
st.title("Alzheimer's Detection from Brain MRI")
st.write("Upload a brain MRI image to detect the stage of Alzheimer's disease.")

# File uploader
uploaded_file = st.file_uploader("Choose an MRI image", type=["jpg", "jpeg", "png"])

if uploaded_file is not None:
    # Display the uploaded image
    image = Image.open(uploaded_file)
    st.image(image, caption="Uploaded Image", use_column_width=True)

    # Predict button
    if st.button("Predict"):
        with st.spinner("Analyzing..."):
            predicted_class, confidences = predict_alzheimers(image)
        # Display results
        st.success(f"**Predicted Class**: {predicted_class}")
        st.subheader("Confidence Scores:")
        for label, confidence in confidences.items():
            st.write(f"{label}: {confidence:.2f}")
