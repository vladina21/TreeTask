import { apiSlice } from "../apiSlice"

const AUTH_URL = "/user"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url : `${AUTH_URL}/login`,
                method: "POST",
                body: data,
                credentials: "include"  //send cookies

            }),
            transformResponse: (response) => {
                // You can modify the response or check for specific data here
                return response;
            },
            onError: (error) => {
                // Handle errors globally here if needed
                console.error('Error logging in:', error);
            }
        }),

        register: builder.mutation({
            query: (data) => ({
                url : `${AUTH_URL}/register`,
                method: "POST",
                body: data,
                credentials: "include"  //send cookies

            }),
            transformResponse: (response) => {
                // You can modify the response or check for specific data here
                return response;
            },
            onError: (error) => {
                // Handle errors globally here if needed
                console.error('Error logging in:', error);
            }
        }),

        logout: builder.mutation({
            query: (data) => ({
                url : `${AUTH_URL}/logout`,
                method: "POST",
                body: data,
                credentials: "include"  //send cookies

            }),
            transformResponse: (response) => {
                // You can modify the response or check for specific data here
                return response;
            },
            onError: (error) => {
                // Handle errors globally here if needed
                console.error('Error logging in:', error);
            }
        })
    })
})


export const { useLoginMutation, useRegisterMutation, useLogoutMutation} = authApiSlice;