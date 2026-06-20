import { useEffect, useState } from "react"

function PostJob(){
    let [postedJobTitle,setpostedJobTitle]=useState()
    let [jobTitle,setjobTitle]=useState("")
    let [companyName,setcompanyName]=useState("")
    let [location,setlocation]=useState("")
    let [salaryRange,setsalaryRange]=useState("")
    let [experienceRequired,setexperienceRequired]=useState("")
    let [skillsRequired,setskillsRequired]=useState("")
    let [jobType,setjobType]=useState("")
    let [jobDescription,setjobDescription]=useState("")
    let [postedBy,setpostedBy]=useState("")
    
    useEffect(()=>{
        fetch("https://jobvacancy-jsus.onrender.com/JobDetails")
        .then(res => res.json())
        .then(data => setpostedJobTitle(data))
        .catch(err => console.log(err))

        const user=sessionStorage.getItem("user")
        if(user){
            const userData=JSON.parse(user)
            setpostedBy(userData.id)
        }
    },[])
    const getall =(e)=>{
        e.preventDefault()
        let allDetails={
            id:(postedJobTitle.length+1).toString() || "0",
            JobTitle:jobTitle,
            CompanyName:companyName,
            Location:location,
            SalaryRange:salaryRange,
            ExperienceRequired:experienceRequired,
            SkillsRequired:skillsRequired,
            JobType:jobType,
            JobDescription:jobDescription,
            postedBy:postedBy
        }

        fetch("https://jobvacancy-jsus.onrender.com/JobDetails",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(allDetails)
        })
        .then(res => res.json())
        .then(data=>{
            alert("Job posted successfully!")
            setjobTitle("")
            setcompanyName("")
            setlocation("")
            setsalaryRange("")
            setexperienceRequired("")
            setskillsRequired("")
            setjobType("")
            setjobDescription("")
            fetch("https://jobvacancy-jsus.onrender.com/JobDetails")
            .then(res => res.json())
            .then(data => setpostedJobTitle(data))
            .catch(err => {})
        })
        .catch(err => console.log(err))
   }

    return(
        <>
            <section className="flex flex-col gap-4">
                <h1 className="flex justify-center font-bold text-[18px] text-blue-600">Post a Job</h1>
                <form className="flex flex-col gap-4" action="">
                    <div className="border-b-2 pb-2 border-blue-600 border-dashed">
                        <h1 className="font-semibold text-blue-600">👉Job Details</h1>
                        <div className="flex flex-col md:gap-2 gap-3 mt-2 px-10">
                            <label htmlFor="" className="flex flex-col md:flex-row md:justify-between md:items-center ">Job Title
                                <input  onChange={(e)=>setjobTitle(e.target.value)} className=" border-b-2 border-blue-600 rounded-2xl p-2 md:w-100" placeholder="Eg: React Developer, Java Developer" type="text" />
                            </label>
                            <label htmlFor="" className="flex flex-col md:flex-row md:justify-between md:items-center ">Company Name
                                <input onChange={(e)=>setcompanyName(e.target.value)} placeholder="Your company name" type="text" className="border-b-2 border-blue-600 rounded-2xl p-2 md:w-100" />
                            </label>
                            <label htmlFor="" className="flex flex-col md:flex-row md:justify-between md:items-center ">Location
                                <input onChange={(e)=>setlocation(e.target.value)} placeholder="Enter company location" type="text" className="border-b-2 border-blue-600 rounded-2xl p-2 md:w-100"/>
                            </label>
                            <label htmlFor="" className="flex flex-col md:flex-row md:justify-between md:items-center ">Salary Range
                                <input onChange={(e)=>setsalaryRange(e.target.value)} placeholder="eg:₹3–5 LPA" type="text" className="border-b-2 border-blue-600 rounded-2xl p-2 md:w-100"/>
                            </label>
                        </div>
                    </div>
                    <div className="border-b-2 pb-2 border-blue-600 border-dashed">    
                        <h1 className="font-semibold text-blue-600">👉Job Requirements</h1>
                        <div className="flex flex-col md:gap-2 gap-3 mt-2  px-10">
                            <label htmlFor="" className="flex flex-col md:flex-row md:justify-between md:items-center ">Experience Required
                                <select onChange={(e)=>setexperienceRequired(e.target.value)} className="border-b-2 border-blue-600 rounded-2xl p-2 md:w-100" name="" id="">
                                    <option value="Freshers">Freshers</option>
                                    <option value="0–1 Years">0–1 Years</option>
                                    <option value="1–3 Years">1–3 Years</option>
                                    <option value="3–5 Years">3–5 Years</option>
                                </select>
                            </label>
                            <label htmlFor="" className="flex flex-col md:flex-row md:justify-between md:items-center ">Skills Required
                                <textarea onChange={(e)=>setskillsRequired(e.target.value)} placeholder="Example: React, JavaScript, HTML, CSS" name="" id="" className="flex  border-b-2 h-12 border-blue-600 rounded-2xl p-2 md:w-100"></textarea>
                            </label>
                            <label htmlFor="" className="flex flex-col md:flex-row md:justify-between md:items-center ">Job Type
                                <select onChange={(e)=>setjobType(e.target.value)} name="" id="" className="border-b-2 border-blue-600 rounded-2xl p-2 md:w-100">
                                    <option value="Full-Time">Full-Time</option>
                                    <option value="Part-Time">Part-Time</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <label className=" grid font-semibold text-blue-600">👉Job Description
                            <textarea onChange={(e)=>setjobDescription(e.target.value)} name="" id="" placeholder="enter Roles & responsibilities"  className="mt-4 ml-10 border-2 text-black border-blue-600 rounded-2xl p-2 md:w-130 md:h-60 w-70"></textarea>
                    </label>
                    <button onClick={getall} className="bg-blue-600 px-3 py-3 mr-4 text-white rounded-3xl active:scale-95 shadow-blue-700 shadow">
                       Save & Post Job</button>
                </form>
            </section>
        </>
    )
}
export default PostJob