import React, { useEffect, useState } from 'react';
import {BsCheck2, BsCheckLg, BsEyeFill, BsXLg} from 'react-icons/bs';
import { RiEditBoxFill} from 'react-icons/ri';
import { RxCross2} from 'react-icons/rx';
import Button from '../utilities/Button';

const Blogs = () => {
   
    return (
        <div className='text-primary p-3'>
           {/*  <div className='flex items-center gap-4 mb-10 mt-3 justify-center'>
                <button className='text-lg font-semibold  hover:text-blue '>Pending Blogs</button>
                <button className='text-lg font-semibold hover:text-blue'>Blogger Applications</button>
            </div> */}

            {/* <BloggerApplicationsTable /> */}
            <AllBlogsList />
           

    </div>
    );
};

export default Blogs;

const AllBlogsList = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('/blogs.json')
            .then(res => res.json())
            .then(data => setBlogs(data))
    }, []);
    return (
        <div>
            <div className='bg-bgclr w-full px-10  rounded-lg mt-2 py-6'>
        <div className="flex items-center justify-between pb-3">
                <h2 className='text-2xl text-start font-semibold'>All Blogs List</h2>
                <Button>Search</Button>
        </div>
        <table className=' w-full'>
            <thead className="bg-white">
                <th>SL</th>
                <th>Author Name</th>
                <th>Blog</th>
                <th>Status</th>
                <th>Action</th>
            </thead>
            <tbody>
                {blogs.map((blog,index) => <tr key={blog.id} className="even:bg-white odd:bg-bgclr rounded-md">
                    <td>{index + 1}</td>
                    <td>{blog.bloggerName}</td>
                    <td>{blog.blogTitle}</td>
                    <td>{blog.status}</td>
                    <td>
                        <div className='flex items-center justify-center gap-2 '>

                                <button>
                                    <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                         <BsEyeFill className='text-lg  text-white'/>
                                    </div>
                                </button>
                              {/*   <button>
                                    <div className='w-8 h-8 rounded-md bg-[#0068A3] text-white grid items-center justify-center'>
                                     <BsCheckLg className='text-lg  text-white'/>
                                    </div>
                                </button> */}
                            
                                <button>
                                    <div className='w-8 h-8 rounded-md bg-[#FF0000] text-white grid items-center justify-center'>
                                     <BsXLg className='text-lg  text-white'/>
                                    </div>
                            </button>
                        </div>
                    </td> 
                </tr>)}
            </tbody>
        </table>

        </div>
       </div>
        
    )
}


const BloggerApplicationsTable = () => {
    const [bloggerApplicent, setBloggerApplicent] = useState([]);

    useEffect(() => {
        fetch('/blogger.json')
            .then(res => res.json())
            .then(data => setBloggerApplicent(data))
    }, []);
    return (
        <div>
        <div className='bg-bgclr w-full px-10  rounded-lg mt-2 py-6'>
        <div className="flex items-center justify-between pb-3">
                <h2 className='text-2xl text-start font-semibold'>All Blogger Applications</h2>
                <Button>Search</Button>
        </div>
        <table className=' w-full'>
            <thead className='bg-white'>
                <th>SL</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Expert Area</th>
                <th>Action</th>
            </thead>
            <tbody>
                {bloggerApplicent.map((blog,index) => <tr key={blog.id} className="even:bg-white odd:bg-bgclr rounded-md">
                    <td>{index + 1}</td>
                    <td>{blog.bloggerName}</td>
                    <td>{blog.blogSub}</td>
                    <td>{blog.blogExArea}</td>
                    <td>
                        <div className='flex items-center justify-center gap-1 '>
                                <button>
                                        <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                         <BsEyeFill className='text-lg  text-white'/>
                                        </div>
                               </button>
                            
                                <button>
                                    <div className='w-8 h-8 rounded-md bg-[#0068A3] text-white grid items-center justify-center'>
                                     <BsCheck2 className='text-lg  text-white'/>
                                    </div>
                                </button>
                            
                                <button>
                                    <div className='w-8 h-8 rounded-md bg-[#FF0000] text-white grid items-center justify-center'>
                                     <RxCross2 className='text-lg  text-white'/>
                                    </div>
                            </button>
                        </div>
                    </td> 
                </tr>)}
            </tbody>
        </table>

    </div>
       </div>
    )
}