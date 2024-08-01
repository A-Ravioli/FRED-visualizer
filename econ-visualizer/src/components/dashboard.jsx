import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FREDChart = ({ seriesId, color }) => {
FREDChart.propTypes = {
  seriesId: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
  const [data, setData] = useState([]);
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
  }, [seriesId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (data.length === 0) return <p>No data available.</p>;

  return (
    <div className="h-64 border border-gray-300 p-4 mb-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke={color} activeDot={{ r: 8 }} connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const FREDDashboard = () => {
  const [charts, setCharts] = useState([{ id: 1, seriesId: 'GDP', color: '#8884d8' }]);
  const [newSeriesId, setNewSeriesId] = useState('');

  const addChart = () => {
    if (newSeriesId) {
      setCharts([...charts, { 
        id: charts.length + 1, 
        seriesId: newSeriesId, 
        color: `#${Math.floor(Math.random()*16777215).toString(16)}` 
      }]);
      setNewSeriesId('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">FRED Economic Data Dashboard</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newSeriesId}
          onChange={(e) => setNewSeriesId(e.target.value)}
          placeholder="Enter FRED Series ID"
          className="flex-grow p-2 border rounded"
        />
        <button 
          onClick={addChart}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Chart
        </button>
      </div>
      {charts.map((chart) => (
        <FREDChart key={chart.id} seriesId={chart.seriesId} color={chart.color} />
      ))}
    </div>
  );
};

export default FREDDashboard;