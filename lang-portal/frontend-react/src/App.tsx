import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/Home'
import WordsPage from './pages/Words'
import GroupsPage from './pages/Groups'
import GroupDetailsPage from './pages/Groups/[id]'
import StudyActivitiesPage from './pages/StudyActivities'
import ActivityDetailsPage from './pages/StudyActivities/[id]'
import StudyPage from './pages/Study'
import SettingsPage from './pages/Settings'
import ErrorPage from './pages/Error'
import { routes } from './config/routes'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: routes.home, element: <HomePage /> },
      { path: routes.words, element: <WordsPage /> },
      { path: routes.groups, element: <GroupsPage /> },
      { path: routes.groupDetails(), element: <GroupDetailsPage /> },
      { path: routes.activities, element: <StudyActivitiesPage /> },
      { path: routes.activityDetails(), element: <ActivityDetailsPage /> },
      { path: routes.study(), element: <StudyPage /> },
      { path: routes.settings, element: <SettingsPage /> },
      { path: '/404', element: <ErrorPage /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
