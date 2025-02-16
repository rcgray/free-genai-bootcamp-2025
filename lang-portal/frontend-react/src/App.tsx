import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
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

// Simple placeholder pages for testing
const Home = () => <div className="text-2xl">Home Page</div>
const Words = () => <div className="text-2xl">Words Page</div>
const Groups = () => <div className="text-2xl">Groups Page</div>
const Activities = () => <div className="text-2xl">Study Activities Page</div>
const Settings = () => <div className="text-2xl">Settings Page</div>
const Error = () => <div className="text-2xl">Error Page</div>

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/words', element: <Words /> },
      { path: '/groups', element: <Groups /> },
      { path: '/activities', element: <Activities /> },
      { path: '/settings', element: <Settings /> },
      { path: '/404', element: <Error /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
