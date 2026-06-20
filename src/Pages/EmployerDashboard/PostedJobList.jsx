import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PostJob from "./PostJob"
function PostedJobList(){
    const [jobData,setJobData]=useState([])
    const [filteredJobs,setFilteredJobs]=useState([])
    const [editingId,setEditingId]=useState(null)
    const [editForm,setEditForm]=useState({})
    const navigate=useNavigate()
    useEffect(()=>{
        fetch("http://localhost:3000/JobDetails")
        .then(res => res.json())
        .then(data => {
            setJobData(data)
            const user=sessionStorage.getItem("user")
            if(user){
                const userData=JSON.parse(user)
                const employerJobs=data.filter(job=>job.postedBy===userData.id)
                setFilteredJobs(employerJobs)
            }
        })
        .catch(err => console.log(err))
    },[])

    const dele=(id)=>{
        fetch(`http://localhost:3000/JobDetails/${id}`,{
            method:"DELETE"
        })
        .then(() => {
            setJobData(jobData.filter(item => item.id !== id))
            setFilteredJobs(filteredJobs.filter(item => item.id !== id))
        })
        .catch(err => console.log(err)) 
    }

    const handleEdit=(job)=>{
        setEditingId(job.id)
        setEditForm(job)
    }

    const handleSaveEdit=(e)=>{
        e.preventDefault()
        fetch(`http://localhost:3000/JobDetails/${editingId}`,{
            method:"PATCH",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(editForm)
        })
        .then(res=>res.json())
        .then(data=>{
            setEditingId(null)
            setEditForm({})
            fetch("http://localhost:3000/JobDetails")
            .then(res => res.json())
            .then(data => {
                setJobData(data)
                const user=sessionStorage.getItem("user")
                if(user){
                    const userData=JSON.parse(user)
                    const employerJobs=data.filter(job=>job.postedBy===userData.id)
                    setFilteredJobs(employerJobs)
                }
            })
        })
        .catch(err=>{})
    }

    const handleCancelEdit=()=>{
        setEditingId(null)
        setEditForm({})
    }

    return(
        <>
            <div>
                <h1 className="flex justify-center font-bold text-[18px] text-blue-600">
                    Posted Job List
                </h1>
                {filteredJobs.map((item,index) => (
                <section key={item.id}>
                    {editingId===item.id ? (
                        <form onSubmit={handleSaveEdit} className="flex flex-col gap-3 p-4 border border-blue-500 rounded-2xl">
                            <h2 className="font-bold text-blue-600">Edit Job</h2>
                            <input value={editForm.JobTitle||""} onChange={(e)=>setEditForm({...editForm,JobTitle:e.target.value})} className="p-2 border rounded" placeholder="Job Title"/>
                            <input value={editForm.CompanyName||""} onChange={(e)=>setEditForm({...editForm,CompanyName:e.target.value})} className="p-2 border rounded" placeholder="Company Name"/>
                            <input value={editForm.Location||""} onChange={(e)=>setEditForm({...editForm,Location:e.target.value})} className="p-2 border rounded" placeholder="Location"/>
                            <input value={editForm.SalaryRange||""} onChange={(e)=>setEditForm({...editForm,SalaryRange:e.target.value})} className="p-2 border rounded" placeholder="Salary Range"/>
                            <select value={editForm.ExperienceRequired||""} onChange={(e)=>setEditForm({...editForm,ExperienceRequired:e.target.value})} className="p-2 border rounded">
                                <option value="Freshers">Freshers</option>
                                <option value="0–1 Years">0–1 Years</option>
                                <option value="1–3 Years">1–3 Years</option>
                                <option value="3–5 Years">3–5 Years</option>
                            </select>
                            <textarea value={editForm.SkillsRequired||""} onChange={(e)=>setEditForm({...editForm,SkillsRequired:e.target.value})} className="p-2 border rounded" placeholder="Skills Required"/>
                            <select value={editForm.JobType||""} onChange={(e)=>setEditForm({...editForm,JobType:e.target.value})} className="p-2 border rounded">
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Internship">Internship</option>
                            </select>
                            <textarea value={editForm.JobDescription||""} onChange={(e)=>setEditForm({...editForm,JobDescription:e.target.value})} className="p-2 border rounded" placeholder="Job Description"/>
                            <div className="flex gap-2">
                                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                                <button type="button" onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <h1 className="font-semibold text-blue-600">{item.JobTitle}</h1>
                            <div className="m-4">
                                <ul className="flex md:flex-row flex-col md:justify-evenly md:text-[16px] text-[14px]">
                                    <h1 className="flex gap-7  text-black-600"> <p className="text-blue-600">-Company Name </p> {item.CompanyName}</h1>
                                    <h1 className="flex gap-7 text-black-600"> <p className="text-blue-600">-Location </p> {item.Location}</h1>
                                    <h1 className="flex gap-7 text-black-600"> <p className="text-blue-600">-Salary Range </p> {item.SalaryRange}</h1>
                                    <h1 className="flex gap-7 text-black-600"> <p className="text-blue-600">-Appilcant Count </p>1</h1>
                                </ul>
                            </div>
                            <div className="flex gap-4 justify- md:text-[16px] text-[10px]">
                                <button onClick={()=>handleEdit(item)} className="w-full bg-green-500 hover:bg-green-700 active:scale-90 text-white py-2 rounded">Edit</button>
                                <button className="w-full bg-blue-500 hover:bg-blue-700 active:scale-90 text-white py-2 rounded">View Applicant</button>
                                <button onClick={() => dele(item.id)} className="w-full bg-red-500 hover:bg-red-700 active:scale-90 text-white py-2 rounded">Delete</button>
                            </div>
                        </>
                    )}
                    <hr className="mt-4 mb-4 text-blue-600 border-dashed border"/>
                </section>
                ))}
            </div>
        </>
    )
}
export default PostedJobList