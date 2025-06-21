import { createBrowserRouter } from 'react-router-dom'
import LandingPageLayout from './layouts/LandingPageLayout'
import { Chat } from '@/modules/Chat'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPageLayout />,
    children: [
      {
        path: '/',
        element: <Chat />,
      }
    ],
  },
])

export default router
