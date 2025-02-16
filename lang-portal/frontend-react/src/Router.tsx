import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/Home';
import WordsPage from './pages/Words';
import GroupsPage from './pages/Groups';
import GroupDetailsPage from './pages/Groups/[id]';
import StudyActivitiesPage from './pages/StudyActivities';
import ActivityDetailsPage from './pages/StudyActivities/[id]';
import SessionsPage from './pages/Sessions';
import SettingsPage from './pages/Settings';
import ErrorPage from './pages/Error';

const Router = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/words" element={<WordsPage />} />
                <Route path="/groups" element={<GroupsPage />} />
                <Route path="/groups/:id" element={<GroupDetailsPage />} />
                <Route path="/activities" element={<StudyActivitiesPage />} />
                <Route path="/activities/:id" element={<ActivityDetailsPage />} />
                <Route path="/sessions" element={<SessionsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/404" element={<ErrorPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Route>
        </Routes>
    );
};

export default Router; 