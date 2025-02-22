import { Outlet, useNavigate } from 'react-router-dom';

const ActivityLayout = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 bg-white dark:bg-slate-900">
            {/* Exit button */}
            <button
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                onClick={() => navigate('/activities')}
            >
                <span className="sr-only">Exit activity</span>
                <svg
                    className="h-6 w-6 text-slate-500 dark:text-slate-400"
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

            {/* Game container */}
            <div className="h-full w-full overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
};

export default ActivityLayout;
