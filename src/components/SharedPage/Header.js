import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { APPContext } from '../../actions/reducers';
import { sidebarMenu } from '../../AllData/staticData';
import useToken from '../utilities/useToken';
import useUser from '../utilities/useUser';
import blankUser from '../../images/blank_user.png';
import { baseURL } from '../utilities/url';

import logo2 from '../../images/logo 2.png'


const Header = () => {
    const [token,setToken]= useToken();
    const[user,setUser]=useUser();
    const location = useLocation();
    const currentPath = location.pathname;
    const [open, setOpen] = useState(false);
    const navigate=useNavigate()

    const[image,setImage]=useState(user.photo || blankUser);
    const[profile,setProfile]=useState(false);

    const access_token=window.localStorage.getItem("token")
    const access_user=window.localStorage.getItem("user")



    // console.log(location.pathname);
    const { isproject, setIsproject,menuOpen, setMenuOpen,isAddPermission, setIsAddPermission,isAddService, setIsAddService,addNotice, setAddNotice } = useContext(APPContext);
    console.log(user);


    const handleLogout=()=>{


        const url = `${baseURL}/api/logout`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(result => {
              console.log(result);
              window.localStorage.removeItem('token');
              window.localStorage.removeItem('user');
              setUser("");
              setToken('')
              navigate('/sign-in');
            })
      };
    


    return (
     <>
        <div>
            <div className='w-full text-primary flex items-center gap-3 justify-between h-20 px-3 lg:px-5 lg:py-3  bg-white shadow-lg border-b-[1px] border-bgclr'>


                {/* <img src={"/assets/Virtual BD Logo.png"} alt="talents" className="my-5 hidden lg:block" /> */}

               <div className='flex items-center gap-5'> 
                     <Link to={"/admin-dashboard/dashboard"}>
                     <img src={"/assets/Virtual BD Logo2.png"} alt="talents" className="my-5 block" />
                     </Link>

                     {
                        (currentPath !== "/sign-in" && currentPath !==  "/profile") && <>{
                            !menuOpen
                            ?
                            <span onClick={()=>setMenuOpen(!menuOpen)} className='w-8 h-10 rounded-md cursor-pointer bg-bgclr hidden lg:flex items-center justify-center'><IoIosArrowForward className='text-2xl font-bold text-blue'/></span>
                           
                            :
                            <span onClick={()=>setMenuOpen(!menuOpen)} className='w-8 h-10 rounded-md cursor-pointer bg-bgclr hidden lg:flex items-center justify-center'><IoIosArrowBack className='text-2xl font-bold text-blue'/></span>
                            
                         }</>
                     }

               </div>

                <div>
                        {/* Projects Sub Menu */}
                        {
                            currentPath === "/admin-dashboard/project" && <div className='lg:flex items-center gap-4 justify-center hidden'>
                                <button
                                    onClick={() => setIsproject(false)}
                                    className={`${(!isproject) ? "text-blue" : ""} text-sm lg:text-lg font-semibold hover:text-blue  `}>View Projects</button>

                                <button
                                    onClick={() => setIsproject(true)}
                                    className={`${isproject ? "text-blue" : ""} text-sm lg:text-lg  font-semibold  hover:text-blue `}>Add Project</button>

                            </div>
                        }

                        {/* Permissions Sub Menu */}
                        {
                            currentPath === "/admin-dashboard/permission" && <div className='lg:flex items-center gap-4 justify-center hidden'>
                                <button
                                    onClick={() => setIsAddPermission(false)}
                                    className={`${(!isAddPermission) ? "text-blue" : ""} text-sm lg:text-lg font-semibold hover:text-blue  `}>All Permissions</button>

                                <button
                                    onClick={() => setIsAddPermission(true)}
                                    className={`${isAddPermission ? "text-blue" : ""} text-sm lg:text-lg  font-semibold  hover:text-blue `}>Add New Permission</button>

                            </div>
                        }


                        {/* Services Sub Menu */}
                        {
                            currentPath === "/admin-dashboard/services" && <div className='lg:flex items-center gap-4 justify-center hidden'>
                                <button
                                    onClick={() => setIsAddService(false)}
                                    className={`${(!isAddService) ? "text-blue" : ""} text-sm lg:text-lg font-semibold hover:text-blue  `}>View Services</button>

                                <button
                                    onClick={() => setIsAddService(true)}
                                    className={`${isAddService? "text-blue" : ""} text-sm lg:text-lg  font-semibold  hover:text-blue `}>Add Service</button>

                            </div>
                        }

                        {/* Notices Sub Menu */}
                        {
                            currentPath === "/admin-dashboard/notice" && <div className='lg:flex items-center gap-4 justify-center hidden'>
                                <button
                                    onClick={() => setAddNotice(false)}
                                    className={`${(!addNotice) ? "text-blue" : ""} text-sm lg:text-lg font-semibold hover:text-blue  `}>View Notice</button>

                                <button
                                    onClick={() => setAddNotice(true)}
                                    className={`${addNotice? "text-blue" : ""} text-sm lg:text-lg  font-semibold  hover:text-blue `}>Add Notice</button>

                            </div>
                        }
                </div>




                {
                ( access_token && access_user)?
                    <div className='hidden lg:flex items-center gap-2'>
                    <div className='text-end'>
                        <h3 className='text-lg font-bold'>{user?.first_name}</h3>
                        <p className='text-sm font-semibold'>{user?.profession}</p>
                    </div>

                   

                    <div class="flex justify-center">
                            <div>
                                <div class="dropdown relative">
                                <button type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {
                                        <img src={image} alt="admin" srcset="" style={{width:"50px",height:"50px",borderRadius:"100%"}} onClick={()=>setProfile(!profile)} />
                                    }
                                </button>
                                <ul  class="dropdown-menu w-36 absolute bg-white text-base z-50 float-left py-1.5 list-none text-left rounded-lg shadow-lg mt-1  hidden  m-0 bg-clip-padding border-none "  
                                aria-labelledby="dropdownMenuButton1">  
                                    <li>
                                        <Link to={"/profile"} class="dropdown-item text-sm py-1.5 px-4 block w-full  whitespace-nowrap  bg-transparent text-primary hover:bg-bgclr text-center font-bold">Profile</Link > </li>
                                    <li>
                                        <button class="dropdown-item text-sm py-1.5 px-4  block w-full  whitespace-nowrap  bg-transparent text-primary hover:bg-bgclr font-bold"  onClick={handleLogout}>Logout </button>
                                    </li>
                                </ul>
                                </div>
                            </div>
                    </div>

                </div>: ""
                }
                



                {/* Menu Icon for Responsive*/}
                <button
                    onClick={() => setOpen(!open)}
                    className="block lg:hidden text-blue"
                >
                    {!open ? (
                        <AiOutlineMenu className="text-3xl" />
                    ) : (
                        <AiOutlineClose className="text-3xl" />
                    )}
                </button>



            </div>

            <div className='lg:hidden block  '>
                {open ? (
                    <div className="bg-blue text-white  rounded w-60  py-3 z-10 fixed top-2 left-0 h-auto overflow-y-auto overflow-x-hidden ">
                        {/* <img src="/assets/admin.png" alt="admin" srcset="" /> */}
                        <div className='flex flex-col lg:hidden  text-center '>
                            <h3 className='text-lg font-bold'>{user.first_name}</h3>
                            <p className='text-sm'>{user.profession}</p>
                        </div>


                         {/* Projects Sub Menu */}
                        {
                            currentPath === "/admin-dashboard/project" && <div className='flex flex-col items-start  justify-start  mt-5 mb-2 border-b-[1px] border-white lg:hidden'>
                                <button
                                    onClick={() => {
                                        setIsproject(false)
                                        setOpen(!open)
                                    }}
                                    className={`${(!isproject) ? "text-blue bg-white" : ""} text-sm text-start w-full px-5 py-2  font-semibold hover:text-blue hover:bg-white`}>* View Projects</button>

                                <button
                                    onClick={() => {
                                        setIsproject(true)
                                        setOpen(!open)
                                    }}
                                    className={`${isproject ? "text-blue bg-white" : ""} text-sm text-start px-5 py-2 w-full font-semibold  hover:text-blue hover:bg-white `}>* Add Project</button>

                            </div>
                        }


                         {/* Permissions Sub Menu */}
                            {
                                currentPath === "/admin-dashboard/permission" && <div className='flex flex-col items-start  justify-start  mt-5 mb-2 border-b-[1px] border-white lg:hidden'>
                                    <button
                                        onClick={() => {
                                            setIsAddPermission(false)
                                            setOpen(!open)
                                        }}
                                        className={`${!isAddPermission? "text-blue bg-white" : ""} text-sm text-start px-5 py-2 w-full font-semibold  hover:text-blue hover:bg-white `}>* View Permissions</button>

                                    <button
                                        onClick={() =>{
                                            setIsAddPermission(true)
                                            setOpen(!open)
                                        }}
                                        className={`${isAddPermission ? "text-blue bg-white" : ""} text-sm text-start px-5 py-2 w-full font-semibold  hover:text-blue hover:bg-white `}>* Add New Permission</button>

                                </div>
                            }


                         {/* Services Sub Menu */}
                            {
                                currentPath === "/admin-dashboard/services" && <div className='flex flex-col items-start  justify-start  mt-5 mb-2 border-b-[1px] border-white lg:hidden'>
                                    <button
                                        onClick={() => {
                                            setIsAddService(false)
                                            setOpen(!open)
                                        }}
                                        className={`${!isAddService? "text-blue bg-white" : ""} text-sm text-start px-5 py-2 w-full font-semibold  hover:text-blue hover:bg-white `}>* View Services</button>

                                    <button
                                        onClick={() =>{
                                            setIsAddService(true)
                                            setOpen(!open)
                                        }}
                                        className={`${isAddService? "text-blue bg-white" : ""} text-sm text-start px-5 py-2 w-full font-semibold  hover:text-blue hover:bg-white `}>* Add Service</button>

                                </div>
                            }

                         {/* Notices Sub Menu */}
                            {
                                currentPath === "/admin-dashboard/notice" && <div className='flex flex-col items-start  justify-start  mt-5 mb-2 border-b-[1px] border-white lg:hidden'>
                                    <button
                                        onClick={() => {
                                            setAddNotice(false)
                                            setOpen(!open)
                                        }}
                                        className={`${!addNotice? "text-blue bg-white" : ""} text-sm text-start px-5 py-2 w-full font-semibold  hover:text-blue hover:bg-white `}>* View Notices</button>

                                    <button
                                        onClick={() =>{
                                            setAddNotice(true)
                                            setOpen(!open)
                                        }}
                                        className={`${addNotice? "text-blue bg-white" : ""} text-sm text-start px-5 py-2 w-full font-semibold  hover:text-blue hover:bg-white `}>* Add Service</button>

                                </div>
                            }





                        <ul className="  flex flex-col  items-start ease-in">
                            {
                                sidebarMenu.map(singleMenu => <li key={singleMenu.id} onClick={() => setOpen(!open)}
                                    className={`w-full hover:text-blue hover:bg-white  px-5 py-2 rounded-sm
                             ${currentPath === singleMenu.path ? "text-blue bg-white" : ""} `} >
                                    <Link to={singleMenu.path}>
                                        <div className='flex items-center justify-start'>
                                            {singleMenu.icon}
                                            <span className='ml-2'> {singleMenu.name}</span>
                                        </div>
                                    </Link>

                                    <div>
                                        
                                    </div>
                                </li>)
                            }
                        </ul>
                    </div>
                ) : null}
            </div>


        </div>
     </>
    );
};

export default Header;