import { Routes, Route, Navigate } from 'react-router'
import { Layout } from '../layout/Layout'
import { LoginComponent } from '../components/LoginComponent'
import { RegisterComponent } from '../components/RegisterComponent'
import { ProtectedRoute } from './ProtectedRoute'
import { TasksPage } from '../pages/TasksPage'
import { RootRedirect } from './RootRedirect'
import { ChangePasswordComponent } from '../components/ChangePasswordComponent'

export const AppRouter = () => {
  return (
    <Routes>
        <Route element={<Layout />}>

          {/* public */}
          <Route path="login" element={<LoginComponent />} />
          <Route path="register" element={<RegisterComponent />} />

          {/* protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/changePassword" element={<ChangePasswordComponent />} />
          </Route>

        </Route>

        {/* Root */}
        <Route path="/" element={<RootRedirect />} />
      
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}