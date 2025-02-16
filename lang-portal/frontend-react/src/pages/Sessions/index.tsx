import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

interface StudySession {
    id: number;
    group_id: number;
    study_activity_id: number;
    created_at: string;
    reviews: Array<{
        id: number;
        word_id: number;
        correct: boolean;
        created_at: string;
    }>;
}

interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
}

interface ApiResponse<T> {
    data: T;
    error: string | null;
}

type SortField = 'created_at' | 'group_id' | 'study_activity_id';
type SortOrder = 'asc' | 'desc';

const SessionsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<SortField>('created_at');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
    const pageSize = 25;

    const { data, isLoading, error } = useQuery<ApiResponse<PaginatedResponse<StudySession>>, Error>({
        queryKey: ['sessions', currentPage, sortBy, sortOrder],
        queryFn: async () => {
            try {
                const response = await api.get('/api/study_sessions', {
                    params: {
                        page: currentPage,
                        per_page: pageSize,
                        sort_by: sortBy,
                        order: sortOrder,
                    },
                });
                return response.data;
            } catch (err) {
                console.error('Error fetching sessions:', err);
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

    const renderSortIcon = (field: SortField) => {
        if (sortBy !== field) return '↕';
        return sortOrder === 'asc' ? '↑' : '↓';
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
                Error loading sessions. Please try again later.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Study Sessions</h1>
            </div>
            
            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-800">
                        <tr>
                            <th 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                                onClick={() => handleSort('created_at')}
                            >
                                Date {renderSortIcon('created_at')}
                            </th>
                            <th 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                                onClick={() => handleSort('group_id')}
                            >
                                Group {renderSortIcon('group_id')}
                            </th>
                            <th 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                                onClick={() => handleSort('study_activity_id')}
                            >
                                Activity {renderSortIcon('study_activity_id')}
                            </th>
                            <th 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                            >
                                Reviews
                            </th>
                            <th 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                            >
                                Score
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-700">
                        {data?.data?.items.map((session) => {
                            const totalReviews = session.reviews.length;
                            const correctReviews = session.reviews.filter(r => r.correct).length;
                            const accuracy = totalReviews > 0 ? (correctReviews / totalReviews) * 100 : 0;
                            
                            return (
                                <tr key={session.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                        {new Date(session.created_at).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                        {session.group_id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                        {session.study_activity_id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                        {totalReviews}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-600 dark:text-green-400">✓ {correctReviews}</span>
                                            <span className="text-red-600 dark:text-red-400">✗ {totalReviews - correctReviews}</span>
                                            <span className="text-slate-500 dark:text-slate-400">
                                                ({accuracy.toFixed(1)}%)
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
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

export default SessionsPage; 