import Input from "../ui/Input";
import Button from "../ui/Button";
import Card from "../ui/Card";

const CompanyInfoForm = ({ formData, handleChange, handleSubmit, loading }) => {
  return (
    <Card>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Company Information
        </h2>

        <p className="mt-2 text-slate-500">
          Keep your company details up to date so students can know more about
          your organization.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Microsoft"
            required
          />

          <Input
            label="Website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://example.com"
          />

          <Input
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            placeholder="Software Development"
          />

          <Input
            label="Company Size"
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            placeholder="51-200 Employees"
          />

          <div className="md:col-span-2">
            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Noida, Uttar Pradesh"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Company Description
          </label>

          <textarea
            name="description"
            rows={6}
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell students about your company..."
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-all duration-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CompanyInfoForm;
