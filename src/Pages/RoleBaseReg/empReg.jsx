import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function EmpReg() {
    const [companyName, setCompanyName] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [id,setId]=useState("")
    const [check,setCheck]=useState("")
    const navigate=useNavigate()
    useEffect(() => {
        fetch("http://localhost:3000/EmployerDetails")
        .then((res)=>res.json())    
        .then((data)=>setId((data.length).toString()))
        .catch((err)=>console.log(err));
    })
    let userData={
        CompanyName:companyName,
        ContactPerson:contactPerson,
        Email:email,
        Password:password,
        ConfirmPassword:confirmPassword
    }
    const reg=(id)=>{
        if(!email.endsWith("@gmail.com")){
            alert(`Enter a valid email`)
        }else if(check===""){ 
            alert("Please accept the terms and conditions")
        }else if(password!==confirmPassword){
            alert("Passwords do not match")
        }else{
            const finalUserData={
                ...userData,
                id:id,
                role:"Employer"
            }
            fetch(`http://localhost:3000/EmployerDetails/${id}`,{
                method:"PATCH",
                headers:{"Content-Type":"application/json"},   
                body:JSON.stringify(finalUserData)
            })
            .then((res)=>res.json())
            .then((data)=>{
                alert("Registration successful!")
                setCompanyName("")
                setContactPerson("")
                setEmail("")
                setPassword("")
                setConfirmPassword("")
                setCheck("")
                navigate("/")
            })
            .catch((err)=>{});
        }
    }
    
    return (
        <main className="flex min-h-screen w-screen bg-blue-600 justify-center items-start pt-10 sm:pt-16 md:pt-20 px-4">
            <section className="w-full max-w-md sm:max-w-lg rounded-3xl p-6 sm:p-8 bg-white shadow-lg">
                
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex justify-center mb-6 sm:mb-8 text-center">
                    <span className="underline decoration-blue-600 mr-1">
                        Employer
                    </span>
                    Registration
                </h1>

                <div className="flex flex-col gap-3 sm:gap-4">
                    <input
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="p-3 border-b-2 rounded-md border-gray-400 focus:border-blue-600 focus:outline-none"
                        type="text"
                        placeholder="Company Name"
                    />

                    <input
                        onChange={(e) => setContactPerson(e.target.value)}
                        className="p-3 border-b-2 rounded-md border-gray-400 focus:border-blue-600 focus:outline-none"
                        type="text"
                        placeholder="Contact Person Name"
                    />

                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 border-b-2 rounded-md border-gray-400 focus:border-blue-600 focus:outline-none"
                        type="email"
                        placeholder="Enter Email"
                    />

                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 border-b-2 rounded-md border-gray-400 focus:border-blue-600 focus:outline-none"
                        type="password"
                        placeholder="Create Password"
                    />

                    <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="p-3 border-b-2 rounded-md border-gray-400 focus:border-blue-600 focus:outline-none"
                        type="password"
                        placeholder="Confirm Password"
                    />
                </div>

                <label className="flex items-start gap-2 mt-4 text-gray-600 text-sm sm:text-base">
                <input onChange={(e)=>setCheck(e.target.value)}  type="checkbox" className="mt-1 accent-blue-600" />
                I accept all terms & conditions
                </label>

                <button
                onClick={()=>reg(id)}
                className="w-full bg-blue-600 mt-6 p-3 rounded-2xl text-white font-semibold active:scale-95 transition">
                Register Now
                </button>

                <p className="mt-4 text-center text-sm sm:text-base text-gray-600">
                Already have an account?
                <a
                    href="/login"
                    className="ml-1 text-blue-600 font-semibold hover:underline"
                >
                    Login now
                </a>
                </p>
            </section>
        </main>
    );

}

export default EmpReg