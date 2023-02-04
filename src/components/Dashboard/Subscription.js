import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Table from '../SharedPage/Table';

const Subscription = () => {
    const [subReq, setSubReq] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/subscription.json')
            .then(res => res.json())
            .then(data => setSubReq(data))
    }, []);

    const handleSubReqView = (id) => {
        console.log("clicked", id);
        navigate(`/admin-dashboard/sub-request/${id}`);
    };


    const SUB_REQ_COLUMNS = () => {
        return [
            {
                Header: "SL",
                accessor: "id",
                sortType: 'basic',

            },
            {
                Header: "Name",
                accessor: "userName",
                sortType: 'basic',

            },
            {
                Header: "Service",
                accessor: "service",
                sortType: 'basic',

            },
            {
                Header: "Date",
                accessor: "meeting_date",
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
            {subReq.length && (
                <Table
                    columns={SUB_REQ_COLUMNS()}
                    data={subReq}
                    headline={"Subscription Request"} />
            )}

        </div>
    );
};

export default Subscription;