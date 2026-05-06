import glob

replacements = {
    # Headings
    "children:`Courses`})}),className:`framer-yxh4o2`": "children:`Our Programmes`})}),className:`framer-yxh4o2`",
    "children:`Aesthetic Treatments`})}),className:`framer-yxh4o2`": "children:`Our Programmes`})}),className:`framer-yxh4o2`",
    "j3EJuXpXJ:`services`": "j3EJuXpXJ:`COURSES`",
    "j3EJuXpXJ:`Services`": "j3EJuXpXJ:`COURSES`",
    
    # 1. Bar 1
    "Beauty Therapy Diploma - Level 1": "Beauty Therapy Diplomas",
    "Acne & Skin Health": "Beauty Therapy Diplomas",
    "Acne & skin health": "Beauty Therapy Diplomas",
    
    "An introduction to professional beauty therapy practice, covering core skills and foundational knowledge for a career in the industry.": "CIBTAC-accredited Level 1 to Level 3 pathways covering beauty therapy, skin science, client care, and professional practice.",
    "Personalized dermatology care for acne, pigmentation, and long-term skin maintenance.": "CIBTAC-accredited Level 1 to Level 3 pathways covering beauty therapy, skin science, client care, and professional practice.",
    
    # 2. Bar 2
    "Beauty Therapy Diploma - Level 2": "Laser & Aesthetics",
    "Botox & Fillers": "Laser & Aesthetics",
    "Botox & fillers": "Laser & Aesthetics",
    
    "Building on Level 1 with more advanced practical skills and deeper scientific understanding of the skin and body.": "Advanced training in laser hair removal, chemical peels, microdermabrasion, electrolysis, and clinical skin science.",
    "Subtle enhancements that refresh your features without changing who you are.": "Advanced training in laser hair removal, chemical peels, microdermabrasion, electrolysis, and clinical skin science.",
    
    # 3. Bar 3
    "Laser & Aesthetics Practitioner": "Semi-Permanent & Skin",
    "Laser Treatments": "Semi-Permanent & Skin",
    "Laser treatments": "Semi-Permanent & Skin",
    
    "Specialised training in laser hair removal technology, safety protocols, and patient care.": "Specialist education in semi-permanent makeup, pigment science, cosmeceutical skincare, consultation, and aftercare.",
    "Advanced laser solutions for hair removal, pigmentation, texture, and scars clinical laser solutions.": "Specialist education in semi-permanent makeup, pigment science, cosmeceutical skincare, consultation, and aftercare.",
    "Advanced laser solutions for smooth, long-lasting hair removal.": "Specialist education in semi-permanent makeup, pigment science, cosmeceutical skincare, consultation, and aftercare.",
    
    # 4. Bar 4
    "Semi-Permanent Makeup": "Body Treatments",
    "Anti-aging solutions": "Body Treatments",
    "Anti-Aging": "Body Treatments",
    "Skin Rejuvenation": "Body Treatments",
    
    "A comprehensive programme in semi-permanent makeup application.": "Professional body treatment training including LPG Endermologie, EMS therapy, lymphatic drainage, and anatomy for aesthetic practitioners.",
    "Target lines, volume loss, dullness, and tired skin with safe, proven treatments.": "Professional body treatment training including LPG Endermologie, EMS therapy, lymphatic drainage, and anatomy for aesthetic practitioners.",
    
    # Button
    "Explore Course": "Explore Courses",
    "View Detail": "Explore Courses",
}

files = glob.glob("*.mjs")

for filepath in files:
    try:
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()
        
        modified = False
        
        for old, new in replacements.items():
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
