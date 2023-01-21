import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {

    const [blogs, setBlogs] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch('/blogs.json')
            .then(res => res.json())
            .then(data => setBlogs(data))
    }, []);

    const getBlogDeatils = blogs?.find(blog => blog._id == id);
    console.log(getBlogDeatils);
    // const { bloggerName, blogTitle, blogSub, blogShortDesc, blogDesc, blogDate, blogImg, status } = getBlogDeatils;


    return (
        <div className='bg-white p-4 mx-8 my-5 rounded-md'>
            <div>
                <h2 className='text-2xl font-bold text-start my-3 px-4'>View Post</h2>
                <hr className=' text-bgclr' />
            </div>

            <div className='flex items-start justify-center gap-5 p-4'>
                <div className='w-full lg:w-1/2'>
                    <div className='flex flex-col items-start gap-3'>
                        <h3><span className='font-bold'>Blog Title:</span> {getBlogDeatils?.blogTitle}</h3>
                        <h3><span className='font-bold'>Blogger Name: </span>{getBlogDeatils?.bloggerName}</h3>
                        <p><span className='font-bold'>Subject: </span>{getBlogDeatils?.blogSub}</p>
                        <p><span className='font-bold'>Date:</span> {getBlogDeatils?.blogDate}</p>
                        <p><span className='font-bold'> Status:</span> {getBlogDeatils?.status}</p>
                        <div className='text-start my-3'>
                            <h3 className='font-bold' >Short Description:</h3>
                            <p className='text-labelclr'>{getBlogDeatils?.blogShortDesc}</p>
                        </div>
                        <div className='text-start'>
                            <h3 className='font-bold'>Description:</h3>
                            <p className='text-labelclr'>{getBlogDeatils?.blogDesc}</p>
                        </div>

                        <div className='mt-4'>
                            <button className='text-white bg-blue font-bold px-5 py-1.5 rounded-md border-[1px] border-blue '>Accept</button>

                            <button className='text-primary font-bold px-5 py-1.5 rounded-md border-[1px] border-primary mx-3'>Reject</button>

                            <button className='text-[#E74C3C] font-bold px-5 py-1.5 rounded-md border-[1px] border-[#E74C3C]'>Delete</button>
                        </div>

                    </div>

                </div>


                <div className='w-full lg:w-1/2'>
                    <img src={getBlogDeatils?.blogImg} alt="" srcset="" style={{ height: "500px" }} />
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;