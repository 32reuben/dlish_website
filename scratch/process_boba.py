import os
import glob
from PIL import Image

def remove_black(input_path, output_path, threshold=40):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        # If the pixel is very dark (close to black), make it transparent
        if item[0] < threshold and item[1] < threshold and item[2] < threshold:
            new_data.append((0, 0, 0, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")

def main():
    in_dir = r"c:\Users\REUBEN\OneDrive\Desktop\ukwebsite\scratch\boba"
    out_dir = r"c:\Users\REUBEN\OneDrive\Desktop\ukwebsite\public\products"
    
    files = glob.glob(os.path.join(in_dir, "*.png"))
    for file_path in files:
        filename = os.path.basename(file_path)
        # Fix the double space in classic brown sugar
        fixed_filename = filename.replace("  ", " ")
        out_path = os.path.join(out_dir, fixed_filename)
        
        print(f"Processing {filename}...", flush=True)
        try:
            remove_black(file_path, out_path)
            print("Success!", flush=True)
        except Exception as e:
            print(f"Failed: {e}", flush=True)

if __name__ == "__main__":
    main()
