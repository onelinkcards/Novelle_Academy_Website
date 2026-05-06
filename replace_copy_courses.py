import glob
import re

replacements = {
    # Section Heading
    "Aesthetic Treatments": "Courses",
    "View Detail": "Explore Course",
    
    # Course 1
    "Acne & Skin Health": "Beauty Therapy Diploma - Level 1",
    "Acne & skin health": "Beauty Therapy Diploma - Level 1",
    "Personalized dermatology care for acne, pigmentation, and long-term skin maintenance.": "An introduction to professional beauty therapy practice, covering core skills and foundational knowledge for a career in the industry.",
    
    # Course 2
    "Botox & Fillers": "Beauty Therapy Diploma - Level 2",
    "Botox & fillers": "Beauty Therapy Diploma - Level 2",
    "Subtle enhancements that refresh your features without changing who you are.": "Building on Level 1 with more advanced practical skills and deeper scientific understanding of the skin and body.",
    
    # Course 3
    "Laser Treatments": "Laser & Aesthetics Practitioner",
    "Laser treatments": "Laser & Aesthetics Practitioner",
    "Advanced laser solutions for smooth, long-lasting hair removal.": "Specialised training in laser hair removal technology, safety protocols, and patient care.",
    "Advanced laser solutions for hair removal, pigmentation, texture, and scars clinical laser solutions.": "Specialised training in laser hair removal technology, safety protocols, and patient care.",
    
    # Course 4
    "Anti-aging solutions": "Semi-Permanent Makeup",
    "Anti-Aging": "Semi-Permanent Makeup",
    "Skin Rejuvenation": "Semi-Permanent Makeup",
    "Target lines, volume loss, dullness, and tired skin with safe, proven treatments.": "A comprehensive programme in semi-permanent makeup application."
}

def escape_regex(text):
    return re.escape(text)

files = glob.glob("*.mjs")

for filepath in files:
    try:
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()
        
        modified = False
        
        for old, new in replacements.items():
            # Use regex for case-insensitive replacement (but be careful with HTML entities/backticks)
            # Just do a standard string replace for safety first, but for case variations we explicitly listed them.
            if old in content:
                content = content.replace(old, new)
                modified = True
                print(f"Replaced in {filepath}: '{old[:20]}...' -> '{new[:20]}...'")
                
        if modified:
            with open(filepath, 'w', encoding='utf-8') as file:
                file.write(content)
            print(f"Successfully updated {filepath}")
    except Exception as e:
        pass
