import Page from "../models/Page.js";

export const getPage = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await Page.findOne({ where: { slug } });
    if (!page) return res.status(404).json({ message: "Page not found" });
    res.json(page);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const listPages = async (req, res) => {
  try {
    const pages = await Page.findAll({ attributes: ["id", "slug", "title"] });
    res.json(pages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
