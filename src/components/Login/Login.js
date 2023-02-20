import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { APPContext } from '../../actions/reducers';
import { baseURL } from '../utilities/url';
import useUser from '../utilities/useUser';

const Login = () => {
    const { user, setUser } = useContext(APPContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data, e) => {
        e.preventDefault();
        // console.log(data);

        const url = `${baseURL}/api/login`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result.error) {
                    console.log(result);
                    toast.error("Login Failed");
                } else {
                    console.log(result);
                    setUser(result.user);
                    const token = result.token
                    const user = JSON.stringify(result.user);

                    window.localStorage.setItem("token", token);
                    window.localStorage.setItem("user", user);
                    toast.success(result.message);

                    navigate('/admin-dashboard/dashboard');
                }


            })
    };

    return (
        <div className='bg-bgclr flex items-center justify-center h-[100vh]'>
            <div className='bg-white p-5 rounded-md w-96'>
                <h2 className='text-3xl font-bold text-primary text-center mb-3'>Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='rounded-lg bg-bgclr mb-3'>
                        <input
                            type="email"
                            placeholder='Email'
                            className=' bg-bgclr px-3 py-1.5 w-full rounded-md'
                            {...register("email", { required: true })} />

                        {errors.email && <span className='text-textred text-sm'>This field is required</span>}
                    </div>

                    <div className='rounded-lg bg-bgclr '>
                        <input
                            type="password"
                            placeholder='Password'
                            {...register("password", { required: true })}
                            className=' bg-bgclr px-3 py-1.5 w-full rounded-md' />
                        {errors.password && <span className='text-textred text-sm'>This field is required</span>}
                    </div>



                    <div className='flex items-center justify-center mt-3'>
                        <button type='submit' className="px-10 font-bold py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg ">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;