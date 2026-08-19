import { useRef, useState } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";

const CompanyLogoCard = ({ companyLogo, companyName, onUpload, onDelete }) => {
  const fileInputRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Only images allowed
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    try {
      setUploading(true);

      await onUpload(e);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete the company logo?",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await onDelete();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card>
      <div className="flex flex-col items-center">
        <img
          src={companyLogo || "https://ui-avatars.com/api/?name=Company"}
          alt={companyName}
          className="h-40 w-40 rounded-3xl border object-cover shadow-md"
        />

        <h3 className="mt-5 text-xl font-bold text-slate-900">{companyName}</h3>

        <p className="mt-1 text-sm text-slate-500">Company Logo</p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />

        <div className="mt-8 flex w-full flex-col gap-3">
          <Button
            variant="primary"
            className="w-full"
            onClick={handleUploadClick}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Logo"}
          </Button>

          {companyLogo && (
            <Button
              variant="outline"
              className="w-full"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete Logo"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CompanyLogoCard;
