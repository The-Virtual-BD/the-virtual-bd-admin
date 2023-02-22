import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';

const ProjectEdit = () => {

    const[token]=useToken();

    const [value, setProjectBudget] = useState(0);
    const [value_paid, setProjectPaid] = useState('');
    const [client_name, setClientName] = useState('');
  
    // const todayDate = new Date().toLocaleDateString();
    const [starting_date, setProjectStartDate] = useState("");
    const [ending_date, setProjectEndDate] = useState("");
    const [description, setProjectDesc] = useState('');
    const [short_description, setProjectShortDesc] = useState('');
    const [cover, setProjectImg] = useState(null);
    const [documents, setProjectDoc] = useState(null);
  
    const [name, setProjectTitle] = useState('');
    const [service_id, setProjectSub] = useState('');
    const [user_id, setClientSelect] = useState('');
    const [portfolio, setPortfolio] = useState("");
    const [progress, setProjectStatus] = useState("");
  
    const [allServices,setAllServices]=useState([]);
    const [allUsers,setAllUsers]=useState([]);
  
  
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
  
  
    //Get Users
    useEffect(() => {
      const perUrl=`${baseURL}/api/admin/users`;
      fetch(perUrl,{
        method:"GET",
        headers: {
            'content-type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => setAllUsers(data.user))
    }, [token]);



     //Handle add project
     const handleUpdateProjectForm = async(e) => {
        e.preventDefault();
    
       /*  const newProject = { name, value, value_paid, service_id, client_name, user_id, portfolio, progress, description, short_description, starting_date, ending_date, cover, documents };
        console.log(newProject ); */
    
    
        const projectData=new FormData();
        projectData.append("name",name);
        projectData.append("value",value);
        projectData.append("value_paid",value_paid);
        projectData.append("service_id",service_id);
        projectData.append("client_name",client_name);
        projectData.append("user_id",user_id);
        projectData.append("portfolio",portfolio);
        projectData.append("progress",progress);
        projectData.append("description",description);
        projectData.append("short_description",short_description);
        projectData.append("starting_date",starting_date);
        projectData.append("ending_date",ending_date);
        projectData.append("cover",cover,cover.name);
        projectData.append("documents",documents,documents.name);
    
    
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
        <form className='p-3 ' onSubmit={handleUpdateProjectForm} >

          <div className='flex flex-col lg:flex-row items-center gap-5'>
            <div className="mb-3 flex flex-col items-start w-full">
              <label for="projectTitle" className="font-bold mb-1">Project Title</label>
              <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setProjectTitle(e.target.value)} placeholder="Project Title" />
            </div>

            <div className="mb-3 flex flex-col items-start w-full">
              <label for="projectTitle" className="font-bold mb-1">Project Budget</label>
              <input type="number" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setProjectBudget(e.target.value)} placeholder="$100" />
            </div>
          </div>


          <div className='flex flex-col lg:flex-row items-center gap-5'>

            <div className="mb-3 flex flex-col items-start w-full">
              <label for="projectsub" className="font-bold mb-1">Select Service</label>
              <div className="flex justify-center w-full">
                <div className=" w-full">
                  <select onChange={(e) => setProjectSub(e.target.value)} className="form-select appearance-none  w-full px-3  py-2  bg-bgclr bg-clip-padding bg-no-repeat rounded transition ease-in-out  m-0 outline-none" aria-label="projectsub"  >
                    <option selected disabled>Select Service</option>
                    {
                       allServices?.data?.map(service => <option value={service.id}>{service.name}</option>)
                           }
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-3 flex flex-col items-start w-full">
              <label for="projectTitle" className="font-bold mb-1">Paid</label>
              <input type="number" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setProjectPaid(e.target.value)} placeholder="$50" />
            </div>
          </div>


          <div className='flex flex-col lg:flex-row items-start justify-between gap-5'>

            <div className='w-full lg:w-1/2'>

              <div className="mb-3 flex flex-col items-start w-full">
                <label for="Client-Name" className="font-bold mb-1">Client Name</label>
                <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="Client-Name" onChange={(e) => setClientName(e.target.value)} placeholder="Client Name" />
              </div>

              <div className="mb-3 flex flex-col items-start w-full">
                <label for="Clientselect" className="font-bold mb-1">Client Select</label>
                <div className="flex justify-center w-full">
                  <div className=" w-full">
                    <select onChange={(e) => setClientSelect(e.target.value)} className="form-select appearance-none  w-full px-3  py-2  bg-bgclr bg-clip-padding bg-no-repeat   rounded transition ease-in-out  m-0 outline-none" aria-label="Clientselect"  >
                      <option selected disabled>Client Select</option>
                      {
                       allUsers?.map(service => <option value={service.id}>{service.first_name}</option>)
                           }
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-3 flex flex-col items-start w-full">
                <label for="Starting-Date" className="font-bold mb-1">Starting Date</label>
                <input type="date" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="Starting-Date" onChange={(e) => setProjectStartDate(e.target.value)} />
              </div>

              <div className="mb-3 flex flex-col items-start w-full">
                <label for="Ending-Date" className="font-bold mb-1">Ending Date</label>
                <input type="date" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="Ending-Date" onChange={(e) => setProjectEndDate(e.target.value)} />
              </div>

              <div className="mb-3 flex flex-col items-start w-full">
                <label for="Clientselect" className="font-bold mb-1">Portfolio</label>
                <div className="flex justify-center w-full">
                  <div className=" w-full">
                    <select onChange={(e) => setPortfolio(e.target.value)} className="form-select appearance-none  w-full px-3  py-2  bg-bgclr bg-clip-padding bg-no-repeat   rounded transition ease-in-out  m-0 outline-none" aria-label="Clientselect"  >
                      <option selected>Portfolio</option>
                      <option value="2">Yes</option>
                      <option value="1">No</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-3 flex flex-col items-start w-full">
                <label for="Status" className="font-bold mb-1">Project Status</label>
                <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="Status" onChange={(e) => setProjectStatus(e.target.value)} placeholder="50%" />
              </div>

            </div>


            <div className='w-full lg:w-1/2'>

              <div className="mb-3 flex flex-col items-start w-full">
                <label for="projectShortDesc" className="font-bold mb-1">Short Description</label>
                <textarea className="w-full bg-bgclr rounded py-1 px-3 outline-none" id='projectShortDesc' rows="4" onChange={(e) => setProjectShortDesc(e.target.value)} placeholder="Short Description"></textarea>
              </div>

              <div className="mb-3 flex flex-col items-start w-full">
                <label for="projectDesc" className="font-bold mb-1">Description</label>
                <textarea className="w-full bg-bgclr rounded py-1 px-3 outline-none" id='projectDesc' rows="5" onChange={(e) => setProjectDesc(e.target.value)} placeholder="Description"></textarea>
              </div>

              <div className="mb-3 flex flex-col items-start w-full">
                    <label for="img" className="font-bold mb-1">Upload Images</label>
                    <input className="form-control  block w-full px-3  rounded py-2 text-base  font-normal bg-clip-padding bg-bgclr
                  outline-none focus:outline-none" type="file" id="img" onChange={(e) => setProjectImg(e.target.files[0])} placeholder="50%" />
              </div>


              <div className="mb-3 flex flex-col items-start w-full">
                    <label for="img" className="font-bold mb-1">Upload Documents</label>
                    <input className="form-control  block w-full px-3  rounded py-2 text-base  font-normal bg-clip-padding bg-bgclr
                  outline-none focus:outline-none active:outline-none" type="file" id="img" onChange={(e) => setProjectDoc(e.target.files[0])} placeholder="50%" />
              </div>

            </div>
          </div>



          <div className="flex flex-row gap-3 justify-center lg:justify-end items-center text-center mt-3">
            <button type="reset" className="px-10 font-bold py-2 bg-white border border-blue hover:bg-blue hover:border-blue hover:text-white text-blue rounded-lg ">Reset</button>

            <button type="submit" className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg ">Submit</button>

           
          </div>
        </form>
      </div>
    </div>
    );
};

export default ProjectEdit;