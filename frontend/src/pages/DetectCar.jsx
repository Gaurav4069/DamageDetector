import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDamageContext } from '../context/DamageContext';

const DetectCar = () => {
    const { results } = useDamageContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!results) {
            navigate('/dashboard');
        }
    }, [results, navigate]);

    if (!results) return null;

    const { car_type, image_results } = results;
    // Use the first image for display
    const displayImage = image_results[0]?.original_url;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Car Type Detection</h1>
                <p className="mt-2 text-gray-600">Step 1: Identify your vehicle type.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-fade-in-up mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Consensus: <span className="text-blue-600 capitalize">{car_type}</span></h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {image_results.map((img, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col items-center">
                            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mb-2">Image {index + 1}</span>
                            <img
                                src={img.original_url?.replace((import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', ''), '')}
                                alt={`Analyzed Car ${index + 1}`}
                                className="w-full h-48 object-cover rounded-md shadow-sm mb-3"
                            />
                            <p className="text-gray-500 text-sm">Detected:</p>
                            <p className="text-xl font-bold text-gray-800 capitalize">{img.car_type}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center gap-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-6 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        ← Back to Dashboard
                    </button>
                    <button
                        onClick={() => navigate('/analyze-severity')}
                        className="px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                        Next: Analyze Severity →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetectCar;
