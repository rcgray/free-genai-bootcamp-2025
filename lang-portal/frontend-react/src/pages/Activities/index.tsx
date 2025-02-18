import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { Activity, ApiResponse, PaginatedResponse } from '../../types/api';

type SortField = 'name';
type SortOrder = 'asc' | 'desc';

const ActivitiesPage = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<SortField>('name');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const pageSize = 25;

    // Function to get the image URL
    const getImageUrl = (activity: Activity) => {
        // Construct URL based on the game's URL (name)
        const dynamicUrl = `/games/images/${activity.url}.jpg`;
        try {
            return dynamicUrl;
        } catch (error) {
            console.error('Error loading image:', error);
            return ''; // Return empty string if image fails to load
        }
    };

    const { data, isLoading, error } = useQuery<ApiResponse<PaginatedResponse<Activity>>, Error>({
        queryKey: ['activities', currentPage, sortBy, sortOrder],
        queryFn: async () => {
            try {
                const response = await api.get('/api/activities', {
                    params: {
                        page: currentPage,
                        per_page: pageSize,
                        sort_by: sortBy,
                        order: sortOrder,
                    },
                });
                return response.data;
            } catch (err) {
                console.error('Error fetching activities:', err);
                throw err;
            }
        },
    });

    const handleSort = (field: SortField) => {
        if (sortBy === field) {
            setSortOrder(order => order === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const handleLaunch = (url: string) => {
        navigate(`/activities/${url}`);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 dark:border-blue-400"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 dark:text-red-400 text-center p-4">
                Error loading activities. Please try again later.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Activities</h1>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Sort by:</span>
                    <button
                        onClick={() => handleSort('name')}
                        className="px-3 py-1 text-sm rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                </div>
            </div>
            
            {/* Activity Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.data?.items.map((activity) => (
                    <div 
                        key={activity.id}
                        className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                    >
                        <div className="aspect-square relative overflow-hidden bg-slate-100 dark:bg-slate-700">
                            <img 
                                src={getImageUrl(activity)} 
                                alt={activity.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="20" x="2" y="2" rx="2"/><path d="M7 2v20M17 2v20M2 12h20M2 7h20M2 17h20"/></svg>';
                                }}
                            />
                        </div>
                        <div className="flex flex-col flex-grow p-4">
                            <div className="space-y-4 flex-grow">
                                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                    {activity.name}
                                </h2>
                                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                                    {activity.description}
                                </p>
                            </div>
                            <div className="pt-4 mt-auto">
                                <button
                                    onClick={() => handleLaunch(activity.url)}
                                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
                                >
                                    <span>Launch Activity</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrentPage(page => Math.min(data?.data?.total_pages || 1, page + 1))}
                        disabled={currentPage === (data?.data?.total_pages || 1)}
                        className="relative ml-3 inline-flex items-center rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                            Showing <span className="font-medium">{((currentPage - 1) * pageSize) + 1}</span> to{' '}
                            <span className="font-medium">{Math.min(currentPage * pageSize, data?.data?.total || 0)}</span> of{' '}
                            <span className="font-medium">{data?.data?.total}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button
                                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-slate-400 dark:text-slate-500 ring-1 ring-inset ring-slate-300 dark:ring-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="sr-only">Previous</span>
                                ←
                            </button>
                            {[...Array(data?.data?.total_pages || 0)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                        currentPage === i + 1
                                            ? 'z-10 bg-blue-600 dark:bg-blue-500 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                            : 'text-slate-900 dark:text-slate-200 ring-1 ring-inset ring-slate-300 dark:ring-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 focus:z-20 focus:outline-offset-0'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(page => Math.min(data?.data?.total_pages || 1, page + 1))}
                                disabled={currentPage === (data?.data?.total_pages || 1)}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-slate-400 dark:text-slate-500 ring-1 ring-inset ring-slate-300 dark:ring-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="sr-only">Next</span>
                                →
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivitiesPage; 