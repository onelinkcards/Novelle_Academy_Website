import glob

replacements = {
    # Medical Dermatology Section -> Founders & Faculty
    "Elite Aesthetic & Laser Education For Modern Practitioners": "Meet Our Founders & Faculty",
    "Novelle's training programs are designed to build scientific understanding, treatment confidence and professional discipline through structured modules, practical exposure and safety-led education.": "Guided by internationally renowned experts in aesthetic medicine.",
    
    # Checkmarks
    "Acne and breakouts": "CIBTAC Accredited",
    "Eczema and dermatitis": "NCLC Certified",
    "Chronic skin conditions": "DHA Approved",
    "Pigmentation concerns": "International Standards",
    
    # Floating elements
    "Skin analysis": "Admissions Team",
    "Expert consultation at no cost": "Speak with an advisor",
    "24/7 consultation support available": "Student Support Services Available",
    
    # Testimonials -> Faculty Bios
    # Replace the two identical names/titles separately if possible, but global replace is fine since we just need dummy data for two cards.
    "Olivia Chen": "Dr Seeta / Dr Azaiba",
    "Creative Director": "Faculty Lead",
    "I was nervous about aesthetic treatments, but the results look completely natural.": "Over 15 years in clinical dermatology and aesthetics education.",
    "The personalized approach made all the difference. They didn’t rush anything and created a plan that.": "Specialising in non-surgical facial harmonisation and laser science."
}

files = ["noH_xaaMvGTDPEfMwGamizuPwPfHIvXvuLVPbd-sXsw.Cy-pOWYK.mjs", "script_main.BXAIisQf.mjs", "B3TULh-ogoYdZcgNWZSMGttOlndwdR-VCZ9LhgZHdlc.Cqvnvy4o.mjs"]

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
        print(f"Error processing {filepath}: {e}")
