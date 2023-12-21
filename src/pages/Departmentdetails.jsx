import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getOnedepartmentsAPI } from '../services/allApi'
import { Button, Container, Modal, Nav, Navbar } from 'react-bootstrap'

function Departmentdetails() {
    const [employee,setEmployee]=useState({
        name:"", emp_number:"", age:"", image:"",description:"",department:"", headname:""
    })
    const [department,setDepartment]=useState([])
    const navigate=useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => {
        
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const {id}=useParams()

    const getOneDepartment=async()=>{
        const result=await getOnedepartmentsAPI(id)
        if(result.status===200){
            setDepartment(result.data)
        }else{
            alert(result.response.data)
        }
    }
    useEffect(()=>{
        getOneDepartment()
    },[])
  return (
    <div>
        <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Hospital-Management</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto flex justify-between">
                            <div className='flex'>
                                <Nav.Link href="" onClick={handleShow}>Add Employee</Nav.Link>
                            </div>
                            <div className='flex justify-end'>
                                <Nav.Link href="">Logout</Nav.Link>

                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
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
                            <input  id='profilepic' type="file" style={{ display: 'none' }} />
                            <img width={'150px'} height={'200px'} src={department.image ? department.image : 'https://th.bing.com/th?id=OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2'} alt="profile" />
                        </label>
                        <input onChange={(e) => setDepartment({ ...department, name: e.target.value })} value={department.name} type="text" className='form-control mb-3 w-[300px]' placeholder='Department-name' />
                        <input onChange={(e) => setDepartment({ ...department, year: e.target.value })} value={department.year} type="text" className='form-control mb-3 w-[300px]' placeholder='employee number' />
                        <input onChange={(e) => setDepartment({ ...department, description: e.target.value })} value={department.description} type="text" className='form-control mb-3 w-[300px]' placeholder='Description' />
                        <input onChange={(e) => setDepartment({ ...department, description: e.target.value })} value={department.description} type="text" className='form-control mb-3 w-[300px]' placeholder='department' />
                        <input onChange={(e) => setDepartment({ ...department, description: e.target.value })} value={department.description} type="text" className='form-control mb-3 w-[300px]' placeholder='Description' />
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='text-black' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button  variant="primary" className='text-black'>Save</Button>
                </Modal.Footer>
            </Modal>
    </div>
  )
}

export default Departmentdetails