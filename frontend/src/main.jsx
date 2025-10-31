import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import AuthRegister from './pages/Auth/AuthRegister.jsx'
import AuthLogin from './pages/Auth/AuthLogin.jsx'
import Layout from './Layouts/Layout.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import UserProfile from './pages/Dashboard/UserProfile.jsx'
import AuthLogout from './pages/Auth/AuthLogout.jsx'
import SubmissionCreate from './pages/Submission/SubmissionCreate.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/register" element={<AuthRegister />} />
          <Route path="/login" element={<AuthLogin />} />
          <Route path="/logout" element={<AuthLogout />} />
        </Route>
        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route path="users">
            <Route path="profile" element={<UserProfile />} />
          </Route>
          <Route path="submissions">
            <Route path="create" element={<SubmissionCreate />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
