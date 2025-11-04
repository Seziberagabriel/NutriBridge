import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, phone, role, created_at FROM users');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Get single user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT id, name, email, phone, role, created_at FROM users WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user' });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, password } = req.body;

  try {
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const result = await pool.query(
      `UPDATE users
       SET
         name = COALESCE($1, name),
         email = COALESCE($2, email),
         phone = COALESCE($3, phone),
         password_hash = COALESCE($4, password_hash)
       WHERE id = $5
       RETURNING id, name, email, phone, role, created_at`,
      [name || null, email || null, phone || null, hashedPassword || null, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: 'User not found' });

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Delete user (admin only)
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting user' });
  }
};

