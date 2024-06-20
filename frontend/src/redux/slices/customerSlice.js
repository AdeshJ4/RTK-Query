import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customerApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/customers" }),
  tagTypes: ["Customer"],
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => "/",
      providesTags: ["Customer"],
      transformResponse: (res, meta, args) => {
        return res.slice(0, 5);
      },
    }),
    getCustomer: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Customer"],
    }),
    addCustomer: builder.mutation({
      query: (customer) => ({
        url: "/",
        method: "POST",
        body: customer,
      }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: builder.mutation({
      query: ({ _id, __v, ...customer }) => ({
        url: `/${_id}`,
        method: "PUT",
        body: customer,
      }),
      invalidatesTags: ["Customer"],
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;
