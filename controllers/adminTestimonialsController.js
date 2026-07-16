import Testimonial from "../models/Testimonial.js";

// ✅ GET all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      order: [["orderIndex", "ASC"], ["createdAt", "DESC"]],
    });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET single testimonial
export const getTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ CREATE testimonial
export const createTestimonial = async (req, res) => {
  try {
    const { name, place, course, message, image, isActive, orderIndex } = req.body;
    const testimonial = await Testimonial.create({
      name,
      place,
      course,
      message,
      image,
      isActive: isActive !== undefined ? isActive : true,
      orderIndex: orderIndex || 0,
    });
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE testimonial
export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, place, course, message, image, isActive, orderIndex } = req.body;
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });
    await testimonial.update({ name, place, course, message, image, isActive, orderIndex });
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });
    await testimonial.destroy();
    res.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};