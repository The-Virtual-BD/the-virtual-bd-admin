import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Table from '../SharedPage/Table';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';

const Subscription = () => {
    const[token]=useToken();
    const [subReq, setSubReq] = useState([]);
    const navigate = useNavigate();

   /*  useEffect(() => {
        fetch('/subscription.json')
            .then(res => res.json())
            .then(data => setSubReq(data))
    }, []); */


    useEffect(() => {
        const perUrl=`${baseURL}/api/admin/subscriptions`;
        fetch(perUrl,{
          method:"GET",
          headers: {
              'content-type': 'application/json',
              "Authorization": `Bearer ${token}`
          }
      })
          .then(res => res.json())
          .then(data =>setSubReq(data.data))
      }, [token]);


      //handle Sub Req View
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