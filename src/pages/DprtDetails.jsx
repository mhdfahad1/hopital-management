import React, { useEffect, useState } from 'react'
import { getOneDepartmentAPI } from '../services/allApi'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'

function DprtDetails() {
    const [emp, setemp] = useState({})

    const { name } = useParams()
    const getEmployee = async () => {
        const result = await getOneDepartmentAPI(name)
        console.log(result);
        if (result.status === 200) {
            setemp(result.data)
        }else{
            alert(result.response.data)
        }

    }
    useEffect(()=>{
        getEmployee()
    })
  return (
    <div>
            <Header />
    
                <div className='flex justify-between'>
                <div className='ml-10 p-10'>
                    <h1 className='text-2xl mt-5'>Head Name:{emp.headName}</h1>
                    <p className='text-lg mt-3'>{emp.description}</p>

                </div>
                <div className='mr-20 p-10'>
                    <img width={'200px'} src={emp.image} alt="" />
                    <h1 className='text-center text-lg'>Department name:{emp.name}</h1>
                    <h1 className='text-center text-lg'>Year:{emp.year}</h1>

                </div>
            </div>

        </div>
  )
}

export default DprtDetails