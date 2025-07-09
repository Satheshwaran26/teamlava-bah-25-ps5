import os
import numpy as np
import torch
import h5py
from datetime import datetime
from PIL import Image
from flask import Flask, render_template, send_from_directory, request, jsonify
from torch import nn
from flask_cors import CORS

# Production configuration
class Config:
    DEBUG = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key-here')
    
    # File paths - use environment variables for production
    # Default to local paths for development, but use relative paths for production
    CHECKPOINT_DIR = os.environ.get('CHECKPOINT_DIR', './Test_Chunks')
    INPUT_DIR = os.environ.get('INPUT_DIR', './INPUT')
    OUTPUT_DIR = os.environ.get('OUTPUT_DIR', "./static/output")

# ✅ UNet definition matching expected checkpoint structure
class UNet(nn.Module):
    def __init__(self, in_channels=5, out_channels=1):
        super(UNet, self).__init__()

        def conv_block(in_c, out_c):
            return nn.Sequential(
                nn.Conv2d(in_c, out_c, kernel_size=3, padding=1),
                nn.ReLU(inplace=True),
                nn.Conv2d(out_c, out_c, kernel_size=3, padding=1),
                nn.ReLU(inplace=True)
            )

        self.encoder1 = conv_block(in_channels, 32)
        self.pool1 = nn.MaxPool2d(2)
        self.encoder2 = conv_block(32, 64)
        self.pool2 = nn.MaxPool2d(2)
        self.bottleneck = conv_block(64, 128)
        self.upconv2 = nn.ConvTranspose2d(128, 64, kernel_size=2, stride=2)
        self.decoder2 = conv_block(128, 64)
        self.upconv1 = nn.ConvTranspose2d(64, 32, kernel_size=2, stride=2)
        self.decoder1 = conv_block(64, 32)
        self.final_conv = nn.Conv2d(32, out_channels, kernel_size=1)

    def center_crop(self, enc_feat, target_shape):
        _, _, h, w = enc_feat.shape
        target_h, target_w = target_shape
        start_h = (h - target_h) // 2
        start_w = (w - target_w) // 2
        return enc_feat[:, :, start_h:start_h+target_h, start_w:start_w+target_w]

    def forward(self, x):
        enc1 = self.encoder1(x)
        enc2 = self.encoder2(self.pool1(enc1))
        bottleneck = self.bottleneck(self.pool2(enc2))
        dec2 = self.upconv2(bottleneck)
        enc2_cropped = self.center_crop(enc2, dec2.shape[2:])
        dec2 = self.decoder2(torch.cat((dec2, enc2_cropped), dim=1))
        dec1 = self.upconv1(dec2)
        enc1_cropped = self.center_crop(enc1, dec1.shape[2:])
        dec1 = self.decoder1(torch.cat((dec1, enc1_cropped), dim=1))
        return self.final_conv(dec1)

# ✅ Configuration
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
checkpoint_dir = Config.CHECKPOINT_DIR
input_dir = Config.INPUT_DIR
output_dir = Config.OUTPUT_DIR

# Create directories with error handling
try:
    os.makedirs(checkpoint_dir, exist_ok=True)
    os.makedirs(input_dir, exist_ok=True)
    os.makedirs(output_dir, exist_ok=True)
    print(f"✅ Created directories: {checkpoint_dir}, {input_dir}, {output_dir}")
except Exception as e:
    print(f"⚠️ Error creating directories: {e}")
    # Use current directory as fallback
    checkpoint_dir = "./Test_Chunks"
    input_dir = "./INPUT" 
    output_dir = "./static/output"
    os.makedirs(checkpoint_dir, exist_ok=True)
    os.makedirs(input_dir, exist_ok=True)
    os.makedirs(output_dir, exist_ok=True)

# ✅ Load models
model_paths = []
models = []

# Check if checkpoint directory exists and has models
if os.path.exists(checkpoint_dir) and os.listdir(checkpoint_dir):
    model_paths = sorted([os.path.join(checkpoint_dir, f) for f in os.listdir(checkpoint_dir) if f.endswith('.pth')])
    for path in model_paths:
        try:
            model = UNet().to(device)
            model.load_state_dict(torch.load(path, map_location=device))
            model.eval()
            models.append(model)
        except Exception as e:
            print(f"⚠️ Could not load model from {path}: {e}")
            
print(f"✅ Loaded {len(models)} models from {len(model_paths)} model files")

# ✅ Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Configure CORS properly for production
CORS(app, origins=[
    "https://teamlava-bah-25-ps5.vercel.app",
    "https://*.vercel.app",
    "https://*.onrender.com",  # For Render frontend
    "http://localhost:5173",
    "http://localhost:3000"
], supports_credentials=True)

# Add CORS headers manually for all responses
@app.after_request
def after_request(response):
    # Allow multiple origins
    origin = request.headers.get('Origin')
    allowed_origins = [
        'https://teamlava-bah-25-ps5.vercel.app',
        'http://localhost:5173',
        'http://localhost:3000'
    ]
    
    # Also allow any onrender.com subdomain
    if origin and ('onrender.com' in origin or origin in allowed_origins):
        response.headers.add('Access-Control-Allow-Origin', origin)
    
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

# Handle preflight requests
@app.route('/<path:path>', methods=['OPTIONS'])
def handle_options(path):
    response = jsonify({})
    origin = request.headers.get('Origin')
    
    # Allow multiple origins
    if origin and ('onrender.com' in origin or 'vercel.app' in origin or 'localhost' in origin):
        response.headers.add('Access-Control-Allow-Origin', origin)
    
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response
input_paths = []
pred_path = ""

@app.route("/", methods=["GET"])
def index():
    """Main endpoint with health and API information"""
    try:
        # Check if models are loaded
        models_loaded = len(models) > 0
        
        # Check if directories exist
        dirs_exist = (
            os.path.exists(checkpoint_dir) and 
            os.path.exists(input_dir) and 
            os.path.exists(output_dir)
        )
        
        return jsonify({
            "message": "Satellite Change Detection API", 
            "status": "running",
            "version": "1.0.0",
            "endpoints": ["/", "/upload", "/static/output/<filename>", "/test"],
            "health": {
                "status": "healthy" if dirs_exist else "unhealthy",
                "timestamp": str(datetime.now()),
                "models_loaded": models_loaded,
                "models_count": len(models),
                "directories_exist": dirs_exist,
                "prediction_ready": models_loaded,
                "note": "Models required for prediction functionality. Server is running but predictions disabled." if not models_loaded else "All systems operational"
            }
        })
        
    except Exception as e:
        return jsonify({
            "message": "Satellite Change Detection API",
            "status": "error",
            "error": str(e),
            "timestamp": str(datetime.now())
        }), 500

@app.route("/test", methods=["GET"])
def test():
    """Simple test endpoint to verify server is working"""
    return jsonify({
        "message": "Server is working correctly!",
        "timestamp": str(datetime.now()),
        "models_loaded": len(models) > 0,
        "models_count": len(models)
    })

@app.route("/upload", methods=["POST"])
def upload():
    global input_paths, pred_path

    # Clear old files
    for f in os.listdir(input_dir):
        if f.endswith(".h5"):
            try:
                file_path = os.path.join(input_dir, f)
                if os.path.exists(file_path):
                    os.remove(file_path)
            except (PermissionError, FileNotFoundError) as e:
                print(f"⚠️ Could not delete {f} in input_dir: {e}. Skipping.")
    
    for f in os.listdir(output_dir):
        try:
            file_path = os.path.join(output_dir, f)
            if os.path.exists(file_path):
                os.remove(file_path)
        except (PermissionError, FileNotFoundError) as e:
            print(f"⚠️ Could not delete {f} in output_dir: {e}. Skipping.")

    # Save uploaded .h5 files
    files = request.files.getlist("files")
    for f in files:
        f.save(os.path.join(input_dir, f.filename))

    # Run prediction
    if not models:
        return jsonify({
            "error": "No models loaded. Please upload model files to the server.",
            "status": "service_unavailable",
            "message": "The prediction service requires ML model files to be uploaded to the server."
        }), 503
    input_files = sorted([os.path.join(input_dir, f) for f in os.listdir(input_dir) if f.endswith('.h5')])
    if not input_files:
        return jsonify({"error": "No .h5 files found after upload"}), 400

    input_stack = []
    for fpath in input_files:
        with h5py.File(fpath, 'r') as f:
            vis = np.squeeze(f['IMG_VIS'][:])
            swir = np.squeeze(f['IMG_SWIR'][:])
            tir1 = np.squeeze(f['IMG_TIR1'][:])
            tir2 = np.squeeze(f['IMG_TIR2'][:])
            wv = np.squeeze(f['IMG_WV'][:])
            stacked = np.stack([vis, swir, tir1, tir2, wv], axis=0)
            input_stack.append(stacked.astype(np.float32))

    if not input_stack:
        return jsonify({"error": "Uploaded .h5 files are invalid or empty."}), 400

    input_stack = np.stack(input_stack)
    if input_stack.size == 0:
        return jsonify({"error": "Input data is empty after stacking."}), 400
    input_stack /= np.max(input_stack)

    X = torch.tensor(input_stack).mean(dim=0).unsqueeze(0).to(device)
    preds = []
    with torch.no_grad():
        for m in models:
            try:
                preds.append(m(X).cpu())
            except Exception as e:
                return jsonify({"error": f"Model prediction failed: {e}"}), 500
    if not preds:
        return jsonify({"error": "No predictions could be made."}), 500
    ensemble_output = torch.mean(torch.stack(preds), dim=0).squeeze(0)

    input_paths = []
    for i in range(min(5, input_stack.shape[0])):
        vis_band = input_stack[i, 0]
        vis_norm = (255 * (vis_band - vis_band.min()) / np.ptp(vis_band)).astype(np.uint8)
        img = Image.fromarray(vis_norm)
        path = os.path.join(output_dir, f"Input_VIS_Frame_{i+1}.jpg")
        img.save(path)
        # Return relative path for frontend
        input_paths.append(f"static/output/Input_VIS_Frame_{i+1}.jpg")

    pred_np = ensemble_output[0].numpy()
    pred_norm = (255 * (pred_np - pred_np.min()) / np.ptp(pred_np)).astype(np.uint8)
    img = Image.fromarray(pred_norm)
    pred_path = os.path.join(output_dir, "Predicted_VIS_Frame.jpg")
    img.save(pred_path)

    # Return JSON response for the React frontend
    return jsonify({
        "input_images": input_paths,
        "prediction": "static/output/Predicted_VIS_Frame.jpg"
    })

@app.route("/static/output/<filename>")
def get_image(filename):
    return send_from_directory(output_dir, filename, as_attachment=False)

@app.route("/download/<filename>")
def download_image(filename):
    return send_from_directory(output_dir, filename, as_attachment=True)

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=Config.DEBUG)
