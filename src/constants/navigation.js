// constants/navigation.js
export const routes = {
  HOME: '/',
  SEARCH: '/search',
  CREATE: '/create',
  MY_MOODUPS: '/my-moodups',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  AUTH: '/auth'
};

export const navItems = [
  { id: 'home', icon: 'Home', route: routes.HOME },
  { id: 'search', icon: 'Search', route: routes.SEARCH },
  { id: 'create', icon: 'Plus', route: routes.CREATE },
  { id: 'my-moodups', icon: 'Smile', route: routes.MY_MOODUPS },
  { id: 'profile', icon: 'User', route: routes.PROFILE }
];
