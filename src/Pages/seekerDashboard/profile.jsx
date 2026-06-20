import { useEffect, useState } from "react";

function Profile() {
    const [userProfile,setUserProfile]=useState(null)

    useEffect(() => {
        const user=sessionStorage.getItem("user")
        if(!user) return

        const userData=JSON.parse(user)
        
        fetch("http://localhost:3000/JobSeekerDetails")
        .then(res => res.json())
        .then(data => {
            const profile=data.find(user => user.email === userData.email)
            setUserProfile(profile)
        })
        .catch(err => {});
    }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-300 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg backdrop-blur-xl bg-white/60 border border-gray-200 rounded-3xl p-8 text-gray-800 shadow-xl">
        <h1 className="text-center font-bold text-[18px] sm:text-[20px] text-blue-600 mb-4">
            💻 My Profile
        </h1>
            
        {userProfile ? (
            <>
                <div className="flex items-center gap-5 mb-8">
                     <div>
                        <h1 className="text-2xl font-bold">{userProfile.fullName}</h1>
                        <p className="text-sm text-gray-600">Job Seeker</p>
                    </div>
                </div>

                <div className="space-y-4 text-sm">
                    <p>📧 {userProfile.email}</p>
                    <p>📞 {userProfile.phone}</p>
                    <p>📍 {userProfile.location}</p>
                </div>

                <hr className="border-gray-300 my-6" />

                <h2 className="font-semibold mb-4">Skills</h2>
                <div className="grid grid-cols-2 gap-3 text-sm">
                    {userProfile.skills && userProfile.skills.split(',').map((skill,idx)=>(
                        <span key={idx} className="bg-blue-100 text-blue-700 rounded-xl py-2 text-center font-medium">{skill.trim()}</span>
                    ))}
                </div>

                <div className="mt-6 space-y-3 text-sm">
                    <p><span className="font-semibold">Experience:</span> {userProfile.experience} years</p>
                    <p><span className="font-semibold">Education:</span> {userProfile.education}</p>
                </div>

                <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
                    View Resume
                </button>
            </>
        ) : (
            <p className="text-center text-gray-600">Loading profile...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
