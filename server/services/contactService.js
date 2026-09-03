const Contact = require("../models/Contact");

const createContact = async (contactData) => {
  return await Contact.create(contactData);
};

const getAllContacts = async () => {
  return await Contact.find().sort({ createdAt: -1 });
};

const getContactById = async (id) => {
  return await Contact.findById(id);
};

const updateContact = async (id, updateData) => {
  return await Contact.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

const deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};