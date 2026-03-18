import pool from '../db/db.js';

export const getUserById = async (user_id) => {
    const {rows} = await pool.query(
        `SELECT * FROM weather_app.users WHERE id = $1
        `,[user_id]
    )
    console.log("In the userService... ");
    console.log("getUserById: ", rows);
    return rows[0] || null;
}