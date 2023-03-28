import React, { useContext, useEffect, useState } from 'react';
import '../Dashboard.css';
import { BsEyeFill } from 'react-icons/bs';
import { RiEditBoxFill } from 'react-icons/ri';
import { AiFillDelete } from 'react-icons/ai';
import Table from '../../SharedPage/Table';
import { useNavigate } from 'react-router-dom';
import { APPContext } from '../../../actions/reducers';
import { toast } from 'react-toastify';
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';
import Loading from '../../utilities/Loading';
import Sending from '../../utilities/Sending';





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

  const [name, setProjectTitle] = useState('');
  const [client_name, setClientName] = useState('');
  const [service_id, setProjectSub] = useState('');
  const [description, setProjectDesc] = useState('');
  const [short_description, setProjectShortDesc] = useState('');
  const [cover, setProjectImg] = useState(null);

  const [video, setVideo] = useState("");
  const [client_type, setClient_type] = useState('');
  const [client_origin, setClient_origin] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [isSending,setIsSending]=useState(false);



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
    setIsSending(true);

    const projectData = new FormData();
    projectData.append("name", name);
    projectData.append("client_name", client_name);
    projectData.append("client_type", client_type);
    projectData.append("client_origin", client_origin);
    projectData.append("video", video);

    projectData.append("service_id", service_id);
    projectData.append("description", description);
    projectData.append("short_description", short_description);
    projectData.append("cover", cover, cover?.name);
    projectData.append("image_1", image1);
    projectData.append("image_2", image2);
    projectData.append("image_3", image3);


    const url = `${baseURL}/api/admin/projects/store`;
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
    setIsSending(false);

  };

  if(isSending){
    return <Sending />
};



  return (
    <div className='text-labelclr p-3 m-3 bg-white rounded-md '>
      <div >
        <h3 className='px-3 text-2xl font-bold text-center  lg:text-start my-2'>Add Project</h3>
        <form className='p-3 ' onSubmit={handleProjectForm} >

           <div className='flex flex-col lg:flex-row items-center gap-5'>
              <div className="mb-3 flex flex-col items-start w-full">
                  <label for="projectTitle" className="font-bold mb-1">Project Title *</label>
                  <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setProjectTitle(e.target.value)} placeholder="Project Title" required />
                </div>

                <div className="mb-3 flex flex-col items-start w-full">
                  <label for="Client-Name" className="font-bold mb-1">Client Name *</label>
                  <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="Client-Name" onChange={(e) => setClientName(e.target.value)} placeholder="Client Name" required/>
                </div>
           </div>

          <div className='flex flex-col lg:flex-row items-center gap-5'>
            <div className="mb-3 flex flex-col items-start w-full">
              <label for="projectsub" className="font-bold mb-1">Select Service *</label>
              <div className="flex justify-center w-full">
                <div className=" w-full">
                  <select onChange={(e) => setProjectSub(e.target.value)} className="form-select appearance-none  w-full px-3  py-2  bg-bgclr bg-clip-padding bg-no-repeat rounded transition ease-in-out  m-0 outline-none" aria-label="projectsub"  required>
                    <option selected disabled>Select Service</option>
                    {
                      allServices?.data?.map(service => <option value={service.id}>{service.name}</option>)
                    }
                  </select>
                </div>
              </div>
            </div>

             <div className="mb-3 flex flex-col items-start w-full">
                <label for="Client-Name" className="font-bold mb-1">Client Type *</label>
                <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="Client-Name" onChange={(e) => setClient_type(e.target.value)} placeholder="Client Type" required />
              </div>
          </div>

          <div className='flex flex-col lg:flex-row items-center gap-5'>
                <div className="mb-3 flex flex-col items-start w-full">
                    <label for="img" className="font-bold mb-1">Upload Cover *</label>
                    <input className="form-control  block w-full px-3  rounded py-2 text-base  font-normal bg-clip-padding bg-bgclr
                      outline-none focus:outline-none" type="file" id="img" onChange={(e) => setProjectImg(e.target.files[0])} placeholder="50%" required/>
                </div>

                <div className="mb-3 flex flex-col items-start w-full">
                  <label for="Client-Name" className="font-bold mb-1">Client Origin *</label>
                  <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="Client-Name" onChange={(e) => setClient_origin(e.target.value)} placeholder="Client Origin" required/>
                </div>
           </div>

           <div className='flex flex-col lg:flex-row items-center gap-5'>
               

                <div className="mb-3 flex flex-col items-start w-full">
                  <label for="Client-Name" className="font-bold mb-1">Add Video</label>
                  <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="Client-Name" onChange={(e) => setVideo(e.target.value)} placeholder="Video Link" />
                </div>

                <div className="mb-3 flex flex-col items-start w-full">
                  <label for="img" className="font-bold mb-1">Add Image 1</label>
                  <input className="form-control  block w-full px-3  rounded py-2 text-base  font-normal bg-clip-padding bg-bgclr
                    outline-none focus:outline-none" type="file" id="img" onChange={(e) => setImage1(e.target.files[0])} placeholder="50%" />
                </div>
           </div>

           <div className='flex flex-col lg:flex-row items-start justify-between gap-5'>
                <div className="mb-3 flex flex-col items-start w-full">
                  <label for="img" className="font-bold mb-1">Add Image 2</label>
                  <input className="form-control  block w-full px-3  rounded py-2 text-base  font-normal bg-clip-padding bg-bgclr
                    outline-none focus:outline-none" type="file" id="img" onChange={(e) => setImage2(e.target.files[0])} placeholder="50%" />
                </div>

                <div className="mb-3 flex flex-col items-start w-full">
                  <label for="img" className="font-bold mb-1">Add Image 3</label>
                  <input className="form-control  block w-full px-3  rounded py-2 text-base  font-normal bg-clip-padding bg-bgclr
                    outline-none focus:outline-none" type="file" id="img" onChange={(e) => setImage3(e.target.files[0])} placeholder="50%" />
                </div>
           </div>

            <div className="mb-3 flex flex-col items-start w-full">
                  <label for="projectShortDesc" className="font-bold mb-1">Short Description *</label>
                  <textarea className="w-full bg-bgclr rounded py-1 px-3 outline-none" id='projectShortDesc' rows="4" onChange={(e) => setProjectShortDesc(e.target.value)} placeholder="Short Description" required></textarea>
              </div>

              <div className="mb-3 flex flex-col items-start w-full">
                  <label for="projectDesc" className="font-bold mb-1">Description * </label>
                  <textarea className="w-full bg-bgclr rounded py-1 px-3 outline-none" id='projectDesc' rows="5" onChange={(e) => setProjectDesc(e.target.value)} placeholder="Description" required></textarea>
              </div>


          

          <div className="flex flex-row gap-3 justify-center lg:justify-end items-center text-center mt-3">
            <button type="reset" className="px-10 font-bold py-2 bg-white border border-blue hover:bg-blue hover:border-blue hover:text-white text-blue rounded-lg ">Reset</button>

            <button type="submit" className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg " disabled={isSending}>Submit</button>
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

  const allProjects=[...projects].reverse();
  const [isLoading,setIsLoading]=useState(false);

 
  //Get projects
  useEffect(() => {
    const sUrl = `${baseURL}/api/admin/projects`;
    setIsLoading(true);

    fetch(sUrl, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setIsLoading(false);
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
        id: 'index',
        accessor: (_row, i) => i + 1 
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
        Header: "Service",
        accessor: "service.name",
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

  if(isLoading){
    return(<Loading />)
};

console.log(projects)

  return (
    <div className='text-primary p-3'>

      {projects.length && (
        <Table columns={PROJECT_COLUMNS()} data={allProjects} headline={"Projects and Communications"} />
      )}

    </div>
  )
};


