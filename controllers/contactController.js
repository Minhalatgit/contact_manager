const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
    // res.status(200).json({
    //     message: "Get all contacts"
    // });
})

//@desc Get single contact
//@route GET /api/contacts
//@access public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact);
})

//@desc Create contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
    console.log(`The request body is`, req.body);

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const contact = await Contact.create({
        name, email, phone
    });

    res.status(201).json(contact);
})

//@desc Update contact
//@route PUT /api/contacts
//@access public
const updateContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }


    const updatedConctact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
    );

    res.status(200).json(updatedConctact);
})

//@desc Delete contact
//@route DELETE /api/contacts
//@access public
const deleteContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    try {
        const result = await Contact.deleteOne();

        console.log("Result", result);
        res.status(200).json(contact);

    } catch (error) {
        console.log("Error", error);
        res.status(403).json(error);
    }

})

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact };