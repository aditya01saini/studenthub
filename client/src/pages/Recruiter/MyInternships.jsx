import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getMyInternships,
  deleteInternship,
} from "../../services/internship.service";

import SearchBar from "../../components/recruiter/SearchBar";
import FilterBar from "../../components/recruiter/FilterBar";
import InternshipTable from "../../components/recruiter/InternshipTable";
import Pagination from "../../components/recruiter/Pagination";

const MyInternships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("latest");

  const fetchInternships = async () => {
    try {
      setLoading(true);

      const response = await getMyInternships({
        page,
        limit: 10,
        search,
        status,
        sort,
      });

      setInternships(response.internships);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, [page, search, status, sort]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this internship?",
    );

    if (!confirmDelete) return;

    try {
      await deleteInternship(id);
      fetchInternships();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Internships</h1>

          <p className="mt-2 text-slate-500">
            Manage all internships posted by your company.
          </p>
        </div>

        <Link
          to="/recruiter/internships/create"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          + Post Internship
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SearchBar
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          placeholder="Search internships..."
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
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-slate-500">Loading internships...</p>
        </div>
      ) : (
        <InternshipTable internships={internships} onDelete={handleDelete} />
      )}

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default MyInternships;
