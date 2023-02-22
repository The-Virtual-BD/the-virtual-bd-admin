import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';

const BloggerReqDetails = () => {
    const [bloggerApplicen, setBloggerApplicen] = useState([]);
    const { id } = useParams();
<<<<<<< HEAD
    const navigate=useNavigate();
    const[token]=useToken();
=======
    const [token] = useToken();
>>>>>>> 42d22dcbb25ba10955383cfb1ebdd9c0d6d7cdf2


    //Handle Get service
    useEffect(() => {
        const sUrl = `${baseURL}/api/admin/bloggerApplication/${id}`;
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
                setBloggerApplicen(data.data)
            })
    }, [token, id]);


<<<<<<< HEAD
      //Handle Delete Blogger Req
    const handleDeleteBlogReq=id=>{
        const procced=window.confirm("You Want To Delete?");
    
        if (procced) {
            const userUrl=`${baseURL}/api/admin/bloggerApplication/destroy/${id}`;
            fetch(userUrl, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                        console.log(data);
                        toast.success(data.message);
                        navigate("/admin-dashboard/blogger-request")
                })
        };
      };

    /*   //handle Accept Blog
      const handlePostAccept=id=>{
        const userUrl=`${baseURL}/api/admin/posts/approve/${id}`;
        
        fetch(userUrl, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                    console.log(data);
                    toast.success(data.message);
                    navigate("/admin-dashboard/blogs")
            })
      } */


      console.log(bloggerApplicen);
=======
    console.log(bloggerApplicen);

>>>>>>> 42d22dcbb25ba10955383cfb1ebdd9c0d6d7cdf2


    return (
        <div className='bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary'>
            <div>
                <h2 className='text-2xl font-bold text-start my-3 px-4'>View Blogger Request</h2>
                <hr className=' text-bgclr' />
            </div>


            <div className='mt-5'>
                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Name: </span>  {bloggerApplicen?.name}</h3>
                </div>

                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Blog Subject: </span> {bloggerApplicen?.subject}</h3>
                </div>

                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Expertise Areas: </span>{bloggerApplicen?.expertise}</h3>
                </div>

                <div className='text-start  mb-1'>
                    <h3 ><span className='font-bold'>Description: </span>{bloggerApplicen?.description}</h3>
                </div>


<<<<<<< HEAD
                    <div className='mt-7 flex items-start '>
                            <button className='text-white bg-blue font-bold px-5 py-1.5 rounded-md border-[1px] border-blue mr-3' >Accept</button>

                            <button className='text-[#E74C3C] font-bold px-5 py-1.5 rounded-md border-[1px] border-[#E74C3C]' onClick={()=>handleDeleteBlogReq(bloggerApplicen?.id)}>Delete</button>
                    </div>
              
=======

                <div className='mt-7 flex items-start '>
                    <button className='text-white bg-blue font-bold px-5 py-1.5 rounded-md border-[1px] border-blue mr-3'>Accept</button>

                    <button className='text-[#E74C3C] font-bold px-5 py-1.5 rounded-md border-[1px] border-[#E74C3C]'>Delete</button>
                </div>

>>>>>>> 42d22dcbb25ba10955383cfb1ebdd9c0d6d7cdf2

            </div>


        </div>
    );
};

export default BloggerReqDetails;