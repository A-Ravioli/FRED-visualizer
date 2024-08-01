import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FREDDashboard = () => {
  const [data, setData] = useState([]);
  const [seriesId, setSeriesId] = useState('GDP');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/fred/${seriesId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      console.log('Fetched data:', jsonData); // Debug log
      setData(jsonData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log('Current data state:', data); // Debug log

  return (
    <div className="max-w-3xl mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">FRED Economic Data Dashboard</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={seriesId}
          onChange={(e) => setSeriesId(e.target.value)}
          placeholder="Enter FRED Series ID"
          className="flex-grow p-2 border rounded"
        />
        <button 
          onClick={fetchData}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Fetch Data
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && data.length > 0 ? (
        <div className="h-96 border border-gray-300 p-4"> {/* Added border and padding for visibility */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} connectNulls />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p>No data available to display. Please fetch data first.</p>
      )}
    </div>
  );
};

export default FREDDashboard;