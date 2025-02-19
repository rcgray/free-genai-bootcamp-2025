import axios from 'axios';

export interface Word {
  id: number;
  kanji: string;
  romaji: string;
  english: string;
  correct_count: number;
  wrong_count: number;
}

interface WordsResponse {
  data: {
    items: Word[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
  };
  error: string | null;
}

interface GroupWordsResponse {
  data: {
    id: number;
    name: string;
    words: Word[];
  };
  error: string | null;
}

interface Group {
  id: number;
  name: string;
  words_count: number;
}

interface GroupsResponse {
  data: {
    items: Group[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
  };
  error: string | null;
}

export class WordService {
  private wordCache: Map<number, Word[]> = new Map();
  private groupCache: Group[] = [];
  private currentGroupId: number | null = null;
  private readonly API_BASE = 'http://localhost:8000/api';

  private async fetchAllPaginatedWords<T extends WordsResponse | GroupWordsResponse>(
    url: string,
    params: Record<string, any> = {},
    extractWords: (response: T) => Word[]
  ): Promise<Word[]> {
    const allWords: Word[] = [];
    let currentPage = 1;
    let totalPages = 1;

    do {
      console.log(`Fetching page ${currentPage}...`);
      const response = await axios.get<T>(url, {
        params: {
          ...params,
          page: currentPage,
          per_page: 100  // Maximum allowed value
        }
      });

      const words = extractWords(response.data);
      allWords.push(...words);

      // For GroupWordsResponse, we get all words in one request
      if ('words' in response.data.data) {
        break;
      }

      // For WordsResponse, we need to handle pagination
      totalPages = response.data.data.total_pages;
      currentPage++;
    } while (currentPage <= totalPages);

    console.log(`Fetched total of ${allWords.length} words`);
    return allWords;
  }

  async fetchGroups(): Promise<Group[]> {
    try {
      console.log('WordService: Starting to fetch groups...');
      const response = await axios.get<GroupsResponse>(`${this.API_BASE}/groups`, {
        params: {
          per_page: 100,  // Maximum allowed value
          sort_by: 'name',
          order: 'asc'
        }
      });
      console.log('WordService: Raw API response:', {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      });
      
      if (!response.data) {
        console.error('WordService: No data received from API');
        throw new Error('No data received from API');
      }

      if (!response.data.data) {
        console.error('WordService: Unexpected response structure:', response.data);
        throw new Error('Unexpected response structure');
      }
      
      const groups = response.data.data.items;
      console.log('WordService: Processed groups:', groups);
      
      if (!groups || groups.length === 0) {
        console.warn('WordService: No groups found in response');
      }
      
      this.groupCache = groups;
      return groups;
    } catch (error) {
      console.error('WordService: Error fetching groups:', error);
      if (axios.isAxiosError(error)) {
        console.error('WordService: Response data:', error.response?.data);
        console.error('WordService: Response status:', error.response?.status);
        console.error('WordService: Response headers:', error.response?.headers);
      }
      throw error;
    }
  }

  async fetchWordsByGroup(groupId: number): Promise<Word[]> {
    console.log(`Fetching words for group ${groupId}...`);
    if (this.wordCache.has(groupId)) {
      console.log('Returning cached words for group:', groupId);
      return this.wordCache.get(groupId)!;
    }

    try {
      console.log('Making API request to fetch words...');
      let words: Word[];
      
      // For "All Words" case, use the words endpoint with no group filter
      if (groupId === -1) {
        words = await this.fetchAllPaginatedWords<WordsResponse>(
          `${this.API_BASE}/words`,
          {
            sort_by: 'romaji',
            order: 'asc'
          },
          (response) => response.data.items
        );
      } else {
        // For specific groups, use the groups/:id endpoint to get words
        words = await this.fetchAllPaginatedWords<GroupWordsResponse>(
          `${this.API_BASE}/groups/${groupId}`,
          {
            sort_by: 'romaji',
            order: 'asc'
          },
          (response) => response.data.words
        );
      }

      console.log(`Fetched ${words.length} words for group ${groupId}:`, 
        words.map(w => ({ id: w.id, kanji: w.kanji, romaji: w.romaji, english: w.english }))
      );
      this.wordCache.set(groupId, words);
      return words;
    } catch (error) {
      console.error('Error fetching words:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response:', error.response?.data);
        console.error('Status:', error.response?.status);
      }
      throw error;
    }
  }

  async selectRandomWords(count: number): Promise<Word[]> {
    console.log(`Selecting ${count} random words...`);
    const groupId = this.getCurrentGroupId();
    if (groupId === undefined) {
      console.error('No group selected');
      return [];
    }

    console.log(`Fetching words for group ${groupId}...`);
    const words = await this.fetchWordsByGroup(groupId);
    console.log(`Got ${words.length} words from group ${groupId}`);
    
    if (words.length === 0) {
      console.error('No words available from API');
      return [];
    }

    if (words.length < count) {
      console.warn(`Not enough words available (requested: ${count}, available: ${words.length})`);
      return words;
    }

    const selectedWords: Word[] = [];
    const availableIndices = Array.from({ length: words.length }, (_, i) => i);

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      const wordIndex = availableIndices.splice(randomIndex, 1)[0];
      selectedWords.push(words[wordIndex]);
    }

    console.log('Selected words:', selectedWords.map(w => ({
      id: w.id,
      kanji: w.kanji,
      romaji: w.romaji,
      english: w.english,
      group_id: groupId
    })));
    return selectedWords;
  }

  getCurrentGroupId(): number {
    if (this.currentGroupId === null) {
      console.warn('No group ID set, defaulting to all words (-1)');
      return -1;
    }
    console.log('Current group ID:', this.currentGroupId);
    return this.currentGroupId;
  }

  setCurrentGroupId(groupId: number): void {
    console.log('Setting current group ID:', groupId);
    this.currentGroupId = groupId;
    // Clear the word cache when changing groups
    this.wordCache.clear();
  }

  clearCache(): void {
    console.log('Clearing cache');
    this.wordCache.clear();
    this.groupCache = [];
    this.currentGroupId = null;
  }
}

export const wordService = new WordService();