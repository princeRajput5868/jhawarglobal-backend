import Placement from "../models/Placement.js";

// ✅ GET all placements
export const getPlacements = async (req, res) => {
  try {
    const placements = await Placement.findAll({
      order: [["orderIndex", "ASC"], ["createdAt", "DESC"]],
    });
    res.json(placements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET single placement
export const getPlacement = async (req, res) => {
  try {
    const { id } = req.params;
    const placement = await Placement.findByPk(id);
    if (!placement) return res.status(404).json({ message: "Placement not found" });
    res.json(placement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ CREATE placement
export const createPlacement = async (req, res) => {
  try {
    const { name, role, company, image, isActive, orderIndex } = req.body;
    const placement = await Placement.create({
      name,
      role,
      company,
      image,
      isActive: isActive !== undefined ? isActive : true,
      orderIndex: orderIndex || 0,
    });
    res.status(201).json(placement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE placement
export const updatePlacement = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, company, image, isActive, orderIndex } = req.body;
    const placement = await Placement.findByPk(id);
    if (!placement) return res.status(404).json({ message: "Placement not found" });
    await placement.update({ name, role, company, image, isActive, orderIndex });
    res.json(placement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE placement
export const deletePlacement = async (req, res) => {
  try {
    const { id } = req.params;
    const placement = await Placement.findByPk(id);
    if (!placement) return res.status(404).json({ message: "Placement not found" });
    await placement.destroy();
    res.json({ message: "Placement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};