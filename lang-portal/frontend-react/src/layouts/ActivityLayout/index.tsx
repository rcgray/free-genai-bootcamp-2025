import { Outlet, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const ActivityLayout = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white dark:bg-slate-800 shadow-sm rounded-lg">
                    <div className="p-6">
                        <div className="absolute top-4 right-4">
                            <button
                                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                                onClick={() => window.history.back()}
                            >
                                <span className="sr-only">Exit activity</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Press ESC to exit activity mode
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityLayout;
