const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 10,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email address already taken"],
    minlength: 11,
    maxlength: 100,
  },
});

function validateCustomer(customer) {
  const joiSchema = Joi.object({
    name: Joi.string().required().trim().min(5).max(50),
    phone: Joi.string().required().trim().min(10).max(10),
    email: Joi.string().min(11).max(100).required().email(),
  });

  return joiSchema.validate(customer);
}

const Customer = mongoose.model("Customer", customerSchema);

module.exports = { Customer, customerSchema, validateCustomer };
