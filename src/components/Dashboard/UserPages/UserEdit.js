import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const UserEdit = () => {
    const{id}=useParams();

    const[first_name,setFirst_name]=useState('');
    const[last_name,setLast_name]=useState('');
    const[email,setEmail]=useState('');
    const[date_of_birth,setDate_of_birth]=useState('');
    const[profession,setProfession]=useState('');
    const[phone,setPhone]=useState('');
    const[nationality,setNationality]=useState('');
    const[bio,setBio]=useState('');

    // const[profession,setProfession]=useState('');




    return (
        <div className='text-primary p-3 m-3 bg-white rounded-md '>
            <h3 className='px-3 text-2xl font-bold text-center  lg:text-start my-2 text-primary'>Edit User Profile </h3>
           <form className='p-3 '>
            <div>
                <div className='flex flex-col lg:flex-row items-center gap-5'>
                    <div className="mb-3 flex flex-col items-start w-full">
                    <label for="projectTitle" className="font-bold mb-1">First Name</label>
                    <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setFirst_name(e.target.value)} placeholder="First Name" />
                    </div>

                    <div className="mb-3 flex flex-col items-start w-full">
                    <label for="projectTitle" className="font-bold mb-1">Last Name</label>
                    <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) =>setLast_name(e.target.value)} placeholder="Last Name" />
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row items-center gap-5'>
                    <div className="mb-3 flex flex-col items-start w-full">
                    <label for="projectTitle" className="font-bold mb-1">Email</label>
                    <input type="email" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    </div>

                    <div className="mb-3 flex flex-col items-start w-full">
                    <label for="projectTitle" className="font-bold mb-1">Date Of Birth</label>
                    <input type="date" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) =>setDate_of_birth(e.target.value)} placeholder="Date Of Birth" />
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row items-center gap-5'>
                    <div className="mb-3 flex flex-col items-start w-full">
                    <label for="projectTitle" className="font-bold mb-1">Profession</label>
                    <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) => setProfession(e.target.value)} placeholder="Profession" />
                    </div>

                    <div className="mb-3 flex flex-col items-start w-full">
                    <label for="projectTitle" className="font-bold mb-1">Phone</label>
                    <input type="tel" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) =>setPhone(e.target.value)} placeholder="Phone" />
                    </div>
                </div>

                <div className="mb-3 flex flex-col items-start w-full">
                    <label for="projectTitle" className="font-bold mb-1">Nationality</label>
                    <input type="text" className="w-full bg-bgclr rounded py-2 px-3 outline-none" id="projectTitle" onChange={(e) =>setNationality(e.target.value)} placeholder="Nationality" />
                </div>

                <div className="mb-3 flex flex-col items-start w-full">
                <label for="projectDesc" className="font-bold mb-1">Bio</label>
                <textarea className="w-full bg-bgclr rounded py-1 px-3 outline-none" id='projectDesc' rows="5" onChange={(e) => setBio(e.target.value)} placeholder="Description"></textarea>
              </div>

            </div>

           </form>
        </div>
    );
};

export default UserEdit;