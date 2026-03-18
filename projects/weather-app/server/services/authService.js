import pool from '../db/db.js';

export const getUserByEmail = async (email) => {
    const { rows } = await pool.query('SELECT * FROM weather_app.users WHERE email = $1', [email]);
    console.log('getUserByEmail rows:', rows);
    return rows[0];
}

export const createUser = async(name, email) => {
    const { rows } = await pool.query(
        'INSERT INTO weather_app.users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
    );
    console.log('createUser rows:', rows);
    return rows[0];
}

export const findOrCreateUser = async (name, email) => {

    const existingUser = await getUserByEmail(email);
    if(existingUser) {
        console.log("User exists: ", existingUser);
        return existingUser;
    } 
    const newUser = await createUser(name, email);
    console.log('New user created:', newUser);
    return newUser;
}