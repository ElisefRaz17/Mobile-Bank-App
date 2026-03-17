from flask import Flask, jsonify

# Create an instance of the Flask class
app = Flask(__name__)

# Define an API endpoint (route) that responds to GET requests
@app.route('/api/data', methods=['GET'])
def get_data():
    # Sample data to return as JSON
    data = {
        'message': 'Hello from the Flask API backend!',
        'items': [
            {'id': 1, 'name': 'Item 1'},
            {'id': 2, 'name': 'Item 2'}
        ]
    }
    # Use jsonify to convert the dictionary to a JSON response
    return jsonify(data)

# Run the application
if __name__ == '__main__':
    app.run(debug=True)
