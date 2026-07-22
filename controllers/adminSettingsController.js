import Settings from "../models/Settings.js";

// Get all settings
export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findAll();
    const settingsObj = {};
    settings.forEach(s => {
      settingsObj[s.key] = s.value;
    });
    res.json(settingsObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single setting
export const getSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const setting = await Settings.findOne({ where: { key } });
    if (!setting) return res.status(404).json({ message: "Setting not found" });
    res.json({ key: setting.key, value: setting.value });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update or create setting
export const updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    const setting = await Settings.findOne({ where: { key } });
    if (setting) {
      await setting.update({ value });
    } else {
      await Settings.create({ key, value });
    }

    res.json({ success: true, message: "Setting updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Initialize default settings
export const initSettings = async (req, res) => {
  try {
    const defaults = [
      { key: "certificate_name", value: "Certificate", description: "Name displayed on certificates (Certificate/Diploma)" },
      { key: "organization_name", value: "Jawahar Global Foundation", description: "Organization name on certificates" },
      { key: "signatory_name", value: "Director", description: "Signatory name on certificates" },
    ];

    for (const def of defaults) {
      const existing = await Settings.findOne({ where: { key: def.key } });
      if (!existing) {
        await Settings.create(def);
      }
    }

    res.json({ success: true, message: "Default settings initialized" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};