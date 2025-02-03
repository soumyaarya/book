import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        console.log('Retrieved Token:', token); // Log the token from localStorage
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode the payload
        console.log('Token Payload:', payload);
        console.log('Token Expiration:', new Date(payload.exp * 1000));
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
            console.log('Authorization Header Set:', headers.get('Authorization')); // Confirm header is set
        } else {
            console.warn('No token found in localStorage');
        }
        return headers;
    }
});

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery,
    responseHandler: async (response) => {
        const contentType = response.headers.get('content-type');
        console.log('Response Content-Type:', contentType); // Log response content-type
        
        if (contentType && contentType.includes('application/json')) {
            return response.json();  // Handle JSON response
        } else {
            return response.text();  // Handle plain text response
        }
    },
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        fetchAllBooks: builder.query({
            query: () => "/",
            providesTags: ['Books']
        }),
        fetchBookById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Books", id }],
        }),
        addBook: builder.mutation({
            query: (newBook) => {
                console.log('Adding Book with Data:', newBook); // Log the data being sent in the request
                return {
                    url: '/create-book',
                    method: "POST",
                    body: newBook,
                    headers: {
                        'Content-Type': 'application/json' // Ensure content type is set
                    }
                };
            },
            invalidatesTags: ['Books'],
        }),
        updateBook: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Books']
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Books']
        })
    })
});

export const {
    useFetchAllBooksQuery,
    useFetchBookByIdQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation
} = booksApi;

export default booksApi;
