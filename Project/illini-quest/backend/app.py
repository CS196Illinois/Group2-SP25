from flask import Flask, request, jsonify
from services.extraction_service import process_file

app = Flask(__name__)  

@app.route('/')
def home():
    return 'Backend is running! Use POST /upload to upload files.'

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    results = process_file(file)

    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
