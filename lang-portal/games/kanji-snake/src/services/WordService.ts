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
  };
  error: string | null;
}

export class WordService {
  private wordCache: Map<number, Word[]> = new Map();
  private groupCache: Group[] = [];
  private currentGroupId: number | null = null;
  private readonly API_BASE = '/api';

  async fetchGroups(): Promise<Group[]> {
    console.log('Fetching groups...');
    if (this.groupCache.length > 0) {
      console.log('Returning cached groups:', this.groupCache);
      return this.groupCache;
    }

    try {
      console.log('Making API request to fetch groups...');
      const response = await axios.get<GroupsResponse>(`${this.API_BASE}/groups`, {
        params: {
          per_page: 100,
          sort_by: 'name',
          order: 'asc'
        }
      });

      console.log('Groups API response:', response.data);
      this.groupCache = response.data.data.items;
      return this.groupCache;
    } catch (error) {
      console.error('Error fetching groups:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response:', error.response?.data);
        console.error('Status:', error.response?.status);
      }
      return [];
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
      const params: any = {
        per_page: 100,
        sort_by: 'romaji',
        order: 'asc'
      };

      // Only add group_id parameter if not fetching all words
      if (groupId !== -1) {
        params.group_id = groupId;
      }

      const response = await axios.get<WordsResponse>(`${this.API_BASE}/words`, { params });

      console.log('Words API response:', response.data);
      const words = response.data.data.items;
      this.wordCache.set(groupId, words);
      this.currentGroupId = groupId;
      return words;
    } catch (error) {
      console.error('Error fetching words:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response:', error.response?.data);
        console.error('Status:', error.response?.status);
      }
      return [];
    }
  }

  async selectRandomWords(count: number): Promise<Word[]> {
    console.log(`Selecting ${count} random words...`);
    const groupId = this.getCurrentGroupId();
    if (groupId === undefined) {
      console.error('No group selected');
      return [];
    }

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

    console.log('Selected words:', selectedWords.map(w => ({ id: w.id, kanji: w.kanji, romaji: w.romaji })));
    return selectedWords;
  }

  getCurrentGroupId(): number {
    return this.currentGroupId ?? -1;
  }

  setCurrentGroupId(groupId: number): void {
    console.log('Setting current group ID:', groupId);
    this.currentGroupId = groupId;
  }

  clearCache(): void {
    console.log('Clearing cache');
    this.wordCache.clear();
    this.groupCache = [];
    this.currentGroupId = null;
  }
}

export const wordService = new WordService(); 