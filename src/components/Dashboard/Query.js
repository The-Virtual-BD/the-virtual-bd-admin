import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';
import { RiEditBoxFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '../SharedPage/Table';
import Loading from '../utilities/Loading';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';
import { useCollection } from '../../actions/reducers';

const Query = () => {
    const [token] = useToken();
    const navigate = useNavigate();

    const { query,queryLoading } = useCollection();

    if (queryLoading) {
        return (<Loading />)
    };

    if (!queryLoading && query?.length === 0) {
        return <p>No Query is Avaiable</p>
    };

    const allQuery = [...query].reverse();



    // view Single Query 
    const handlequeriesView = (id) => {
        // console.log("clicked", id);
        navigate(`/admin-dashboard/query/${id}`);
    };

   


    //Handle Delete Query
    const  handleDeletequeries = id => {
        const procced = window.confirm("You Want To Delete?");

        if (procced) {
            const userUrl = `${baseURL}/api/admin/queries/destroy/${id}`;
            fetch(userUrl, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    toast.success("Query Deleted")

                })
        };
    };



    const QUERY_COLUMNS = () => {
        return [
            {
                Header: "SL",
                id: 'index',
                accessor: (_row, i) => i + 1 
            },
            {
                Header: "Name",
                accessor: "name",
                sortType: 'basic',

            },
            {
                Header: "Email",
                accessor: "email",
                sortType: 'basic',

            },
            {
                Header: "Phone",
                accessor: "phone",
                sortType: 'basic',

            },

            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => {
                    const { id } = row.original;
                    return (<div className='flex  items-center justify-center  gap-2 '>
                        <button onClick={() => handlequeriesView(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                <BsEyeFill className='text-lg  ' />
                            </div>
                        </button>

                        <button onClick={() => handleDeletequeries(id)}>
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
        <div className='text-primary p-3 '>
            {query?.length && (
                <Table columns={QUERY_COLUMNS()} data={allQuery} headline={"All Queries"} />
            )}
        </div>
    );
};

export default Query;


