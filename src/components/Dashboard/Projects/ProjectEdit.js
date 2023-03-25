import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';

const ProjectEdit = () => {
    const { id } = useParams();
    const [token] = useToken();

    //Get Select Data
    const [allServices,setAllServices]=useState([]);
    const [project, setProject] = useState({});
    console.log(project)


    const [namE, setProjectTitle] = useState('');
    const [client_namE, setClientName] = useState('');
    const [service_iD, setServiceId] = useState('');
    const [descriptioN, setProjectDesc] = useState('');
    const [short_descriptioN, setProjectShortDesc] = useState('');
    const [coveR, setProjectCover] = useState(null);
  
    const [videO, setVideo] = useState("");
    const [client_typE, setClient_type] = useState('');
    const [client_origiN, setClient_origin] = useState('');
    const [imagE1, setImage1] = useState(null);
    const [imagE2, setImage2] = useState(null);
    const [imagE3, setImage3] = useState(null);


    //Update Value
    useEffect(() => {
      if (project) { 
        setProjectTitle(project.name);
        setClientName(project.client_name);
        setClient_type(project.client_type);
        setClient_origin(project.client_origin);
        setServiceId(project.service_id);
        setProjectDesc(project.description);
        setProjectShortDesc(project.short_description);
        setProjectCover(project.cover);
        setVideo(project.video);
        setImage1(project.image_1);
        setImage2(project.image_2)
        setImage3(project.image_3);
      }
    }, [project]);
  
    

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
  }, [token, id]);
  
  
     //Get Services
     useEffect(() => {
      const sUrl = `${baseURL}/api/services/activeservices`;
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
              // setLoading(false)
              setAllServices(data)
          })
  }, [token]);
  
  
   
     //Handle Update project
     const handleUpdateProjectForm = async(e) => {
        e.preventDefault();
    
        const projectData = new FormData();
          projectData.append("name", namE);
          projectData.append("client_name", client_namE);
          projectData.append("client_type", client_typE);
          projectData.append("client_origin", client_origiN);
          projectData.append("video", videO);

          projectData.append("service_id", service_iD);
          projectData.append("description", descriptioN);
          projectData.append("short_description", short_descriptioN);
          projectData.append("cover", coveR);
          projectData.append("image_1", imagE1);
          projectData.append("image_2", imagE2);
          projectData.append("image_3", imagE3);
          
    
        const url = `${baseURL}/api/projects/store`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: projectData
        });
    
        const result = await response.json();
    
        if (result.error) {
            console.log(result.error);
            toast.error("Project Updated Failed");
        } else {
            console.log(result);
            e.target.reset();
            toast.success(result.message);
        }
    
      };

     


    return (
      <div className='text-labelclr p-3 m-3 bg-white rounded-md '>
      <div >
        <h3 className='px-3 text-2xl font-bold text-center  lg:text-start my-2'>Update Project</h3>
        <form className='p-3 ' onSubmit={handleUpdateProjectForm } >

           <div className='flex flex-col lg:flex-row items-center gap-5'>
              <div className="mb-3 flex flex-col items-start w-full">
                  <label for="projectTitle" className="font-bold mb-1">Project Title</label>
                  <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setProjectTitle(e.target.value)} value={namE} />
                </div>

                <div className="mb-3 flex flex-col items-start w-full">
                  <label for="Client-Name" className="font-bold mb-1">Client Name</label>
                  <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="Client-Name" onChange={(e) => setClientName(e.target.value)} value={client_namE} />
                </div>
           </div>

          <div className='flex flex-col lg:flex-row items-center gap-5'>
            <div className="mb-3 flex flex-col items-start w-full">
              <label for="projectsub" className="font-bold mb-1">Select Service</label>
              <div className="flex justify-center w-full">
                <div className=" w-full">
                  <select onChange={(e) => setServiceId(e.target.value)} className="form-select appearance-none  w-full px-3  py-2  bg-bgclr bg-clip-padding bg-no-repeat rounded transition ease-in-out  m-0 outline-none" aria-label="projectsub"  value={service_iD}>
                    <option selected disabled>Select Service</option>
                    {
                      allServices?.data?.map(service => <option value={service.id}>{service.name}</option>)
                    }
                  </select>
                </div>
              </div>
            </div>

             <div className="mb-3 flex flex-col items-start w-full">
                <label for="Client-Name" className="font-bold mb-1">Client Type</label>
                <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="Client-Name" onChange={(e) => setClient_type(e.target.value)} value={client_typE} />
              </div>
          </div>

          <div className='flex flex-col lg:flex-row items-center gap-5'>
                <div className="mb-3 flex flex-col items-start w-full">
                    <label for="img" className="font-bold mb-1">Upload Cover</label>
                    <input className="form-control  block w-full px-3  rounded py-2 text-base  font-normal bg-clip-padding bg-bgclr
                      outline-none focus:outline-none" type="file" id="img" onChange={(e) => setProjectCover(e.target.files[0])}  />
                </div>

                <div className="mb-3 flex flex-col items-start w-full">
                  <label for="Client-Name" className="font-bold mb-1">Client Origin</label>
                  <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="Client-Name" onChange={(e) => setClient_origin(e.target.value)} value={client_origiN} />
                </div>
           </div>

           <div className='flex flex-col lg:flex-row items-center gap-5'>
               

                <div className="mb-3 flex flex-col items-start w-full">
                  <label for="Client-Name" className="font-bold mb-1">Add Video</label>
                  <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="Client-Name" onChange={(e) => setVideo(e.target.value)} value={videO} />
                </div>

                <div className="mb-3 flex flex-col items-start w-full">
                  <label for="img" className="font-bold mb-1">Add Image 1</label>
                  <input className="form-control  block w-full px-3  rounded py-2 text-base  font-normal bg-clip-padding bg-bgclr
                    outline-none focus:outline-none" type="file" id="img" onChange={(e) => setImage1(e.target.files[0])}  />
                </div>
           </div>

           <div className='flex flex-col lg:flex-row items-start justify-between gap-5'>
                <div className="mb-3 flex flex-col items-start w-full">
                  <label for="img" className="font-bold mb-1">Add Image 2</label>
                  <input className="form-control  block w-full px-3  rounded py-2 text-base  font-normal bg-clip-padding bg-bgclr
                    outline-none focus:outline-none" type="file" id="img" onChange={(e) => setImage2(e.target.files[0])}  />
                </div>

                <div className="mb-3 flex flex-col items-start w-full">
                  <label for="img" className="font-bold mb-1">Add Image 3</label>
                  <input className="form-control  block w-full px-3  rounded py-2 text-base  font-normal bg-clip-padding bg-bgclr
                    outline-none focus:outline-none" type="file" id="img" onChange={(e) => setImage3(e.target.files[0])}  />
                </div>
           </div>

            <div className="mb-3 flex flex-col items-start w-full">
                  <label for="projectShortDesc" className="font-bold mb-1">Short Description</label>
                  <textarea className="w-full bg-bgclr rounded py-1 px-3 outline-none" id='projectShortDesc' rows="4" onChange={(e) => setProjectShortDesc(e.target.value)} value={short_descriptioN} ></textarea>
              </div>

              <div className="mb-3 flex flex-col items-start w-full">
                  <label for="projectDesc" className="font-bold mb-1">Description</label>
                  <textarea className="w-full bg-bgclr rounded py-1 px-3 outline-none" id='projectDesc' rows="5" onChange={(e) => setProjectDesc(e.target.value)} value={descriptioN}></textarea>
              </div>

          <div className="flex flex-row gap-3 justify-center lg:justify-end items-center text-center mt-3">
              <button type="submit" className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg ">Update</button>
          </div>
        </form>
      </div>
    </div>
    );
};

export default ProjectEdit;