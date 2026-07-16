import Gallery from "../models/Gallery.js";

export const listGallery = async (req, res) => {
  try {
    const items = await Gallery.findAll({ order: [["createdAt", "DESC"]] });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
