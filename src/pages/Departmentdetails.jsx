import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteEmployeeAPI, deleteHeadAPI, getdepartmentHeadsAPI, getdepartmentemployeesAPI } from '../services/allApi'
import { Button, CardHeader, Container, Modal, Nav, Navbar } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import EditEmployee from '../components/EditEmployee';
import Edithead from '../components/Edithead';
import { loginContext } from '../context/ContextShare';

function Departmentdetails() {
    const { loggined, setLoggined } = useContext(loginContext)

    const [department, setDepartment] = useState({})
    const [heads, setHeads] = useState([])

    const { name } = useParams()

    const getdepartmentEmployes = async () => {
        const result = await getdepartmentemployeesAPI(name)
        console.log(result);
        if (result.status === 200) {
            setDepartment(result?.data)
        } else {
            alert(result?.response?.data)
        }
    }
    const getdepartmenthead = async () => {
        const result = await getdepartmentHeadsAPI(name)
        console.log(result);
        if (result.status === 200) {
            setHeads(result?.data)
        } else {
            alert(result?.response?.data)
        }
    }
    const editHead = async (item) => {

    }
    const deletehead = async (item) => {
        const result = await deleteHeadAPI(item)
        if (result.status === 200) {
            alert(`${item.name} deleted`)
        } else {
            alert(result?.response.data)
        }
    }
    
    const deleteEmployee = async (item) => {
        const result = await deleteEmployeeAPI(item)
        if (result.status === 200) {
            alert(`${item.name} deleted`)
        } else {
            alert(result?.response.data)
        }
    }
    useEffect(() => {
        getdepartmentEmployes()
        getdepartmenthead()
    }, [department,heads])

    useEffect(()=>{
        if(sessionStorage.getItem("existingAdmin")&&sessionStorage.getItem("token")){
            setLoggined(true)
        }else{
            setLoggined(false)
        }
    },[])
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Hospital-Management</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto flex justify-between">

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <h1 className='text-xl p-3 text-center'>Department :{name}</h1>

            <h2 className='text-xl p-5'>Head Of the Department</h2>
            <div className='p-10 row'>
                {heads.length > 0 ?
                    heads.map(item => (
                        <div className='p-2 col-lg-4'>
                            <Card style={{ width: '16rem' }}>
                                {loggined===true?<CardHeader>
                                    <div className='flex justify-between'>
                                        <Edithead item={item}/>
                                        <button className='btn' onClick={() => deletehead(item)}><i className="fa-solid fa-trash text-danger text-xl"></i></button>
                                    </div>
                                </CardHeader>:""}
                                <Card.Img variant="top" src={item.image} />
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>
                                        employee No:{item.emp_number}
                                    </Card.Text>
                                    <Card.Text>
                                        Age:{item.age}
                                    </Card.Text>
                                    <Card.Text>
                                        {item.description}
                                    </Card.Text>
                                    <Link className='btn btn-success' to={`/headDetails/${item?._id}`} variant="primary">Details</Link>
                                </Card.Body>
                            </Card>
                        </div>
                    )) : <p>nothing to display</p>
                }
            </div>

            <hr className='mt-5' />
            <h1 className='text-xl p-5'>Employees</h1>
            <div className='p-10 row'>
                {department.length > 0 ?
                    department.map(item => (
                        <div className='p-2 col-lg-4'>
                            <Card style={{ width: '16rem' }}>
                                {loggined===true?<CardHeader>
                                    <div className='flex justify-between'>
                                        <EditEmployee item={item}/>
                                        <button className='btn' onClick={() => deleteEmployee(item)}><i className="fa-solid fa-trash text-danger text-xl"></i></button>
                                    </div>
                                </CardHeader>:""}
                                <Card.Img variant="top" src={item.image} />
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>
                                        employee No:{item.emp_number}
                                    </Card.Text>
                                    <Card.Text>
                                        Age:{item.age}
                                    </Card.Text>
                                    <Card.Text>
                                        {item.description}
                                    </Card.Text>
                                    <Link className='btn btn-success' to={`/employeeDetails/${item?._id}`} variant="primary">Details</Link>
                                </Card.Body>
                            </Card>
                        </div>
                    )) : <p>nothing to display</p>
                }
            </div>

        </div>
    )
}

export default Departmentdetails