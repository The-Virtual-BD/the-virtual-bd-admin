import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';
import { FiDownload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '../../SharedPage/Table';
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';
import Loading from '../../utilities/Loading';
import moment from 'moment';
import { useCollection } from '../../../actions/reducers';

const JobApplication = () => {
    const [token] = useToken();
    const navigate = useNavigate();
    const { jobAppli, jobAppliLoading } = useCollection();

    if (jobAppliLoading) {
        return (<Loading />)
    };

    if (!jobAppliLoading && jobAppli?.length === 0) {
        return <p>No Job is Avaiable</p>
    };

    const allJobAppli = [...jobAppli].reverse();


    const handlejobAppliView = (id) => {
        console.log("clicked", id);
        navigate(`/admin-dashboard/job-application/${id}`);
    };

    //Handle Delete jobAppli
    const handleDeletejobAppli = id => {
        const procced = window.confirm("You Want To Delete?");

        if (procced) {
            const userUrl = `${baseURL}/api/admin/jobapplications/destroy/${id}`;
            fetch(userUrl, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    toast.success(data.message)
                })
        };
    };

   

    const jobAppli_COLUMNS = () => {
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
                Header: "Phone",
                accessor: "phone",
                sortType: 'basic',

            },
            {
                Header: "Designation",
                accessor: "vaccancy.designation",
                sortType: 'basic',

            },
            {
                Header: "Applied Date",
                accessor: "created_at",
                sortType: 'basic',
                Cell: ({ row }) => {
                    const { created_at } = row.original;
                    return (
                       <div>
                         { moment(created_at).format('DD MMMM, YYYY')}
                       </div>
                    );
                },
            },
            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => {
                    console.log(row)
                    const { id,cv} = row.original;
                    return (<div className='flex  items-center justify-center  gap-2 '>
                        <button onClick={() => handlejobAppliView(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                <BsEyeFill className='text-lg  ' />
                            </div>
                        </button>
                        <a href={`${baseURL}/${cv}`} download >
                            <div   className='w-8 h-8 rounded-md bg-[#0068A3] text-white grid items-center justify-center' >
                                <FiDownload className='text-lg  text-white' />
                            </div>
                        </a>

                        <button onClick={() => handleDeletejobAppli(id)}>
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
        {jobAppli.length && (
            <Table columns={jobAppli_COLUMNS()} data={allJobAppli} headline={"All Job Applications"} />
        )}
    </div>
    );
};

export default JobApplication;