import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { RiUser3Fill } from 'react-icons/ri';
import { FaUserCheck } from 'react-icons/fa';
import { CgPlayListCheck } from 'react-icons/cg';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';
import { saveAs } from "file-saver";
import { FiDownload } from 'react-icons/fi';
import Table from '../SharedPage/Table';
import SmallTable from '../SharedPage/SmallTable';
import { BsEyeFill } from 'react-icons/bs';






const Dashboard = () => {
    const navigate = useNavigate();
    const [token] = useToken();
    const [totalUser, setTotalUser] = useState([]);
    const [totalBlogReq, setTotalBlogReq] = useState([]);
    const [totalSubReq, setTotalSubReq] = useState([]);
    const [notices, setNotices] = useState([]);
    const [blogs, setBlogs] = useState([]);

    const recentNotice = [...notices].reverse().slice(0, 5);
    const recentBlogs = [...blogs].reverse().slice(0, 5);

    console.log(recentNotice, recentBlogs)


    //Get Users
    useEffect(() => {
        const perUrl = `${baseURL}/api/admin/users`;
        fetch(perUrl, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setTotalUser(data.user))
    }, [token]);


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
                setTotalBlogReq(data.blogger)
            })
    }, [token]);

    //Get All Sub Req
    useEffect(() => {
        const perUrl = `${baseURL}/api/admin/subscriptions`;
        fetch(perUrl, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setTotalSubReq(data.data))
    }, [token]);

    //Get Notices
    useEffect(() => {
        const perUrl = `${baseURL}/api/admin/notices`;
        fetch(perUrl, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.data);
                setNotices(data.data)
            })
    }, [token]);



    //Handle Get posts
    useEffect(() => {
        const sUrl = `${baseURL}/api/admin/posts`;
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
                // console.log(data)
                setBlogs(data.data)
            })
    }, [token]);


    

    const handleBlogView = (id) => {
        console.log("clicked", id);
        navigate(`/admin-dashboard/blogs/${id}`);
    };


    const NOTICE_COLUMNS = () => {
        return [
            {
                Header: "SL",
                id: 'index',
                accessor: (_row, i) => i + 1
            },
            {
                Header: "Title",
                accessor: "title",
                sortType: 'basic',

            },
            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => {
                    const { id ,document} = row.original;
                    return (<div className='flex items-center justify-center gap-2'><a href={`${baseURL}/${document}`}  className='w-8 h-8 rounded-md bg-[#0068A3] text-white grid items-center justify-center' download >
                        <FiDownload className=' ' />
                    </a>
                    </div>);
                },
            },
        ];
    };

    const BLOG_COLUMNS = () => {
        return [
            {
                Header: "SL",
                id: 'index',
                accessor: (_row, i) => i + 1
            },
            {
                Header: "Blogger Name",
                accessor: "author.first_name",
                sortType: 'basic',

            },
            {
                Header: "Blog Title",
                accessor: "title",
                sortType: 'basic',
                Cell: ({ row }) => {
                    const { title } = row.original;
                    return (<div className='flex items-center justify-center  gap-2 '>
                        {title.slice(0, 30)}
                    </div>);
                },

            },
            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => {
                    const { id } = row.original;
                    return (<div className='flex items-center justify-center  gap-2 '>
                        <button onClick={() => handleBlogView(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                <BsEyeFill className='text-lg ' />
                            </div>
                        </button>
                    </div>);
                },
            },


        ];
    };


    return (
        <div className=' text-primary p-3 m-3  rounded-md '>

            <div className=' w-full flex flex-col lg:flex-row items-center justify-between gap-5  mb-5 rounded-md'>
                <div className='flex items-center justify-between gap-5 bg-white  p-5 round w-full rounded-md'>
                    <div className='text-start'>
                        <h2 className='text-xl font-semibold '>Users</h2>
                        <p>{totalUser.length}</p>
                    </div>
                    <div>
                        <RiUser3Fill className='text-3xl font-bold' />
                    </div>
                </div>

                <div className='flex items-center justify-between gap-5 bg-white  p-5 round w-full rounded-md'>
                    <div className='text-start'>
                        <h2 className='text-xl font-semibold '>Blogger Applications</h2>
                        <p>{totalBlogReq.length}</p>
                    </div>
                    <div>
                        <FaUserCheck className='text-3xl font-bold' />
                    </div>
                </div>

                <div className='flex items-center justify-between gap-5 bg-white  p-5 round w-full rounded-md'>
                    <div className='text-start'>
                        <h2 className='text-xl font-semibold '>Subscription Request</h2>
                        <p>{totalSubReq.length}</p>
                    </div>
                    <div>
                        <CgPlayListCheck className='text-3xl font-bold' />
                    </div>
                </div>
            </div>


            <div className='flex flex-col lg:flex-row items-start  gap-5 w-full rounded-md'>

                <div className='w-full bg-white p-3 text-start rounded-md' >
                    <h2 className='text-2xl font-semibold mb-4 pl-1'>Recent Notices</h2>
                    <div>
                        {notices.length && (
                            <SmallTable columns={NOTICE_COLUMNS()} data={recentNotice} headline={" "} />
                        )}
                    </div>
                </div>

                <div className='w-full bg-white p-3 text-start rounded-md' >
                    <h2 className='text-2xl font-semibold mb-4 pl-1'>Recent Blogs</h2>
                    <div>
                        {blogs.length && (
                            <SmallTable columns={BLOG_COLUMNS()} data={recentBlogs} headline={" "} />
                        )}
                    </div>
                </div>

            </div>



        </div>
    );
};

export default Dashboard;