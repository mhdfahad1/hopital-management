import { Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Departmentdetails from './pages/Departmentdetails';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/'element={<Admin/>}></Route>
        <Route path='/login'element={<Login/>}></Route>
        <Route path='/departmentDetails/:id'element={<Departmentdetails/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
