import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Web_Routes from './Routes/Web_Routes'
import User_Managemrnt_Context from './Auths/User_Managemrnt_Context'
import toast, { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <User_Managemrnt_Context>
        <RouterProvider router={Web_Routes}></RouterProvider>
        <Toaster />
      </User_Managemrnt_Context>
    </QueryClientProvider>
  </StrictMode>,
)
