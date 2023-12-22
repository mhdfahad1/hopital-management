import React, { useEffect, useState } from 'react'
import { Button, Modal, Nav } from 'react-bootstrap';
import { addHeadAPI, getAlldepartmentsAPI } from '../services/allApi';

function AddHead() {
    const [departments,setDepartments]=useState([])
    // console.log(departments);
    const [addHead,setAddHead]=useState({
        name:"",emp_number:"",age:"",image:"",description:"",departmentName:""
    })
    // console.log(addHead);
    const [show, setShow] = useState(false);
    const handleClose = () => {

        setShow(false);
        setAddHead({
            name:"",emp_number:"",age:"",image:"",description:"",departmentName:""

        })
    }
    const handleShow = () => setShow(true);

    const getAlldepartments = async () => {
        const result = await getAlldepartmentsAPI()
        // console.log(result);
        if (result.status === 200) {
            setDepartments(result?.data)
        } else {
            alert(result?.response?.data)
        }
    }
    const convertImage = (e) => {

        const imageFile = e.target.files[0]
        if (imageFile) {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.addEventListener('load', () => {
                setAddHead({ ...addHead, image: reader.result })
            })
        }

    }
    const saveHead=async()=>{
        const { name,emp_number,age,image,description,departmentName}=addHead
        if(!name||!emp_number||!age||!image||!description||!departmentName){
            alert('please fill the form completely')
        }else{
            const result=await addHeadAPI(addHead)
            if(result.status===200){
                alert(`${name} added`)
                handleClose()
            }else{
                alert(result?.response?.data)
            }
        }

    }
    useEffect(()=>{
        getAlldepartments()
    },[departments])
   
    return (
        <div>
            <Nav.Link href="" onClick={handleShow}>Add Head</Nav.Link>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='md'

            >
                <Modal.Header closeButton>
                    <Modal.Title>Head Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className='flex justify-center'>
                    <div>
                        <label className='flex justify-center text-center mb-5' htmlFor="profilepic">
                            <input onChange={(e)=>convertImage(e)} id='profilepic' type="file" style={{ display: 'none' }} />
                            <img width={'150px'} height={'200px'} src={addHead.image?addHead.image:'https://th.bing.com/th?id=OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2'} alt="profile" />
                        </label>
                        <input onChange={(e) => setAddHead({ ...addHead, name: e.target.value })} value={addHead.name} type="text" className='form-control mb-3 w-[300px]' placeholder='employee-name' />
                        <input onChange={(e) => setAddHead({ ...addHead, emp_number: e.target.value })} value={addHead.emp_number} type="text" className='form-control mb-3 w-[300px]' placeholder='employee number' />
                        <input onChange={(e) => setAddHead({ ...addHead, age: e.target.value })} value={addHead.age} type="text" className='form-control mb-3 w-[300px]' placeholder='age' />
                        <input onChange={(e) => setAddHead({ ...addHead, description: e.target.value })} value={addHead.description} type="text" className='form-control mb-3 w-[300px]' placeholder='Description' />
                        <select onChange={(e) => setAddHead({ ...addHead, departmentName: e.target.value })} className='w-[300px]' name="" id="">
                            <option value="" selected hidden>Select Department</option>
                            {
                                departments?.map(item=>(
                                    <option value={item.name}>{item.name}</option>
                                ))
                                }
                        </select>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='text-black' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={(e)=>saveHead(e)} variant="primary" className='text-black'>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddHead