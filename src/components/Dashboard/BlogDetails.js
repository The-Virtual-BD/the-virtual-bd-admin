import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';

const BlogDetails = () => {
    const { id } = useParams();
    const [token] = useToken();
    const [blog, setBlog] = useState({});


    //Handle Get post
    useEffect(() => {
        const sUrl = `${baseURL}/api/admin/posts/show/${id}`;
        // setLoading(true);

        fetch(sUrl, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // setLoading(false);
                console.log(data.data)
                setBlog(data.data)
            })
    }, [token, id]);

    const postDate = moment(blog?.created_at).format('DD MMM YYYY')


    return (
        <div className='bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary'>
            <div>
                <h2 className='text-2xl font-bold text-start my-3 px-4'>View Blog</h2>
                <hr className=' text-bgclr' />
            </div>

            <div className='flex flex-col lg:flex-row items-start justify-center gap-5 p-4'>
                <div className='w-full lg:w-1/2'>
                    <div className='flex flex-col items-start gap-3'>
                        <h3><span className='font-bold'>Blog Title:</span> {blog?.title}</h3>
                        <h3><span className='font-bold'>Blogger Name: </span>{`${blog?.author?.first_name} ${blog?.author?.last_name}`}</h3>

                        <p><span className='font-bold'>Subject: </span>{blog?.category?.name}</p>

                        <p><span className='font-bold'>Date:</span> {postDate}</p>
                        <p><span className='font-bold'> Status:</span> {blog?.status}</p>
                        <div className='text-start my-3'>
                            <h3 className='font-bold' >Short Description:</h3>
                            <p className='text-labelclr'>{blog?.short_description}</p>

                        </div>
                        <div className='text-start'>
                            <h3 className='font-bold'>Description:</h3>
                            <p className='text-labelclr'>{blog?.description}</p>
                        </div>



                        <div className='mt-4'>
                            <button className='text-white bg-blue font-bold px-5 py-1.5 rounded-md border-[1px] border-blue mr-3'>Accept</button>

                            {/*  <button className='text-primary font-bold px-5 py-1.5 rounded-md border-[1px] border-primary mx-3'>Reject</button> */}

                            <button className='text-[#E74C3C] font-bold px-5 py-1.5 rounded-md border-[1px] border-[#E74C3C]'>Delete</button>
                        </div>

                    </div>

                </div>


                <div className='w-full lg:w-1/2'>
                    <img src={`${baseURL}/${blog?.cover}`} alt="" srcSet="" className='h-full lg:h-[500px]' />
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;