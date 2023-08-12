import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '../SharedPage/Table';
import Loading from '../utilities/Loading';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';
import { useCollection } from '../../actions/reducers';

const Reviews = () => {
    const [token] = useToken();
    const navigate = useNavigate();

    const { reviews,reviewsLoading } = useCollection();

    if (reviewsLoading) {
        return (<Loading />)
    };

    if (!reviewsLoading && reviews?.length === 0) {
        return <p>No Reviews is Avaiable</p>
    };

    const allReviews = reviews?.reverse();

    const handleReviewsView = (id) => {
        // console.log("clicked", id);
        navigate(`/admin-dashboard/reviews/${id}`);
    };


    //Handle Delete reviews
    const handleDeleteReviews = id => {
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
                    toast.success(data.message)
                })
        };
    };


    const Reviews_COLUMNS = () => {
        return [
            {
                Header: "SL",
                id: 'index',
                accessor: (_row, i) => i + 1
            },
            {
                Header: "User Name",
                accessor: "author.first_name",
                sortType: 'basic',
                 Cell: ({ row }) => {
                    // console.log(row)
                    const { id,first_name } = row.original.author;
                    return (<>
                       <Link to={`/admin-dashboard/user-managment/${id}`}>{first_name}</Link>
                    </>);
                },
            },
            {
                Header: "Ratings",
                accessor: "quantity",
                sortType: 'basic',
            },
            {
                Header: "Status",
                accessor: "status",
                sortType: 'basic',
                Cell: ({ row }) => {
                    const { status } = row.original;
                    return (<div className='flex items-center justify-center  gap-2 text-sm'>
                        {
                            status == "1" ?
                                (<p className='bg-white  px-2 py-[2px] rounded-full border text-xs  border-yellow-500  text-yellow-500'>Pending</p>)
                                : status == "3" ? (<p className='bg-white  px-2 py-[2px] rounded-full border text-xs  border-red-500  text-red-500'>Declined</p>) : (
                                    <p className='bg-white px-2 py-[2px] rounded-full border border-green-500 text-xs text-green-500'>  Approved</p>
                                )
                        }
                    </div>);
                },
            },
            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => {
                    const { id } = row.original;
                    return (<div className='flex items-center justify-center  gap-2 '>
                        <button onClick={() => handleReviewsView(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                <BsEyeFill className='text-lg ' />
                            </div>
                        </button>

                        <button onClick={() => handleDeleteReviews(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#FF0000] text-white grid items-center justify-center'>
                                <AiFillDelete className='text-lg  text-white' />
                            </div>
                        </button>
                    </div>);
                },
            },


        ];
    };

    

    return (
        <div className='text-primary p-3'>
            {allReviews.length && (
                <Table
                    columns={Reviews_COLUMNS()}
                    data={allReviews}
                    headline={"Review Request"} />
            )}

        </div>
    );
};

export default Reviews;