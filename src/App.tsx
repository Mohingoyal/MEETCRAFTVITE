//import CitizenRegistration from './Citizen/CitizenRegistration'
import Admin_events from './events/Admin_events'
import { Route, Routes } from 'react-router-dom'
//import EventSearch from './events/EventSearch'
//import Fav from './favourites/Fav'
//import VendorReg from './Vendor/VendorReg'
import Index from './Index'
import Login from './Login'
import Signup from './Signup'
import LoginRequired from './LoginRequired'
import CitizenDash from './Citizen/CitizenDash'
import VendorDash from './Vendor/VendorDash'
import DashboardNavbar from './DashboardNavbar'
import Home from './Home'
import ForgotPassword from './ForgotPassword'
function App() {

  return (
    // <Admin_events></Admin_events>

    <Routes>
      <Route path='/' element={<Index ></Index>}>
      <Route index element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>} ></Route>
        <Route path='/signup' element={<Signup></Signup>} ></Route>
        <Route path='/forgotpassword' element={<ForgotPassword></ForgotPassword>}></Route>
      </Route>
      <Route path='/DashboardNavbar' element={<DashboardNavbar ></DashboardNavbar>} >
        <Route path='/DashboardNavbar/Citizendash' element={<CitizenDash />} />
        <Route path='/DashboardNavbar/Vendordash' element={<VendorDash />} />
      </Route>
      <Route path='/LoginRequired' element={<LoginRequired></LoginRequired>}></Route>
            <Route path='/Admin_events' element={<Admin_events></Admin_events>}></Route>
    </Routes>
   

  )
  //     <Route path='/DashboardNavbar' element={<DashboardNavbar ></DashboardNavbar>} >
      //   <Route path='/DashboardNavbar/Citizendash' element={<CitizenDash />} />
      //   <Route path='/DashboardNavbar/Vendordash' element={<VendorDash />} />
      // </Route>this is important ki path mein relative naming deni hai
}

export default App
