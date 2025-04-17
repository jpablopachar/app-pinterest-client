import { lazy } from 'react'
import { Route, Routes } from 'react-router'

const AppRoutes = () => {
  const MainLayout = lazy(() => import('./layouts/Main/Main'))
  const Homepage = lazy(() => import('./pages/Home/Home'))
  const AuthPage = lazy(() => import('./pages/Auth/Auth'))

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Homepage />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  )
}

export default AppRoutes
