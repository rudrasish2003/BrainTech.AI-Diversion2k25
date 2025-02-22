import torch
import torch.nn as nn
import torchvision.models as models
from torchvision import transforms
from PIL import Image
import gradio as gr

# Load the model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = models.efficientnet_b0(weights=None)
model.classifier[1] = nn.Linear(model.classifier[1].in_features, 4)  # Adjust for your number of classes
model.load_state_dict(torch.load('efficientnet_brain_tumor.pth', map_location=device))
model = model.to(device)
model.eval()

# Define the transform
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Define the prediction function
def predict_image(image):
    image = Image.fromarray(image)
    input_image = transform(image).unsqueeze(0).to(device)
    with torch.no_grad():
        output = model(input_image)
        _, predicted = torch.max(output, 1)
    classes = ['glioma', 'meningioma', 'notumor', 'pituitary']  # Adjust based on your classes
    return classes[predicted.item()]

# Create the Gradio interface
interface = gr.Interface(
    fn=predict_image,
    inputs=gr.Image(type="numpy"),
    outputs="text",
    title="Brain Tumor Classification",
    description="Upload an MRI scan to classify the type of brain tumor."
)

# Launch the interface
interface.launch()