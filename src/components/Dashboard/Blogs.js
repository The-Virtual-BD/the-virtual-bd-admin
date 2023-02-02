import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsCheck2, BsEyeFill, } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import Table from '../SharedPage/Table';
import Button from '../utilities/Button';
import BlogDetails from './BlogDetails';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    // const [pageSize, setPageSize] = useState(10);
    // const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        fetch('/blogs.json')
            .then(res => res.json())
            .then(data => setBlogs(data))
    }, []);

    const handleBlogView = (id) => {
        console.log("clicked", id);
        navigate(`/admin-dashboard/blogs/${id}`);
    };


    const BLOG_COLUMNS = () => {
        return [
            {
                Header: "SL",
                accessor: "_id",
                sortType: 'basic',

            },
            {
                Header: "Blogger Name",
                accessor: "bloggerName",
                sortType: 'basic',

            },
            {
                Header: "Blog Title",
                accessor: "blogTitle",
                sortType: 'basic',

            },
            {
                Header: "Status",
                accessor: "status",
                sortType: 'basic',
            },

            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => {
                    const { _id } = row.original;
                    return (<div className='flex items-center justify-center  gap-2 '>
                        <button onClick={() => handleBlogView(_id)}>
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
            {blogs.length && (
                <Table
                    columns={BLOG_COLUMNS()}
                    data={blogs}
                    headline={"All Blog list"} />
            )}

        </div>
    );
};

export default Blogs;




const BloggerApplicationsTable = () => {
    const [bloggerApplicent, setBloggerApplicent] = useState([]);

    useEffect(() => {
        fetch('/blogger.json')
            .then(res => res.json())
            .then(data => setBloggerApplicent(data))
    }, []);
    return (
        <div>
            <div className='bg-bgclr w-full px-10  rounded-lg mt-2 py-6'>
                <div className="flex items-center justify-between pb-3">
                    <h2 className='text-2xl text-start font-semibold'>All Blogger Applications</h2>
                    <Button>Search</Button>
                </div>
                <table className=' w-full'>
                    <thead className='bg-white'>
                        <th>SL</th>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Expert Area</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {bloggerApplicent.map((blog, index) => <tr key={blog.id} className="even:bg-white odd:bg-bgclr rounded-md">
                            <td>{index + 1}</td>
                            <td>{blog.bloggerName}</td>
                            <td>{blog.blogSub}</td>
                            <td>{blog.blogExArea}</td>
                            <td>
                                <div className='flex items-center justify-center gap-1 '>
                                    <button>
                                        <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                            <BsEyeFill className='text-lg  text-white' />
                                        </div>
                                    </button>

                                    <button>
                                        <div className='w-8 h-8 rounded-md bg-[#0068A3] text-white grid items-center justify-center'>
                                            <BsCheck2 className='text-lg  text-white' />
                                        </div>
                                    </button>

                                    <button>
                                        <div className='w-8 h-8 rounded-md bg-[#FF0000] text-white grid items-center justify-center'>
                                            <RxCross2 className='text-lg  text-white' />
                                        </div>
                                    </button>
                                </div>
                            </td>
                        </tr>)}
                    </tbody>
                </table>

            </div>
        </div>
    )
};





