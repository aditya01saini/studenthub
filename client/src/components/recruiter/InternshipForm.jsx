import Input from "../ui/Input";
import TagInput from "./TagInput";

const InternshipForm = ({
  formData,
  handleChange,
  handleSubmit,
  loading,
  skills,
  setSkills,
  perks,
  setPerks,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-6 text-xl font-bold text-slate-900">
          Basic Information
        </h2>

        <div className="space-y-6">
          <Input
            label="Internship Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Frontend Developer Intern"
            required
          />

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="">Select Category</option>

              <option>Frontend Development</option>

              <option>Backend Development</option>

              <option>Full Stack Development</option>

              <option>Mobile App Development</option>

              <option>Software Development</option>

              <option>AI/ML</option>

              <option>Data Science</option>

              <option>Cyber Security</option>

              <option>UI/UX Design</option>

              <option>DevOps</option>

              <option>Cloud Computing</option>

              <option>Blockchain</option>

              <option>Digital Marketing</option>

              <option>Content Writing</option>

              <option>Graphic Design</option>

              <option>Human Resources</option>

              <option>Finance</option>

              <option>Business Development</option>

              <option>Sales</option>

              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>

            <textarea
              rows={6}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the internship..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        </div>
      </div>

      {/* Job Details */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-6 text-xl font-bold text-slate-900">Job Details</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Work Mode */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Work Mode
            </label>

            <select
              name="workMode"
              value={formData.workMode}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="">Select Work Mode</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
            </select>
          </div>

          {/* Location */}
          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Noida, Uttar Pradesh"
            required
          />

          {/* Stipend */}
          <Input
            label="Monthly Stipend (₹)"
            type="number"
            name="stipend"
            value={formData.stipend}
            onChange={handleChange}
            placeholder="15000"
            required
          />

          {/* Openings */}
          <Input
            label="Openings"
            type="number"
            name="openings"
            value={formData.openings}
            onChange={handleChange}
            placeholder="5"
            required
          />

          {/* Duration */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Duration
            </label>

            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="">Select Duration</option>
              <option value="1 Month">1 Month</option>
              <option value="2 Months">2 Months</option>
              <option value="3 Months">3 Months</option>
              <option value="4 Months">4 Months</option>
              <option value="5 Months">5 Months</option>
              <option value="6 Months">6 Months</option>
              <option value="12 Months">12 Months</option>
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Experience
            </label>

            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="Fresher">Fresher</option>
              <option value="0-1 Years">0-1 Years</option>
              <option value="1-2 Years">1-2 Years</option>
              <option value="2-3 Years">2-3 Years</option>
            </select>
          </div>
        </div>
      </div>

      {/* Skills & Perks */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-6 text-xl font-bold text-slate-900">
          Skills & Perks
        </h2>

        <div className="space-y-6">
          <TagInput
            label="Required Skills"
            placeholder="Type a skill and press Enter"
            tags={skills}
            setTags={setSkills}
          />

          <TagInput
            label="Perks"
            placeholder="Type a perk and press Enter"
            tags={perks}
            setTags={setPerks}
          />
        </div>
      </div>

      {/* Dates */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-6 text-xl font-bold text-slate-900">Dates</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />

          <Input
            label="Application Deadline"
            type="date"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Certificate */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="certificateProvided"
            checked={formData.certificateProvided}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "certificateProvided",
                  value: e.target.checked,
                },
              })
            }
          />

          <span className="text-sm font-medium text-slate-700">
            Certificate will be provided
          </span>
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving..." : "Publish Internship"}
        </button>
      </div>
    </form>
  );
};

export default InternshipForm;
