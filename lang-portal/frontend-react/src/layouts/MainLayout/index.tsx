import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex">
            {/* Left Sidebar Navigation */}
            <div className="w-64 bg-slate-800 text-white fixed h-full">
                <Navigation />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 ml-64">
                <main className="container mx-auto px-8 py-6">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
