import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDamageContext } from '../context/DamageContext';

const DetectDamage = () => {
    const { results } = useDamageContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!results) {
            navigate('/dashboard');
        }
    }, [results, navigate]);

    if (!results) return null;

    const { damaged_parts, severity, image_results } = results;
    const displayImage = image_results[0]?.annotated_url || image_results[0]?.original_url;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Comprehensive Damage Detection</h1>
                <p className="mt-2 text-gray-600">Step 3: Identify specific damaged parts.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in-up">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Analysis Report</h3>

                {/* Combined Findings Section */}
                <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h4 className="font-semibold text-blue-800 mb-2 text-center text-lg">Aggregated Findings</h4>
                    <p className="text-center text-blue-600 mb-4">Combined results from {image_results.length} image(s)</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {damaged_parts && damaged_parts.length > 0 ? (
                            damaged_parts.map((part, index) => (
                                <span key={index} className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-sm border border-blue-200 font-medium capitalize">
                                    {part}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-500 italic">No specific external damage detected.</span>
                        )}
                    </div>
                </div>

                {/* Per Image Breakdown */}
                <h4 className="font-semibold text-gray-700 mb-4 text-xl">Detailed Breakdown by Image</h4>
                <div className="grid grid-cols-1 gap-8">
                    {image_results.map((img, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                            <div className="md:w-1/2 flex flex-col items-center">
                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mb-2 self-start">Image {idx + 1}</span>
                                <img
                                    src={(img.annotated_url || img.original_url)?.replace(import.meta.env.VITE_API_URL || 'http://localhost:5000/api', '')}
                                    alt={`Damage Detection ${idx + 1}`}
                                    className="w-full max-h-80 object-contain rounded-lg shadow-sm border border-gray-100"
                                />
                            </div>
                            <div className="md:w-1/2">
                                <h5 className="font-semibold text-gray-800 mb-2 border-b pb-2">Detected in this view:</h5>
                                {img.damaged_parts && img.damaged_parts.length > 0 ? (
                                    <ul className="space-y-2">
                                        {img.damaged_parts.map((part, i) => (
                                            <li key={i} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded">
                                                <span className="font-medium text-gray-700 capitalize">{part}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 italic text-sm">No damage detected in this specific angle.</p>
                                )}
                                <div className="mt-4">
                                    <span className="text-xs text-gray-500 uppercase tracking-wide">Severity: </span>
                                    <span className={`font-bold capitalize ${img.severity === 'minor' ? 'text-yellow-600' : img.severity === 'moderate' ? 'text-orange-600' : 'text-red-600'}`}>
                                        {img.severity}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center gap-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 text-center"
                    >
                        ← Dashboard
                    </button>
                    <button
                        onClick={() => navigate('/estimate-cost')}
                        className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 text-center"
                    >
                        Estimate Cost →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetectDamage;
