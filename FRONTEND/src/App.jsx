import { Navigate, Routes, Route } from "react-router"

import Homepage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import OnboardPage from './pages/onboardPage'
import ChatPage from "./pages/ChatPage"
import NotificationPage from "./pages/NotificationPage"
import { useQuery } from "@tanstack/react-query"

import { Toaster } from "react-hot-toast";
import { axiosInstance } from "./lib/axios"



const App = () => {

  const { data: authData, isLoading, error } = useQuery({
    queryKey: ["authuser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },retry:false
  })

  const authuser = authData?.user

  return (
    <div className='h-screen text-5xl' data-theme="coffee">
      <Routes>
        <Route path='/' element={authuser ? <Homepage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authuser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!authuser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/onboarding' element={authuser ? <OnboardPage /> : <Navigate to="/login" />} />
        <Route path='/chat' element={authuser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path='/notifications' element={authuser ? <NotificationPage /> : <Navigate to="/login" />} />

      </Routes>
      <Toaster />
    </div>
  )
}

export default App