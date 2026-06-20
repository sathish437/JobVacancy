import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function login(){
    let [userRole,SetRole]=useState("")
    let [empid,setEmpid]=useState()
    let [jobid,setJobid]=useState()
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://jobvacancy-jsus.onrender.com/EmployerDetails")
        .then((res)=>res.json())
        .then((data)=>setEmpid(data))
        .catch((err)=>console.log(err));

        fetch("https://jobvacancy-jsus.onrender.com/JobSeekerDetails")
        .then((res)=>res.json())
        .then((data)=>setJobid(data))
        .catch((err)=>console.log(err));
    }, []);
    const role = () => {

        if (userRole === "Employer") {
            let res={
                id:(empid.length+1).toString(),
                role:userRole
            }
            fetch("https://jobvacancy-jsus.onrender.com/EmployerDetails",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(res)
            })
            .then((res)=>res.json())
            .then((data)=>{})
            .catch((err)=>console.log(err));

            navigate("/empReg");
        } else if (userRole === "JobSeeker") {
            let res={
                id:(jobid.length+1).toString(),
                role:userRole
            }
            fetch("https://jobvacancy-jsus.onrender.com/JobSeekerDetails",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(res)
            })
            .then((res)=>res.json())
            .then((data)=>{})
            .catch((err)=>console.log(err));

            navigate("/jobSeekReg");
        }
    };

    
    return(
        <>
            <main className="bg-blue-500 h-screen w-full">
                <h1 className="pt-5 text-xl font-bold text-white mb-4 text-center">Job Board </h1>
                <div className="bg-white rounded-lg shadow-md p-6 w-80 mx-auto mt-20">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                        Your Role
                    </h2>
                    <select  onChange={(e)=>SetRole(e.target.value)}  className="w-full p-2 border border-gray-300 rounded mb-4">
                        <option value="">Select Role</option>
                        <option value="Employer">Employer</option>
                        <option value="JobSeeker">JobSeeker</option>
                    </select>
                    <button onClick={role} className="w-full bg-blue-500 hover:bg-blue-700 active:scale-90 text-white py-2 rounded">
                        Register
                    </button>
                </div>
            </main>
        </>
    )
}
export default login