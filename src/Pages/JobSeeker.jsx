import oip  from "./img/OIP.jpg"
import AppliedJobs from "./seekerDashboard/job-list";
import RequiredJobs from "./seekerDashboard/required";
import Profile from "./seekerDashboard/profile";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function JobSeeker(){
    const [activePage,setActivePage]=useState("Applied")
    const navigate=useNavigate()

    useEffect(()=>{
        const user=sessionStorage.getItem("user")
        if(!user){
            navigate("/")
        }
    },[navigate])

    const handleLogout=()=>{
        sessionStorage.clear()
        navigate("/")
    }

    return(
        <>
            <main  className="bg-blue-500 min-h-screen w-full">
                <header className="flex bg-white justify-between p-4 px-7 rounded-b-2xl">
                    <h1 className="flex items-center gap-4 font-bold "> <img className="w-10 h-10 rounded-full" src={oip}/>Job Seeker Dashboard</h1>
                    <button onClick={handleLogout} className="bg-blue-600 px-3 mr-4 text-white rounded-3xl active:scale-95 shadow-blue-700 shadow">Logout</button>
                </header>
                <nav className="flex  text-white border-b-2 border-dashed  ">
                    <button onClick={()=>setActivePage("Applied")} className="p-5 border-l-2 rounded-2xl active:scale-90">Applied Jobs</button>
                    <button onClick={()=>setActivePage("Required")} className="p-5 border-l-2 rounded-2xl active:scale-90">Required jobs</button>
                    <button onClick={()=>setActivePage("profile")} className="p-5 border-l-2 rounded-2xl active:scale-90">My Profile</button>
                </nav>
                <div  className="p-6 bg-white m-4 rounded-xl">
                    <section>
                        {activePage==="Applied" && <AppliedJobs/>}
                        {activePage==="Required" && <RequiredJobs/>}
                        {activePage==="profile" && <Profile/>}
                    </section>
                </div>
            </main>
        </>
    )
}
export default JobSeeker