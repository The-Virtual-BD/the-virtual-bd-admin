import React, { useContext, useEffect, useState } from 'react';
import './Dashboard.css';
import { BsEyeFill } from 'react-icons/bs';
import { RiEditBoxFill } from 'react-icons/ri';
import { AiFillDelete } from 'react-icons/ai';
import Table from '../SharedPage/Table';
import { useNavigate } from 'react-router-dom';
import { APPContext } from '../../actions/reducers';
import { toast } from 'react-toastify';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';

/* import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"; */
// Register the plugins
// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);



const Portfolio = () => {
  const { isproject } = useContext(APPContext);

  return (
    <div className=''>
      {
        isproject ? <AddProject /> : <ViewProjects />
      }
    </div>
  );
};
export default Portfolio;




const AddProject = () => {
  const [token] = useToken();

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

  const [allServices, setAllServices] = useState([]);
  const [allUsers, setAllUsers] = useState([]);


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
    const perUrl = `${baseURL}/api/admin/users`;
    fetch(perUrl, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setAllUsers(data.user))
  }, [token]);

  // console.log(allUsers)


  //Handle add project
  const handleProjectForm = async (e) => {
    e.preventDefault();

    /*  const newProject = { name, value, value_paid, service_id, client_name, user_id, portfolio, progress, description, short_description, starting_date, ending_date, cover, documents };
     console.log(newProject ); */


    const projectData = new FormData();
    projectData.append("name", name);
    projectData.append("value", value);
    projectData.append("value_paid", value_paid);
    projectData.append("service_id", service_id);
    projectData.append("client_name", client_name);
    projectData.append("user_id", user_id);
    projectData.append("portfolio", portfolio);
    projectData.append("progress", progress);
    projectData.append("description", description);
    projectData.append("short_description", short_description);
    projectData.append("starting_date", starting_date);
    projectData.append("ending_date", ending_date);
    projectData.append("cover", cover, cover.name);
    projectData.append("documents", documents, documents.name);


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
      toast.error("Project Added Failed");
    } else {
      console.log(result);
      e.target.reset();
      toast.success(result.message);
    }



  };



  return (
    <div className='text-labelclr p-3 m-3 bg-white rounded-md '>
      <div >
        <h3 className='px-3 text-2xl font-bold text-center  lg:text-start my-2'>Add Project</h3>
        <form className='p-3 ' onSubmit={handleProjectForm} >

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
                <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="Status" onChange={(e) => setProjectStatus(e.target.value)} placeholder="Status" />
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
  )
};






const ViewProjects = () => {
  const [token] = useToken();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

 
  //Get projects
  useEffect(() => {
    const sUrl = `${baseURL}/api/admin/projects`;
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
        setProjects(data.data)
      })
  }, [token]);



  //Handle Project View 
  const handleProjectView = (id) => {
    console.log("clicked", id);
    navigate(`/admin-dashboard/project/${id}`);
  };

  //Handle Delete Service*
  const handleDeleteProject = id => {
    const procced = window.confirm("You Want To Delete?");

    if (procced) {
      const userUrl = `${baseURL}/api/admin/projects/destroy/${id}`;
      fetch(userUrl, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          const remaining = projects.filter(card => card.id !== id);
          setProjects(remaining);
          toast.success(data.message)

        })

    };
  };

    //handle Project Edit
    const handleProjectEdit=id=>{
      navigate(`/admin-dashboard/project/update/${id}`);
    }


  const PROJECT_COLUMNS = () => {
    return [
      {
        Header: "SL",
        accessor: "id",
        sortType: 'basic',

      },
      {
        Header: "Project Title",
        accessor: "name",
        sortType: 'basic',

      },
      {
        Header: "Client Name",
        accessor: "client_name",
        sortType: 'basic',

      },
      {
        Header: "Start Date",
        accessor: "starting_date",
        sortType: 'basic',

      },
      {
        Header: "End Date",
        accessor: "ending_date",
        sortType: 'basic',

      },

      {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => {
          const { id } = row.original;
          return (<div className='flex items-center justify-center  gap-2 '>
            <button onClick={() => handleProjectView(id)}>
              <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                <BsEyeFill className='text-lg  ' />
              </div>
            </button>

            <button onClick={()=>handleProjectEdit(id)}>
              <div className='w-8 h-8 rounded-md bg-[#0068A3] text-white grid items-center justify-center'>
                <RiEditBoxFill className='text-lg  text-white' />
              </div>
            </button>

            <button onClick={() => handleDeleteProject(id)}>
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
    <div className='text-primary p-3'>

      {projects.length && (
        <Table columns={PROJECT_COLUMNS()} data={projects} headline={"All Projects List"} />
      )}

    </div>
  )
};


