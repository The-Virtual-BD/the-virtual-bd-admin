import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import {AiFillHome} from 'react-icons/ai';





const Dashboard = () => {
    return (
        <div className='flex  text-primary '>

            <div className='text-center w-full'>
                <h2 className='mt-5 font-bold '>You Logged in!</h2>
            </div>

          
           
        </div>
    );
};

export default Dashboard;