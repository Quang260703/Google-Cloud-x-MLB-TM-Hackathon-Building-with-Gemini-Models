from flask import Flask, jsonify

app = Flask(__name__)

# Define a route for a GET request
@app.route('/api/data', methods=['GET'])
def get_data():
    # Example response data
    data = {
        "message": "Hello, World!",
        "status": "success"
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)