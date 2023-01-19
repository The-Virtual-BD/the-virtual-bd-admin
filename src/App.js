import { Route, Routes } from 'react-router-dom';
import './App.css';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import Blogs from './components/Dashboard/Blogs';
import Dashboard from './components/Dashboard/Dashboard';
import Faqs from './components/Dashboard/Faqs';
import Gallery from './components/Dashboard/Gallery';
import Portfolio from './components/Dashboard/Portfolio';
import Pricing from './components/Dashboard/Pricing';
import Subscription from './components/Dashboard/Subscription';
import UserManagment from './components/Dashboard/UserManagment';
import Header from './components/SharedPage/Header';
import 'tw-elements';
import { useReducer } from 'react';
import { APPContext, initialState, reducer } from './actions/reducers';
import Catagory from './components/Dashboard/Catagory';
import Comments from './components/Dashboard/Comments';
import BloggerReq from './components/Dashboard/BloggerReq';
import Services from './components/Dashboard/Services';
import Role from './components/Dashboard/Role';
import Permission from './components/Dashboard/Permission';

function App() {
  const [data, dispatch] = useReducer(initialState);
  const value = { data, dispatch }
  return (
    <APPContext.Provider value={value}>
      <Header />
      <Routes>
        <Route path="/admin-dashboard" element={<AdminDashboard />}>

          <Route index path="/admin-dashboard/dashboard" element={<Dashboard />} />

          <Route index path="/admin-dashboard/category" element={<Catagory />} />

          <Route path='/admin-dashboard/blogs' element={<Blogs />}></Route>

          <Route path='/admin-dashboard/project' element={<Portfolio />}></Route>

          <Route path='/admin-dashboard/comments' element={<Comments />}></Route>

          <Route path='/admin-dashboard/sub-request' element={<Subscription />}></Route>

          <Route path='/admin-dashboard/blogger-request' element={<BloggerReq />}></Route>

          <Route path='/admin-dashboard/services' element={<Services />}></Route>

          <Route path='/admin-dashboard/user-managment' element={<UserManagment />}></Route>

          <Route path='/admin-dashboard/role' element={<Role />}></Route>

          <Route path='/admin-dashboard/permission' element={<Permission />}></Route>



           {/*  <Route path='/admin-dashboard/faqs' element={<Faqs />}></Route>
           <Route path='/admin-dashboard/gallery' element={<Gallery />}></Route>
          <Route path='/admin-dashboard/pricing' element={<Pricing />}></Route> */}
        </Route>

      </Routes>

    </APPContext.Provider>
  );
}

export default App;
