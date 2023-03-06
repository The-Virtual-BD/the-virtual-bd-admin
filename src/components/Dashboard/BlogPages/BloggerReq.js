import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '../../SharedPage/Table';
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';

const BloggerReq = () => {
    const [token] = useToken();
    const [bloggerApplicent, setBloggerApplicent] = useState([]);
    const navigate = useNavigate();

    const allBloggerApplicent=[...bloggerApplicent].reverse();


    //Get blogger req
    useEffect(() => {
        const sUrl = `${baseURL}/api/admin/bloggerApplication`;
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
                console.log(data.blogger)
                setBloggerApplicent(data.blogger)
            })
    }, [token]);

    const handleBloggerReqView = (id) => {
        console.log("clicked", id);
        navigate(`/admin-dashboard/blogger-request/${id}`);
    };


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
                    const remaining = bloggerApplicent.filter(card => card.id !== id);
                    setBloggerApplicent(remaining);
                    toast.success(data.message)
                })
        };
    };


    const BLOGGER_COLUMNS = () => {
        return [
            {
                Header: "SL",
                id: 'index',
                accessor: (_row, i) => i + 1 
            },
            {
                Header: "Blogger Name",
                accessor: "name",
                sortType: 'basic',

            },
            {
                Header: "Subject",
                accessor: "subject",
                sortType: 'basic',

            },
            {
                Header: "Exp. Area",
                accessor: "expertise",
                sortType: 'basic',

            },
            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => {
                    const { id } = row.original;
                    return (<div className='flex items-center justify-center  gap-2 '>
                        <button onClick={() => handleBloggerReqView(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                <BsEyeFill className='text-lg ' />
                            </div>
                        </button>

                        <button onClick={() => handleDeleteBlogReq(id)}>
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
            {bloggerApplicent.length && (
                <Table
                    columns={BLOGGER_COLUMNS()}
                    data={allBloggerApplicent}
                    headline={"Blogger Request"} />
            )}

        </div>
    );
};

export default BloggerReq;




