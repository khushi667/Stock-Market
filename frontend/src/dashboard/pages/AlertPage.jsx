import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AlertPage = () => {
    const [alerts, setAlerts] = useState([]);
    const [newAlert, setNewAlert] = useState({
        symbol: '',
        type: 'price',
        threshold: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                // Make sure your API URL is correct
                const apiUrl = import.meta.env.VITE_API_URL; 
                const response = await axios.get(`${apiUrl}/api/alerts`); // Make sure backend has this route
                setAlerts(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching alerts:', err);
                setError('Failed to load alerts. Please try again later.');
                setLoading(false);
            }
        };

        fetchAlerts();
    }, []);

    const handleDeleteAlert = async (id) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            await axios.delete(`${apiUrl}/api/alerts/${id}`);
            setAlerts(alerts.filter(alert => alert.id !== id));
        } catch (err) {
            console.error('Error deleting alert:', err);
        }
    };

    const handleClearAlerts = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            await axios.delete(`${apiUrl}/api/alerts/clear`); // Make sure the backend route exists
            setAlerts([]);
        } catch (err) {
            console.error('Error clearing alerts:', err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAlert({ ...newAlert, [name]: value });
    };

    const handleAddAlert = async (e) => {
        e.preventDefault();
        if (!newAlert.symbol || !newAlert.threshold) {
            alert('Please enter valid data for the new alert.');
            return;
        }

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${apiUrl}/api/alerts`, newAlert); // Post the new alert
            setAlerts([...alerts, response.data]);
            setNewAlert({ symbol: '', type: 'price', threshold: '' });
        } catch (err) {
            console.error('Error adding alert:', err);
            alert('Failed to add alert. Please try again.');
        }
    };

    if (loading) return <div>Loading alerts...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center py-10">
            <div className="max-w-5xl w-full p-8 bg-white rounded-lg shadow-lg text-center mx-4 my-8">
                <h1 className="text-4xl font-bold mb-6">Stock Alerts</h1>
                <p className="text-lg text-gray-700 mb-8">
                    Set and manage alerts to stay updated on stock price changes, technical indicators, and market trends.
                </p>

                {/* Active Alerts Section */}
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Your Active Alerts</h2>
                {alerts.length ? (
                    <ul className="list-none mb-6">
                        {alerts.map(alert => (
                            <li key={alert.id} className="bg-gray-200 rounded-lg p-4 mb-4 shadow-md">
                                <p className="text-lg"><strong>Stock:</strong> {alert.symbol}</p>
                                <p className="text-lg"><strong>Alert Type:</strong> {alert.type}</p>
                                <p className="text-lg"><strong>Threshold:</strong> {alert.threshold}</p>
                                <p className={`text-lg ${alert.status === 'Triggered' ? 'text-red-500' : 'text-green-500'}`}>
                                    <strong>Status:</strong> {alert.status}
                                </p>
                                <button
                                    onClick={() => handleDeleteAlert(alert.id)}
                                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Delete Alert
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-lg text-gray-700 mb-6">No active alerts.</p>
                )}

                {alerts.length > 0 && (
                    <button
                        onClick={handleClearAlerts}
                        className="bg-yellow-500 text-white px-6 py-2 rounded-lg mb-6"
                    >
                        Clear All Alerts
                    </button>
                )}

                {/* Add New Alert Form */}
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Add New Alert</h2>
                <form className="bg-gray-200 p-6 rounded-lg shadow-md max-w-md mx-auto" onSubmit={handleAddAlert}>
                    <div className="mb-4">
                        <label className="block text-lg text-gray-700">Stock Symbol:</label>
                        <input
                            type="text"
                            name="symbol"
                            value={newAlert.symbol}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Enter stock symbol (e.g., AAPL)"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg text-gray-700">Alert Type:</label>
                        <select
                            name="type"
                            value={newAlert.type}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="price">Price Above/Below</option>
                            <option value="ema">EMA Crossover</option>
                            <option value="rsi">RSI Threshold</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg text-gray-700">Threshold:</label>
                        <input
                            type="text"
                            name="threshold"
                            value={newAlert.threshold}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="Set price/EMA/RSI value"
                        />
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                        Add Alert
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AlertPage;