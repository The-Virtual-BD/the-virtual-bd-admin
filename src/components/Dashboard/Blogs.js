import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsCheck2, BsEyeFill, } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '../SharedPage/Table';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';

const Blogs = () => {
    const [token] = useToken();
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

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

    //Handle Delete Post
    const handleDeletePost=id=>{
        const procced=window.confirm("You Want To Delete?");
    

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


    console.log(blogs)


    const BLOG_COLUMNS = () => {
        return [
            {
                Header: "SL",
                accessor: "id",
                sortType: 'basic',

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
                    return (<div className='flex items-center justify-center  gap-2 '>
                           {status==="1"?
                           <p className='text-yellow-500'>Pending</p>:
                           <p className='text-green-700'>Approved</p>
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









