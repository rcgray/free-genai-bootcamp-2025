import { NavLink, useLocation } from 'react-router-dom';
import { routes } from '../../../config/routes';

const navItems = [
    { path: routes.home, label: 'Home' },
    { path: routes.words, label: 'Words' },
    { path: routes.groups, label: 'Groups' },
    { path: routes.activities, label: 'Study Activities' },
    { path: routes.sessions, label: 'Sessions' },
    { path: routes.settings, label: 'Settings' },
];

const Navigation = () => {
    const location = useLocation();

    return (
        <nav className="py-6 flex flex-col h-full">
            {/* App Title */}
            <div className="px-6 mb-8">
                <h1 className="text-xl font-semibold">🔰 日本語 Learning 🔰</h1>
            </div>

            {/* Navigation Links */}
            <ul className="flex-1 space-y-2">
                {navItems.map((item) => (
                    <li key={item.path}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `block px-6 py-2 transition-colors ${
                                    isActive
                                        ? 'bg-slate-700 border-l-4 border-blue-500'
                                        : 'hover:bg-slate-700/50'
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>

            {/* Current Page Display */}
            {/* <div className="px-6 py-4 border-t border-slate-700 mt-auto">
                <p className="text-sm text-slate-400">
                    Current Page: {location.pathname.split('/')[1] || 'Home'}
                </p>
            </div> */}
        </nav>
    );
};

export default Navigation;
