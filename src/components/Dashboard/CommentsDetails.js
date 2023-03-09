import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';

const CommentsDetails = () => {
    const [comment, setComment] = useState([]);
    const { id } = useParams();
    const [token] = useToken();
    const navigate = useNavigate();

    const commentDate = moment(comment?.created_at).format('DD MMM YYYY hh:mm A');



    //Get Comment
    useEffect(() => {
        const perUrl = `${baseURL}/api/admin/comments/show/${id}`;
        fetch(perUrl, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setComment(data.data)
            })
    }, [token]);

    //Handle Delete Comment
    const handleDeleteComment = id => {
        const procced = window.confirm("You Want To Delete?");

        if (procced) {
            const userUrl = `${baseURL}/api/admin/comments/destroy/${id}`;
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
                    navigate("/admin-dashboard/comments")
                })
        };
    };

    //handle Accept Comment
    const handleCommentAccept = id => {
        const userUrl = `${baseURL}/api/admin/comments/approve/${id}`;

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
                navigate("/admin-dashboard/comments")
            })
    };
    //handle Declined Comment
    const handleCommentDeclined = id => {
        const userUrl = `${baseURL}/api/admin/comments/decline/${id}`;

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
                navigate("/admin-dashboard/comments")
            })
    };


    //   console.log(comment);




    return (
        <div className='bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary'>
            <div>
                <h2 className='text-2xl font-bold text-start my-3'>View Comment</h2>
                <hr className=' text-bgclr' />
            </div>


            <div className='mt-5'>
                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Name: </span>  {comment?.commenter_name}</h3>
                </div>

                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Post Title: </span>  {comment?.post?.title}</h3>
                </div>

                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Email: </span>  {comment?.commenter_email}</h3>
                </div>

                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Comment: </span> {comment?.body}</h3>
                </div>
                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Comment Post Time: </span> {commentDate}</h3>
                </div>

                <p className='text-start'><span className='font-bold mr-1'> Status:</span>
                    {
                        comment?.status === "1" ?
                            (<span className='text-yellow-500'>Pendding</span>) : comment?.status === "2" ?
                                (<span className='text-green-500'>Approved</span>) : comment?.status === "3" ?
                                    (<span className='text-red-500'>Declined</span>) : ""
                    }
                </p>

                <div className='mt-7 flex items-start '>
                    {
                        comment?.status === "1" ? (
                            <div className='mr-3'>
                                <button className='text-white bg-blue font-bold px-5 py-1.5 rounded-md border-[1px] border-blue mr-3' onClick={() => handleCommentAccept(comment?.id)}>Accept</button>

                                <button className='text-yellow-500 font-bold px-5 py-1.5 rounded-md border-[1px] border-yellow-500' onClick={() => handleCommentDeclined(comment?.id)}>Declined</button>
                            </div>
                        ) :
                            comment?.status === "3" ? (
                                <button className='text-white bg-blue font-bold px-5 py-1.5 rounded-md border-[1px] border-blue mr-3' onClick={() => handleCommentAccept(comment?.id)}>Accept</button>
                            ) : ""

                    }
                    <button className='text-[#E74C3C] font-bold px-5 py-1.5 rounded-md border-[1px] border-[#E74C3C]' onClick={() => handleDeleteComment(comment?.id)}>Delete</button>
                </div>



            </div>


        </div>
    );
};

export default CommentsDetails;