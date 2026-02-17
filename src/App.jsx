import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import AdminPage from "./pages/adminPage";
import Test from "./pages/test";
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPasswordPage from './pages/forgetPasswordPage';

function App() {

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Toaster position='top-right' />
        <div className='w-full h-screen'>
          <Routes>
            <Route path="/*" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/test" element={<Test />} />
            <Route path="/reset-password" element={<ForgetPasswordPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
