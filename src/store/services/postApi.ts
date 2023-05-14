import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IPost {
  _id: number;
  post: string;
  image: string;
  createdAt: Date | any;
}

export interface ISinglePost {
  post: string | any;
  image: string;
}

const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://social-media-34yq.onrender.com/api/post/",
    prepareHeaders: (headers, { getState }) => {
      const redusers = getState();
      const token = (redusers as any)?.auth?.user?.token;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  tagTypes: ["Post"],

  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "create-post",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),

    getPost: builder.query<IPost[], any>({
      query: (id) => ({
        method: "GET",
        url: `get-post/${id}`,
      }),
      providesTags: ["Post"],
    }),

    getSinglePost: builder.query<ISinglePost, any>({
      query: (id) => ({
        method: "GET",
        url: `get-single-post/${id}`,
      }),
      providesTags: ["Post"],
    }),

    updatePost: builder.mutation({
      query: ({ formData, id }) => ({
        method: "PUT",
        url: `update-post/${id}`,
        body: formData,
      }),
      invalidatesTags: ["Post"],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `delete-post/${id}`,
      }),
      invalidatesTags: ["Post"],
    }),

    getTimelinePost: builder.query({
      query: (id) => ({
        method: "GET",
        url: `get-timeline/${id}`,
      }),
      providesTags: ["Post"],
    }),

    likePost: builder.mutation({
      query: ({ currentUser, postId }) => ({
        method: "PUT",
        url: `like-post/${postId}`,
        body: currentUser,
      }),
      invalidatesTags: ["Post"],
    }),

    commentPost: builder.mutation({
      query: ({ postComment, userPostId }) => ({
        method: "PUT",
        url: `comment-post/${userPostId}`,
        body: postComment,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostQuery,
  useDeletePostMutation,
  useGetSinglePostQuery,
  useUpdatePostMutation,
  useGetTimelinePostQuery,
  useLikePostMutation,
  useCommentPostMutation,
} = postApi;
export default postApi;
