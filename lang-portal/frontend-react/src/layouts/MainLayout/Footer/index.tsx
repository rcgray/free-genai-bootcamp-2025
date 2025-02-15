const Footer = () => {
    return (
        <footer className="bg-white shadow dark:bg-gray-800 mt-8">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} Language Portal. All rights reserved.
                    </div>
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                            About
                        </a>
                        <a
                            href="#"
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                            Privacy
                        </a>
                        <a
                            href="#"
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                            Terms
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
