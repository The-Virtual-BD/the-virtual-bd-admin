import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';

const ProjectDetails = () => {
    const [project, setProject] = useState([]);
    const { id } = useParams();
    const[token]=useToken();

   

     //Handle Get Project
     useEffect(() => {
        const sUrl = `${baseURL}/api/admin/projects/show/${id}`;
        // setLoading(true);

        fetch(sUrl, {
            method: 'GET',
            headers: { 
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // setLoading(false);
                console.log(data.data)
                setProject(data.data)
            })
    }, [token,id]);

    console.log(project)

    return (
        <div className='bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary'>
            <div>
                <h2 className='text-2xl font-bold text-start my-3 px-4'>View Project</h2>
                <hr className=' text-bgclr' />
            </div>
           

            <div className='flex flex-col lg:flex-row items-start justify-center gap-5 p-4'>
                <div className='w-full lg:w-1/2'>
                    <div className='flex flex-col items-start gap-3'>
                        <h3><span className='font-bold'>Project Title:</span> {project?.name}</h3>
                        <h3><span className='font-bold'>Client Name: </span>{project?.client_name}</h3>

                        <p><span className='font-bold'>Starting Date: </span>{project?.starting_date}</p>

                        <p><span className='font-bold'>Ending Date:</span> {project?.ending_date}</p>

                        <p><span className='font-bold'> Status:</span> {project?.status}</p>
                        <p><span className='font-bold'> Budget:</span> {project?.value}</p>

                        <div className='text-start my-3'>
                            <h3 className='font-bold' >Short Description:</h3>
                            <p className='text-labelclr'>{project?.short_description}</p>
                        </div>

                        <div className='text-start'>
                            <h3 className='font-bold'>Description:</h3>
                            <p className='text-labelclr'>{project?.description}</p>
                        </div>

                        <p className='text-start'><span className='font-bold '>Documents:</span> <a className='text-blue cursor-pointer' href={`${project?.documents}`} target="_blank" rel="noopener noreferrer">{project?.documents}</a> </p>


                    </div>

                </div>


                <div className='w-full lg:w-1/2'>
                    <img src={`${baseURL}/${project?.cover}`} alt="" srcSet="" className='h-full lg:h-[500px]' />
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;