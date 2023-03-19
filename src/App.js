import { Route, Routes } from 'react-router-dom';
import 'tw-elements';
import { useEffect, useReducer, useState } from 'react';
import { APPContext, initialState, reducer } from './actions/reducers';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import RequireAuth from './components/utilities/RequireAuth';
import './App.css';

import AdminDashboard from './components/Dashboard/AdminDashboard';
import Dashboard from './components/Dashboard/Dashboard';
import Faqs from './components/Dashboard/Faqs';
import Header from './components/SharedPage/Header';
import Catagory from './components/Dashboard/Catagory';
import Comments from './components/Dashboard/Comments';
import Role from './components/Dashboard/Role';
import Permission from './components/Dashboard/Permission';
import Login from './components/Login/Login';
import Notice from './components/Dashboard/Notice';
import Profile from './components/Profile/Profile';
import CommentsDetails from './components/Dashboard/CommentsDetails';
import Blogs from './components/Dashboard/BlogPages/Blogs';
import Portfolio from './components/Dashboard/Projects/Portfolio';
import Subscription from './components/Dashboard/Projects/Subscription';
import UserManagment from './components/Dashboard/UserPages/UserManagment';
import UserDetails from './components/Dashboard/UserPages/UserDetails';
import UserEdit from './components/Dashboard/UserPages/UserEdit';
import Services from './components/Dashboard/ServicePages/Services';
import ServicesDetails from './components/Dashboard/ServicePages/ServicesDetails';
import ServiceEdit from './components/Dashboard/ServicePages/ServiceEdit';
import ProjectDetails from './components/Dashboard/Projects/ProjectDetails';
import ProjectEdit from './components/Dashboard/Projects/ProjectEdit';
import SubsReqDetails from './components/Dashboard/Projects/SubsReqDetails';
import BlogDetails from './components/Dashboard/BlogPages/BlogDetails';
import BloggerReq from './components/Dashboard/BlogPages/BloggerReq';
import BloggerReqDetails from './components/Dashboard/BlogPages/BloggerReqDetails';
import NewsLetter from './components/Dashboard/NewsLetter/NewsLetter';
import EmailSubscription from './components/Dashboard/NewsLetter/EmailSubscription';
import Carieer from './components/Dashboard/Carieer/Carieer';
import JobApplication from './components/Dashboard/Carieer/JobApplication';
import Reviews from './components/Dashboard/Reviews';
import Query from './components/Dashboard/Query';
import QueryDetails from './components/Dashboard/QueryDetails';
import CarieerDetails from './components/Dashboard/Carieer/CarieerDetails';
import CarieerEdit from './components/Dashboard/Carieer/CarieerEdit';
import NewsletterDetails from './components/Dashboard/NewsLetter/NewsletterDetails';
import NewsletterEdit from './components/Dashboard/NewsLetter/NewsletterEdit';
import JobAppliDetails from './components/Dashboard/Carieer/JobAppliDetails';
import Loading from './components/utilities/Loading';
import RoleDetails from './components/Dashboard/RoleDetails';
import ReviewDetails from './components/Dashboard/ReviewDetails';

function App() {
  const [isproject, setIsproject] = useState(false);
  const [isAddPermission, setIsAddPermission] = useState(false);
  const [isAddService, setIsAddService] = useState(false);
  const [addNotice, setAddNotice] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [addRole, setAddRole] = useState(false);
  const [addNewsLetter, setAddNewsLetter] = useState(false);
  const [addEmailSubs, setAddEmailSubs] = useState(false);
  const [addCareer, setAddCareer] = useState(false);



 

  const [menuOpen, setMenuOpen] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(()=>{
    const getUserStr=localStorage.getItem("user");
       if(getUserStr){
         const getUser= JSON.parse(getUserStr);
         //    console.log(getUser);
            setUser(getUser);
       }
  },[]);



  
  // console.log(user)


  // const [data, dispatch] = useReducer(initialState);
  const value = {  isproject, setIsproject,menuOpen, setMenuOpen,isAddPermission, setIsAddPermission,isAddService, setIsAddService,addNotice, setAddNotice,user, setUser,addCategory, setAddCategory,addRole, setAddRole,addNewsLetter, setAddNewsLetter,addEmailSubs, setAddEmailSubs,addCareer, setAddCareer }

  
  return (
    <APPContext.Provider value={value}>
      
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
          <Route path='/admin-dashboard/role/:id' element={<RoleDetails />}></Route>

          <Route path='/admin-dashboard/permission' element={<Permission />}></Route>

          

          <Route path='/admin-dashboard/newsletter' element={<NewsLetter />}></Route>
          <Route path='/admin-dashboard/newsletter/:id' element={<NewsletterDetails />}></Route>
          <Route path='/admin-dashboard/newsletter/update/:id' element={<NewsletterEdit />}></Route>

          <Route path='/admin-dashboard/email-subscription' element={<EmailSubscription />}></Route>
          
          <Route path='/admin-dashboard/carieer' element={<Carieer />}></Route>
          <Route path='/admin-dashboard/carieer/:id' element={<CarieerDetails />}></Route>
          <Route path='/admin-dashboard/carieer/update/:id' element={<CarieerEdit />}></Route>

          <Route path='/admin-dashboard/job-application' element={<JobApplication />}></Route>
          <Route path='/admin-dashboard/job-application/:id' element={<JobAppliDetails />}></Route>

          <Route path='/admin-dashboard/reviews' element={<Reviews/>}></Route>
          <Route path='/admin-dashboard/reviews/:id' element={<ReviewDetails/>}></Route>

          <Route path='/admin-dashboard/query' element={<Query/>}></Route>
          <Route path='/admin-dashboard/query/:id' element={<QueryDetails />}></Route>

        </Route>

        <Route path='/profile' element={<RequireAuth> <Profile /></RequireAuth> }></Route>
        <Route path='/sign-in' element={<Login />}></Route>
      </Routes>
      <ToastContainer />

    </APPContext.Provider>
  );
}

export default App;
