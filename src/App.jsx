import './App.css'
import 'aos/dist/aos.css';
import { ToastContainer } from 'react-toastify';
import { Route, Routes,useLocation } from 'react-router-dom'
import Landing from './User/Landing';
import Wishlist from './User/Wishlist'
import Cart from './User/Cart'
import Footer from './components/Footer'
import UserAuth from './User/UserAuth'
import Petcard from './User/Petcard'
import Appointment from './User/Appointment'
import PetcareVideo from './User/PetcareVideo'
import Details from './User/Details'
import Buypage from './User/Buypage'
import Profile from './User/Profile';
import EditProfile from './User/EditProfile';
import Pets from './Admin/Pets';
import Orders from './Admin/Orders';
import Customers from './Admin/Customers';
import PetDetail from './Admin/PetDetail';
import AppointmentView from './Admin/AppointmentView';
import Feedback from './Admin/Feedback';
import { useContext } from 'react';
import { authcontext } from './ContextApi/Context';
import Scrolltop from './User/Scrolltop';
import PaymentSuccess from './User/PaymentSuccess';
import PaymentError from './User/PaymentError';
import SearchResult from './components/SearchResult';
import AdminAuth from './Admin/AdminAuth';


function App() {
    const location = useLocation();
      const isAdminRoute = location.pathname.startsWith('/admin');

  const{authing}=useContext(authcontext)

  return (
    <>
     <Scrolltop/>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/cart' element={authing?<Cart /> : <UserAuth/>} />
        <Route path='/wishlist' element={authing?<Wishlist />: <UserAuth/>} />
        <Route path='/userauth' element={<UserAuth />} />
        <Route path='/appointment' element={authing?<Appointment />: <UserAuth/>} />
        <Route path='/carevideo' element={authing?<PetcareVideo />:<UserAuth/>} />
        <Route path='/petcard' element={<Petcard />} />
        <Route path='/details' element={<Details />} />
        <Route path='/buy' element={authing?<Buypage />: <UserAuth/>} />
        <Route path='/profile' element={authing?<Profile />: <UserAuth/>} />
        <Route path='/editprofile' element={authing?<EditProfile />: <UserAuth/>} />
        <Route path='/admindash' element={authing?<Pets />: <UserAuth/>} />
        <Route path='/adminorders' element={authing?<Orders />: <UserAuth/>} />
        <Route path='/admincustomers' element={authing?<Customers />: <UserAuth/>} />
        <Route path='/petdetails' element={authing?<PetDetail />: <UserAuth/>} />
        <Route path='/adminappointmentview' element={authing?<AppointmentView />: <UserAuth/>} />
        <Route path='/adminfeedback' element={authing?<Feedback />: <UserAuth/>} />
        <Route path='/paymentsuccess' element={authing?<PaymentSuccess/>: <UserAuth/>}/>
        <Route path='/paymenterror' element={authing?<PaymentError/>:<UserAuth/>} />
        <Route path="/search" element={<SearchResult/>} />

      </Routes>
{!isAdminRoute && <Footer/>}
<ToastContainer/>
    </>
  )
}

export default App
