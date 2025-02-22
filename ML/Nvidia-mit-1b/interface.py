import torch
from transformers import SegformerForImageClassification
from torchvision import transforms
from PIL import Image
import gradio as gr

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

# Define transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Prediction function for Alzheimer's
def predict_alzheimers(image):
    image = transform(image).unsqueeze(0)
    with torch.no_grad():
        outputs = alzheimers_model(image).logits
    _, predicted = torch.max(outputs, 1)
    classes = ['Mild Dementia', 'Moderate Dementia', 'Non Demented', 'Very mild Dementia']
    return classes[predicted.item()]

# Prediction function for Brain Tumor
def predict_brain_tumor(image):
    image = transform(image).unsqueeze(0)
    with torch.no_grad():
        outputs = brain_tumor_model(image).logits
    _, predicted = torch.max(outputs, 1)
    classes = ['glioma', 'meningioma', 'notumor', 'pituitary']
    return classes[predicted.item()]

def predict(image, model_type):
    if model_type == "Alzheimer's":
        return predict_alzheimers(image)
    elif model_type == "Brain Tumor":
        return predict_brain_tumor(image)

interface = gr.Interface(
    fn=predict,
    inputs=[gr.Image(type="pil"), gr.Dropdown(["Alzheimer's", "Brain Tumor"])],
    outputs=gr.Textbox(),
    title="MRI Scan Classification",
    description="Upload an MRI scan and select the type of classification."
)

interface.launch()