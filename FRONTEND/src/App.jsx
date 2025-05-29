import { Navigate, Routes, Route } from "react-router"

import Homepage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import OnboardPage from './pages/onboardPage'
import ChatPage from "./pages/ChatPage"
import NotificationPage from "./pages/NotificationPage"
import PageLoader from "./components/pageLoader"


import { Toaster } from "react-hot-toast";
import useAuthUser from "./hooks/useAuthUser"




const App = () => {

  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded
  if (isLoading) return <PageLoader />
  return (
    <div className="h-screen" data-theme="forest" >
      <Routes>
        {/* home page */}
        <Route
          path='/'
          element={
            isAuthenticated && isOnboarded ? (
              <Homepage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )} />



        <Route path='/signup' element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />

        {/* Onboarding Page */}
        <Route
          path='/onboarding'
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardPage />
              ) : (
                <Navigate to={"/"} />
              )
            ) : (
              <Navigate to={"/login"} />
            )
          } />

        <Route path='/chat' element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path='/notifications' element={isAuthenticated ? <NotificationPage /> : <Navigate to="/login" />} />

      </Routes>
      <Toaster />
    </div>
  )
}

export default App