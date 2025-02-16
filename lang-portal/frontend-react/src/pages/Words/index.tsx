import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

interface WordPart {
    kanji: string;
    romaji: string[];
}

interface Word {
    id: number;
    kanji: string;
    romaji: string;
    english: string;
    parts: WordPart[];
    correct_count?: number;
    wrong_count?: number;
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

type SortField = 'kanji' | 'romaji' | 'english' | 'correct_count' | 'wrong_count';
type SortOrder = 'asc' | 'desc';

const WordsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<SortField>('romaji');
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
    const pageSize = 25;

    const { data, isLoading, error } = useQuery<ApiResponse<PaginatedResponse<Word>>, Error>({
        queryKey: ['words', currentPage, sortBy, sortOrder],
        queryFn: async () => {
            try {
                const response = await api.get('/api/words', {
                    params: {
                        page: currentPage,
                        per_page: pageSize,
                        sort_by: sortBy,
                        order: sortOrder,
                    },
                });
                return response.data;
            } catch (err) {
                console.error('Error fetching words:', err);
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
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center p-4">
                Error loading words. Please try again later.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Words</h1>
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Add New Word
                </button>
            </div>
            
            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                                onClick={() => handleSort('kanji')}
                            >
                                Kanji {renderSortIcon('kanji')}
                            </th>
                            <th 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                                onClick={() => handleSort('romaji')}
                            >
                                Romaji {renderSortIcon('romaji')}
                            </th>
                            <th 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                                onClick={() => handleSort('english')}
                            >
                                English {renderSortIcon('english')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Parts
                            </th>
                            <th 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-100"
                                onClick={() => handleSort('correct_count')}
                            >
                                Score {renderSortIcon('correct_count')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {data?.data?.items.map((word) => (
                            <tr key={word.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                    {word.kanji}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                    {word.romaji}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                    {word.english}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500">
                                    <div className="flex flex-wrap gap-1">
                                        {word.parts.map((part, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800"
                                                title={part.romaji.join(',')}
                                            >
                                                {part.kanji}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-600">✓ {word.correct_count || 0}</span>
                                        <span className="text-red-600">✗ {word.wrong_count || 0}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                                        <button className="text-red-600 hover:text-red-900">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrentPage(page => Math.min(data?.data?.total_pages || 1, page + 1))}
                        disabled={currentPage === (data?.data?.total_pages || 1)}
                        className="relative ml-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-slate-700">
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
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                            ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                            : 'text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:z-20 focus:outline-offset-0'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(page => Math.min(data?.data?.total_pages || 1, page + 1))}
                                disabled={currentPage === (data?.data?.total_pages || 1)}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default WordsPage; 