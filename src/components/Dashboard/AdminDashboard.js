import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { sidebarMenu } from '../../AllData/staticData';


const AdminDashboard = () => {
    const location = useLocation();
    const isActive = location.pathname;
    // console.log(location.pathname);

    return (
        <div className='flex flex-row-reverse justify-between  '>

        <div className='text-center w-5/6'>
            <Outlet></Outlet>
        </div>

        <div className='bg-bgclr text-primary font-semibold h-screen pt-3 w-1/6  transition ease duration-300 '>
                <ul className='flex flex-col gap-1 '>
                    {
                        sidebarMenu.map(singleMenu=><li key={singleMenu.id}
                            className={` last:mt-2 last:border-t-[.3px] last:pt-4 hover:bg-blue hover:text-white  px-5 py-2 rounded-sm
                             ${isActive===singleMenu.path?"bg-blue text-white":""} `}>
                            <Link to={singleMenu.path}> 
                            <div className='flex items-center justify-start'>
                               {singleMenu.icon}
                                <span className='ml-3'> {singleMenu.name}</span>
                            </div> 
                            </Link>
                        </li>)
                    }
           </ul>
        </div>
    </div>
    );
};

export default AdminDashboard;