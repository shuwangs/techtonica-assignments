import {Pool} from "pg";
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    port: process.env.PGPORT,
    database: process.env.DATABASE
});

export default pool;