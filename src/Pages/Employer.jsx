import oip  from "./img/OIP.jpg"
import Applicant from "./EmployerDashboard/Applicant";
import PostedJobList from "./EmployerDashboard/PostedJobList";
import PostJob from "./EmployerDashboard/PostJob";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Employer(){
    const [activePage,setActivePage]=useState("post")
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
                    <h1 className="flex items-center gap-4 text-blue-600 font-bold "> <img className="w-10 h-10 rounded-full" src={oip}/>
                        Employer Dashboard</h1>
                    <button onClick={handleLogout} className="bg-blue-600 px-3 mr-4 text-white rounded-3xl active:scale-95 shadow-blue-700 shadow">
                        Logout</button>
                </header>
                <nav className="flex  text-white border-b-2 border-dashed  ">
                    <button onClick={()=>setActivePage("post")} className="p-5 border-l-2 rounded-2xl  active:scale-90">
                        Post Job</button>
                    <button onClick={()=>setActivePage("posted")} className="p-5 border-l-2 rounded-2xl  active:scale-90">
                        Posted Job List</button>
                    <button onClick={()=>setActivePage("applicant")} className="p-5 border-l-2 rounded-2xl active:scale-90">
                        Applicant Details</button>
                </nav>
                <div  className="p-6 bg-white m-4 rounded-xl">
                    <section>
                        {activePage==="post" && <PostJob/>}
                        {activePage==="posted" && <PostedJobList/>}
                        {activePage==="applicant" && <Applicant/>}
                    </section>
                </div>
            </main> 
        </>
    )
}
export default Employer