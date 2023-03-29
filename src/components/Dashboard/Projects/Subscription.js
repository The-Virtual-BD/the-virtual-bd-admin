import moment from 'moment';
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

    const allsubReq = [...subReq].reverse();
    const [isLoading, setIsLoading] = useState(false);
    // console.log(allsubReq);
    const scheduleDate = moment(subReq?.schedule).format('DD MMM YYYY hh:mm A');




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
                // console.log(data.data)
                setIsLoading(false);
                setSubReq(data.data);
            })
    }, [token]);

    console.log(subReq)


    //handle Sub Req View
    const handleSubReqView = (id) => {
        console.log("clicked", id);
        navigate(`/admin-dashboard/sub-request/${id}`);
    };


    //Handle Delete Service
    const handleDeleteSubReqe = id => {
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
                accessor: "service.name",
                sortType: 'basic',
            },
            {
                Header: "Meeting Time",
                accessor: "schedule",
                sortType: 'basic',
                Cell: ({ row }) => {
                    const { schedule } = row.original;
                    return (<p>
                        { moment(schedule).format('DD MMMM, YYYY hh:mm A')}
                    </p>);
                },
            },
            {
                Header: "Status",
                accessor: "status",
                sortType: 'basic',
                Cell: ({ row }) => {
                    const { status } = row.original;
                    return (<div className='flex items-center justify-center  gap-2 text-sm'>
                        {
                            status == "1" ?
                                (<p className='bg-white  px-2 py-[2px] rounded-full border text-xs border-yellow-500  text-yellow-500 '>Pending</p>)
                                : status == "4" ?
                                    (<p className='bg-white  px-2 py-[2px] rounded-full border text-xs  border-red-500 text-red-500'>Declined</p>)
                                    : status == "3" ? (
                                        <p className='bg-white px-2 py-[2px] rounded-full border border-green-500 text-xs text-green-500'>  Approved</p>)
                                        : status == "2" ? (
                                            <p className='bg-white px-2 py-[2px] rounded-full border border-purple-500 text-xs text-purple-500'> Ongoing</p>) : ""
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
                        <button onClick={() => handleSubReqView(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                <BsEyeFill className='text-lg ' />
                            </div>
                        </button>

                        <button onClick={() => handleDeleteSubReqe(id)}>
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