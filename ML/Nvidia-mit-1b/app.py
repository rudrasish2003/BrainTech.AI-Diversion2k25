import gradio as gr
import tensorflow as tf
import numpy as np
from PIL import Image
import torch
from transformers import SegformerForImageClassification
from torchvision import transforms

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Load the MRI vs Non-MRI model
mri_classifier = tf.keras.models.load_model("alzheimers_detection_model.h5")

# Load Alzheimer's model
alzheimers_model = SegformerForImageClassification.from_pretrained('nvidia/mit-b1')
alzheimers_model.classifier = torch.nn.Linear(alzheimers_model.classifier.in_features, 4)  # 4 classes
alzheimers_model.load_state_dict(torch.load('alzheimers_model.pth', map_location=torch.device('cpu')))
alzheimers_model.eval()

# Load Brain Tumor model
brain_tumor_model = SegformerForImageClassification.from_pretrained('nvidia/mit-b1')
brain_tumor_model.classifier = torch.nn.Linear(brain_tumor_model.classifier.in_features, 4)  # 4 classes
brain_tumor_model.load_state_dict(torch.load('brain_tumor_model.pth', map_location=torch.device('cpu')))
brain_tumor_model.eval()

# Define class labels
mri_classes = ["Brain MRI", "Not a Brain MRI"]
alzheimers_classes = ['Mild Dementia', 'Moderate Dementia', 'Non Demented', 'Very mild Dementia']
brain_tumor_classes = ['glioma', 'meningioma', 'notumor', 'pituitary']

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

# Define Gradio Interface
interface = gr.Interface(
    fn=predict_pipeline,
    inputs=[gr.Image(type="pil"), gr.Dropdown(["Alzheimer's", "Brain Tumor"])],
    outputs=gr.Textbox(),
    title="MRI Scan Classification Pipeline",
    description="Upload an image to check if it's an MRI and classify it accordingly."
)

# Launch the Gradio app
interface.launch()