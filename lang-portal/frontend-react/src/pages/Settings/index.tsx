import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const SettingsPage = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold dark:text-white">Settings</h1>
            
            <div className="max-w-xl">
                <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <h3 className="text-lg font-medium leading-6 text-slate-900 dark:text-white">
                                Dark Mode
                            </h3>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Toggle between light and dark themes
                            </p>
                        </div>
                        <button
                            type="button"
                            className={`
                                relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                                transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                ${isDarkMode ? 'bg-blue-600' : 'bg-slate-200'}
                            `}
                            role="switch"
                            aria-checked={isDarkMode}
                            onClick={toggleDarkMode}
                        >
                            <span
                                aria-hidden="true"
                                className={`
                                    pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
                                    transition duration-200 ease-in-out
                                    ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}
                                `}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage; 