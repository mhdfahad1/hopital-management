import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { CardHeader } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { addDepartmentAPI, deletedepartmentsAPI, editdepartmentsAPI, getAlldepartmentsAPI } from '../services/allApi';
import { useNavigate } from 'react-router-dom';
function Admin() {
    const [alldepatmnts, setAlldepatmnts] = useState([])
    const [department, setDepartment] = useState({
        _id: "", name: "", image: "", year: "", description: ""
    })
    const navigate=useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setDepartment({
            name: "", image: "", year: "", description: ""

        })
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const convertImage = (e) => {

        const imageFile = e.target.files[0]
        if (imageFile) {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.addEventListener('load', () => {
                setDepartment({ ...department, image: reader.result })
                // setPreview(reader.result)
            })
        }

    }
    const saveDepartment = async () => {
        if (department._id) {
            const { _id, name, image, year, description } = department

            if (!_id || !name || !image || !year || !description) {
                alert('please fill the form completely')

                
            }else{
                const result = await editdepartmentsAPI(department)
                console.log(result);
                if (result.status === 200) {
                    alert('department edited successfully')
                    handleClose()
                } else {
                    alert(result.response.data)
                }
            }


        } else {
            const { name, image, year, description } = department

            if (!name || !image || !year || !description) {
                alert('please fill the form completely')
            } else {
                const result = await addDepartmentAPI(department)
                // console.log(result);
                if (result.status === 200) {
                    alert('department added successfully')
                    handleClose()
                } else {
                    alert(result.response.data)
                }
            }
        }

    }
    const getAlldepartments = async () => {
        const result = await getAlldepartmentsAPI()
        // console.log(result);
        if (result.status === 200) {
            setAlldepatmnts(result.data)
        } else {
            alert(result?.response.data)
        }
    }

    const deleteDepartment = async (item) => {
        const result = await deletedepartmentsAPI(item)
        if (result.status === 200) {
            alert(`${item.name} deleted`)
        } else {
            alert(result?.response.data)
        }
    }
    const editdepartment = async (item) => {
        setDepartment({
            _id: item._id, name: item.name, image: item.image, year: item.year, description: item.description

        })
        handleShow()
    }
    const Departmentdetails=(item)=>{
        navigate(`/departmentDetails/${item._id}`)
    }
    useEffect(() => {
        getAlldepartments()

    }, [alldepatmnts])

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Hospital-Management</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto flex justify-between">
                            <div className='flex'>
                                <Nav.Link href="" onClick={handleShow}>Add Department</Nav.Link>
                            </div>
                            <div className='flex justify-end'>
                                <Nav.Link href="">Logout</Nav.Link>

                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='p-10 row'>
                {alldepatmnts.length > 0 ?
                    alldepatmnts.map(item => (
                        <div className='p-2 col-lg-4'>
                            <Card style={{ width: '16rem' }}>
                                <CardHeader>
                                    <div className='flex justify-between'>
                                        <button className='btn' onClick={(e) => editdepartment(item)}><i className="fa-regular fa-pen-to-square text-success text-xl"></i></button>
                                        <button className='btn' onClick={() => deleteDepartment(item)}><i className="fa-solid fa-trash text-danger text-xl"></i></button>
                                    </div>
                                </CardHeader>
                                <Card.Img width={'200px'} variant="top" src={item.image} />
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>
                                        {item.year}<br/>
                                        {item.description?.slice(0,10)}
                                    </Card.Text>

                                    <Button onClick={()=>Departmentdetails(item)} variant="" className='btn btn-primary text-black'>Details</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                    : <p>Add departments</p>}
            </div>
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
                            <input onClick={(e) => convertImage(e)} id='profilepic' type="file" style={{ display: 'none' }} />
                            <img width={'150px'} height={'200px'} src={department.image ? department.image : 'https://th.bing.com/th?id=OIP.ixZ69lPCOZ3ZO5UqSHQGIAHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2'} alt="profile" />
                        </label>
                        <input onChange={(e) => setDepartment({ ...department, name: e.target.value })} value={department.name} type="text" className='form-control mb-3 w-[300px]' placeholder='Department-name' />
                        <input onChange={(e) => setDepartment({ ...department, year: e.target.value })} value={department.year} type="text" className='form-control mb-3 w-[300px]' placeholder='Year Founded' />
                        <input onChange={(e) => setDepartment({ ...department, description: e.target.value })} value={department.description} type="text" className='form-control mb-3 w-[300px]' placeholder='Description' />

                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='text-black' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={() => saveDepartment()} variant="primary" className='text-black'>Save</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Admin