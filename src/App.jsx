import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Home from './pages/Home'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import SiteLayout from './layouts/SiteLayout';

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route element={<SiteLayout />}>
      <Route index element={<Home />} />
    </Route>
  </Route>
))

function App() {

  return (
    <>
      <ToastContainer position='top-center' />
      <RouterProvider router={router} />
    </>
  )
}

export default App
