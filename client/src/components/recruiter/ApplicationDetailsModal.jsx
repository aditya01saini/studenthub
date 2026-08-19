import {
  Mail,
  GraduationCap,
  Code2,
  FileText,
  CalendarDays,
  MessageSquare,
  X,
} from "lucide-react";

import ResumeButton from "./ResumeButton";
import ApplicationStatusBadge from "./ApplicationStatusBadge";

const ApplicationDetailsModal = ({ open, application, onClose }) => {
  if (!open || !application) return null;

  const student = application.student;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Header */}

        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-8 py-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Student Application
          </h2>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}

        <div className="space-y-8 p-8">
          {/* Student */}

          <div className="flex flex-col items-center text-center">
            <img
              src={
                student?.profileImage ||
                `https://ui-avatars.com/api/?name=${
                  student?.user?.fullName || "Student"
                }`
              }
              alt="Student"
              className="h-28 w-28 rounded-full border-4 border-indigo-100 object-cover shadow"
            />

            <h2 className="mt-5 text-3xl font-bold">
              {student?.user?.fullName}
            </h2>

            <p className="mt-1 text-slate-500">{student?.course}</p>
          </div>

          {/* Info */}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <Mail className="text-indigo-600" />

                <span>{student?.user?.email}</span>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <GraduationCap className="text-indigo-600" />

                <span>{student?.college}</span>
              </div>
            </div>
          </div>

          {/* Skills */}

          <div>
            <div className="mb-4 flex items-center gap-2">
              <Code2 className="text-indigo-600" />

              <h3 className="text-xl font-semibold">Skills</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {student?.skills?.length ? (
                student.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-slate-500">No skills added.</p>
              )}
            </div>
          </div>

          {/* Resume */}

          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="mb-4 flex items-center gap-2">
              <FileText className="text-indigo-600" />

              <h3 className="text-xl font-semibold">Resume</h3>
            </div>

            {application.resumeUrl ? (
              <ResumeButton url={application.resumeUrl} />
            ) : (
              <p className="text-slate-500">Resume not uploaded.</p>
            )}
          </div>

          {/* Cover Letter */}

          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="mb-4 flex items-center gap-2">
              <MessageSquare className="text-indigo-600" />

              <h3 className="text-xl font-semibold">Cover Letter</h3>
            </div>

            <p className="leading-7 text-slate-600">
              {application.coverLetter || "No cover letter submitted."}
            </p>
          </div>

          {/* Bottom */}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="mb-2 flex items-center gap-2">
                <CalendarDays className="text-indigo-600" />

                <h4 className="font-semibold">Applied On</h4>
              </div>

              <p className="text-slate-600">
                {new Date(application.appliedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="mb-2">
                <h4 className="font-semibold">Application Status</h4>
              </div>

              <ApplicationStatusBadge status={application.status} />
            </div>
          </div>

          {/* Recruiter Remark */}

          {application.recruiterRemark && (
            <div className="rounded-2xl border border-slate-200 bg-amber-50 p-6">
              <h3 className="mb-3 text-lg font-semibold">Recruiter Remark</h3>

              <p className="leading-7 text-slate-700">
                {application.recruiterRemark}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;
