import {pool} from '../db/db.js';

export const getUserByEmail = async (email) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log('getUserByEmail rows:', rows);
    return rows[0];
}

export const createUser = async(name, email) => {
    const { rows } = await pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
    );
    console.log('createUser rows:', rows);
    return rows[0];
}