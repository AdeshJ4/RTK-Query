import React from 'react'
import { useDeleteCustomerMutation, useGetCustomersQuery } from '../redux/slices/customerSlice';
import { Link, NavLink } from 'react-router-dom';

const Read = () => {
    const { data: customers, isLoading, isSuccess, isError, error } = useGetCustomersQuery();

    const [deleteCustomer] = useDeleteCustomerMutation()

    console.log('customers: ', customers);

    return (
        <>
            <div className='container mx-auto'>
                <h2>Read Operation</h2>
                <div className='row'>
                    {isLoading && <span>Loading...</span>}
                    {isError && <span>Something Went wrong</span>}
                    {isSuccess && customers?.map((customer) => (
                        <div className='col-3' key={customer._id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{customer.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{customer.email}</h6>
                                    <p className="card-text">{customer.phone}</p>
                                    <div className="d-flex justify-content-evenly">
                                        <button className="btn btn-danger" onClick={() => deleteCustomer(customer?._id)}>Delete</button>
                                        <button className="btn btn-primary"><NavLink to={`edit/${customer?._id}`} className="text-white text-decoration-none">Edit</NavLink></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Read