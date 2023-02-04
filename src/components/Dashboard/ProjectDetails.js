import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
    const [projects, setProjects] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        fetch('/projects.json')
            .then(res => res.json())
            .then(data => setProjects(data))
    }, []);

    const getProjectsDeatils = projects?.find(blog => blog._id == id);
    // console.log(getProjectsDeatils);
    return (
        <div className='bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary'>
            <div>
                <h2 className='text-2xl font-bold text-start my-3 px-4'>View Project</h2>
                <hr className=' text-bgclr' />
            </div>
           

            <div className='flex flex-col lg:flex-row items-start justify-center gap-5 p-4'>
                <div className='w-full lg:w-1/2'>
                    <div className='flex flex-col items-start gap-3'>
                        <h3><span className='font-bold'>Project Title:</span> {getProjectsDeatils?.projectName}</h3>
                        <h3><span className='font-bold'>Client Name: </span>{getProjectsDeatils?.name}</h3>

                        <p><span className='font-bold'>Starting Date: </span>{getProjectsDeatils?.startDate}</p>
                        <p><span className='font-bold'>Ending Date:</span> {getProjectsDeatils?.endDate}</p>
                        <p><span className='font-bold'> Status:</span> {getProjectsDeatils?.status}</p>
                        <p><span className='font-bold'> Budget:</span> {getProjectsDeatils?.budget}</p>

                        <div className='text-start my-3'>
                            <h3 className='font-bold' >Short Description:</h3>
                            <p className='text-labelclr'>{getProjectsDeatils?.blogShortDesc}</p>
                        </div>
                        <div className='text-start'>
                            <h3 className='font-bold'>Description:</h3>
                            <p className='text-labelclr'>{getProjectsDeatils?.blogDesc}</p>
                        </div>

                        <p className='text-start'><span className='font-bold '>Documents:</span> <a className='text-blue cursor-pointer' href={`${getProjectsDeatils?.doc}`} target="_blank" rel="noopener noreferrer">{getProjectsDeatils?.doc}</a> </p>


                    </div>

                </div>


                <div className='w-full lg:w-1/2'>
                    <img src={getProjectsDeatils?.blogImg} alt="" srcset="" className='h-full lg:h-[500px]' />
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;