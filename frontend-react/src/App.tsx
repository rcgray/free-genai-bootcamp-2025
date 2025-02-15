import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './config/routes';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/Home';
import WordsPage from './pages/Words';
import GroupsPage from './pages/Groups';
import GroupDetailsPage from './pages/Groups/[id]';
import StudyActivitiesPage from './pages/StudyActivities';
import ActivityDetailsPage from './pages/StudyActivities/[id]';
import StudyPage from './pages/Study';
import SettingsPage from './pages/Settings';
import ErrorPage from './pages/Error';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={routes.home} element={<HomePage />} />
          <Route path={routes.words} element={<WordsPage />} />
          <Route path={routes.groups} element={<GroupsPage />} />
          <Route path={routes.groupDetails()} element={<GroupDetailsPage />} />
          <Route path={routes.activities} element={<StudyActivitiesPage />} />
          <Route path={routes.activityDetails()} element={<ActivityDetailsPage />} />
          <Route path={routes.study()} element={<StudyPage />} />
          <Route path={routes.settings} element={<SettingsPage />} />
          <Route path="/404" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
} 