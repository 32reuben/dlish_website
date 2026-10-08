import os
import glob
from rembg import remove, new_session
from PIL import Image

def main():
    in_dir = r"C:\Users\REUBEN\Downloads\bt"
    out_dir = r"c:\Users\REUBEN\OneDrive\Desktop\ukwebsite\public\products"
    
    print("Loading AI Model...", flush=True)
    session = new_session("u2net")
    print("Model loaded!", flush=True)
    
    files = glob.glob(os.path.join(in_dir, "*.png"))
    for file_path in files:
        filename = os.path.basename(file_path)
        out_path = os.path.join(out_dir, filename.lower())
        
        print(f"AI Processing {filename}...", flush=True)
        try:
            input_image = Image.open(file_path)
            output_image = remove(input_image, session=session)
            output_image.save(out_path, "PNG")
            print("Success!", flush=True)
        except Exception as e:
            print(f"Failed: {e}", flush=True)

if __name__ == "__main__":
    main()
