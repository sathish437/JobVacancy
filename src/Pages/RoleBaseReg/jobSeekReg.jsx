import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function JobSeekReg(){
  const [check,setCheck]=useState("")
  const navigate=useNavigate()
  const [id,setId]=useState()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    skills: '',
    experience: '',
    education: '',
    resume: null
  });

  let res={
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    location: formData.location,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
    skills: formData.skills,
    experience: formData.experience,
    education: formData.education,
    resume: formData.resume
  }

  const handleChange = (e) => {
    const { name, value, file } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: file ? file[0] : value
    }));
  };

  useEffect(()=>{
    fetch("http://localhost:3000/JobSeekerDetails")
    .then(res=>res.json())
    .then(data=>setId((data.length).toString()))
    .catch(err=>console.log(err))
  })
  
  const reg = (id) => {
    if(!formData.email.endsWith("@gmail.com")){
        alert(`Enter a valid email`)
    }else if(check===""){ 
        alert("Please accept the terms and conditions")
    }else if(formData.password!==formData.confirmPassword){
        alert("Passwords do not match")
    }else if(Number(formData.experience)>=10){
      alert("Experience should be a number between 0-10")
    }else if(!(Number(formData.phone)) ||  (formData.phone).length!==10){
      alert("Enter a valid phone number")
    }else{
      const finalData={
        ...res,
        id:id,
        role:"JobSeeker"
      }
      fetch(`http://localhost:3000/JobSeekerDetails/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(finalData)
      })
      .then(res=>res.json())
      .then(data=>{
        alert("Registration successful!")
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          location: '',
          password: '',
          confirmPassword: '',
          skills: '',
          experience: '',
          education: '',
          resume: null
        })
        setCheck("")
        navigate("/")
      })
      .catch(err=>{})
    }
  }
return (
  <main className="min-h-screen w-full bg-blue-600 flex justify-center items-start px-4 sm:px-6 lg:px-0 py-10">
    <section className="bg-white w-full max-w-md sm:max-w-lg rounded-3xl p-6 sm:p-8 shadow-xl">
      
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-8">
        <span className="underline decoration-blue-600">JobSeeker</span> Registration
      </h1>

      <div className="flex flex-col gap-6">

        <section>
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">
            Personal Info
          </h2>

          <div className="flex flex-col gap-3">
            <input onChange={handleChange} name="fullName" type="text" placeholder="Full Name"
              className="p-3 border-b-2 border-gray-400 focus:border-blue-600 outline-none rounded-md w-full" />

            <input onChange={handleChange} name="email" type="email" placeholder="Email"
              className="p-3 border-b-2 border-gray-400 focus:border-blue-600 outline-none rounded-md w-full" />

            <input onChange={handleChange} name="phone" type="text" placeholder="Phone"
              className="p-3 border-b-2 border-gray-400 focus:border-blue-600 outline-none rounded-md w-full" />

            <input onChange={handleChange} name="location" type="text" placeholder="Location"
              className="p-3 border-b-2 border-gray-400 focus:border-blue-600 outline-none rounded-md w-full" />

            <input onChange={handleChange} name="password" type="password" placeholder="Create Password"
              className="p-3 border-b-2 border-gray-400 focus:border-blue-600 outline-none rounded-md w-full" />

            <input onChange={handleChange} name="confirmPassword" type="password" placeholder="Confirm Password"
              className="p-3 border-b-2 border-gray-400 focus:border-blue-600 outline-none rounded-md w-full" />
          </div>
        </section>

        <section>
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">
            Skills & Experience
          </h2>

          <div className="flex flex-col gap-3">
            <input onChange={handleChange} name="skills" placeholder="Skills"
              className="p-3 border-b-2 border-gray-400 focus:border-blue-600 outline-none rounded-md w-full" />

            <input onChange={handleChange} name="experience" placeholder="Experience (years)"
              className="p-3 border-b-2 border-gray-400 focus:border-blue-600 outline-none rounded-md w-full" />

            <input onChange={handleChange} name="education" placeholder="Education"
              className="p-3 border-b-2 border-gray-400 focus:border-blue-600 outline-none rounded-md w-full" />
          </div>
        </section>

        <section>
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">
            Resume
          </h2>

          <input onChange={handleChange} name="resume" type="file"
            className="w-full text-sm border rounded-md p-2" />
        </section>
      </div>

      <label className="flex items-start gap-2 mt-6 text-sm text-gray-600">
        <input onChange={(e)=>setCheck(e.target.value)} type="checkbox" className="mt-1 accent-blue-600" />
        I accept all terms & conditions
      </label>

      <button
        onClick={() => reg(id)}
        className="w-full bg-blue-600 mt-6 p-3 rounded-2xl text-white font-semibold active:scale-95 transition"
      >
        Register Now
      </button>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?
        <a href="/login" className="ml-1 text-blue-600 font-semibold hover:underline">
          Login now
        </a>
      </p>

    </section>
  </main>
);

}

export default JobSeekReg