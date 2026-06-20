import { useEffect, useState } from "react";
function RequiredJobs() {
    const [requiredJobs,setRequiredJobs]=useState([])
    const [applied, setApplied] = useState([]);
    useEffect(()=>{
      fetch("https://jobvacancy-jsus.onrender.com/JobDetails")
      .then(res=>res.json())
      .then(data=>setRequiredJobs(data))
      .catch(err=>console.log(err))

      fetch("https://jobvacancy-jsus.onrender.com/AppliedJobs")
      .then(res=>res.json())
      .then(data=>{
        const ids=data.map(job=>job.id)
        setApplied(ids)
      })
    },[])

    const getData=(items)=>{
      const user=sessionStorage.getItem("user")
      if(!user){
        alert("Please login to apply")
        return
      }
      const userData=JSON.parse(user)

      const applicationData={
        ...items,
        jobSeekerId:userData.id,
        jobSeekerEmail:userData.email,
        jobSeekerName:userData.name,
        appliedDate:new Date().toISOString(),
        status:"Applied"
      }

      fetch("https://jobvacancy-jsus.onrender.com/AppliedJobs",{
        method:"POST",
        headers:{"content-Type":"application/json"},
        body:JSON.stringify(applicationData)
      })
      .then(res=>res.json())
      .then(data=>{
        setApplied([...applied,items.id])
      })
      .catch(err=>console.log(err))

      alert("Applied Successfully ✅")
    }
  return (
    <>
      <div className=" px-3 sm:px-6 lg:px-10">
        <h1 className="text-center font-bold text-[18px] sm:text-[20px] text-blue-600 mb-4">
          Required Jobs
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

            <div className="flex flex-col sm:flex-row sm:justify-end gap-2">
              <button
                onClick={() => getData(items)}
                disabled={applied.includes(items.id)}
                className={`px-5 py-2 text-white rounded-full text-sm active:scale-95 shadow-lg
                  ${applied.includes(items.id) 
                    ?   "bg-green-600 cursor-not-allowed"
                    : "bg-blue-600 shadow-blue-500"}`}
              >
                {applied.includes(items.id) ? "Applied ✅" : "Apply Now"}
              </button>
            </div>

          </div>
        )
        )
      }
      </div>
    </>
  );
}

export default RequiredJobs;
