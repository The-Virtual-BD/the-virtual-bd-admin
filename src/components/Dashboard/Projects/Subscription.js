import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '../../SharedPage/Table';
import Loading from '../../utilities/Loading';
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';

const Subscription = () => {
    const [token] = useToken();
    const [subReq, setSubReq] = useState([]);
    const navigate = useNavigate();

    const allsubReq=[...subReq].reverse();
    const [isLoading,setIsLoading]=useState(false);




    //Get All Sub Req
    useEffect(() => {
        const perUrl = `${baseURL}/api/admin/subscriptions`;
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
                setSubReq(data.data);
            })
    }, [token]);

    // console.log(subReq)


    //handle Sub Req View
    const handleSubReqView = (id) => {
        console.log("clicked", id);
        navigate(`/admin-dashboard/sub-request/${id}`);
    };


    //Handle Delete Service
    const handleDeleteSubReq = id => {
        const procced = window.confirm("You Want To Delete?");

        if (procced) {
            const userUrl = `${baseURL}/api/admin/subscriptions/destroy/${id}`;
            fetch(userUrl, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const remaining = subReq.filter(card => card.id !== id);
                    setSubReq(remaining);
                    toast.success(data.message)
                })
        };
    };


    const SUB_REQ_COLUMNS = () => {
        return [
            {
                Header: "SL",
                id: 'index',
                accessor: (_row, i) => i + 1 
            },
            {
                Header: "Name",
                accessor: "applicant.first_name",
                sortType: 'basic',

            },
            {
                Header: "Service",
                accessor: "subject",
                sortType: 'basic',

            },
            {
                Header: "Meeting Time",
                accessor: "schedule",
                sortType: 'basic',
            },

            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => {
                    const { id } = row.original;
                    return (<div className='flex items-center justify-center  gap-2 '>
                        <button onClick={() => handleSubReqView(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                <BsEyeFill className='text-lg ' />
                            </div>
                        </button>

                        <button onClick={() => handleDeleteSubReq(id)}>
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
        <div className='text-primary p-3'>
            {subReq.length && (
                <Table
                    columns={SUB_REQ_COLUMNS()}
                    data={allsubReq}
                    headline={"Subscription Requests"} />
            )}

        </div>
    );
};

export default Subscription;