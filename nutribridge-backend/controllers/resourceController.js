import { pool } from "../config/db.js";

// GET all resources (with optional search/filter)
export const getResources = async (req, res) => {
  try {
    const { search, type } = req.query;
    let query = "SELECT * FROM nutrition_resources WHERE 1=1";
    const params = [];

    if (search) {
      params.push(`%${search}%`);
      query += ` AND title ILIKE $${params.length}`;
    }
    if (type) {
      params.push(type);
      query += ` AND content_type = $${params.length}`;
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, params);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching resources" });
  }
};

// POST new resource (Admin or NGO only)
export const addResource = async (req, res) => {
  try {
    const { title, description, content_type, url } = req.body;
    const created_by = req.user.id;

    if (req.user.role !== "ngo" && req.user.role !== "admin") {
      return res.status(403).json({ message: "Only NGOs or Admins can add resources" });
    }

    const result = await pool.query(
      "INSERT INTO nutrition_resources (title, description, content_type, url, created_by) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [title, description, content_type, url, created_by]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding resource" });
  }
};

