import React, { useEffect, useState } from "react";
import {
  useAddCustomerMutation,
  useGetCustomerQuery,
  useGetCustomersQuery,
  useUpdateCustomerMutation,
} from "../redux/slices/customerSlice";
import { useNavigate, useParams } from "react-router-dom";

const AddEdit = () => {
  const [customer, setCustomer] = useState();
  const [editMode, setEditMode] = useState(false);
  const [addCustomer] = useAddCustomerMutation();
  const [updateCustomer] = useUpdateCustomerMutation();

  const { id } = useParams();
  const { data } = useGetCustomerQuery(id);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (id && data) {
      setEditMode(true);
      setCustomer({ ...data });
    } else {
      setEditMode(false);
    }
  }, [id, data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await updateCustomer(customer);
    } else {
      await addCustomer(customer);
    }
    setEditMode(false);
    navigate("/");
  };

  return (
    <>
      {editMode ? <h2>Edit</h2> : <h2>Add</h2>}
      <div className="container mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              onChange={handleChange}
              value={customer?.name || ""}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              value={customer?.email || ""}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className="form-control"
              onChange={handleChange}
              value={customer?.phone || ""}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddEdit;
