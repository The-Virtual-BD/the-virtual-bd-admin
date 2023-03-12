import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseURL } from '../utilities/url';
import useToken from '../utilities/useToken';

const RoleDetails = () => {
    const [rolE, setRole] = useState([]);
    const { id } = useParams();
    const [token] = useToken();
    const [permit, setPermit] = useState([]);
  

  const [namE, setName] = useState(rolE?.role?.name);

  const [role_permissions, setRole_Permissions] = useState({
    permissions: []
  });
  
 
    
    //Handle Get Roles
    useEffect(() => {
        const sUrl = `${baseURL}/api/admin/role/${id}`;
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
                setRole(data)
            })
    }, [token, id]);

    //Get Permit for all Permissions
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
            setPermit(data.permissions);
        })
    }, [token]);


  //Handle Update Role
    const handleUpdateRole=e=>{

        e.preventDefault();

       /*  const roleForm = new FormData();
        roleForm.append("name", name);
        roleForm.append("permissions", role_permissions.permissions);
    
        const noUrl = `${baseURL}/api/admin/role/update/${id}`;
    
        const response = await fetch(noUrl, {
          method: 'PUT',
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: roleForm
        });
    
        const result = await response.json();
    
        if (result.error) {
          console.log(result.error);
          toast.error("Role Update Failed");
        } else {
          console.log(result);
          e.target.reset();
          toast.success(result.message);
        }
 */
    };

    //Handle Checkbox
    const handleChange = (e) => {
        const { value, checked } = e.target;
        const { permissions } = role_permissions;
        
        if (checked) {
        setRole_Permissions({
            permissions: [...permissions, value],
        });
        }
    
        else {
        setRole_Permissions({
            permissions: permissions.filter((e) => e !== value),
            response: permissions.filter((e) => e !== value),
        });
        }
    };


    // console.log(role.role.name)


    return (
        <div className='text-primary p-3 m-3 bg-white rounded-md '>
        <h3 className='px-3 text-2xl font-bold text-center  lg:text-start my-2 text-primary'>View Role</h3>
        <form className='p-3' onSubmit={handleUpdateRole} >
  
          <div className="mb-3 flex flex-col items-start w-full">
            <label for="projectTitle" className="font-bold mb-1">Role Name</label>
            <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={e => setName(e.target.value)} placeholder="Role Name" value={namE} />
          </div>
  
  
  
          <div>
            <h1 className='font-bold text-start mb-2'>Add Permissions</h1>
              <div className="mb-3 flex flex-col items-start w-full">
                
                {permit.map((option) => (
                        <div key={option?.id}>
                          <label>
                            <input
                              type="checkbox"
                              value={option?.id}
                              name="languages"
                              id="flexCheckDefault"
                              onChange={handleChange}
                            />
                            <span className='ml-2 font-semibold'>{option?.name}</span>
                          </label>
                        </div>
                  ))}
            </div>
          </div>
  
          <div className="flex  justify-center lg:justify-end items-center text-center mt-3">
            <button type="submit" className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg ">Update</button>
          </div>
        </form>
      </div>
    );
};

export default RoleDetails;