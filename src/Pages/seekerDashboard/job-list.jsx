import { use } from "react"
import { useEffect, useState } from "react";
function AppliedJobs(){
    const [requiredJobs,setRequiredJobs]=useState([])
        useEffect(() => {
            const user=sessionStorage.getItem("user")
            if(!user) return

            const userData=JSON.parse(user)
            
            fetch("https://jobvacancy-jsus.onrender.com/AppliedJobs")
            .then(res=>res.json())
            .then(data=>{
                const userApplications=data.filter(app=>app.jobSeekerEmail===userData.email)
                setRequiredJobs(userApplications)
            })
            .catch(err=>console.log(err))
        }, [])

        const del=(id)=>{
          fetch(`https://jobvacancy-jsus.onrender.com/AppliedJobs/${id}`,{
            method:"DELETE"
          })
          .then(res=>res.json())
          .then(data=>{
            const user=sessionStorage.getItem("user")
            if(user){
                const userData=JSON.parse(user)
                fetch("https://jobvacancy-jsus.onrender.com/AppliedJobs")
                .then(res=>res.json())
                .then(data=>{
                    const userApplications=data.filter(app=>app.jobSeekerEmail===userData.email)
                    setRequiredJobs(userApplications)
                })
                .catch(err=>{})
            }
          })
          .catch(err=>console.log(err))
        }

    return(
        <>
        <div className=" px-3 sm:px-6 lg:px-10">
        <h1 className="text-center font-bold text-[18px] sm:text-[20px] text-blue-600 mb-4">
          Applied Jobs
        </h1>
      {
        requiredJobs.map((items)=>(
          <div key={items.id}  className="flex flex-col gap-4 mb-4 border border-blue-500 rounded-2xl p-4 sm:p-6 shadow-md">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-gray-800">
                {items.JobTitle}
              </h1>
              <span className="w-fit bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                {items.JobType}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 text-gray-700 text-sm sm:text-base">
              <p className="font-medium">{items.CompanyName}</p>
              <p>📍 {items.Location}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 text-gray-700 text-sm sm:text-base">
              <p>💰 {items.SalaryRange}</p>
              <p>🧑‍💻 {items.ExperienceRequired} years experience</p>
            </div>

            <div>
              <p className="font-bold mb-2 text-sm sm:text-base">
                Skills Required
              </p>
                <span className="bg-gray-200 px-3 py-1 rounded-full text-xs sm:text-sm">
                  {items.SkillsRequired}
                  </span>
            </div>

            <div>
              <p className="font-bold mb-1 text-sm sm:text-base">
                Job Description
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">
                {items.JobDescription}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                items.status === "Shortlisted" ? "bg-green-100 text-green-700" :
                items.status === "Rejected" ? "bg-red-100 text-red-700" :
                "bg-blue-100 text-blue-700"
              }`}>
                Status: {items.status || "Applied"}
              </span>
              <div className="flex gap-2">
                <button  
                  onClick={()=>del(items.id)}
                  className={`px-5 py-2 text-white rounded-full text-sm active:scale-95 shadow-lg bg-red-600 shadow-red-500`}
                > 
                  Delete
                </button>
              </div>
            </div>

          </div>
        )
        )
      }
      </div>
    </>
    )
}
export default AppliedJobs