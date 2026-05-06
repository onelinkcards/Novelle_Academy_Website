import glob

replacements = {
    # 1. Hero Section
    "Innovating Beauty Through Education": "Excellence Through Aesthetic Education",
    "Novelle is a premium institution for aesthetic and laser education, where clinical precision, ethical practice and luxury refinement come together to shape the next generation of practitioners and deliver safety-led aesthetic excellence.": "Abu Dhabi's premier vocational institute for beauty therapy, clinical aesthetics, and advanced laser technologies - where medical precision meets aesthetic artistry.",
    "Novelle is a premium institution for aesthetic and laser education, shaping the next generation of practitioners and delivering safety-led excellence.": "Abu Dhabi's premier vocational institute for beauty therapy, clinical aesthetics, and advanced laser technologies - where medical precision meets aesthetic artistry.",
    "Book an Appointment": "Explore Courses",
    "Our Service": "Meet Our Team",

    # 2. About the Academy (Expert Care)
    "Expert Care for Every Skin Journey": "Science, Art & Leadership",
    "Novelle brings together clinical expertise and advanced technology to deliver unparalleled aesthetic results. Our team of board-certified specialists is dedicated to creating personalized treatments that prioritize your skin’s long-term health, safety, and natural beauty.": "A pioneering vocational training institute headquartered in Abu Dhabi, specialising in beauty therapy, clinical aesthetics, and advanced laser technologies. Al Novelle Advance Aesthetic Training LLC is built on the principles of scientific excellence, sustainability, and international best practice - reflecting the UAE's vision for innovation and world-class education.",
    "Advanced science-backed treatments": "Leading Aesthetics Education in the Middle East",
    "Personalized care tailored to your unique skin needs": "Empowering Professionals for Global Success",
    
    # 3. Our Programmes (Detailed Services)
    "Detailed Services": "Our Programmes",
    "Acne & Skin Health": "Beauty Therapy",
    "Personalized dermatology care for acne, pigmentation, and long-term skin maintenance.": "An introduction to professional beauty therapy practice, covering core skills and foundational knowledge for a career in the industry.",
    "Botox & Fillers": "Laser & Aesthetics",
    "Expertly administered injectables to reduce wrinkles and restore natural facial volume.": "Specialised training in laser hair removal technology, safety protocols, and patient care - certified to the international NCLC standard.",
    "Laser Treatments": "Semi-Perm & Skin",
    "Advanced laser solutions for hair removal, skin resurfacing, and redness reduction.": "A comprehensive programme in semi-permanent makeup application - covering brows, lips, and eyeliner with professional-grade pigments and equipment.",
    "Skin Rejuvenation": "Body Treatments",
    "Revive radiance, stimulate collagen, and reveal clearer, smoother-looking skin.": "Professional training in LPG Endermologie - a patented mechanical stimulation technology for body contouring, cellulite reduction, and skin firmness.",
    
    # 4. Meet Our Founders (Testimonials/Why Choose Us)
    "Why Choose Us": "Accreditations & Compliance",
    "Testimonials": "Meet Our Founders & Faculty",
    "What our patients say": "Expert Guidance",
    
    # 5. Knowledge & Insights (Blog)
    "Latest Articles": "Knowledge & Insights",
    "Our Blog": "From the Academy",
    "Understanding Laser Hair Removal: What to Expect": "Understanding Laser Hair Removal: Safety, Skin Types & What to Expect",
    "The Benefits of Chemical Peels for Acne Scars": "Why CIBTAC Accreditation Opens Doors Globally for Beauty Therapists",
    "How to Build a Skincare Routine for Sensitive Skin": "The Rise of Medical Aesthetics in the UAE: Opportunities for Trained Professionals",

    # 6. Enquiry Form & Contact
    "Request an appointment": "Begin Your Journey",
    "Fill out the form below, and we’ll contact you shortly.\\xA0": "Our team is here to help. Get in touch to discuss our courses.\\xA0",
    "(422) 820 820": "050 234 8625",
    "example@gmail.com": "drsia87@gmail.com",
    
    # Add Tagline / Byline somewhere small (e.g., above hero, near footer)
    "Since 2016": "Est. 2026",
    "Tailored to your vision": "Abu Dhabi - UAE",
    "Customized treatment plans for every skin type and concern": "CIBTAC Accredited - NCLC Certified - Internationally Recognised"
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
