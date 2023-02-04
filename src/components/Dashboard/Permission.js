import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';
import { RiEditBoxFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { APPContext } from '../../actions/reducers';
import Table from '../SharedPage/Table';

const Permission = () => {
  const{isAddPermission, setIsAddPermission}=useContext(APPContext);
    return (
        <div>
           {
        isAddPermission ? <AddPermission /> :   <ViewAllPermissions />
         }
        </div>
    );
};

export default Permission;


const ViewAllPermissions=()=>{
    const navigate = useNavigate();
  const [permit, setPermit] = useState([]);

  useEffect(() => {
    fetch('/permit.json')
      .then(res => res.json())
      .then(data => setPermit(data))
  }, []);

  /* const handlePermitView = (id) => {
    console.log("clicked", id);
    navigate(`/admin-dashboard/project/${id}`);
  }; */


  const PROJECT_COLUMNS = () => {
    return [
      {
        Header: "SL",
        accessor: "id",
        sortType: 'basic',

      },
      {
        Header: "Name",
        accessor: "name",
        sortType: 'basic',

      },
      {
        Header: "Gurd Name",
        accessor: "guardName",
        sortType: 'basic',

      },
     

      {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => {
          const { _id } = row.original;
          return (<div className='flex items-center justify-center  gap-2 '>
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

      {permit.length && (
        <Table columns={PROJECT_COLUMNS()} data={permit} headline={"All Permissions"} />
      )}

    </div>
  )
};


const AddPermission=()=>{
    const[permissionName,setPermissionName]=useState('');
    const[guardName,setGuardName]=useState('');

    const handlePermissionForm=e=>{
        e.preventDefault();
    }
  
    return(
        <div className='text-labelclr p-3 m-3 bg-white rounded-md '>
        <div cclassName='bg-white w-full px-10   rounded-lg mt-2 py-6 shadow-md'>
          <h3 className='px-3 text-2xl font-bold text-center  lg:text-start my-2'>Add Permission</h3>
          <form className='p-3 ' onSubmit={handlePermissionForm} >
  
                
              <div class="mb-3 flex flex-col items-start w-full">
                <label for="projectTitle" class="font-bold mb-1">Permission Name</label>
                <input type="text" class="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setPermissionName(e.target.value)} placeholder="permission create" />
              </div>

              <div class="mb-3 flex flex-col items-start w-full">
                    <label for="projectTitle" class="font-bold mb-1 ">Guard Name</label>
                    <select onChange={(e) => setGuardName(e.target.value)} class="form-select appearance-none  w-full px-3  py-2  bg-bgclr bg-clip-padding bg-no-repeat   rounded transition ease-in-out  m-0 outline-none" aria-label="Clientselect"  >
                      <option selected disabled>Select Guard Name</option>
                      <option value="1">Web</option>
                      <option value="2">App</option>
                      <option value="3">Three</option>
                    </select>
                </div>
  
              <div className='flex items-end justify-end'>
                <button type="submit" className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg mt-3 ">Submit</button>
              </div>

          </form>
        </div>
  
  
      </div>
    )
  }