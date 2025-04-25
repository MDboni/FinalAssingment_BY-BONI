import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ByBrandPage from './pages/ByBrandPage'
import ByCategoryPage from './pages/ByCategoryPage'
import ByRemarkPage from './pages/ByRemarkPage'
import ProductDetails from './pages/ProductDetails'
import LoginPage from './pages/LoginPage'
import OtpPage from './pages/OtpPage'
import ProfilePage from './pages/profile-page';


function App() {
  

  return (
   
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/by-brand/:id' element={<ByBrandPage/>}/>
        <Route path='/by-category/:id' element={<ByCategoryPage/>}/>
        <Route path='/by-keyword/:keyword' element={<ByRemarkPage/>}/>
        <Route path="/details/:id" element={<ProductDetails/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/otp" element={<OtpPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
