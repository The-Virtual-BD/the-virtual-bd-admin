import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { APPContext } from '../../actions/reducers';

const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    // console.log(location.pathname);
    const { isproject, setIsproject } = useContext(APPContext);



    return (
        <div className='w-full text-primary flex items-center justify-between h-20 px-10 bg-white shadow-lg border-b-[1px] border-bgclr'>
            <img src="/assets/Virtual BD Logo.png" alt="logo" srcset="" />

            {/*  {
                currentPath==="/admin-dashboard/blogs" &&  <div className='flex items-center gap-4 justify-center'>
                <button className='text-lg font-semibold  hover:text-blue '>Pending Blogs</button>
                <button className='text-lg font-semibold hover:text-blue'>Blogger Applications</button>
            </div>
            } */}

            {
                currentPath === "/admin-dashboard/project" && <div className='flex items-center gap-4 justify-center'>
                    <button
                        onClick={() => setIsproject(false)}
                        className={`${(!isproject) ? "text-blue" : ""} text-lg font-semibold hover:text-blue `}>View Projects</button>

                    <button
                        onClick={() => setIsproject(true)}
                        className={`${isproject ? "text-blue" : ""} text-lg font-semibold  hover:text-blue `}>Add Project</button>

                </div>
            }

            {
                currentPath === "/admin-dashboard/faqs" && <div className='flex items-center gap-4 justify-center'>
                    <button className='text-lg font-semibold  hover:text-blue '>Add FAQs</button>
                    <button className='text-lg font-semibold hover:text-blue'>View FAQs</button>
                </div>
            }



            <div className='flex items-center gap-2'>
                <div className='text-end'>
                    <h3 className='text-lg font-bold'>Ishtiuq Ahmed Chowdhury</h3>
                    <p className='text-sm'>Admin</p>
                </div>
                <img src="/assets/admin.png" alt="admin" srcset="" />
            </div>

        </div>
    );
};

export default Header;