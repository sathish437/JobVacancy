# Job Vacancy Portal

A full-stack job board application built with React 19, Vite, TailwindCSS, and React Router. The application allows employers to post jobs and job seekers to browse and apply for positions.

## 🚀 Features

### For Employers
- **Registration**: Register company details with contact information
- **Login**: Secure login with email and password
- **Post Jobs**: Create job listings with detailed information (title, company, location, salary, requirements, description)
- **Manage Posted Jobs**: View, edit, and delete posted job listings
- **View Applicants**: Track applicants for posted jobs (placeholder)

### For Job Seekers
- **Registration**: Register with personal details, skills, experience, and resume
- **Login**: Secure login with email and password
- **Browse Jobs**: View all available job postings
- **Apply for Jobs**: One-click application to job listings
- **Track Applications**: View applied jobs and their status
- **Profile Management**: View and manage personal profile

## 🛠️ Tech Stack

- **Frontend**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.11.0
- **Styling**: TailwindCSS 4.1.18
- **Mock API**: JSON Server 0.17.4
- **State Management**: React Hooks (useState, useEffect)
- **Session Storage**: For user session persistence

## 📋 Project Structure

```
Job-vacouncy/
├── public/                 # Static assets
├── src/
│   ├── Pages/
│   │   ├── Login.jsx              # Role selection for registration
│   │   ├── JobSeeker.jsx          # Job seeker dashboard
│   │   ├── Employer.jsx           # Employer dashboard
│   │   ├── RoleBaseReg/
│   │   │   ├── Userlogin.jsx      # Main login page
│   │   │   ├── empReg.jsx         # Employer registration
│   │   │   └── jobSeekReg.jsx     # Job seeker registration
│   │   ├── EmployerDashboard/
│   │   │   ├── PostJob.jsx        # Post new job
│   │   │   ├── PostedJobList.jsx  # View/delete posted jobs
│   │   │   └── Applicant.jsx      # View applicants (placeholder)
│   │   └── seekerDashboard/
│   │       ├── job-list.jsx       # Applied jobs
│   │       ├── required.jsx       # Available jobs to apply
│   │       └── profile.jsx        # User profile
│   ├── App.jsx                    # Main router configuration
│   ├── main.jsx                   # Application entry point
│   ├── index.css                  # Global styles
│   └── App.css                    # Component styles
├── postJob.json                   # Mock database (JSON Server)
├── package.json                   # Dependencies and scripts
└── vite.config.js                 # Vite configuration
```

## 🗄️ Data Structure

The application uses `postJob.json` as a mock database with the following collections:

### JobDetails
```json
{
  "id": "1",
  "JobTitle": "Linux Server Administrator",
  "CompanyName": "GCES",
  "Location": "dhinesh bed",
  "SalaryRange": "10-12k",
  "ExperienceRequired": "3–5 Years",
  "SkillsRequired": "BASH,SCRIPT,CI/CD,DEVOPS",
  "JobType": "Full-Time",
  "JobDescription": "Job description here"
}
```

### AppliedJobs
```json
{
  "id": "1",
  "JobTitle": "Linux Server Administrator",
  "CompanyName": "GCES",
  "Location": "dhinesh bed",
  "SalaryRange": "10-12k",
  "ExperienceRequired": "3–5 Years",
  "SkillsRequired": "BASH,SCRIPT,CI/CD,DEVOPS",
  "JobType": "Full-Time",
  "JobDescription": "Job description here"
}
```

### EmployerDetails
```json
{
  "id": "1",
  "role": "Employer",
  "CompanyName": "GCES",
  "ContactPerson": "John Doe",
  "Email": "company@gmail.com",
  "Password": "password",
  "ConfirmPassword": "password"
}
```

### JobSeekerDetails
```json
{
  "id": "1",
  "role": "JobSeeker",
  "fullName": "John Doe",
  "email": "user@gmail.com",
  "phone": "9876543210",
  "location": "Chennai",
  "password": "password",
  "confirmPassword": "password",
  "skills": "React, JavaScript",
  "experience": "3",
  "education": "B.E CSE",
  "resume": "path/to/resume"
}
```

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Setup Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd Job-vacouncy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the JSON Server (Mock API)**
   ```bash
   npm run server
   ```
   This will start the JSON Server on `http://localhost:3000` and serve the `postJob.json` file.

4. **Start the React Development Server**
   Open a new terminal and run:
   ```bash
   npm run dev
   ```
   This will start the React app on `http://localhost:5173` (or another available port).

## 🎯 How It Works

### 1. Registration Flow

**Step 1: Role Selection** (`/login`)
- User selects role: Employer or JobSeeker
- Creates a placeholder entry with ID and role in respective collection
- Redirects to registration form

**Step 2: Employer Registration** (`/empReg`)
- Collects: Company Name, Contact Person, Email, Password
- Validates: Email format (@gmail.com), password match, terms acceptance
- Updates entry via PATCH to `EmployerDetails/{id}`
- Redirects to login

**Step 3: Job Seeker Registration** (`/jobSeekReg`)
- Collects: Full Name, Email, Phone, Location, Password, Skills, Experience, Education, Resume
- Validates: Email format, password match, phone (10 digits), experience (0-10 years)
- Updates entry via PATCH to `JobSeekerDetails/{id}`
- Redirects to login

### 2. Login Flow (`/`)
- User enters: Email, Password, Role
- Fetches both `EmployerDetails` and `JobSeekerDetails`
- Validates credentials against respective collection
- Stores email in sessionStorage
- Routes to: `/employer` or `/jobSeeker`

### 3. Employer Dashboard (`/employer`)

**Post Job Tab**
- Form with fields: Job Title, Company Name, Location, Salary Range, Experience, Skills, Job Type, Description
- POST request to `JobDetails`
- Auto-generates ID based on array length

**Posted Job List Tab**
- Fetches all jobs from `JobDetails`
- Displays job cards with details
- Actions: Edit (placeholder), View Applicant (placeholder), Delete (functional - DELETE request)

**Applicant Details Tab**
- Currently empty placeholder

### 4. Job Seeker Dashboard (`/jobSeeker`)

**Applied Jobs Tab**
- Fetches from `AppliedJobs`
- Displays applied job cards
- Actions: Delete (removes from AppliedJobs), "No Response" (disabled button)

**Required Jobs Tab**
- Fetches from `JobDetails` and `AppliedJobs`
- Tracks applied job IDs to disable "Apply" button
- Action: Apply Now (POST to `AppliedJobs`)

**My Profile Tab**
- Currently has hardcoded data (not dynamic)
- Fetches user data from `JobSeekerDetails` but doesn't display it
- Placeholder for resume view

## 🔌 API Endpoints

The JSON Server provides RESTful API endpoints:

- `GET /EmployerDetails` - Get all employers
- `POST /EmployerDetails` - Create new employer
- `PATCH /EmployerDetails/{id}` - Update employer
- `GET /JobSeekerDetails` - Get all job seekers
- `POST /JobSeekerDetails` - Create new job seeker
- `PATCH /JobSeekerDetails/{id}` - Update job seeker
- `GET /JobDetails` - Get all jobs
- `POST /JobDetails` - Create new job
- `DELETE /JobDetails/{id}` - Delete job
- `GET /AppliedJobs` - Get all applied jobs
- `POST /AppliedJobs` - Apply for job
- `DELETE /AppliedJobs/{id}` - Remove application

## 🎨 Styling

The application uses TailwindCSS for styling with:
- Responsive design (mobile-first approach)
- Blue color scheme
- Rounded corners and shadows
- Hover and active states for buttons
- Flexbox and grid layouts

## 🔐 Session Management

- Uses `sessionStorage` to store user email after login
- Email is used to identify the current user
- Session persists until browser tab is closed

## 🚧 Current Limitations

1. **Profile page** - Hardcoded data, not displaying actual user info
2. **Applicant Details** - Empty component
3. **Edit functionality** - Not implemented in PostedJobList
4. **View Applicant** - Not implemented
5. **Logout** - Buttons exist but no functionality
6. **No authentication middleware** - Routes unprotected
7. **Data persistence** - Relies on external JSON Server (changes reset on server restart)
8. **Password security** - Stored in plain text (not hashed)

## 🛡️ Security Considerations

**⚠️ This is a demo/prototype application. For production use:**
- Implement proper authentication (JWT, OAuth)
- Hash passwords (bcrypt, argon2)
- Add input validation and sanitization
- Implement CSRF protection
- Add rate limiting
- Use environment variables for sensitive data
- Implement proper error handling
- Add logging and monitoring

## 📝 Available Scripts

- `npm run dev` - Start React development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run server` - Start JSON Server (mock API)

## 🤝 Contributing

This is a learning project. Feel free to fork and modify for your needs.

## 📄 License

This project is open source and available for educational purposes.
