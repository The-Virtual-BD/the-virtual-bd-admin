import React, { useContext, useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { APPContext } from '../../actions/reducers';
import Table from '../SharedPage/Table';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';

const Role = () => {
  const { addRole } = useContext(APPContext);
  return (
    <div>
       { addRole ? <AddRole /> : <ViewAllRole />}
    </div>
  );
};

export default Role;


const ViewAllRole = () => {
  const [token] = useToken();
  const navigate = useNavigate();
  const [role, setRole] = useState([]);
  const roles = [...role].reverse();

  //Get Roles
  useEffect(() => {
    const perUrl = `${baseURL}/api/admin/roles`;
    fetch(perUrl, {
      method: "GET",
      headers: {
        'content-type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setRole(data.roles))
  }, [token]);

  /* const handlePermitView = (id) => {
    console.log("clicked", id);
    navigate(`/admin-dashboard/project/${id}`);
  }; */

  const handleDeleteRole = id => {
    const procced = window.confirm("You Want To Delete?");

    if (procced) {
      const userUrl = `${baseURL}/api/admin/role/destroy/${id}`;
      fetch(userUrl, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          const remaining = role.filter(card => card.id !== id);
          setRole(remaining);
          toast.success(data.message)

        })
    };
  };


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
        accessor: "guard_name",
        sortType: 'basic',

      },


      {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => {
          const { id } = row.original;
          return (<div className='flex items-center justify-center  gap-2 '>
            <button >
              <div className='w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center'>
                <BsEyeFill className='text-lg  ' />
              </div>
            </button>

            <button onClick={() => handleDeleteRole(id)}>
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
    <div className='text-blue p-3'>

      {role.length && (
        <Table columns={PROJECT_COLUMNS()} data={roles} headline={"All Role"} />
      )}

    </div>
  )
};



const AddRole=()=>{
      const [token] = useToken();
      const [name, setName] = useState('');
       

      const[isChecked,setIsChecked]=useState(false);
      const [permit, setPermit] = useState([]);
      const [permissions, setPermissions] = useState([]);

      //Get Permissions
   useEffect(() => {
    const cUrl = `${baseURL}/api/admin/permissions`;
    fetch(cUrl, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data.permissions);
        setPermit(data.permissions);
      })
  }, [token]);


      //Handle Add Role
      const handleAddRole = async (e) => {
          e.preventDefault();

          const roleForm=new FormData();
          roleForm.append("name",name);


          const noUrl = `${baseURL}/api/admin/notices`;

          const response = await fetch(noUrl, {
              method: 'POST',
              headers: {
                  "Authorization": `Bearer ${token}`
              },
              body: roleForm
          });

          const result = await response.json();

          if (result.error) {
              console.log(result.error);
              toast.error("Notice Add Failed");
          } else {
              console.log(result);
              e.target.reset();
              toast.success(result.message);
          }
      };

      //handle Checkbox values
      const handleCheckboxChange = (event) => {
        const value = event.target.value;
        console.log(value)

        if (isChecked) {
          setPermissions([...permissions, value]);
        } else {
          setPermissions([...permissions]);
          // setPermissions(permissions.filter((v) => v !== value));
        }

        setIsChecked(!isChecked);

      };

      console.log(permissions)
      console.log(permit)

  return(
    <div className='text-primary p-3 m-3 bg-white rounded-md '>
        <h3 className='px-3 text-2xl font-bold text-center  lg:text-start my-2 text-primary'>Add Notice</h3>
        <form className='p-3' onSubmit={handleAddRole} >

            <div className="mb-3 flex flex-col items-start w-full">
                <label for="projectTitle" className="font-bold mb-1">Role Name</label>
                <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={e => setName(e.target.value)} placeholder="Role Name" />
            </div>

           {/* <div className="mb-3 flex flex-col items-start w-full">
              {permit.map((option) => (
                      <div key={option?.id}>
                        <label>
                          <input
                            type="checkbox"
                            value={option?.id}
                            checked={permissions.includes(option?.id)}
                            onChange={handleCheckboxChange}
                            className={`${isChecked?"text-blue border-blue":"text-labelclr border-labelclr"} rounded focus:ring-blue h-5 w-5`}
                          />
                          <span className='ml-2 font-semibold'>{option?.name}</span>
                        </label>
                      </div>
                ))}
           </div> */}



          <div >
            <h2 className="font-bold mb-1 text-start">Permissions</h2>
            <div class="flex justify-start ">
            <div>
              {
                permit.map((per) =>(
                  <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                <input
                  class="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-[rgba(0,0,0,0.25)] bg-white outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-blue checked:bg-blue checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:bg-white focus:after:content-[''] checked:focus:border-blue checked:focus:bg-blue checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                  type="checkbox"
                  value={per.id}
                  // checked={permissions.includes(per.id)}
                  onChange={handleCheckboxChange}
                  id="checkboxDefault" />

                <label
                  class="inline-block pl-2 hover:cursor-pointer"
                  for="checkboxDefault">
                  {per.name}
                </label>
              </div>
                ))
              }
              
            
            </div>
            </div>
          </div>

          
            <div className="flex  justify-center lg:justify-end items-center text-center mt-3">
                <button type="submit" className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg ">Add</button>
            </div>
        </form>
  </div>
  )
}



