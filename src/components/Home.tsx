import { useState } from 'react';

function Home() {
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');

    const handleSearch = () => {
        if (fromCity && toCity) {
            console.log('Searching flights from:', fromCity, 'to:', toCity);
            alert(`Searching flights from ${fromCity} to ${toCity}`);
        } else {
            alert('Please fill in both departure and destination cities');
        }
    };

    return (
        <div className="w-full p-6 bg-slate-800">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8 text-center">
                    Find Your Perfect Flight
                </h1>
                
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* From Input */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                            <input 
                                type="text" 
                                placeholder="Departure city"
                                value={fromCity}
                                onChange={(e) => setFromCity(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-800"
                            />
                        </div>

                        {/* To Input */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                            <input 
                                type="text" 
                                placeholder="Destination city"
                                value={toCity}
                                onChange={(e) => setToCity(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-800"
                            />
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleSearch}
                        className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    >
                        Search Flights
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;