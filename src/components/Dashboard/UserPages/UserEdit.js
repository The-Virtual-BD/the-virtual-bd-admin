import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseURL } from '../../utilities/url';
import useToken from '../../utilities/useToken';

const UserEdit = () => {
    const{id}=useParams();
    const [token] = useToken();
    const [user, setUser] = useState({});
   
    const[first_namE,setFirst_name]=useState("");
    const[last_namE,setLast_name]=useState("");
    const[blogger_namE,setblogger_name]=useState("");
    const[emaiL,setEmail]=useState("");
    const[date_of_birtH,setDate_of_birth]=useState("");
    const[professioN,setProfession]=useState("");
    const[phonE,setPhone]=useState("");
    const[nationalitY,setNationality]=useState("");
    const[biO,setBio]=useState("");
    
    console.log(user);



    //Update Value
    useEffect(() => {
        if (user) { 
          setFirst_name(user.first_name);
          setLast_name(user.last_name);
          setEmail(user.email);
          setProfession(user.profession);
          setPhone(user.phone);
          setNationality(user.nationality);
          setBio(user.bio);
          setblogger_name(user.blogger_name)
          setDate_of_birth(user.birth_date);
        }
      }, [user]);

    //Get User
    useEffect(() => {
        const perUrl = `${baseURL}/api/admin/user/${id}`;
        fetch(perUrl, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setUser(data.user))
    }, [id, token]);

   //Handle Update User Profile
   const handleUserProfileForm = async (e) => {
    e.preventDefault();
    const profileData = {
        first_name: first_namE,
        last_name: last_namE,
        blogger_name: blogger_namE,
        birth_date: date_of_birtH,
        email: emaiL,
        profession: professioN,
        nationality: nationalitY,
        phone: phonE,
        bio: biO,
    };

    //Send To Backend
    const url = `${baseURL}/api/admin/user/update/${id}`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
        // body: profileData
    })
        .then(res => res.json())
        .then(result => {
            console.log(result)
            if (result.error) {
                console.log(result.error);
                toast.error("Profile Update Failed");
            } else {
                console.log(result);
                toast.success(result.message);
                setUser(result.user);
            }

        });
};
    




    return (
        <div className='text-primary p-3 m-3 bg-white rounded-md '>
            <h3 className='px-3 text-2xl font-bold text-center  lg:text-start my-2 text-primary'>Edit User Profile </h3>
           <form className='p-3 ' onSubmit={handleUserProfileForm}>
            <div>
                <div className='flex flex-col lg:flex-row items-center gap-5'>
                    <div className="mb-3 flex flex-col items-start w-full">
                    <label for="projectTitle" className="font-bold mb-1">First Name</label>
                    <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setFirst_name(e.target.value)} value={first_namE}/>
                    </div>

                    <div className="mb-3 flex flex-col items-start w-full">
                    <label for="projectTitle" className="font-bold mb-1">Last Name</label>
                    <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) =>setLast_name(e.target.value)} value={last_namE}/>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row items-center gap-5'>
                    <div className="mb-3 flex flex-col items-start w-full">
                    <label for="projectTitle" className="font-bold mb-1">Email</label>
                    <input type="email" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setEmail(e.target.value)} value={emaiL}/>
                    </div>

                    {
                            user?.blogger_name && <div className="mb-3 flex flex-col items-start w-full">
                            <label for="projectTitle" className="font-bold mb-1">Blogger Name</label>
                            <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) =>setblogger_name(e.target.value)} value={ blogger_namE} />
                        </div>
                        }

                    
                </div>

                <div className='flex flex-col lg:flex-row items-center gap-5'>
                    

                    <div className="mb-3 flex flex-col items-start w-full">
                    <label for="projectTitle" className="font-bold mb-1">Phone</label>
                    <input type="tel" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) =>setPhone(e.target.value)} value={phonE} />
                    </div>

                    <div className="mb-3 flex flex-col items-start w-full">
                    <label for="projectTitle" className="font-bold mb-1">Date Of Birth</label>
                    <input 
                        type="text" 
                        className="w-full bg-bgclr rounded py-2 px-3 outline-none" 
                        id="projectTitle" 
                        onChange={(e) =>{
                            setDate_of_birth(e.target.value);
                        }} 
                        value={date_of_birtH}
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                         />
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row items-center gap-5'>
                        <div className="mb-3 flex flex-col items-start w-full">
                            <label for="projectTitle" className="font-bold mb-1">Nationality</label>
                            <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) =>setNationality(e.target.value)} value={nationalitY} />
                        </div>

                        <div className="mb-3 flex flex-col items-start w-full">
                            <label for="projectTitle" className="font-bold mb-1">Profession</label>
                            <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setProfession(e.target.value)} value={professioN} />
                        </div>
                </div>
               
                <div className="mb-3 flex flex-col items-start w-full">
                    <label for="projectDesc" className="font-bold mb-1">Bio</label>
                    <textarea className="w-full bg-bgclr rounded py-1 px-3 outline-none" id='projectDesc' rows="5" onChange={(e) => setBio(e.target.value)} value={biO}></textarea>
                </div>
            </div>

            <div className="flex flex-row gap-3 justify-center lg:justify-end items-center text-center mt-3">
            <button type="submit" className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg ">Update</button>
          </div>

           </form>
        </div>
    );
};

export default UserEdit;