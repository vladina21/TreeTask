import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"



//const API_URI = 'http://localhost:8000/api'
//const API_URI = import.meta.env.VITE_APP_BASE_URL

const API_URI = 'http://tree-task.uksouth.cloudapp.azure.com'


const baseQuery = fetchBaseQuery({baseUrl: API_URI});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: [],
    endpoints: (builder) => ({})


})