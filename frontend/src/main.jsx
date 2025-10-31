import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import AuthRegister from './pages/Auth/AuthRegister.jsx'
import AuthLogin from './pages/Auth/AuthLogin.jsx'
import Layout from './Layouts/Layout.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import UserProfile from './pages/Dashboard/UserProfile.jsx'
import AuthLogout from './pages/Auth/AuthLogout.jsx'
import SubmissionCreate from './pages/Submission/SubmissionCreate.jsx'
import SubmissionList from './pages/Submission/SubmissionList.jsx'
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useLocalStorage } from 'react-use'
import PublicRoute from './components/PublicRoute.jsx'
import SubmissionEdit from './pages/Submission/SubmissionEdit.jsx'
import AdminLogin from './pages/Admin/AdminLogin.jsx'
import Unauthorized from './pages/Error/Unauthorized.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'
import CmsLayout from './layouts/CmsLayout.jsx'
import UserList from './pages/User/UserList.jsx'
import UserCreate from './pages/User/UserCreate.jsx'
import UserEdit from './pages/User/UserEdit.jsx'

function App() {
  const [token] = useLocalStorage("token");
  const [role] = useLocalStorage("role");

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />
        <Route path="/register" element={
          <PublicRoute>
            <AuthRegister />
          </PublicRoute>
        } />
        <Route path="/login" element={
          <PublicRoute>
            <AuthLogin />
          </PublicRoute>
        }
        />
        <Route path="/logout" element={<AuthLogout />} />
      </Route>
      <Route path='/dashboard' element={<ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>}>
        <Route path="users">
          <Route path="profile" element={<UserProfile />} />
        </Route>
        <Route path="submissions">
          <Route index element={<SubmissionList />} />
          <Route path="create" element={<SubmissionCreate />} />
          <Route path=":id" element={<SubmissionEdit />} />
        </Route>
      </Route>

      {/* ========== ADMIN AREA ========== */}
      <Route path="/cms/login" element={<AdminLogin />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/cms"
        element={
          !token && role !== "admin" && role !== "superAdmin"
            ? <Navigate to="/cms/login" replace />
            : <Navigate to="/cms/dashboard" replace />
        }
      />

      {/* Rute khusus admin */}
      <Route
        path="/cms"
        element={
          <AdminRoute>
            <CmsLayout />
          </AdminRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users">
          <Route index element={<UserList />} />
          <Route path="create" element={<UserCreate />} />
          <Route path=":id" element={<UserEdit />} />
        </Route>
      </Route>
    </Routes>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
