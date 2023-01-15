import React, { useEffect, useState } from 'react';
import Button from '../utilities/Button';
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
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);



const Portfolio = () => {
    return (
        <div className='bg-white'>
        <AddProject />
        {/* <ViewProjects /> */}
        </div>
    );
};

export default Portfolio;

const AddProject = () => {
    const [projectTitle, setProjectTitle] = useState('');
    const [clientName, setClientName] = useState('');
    const [projectDesc, setProjectDesc] = useState('');
    const [projectShortDesc, setProjectShortDesc] = useState('');
    const todayDate= new Date().toLocaleDateString();
    const [projectDate, setProjectDate] = useState(todayDate);
    const [projectImg, setProjectImg] = useState('');

  const handleProjectForm = e => {
    e.preventDefault();
    console.log(projectTitle, clientName, projectDesc, projectShortDesc, projectDate, projectImg);

  };



    return (
        <div >
              <div className="bg-bgclr text-primary w-4/6 mx-auto p-3 mt-5 rounded-lg ">
              <h3 className='px-3 text-2xl font-bold'>Add Projects</h3>
              <form className='p-3 ' onSubmit={handleProjectForm} >

                    <div class="mb-3 flex flex-col items-start w-full">
                      <label for="projectTitle" class="font-bold">Title</label>
                      <input type="text" class="w-full bg-white rounded py-1 px-3" id="projectTitle" onChange={(e) => setProjectTitle(e.target.value)} />
                    </div>

                    <div class="mb-3 flex flex-col items-start w-full">
                      <label for="clientName" class="font-bold ">Client Name</label>
                      <input type="text" class="w-full bg-white rounded py-1 px-3" id="clientName" onChange={(e) => setClientName(e.target.value)} />
                    </div>
            
                    <div class="mb-3 flex flex-col items-start w-full">
                      <label for="projectDate" class="font-bold ">Date</label>
                          <input type="date" class="w-full bg-white rounded py-1 px-3" id="projectDate" onChange={(e) => setProjectDate(e.target.value)} value={projectDate} />
                    </div>
            
                    <div class="mb-3 flex flex-col items-start w-full">
                      <label for="projectShortDesc" class="font-bold ">Short Description</label>
                      <textarea class="w-full bg-white rounded py-1 px-3" id='projectShortDesc' rows="3" onChange={(e) => setProjectShortDesc(e.target.value)}></textarea>
                    </div>

                    <div class="mb-3 flex flex-col items-start w-full">
                      <label for="projectDesc" class="font-bold ">Description</label>
                      <textarea class="w-full bg-white rounded py-1 px-3" id='projectDesc' rows="5" onChange={(e) => setProjectDesc(e.target.value)}></textarea>
                    </div>
                          
                    
                  <div class="mb-3">
                    <FilePond
                        allowMultiple={true}
                        files={projectImg}
                        maxFiles={5}
                        allowReorder={true}
                        server="" 
                        className={"img-input-field w-full bg-white"}
                      />
                  </div>
     

                    <div class=" text-center mt-3">
                      <Button type="submit">Submit</Button>
                    </div>
              </form>
        </div>


        </div>
    )
};


const ViewProjects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
      fetch('/projects.json')
          .then(res => res.json())
          .then(data => setProjects(data))
  }, []);

  return (
      <div className='text-primary p-3'>
         

          <div className='bg-bgclr w-full px-10  rounded-lg mt-2 py-6'>
              <div className="flex items-center justify-between pb-3">
                  <h2 className='text-2xl text-start font-semibold'>All project List</h2>
                 <Button>Search</Button>
              </div>
              <table className=' w-full '>
                  <thead className='bg-white rounded-lg'>
                      <th>SL</th>
                      <th>Client Name</th>
                      <th>Project Name</th>
                      <th>Action</th>
                  </thead>
                  <tbody >
                      {projects.map((project,index) => <tr key={project._id} className="even:bg-white odd:bg-bgclr rounded-md">
                          <td>{index + 1}</td>
                          <td>{project.name}</td>
                          <td>{project.projectName}</td>
                          <td>
                              <div className='flex items-center justify-center gap-2 '>
                                  <button>
                                      <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                                       <BsEyeFill className='text-lg  text-white'/>
                                      </div>
                                  </button>
                              
                                  
                                  <button>
                                      <div className='w-8 h-8 rounded-md bg-[#0068A3] text-white grid items-center justify-center'>
                                          <RiEditBoxFill className='text-lg  text-white'/>
                                      </div>
                                  </button>
                                  
                                  <button>
                                      <div className='w-8 h-8 rounded-md bg-[#FF0000] text-white grid items-center justify-center'>
                                          <AiFillDelete className='text-lg  text-white'/>
                                      </div>
                                  </button>
                              
                              </div>
                          </td> 
                      </tr>)}
                  </tbody>
              </table>

          </div>

      </div>
  )
}