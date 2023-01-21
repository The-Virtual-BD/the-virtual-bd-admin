import React, { useEffect, useState } from 'react';
import './Dashboard.css';

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { BsEyeFill } from 'react-icons/bs';
import { RiEditBoxFill } from 'react-icons/ri';
import { AiFillDelete } from 'react-icons/ai';
import Table from '../SharedPage/Table';
import { useNavigate } from 'react-router-dom';
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);



const Portfolio = () => {
  return (
    <div className=''>
      {/* <AddProject /> */}
      <ViewProjects />
    </div>
  );
};

export default Portfolio;

const AddProject = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectBudget, setProjectBudget] = useState(0);
  const [projectSub, setProjectSub] = useState('');
  const [projectPaid, setProjectPaid] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientSelect, setClientSelect] = useState('');

  const todayDate = new Date().toLocaleDateString();
  const [projectStartDate, setProjectStartDate] = useState(todayDate);
  const [projectEndDate, setProjectEndDate] = useState(todayDate);
  const [portfolio, setPortfolio] = useState("");
  const [projectStatus, setProjectStatus] = useState("");

  const [projectDesc, setProjectDesc] = useState('');
  const [projectShortDesc, setProjectShortDesc] = useState('');

  const [projectImg, setProjectImg] = useState(null);
  const [projectDoc, setProjectDoc] = useState(null);



  const handleProjectForm = e => {
    e.preventDefault();
    console.log(projectTitle, projectBudget, projectPaid, projectSub, clientName, clientSelect, portfolio, projectStatus, projectDesc, projectShortDesc, projectStartDate, projectEndDate, projectImg, projectDoc);

    e.target.reset();

  };



  return (
    <div className='text-labelclr p-3 m-2 lg:m-10 bg-white rounded-md '>
      <div cclassName='bg-white w-full px-10   rounded-lg mt-2 py-6 shadow-md'>
        <h3 className='px-3 text-2xl font-bold text-start my-2'>Add Project</h3>
        <form className='p-3 ' onSubmit={handleProjectForm} >

          <div className='flex flex-col lg:flex-row items-center gap-5'>
            <div class="mb-3 flex flex-col items-start w-full">
              <label for="projectTitle" class="font-bold mb-1">Project Title</label>
              <input type="text" class="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setProjectTitle(e.target.value)} placeholder="Project Title" />
            </div>

            <div class="mb-3 flex flex-col items-start w-full">
              <label for="projectTitle" class="font-bold mb-1">Project Budget</label>
              <input type="number" class="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setProjectBudget(e.target.value)} placeholder="$100" />
            </div>
          </div>


          <div className='flex flex-col lg:flex-row items-center gap-5'>

            <div class="mb-3 flex flex-col items-start w-full">
              <label for="projectsub" class="font-bold mb-1">Select Subject</label>
              <div class="flex justify-center w-full">
                <div class=" w-full">
                  <select onChange={(e) => setProjectSub(e.target.value)} class="form-select appearance-none  w-full px-3  py-2  bg-bgclr bg-clip-padding bg-no-repeat rounded transition ease-in-out  m-0 outline-none" aria-label="projectsub"  >
                    <option selected>Select Subject</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="mb-3 flex flex-col items-start w-full">
              <label for="projectTitle" class="font-bold mb-1">Paid</label>
              <input type="number" class="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setProjectPaid(e.target.value)} placeholder="$50" />
            </div>
          </div>


          <div className='flex items-start justify-between gap-5'>

            <div className='w-full lg:w-1/2'>

              <div class="mb-3 flex flex-col items-start w-full">
                <label for="Client-Name" class="font-bold mb-1">Client Name</label>
                <input type="text" class="w-full bg-bgclr rounded py-2 px-3 outline-none" id="Client-Name" onChange={(e) => setClientName(e.target.value)} placeholder="Client Name" />
              </div>

              <div class="mb-3 flex flex-col items-start w-full">
                <label for="Clientselect" class="font-bold mb-1">Client Select</label>
                <div class="flex justify-center w-full">
                  <div class=" w-full">
                    <select onChange={(e) => setClientSelect(e.target.value)} class="form-select appearance-none  w-full px-3  py-2  bg-bgclr bg-clip-padding bg-no-repeat   rounded transition ease-in-out  m-0 outline-none" aria-label="Clientselect"  >
                      <option selected>Client Select</option>
                      <option value="1">Man</option>
                      <option value="2">too</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="mb-3 flex flex-col items-start w-full">
                <label for="Starting-Date" class="font-bold mb-1">Starting Date</label>
                <input type="date" class="w-full bg-bgclr rounded py-2 px-3 outline-none" id="Starting-Date" onChange={(e) => setProjectStartDate(e.target.value)} />
              </div>

              <div class="mb-3 flex flex-col items-start w-full">
                <label for="Ending-Date" class="font-bold mb-1">Ending Date</label>
                <input type="date" class="w-full bg-bgclr rounded py-2 px-3 outline-none" id="Ending-Date" onChange={(e) => setProjectEndDate(e.target.value)} />
              </div>

              <div class="mb-3 flex flex-col items-start w-full">
                <label for="Clientselect" class="font-bold mb-1">Portfolio</label>
                <div class="flex justify-center w-full">
                  <div class=" w-full">
                    <select onChange={(e) => setPortfolio(e.target.value)} class="form-select appearance-none  w-full px-3  py-2  bg-bgclr bg-clip-padding bg-no-repeat   rounded transition ease-in-out  m-0 outline-none" aria-label="Clientselect"  >
                      <option selected>Portfolio</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="mb-3 flex flex-col items-start w-full">
                <label for="Status" class="font-bold mb-1">Project Status</label>
                <input type="text" class="w-full bg-bgclr rounded py-2 px-3 outline-none" id="Status" onChange={(e) => setProjectStatus(e.target.value)} placeholder="50%" />
              </div>

            </div>


            <div className='w-full lg:w-1/2'>

              <div class="mb-3 flex flex-col items-start w-full">
                <label for="projectShortDesc" class="font-bold mb-1">Short Description</label>
                <textarea class="w-full bg-bgclr rounded py-1 px-3 outline-none" id='projectShortDesc' rows="4" onChange={(e) => setProjectShortDesc(e.target.value)} placeholder="Short Description"></textarea>
              </div>

              <div class="mb-3 flex flex-col items-start w-full">
                <label for="projectDesc" class="font-bold mb-1">Description</label>
                <textarea class="w-full bg-bgclr rounded py-1 px-3 outline-none" id='projectDesc' rows="5" onChange={(e) => setProjectDesc(e.target.value)} placeholder="Description"></textarea>
              </div>

              <div class="mb-3 flex flex-col items-start w-full">
                <label for="Status" class="font-bold mb-1">Upload Images</label>
                <input type="file" class="w-full bg-bgclr rounded py-2 px-3 outline-none" id="Status" onChange={(e) => setProjectImg(e.target.value)} placeholder="50%" />
              </div>

              <div class="mb-3 flex flex-col items-start w-full">
                <label for="Status" class="font-bold mb-1">Upload Documents</label>
                <input type="file" class="w-full bg-bgclr rounded py-2 px-3 outline-none" id="Status" onChange={(e) => setProjectDoc(e.target.value)} placeholder="50%" />
              </div>

            </div>
          </div>



          <div class="flex flex-col lg:flex-row gap-3 justify-end items-center text-center mt-3">
            <button type="submit" className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg ">Submit</button>

            <button type="reset" className="px-10 font-bold py-2 bg-white border border-blue hover:bg-blue hover:border-blue hover:text-white text-blue rounded-lg ">Reset</button>
          </div>
        </form>
      </div>


    </div>
  )
};


const ViewProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch('/projects.json')
      .then(res => res.json())
      .then(data => setProjects(data))
  }, []);

  const handleProjectView = (id) => {
    console.log("clicked", id);
    navigate(`/admin-dashboard/project/${id}`);
  };


  const PROJECT_COLUMNS = () => {
    return [
      {
        Header: "SL",
        accessor: "_id",
        sortType: 'basic',

      },
      {
        Header: "Project Title",
        accessor: "projectName",
        sortType: 'basic',

      },
      {
        Header: "Client Name",
        accessor: "name",
        sortType: 'basic',

      },
      {
        Header: "Start Date",
        accessor: "startDate",
        sortType: 'basic',

      },
      {
        Header: "End Date",
        accessor: "endDate",
        sortType: 'basic',

      },

      {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => {
          const { _id } = row.original;
          return (<div className='flex items-center justify-center  gap-2 '>
            <button onClick={() => handleProjectView(_id)}>
              <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                <BsEyeFill className='text-lg  ' />
              </div>
            </button>
            <button>
              <div className='w-8 h-8 rounded-md bg-[#0068A3] text-white grid items-center justify-center'>
                <RiEditBoxFill className='text-lg  text-white' />
              </div>
            </button>

            <button>
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
}