from flask import Flask, request, jsonify
from flask_cors import CORS
import torch
import torch.nn as nn
from torchvision import transforms, models
from PIL import Image
import io
import base64
import numpy as np
import cv2
import os
import timm

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Define the model architectures - EXACT match to saved models
class RetinopathyModel(nn.Module):
    def __init__(self):
        super(RetinopathyModel, self).__init__()
        # Has both backbone and features - this is a wrapped EfficientNet-B4
        self.backbone = models.efficientnet_b4(pretrained=False)
        self.features = models.efficientnet_b4(pretrained=False).features
        
        # Custom classifier that matches the saved structure exactly
        self.classifier = nn.Sequential(
            nn.Dropout(0.4),                    # 0
            nn.Linear(1792, 1024),              # 1
            nn.BatchNorm1d(1024),               # 2
            nn.SiLU(inplace=True),              # 3
            nn.Dropout(0.3),                    # 4
            nn.Linear(1024, 512),               # 5
            nn.BatchNorm1d(512),                # 6
            nn.SiLU(inplace=True),              # 7
            nn.Dropout(0.2),                    # 8
            nn.Linear(512, 1, bias=False)       # 9
        )
    
    def forward(self, x):
        # Use features for forward pass
        x = self.features(x)
        x = self.backbone.avgpool(x)
        x = torch.flatten(x, 1)
        x = self.classifier(x)
        return x

class PinkEyeModel(nn.Module):
    def __init__(self):
        super(PinkEyeModel, self).__init__()
        # Use timm's EfficientNet-B0 - this matches the saved model structure exactly
        self.backbone = timm.create_model('efficientnet_b0', pretrained=False, num_classes=0)
        
        # Attention layer - exact match to saved model (320 size)
        self.attention = nn.Sequential(
            nn.Linear(1280, 320),               # 0
            nn.ReLU(),                          # 1
            nn.Linear(320, 1)                   # 2
        )
        
        # Classifier - exact match to saved model structure
        self.classifier = nn.Sequential(
            nn.Dropout(0.3),                    # 0
            nn.Linear(1280, 640),               # 1
            nn.ReLU(),                          # 2
            nn.BatchNorm1d(640),                # 3
            nn.Dropout(0.3),                    # 4
            nn.Linear(640, 2)                   # 5
        )
    
    def forward(self, x):
        # Extract features using timm backbone
        features = self.backbone(x)  # This gives us the 1280-dim features
        
        # Apply attention
        attention_weights = torch.sigmoid(self.attention(features))
        attended_features = features * attention_weights
        
        return self.classifier(attended_features)

# Image preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Load trained models
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"Using device: {device}")

retinopathy_model = RetinopathyModel().to(device)
pink_eye_model = PinkEyeModel().to(device)

models_loaded = {"retinopathy": False, "pinkeye": False}

# Create a generic model wrapper that can load any state dict
class GenericModel(nn.Module):
    def __init__(self, state_dict):
        super(GenericModel, self).__init__()
        # Create a simple forward pass that works for most architectures
        self.state_dict_keys = list(state_dict.keys())
        
        # Load the state dict directly
        self.load_state_dict(state_dict, strict=False)
        
    def forward(self, x):
        # This is a placeholder - we'll override this for each specific model
        return x

def load_model_flexible(checkpoint_path, model_name):
    try:
        checkpoint = torch.load(checkpoint_path, map_location=device)
        
        # Handle different checkpoint formats
        if 'model_state_dict' in checkpoint:
            state_dict = checkpoint['model_state_dict']
        else:
            state_dict = checkpoint
        
        # Create a generic model that can hold the weights
        model = GenericModel(state_dict)
        
        print(f"✅ {model_name} model loaded successfully (generic wrapper)")
        return model, True
            
    except Exception as e:
        print(f"⚠️  {model_name} model file error: {e}")
        return None, False

# Load models with proper error handling
def load_model_properly(model, checkpoint_path, model_name):
    try:
        checkpoint = torch.load(checkpoint_path, map_location=device)
        state_dict = checkpoint['model_state_dict'] if 'model_state_dict' in checkpoint else checkpoint
        
        missing_keys, unexpected_keys = model.load_state_dict(state_dict, strict=False)
        
        if len(missing_keys) == 0 and len(unexpected_keys) == 0:
            print(f"✅ {model_name} model loaded perfectly!")
            return True
        elif len(missing_keys) == 0:
            print(f"✅ {model_name} model loaded successfully (some extra keys ignored)")
            return True
        else:
            print(f"❌ {model_name} model failed - missing {len(missing_keys)} keys")
            print(f"First few missing: {missing_keys[:5]}")
            return False
            
    except Exception as e:
        print(f"❌ {model_name} model error: {e}")
        return False

models_loaded["retinopathy"] = load_model_properly(retinopathy_model, 'models/retinopathy_model.pth', 'Retinopathy')
models_loaded["pinkeye"] = load_model_properly(pink_eye_model, 'models/pinkeye_model.pth', 'Pink eye')

if models_loaded["retinopathy"]:
    retinopathy_model.eval()
if models_loaded["pinkeye"]:
    pink_eye_model.eval()

RETINOPATHY_CLASSES = ["No Diabetic Retinopathy", "Diabetic Retinopathy Detected"]
PINK_EYE_CLASSES = ["Normal", "Conjunctivitis Detected"]

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "message": "Backend is running",
        "models_loaded": models_loaded
    })

@app.route('/api/test', methods=['GET', 'POST'])
def test_endpoint():
    print("🔥 TEST ENDPOINT HIT!")
    return jsonify({"message": "Test successful", "method": request.method})

@app.route('/api/predict/retinopathy', methods=['POST'])
def predict_retinopathy():
    print("🔥 RETINOPATHY PREDICTION REQUEST RECEIVED!")
    try:
        if not models_loaded["retinopathy"]:
            print("❌ Retinopathy model not loaded")
            return jsonify({"error": "Model not loaded"}), 500
            
        data = request.json
        image_data = data['image'].split(',')[1]
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        
        input_tensor = transform(image).unsqueeze(0).to(device)
        
        with torch.no_grad():
            outputs = retinopathy_model(input_tensor)
            # Use sigmoid activation like in your training script (single output)
            probability = torch.sigmoid(outputs).item()
            predicted = 1 if probability > 0.5 else 0
        
        result = {
            "prediction": RETINOPATHY_CLASSES[predicted],
            "confidence": probability if predicted == 1 else (1 - probability),
            "class_index": predicted,
            "all_probabilities": {
                RETINOPATHY_CLASSES[0]: 1 - probability,
                RETINOPATHY_CLASSES[1]: probability
            }
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/predict/pinkeye', methods=['POST'])
def predict_pinkeye():
    print("🔥 PINK EYE PREDICTION REQUEST RECEIVED!")
    try:
        if not models_loaded["pinkeye"]:
            print("❌ Pink eye model not loaded")
            return jsonify({"error": "Pink eye model not loaded"}), 500
            
        data = request.json
        image_data = data['image'].split(',')[1]
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        
        input_tensor = transform(image).unsqueeze(0).to(device)
        
        with torch.no_grad():
            outputs = pink_eye_model(input_tensor)
            # Apply softmax for multi-class classification (2 classes)
            probabilities = torch.softmax(outputs, dim=1)[0]
            predicted = torch.argmax(probabilities).item()
            confidence = probabilities[predicted].item()
        
        result = {
            "prediction": PINK_EYE_CLASSES[predicted],
            "confidence": confidence,
            "class_index": predicted,
            "all_probabilities": {
                PINK_EYE_CLASSES[0]: probabilities[0].item(),
                PINK_EYE_CLASSES[1]: probabilities[1].item()
            }
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/shap/generate', methods=['POST'])
def generate_shap():
    try:
        if not models_loaded["retinopathy"]:
            return jsonify({"error": "Model not loaded"}), 500
            
        data = request.json
        image_data = data['image'].split(',')[1]
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        
        input_tensor = transform(image).unsqueeze(0).to(device)
        input_tensor.requires_grad = True
        
        with torch.enable_grad():
            outputs = retinopathy_model(input_tensor)
            probability = torch.sigmoid(outputs)
            predicted = 1 if probability.item() > 0.5 else 0
            
            # Use the raw output for gradient calculation
            class_score = outputs[0, 0]  # Single output
            retinopathy_model.zero_grad()
            class_score.backward()
            
            gradients = input_tensor.grad.data[0].cpu().numpy()
            heatmap = np.abs(gradients).max(axis=0)
            heatmap = (heatmap - heatmap.min()) / (heatmap.max() - heatmap.min() + 1e-8)
            
            heatmap_resized = cv2.resize(heatmap, (image.width, image.height))
            heatmap_colored = cv2.applyColorMap(np.uint8(255 * heatmap_resized), cv2.COLORMAP_JET)
            heatmap_colored = cv2.cvtColor(heatmap_colored, cv2.COLOR_BGR2RGB)
            
            original_np = np.array(image)
            overlay = cv2.addWeighted(original_np, 0.6, heatmap_colored, 0.4, 0)
            
            overlay_pil = Image.fromarray(overlay)
            buffered = io.BytesIO()
            overlay_pil.save(buffered, format="PNG")
            overlay_base64 = base64.b64encode(buffered.getvalue()).decode()
        
        result = {
            "prediction": RETINOPATHY_CLASSES[predicted],
            "confidence": probability.item() if predicted == 1 else (1 - probability.item()),
            "shap_image": f"data:image/png;base64,{overlay_base64}"
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("\n" + "="*50)
    print("🚀 Congressional App Challenge Backend")
    print("="*50)
    print(f"Models Status:")
    print(f"  - Retinopathy: {'✅' if models_loaded['retinopathy'] else '❌'}")
    print(f"  - Pink Eye: {'✅' if models_loaded['pinkeye'] else '❌'}")
    print("="*50 + "\n")
    app.run(debug=True, host='0.0.0.0', port=5005)
