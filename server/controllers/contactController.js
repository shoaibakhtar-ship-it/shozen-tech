const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

const {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} = require("../services/contactService");

const createContactController = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    company,
    service,
    budget,
    message,
  } = req.body;

  const contactData = {
    name,
    email,
    phone,
    company,
    service,
    budget,
    message,
  };

  const contact = await createContact(contactData);

  res.status(201).json({
    success: true,
    message: "Enquiry submitted successfully",
    data: contact,
  });
});

const getAllContactsController = asyncHandler(async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    success: true,
    count: contacts.length,
    data: contacts,
  });
});

const getContactByIdController = asyncHandler(async (req, res) => {
  const contact = await getContactById(req.params.id);

  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  res.status(200).json({
    success: true,
    data: contact,
  });
});

const updateContactController = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status) {
    throw new ApiError(400, "Status is required");
  }

  const allowedStatuses = [
    "new",
    "contacted",
    "closed",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new ApiError(
      400,
      "Status must be new, contacted, or closed"
    );
  }

  const contact = await updateContact(
    req.params.id,
    { status }
  );

  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  res.status(200).json({
    success: true,
    message: "Contact status updated successfully",
    data: contact,
  });
});

const deleteContactController = asyncHandler(async (req, res) => {
  const contact = await deleteContact(req.params.id);

  if (!contact) {
    throw new ApiError(404, "Contact not found");
  }

  res.status(200).json({
    success: true,
    message: "Contact deleted successfully",
  });
});

module.exports = {
  createContactController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
  deleteContactController,
};