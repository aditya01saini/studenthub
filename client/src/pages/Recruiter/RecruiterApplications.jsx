import { useEffect, useState } from "react";

import {
  getRecruiterApplications,
  updateApplicationStatus,
} from "../../services/application.service";

import SearchBar from "../../components/recruiter/SearchBar";
import FilterBar from "../../components/recruiter/FilterBar";
import Pagination from "../../components/recruiter/Pagination";
import ApplicationsTable from "../../components/recruiter/ApplicationsTable";
import StatusActionModal from "../../components/recruiter/StatusActionModal";
import ApplicationDetailsModal from "../../components/recruiter/ApplicationDetailsModal";
const RecruiterApplications = () => {
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("latest");

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedApplication, setSelectedApplication] = useState(null);

  const [viewModalOpen, setViewModalOpen] = useState(false);

  const [viewApplication, setViewApplication] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, [page, search, status, sort]);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const data = await getRecruiterApplications({
        page,
        limit: 10,
        search,
        status,
        sort,
      });

      setApplications(data.applications);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (applicationId, status) => {
    setSelectedApplication(applicationId);
    setSelectedStatus(status);
    setModalOpen(true);
  };

  const confirmStatusUpdate = async (recruiterRemark) => {
    try {
      setSaving(true);

      await updateApplicationStatus(selectedApplication, {
        status: selectedStatus,
        recruiterRemark,
      });

      setModalOpen(false);

      fetchApplications();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleViewApplication = (application) => {
    setViewApplication(application);

    setViewModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Applications</h1>

        <p className="mt-2 text-slate-500">Manage all student applications.</p>
      </div>

      {/* Search & Filter */}

      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <SearchBar
          value={search}
          placeholder="Search Student..."
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <FilterBar
          status={status}
          sort={sort}
          onStatusChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
          onSortChange={(e) => {
            setPage(1);
            setSort(e.target.value);
          }}
        />
      </div>

      {/* Table */}

      {loading ? (
        <div className="rounded-xl bg-white p-10 text-center">
          Loading Applications...
        </div>
      ) : (
        <ApplicationsTable
          applications={applications}
          onStatusChange={handleStatusChange}
          onViewApplication={handleViewApplication}
        />
      )}

      {/* Pagination */}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <StatusActionModal
        open={modalOpen}
        status={selectedStatus}
        loading={saving}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmStatusUpdate}
      />

      <ApplicationDetailsModal
        open={viewModalOpen}
        application={viewApplication}
        onClose={() => {
          setViewModalOpen(false);
          setViewApplication(null);
        }}
      />
    </div>
  );
};

export default RecruiterApplications;
