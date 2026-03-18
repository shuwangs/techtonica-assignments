import {Router} from 'express';

import * as authService from '../services/authService.js';
 
const router = Router();

router.post("/", async (req, res) => {
    try {
        const {name, email} = req.body;
        if(!name | !email) {
            return res.status(400).json({
                status: "fail",
                error: 'Invalid Request',
            })
        }
        const result = await authService.findOrCreateUser(name, email);

        res.status(200).json({
            status: "success",
            data: result,
        })

    } catch(error) {
        console.error('auth continue error:', error);

        return res.status(500).json({
        status: 'error',
        error: 'Failed to continue user',
        });
    }
})

export default router;
