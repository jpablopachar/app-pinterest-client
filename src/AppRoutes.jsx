import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './layouts/Main/Main'

const AppRoutes = () => {
  const Home = lazy(() => import('./pages/Home/Home'))
  const Auth = lazy(() => import('./pages/Auth/Auth'))

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Main />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppRoutes
