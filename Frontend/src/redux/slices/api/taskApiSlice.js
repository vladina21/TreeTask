// import { createSubTask, createTask, duplicateTask, trashTask, updateTask } from "../../../../../Backend/controllers/taskController";
import { apiSlice } from "../apiSlice";

const TASK_URL = "/api/task";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: `${TASK_URL}/dashboard`,
        method: "GET",
        credentials: "include", //send cookies
      }),
    }),

    getAllTask: builder.query({
      query: ({strQuery, isTrashed, search}) => ({
        url: `${TASK_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
        method: "GET",
        credentials: "include", //send cookies
      }),
    }),

    getTask: builder.query({
      query: (id) => ({
        url: `${TASK_URL}/${id}`,
        method: "GET",
        credentials: "include", //send cookies
      }),
    }),

    getTrashedTasks: builder.query({
      query: ({strQuery, search}) => ({
        url: `${TASK_URL}/get-trashed-tasks?stage=${strQuery}&search=${search}`,
        method: "GET",
        credentials: "include", //send cookies
      }),
    }),

    createTask: builder.mutation({
        query: (data) => ({
            url: `${TASK_URL}/create`,
            method: "POST",
            body: data,
            credentials: "include", //send cookies
        }),
    }),

    duplicateTask: builder.mutation({
        query: (id) => ({
            url: `${TASK_URL}/duplicate/${id}`,
            method: "POST",
            credentials: "include", //send cookies
        }),
    }),

    updateTask: builder.mutation({
        query: (data) => ({
            url: `${TASK_URL}/update/${data._id}`,
            method: "PUT",
            body: data,
            credentials: "include", //send cookies
        }),
    }),

    trashTask: builder.mutation({
        query: (id) => ({
            url: `${TASK_URL}/${id}`,
            method: "PUT",
            credentials: "include", //send cookies
        }),
    }),

    createSubTask: builder.mutation({
        query: ({data, id}) => ({
            url: `${TASK_URL}/create-subtask/${id}`,
            method: "PUT",
            body: data,
            credentials: "include", //send cookies
        }),
    }),

    deleteRestoreTask: builder.mutation({
      query: ({actionType, id}) => ({
          url : `${TASK_URL}/delete-restore/${id}?actionType=${actionType}`,
          method: "DELETE",
          credentials: "include"  //send cookies

      }),

  }),

  }),
});

export const { useGetDashboardStatsQuery,
    useGetAllTaskQuery,
    useGetTaskQuery,
    useCreateTaskMutation,
    useDuplicateTaskMutation,
    useUpdateTaskMutation,
    useTrashTaskMutation,
    useGetTrashedTasksQuery,
    useCreateSubTaskMutation,
    useDeleteRestoreTaskMutation,

} = taskApiSlice;
