import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';

const ReviewDetails = () => {
    const [review, setReview] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [token] = useToken();

    const postDate = moment(review?.created_at).format('DD MMM YYYY hh:mm A');



    //Handle Get review
    useEffect(() => {
        const sUrl = `${baseURL}/api/admin/reviews/show/${id}`;
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
                setReview(data.data)
            })
    }, [token, id]);


    //Handle Delete review
    const handleDeleteReview = id => {
        const procced = window.confirm("You Want To Delete?");

        if (procced) {
            const userUrl = `${baseURL}/api/admin/reviews/destroy/${id}`;
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
                    navigate("/admin-dashboard/reviews")
                })
        };
    };

    //handle Accept review
    const handleReviewAccept = id => {
        const userUrl = `${baseURL}/api/admin/reviews/approve/${id}`;

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
                    navigate("/admin-dashboard/reviews");
                } else {
                    toast.error("Accept Failed");
                };

            })
    };

    //handle Declined review
    const handleReviewDeclined = id => {
        const userUrl = `${baseURL}/api/admin/reviews/decline/${id}`;

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
                navigate("/admin-dashboard/reviews")
            })
    };

    // console.log(review);

    return (
        <div className='bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary'>
        <div>
            <h2 className='text-2xl font-bold text-start my-3'>View Review Request</h2>
            <hr className=' text-bgclr' />
        </div>


        <div className='mt-5'>
            <div className='text-start mb-1'>
                <h3 ><span className='font-bold'>Name: </span> {`${review?.author?.first_name} ${review?.author?.last_name}` } </h3>
            </div>
            <div className='text-start mb-1'>
                <h3 ><span className='font-bold'>Rating: </span> {review?.quantity}/5</h3>
            </div>


            <div className='text-start  mb-1'>
                <h3 ><span className='font-bold'>Review: </span>{review?.body}</h3>
            </div>

            <div className='text-start mb-1'>
                <h3 ><span className='font-bold'>Review Posted: </span> {postDate}</h3>
            </div>

            <p className='text-start'><span className='font-bold mr-1 '> Status:</span>
                {
                    review?.status === 1 ?
                        (<span className='text-yellow-500'>Pendding</span>) : review?.status === 2 ?
                            (<span className='text-green-500'>Approved</span>) : review?.status === 3 ?
                                (<span className='text-red-500'>Declined</span>) : ""
                }
            </p>


            <div className='mt-7 flex items-start '>
                {
                    review?.status === 1 ? (
                        <div className='mr-3'>
                            <button className='text-white bg-blue font-bold px-5 py-1.5 rounded-md border-[1px] border-blue mr-3' onClick={() => handleReviewAccept(review?.id)}>Accept</button>

                            <button className='text-yellow-500 font-bold px-5 py-1.5 rounded-md border-[1px] border-yellow-500' onClick={() => handleReviewDeclined(review?.id)}>Declined</button>
                        </div>
                    ) :
                    review?.status === 3 ? (
                            <button className='text-white bg-blue font-bold px-5 py-1.5 rounded-md border-[1px] border-blue mr-3' onClick={() => handleReviewAccept(review?.id)}>Accept</button>
                        ) : ""

                }
                <button className='text-[#E74C3C] font-bold px-5 py-1.5 rounded-md border-[1px] border-[#E74C3C]' onClick={() => handleDeleteReview(review?.id)}>Delete</button>
            </div>
            
        </div>
    </div>
    );
};

export default ReviewDetails;