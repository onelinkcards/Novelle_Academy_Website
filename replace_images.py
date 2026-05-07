import os
import glob
import re

replacements = [
    # Left large image card (Before & After) - Make them the same so the slider is invisible
    (r'https://framerusercontent\.com/images/mtj5hoiyHHRIFp2NkDEtYGmM\.jpg[^`"\' ]*', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80'),
    (r'https://framerusercontent\.com/images/KLz3YY5GDbbEwOvVSAqGFLXE0eI\.jpg[^`"\' ]*', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80'),
    
    # Hide the Before/After labels
    (r'label:{after:`After`,before:`Before`', r'label:{after:``,before:``'),
    
    # Center Bottom Image Card
    (r'https://framerusercontent\.com/images/n8OzbYcYaueWCQCfguvevnR3o\.png[^`"\' ]*', 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1200&q=80'),
    (r'https://framerusercontent\.com/images/wvDPYhnwJe8k3MekkKP9OyZlICg\.png[^`"\' ]*', 'https://images.unsplash.com/photo-1616394584738-fc6e612e71c9?auto=format&fit=crop&w=1200&q=80'),
    
    # 3 small images in Bottom Left
    (r'https://framerusercontent\.com/images/hpCeYxp9YhmeNk4SNFOzNVe8M\.jpg[^`"\' ]*', 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=200&q=80'),
    (r'https://framerusercontent\.com/images/nWwBecntKvGpTzePQeixjCY7Yo\.jpg[^`"\' ]*', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=200&q=80'),
    (r'https://framerusercontent\.com/images/o6sbNkCl3ZL3Bu5h6q6yPPVOX8\.jpg[^`"\' ]*', 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=200&q=80'),
    
    # Right Side About Image
    (r'https://framerusercontent\.com/images/ipAbYHifCDoQsFyitpmqxk7yTIQ\.jpg[^`"\' ]*', 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=600&q=80'),
]

files = glob.glob('**/*.mjs', recursive=True)
files.append('index.html')

for filepath in files:
    if os.path.isfile(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        modified = False
        for pattern, new_str in replacements:
            if re.search(pattern, content):
                content = re.sub(pattern, new_str, content)
                modified = True
                print(f"Replaced in {filepath}: '{pattern}' -> '{new_str}'")
                
        if modified:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Successfully updated {filepath}")
