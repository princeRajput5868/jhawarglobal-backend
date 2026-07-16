import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const contact = await Contact.create({ name, email, phone, message });
    res.status(201).json({ message: "Contact saved", data: contact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
