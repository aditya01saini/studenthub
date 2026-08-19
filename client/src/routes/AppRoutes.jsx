import { Routes, Route } from "react-router-dom";

import Landing from "../pages/landing/Home";

import Login from "../pages/Auth/Login";
import ChooseRole from "../pages/Auth/ChooseRole";
import StudentRegister from "../pages/Auth/StudentRegister";
import RecruiterRegister from "../pages/Auth/RecruiterRegister";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";

import ProtectedRoute from "./ProtectedRoute";

// ===============================
// Student
// ===============================

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

import Community from "../pages/student/Community";

// ===============================
// Recruiter
// ===============================

import RecruiterLayout from "../layouts/RecruiterLayout";

import RecruiterDashboard from "../pages/Recruiter/RecruiterDashboard";
import RecruiterProfile from "../pages/Recruiter/RecruiterProfile";
import MyInternships from "../pages/Recruiter/MyInternships";
import CreateInternship from "../pages/Recruiter/CreateInternship";
import EditInternship from "../pages/Recruiter/EditInternship";
import RecruiterNotifications from "../pages/Recruiter/RecruiterNotifications";
import Applicants from "../pages/Recruiter/Applicants";
import RecruiterApplications from "../pages/Recruiter/RecruiterApplications";
import RecruiterCommunity from "../pages/Recruiter/RecruiterCommunity";
// ===============================
// Admin
// ===============================

import AdminLayout from "../layouts/AdminLayout";

import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminUsers from "../pages/Admin/AdminUsers";
import AdminRecruiters from "../pages/Admin/AdminRecruiters";
import AdminInternships from "../pages/Admin/AdminInternships";
import AdminApplications from "../pages/Admin/AdminApplications";
import AdminNotifications from "../pages/Admin/AdminNotifications";
import AdminSettings from "../pages/Admin/AdminSettings";

import PublicInternships from "../pages/public/PublicInternships";
import PublicInternshipDetails from "../pages/public/PublicInternshipDetails";

import Students from "../pages/public/Students";

import PublicStudentProfile from "../pages/public/PublicStudentProfile";
import Projects from "../pages/public/Projects.jsx";
import PublicProjectDetails from "../pages/public/PublicProjectDetails";
// ===============================
// App Routes
// ===============================

const AppRoutes = () => {
  return (
    <Routes>
      {/* ===============================
          Landing
      =============================== */}

      <Route path="/" element={<Landing />} />

      {/* publicRoutes */}
      <Route path="/internships" element={<PublicInternships />} />
      <Route
        path="/internships/:internshipId"
        element={<PublicInternshipDetails />}
      />
      <Route path="/students" element={<Students />} />

      <Route path="/students/:studentId" element={<PublicStudentProfile />} />

      <Route path="/projects" element={<Projects />} />

      <Route path="/projects/:projectId" element={<PublicProjectDetails />} />

      {/* ===============================
          Authentication
      =============================== */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<ChooseRole />} />

      <Route path="/register/student" element={<StudentRegister />} />

      <Route path="/register/recruiter" element={<RecruiterRegister />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ===============================
          Student Protected Routes
      =============================== */}

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

        <Route path="community" element={<Community />} />
      </Route>

      {/* ===============================
          Recruiter Protected Routes
      =============================== */}

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

        <Route path="internships" element={<MyInternships />} />

        <Route path="internships/create" element={<CreateInternship />} />

        <Route path="internships/edit/:id" element={<EditInternship />} />

        <Route path="applications" element={<RecruiterApplications />} />

        <Route path="notifications" element={<RecruiterNotifications />} />
        <Route path="community" element={<RecruiterCommunity />} />
        <Route
          path="internships/:internshipId/applications"
          element={<Applicants />}
        />
      </Route>

      {/* ===============================
          Admin Protected Routes
      =============================== */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Admin Dashboard */}

        <Route path="dashboard" element={<AdminDashboard />} />

        {/* User Management */}

        <Route path="users" element={<AdminUsers />} />

        {/* Recruiter Management */}

        <Route path="recruiters" element={<AdminRecruiters />} />

        {/* Internship Management */}

        <Route path="internships" element={<AdminInternships />} />

        <Route path="applications" element={<AdminApplications />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
