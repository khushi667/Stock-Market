import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SectorPage = () => {
    const [sectorData, setSectorData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSectorMetrics = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/sectors/metrics');
                setSectorData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchSectorMetrics();
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{`Error: ${error}`}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Sector Performance Metrics</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-indigo-600 text-white">
                            <th className="py-2 px-4 border">Sector</th>
                            <th className="py-2 px-4 border">Total Market Cap</th>
                            <th className="py-2 px-4 border">Sector Index Value</th>
                            <th className="py-2 px-4 border">Sector Performance</th>
                            <th className="py-2 px-4 border">Average Stock Price</th>
                            <th className="py-2 px-4 border">Total Volume</th>
                            <th className="py-2 px-4 border">Sector PE Ratio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sectorData.length > 0 ? (
                            sectorData.map((sector, index) => {
                                const totalMarketCap = sector.totalMarketCap
                                    ? `₹${sector.totalMarketCap.toLocaleString()}`
                                    : 'N/A';
                                const sectorIndexValue = sector.sectorIndexValue
                                    ? sector.sectorIndexValue.toFixed(2)
                                    : 'N/A';
                                const sectorPerformance = sector.sectorPerformance
                                    ? `${sector.sectorPerformance.toFixed(2)}%`
                                    : 'N/A';
                                const averagePrice = sector.averagePrice
                                    ? `₹${sector.averagePrice.toFixed(2)}`
                                    : 'N/A';
                                const totalVolume = sector.totalVolume
                                    ? sector.totalVolume.toLocaleString()
                                    : 'N/A';
                                const sectorPE = sector.sectorPE
                                    ? sector.sectorPE.toFixed(2)
                                    : 'N/A';

                                return (
                                    <tr key={index} className="text-center">
                                        <td className="py-2 px-4 border">{sector.sector}</td>
                                        <td className="py-2 px-4 border">{totalMarketCap}</td>
                                        <td className="py-2 px-4 border">{sectorIndexValue}</td>
                                        <td className="py-2 px-4 border">{sectorPerformance}</td>
                                        <td className="py-2 px-4 border">{averagePrice}</td>
                                        <td className="py-2 px-4 border">{totalVolume}</td>
                                        <td className="py-2 px-4 border">{sectorPE}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr className="text-center">
                                <td colSpan="7" className="py-2 px-4 border text-red-500">
                                    No sector data available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SectorPage;
