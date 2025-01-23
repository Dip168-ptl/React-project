import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';


import { AuthProvider } from './pages/AuthContext'; 
import Home from './pages/Home.js';
import Customerdash from './pages/Customerdash.js';
import Category from './pages/Category.js';
import Aboutus from './pages/Aboutus.js';
import Contactus from './pages/Contactus.js'
import Login from './pages/Login.js';
import Register from './pages/register.js';
import ForgotPass from './pages/Forgotpass.js';
import Profile from './pages/Profile.js';

import Menu from './pages/RManager/menu.js';

// import RestaurantManager from './pages/RManager/rest_manager.js';
import OrderList from './pages/RManager/OrderList.js';
import OrderDetails from './pages/RManager/OrderDetails.js';
import CustomerList from './pages/RManager/CustomerList.js';
import AddCustomer from './pages/RManager/AddCustomer.js';
import EditCustomer from './pages/RManager/EditCustomer.js';
import Restaurant from './pages/RManager/Restaurant.js';
import AddRestaurant from './pages/RManager/AddRestaurant.js';
import Manageritem from './pages/RManager/Manageitem.js';
import EditRestaurant from './pages/RManager/EditRestaurant.js';
import Categories from './pages/RManager/Rcategory.js'; 




//for restaurant manger operations
import Managerdash from './pages/RManager/managerdash.js';
import ManageMenuItems from './pages/RManager/manage_mitem.js'; 
import ViewOrders from './pages/RManager/view_order.js'; 
import Reports from './pages/RManager/report.js'; 
import AdminPage from './pages/Admin-dash/Adminpage.js';
import JoinRequests from './pages/Admin-dash/joinrequest.js';
import ManageDishes from './pages/RManager/Managedishes.js'
// import DeliveredOrders from './components/DeliveredOrders';
// import Feedback from './components/Feedback';


function App() {

  // const [loggedIn, setLoggedIn] = useState(false); // State to manage logged-in status


  return (
 

    <AuthProvider>
    <Router>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/home" element={<Home />} />
         <Route path="/AuthContext" element={<AuthProvider />} />
         <Route path="/Category" element={<Category />} />
         <Route path="/aboutus" element={<Aboutus/>} />
         <Route path="/contactus" element={<Contactus/>} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/forgotpass" element={<ForgotPass/>} />
         <Route path="/Profile" element={<Profile/>} />

         <Route path="/menu" element={<Menu />} />
         <Route path="/customerdash" element={<Customerdash />} />
       

        
         <Route path="/OrderList" element={<OrderList />} />
         <Route path="/orderDetails/:orderId" element={<OrderDetails />} />
         <Route path="/customerList" element={<CustomerList />} />
         <Route path="/addcustomer" element={<AddCustomer />} />
         <Route path="/editcustomer" element={<EditCustomer />} />
         <Route path="/restaurant" element={<Restaurant />} />
         <Route path="/addrestaurant" element={<AddRestaurant />} />
         <Route path="/manageitem" element={<Manageritem />} />
         <Route path="/editrestaurant" element={<EditRestaurant />} />
         <Route path="/Rcategory" element={<Categories />} />
         <Route path="/managedishes" element={<ManageDishes />} />




        {/* //for restaurant manager */}
          <Route path="/managerdash" element={<Managerdash />} />
          <Route path="/manage-menu-items" element={<ManageMenuItems />} />
          <Route path="/view-orders" element={<ViewOrders />} />
          <Route path="/reports" element={<Reports />} />

          <Route path="/Adminpage" element={<AdminPage />} />
          <Route path="/admin/JoinRequests" element={<JoinRequests />} />



          {/* <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/home" element={<Home loggedIn={loggedIn} />} /> */}
      </Routes>
    </Router>
  </AuthProvider>

   /* which name is written into the element tag that element need t0 import
    in the import statement and the filename is write into the 'single quote'
      like [ import Reports from './pages/RManager/report.js'; ]  */




    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
