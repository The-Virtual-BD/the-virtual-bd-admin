import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Table from '../SharedPage/Table';

const BloggerReq = () => {
    const [bloggerApplicent, setBloggerApplicent] = useState([]);
    const navigate=useNavigate();

    useEffect(() => {
        fetch('/blogger.json')
            .then(res => res.json())
            .then(data => setBloggerApplicent(data))
    }, []);

    const handleBloggerReqView = (id) => {
        console.log("clicked", id);
        navigate(`/admin-dashboard/blogger-request/${id}`);
    };


    const BLOGGER_COLUMNS = () => {
        return [
            {
                Header: "SL",
                accessor: "id",
                sortType: 'basic',

            },
            {
                Header: "Blogger Name",
                accessor: "bloggerName",
                sortType: 'basic',

            },
            {
                Header: "Subject",
                accessor: "blogSub",
                sortType: 'basic',

            },
            {
                Header: "Exp. Area",
                accessor: "blogExArea",
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

                        <button >
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
                    data={bloggerApplicent}
                    headline={"Blogger Request"} />
            )}

        </div>
    );
};

export default BloggerReq;




