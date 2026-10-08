import os
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
    uploads_dir = r"C:\Users\REUBEN\.gemini\antigravity-ide\brain\57d98afc-de40-4f6a-846a-bfc247c2c576\.user_uploaded"
    out_dir = r"c:\Users\REUBEN\OneDrive\Desktop\ukwebsite\public\products"
    
    mapping = {
        "media_1791129404054.jpg": "strawberry matcha.png",
        "media_1791129405051.jpg": "banana matcha.png",
        "media_1791129405098.jpg": "mango matcha.png",
        "media_1791129405134.jpg": "blueberry matcha.png",
    }
    
    for in_file, out_file in mapping.items():
        in_path = os.path.join(uploads_dir, in_file)
        out_path = os.path.join(out_dir, out_file)
        
        print(f"Processing {in_file} -> {out_file}...", flush=True)
        try:
            remove_black(in_path, out_path)
            print("Success!", flush=True)
        except Exception as e:
            print(f"Failed: {e}", flush=True)

if __name__ == "__main__":
    main()
