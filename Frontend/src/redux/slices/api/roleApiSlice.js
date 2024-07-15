// Assuming you have NODE_URL for your nodes API endpoint
import { apiSlice } from "../apiSlice";

const ROLE_URL = "/api/role";

export const roleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getRolesList: builder.query({
      query: () => ({
        url: `${ROLE_URL}/get-roles`,
        method: "GET",
        credentials: "include",
      }),
    }),

    insertRole: builder.mutation({
      query: (data) => ({
          url : `${ROLE_URL}/insert`,
          method: "POST",
          body: data,
          credentials: "include"  //send cookies
      }),
    }),

    deleteRole: builder.mutation({
      query: (id) => ({
        url: `${ROLE_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),

    // Additional endpoints for node-related operations as needed
  }),
});

export const {
    useGetRolesListQuery,
    useDeleteRoleMutation,
    useInsertRoleMutation,
    // Add more hooks for other node-related operations
  } = roleApiSlice;
  
