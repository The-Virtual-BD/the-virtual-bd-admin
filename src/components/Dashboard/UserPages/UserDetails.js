import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';
import blankUser from '../../../images/blank_user.png';
import { BsEyeFill } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Table from '../../SharedPage/Table';

const UserDetails = () => {
    const { id } = useParams();
    const [token] = useToken();
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const perUrl = `${baseURL}/api/admin/user/${id}`;
        fetch(perUrl, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setUser(data.user))
    }, [id, token]);



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
                    toast.success(data.message)
                })
        };
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

    console.log(user)

    return (
        <div className='mx-2 lg:mx-8  text-primary '>
            <div className='bg-white p-4  my-5 rounded-md  flex items-center justify-start gap-3'>

                {
                    (user.photo) ?
                        <img src={`${baseURL}/${user?.photo}`} alt={user?.name} srcSet="" className='h-[100px] w-[100px] rounded-full' />
                        :
                        <img src={blankUser} alt={user?.name} srcSet="" className='h-[100px] w-[100px] rounded-full' />
                }

                <div className='text-start'>
                    <h2 className='text-2xl font-bold'>{`${user?.first_name} ${user?.last_name}`}</h2>
                    <p><span className='font-bold'> </span> {user?.profession}</p>
                </div>
            </div>


            <div className='bg-white p-4  my-5 rounded-md text-start'>
                <h2 className='text-2xl font-bold'>Contact Information : </h2>

               
                   

                <div className='flex items-start gap-8'>
                    <div className='mt-5'>
                        <h3 className='font-bold'>Email:</h3>
                        <h3 className='font-bold'>Phone:</h3>
                        <h3 className='font-bold'>Date of Birth:</h3>
                        <h3 className='font-bold'>Nationality:</h3>
                        <h3 className='font-bold'>Bio:</h3>
                    </div>

                    <div className='mt-5'>
                        <p>{user?.email}</p>
                        <p>{user?.phone}</p>
                        <p>{user?.birth_date}</p>
                        <p>{user?.nationality}</p>
                        <p>{user?.bio}</p>
                    </div>


                </div>

            </div>


        <div className='text-primary '>
            {user?.posts && (
                <Table
                    columns={BLOG_COLUMNS()}
                    data={user?.posts}
                    headline={`Blogs`} />
            )}
        </div>







        </div>
    );
};

export default UserDetails;

