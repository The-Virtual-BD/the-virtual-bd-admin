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
import { useEffect, useReducer, useState } from 'react';
import { APPContext, initialState, reducer } from './actions/reducers';
import Catagory from './components/Dashboard/Catagory';
import Comments from './components/Dashboard/Comments';
import BloggerReq from './components/Dashboard/BloggerReq';
import Services from './components/Dashboard/Services';
import Role from './components/Dashboard/Role';
import Permission from './components/Dashboard/Permission';
import BlogDetails from './components/Dashboard/BlogDetails';
import ProjectDetails from './components/Dashboard/ProjectDetails';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import BloggerReqDetails from './components/Dashboard/BloggerReqDetails';
import SubsReqDetails from './components/Dashboard/SubsReqDetails';
import UserDetails from './components/Dashboard/UserDetails';
import ServicesDetails from './components/Dashboard/ServicesDetails';
import Login from './components/Login/Login';
import Notice from './components/Dashboard/Notice';
import RequireAuth from './components/utilities/RequireAuth';
import Profile from './components/Profile/Profile';
import ProjectEdit from './components/Dashboard/ProjectEdit';
import CommentsDetails from './components/Dashboard/CommentsDetails';
import ServiceEdit from './components/Dashboard/ServiceEdit';
import UserEdit from './components/Dashboard/UserEdit';
// import Notice from './components/Dashboard/Notice/Notice';

function App() {
  const [isproject, setIsproject] = useState(false);
  const [isAddPermission, setIsAddPermission] = useState(false);
  const [isAddService, setIsAddService] = useState(false);
  const [addNotice, setAddNotice] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [addRole, setAddRole] = useState(false);


  const [menuOpen, setMenuOpen] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(()=>{
    const getUserStr=localStorage.getItem("user");
       if(getUserStr){
         const getUser= JSON.parse(getUserStr);
         //    console.log(getUser);
            setUser(getUser);
       }
  },[])

  

  // console.log(user)


  const [data, dispatch] = useReducer(initialState);
  const value = { data, dispatch, isproject, setIsproject,menuOpen, setMenuOpen,isAddPermission, setIsAddPermission,isAddService, setIsAddService,addNotice, setAddNotice,user, setUser,addCategory, setAddCategory,addRole, setAddRole }

  
  return (
    <APPContext.Provider value={value}>
      <Header />
      <Routes>
        <Route path="/" element={<RequireAuth> <AdminDashboard /> </RequireAuth>  } />
        <Route path="/admin-dashboard" element={<RequireAuth> <AdminDashboard /> </RequireAuth>  }>

          <Route index path="/admin-dashboard/dashboard" element={<Dashboard />} />

          <Route path="/admin-dashboard/category" element={<Catagory />} />

          <Route path='/admin-dashboard/blogs' element={<Blogs />}></Route>
          <Route path='/admin-dashboard/blogs/:id' element={<BlogDetails />}></Route>

          <Route path='/admin-dashboard/project' element={<Portfolio />}></Route>
          <Route path='/admin-dashboard/project/:id' element={<ProjectDetails />}></Route>
          <Route path='/admin-dashboard/project/update/:id' element={<ProjectEdit />}></Route>

          <Route path='/admin-dashboard/comments' element={<Comments />}></Route>
          <Route path='/admin-dashboard/comments/:id' element={<CommentsDetails />}></Route>
          
          <Route path='/admin-dashboard/notice' element={<Notice />}></Route>

          <Route path='/admin-dashboard/sub-request' element={<Subscription />}></Route>
          <Route path='/admin-dashboard/sub-request/:id' element={<SubsReqDetails />}></Route>

          <Route path='/admin-dashboard/blogger-request' element={<BloggerReq />}></Route>
          <Route path='/admin-dashboard/blogger-request/:id' element={<BloggerReqDetails />}></Route>

          <Route path='/admin-dashboard/services' element={<Services />}></Route>
          <Route path='/admin-dashboard/services/:id' element={<ServicesDetails />}></Route>
          <Route path='/admin-dashboard/services/update/:id' element={<ServiceEdit />}></Route>

          <Route path='/admin-dashboard/user-managment' element={<UserManagment />}></Route>
          <Route path='/admin-dashboard/user-managment/:id' element={<UserDetails />}></Route>
          <Route path='/admin-dashboard/user-managment/update/:id' element={<UserEdit />}></Route>

          <Route path='/admin-dashboard/role' element={<Role />}></Route>
          <Route path='/admin-dashboard/permission' element={<Permission />}></Route>
          
          

          {/*  <Route path='/admin-dashboard/faqs' element={<Faqs />}></Route>
           <Route path='/admin-dashboard/gallery' element={<Gallery />}></Route>
          <Route path='/admin-dashboard/pricing' element={<Pricing />}></Route> */}
        </Route>
        <Route path='/profile' element={<RequireAuth> <Profile /></RequireAuth> }></Route>
        <Route path='/sign-in' element={<Login />}></Route>

      </Routes>
      <ToastContainer />

    </APPContext.Provider>
  );
}

export default App;
