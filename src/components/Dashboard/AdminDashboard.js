import React, { useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { APPContext } from '../../actions/reducers';
import { sidebarMenu } from '../../AllData/staticData';
import Header from '../SharedPage/Header';


const AdminDashboard = () => {
    const location = useLocation();
    const isActive = location.pathname;
    // console.log(location.pathname);
    const { menuOpen } = useContext(APPContext);

    return (
        <>
        <Header />
        <div className='flex flex-row-reverse justify-between  bg-bgclr'>

            <div className='text-center w-full  bg-bgclr'>
                <Outlet></Outlet>
            </div>

            <div className={`bg-white text-primary pb-5  hidden lg:block  transition ease duration-300 ${menuOpen ? "w-60" : "w-14"}`}>
                <ul className='flex  flex-col  '>
                    {
                        sidebarMenu.map(singleMenu => <li key={singleMenu.id}
                            className={` hover:bg-blue hover:text-white  px-5 py-2 
                             ${isActive === singleMenu.path ? "bg-blue text-white" : ""} `}>
                            <Link to={singleMenu.path}>

                                <div className='flex items-center justify-start'>
                                    <span className={` ${menuOpen ? "text-base" : "  py-1 text-center"}`}> {singleMenu.icon}</span>

                                    <span className={`ml-3 ${menuOpen ? "block" : "hidden"}`}> {singleMenu.name}</span>
                                </div>
                            </Link>
                        </li>)
                    }
                </ul>
            </div>
        </div>
        </>
        
    );
};

export default AdminDashboard;