import {pool} from '../db/db.js';

export const getFavoritesByUserId = async (userId) => {
    const { rows } = await pool.query('SELECT * FROM favorites WHERE user_id = $1', [userId]);
    console.log('getFavoritesByUserId rows:', rows);
    return rows;
};

export const addFavorite = async (userId, city) => {
    const { rows } = await pool.query(
        'INSERT INTO favorites (user_id, city) VALUES ($1, $2) RETURNING *',
        [userId, city]
    );
    console.log('addFavorite rows:', rows);
    return rows[0];
};

export const deleteFavorite = async (favoriteId) => {
    const { rows } = await pool.query(
        'DELETE FROM favorites WHERE id = $1 RETURNING *',
        [favoriteId]
    );
    console.log('deleteFavorite rows:', rows);
    return rows[0];
};

