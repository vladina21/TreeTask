//import { getUsersList } from "../../../../../Backend/controllers/userController";
import { apiSlice } from "../apiSlice";

const USER_URL = "/api/user"

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        updateUser: builder.mutation({
            query: (data) => ({
                url : `${USER_URL}/profile`,
                method: "PUT",
                body: data,
                credentials: "include"  //send cookies

            }),
         
        }),

        getUsersList: builder.query({
            query: () => ({
                url : `${USER_URL}/get-users`,
                method: "GET",
                credentials: "include"  //send cookies

            }),
        
        }),

        
        deleteUser: builder.mutation({
            query: (id) => ({
                url : `${USER_URL}/${id}`,
                method: "DELETE",
                credentials: "include"  //send cookies

            }),
     
        }),


        
        userAction: builder.mutation({
            query: (data) => ({
                url : `${USER_URL}/${data.id}`,
                method: "PUT",
                body: data,
                credentials: "include"  //send cookies

            }),
   
        }),

        getNotifications: builder.query({
            query: () => ({
                url : `${USER_URL}/notifications`,
                method: "GET",
                credentials: "include"  //send cookies

            }),
        }),

        markNotiAsRead: builder.mutation({ 
            query: (data) => ({
                url : `${USER_URL}/read-noti?isReadType=${data.type}&id=${data?.id}`,
                method: "PUT",
                body: data,
                credentials: "include"  //send cookies
                }),

        }),


        changePassword: builder.mutation({ 
            query: (data) => ({
                url : `${USER_URL}/change-password`,
                method: "PUT",
                body: data,
                credentials: "include"  //send cookies
            }),

        }),




      
    })
})


export const { useUpdateUserMutation ,
    useGetUsersListQuery,
    useDeleteUserMutation, 
    useUserActionMutation, 
    useChangePasswordMutation, 
    useGetNotificationsQuery,
    useMarkNotiAsReadMutation} = userApiSlice