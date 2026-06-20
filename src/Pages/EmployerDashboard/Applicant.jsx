import { useEffect, useState } from "react"

function Applicant(){
    const [jobsWithApplicants,setJobsWithApplicants]=useState([])

    useEffect(()=>{
        const user=sessionStorage.getItem("user")
        if(!user) return

        const userData=JSON.parse(user)

        Promise.all([
            fetch("http://localhost:3000/JobDetails").then(res=>res.json()),
            fetch("http://localhost:3000/AppliedJobs").then(res=>res.json()),
            fetch("http://localhost:3000/JobSeekerDetails").then(res=>res.json())
        ])
        .then(([jobs,appliedJobs,seekers])=>{
            const employerJobs=jobs.filter(job=>job.postedBy===userData.id)
            const jobsWithApplicantsData=employerJobs.map(job=>{
                const applicantsForJob=appliedJobs.filter(applied=>applied.id===job.id)
                const applicantsWithDetails=applicantsForJob.map(applied=>{
                    const seeker=seekers.find(s=>s.email===applied.jobSeekerEmail)
                    return {...applied,seekerDetails:seeker}
                })
                return {...job,applicants:applicantsWithDetails}
            })
            setJobsWithApplicants(jobsWithApplicantsData)
        })
        .catch(err=>console.log(err))
    },[])

    const updateStatus=(applicationId,newStatus)=>{
        fetch(`http://localhost:3000/AppliedJobs/${applicationId}`,{
            method:"PATCH",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({status:newStatus})
        })
        .then(res=>res.json())
        .then(()=>{
            setJobsWithApplicants(prev=>prev.map(job=>({
                ...job,
                applicants:job.applicants.map(app=>
                    app.id===applicationId ? {...app,status:newStatus} : app
                )
            })))
        })
        .catch(err=>console.log(err))
    }

    return(
        <>
            <h1 className="flex justify-center font-bold text-[18px] text-blue-600 mb-4">Applicant Details</h1>
            {jobsWithApplicants.length===0 ? (
                <p className="text-center text-gray-600">No jobs posted yet</p>
            ) : (
                jobsWithApplicants.map(job=>(
                    <div key={job.id} className="mb-6 border border-blue-300 rounded-xl p-4">
                        <h2 className="font-bold text-blue-600 text-lg mb-3">{job.JobTitle}</h2>
                        {job.applicants && job.applicants.length>0 ? (
                            <div className="space-y-3">
                                {job.applicants.map((applicant,idx)=>(
                                    <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                                        {applicant.seekerDetails ? (
                                            <div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-3">
                                                    <p><span className="font-semibold">Name:</span> {applicant.seekerDetails.fullName}</p>
                                                    <p><span className="font-semibold">Email:</span> {applicant.seekerDetails.email}</p>
                                                    <p><span className="font-semibold">Phone:</span> {applicant.seekerDetails.phone}</p>
                                                    <p><span className="font-semibold">Location:</span> {applicant.seekerDetails.location}</p>
                                                    <p><span className="font-semibold">Skills:</span> {applicant.seekerDetails.skills}</p>
                                                    <p><span className="font-semibold">Experience:</span> {applicant.seekerDetails.experience} years</p>
                                                    <p><span className="font-semibold">Education:</span> {applicant.seekerDetails.education}</p>
                                                </div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="font-semibold text-sm">Status:</span>
                                                    <select 
                                                        value={applicant.status||"Applied"} 
                                                        onChange={(e)=>updateStatus(applicant.id,e.target.value)}
                                                        className="p-1 border rounded text-sm"
                                                    >
                                                        <option value="Applied">Applied</option>
                                                        <option value="Shortlisted">Shortlisted</option>
                                                        <option value="Rejected">Rejected</option>
                                                    </select>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-gray-600">Applicant details not found</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600">No applicants for this job</p>
                        )}
                    </div>
                ))
            )}
        </>
    )
}
export default Applicant