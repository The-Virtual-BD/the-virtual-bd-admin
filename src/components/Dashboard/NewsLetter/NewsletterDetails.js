import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';

const NewsletterDetails = () => {
    const { id } = useParams();
    const [token] = useToken();
    const [singNewsLetter, setsingNewsLetter] = useState({});
    



    //Handle Get Newsletters
    useEffect(() => {
        const sUrl = `${baseURL}/api/admin/newsletters/${id}`;
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
                console.log(data)
                setsingNewsLetter(data.data)
            })
    }, [token, id]);

    console.log(singNewsLetter);


    return (
        <div className='bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary'>
        <div>
           <h2 className='text-2xl font-bold text-start my-3 '>View Newsletter</h2>
           <hr className=' text-bgclr' />
       </div>


       <div className='mt-5 flex items-start flex-col lg:flex-row gap-5'>
          <div className='w-full lg:w-1/2'>
            <div className='text-start  mb-1'>
                <h3 ><span className='font-bold'>Description: </span></h3>
                <div  className='text-labelclr' dangerouslySetInnerHTML={{ __html: singNewsLetter?.text  }}/>
            </div>

            <div className='text-start mb-1'>
                <h3 ><span className='font-bold'>Link: </span><a href={singNewsLetter?.link} target="_blank" rel="noopener noreferrer" className='text-blue'>{singNewsLetter?.link}</a></h3>
            </div>

          </div>

          <div className='w-full lg:w-1/2'>
            <img src={`${baseURL}/${singNewsLetter?.image}`} alt="" srcset="" />
          </div>

       </div>

   </div>
    );
};

export default NewsletterDetails;