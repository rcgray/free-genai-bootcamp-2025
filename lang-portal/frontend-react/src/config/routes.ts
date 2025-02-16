export const routes = {
  home: '/',
  words: '/words',
  groups: '/groups',
  activities: '/activities',
  settings: '/settings',
} as const;

export type AppRoute = typeof routes; 