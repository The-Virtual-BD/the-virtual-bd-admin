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

const Query = () => {
    const [token] = useToken();
    const [queries, setQuery] = useState([]);
    const navigate = useNavigate();

    const allQueries=[...queries].reverse();
    const [isLoading,setIsLoading]=useState(false);

    //Get Queries
    useEffect(() => {
        const perUrl = `${baseURL}/api/admin/queries`;
        setIsLoading(true);
        fetch(perUrl, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false);
                setQuery(data.data)
            })
    }, [token]);



    // view Single Query 
    const handlequeriesView = (id) => {
        console.log("clicked", id);
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
                    console.log(data);
                    const remaining = queries.filter(card => card.id !== id);
                    setQuery(remaining);
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

    if(isLoading){
        return(<Loading />)
    };
    
    return (
        <div className='text-primary p-3 '>
            {queries.length && (
                <Table columns={QUERY_COLUMNS()} data={allQueries} headline={"All Queries"} />
            )}
        </div>
    );
};

export default Query;


