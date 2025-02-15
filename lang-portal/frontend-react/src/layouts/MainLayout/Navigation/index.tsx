import { Link, NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="bg-white shadow dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="text-xl font-bold">
                        Language Portal
                    </Link>

                    <div className="flex space-x-4">
                        <NavLink
                            to="/words"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-md text-sm font-medium ${isActive
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            Words
                        </NavLink>
                        <NavLink
                            to="/groups"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-md text-sm font-medium ${isActive
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            Groups
                        </NavLink>
                        <NavLink
                            to="/activities"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-md text-sm font-medium ${isActive
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                                }`
                            }
                        >
                            Study
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
