import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getMyInternships,
  deleteInternship,
} from "../../services/internship.service";

import SearchBar from "../../components/recruiter/SearchBar";
import FilterBar from "../../components/recruiter/FilterBar";
import Pagination from "../../components/recruiter/Pagination";
import InternshipTable from "../../components/recruiter/InternshipTable";

const MyInternships = () => {
  const [internships, setInternships] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("latest");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInternships();
  }, [page, search, status, sort]);

  const fetchInternships = async () => {
    try {
      setLoading(true);

      const data = await getMyInternships({
        page,
        limit: 10,
        search,
        status,
        sort,
      });

      setInternships(data.internships);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Internships</h1>

          <p className="mt-2 text-slate-500">
            Manage all your posted internships.
          </p>
        </div>

        <Link
          to="/recruiter/internships/create"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700"
        >
          + Post Internship
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
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
        <div className="rounded-2xl bg-white p-10 text-center">
          Loading internships...
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
