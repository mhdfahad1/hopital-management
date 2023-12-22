import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { editEmployeeAPI, getAllHeadAPI, getAlldepartmentsAPI } from '../services/allApi';

function EditEmployee({ item }) {
    const [head, setHead] = useState([])
    const [departments, setDepartments] = useState([])
    const [employee, setEmployee] = useState({
        _id: "", name: "", emp_number: "", age: "", image: "", description: "", departmentName: "", headName: ""

    })
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setEmployee({
            name: "", emp_number: "", age: "", image: "", description: "", departmentName: "", headName: ""

        })
        setShow(false);
    }
    const handleShow = () => {
        setShow(true)
        setEmployee({
            name: "", emp_number: "", age: "", image: "", description: "", departmentName: "", headName: ""

        })
    };

    const convertImage = (e) => {

        const imageFile = e.target.files[0]
        if (imageFile) {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.addEventListener('load', () => {
                setEmployee({ ...employee, image: reader.result })
            })
        }

    }
    const getAlldepartments = async () => {
        const result = await getAlldepartmentsAPI()
        // console.log(result);
        if (result.status === 200) {
            setDepartments(result?.data)
        } else {
            alert(result?.response?.data)
        }
    }
    const getAllhead = async () => {
        const result = await getAllHeadAPI()
        if (result.status === 200) {
            setHead(result.data)
        } else {
            alert(result?.response.data)
        }
    }
    const editEmmployee = async (item) => {
        handleShow()
        setEmployee({
            _id:item._id,name: item.name, emp_number: item.emp_number, age: item.age, image: item.image, description: item.description, departmentName: item.departmentName, headName: item.headName

        })

    }
    const saveEmployee = async () => {
        const { _id, name, emp_number, age, image, description, departmentName, headName } = employee

        if (!_id || !name || !emp_number || !age || !image || !description || !departmentName || !headName) {
            alert('please fill the form completely')


        } else {
            const result = await editEmployeeAPI(employee)
            console.log(result);
            if (result.status === 200) {
                alert('employee edited successfully')
                handleClose()
            } else {
                alert(result?.response?.data)
            }
        }


    }
    useEffect(() => {
        getAllhead()
        getAlldepartments()
    }, [head, departments,employee])
    return (
        <div>
            <button className='btn' onClick={() => editEmmployee(item)}><i className="fa-regular fa-pen-to-square text-success text-xl"></i></button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='md'

            >
                <Modal.Header closeButton>
                    <Modal.Title>Department Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className='flex justify-center'>
                    <div>
                        <label className='flex justify-center text-center mb-5' htmlFor="profilepic">
                            <input onChange={(e) => convertImage(e)} id='profilepic' type="file" style={{ display: 'none' }} />
                            <img width={'150px'} height={'200px'} src={employee.image ? employee.image : 'https://th.bing.com/th?id=OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2'} alt="profile" />
                        </label>
                        <input onChange={(e) => setEmployee({ ...employee, name: e.target.value })} value={employee.name} type="text" className='form-control mb-3 w-[300px]' placeholder='employee-name' />
                        <input onChange={(e) => setEmployee({ ...employee, emp_number: e.target.value })} value={employee.emp_number} type="text" className='form-control mb-3 w-[300px]' placeholder='employee number' />
                        <input onChange={(e) => setEmployee({ ...employee, age: e.target.value })} value={employee.age} type="text" className='form-control mb-3 w-[300px]' placeholder='age' />
                        <input onChange={(e) => setEmployee({ ...employee, description: e.target.value })} value={employee.description} type="text" className='form-control mb-3 w-[300px]' placeholder='Description' />
                        <select onChange={(e) => setEmployee({ ...employee, departmentName: e.target.value })} className='w-[300px]' name="" id="">
                            <option value="" selected hidden>Select Department</option>
                            {
                                departments?.map(item => (
                                    <option value={item.name}>{item.name}</option>
                                ))
                            }
                        </select>
                        <select onChange={(e) => setEmployee({ ...employee, headName: e.target.value })} className='w-[300px] mt-5' name="" id="">
                            <option value="" selected hidden>Select Head</option>
                            {
                                head?.map(item => (
                                    <option onChange={() => setEmployee({ ...employee, _id: item._id })} value={item.name}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='text-black' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={() => saveEmployee()} variant="primary" className='text-black'>Edit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditEmployee