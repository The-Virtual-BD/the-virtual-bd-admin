import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';

const BloggerReqDetails = () => {
    const [bloggerApplicen, setBloggerApplicen] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [token] = useToken();

    const postDate = moment(bloggerApplicen?.created_at).format('DD MMM YYYY hh:mm A');



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


    //Handle Delete Blogger Req
    const handleDeleteBlogReq = id => {
        const procced = window.confirm("You Want To Delete?");

        if (procced) {
            const userUrl = `${baseURL}/api/admin/bloggerApplication/destroy/${id}`;
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

    //handle Accept Blogger Req
    const handleBlogReqAccept = id => {
        const userUrl = `${baseURL}/api/admin/bloggerApplication/approve/${id}`;

        fetch(userUrl, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                if (data?.message) {
                    toast.success(data.message);
                    navigate("/admin-dashboard/blogger-request");
                } else {
                    toast.error("Accept Failed");
                };

            })
    };

    //handle Declined Blogger Req
    const handleBlogReqDeclined = id => {
        const userUrl = `${baseURL}/api/admin/bloggerApplication/decline/${id}`;

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
                navigate("/admin-dashboard/blogger-request")
            })
    };


    // console.log(bloggerApplicen);



    return (
        <div className='bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary'>
            <div>
                <h2 className='text-2xl font-bold text-start my-3'>View Blogger Request</h2>
                <hr className=' text-bgclr' />
            </div>


            <div className='mt-5'>
                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Name: </span>  {bloggerApplicen?.name}</h3>
                </div>

                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Blog Subject: </span> {bloggerApplicen?.subject}</h3>
                </div>
               

                <div className='text-start mb-1 '>
                    <h3 ><span className='font-bold'>Expertise Areas: </span>{bloggerApplicen?.expertise}</h3>
                </div>

                <div className='text-start  mb-1'>
                    <h3 ><span className='font-bold'>Description: </span>{bloggerApplicen?.description}</h3>
                </div>

                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Request Sent Date: </span> {postDate}</h3>
                </div>

                <p className='text-start'><span className='font-bold mr-1 '> Status:</span>
                    {
                        bloggerApplicen?.status == "1" ?
                            (<span className='text-yellow-500'>Pendding</span>) : bloggerApplicen?.status == "2" ?
                                (<span className='text-green-500'>Approved</span>) : bloggerApplicen?.status == "3" ?
                                    (<span className='text-red-500'>Declined</span>) : ""
                    }
                </p>


                <div className='mt-7 flex items-start '>
                    {
                        bloggerApplicen?.status == "1" ? (
                            <div className='mr-3'>
                                <button className='text-white bg-blue font-bold px-5 py-1.5 rounded-md border-[1px] border-blue mr-3' onClick={() => handleBlogReqAccept(bloggerApplicen?.id)}>Accept</button>

                                <button className='text-yellow-500 font-bold px-5 py-1.5 rounded-md border-[1px] border-yellow-500' onClick={() => handleBlogReqDeclined(bloggerApplicen?.id)}>Declined</button>
                            </div>
                        ) :
                            bloggerApplicen?.status == "3" ? (
                                <button className='text-white bg-blue font-bold px-5 py-1.5 rounded-md border-[1px] border-blue mr-3' onClick={() => handleBlogReqAccept(bloggerApplicen?.id)}>Accept</button>
                            ) : ""

                    }
                    <button className='text-[#E74C3C] font-bold px-5 py-1.5 rounded-md border-[1px] border-[#E74C3C]' onClick={() => handleDeleteBlogReq(bloggerApplicen?.id)}>Delete</button>
                </div>
                
            </div>
        </div>
    );
};

export default BloggerReqDetails;