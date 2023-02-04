import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BloggerReqDetails = () => {
    const [bloggerApplicent, setBloggerApplicent] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch('/blogger.json')
            .then(res => res.json())
            .then(data => setBloggerApplicent(data))
    }, []);

    const getSingleBloggerReq = bloggerApplicent?.find(blog => blog.id == id);
    console.log(getSingleBloggerReq);

    return (
        <div className='bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary'>
           <div>
                <h2 className='text-2xl font-bold text-start my-3 px-4'>View Blogger Request</h2>
                <hr className=' text-bgclr' />
            </div>


            <div className='mt-5'>
               <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Name: </span>  {getSingleBloggerReq?.bloggerName}</h3>
               </div>

               <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Blog Subject: </span> {getSingleBloggerReq?.blogSub}</h3>
               </div>
              
               <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Expertise Areas: </span>{getSingleBloggerReq?.blogExArea}</h3>
               </div>
               
               <div className='text-start  mb-1'>
                    <h3 ><span className='font-bold'>Description: </span>{getSingleBloggerReq?.blogDesc}</h3>
               </div>

              

               <div className='mt-7 flex items-start '>
                            <button className='text-white bg-blue font-bold px-5 py-1.5 rounded-md border-[1px] border-blue '>Accept</button>

                            <button className='text-primary font-bold px-5 py-1.5 rounded-md border-[1px] border-primary mx-3'>Reject</button>

                            <button className='text-[#E74C3C] font-bold px-5 py-1.5 rounded-md border-[1px] border-[#E74C3C]'>Delete</button>
             </div>
              

            </div>


        </div>
    );
};

export default BloggerReqDetails;