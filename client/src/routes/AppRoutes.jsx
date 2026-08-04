import { Routes, Route } from "react-router-dom";
import Landing from "../pages/landing/Home";
import Login from "../pages/Auth/Login";
import ChooseRole from "../pages/Auth/ChooseRole";
import StudentRegister from "../pages/Auth/StudentRegister";
import RecruiterRegister from "../pages/Auth/RecruiterRegister";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";
import StudentDashboard from "../pages/student/StudentDashboard.jsx";
import StudentLayout from "../layouts/StudentLayout";
import StudentProfile from "../pages/student/StudentProfile";
import EditStudentProfile from "../pages/student/EditStudentProfile";
import StudentProjects from "../pages/student/StudentProjects";
import CreateProject from "../pages/student/CreateProject";
import ProjectDetails from "../pages/student/ProjectDetails";
import EditProject from "../pages/student/EditProject";
import StudentNotes from "../pages/student/StudentNotes";
import CreateNote from "../pages/student/CreateNote";
import NoteDetails from "../pages/student/NoteDetails";
import EditNote from "../pages/student/EditNote";
import StudentInternships from "../pages/student/StudentInternships";
import InternshipDetails from "../pages/student/InternshipDetails";
import StudentApplications from "../pages/student/StudentApplications";
import StudentNotifications from "../pages/student/StudentNotifications";
import RecruiterLayout from "../layouts/RecruiterLayout";
import RecruiterDashboard from "../pages/Recruiter/RecruiterDashboard";
import RecruiterProfile from "../pages/Recruiter/RecruiterProfile";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<Landing />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />

      {/* Choose Account Type */}
      <Route path="/register" element={<ChooseRole />} />

      {/* Student Register */}
      <Route path="/register/student" element={<StudentRegister />} />

      {/* Recruiter Register */}
      <Route path="/register/recruiter" element={<RecruiterRegister />} />

      {/* Forgot Password */}
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Reset Password */}
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Student Protected Routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="profile/edit" element={<EditStudentProfile />} />
        <Route path="projects" element={<StudentProjects />} />
        <Route path="projects/new" element={<CreateProject />} />
        <Route path="projects/:projectId" element={<ProjectDetails />} />
        <Route path="projects/:projectId/edit" element={<EditProject />} />
        <Route path="notes" element={<StudentNotes />} />

        <Route path="notes/new" element={<CreateNote />} />
        <Route path="notes/:noteId" element={<NoteDetails />} />
        <Route path="notes/:noteId/edit" element={<EditNote />} />
        <Route path="internships" element={<StudentInternships />} />
        <Route
          path="internships/:internshipId"
          element={<InternshipDetails />}
        />
        <Route path="applications" element={<StudentApplications />} />
        <Route path="notifications" element={<StudentNotifications />} />
      </Route>
      {/* Recruiter Protected Routes */}
      <Route
        path="/recruiter"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <RecruiterLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<RecruiterDashboard />} />
        <Route path="profile" element={<RecruiterProfile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
