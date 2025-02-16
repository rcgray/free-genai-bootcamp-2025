import { GitHubLogoIcon } from '@radix-ui/react-icons'

const Footer = () => {
    return (
        <footer className="py-4 px-8 border-t border-slate-200">
            <div className="container mx-auto">
                <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                    <span>© 2025 R.C. Gray. Released under MIT License.</span>
                    <a
                        href="https://github.com/rcgray/free-genai-bootcamp-2025"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center hover:text-slate-700 transition-colors"
                        aria-label="View source on GitHub"
                    >
                        <GitHubLogoIcon className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
