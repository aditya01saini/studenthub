import api from "./api";

// =====================================================
// Get Community Posts
// =====================================================

export const getCommunityPosts = async ({
  page = 1,
  limit = 10,
  search = "",
  category = "All",
} = {}) => {
  const { data } = await api.get("/community", {
    params: {
      page,
      limit,
      search,
      category,
    },
  });

  return data;
};

// =====================================================
// Get Single Community Post
// =====================================================

export const getCommunityPost = async (postId) => {
  const { data } = await api.get(
    `/community/${postId}`,
  );

  return data;
};

// =====================================================
// Create Community Post
// =====================================================

export const createCommunityPost = async (postData) => {
  const { data } = await api.post(
    "/community",
    postData,
  );

  return data;
};

// =====================================================
// Update Community Post
// =====================================================

export const updateCommunityPost = async (
  postId,
  postData,
) => {
  const { data } = await api.patch(
    `/community/${postId}`,
    postData,
  );

  return data;
};

// =====================================================
// Delete Community Post
// =====================================================

export const deleteCommunityPost = async (postId) => {
  const { data } = await api.delete(
    `/community/${postId}`,
  );

  return data;
};

// =====================================================
// Like / Unlike Community Post
// =====================================================

export const toggleCommunityPostLike = async (
  postId,
) => {
  const { data } = await api.post(
    `/community/${postId}/like`,
  );

  return data;
};

// =====================================================
// Get Comments
// =====================================================

export const getCommunityComments = async (
  postId,
  page = 1,
  limit = 20,
) => {
  const { data } = await api.get(
    `/community-comments/post/${postId}`,
    {
      params: {
        page,
        limit,
      },
    },
  );

  return data;
};

// =====================================================
// Create Comment
// =====================================================

export const createCommunityComment = async (
  postId,
  content,
) => {
  const { data } = await api.post(
    `/community-comments/post/${postId}`,
    {
      content,
    },
  );

  return data;
};

// =====================================================
// Delete Comment
// =====================================================

export const deleteCommunityComment = async (
  commentId,
) => {
  const { data } = await api.delete(
    `/community-comments/${commentId}`,
  );

  return data;
};