import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLoginAPI } from '../services/allApi'
import { loginContext } from '../context/ContextShare'

function Login() {
    const { loggined, setLoggined } = useContext(loginContext)
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        email: "", password: ""
    })
    console.log(login);
    const loginUser = async () => {
        const { email, password } = login
        if (!email, !password) {
            alert('please fill the form completely')
        } else {
            const result = await adminLoginAPI(login)
            if (result.status === 200) {
                alert('admin logged successfully')
                setLoggined(true)
                sessionStorage.setItem("existingAdmin", JSON.stringify(result.data.existingAdmin))
                sessionStorage.setItem("token", result.data.token)
                navigate('/')
            } else {
                alert(result.response.data)
            }
        }
    }
    return (
        <div className='md:flex md:justify-center h-[90vh]'>
            <div className='backgroundImg shadow md:mt-20 mt-40 md:w-[750px] rounded-xl h-[450px] flex justify-between'>
                <div className='md:w-[330px] w-[0px] bg-sky-600 '>


                </div>
                <div className='w-[400px]'>
                    <h1 className='text-3xl p-5 text-center'>LOGIN</h1>
                    <div className='ml-10 '
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '35ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className='flex'>
                            <i className="fa-solid fa-envelope mt-8 "></i>

                            <input onChange={(e) => setLogin({ ...login, email: e.target.value })} className='border rounded w-[300px]'
                                type='email'
                                name='email'
                                placeholder='email'
                            />
                        </div>
                        <div className='flex mt-5'>
                            <i className="fa-solid fa-lock mt-8"></i>

                            <input onChange={(e) => setLogin({ ...login, password: e.target.value })} className='border w-[300px]'
                                name='password'
                                type='password'
                                placeholder='password'
                            />
                        </div>
                    </div>
                    <div className='flex justify-center mt-6'>
                        <button onClick={(e) => loginUser(e)} className=' w-[310px] rounded btn btn-primary' >LOGIN</button>

                    </div>


                </div>
            </div>

        </div>
    )
}

export default Login