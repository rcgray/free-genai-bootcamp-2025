import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../../config/routes';
import { useTheme } from '../../../contexts/ThemeContext';

const navItems = [
  { to: routes.home, label: 'Home' },
  { to: routes.words, label: 'Words' },
  { to: routes.groups, label: 'Groups' },
  { to: routes.activities, label: 'Study Activities' },
  { to: routes.settings, label: 'Settings' },
];

export default function Navigation() {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-neutral-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            {navItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link ${pathname === to ? 'nav-link-active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
} 