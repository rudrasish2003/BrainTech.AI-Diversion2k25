import streamlit as st
import tensorflow as tf
import numpy as np
from PIL import Image
import torch
from torchvision import transforms
from transformers import SegformerForImageClassification

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

def predict_pipeline(image, model_type):
    # Step 1: Check if it's an MRI
    image_resized = image.resize((224, 224))
    image_array = np.array(image_resized) / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    mri_prediction = mri_classifier.predict(image_array)
    mri_class = mri_classes[np.argmax(mri_prediction)]
    
    if mri_class == "Not a Brain MRI":
        return "Not a Brain MRI"
    
    # Step 2: Classify MRI
    image_tensor = transform(image).unsqueeze(0)
    if model_type == "Alzheimer's":
        with torch.no_grad():
            outputs = alzheimers_model(image_tensor).logits
        predicted_class = alzheimers_classes[torch.argmax(outputs).item()]
    elif model_type == "Brain Tumor":
        with torch.no_grad():
            outputs = brain_tumor_model(image_tensor).logits
        predicted_class = brain_tumor_classes[torch.argmax(outputs).item()]
    
    return predicted_class

# Streamlit UI
st.title("MRI Scan Classification Pipeline")
st.write("Upload an image to check if it's an MRI and classify it accordingly.")

uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])
model_type = st.selectbox("Select Model Type", ["Alzheimer's", "Brain Tumor"])

if st.button("Predict") and uploaded_file is not None:
    image = Image.open(uploaded_file)
    st.image(image, caption='Uploaded Image', use_column_width=True)
    st.write("")
    st.write("Classifying...")
    result = predict_pipeline(image, model_type)
    st.write(f"Result: {result}")