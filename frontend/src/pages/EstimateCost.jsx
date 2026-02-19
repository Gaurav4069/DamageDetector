import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDamageContext } from '../context/DamageContext';

const EstimateCost = () => {
    const { results } = useDamageContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!results) {
            navigate('/dashboard');
        }
    }, [results, navigate]);

    if (!results) return null;

    const { estimated_cost, car_type, severity, damaged_parts } = results;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Repair Cost Estimation</h1>
                <p className="mt-2 text-gray-600">Final Step: Estimated repair costs.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-fade-in-up">
                <div className="mb-8">
                    <h3 className="text-xl font-medium text-gray-900 text-center">Estimated Repair Cost Range</h3>
                    <p className="mt-4 text-5xl font-extrabold text-green-600 text-center">
                        ₹{estimated_cost?.min_cost?.toLocaleString() || '0'} - ₹{estimated_cost?.max_cost?.toLocaleString() || '0'}
                    </p>
                    <p className="mt-2 text-sm text-gray-500 text-center">
                        *This is an AI-generated estimate based on detected damage. Actual repair costs may vary.
                    </p>
                </div>

                <div className="border-t border-gray-200 pt-8">
                    <h4 className="text-lg font-medium text-gray-800 mb-4">Breakdown Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                        <div className="bg-gray-50 p-4 rounded-md">
                            <span className="block text-sm text-gray-500">Vehicle Type</span>
                            <span className="block font-semibold capitalize">{car_type}</span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                            <span className="block text-sm text-gray-500">Severity</span>
                            <span className={`block font-semibold capitalize ${severity === 'minor' ? 'text-yellow-600' :
                                severity === 'moderate' ? 'text-orange-600' :
                                    'text-red-600'
                                }`}>
                                {severity}
                            </span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md">
                            <span className="block text-sm text-gray-500">Damaged Parts</span>
                            <span className="block font-semibold">{damaged_parts?.length || 0}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EstimateCost;
