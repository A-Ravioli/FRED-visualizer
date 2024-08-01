import os
import math
from flask import Flask, jsonify
from flask_cors import CORS
from fredapi import Fred
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

fred = Fred(api_key=os.getenv("FRED_API_KEY"))


@app.route("/api/fred/<series_id>")
def get_fred_data(series_id):
    try:
        data = fred.get_series(series_id)
        data = data.ffill()  # Forward fill missing values
        json_data = []
        for date, value in data.items():
            if math.isnan(value):
                value = None  # Replace NaN with None, which will be serialized to null in JSON
            json_data.append({"date": date.strftime("%Y-%m-%d"), "value": value})
        return jsonify(json_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True)
