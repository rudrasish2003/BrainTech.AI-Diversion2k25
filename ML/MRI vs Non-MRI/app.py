import gradio as gr
import tensorflow as tf
import numpy as np
from PIL import Image

# Load the trained model
model = tf.keras.models.load_model("alzheimers_detection_model.h5")  # Ensure the model is saved with this name

# Define class labels
classes = ["Brain MRI", "Not a Brain MRI"]

def predict(image):
    image = image.resize((224, 224))  # Resize to model input size
    image = np.array(image) / 255.0  # Normalize
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    prediction = model.predict(image)
    predicted_class = classes[np.argmax(prediction)]
    confidence = np.max(prediction)
    return {predicted_class: float(confidence)}

# Define Gradio Interface
iface = gr.Interface(
    fn=predict,
    inputs=gr.Image(type="pil"),
    outputs=gr.Label(),
    title="Alzheimer MRI Classifier",
    description="Upload an MRI scan to classify if it belongs to Brain MRI or Non-Brain MRI."
)

# Launch the Gradio app
if __name__ == "__main__":
    iface.launch()