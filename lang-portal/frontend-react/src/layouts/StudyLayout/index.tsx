import { Outlet, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const StudyLayout = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-white shadow dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="flex items-center h-16">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                        >
                            <ArrowLeftIcon className="h-5 w-5 mr-2" />
                            Back
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8">
                <Outlet />
            </main>

            <footer className="bg-white shadow dark:bg-gray-800">
                <div className="container mx-auto px-4 py-4">
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                        Press ESC to exit study mode
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default StudyLayout;
