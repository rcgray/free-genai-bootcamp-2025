import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home Page</div>,
  },
  {
    path: '/words',
    element: <div>Words Page</div>,
  },
  {
    path: '/groups',
    element: <div>Groups Page</div>,
  },
  {
    path: '/activities',
    element: <div>Study Activities Page</div>,
  },
  {
    path: '/settings',
    element: <div>Settings Page</div>,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
