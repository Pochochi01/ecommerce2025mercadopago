import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import Layout from './components/auth/layout.jsx';
import Login from './pages/auth/login.jsx';
import Register from './pages/auth/register.jsx';
import AdminLayout from './components/admin-view/layout.jsx';
import AdminDashboard from './pages/admin-view/dashboard.jsx';
import AdminOrders from './pages/admin-view/orders.jsx';
import AdminProducts from './pages/admin-view/products.jsx';
import AdminFeatures from './pages/admin-view/features.jsx';
import ShoppingLayout from './components/shopping-view/layout.jsx';
import NotFound from './pages/not-found/index.jsx';
import ShoppingAccount from './pages/shopping-view/account.jsx';
import ShoppingListing from './pages/shopping-view/listing.jsx';
import ShoppingHome from './pages/shopping-view/home.jsx';
import ShoppingCheckout from './pages/shopping-view/checkout.jsx';
import CheckAuth from './components/common/checkAuth.jsx';
import UnAuthPAge from './pages/unauth-page/index.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/auth-slice/index.js';
import { Skeleton } from './components/ui/skeleton.jsx';
import MercadoPagoReturnPage from './pages/shopping-view/mercadoPagoReturn.jsx';
import PaymentSuccessPage from './pages/shopping-view/paymentSuccess.jsx';
import SearchProducts from './pages/shopping-view/search.jsx';

const App = () => {

const {isAuthenticated, user, isLoading} = useSelector((state) => state.auth);
const dispatch = useDispatch();

useEffect(()=>{
  dispatch(checkAuth())
},[dispatch])

if(isLoading) return <Skeleton className="w-[600px] h-[600px] rounded-full"/>

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <h1>{/*Header component*/}</h1>
      <Routes>
        <Route path='/' element={
         <CheckAuth isAuthenticated={isAuthenticated} user = {user}></CheckAuth>
        }/>
        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}> 
            <Layout/>
          </CheckAuth>
          }>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>} />
        </Route>
        <Route path='/admin' element={
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
        <AdminLayout/> 
        </CheckAuth>}>
          <Route path='dashboard' element={<AdminDashboard/>}/>
          <Route path='orders' element={<AdminOrders/>}/>
          <Route path='products' element={<AdminProducts/>}/>
          <Route path='features' element={<AdminFeatures/>}/>
        </Route>
        <Route path='/shop' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}> <ShoppingLayout/> </CheckAuth>}>
        <Route path='account' element={<ShoppingAccount/>} />
        <Route path='listing' element={<ShoppingListing/>}/>
        <Route path='home' element={<ShoppingHome/>}/>
        <Route path='checkout' element={<ShoppingCheckout/>}/>
        <Route path='mercadoPagoReturn' element={<MercadoPagoReturnPage/>}/>
        <Route path='paymentSuccess' element={<PaymentSuccessPage/>}/>
        <Route path='search' element={<SearchProducts/>}/>
        </Route>
        <Route path='*' element={<NotFound/>} />
        <Route path='/unauthpage' element = {<UnAuthPAge/>}/>
      </Routes>
    </div>
  )
}

export default App