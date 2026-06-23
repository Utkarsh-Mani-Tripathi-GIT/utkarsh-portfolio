from PIL import Image

def process():
    raw_path = "public/images/legal-observatory-raw.png"
    out_path = "public/images/legal-observatory-v4.png"
    
    img = Image.open(raw_path)
    w, h = img.size
    print(f"Original size: {w}x{h}")
    
    bg_color = img.getpixel((0, 0))
    print(f"BG color: {bg_color}")
    
    # Use the FULL width — no horizontal cropping or padding
    # This ensures the image fills edge to edge in the MacBook screen
    crop_h = 541
    cropped = img.crop((0, 0, w, crop_h))
    
    # Add only top padding: ~38px (≈1cm) to create breathing room from the bezel
    pad_top = 38
    new_h = crop_h + pad_top
    
    new_img = Image.new("RGBA", (w, new_h), bg_color)
    new_img.paste(cropped, (0, pad_top))
    
    new_img.save(out_path, "PNG")
    print(f"Saved: {out_path} — size {w}x{new_h}")

if __name__ == "__main__":
    process()
