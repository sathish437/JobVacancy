import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function UserLogin() {
    let [empDetails,setEmpDetails]=useState([])
    let [seekDetails,setSeekDetails]=useState([])
    let [check,setCheck]=useState("")
    let navigate=useNavigate()
    let [formData,setFormData]=useState({
        email:'',
        password:'',
        role:''
    })

    const handleChange=(e)=>{
        const {name,value}= e.target

        setFormData(prev=>({
            ...prev,
            [name]:value
        }))
    }   
    
    const login=()=>{
        let flog=false
        if(!flog){
            for(let i=0;i<Math.max(empDetails.length);i++){
                if(formData.email===empDetails[i].Email){
                   flog=true
                    if(formData.password!==empDetails[i].Password){
                        alert("incorrect Password")
                        return
                    }
                    if(formData.role!==empDetails[i].role){
                        alert("Please select correct role")
                        return
                    }
                    if(check===""){
                        alert("Please accept the terms and conditions")
                        return
                    }
                    alert("login successfully")
                    const userSession = {
                        id: empDetails[i].id,
                        role: empDetails[i].role,
                        email: empDetails[i].Email,
                        name: empDetails[i].ContactPerson
                    }
                    sessionStorage.setItem("user", JSON.stringify(userSession))
                    navigate("/employer")
                }
            }
        }
        if(!flog){
            for(let i=0;i<Math.max(seekDetails.length);i++){
                if(formData.email===seekDetails[i].email){
                   flog=true
                    if(formData.password!==seekDetails[i].password){
                        alert("incorrect Password")
                        return
                    }
                    if(formData.role!==seekDetails[i].role){
                        alert("Please select correct role")
                        return
                    }
                    if(check===""){
                        alert("Please accept the terms and conditions")
                        return
                    }
                    alert("login successfully")
                    const userSession = {
                        id: seekDetails[i].id,
                        role: seekDetails[i].role,
                        email: seekDetails[i].email,
                        name: seekDetails[i].fullName
                    }
                    sessionStorage.setItem("user", JSON.stringify(userSession))
                    navigate("/jobSeeker")
                }
            }
        }
        if(!flog){
            alert("Email not registered")
        }
       
    }

    useEffect(()=>{
        fetch("http://localhost:3000/EmployerDetails")
        .then(res=>res.json())
        .then(data=>setEmpDetails(data))
        .catch(err=>console.log(err));

        fetch("http://localhost:3000/JobSeekerDetails")
        .then(res=>res.json())
        .then(data=>setSeekDetails(data))
        .catch(err=>console.log(err));
    },[])


    return(
        <>
            <main className='flex h-screen w-screen bg-blue-600 justify-center'>
                <section className='rounded-3xl p-6 mt-20 bg-white  w-100 h-110'>
                    <h1 className='flex text-2xl font-bold  '><p className='underline'>Lo</p>gin</h1>
                    <div className='flex flex-col gap-2 mt-10'>
                        <input onChange={handleChange} name="email" className='p-3 border-b-2 rounded-[5px] border-gray-500' type='email' placeholder="Enter your email" />
                        <input onChange={handleChange} name="password" className='p-3 border-b-2 rounded-[5px] border-gray-500' type="password" placeholder="Enter your password" />
                        <select  onChange={handleChange} name="role" className="w-full p-2 border border-gray-300 rounded mb-4">
                            <option value="">Select Role</option>
                            <option value="Employer">Employer</option>
                            <option value="JobSeeker">JobSeeker</option>
                        </select>
                    </div>
                    <nav className='flex justify-between mt-4 gap-2'>
                        <div className='flex gap-2'>
                            <input onChange={(e)=>setCheck(e.target.value)}  className='w-4 ' type='checkBox'/>
                            <p className='text-gray-600'>Remember me</p>
                        </div>
                        <a href="" className="text-blue-600 font-semibold">Forgot password?</a>
                    </nav>
                    <button onClick={()=>login()} className='w-full active:scale-90 bg-blue-600 mt-5 p-3 rounded-2xl text-white'>Login Now</button>
                    <p className='flex justify-center mt-5'>Don't have an account?<a className='text-blue-600 font-semibold hover:underline' href="/login">Signup now</a></p>
                </section>
            </main>
        </>
    )
}

export default UserLogin;