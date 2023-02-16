import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from '../SharedPage/Table';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';

const Role = () => {
    return (
        <div>
           <ViewAllRole />
        </div>
    );
};

export default Role;


const ViewAllRole=()=>{
  const[token]=useToken();
  const navigate = useNavigate();
  const [role, setRole] = useState([]);
  const roles=[...role].reverse();
  
  //Get Roles
  useEffect(() => {
    const perUrl=`${baseURL}/api/admin/roles`;
    fetch(perUrl,{
      method:"GET",
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

  const handleDeleteRole=id=>{
    const procced=window.confirm("You Want To Delete?");

    if (procced) {
        const userUrl=`${baseURL}/api/admin/role/destroy/${id}`;
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
           
            <button onClick={()=>handleDeleteRole(id)}>
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

      {role.length && (
        <Table columns={PROJECT_COLUMNS()} data={roles} headline={"All Role"} />
      )}

    </div>
  )
};




