import { Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Departmentdetails from './pages/Departmentdetails';
import EmployeDetails from './pages/EmployeDetails';
import HeadDeatails from './pages/HeadDeatails';
import DprtDetails from './pages/DprtDetails';
import { useContext } from 'react';
import { loginContext } from './context/ContextShare';

function App() {
  // const { loggined, setLoggined } = useContext(loginContext)

  return (
    <div>
      <Routes>
        <Route path='/'element={<Admin/>}></Route>
        <Route path='/login'element={<Login/>}></Route>
        <Route path='/departmentDetails/:name'element={<Departmentdetails/>}></Route>
        <Route path='/employeeDetails/:id' element={<EmployeDetails/>}></Route>
        <Route path='/headDetails/:id' element={<HeadDeatails/>}></Route>
        <Route path='/specialization/:name' element={<DprtDetails/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
