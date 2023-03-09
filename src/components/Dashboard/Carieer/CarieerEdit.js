import { CKEditor } from 'ckeditor4-react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';

const CarieerEdit = () => {
    const {id}=useParams();
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


       /*  const url = `${baseURL}/api/admin/vaccancies/store`;
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
        } */
    };

    return (
        <div className='text-labelclr p-3 m-3 bg-white rounded-md '>
        <div >
            <h3 className='px-3 text-2xl font-bold text-center  lg:text-start my-2'>Edit Job</h3>

            <form className='p-3' onSubmit={handleAddServiceForm} >

                <div className='flex flex-col lg:flex-row items-center gap-3'>
                    <div className="mb-3 flex flex-col items-start w-full">
                        <label for="projectTitle" className="font-bold mb-1">Designation</label>
                        <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setDesignation(e.target.value)} placeholder="Designation" required />
                    </div>

                    <div className="mb-3 flex flex-col items-start w-full">
                        <label for="projectTitle" className="font-bold mb-1">Job Type</label>
                        <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setType(e.target.value)} placeholder="Job Type" required />
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row items-center gap-3'>
                    <div className="mb-3 flex flex-col items-start w-full">
                        <label for="projectTitle" className="font-bold mb-1">Salary Range</label>
                        <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setSalary_range(e.target.value)} placeholder="Salary Range" required />
                    </div>

                    <div className="mb-3 flex flex-col items-start w-full">
                        <label for="projectTitle" className="font-bold mb-1">Skills</label>
                        <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setSkills(e.target.value)} placeholder="Skills" required />
                    </div>
                </div>

                <div className="mb-3 flex flex-col  w-full">
                    <label for="serviceDesc" className="mb-1 font-bold text-start">Description</label>
                    <CKEditor
                        data={description}
                        onChange={e => setDescription(e.editor.getData())}
                        // config={{toolbar: editorToolbar}}
                        className="w-full bg-bgclr rounded py-2 px-3 outline-none" required 
                    />
                </div>



               {/*  <div className="mb-3 flex flex-col items-start w-full">
                    <label for="projectShortDesc" className="font-bold mb-1"> Description</label>
                    <textarea className="w-full bg-bgclr rounded py-1 px-3 outline-none" id='projectShortDesc' rows="4" onChange={(e) => setDescription(e.target.value)} placeholder="Description" required></textarea>
                </div> */}

              

                <div className="flex flex-row gap-3 justify-center lg:justify-end items-center text-center mt-3">
                    <button type="submit" className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg">Add</button>
                </div>
            </form>
        </div>


    </div>
    );
};

export default CarieerEdit;