import { http, HttpResponse } from 'msw';

// Sample data for tests
const mockWords = [
    {
        id: 1,
        kanji: '猫',
        romaji: 'neko',
        english: 'cat',
        parts: ['noun'],
        correct_count: 5,
        wrong_count: 1,
    },
];

const mockGroups = [
    {
        id: 1,
        name: 'Animals',
        words_count: 10,
    },
];

// Define handlers array
export const handlers = [
    // Words endpoints
    http.get('/api/words', () => {
        return HttpResponse.json({
            data: {
                items: mockWords,
                total: 1,
                page: 1,
                per_page: 20,
                total_pages: 1,
            },
            error: null,
        });
    }),

    // Groups endpoints
    http.get('/api/groups', () => {
        return HttpResponse.json({
            data: {
                items: mockGroups,
                total: 1,
                page: 1,
                per_page: 20,
                total_pages: 1,
            },
            error: null,
        });
    }),
];
