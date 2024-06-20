const mongoose = require("mongoose");
const { Customer, validateCustomer } = require("../models/customerModel");

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    return res.status(200).send(customers); // Return total count along with paginated movies
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const getCustomer = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send("Invalid Email & Password");
    }

    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res
        .status(404)
        .send(`The customer with given id ${req.params.id} not found`);
    }

    return res.status(200).send(customer);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

/*
    1. @desc : Create Customer
    2. @route POST : /api/customers
    3. @access public
*/
const createCustomer = async (req, res) => {
  try {
    const { error } = validateCustomer(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const customer = await Customer.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
    });

    return res.status(201).send(customer);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const updateCustomer = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send("Invalid CustomerID");
    }

    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!customer)
      return res
        .status(404)
        .send(`The Customer with given id ${req.params.id} not found`);

    return res.status(200).send(customer);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const deleteCustomer = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send("Invalid CustomerID");
    }

    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res
        .status(404)
        .send(`The Customer with given id ${req.params.id} not found`);
    }

    return res.status(200).send(customer);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = {
  getCustomer,
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
