import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';
import { FiDownload } from 'react-icons/fi';
import { RiEditBoxFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '../../SharedPage/Table';
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';
import { saveAs } from "file-saver";
import Loading from '../../utilities/Loading';

const JobApplication = () => {
    const [token] = useToken();
    const [jobAppli, setJobAppli] = useState([]);
    const navigate = useNavigate();
    const allJobAppli=[...jobAppli].reverse();
    const [isLoading,setIsLoading]=useState(false);

    //Get job Application
    useEffect(() => {
        const perUrl = `${baseURL}/api/admin/jobapplications`;
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
                setJobAppli(data.data);
            })
    }, [token]);



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
                    console.log(data);
                    const remaining = jobAppli.filter(card => card.id !== id);
                    setJobAppli(remaining);
                    toast.success(data.message)
                })
        };
    };

    //Download Documents
    const downloadFile = (id) => {
        const getDoc = jobAppli.find(notice => notice.id === id);

        fetch(`${getDoc.document}`)
          .then((response) => response.blob())
          .then((blob) => {
            saveAs(blob, `${getDoc.name}.pdf`);
          });
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
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => {
                    const { id } = row.original;
                    return (<div className='flex  items-center justify-center  gap-2 '>
                        <button onClick={() => handlejobAppliView(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                <BsEyeFill className='text-lg  ' />
                            </div>
                        </button>
                        <button onClick={() => downloadFile(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#0068A3] text-white grid items-center justify-center'>
                                <FiDownload className='text-lg  text-white' />
                            </div>
                        </button>

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

    if(isLoading){
        return(<Loading />)
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