import { Navigate, Routes, Route } from "react-router"

import Homepage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import OnboardPage from './pages/OnboardPage'
import ChatPage from "./pages/ChatPage"
import NotificationPage from "./pages/NotificationPage"
import PageLoader from "./components/PageLoader"
import Layout from "./components/Layout"


import { Toaster } from "react-hot-toast";
import useAuthUser from "./hooks/useAuthUser"
import { useThemeStore } from "./store/useThemeStore"
import { useSocketStore } from "./store/useSocketStore"
import { useEffect } from "react"




const App = () => {
  const { connectSocket } = useSocketStore();
  const { theme } = useThemeStore();
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded
  
  useEffect(() => {
    if (authUser?._id) {
      connectSocket(authUser._id);
    }
  }, [authUser?._id]);


  
  if (isLoading) return <PageLoader />



  return (
    <div className="h-screen" data-theme={theme} >
      <Routes>
        {/* home page */}
        <Route
          path='/'
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <Homepage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )} />


        {/* SignUpPage */}

        <Route path='/signup' element={!isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />

        {/* LoginPage */}

        <Route path='/login' element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />

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

        {/* chat section */}

        <Route path='/chat/:id' element={
          isAuthenticated && isOnboarded ? (
            <Layout showSidebar={false}>
              <ChatPage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )} />

        {/* notifications */}

        <Route
          path='/notifications'
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
              <NotificationPage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )} />


      </Routes>
      <Toaster />
    </div>
  )
}

export default App