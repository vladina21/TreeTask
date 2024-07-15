// Assuming you have NODE_URL for your nodes API endpoint
import { apiSlice } from "../apiSlice";

const NODE_URL = "/api/node";

export const nodeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateNode: builder.mutation({
      query: (data) => ({
        url: `${NODE_URL}/profile`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    getNodesList: builder.query({
      query: () => ({
        url: `${NODE_URL}/get-nodes`,
        method: "GET",
        credentials: "include",
      }),
    }),

    insertNode: builder.mutation({
      query: (data) => ({
          url : `${NODE_URL}/insert`,
          method: "POST",
          body: data,
          credentials: "include"  //send cookies
      }),
    }),

    deleteNode: builder.mutation({
      query: (id) => ({
        url: `${NODE_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),

    // Additional endpoints for node-related operations as needed
  }),
});

export const {
    useUpdateNodeMutation,
    useGetNodesListQuery,
    useDeleteNodeMutation,
    useInsertNodeMutation,
    // Add more hooks for other node-related operations
  } = nodeApiSlice;
  
