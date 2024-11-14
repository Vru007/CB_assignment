**Project Overview**
This project is a candidate assessment tracking system built using Next.js for the frontend and Node.js/Express.js for the backend. The system allows you to manage the assessment process for job candidates, including adding new candidates, updating their assessment statuses, and filtering/sorting the candidate list.


**Frontend:**

**Framework**: Next.js with server-side rendering for optimized load times and SEO.
**Interface**: Dashboard listing candidates and their assessment statuses .

**Features:**

**Add new candidates.**
**Update assessment statuses** (Pending, accepted, rejected, interviewed(added this state for future purpose)).
**Filter and sort by name, status, or date.**
**Also added a filtering based on the position the candidate applied for**

Responsive Design: Mobile and desktop compatibility.

UI Components:

Use ShadCN for consistent styling and design.
Reusable components like buttons, modals, tables, and input forms with validation.


**Backend API:**

Framework: Node.js backend with RESTful API endpoints using Express.js.
Endpoints:

Fetch candidate list.
Add a new candidate.
Update a candidate's status.


**Database**: PostgreSQL with Pisma as ORM.
**Bonus**: Integrate Supabase for real-time updates.


**Setup and Installation**

**Frontend:**

Clone the repository: git clone https://github.com/Vru007/CB_assignment/tree/main
Navigate to the frontend directory: cd frontend
Install dependencies: npm install
Start the development server: npm run dev
Open the application in your browser: http://localhost:3000

Backend:

Navigate to the backend directory: cd backend
Install dependencies: npm install
Set up the database connection in the .env file
Start the server: npm start
The backend API will be accessible at http://localhost:8000/api


**Deployment**

**Frontend:**

The frontend is deployed on Vercel. You can access the **live demo at: https://cb-assignmentfront-d1kx2668n-vru007s-projects.vercel.app/**


**Backend:**

The backend is deployed on Render. You can access the **live API at: https://cb-assignment.onrender.com/**
To access the routes add /api/candidates




