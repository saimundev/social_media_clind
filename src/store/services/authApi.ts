import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://social-media-34yq.onrender.com/api/auth/",
    prepareHeaders: (headers, { getState }) => {
      const redusers = getState();
      const token = (redusers as any)?.auth?.user?.token;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    regusterUser: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "regusters",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    varefiedEmail: builder.mutation({
      query: ({ token }) => ({
        method: "PUT",
        url: `email-varefai/${token}`,
      }),
      invalidatesTags: ["Auth"],
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "login",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    getUser: builder.query({
      query: (id) => ({
        method: "GET",
        url: `get-user/${id}`,
      }),
      providesTags: ["Auth"],
    }),

    allUser: builder.query({
      query: (search) => ({
        method: "GET",
        url: `all-user?search=${search}`,
      }),
      providesTags: ["Auth"],
    }),

    getFriend: builder.query({
      query: (id) => ({
        method: "GET",
        url: `get-friend/${id}`,
      }),
      providesTags: ["Auth"],
    }),

    updateCoverPhoto: builder.mutation({
      query: ({ formData, userId }) => ({
        method: "PUT",
        url: `update-coverphoto/${userId}`,
        body: formData,
      }),
      invalidatesTags: ["Auth"],
    }),

    updateUser: builder.mutation({
      query: ({ formData, userId }) => ({
        method: "PUT",
        url: `update-user/${userId}`,
        body: formData,
      }),
      invalidatesTags: ["Auth"],
    }),

    userFolllow: builder.mutation({
      query: ({ currentUser, id }) => ({
        method: "PUT",
        url: `/${id}/follow`,
        body: currentUser,
      }),
      invalidatesTags: ["Auth"],
    }),

    userUnFolllow: builder.mutation({
      query: ({ currentUser, id }) => ({
        method: "PUT",
        url: `/${id}/unfollow`,
        body: currentUser,
      }),
      invalidatesTags: ["Auth"],
    }),

    resetPssword: builder.mutation({
      query: (email) => ({
        method: "POST",
        url: "reset-password",
        body: email,
      }),
      invalidatesTags: ["Auth"],
    }),

    changlePassword: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "change-password",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),

    deleteAccount: builder.mutation({
      query: ({ userId }) => ({
        method: "DELETE",
        url: `delete-account/${userId}`,
      }),
      invalidatesTags: ["Auth"],
    }),

    forgetPasswordEmail: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `forget-password`,
        body:data
      }),
      invalidatesTags: ["Auth"],
    }),

    forgetPasswordUpdate: builder.mutation({
      query: ({token,updatePassword}) => ({
        method: "PUT",
        url: `forget/${token}`,
        body:updatePassword
      }),
      invalidatesTags: ["Auth"],
    }),


  }),
});

export const {
  useRegusterUserMutation,
  useVarefiedEmailMutation,
  useLoginUserMutation,
  useUpdateCoverPhotoMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useAllUserQuery,
  useGetFriendQuery,
  useUserFolllowMutation,
  useUserUnFolllowMutation,
  useResetPsswordMutation,
  useChanglePasswordMutation,
  useDeleteAccountMutation,
  useForgetPasswordEmailMutation,
  useForgetPasswordUpdateMutation
} = authApi;
export default authApi;
