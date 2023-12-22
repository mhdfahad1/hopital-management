import React, { useEffect, useState } from 'react'
import { getOneHeadAPI } from '../services/allApi'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'

function HeadDeatails() {
    const [emp, setemp] = useState({})
    const { id } = useParams()
    const getEmployee = async () => {
        const result = await getOneHeadAPI(id)
        console.log(result);
        if (result.status === 200) {
            setemp(result.data)
        } else {
            alert(result.response.data)
        }

    }
    useEffect(() => {
        getEmployee()
    })
    return (
        <div>
            <Header />

            <div className='flex justify-between'>
                <div className='ml-10 p-10'>
                    <h1 className='text-2xl'>Employee No:{emp.emp_number}</h1>
                    <h1 className='link text-2xl mt-5'>Department:<Link to={`/specialization/${emp.departmentName}`} className=' hover:text-blue-500'>{emp.departmentName}</Link>
                    </h1>
                    <p className='text-lg mt-3'>{emp.description}</p>

                </div>
                <div className='mr-20 p-10'>
                    <img width={'200px'} src={emp.image} alt="" />
                    <h1 className='text-center text-lg'>name:{emp.name}</h1>
                    <h1 className='text-center text-lg'>Age:{emp.age}</h1>

                </div>
            </div>

        </div>
    )
}

export default HeadDeatails