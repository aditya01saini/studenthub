const categories = [
  "General",
  "Career",
  "Internship",
  "Projects",
  "Technology",
  "Study",
  "Interview",
];

export const validateCommunityPost = ({ title, content, category }) => {
  const errors = {};

  if (!title || !title.trim()) {
    errors.title = "Post title is required";
  } else if (title.trim().length < 5) {
    errors.title = "Post title must be at least 5 characters";
  } else if (title.trim().length > 150) {
    errors.title = "Post title cannot exceed 150 characters";
  }

  if (!content || !content.trim()) {
    errors.content = "Post content is required";
  } else if (content.trim().length < 10) {
    errors.content = "Post content must be at least 10 characters";
  } else if (content.trim().length > 5000) {
    errors.content = "Post content cannot exceed 5000 characters";
  }

  if (category && !categories.includes(category)) {
    errors.category = "Invalid community category";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateCommunityComment = ({ content }) => {
  const errors = {};

  if (!content || !content.trim()) {
    errors.content = "Comment cannot be empty";
  } else if (content.trim().length > 2000) {
    errors.content = "Comment cannot exceed 2000 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export { categories };
