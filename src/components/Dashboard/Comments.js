import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '../SharedPage/Table';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';

const Comments = () => {
    const [token] = useToken();
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();


    //Get All Comments
    useEffect(() => {
        const perUrl = `${baseURL}/api/admin/comments`;
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
                setComments(data.data)
            })
    }, [token]);



    //handle Comments View
    const handleCommentView = (id) => {
        console.log("clicked", id);
        navigate(`/admin-dashboard/comments/${id}`);
    };

    //Handle Delete Service
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
                    const remaining = comments.filter(card => card.id !== id);
                    setComments(remaining);
                    toast.success(data.message)
                })
        };
    };


    const Comments_COLUMNS = () => {
        return [
            {
                Header: "SL",
                id: 'index',
                accessor: (_row, i) => i + 1 
            },
            {
                Header: "Name",
                accessor: "commenter_name",
                sortType: 'basic',

            },
            {
                Header: "Email",
                accessor: "commenter_email",
                sortType: 'basic',

            },
            {
                Header: "Comment",
                accessor: "body",
                sortType: 'basic',

            },
            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => {
                    const { id } = row.original;
                    return (<div className='flex items-center justify-center  gap-2 '>
                        <button onClick={() => handleCommentView(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                <BsEyeFill className='text-lg ' />
                            </div>
                        </button>

                        <button onClick={() => handleDeleteComment(id)}>
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
            {comments.length && (
                <Table
                    columns={Comments_COLUMNS()}
                    data={comments}
                    headline={"All Comments"} />
            )}

        </div>
    );
};

export default Comments;