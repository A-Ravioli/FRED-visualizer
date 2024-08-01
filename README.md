# FRED Economic Data Dashboard

This project is a dashboard that displays economic data from the Federal Reserve Economic Data (FRED) using a React frontend and a Python Flask backend.

## Features

- Fetch and display economic data from FRED
- Add multiple charts to the dashboard
- Each chart is color-coded for easy differentiation
- Responsive design for various screen sizes

## Prerequisites

- Node.js and npm (for React frontend)
- Python 3.7+ (for Flask backend)
- FRED API key (obtain from https://fred.stlouisfed.org/docs/api/api_key.html)

## Setup

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install the required Python packages:
   ```
   pip install flask flask-cors fredapi python-dotenv
   ```

4. Create a `.env` file in the backend directory and add your FRED API key:
   ```
   FRED_API_KEY=your_api_key_here
   ```

5. Run the Flask server:
   ```
   python app.py
   ```

The backend should now be running on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install the required npm packages:
   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```

The frontend should now be running on `http://localhost:3000`.

## Usage

1. Open your web browser and go to `http://localhost:3000`.
2. You'll see a default chart displaying GDP data.
3. To add a new chart:
   - Enter a FRED series ID in the input field (e.g., 'UNRATE' for unemployment rate)
   - Click the "Add Chart" button
4. The new chart will appear below the existing ones.
5. Each chart will have a unique color for easy differentiation.

## FRED Series IDs

Here are some example FRED series IDs you can use:

- GDP: Gross Domestic Product
- UNRATE: Unemployment Rate
- CPIAUCSL: Consumer Price Index for All Urban Consumers
- FEDFUNDS: Federal Funds Effective Rate
- M2: M2 Money Stock

For more series IDs, visit the [FRED website](https://fred.stlouisfed.org/) and search for the economic data you're interested in.

## Troubleshooting

- If charts are not displaying, check the browser console for error messages.
- Ensure both the backend and frontend servers are running.
- Verify that your FRED API key is correct and properly set in the `.env` file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).