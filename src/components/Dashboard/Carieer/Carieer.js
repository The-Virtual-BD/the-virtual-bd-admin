import React, { useContext, useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';
import { RiEditBoxFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { APPContext } from '../../../actions/reducers';
import Table from '../../SharedPage/Table';
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';

const Carieer = () => {
    const { addCareer } = useContext(APPContext);
    return (
        <div>
             { addCareer ?   <AddCarieer />:  <ViewCarieer />}
        </div>
    );
};

export default Carieer;


const ViewCarieer=()=>{
    const [token] = useToken();
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    //Get Services
    useEffect(() => {
        const perUrl = `${baseURL}/api/admin/vaccancies`;
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
                setJobs(data.data);
            })
    }, [token]);




    const handleUserView = (id) => {
        console.log("clicked", id);
        navigate(`/admin-dashboard/carieer/${id}`);
    };

    const handleUserEdit = (id) => {
        console.log("clicked", id);
        navigate(`/admin-dashboard/carieer/update/${id}`);
    };


    //Handle Delete Service
    const handleDeleteService = id => {
        const procced = window.confirm("You Want To Delete?");

        if (procced) {
            const userUrl = `${baseURL}/api/admin/vaccancies/destroy/${id}`;
            fetch(userUrl, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    const remaining = jobs.filter(card => card.id !== id);
                    setJobs(remaining);
                    toast.success(data.message)

                })
        };
    };



    const SERVICE_COLUMNS = () => {
        return [
            {
                Header: "SL",
                id: 'index',
                accessor: (_row, i) => i + 1 
            },
            {
                Header: "Designation",
                accessor: "designation",
                sortType: 'basic',

            },
            {
                Header: "Type",
                accessor: "type",
                sortType: 'basic',

            },
            {
                Header: "Skills",
                accessor: "skills",
                sortType: 'basic',

            },
           

            {
                Header: 'Action',
                accessor: 'action',
                Cell: ({ row }) => {
                    const { id } = row.original;
                    return (<div className='flex  items-center justify-center  gap-2 '>
                        <button onClick={() => handleUserView(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                <BsEyeFill className='text-lg  ' />
                            </div>
                        </button>
                        <button onClick={()=>handleUserEdit(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#0068A3] text-white grid items-center justify-center'>
                                <RiEditBoxFill className='text-lg  text-white' />
                            </div>
                        </button>

                        <button onClick={() => handleDeleteService(id)}>
                            <div className='w-8 h-8 rounded-md bg-[#FF0000] text-white grid items-center justify-center'>
                                <AiFillDelete className='text-lg  text-white' />
                            </div>
                        </button>
                    </div>);
                },
            },


        ];
    };

    return(
        <div className='text-primary p-3 '>
        {jobs.length && (
            <Table columns={SERVICE_COLUMNS()} data={jobs} headline={"All Jobs"} />
        )}
    </div>
    )
};


const AddCarieer=()=>{
    const [token] = useToken();

    const [designation,setDesignation]=useState('');
    const [type,setType]=useState('');
    const [salary_range,setSalary_range]=useState('');
    const [skills,setSkills]=useState('');
    const [description,setDescription]=useState('');


    //Handle Add Job
    const handleAddServiceForm = async (e) => {
        e.preventDefault();

        const jobData = new FormData();
        jobData.append("designation", designation);
        jobData.append("type", type);
        jobData.append("salary_range", salary_range);
        jobData.append("skills", skills);
        jobData.append("description", description);


        const url = `${baseURL}/api/admin/vaccancies/store`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: jobData
        });

        const result = await response.json();

        if (result.error) {
            console.log(result.error);
            toast.error("Job Add Failed");
        } else {
            console.log(result);
            e.target.reset();
            toast.success(result.message);
        }
    };

    return(
        <div className='text-labelclr p-3 m-3 bg-white rounded-md '>
            <div >
                <h3 className='px-3 text-2xl font-bold text-center  lg:text-start my-2'>Add Job</h3>

                <form className='p-3' onSubmit={handleAddServiceForm} >

                    <div className='flex flex-col lg:flex-row items-center gap-3'>
                        <div className="mb-3 flex flex-col items-start w-full">
                            <label for="projectTitle" className="font-bold mb-1">Designation</label>
                            <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setDesignation(e.target.value)} placeholder="Designation" />
                        </div>

                        <div className="mb-3 flex flex-col items-start w-full">
                            <label for="projectTitle" className="font-bold mb-1">Job Type</label>
                            <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setType(e.target.value)} placeholder="Job Type" />
                        </div>
                    </div>

                    <div className='flex flex-col lg:flex-row items-center gap-3'>
                        <div className="mb-3 flex flex-col items-start w-full">
                            <label for="projectTitle" className="font-bold mb-1">Salary Range</label>
                            <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setSalary_range(e.target.value)} placeholder="Salary Range" />
                        </div>

                        <div className="mb-3 flex flex-col items-start w-full">
                            <label for="projectTitle" className="font-bold mb-1">Skills</label>
                            <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setSkills(e.target.value)} placeholder="Skills" />
                        </div>
                    </div>

                    <div className="mb-3 flex flex-col items-start w-full">
                        <label for="projectShortDesc" className="font-bold mb-1"> Description</label>
                        <textarea className="w-full bg-bgclr rounded py-1 px-3 outline-none" id='projectShortDesc' rows="4" onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
                    </div>

                  

                    <div className="flex flex-row gap-3 justify-center lg:justify-end items-center text-center mt-3">
                        <button type="submit" className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg">Add</button>
                    </div>
                </form>
            </div>


        </div>
    )
};