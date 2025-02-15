export const routes = {
  home: '/',
  words: '/words',
  groups: '/groups',
  groupDetails: (id: string | number = ':id') => `/groups/${id}`,
  activities: '/activities',
  activityDetails: (id: string | number = ':id') => `/activities/${id}`,
  study: (activityId: string | number = ':activityId', groupId: string | number = ':groupId') => 
    `/study/${activityId}/${groupId}`,
  settings: '/settings'
} as const;

export type AppRoute = typeof routes; 