import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./Pages/Login.jsx" 
import JobSeeker from "./Pages/JobSeeker.jsx"
import Employer from "./Pages/Employer.jsx"
import PostJob from './Pages/EmployerDashboard/PostJob.jsx';
import EmpReg from './Pages/RoleBaseReg/empReg.jsx';
import JobSeekReg from './Pages/RoleBaseReg/jobSeekReg.jsx';
import UserLogin from './Pages/RoleBaseReg/Userlogin.jsx';
function App(){
    return(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<UserLogin />} />
            <Route path='/jobSeekReg' element={<JobSeekReg />} />
            <Route path='/empReg' element={<EmpReg />} />
            <Route path='/login' element={<Login />} />
            <Route path='/jobSeeker' element={<JobSeeker />} />
            <Route path='/employer' element={<Employer />} />
            <Route path='/postJob' element={<PostJob/>}/>
        </Routes>
    </BrowserRouter>
    
    )
}
export default App