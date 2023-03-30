import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';
import moment from 'moment/moment';

const JobAppliDetails = () => {
    const [jobapp, setJobapp] = useState({});
    const { id } = useParams();
    const [token] = useToken();



    //Handle Get Single applications
    useEffect(() => {
        const sUrl = `${baseURL}/api/admin/jobapplications/${id}`;

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
                console.log(data)
                setJobapp(data.data)
            })
    }, [token, id]);

  const applyTime=  moment(jobapp?.created_at).format('DD MMMM, YYYY')

      if(!jobapp){
        return <p>Loading....</p>
      };

    return (
        <div className='bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary'>
             <div>
                <h2 className='text-2xl font-bold text-start my-3 '>View Job Application</h2>
                <hr className=' text-bgclr' />
            </div>


            <div className='mt-5'>
                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold '>Designation: </span>{jobapp?.vaccancy?.designation}</h3>
                </div>
                
                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Job Type: </span>{jobapp?.vaccancy?.type}</h3>
                </div>

                <div className='text-start mb-3'>
                    <h3 ><span className='font-bold'>Salary Range: </span>{jobapp?.vaccancy?.salary_range}</h3>
                </div>
               


                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Applicant's Name: </span>{jobapp?.name}</h3>
                </div>

                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Email: </span> <a href={`mailto:${jobapp?.email}`} className="text-blue hover:underline">{jobapp?.email}</a></h3>
                </div>

                <div className='text-start mb-1'>
                    <h3 ><span className='font-bold'>Phone: </span>{jobapp?.phone}</h3>
                </div>

                
                <div className='text-start mb-2'>
                    <h3 ><span className='font-bold'>Expected Salary: </span>{jobapp?.expected_salary}</h3>
                </div>

                <div className='text-start mb-2'>
                    <h3 ><span className='font-bold'>Job Apply Date: </span>{applyTime}</h3>


                </div>

                <div className='text-start  mb-1'>
                    <h3 ><span className='font-bold'>CV : </span> <a href={`${baseURL}/${jobapp?.cv}`} download className='text-blue cursor-pointer' >Download CV</a></h3>
                </div>

            </div>

        </div>
    );
};

export default JobAppliDetails;