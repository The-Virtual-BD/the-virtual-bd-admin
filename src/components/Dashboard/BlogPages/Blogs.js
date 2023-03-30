import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsCheck2, BsEyeFill, } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '../../SharedPage/Table';
import Loading from '../../utilities/Loading';
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';

const Blogs = () => {
    const [token] = useToken();
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();
    const allBlogs = [...blogs].reverse();
    const [isLoading, setIsLoading] = useState(false);

    //Handle Get posts
    useEffect(() => {
        const sUrl = `${baseURL}/api/admin/posts`;
        setIsLoading(true);

        fetch(sUrl, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setIsLoading(false);
                setBlogs(data.data)
            })
    }, [token]);

    const handleBlogView = (id) => {
        console.log("clicked", id);
        navigate(`/admin-dashboard/blogs/${id}`);
    };

    //Handle Delete Post
    const handleDeletePost = id => {
        const procced = window.confirm("You Want To Delete?");


        if (procced) {
            const userUrl = `${baseURL}/api/admin/posts/destroy/${id}`;
            fetch(userUrl, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const remaining = blogs.filter(card => card.id !== id);
                    setBlogs(remaining);
                    toast.success(data.message)
                })
        };
    };


    // console.log(allBlogs)


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
                Cell: ({ row }) => {
                    console.log(row)
                    const { id,first_name } = row.original.author;
                    return (<>
                       <Link to={`/admin-dashboard/user-managment/${id}`}>{first_name}</Link>
                    </>);
                },

            },
            {
                Header: "Blog Title",
                accessor: "title",
                sortType: 'basic',
                Cell: ({ row }) => {
                    const { title } = row.original;
                    return (<div className='flex items-center justify-center  gap-2 '>
                        {title.slice(0, 40)}
                    </div>);
                },

            },
            {
                Header: "Category Name",
                accessor: "category.name",
                sortType: 'basic',

            },
            {
                Header: "Status",
                accessor: "status",
                sortType: 'basic',
                Cell: ({ row }) => {
                    const { status } = row.original;
                    console.log(status)
                    return (<div className='flex items-center justify-center  gap-2 text-sm'>
                        {
                            status == "2" ?
                                (<p className='bg-white px-2 py-[2px] rounded-full border border-green-500 text-xs text-green-500'>  Approved</p>)
                                : status == "3" ? (<p className='bg-white  px-2 py-[2px] rounded-full border text-xs  border-red-500  text-red-500'>Declined</p>) : (
                                <p className='bg-white  px-2 py-[2px] rounded-full border text-xs  border-yellow-500  text-yellow-500'>Pending</p>
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
                        <button onClick={() => handleBlogView(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                <BsEyeFill className='text-lg ' />
                            </div>
                        </button>

                        <button onClick={() => handleDeletePost(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#FF0000] text-white grid items-center justify-center'>
                                <AiFillDelete className='text-lg  text-white' />
                            </div>
                        </button>
                    </div>);
                },
            },


        ];
    };

    if (isLoading) {
        return (<Loading />)
    };

    return (
        <div className='text-primary p-3'>
            {blogs.length && (
                <Table
                    columns={BLOG_COLUMNS()}
                    data={allBlogs}
                    headline={"All Blogs"} />
            )}

        </div>
    );
};

export default Blogs;









