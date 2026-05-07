import os
import glob
import re

replacements = {
    # Main headers
    'Why patients choose us': 'WHY STUDENTS CHOOSE NOVELLE',
    'Care that puts your child first': 'Aesthetic Leaders Start Here',
    'Built For Future Aesthetic Professionals.': 'Aesthetic Leaders Start Here',
    'A clinic committed ': 'Science, Skill & Standards in Aesthetics',
    'Excellence in skin care': 'ACADEMY APPROACH',
    
    # Left Card
    'Step Inside The Novelle Experience': 'Step Inside The Al Novelle Experience',
    '12 Weeks': 'Abu Dhabi, UAE',
    'Acne treatment': 'Est. 2026',
    
    # Center Top Card
    'Skin analysis': 'Guided by Expert Faculty',
    'Expert consultation at no cost': 'Learn through structured guidance from experienced aesthetic and laser educators who bring clinical knowledge, safety protocols, and professional training into every programme.',
    
    # Center Middle/Bottom Cards
    'Seamless client experience': 'Mastering The Art Of Aesthetics',
    'Where Scientific Mastery Leads To Aesthetic Excellence': 'Where Scientific Mastery Leads To Aesthetic Excellence', 
    'Novelle brings together advanced education, clinical protocols and luxury client care under one definitive aesthetic destination. Every learning pathway and treatment experience is guided by precision, safety, ethics and refined outcomes.': 'Al Novelle brings together beauty therapy, clinical aesthetics, laser technologies, and international training standards to prepare confident professionals for the modern aesthetics industry.',
    
    # Right Top Stat Card
    '`10+`': '`2`',
    '"10+"': '"2"',
    '>10+<': '>2<',
    'Years of medical excellence': 'International Accreditations',
    '2,000+ Procedures': 'CIBTAC UK Certified',
    '50+ Treatments': 'NCLC USA Certified',
    
    # Right Middle Trust Card
    '`99%`': '`14+`',
    '"99%"': '"14+"',
    '>99%<': '>14+<',
    '2k+ Global trusted customers': 'Professional Programmes. Across beauty therapy, laser aesthetics, semi-permanent makeup, and body treatment education.',
    
    # Reviews -> Info Cards
    'Sofia Hale': 'International Standards',
    'The doctors really listened to my concerns and explained every step.': 'Programmes are designed around recognised training pathways, safety-led education, and professional development.',
    
    'Olivia Chen': 'Career-Focused Learning',
    'I was nervous about aesthetic treatments, but the results look completely natural.': 'Students are supported through practical training, guidance, CPD awareness, and industry-ready skill development.',
    
    'Priya Mehta': 'Abu Dhabi Academy',
    'Professional, clean clinic with advanced technology. The laser treatment was comfortable, and the results.': 'Located in Al Zahiyah, Al Novelle is built for learners seeking premium aesthetic education in the UAE.',
    
    'Daniel Brooks': 'Hands-On Practice',
    'From consultation to follow-up, the care was exceptional. My skin texture and tone have improved noticeably.': 'Students gain extensive hands-on experience in our fully equipped clinic to ensure readiness for professional practice.',
    
    # Job titles -> Category labels
    '`Actress`': '`Curriculum`',
    '`Creative Director`': '`Support`',
    '`Product Manager`': '`Campus`',
    '`Entrepreneur`': '`Training`',
    
    # Appointment / CTA Section
    'Request an appointment': 'Speak With Our Admissions Team',
    'Fill out the form below, and we’ll contact you shortly.\\xA0': 'Choose the programme that matches your goals in beauty therapy, laser technologies, clinical aesthetics, or advanced skin education.',
    'Fill out the form below, and we’ll contact you shortly.': 'Choose the programme that matches your goals in beauty therapy, laser technologies, clinical aesthetics, or advanced skin education.',
    'Therapy*': 'Programme of Interest*',
    'Acne Care': 'Beauty Therapy',
    'Skin Consultation': 'Semi-Permanent Makeup',
    'I agree to allow the clinic to contact me regarding my appointment.': 'I agree to allow the academy to contact me regarding enrolment.',
    
    # Misc text
    '`Book now`': '`Enrol Now`',
}

files = glob.glob('**/*.mjs', recursive=True)
files.append('index.html')
files.append('courses.html')

for filepath in files:
    if os.path.isfile(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        modified = False
        for old_str, new_str in replacements.items():
            if old_str in content:
                content = content.replace(old_str, new_str)
                modified = True
                print(f"Replaced in {filepath}: '{old_str[:20]}...' -> '{new_str[:20]}...'")
                
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Successfully updated {filepath}")
