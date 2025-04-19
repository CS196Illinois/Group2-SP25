import fitz  
import pytesseract
from PIL import Image
import io
import re

def extract_text_from_pdf(file):
    doc = fitz.open(stream=file.read(), filetype='pdf')
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def extract_text_from_image(file):
    image = Image.open(file.stream)
    text = pytesseract.image_to_string(image)
    return text

def parse_assignments(text):
    lines = text.splitlines()
    assignments = []
    for line in lines:
        match = re.search(r'(Assignment[\w\s]+).*?(\d{2}/\d{2}/\d{4})', line)
        if match:
            assignments.append({
                'name': match.group(1).strip(),
                'due_date': match.group(2)
            })
    return assignments

def process_file(file):
    filename = file.filename.lower()
    if filename.endswith('.pdf'):
        text = extract_text_from_pdf(file)
    elif filename.endswith(('.png', '.jpg', '.jpeg')):
        text = extract_text_from_image(file)
    else:
        return {'error': 'Unsupported file type'}

    assignments = parse_assignments(text)

    # connect to Gradescope/PrairieLearn API here
    # upload_to_gradescope(assignments)
    # upload_to_prairielearn(assignments)

    return {
        'extracted_text': text,
        'parsed_assignments': assignments
    }
