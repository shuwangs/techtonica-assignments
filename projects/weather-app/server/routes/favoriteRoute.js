import {Router} from 'express';
import * as favoriteService from '../services/favoriteService.js';
import * as userService from '../services/userService.js'
const router = Router();

router.get('/:userId', async (req, res) => {
    const user_id = Number(req.params.userId);
    if(isNaN(user_id)) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid Request"
        })
    }
    try {
        // check if user exists in the db
        const user = await userService.getUserById(user_id);
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            });
        }

        // get user favorites
        const result = await favoriteService.getFavoritesByUserId(user_id);
        if(! result) {
            return res.status(404).json({
                status: "fail",
                message: "User"
            })
        }

        return res.status(200).json({
            status: "success",
            data: result
        })

    } catch (error) {
        console.error( error.message);
        res.status(500).json({
            status: "fail",
            message: error.message || "Internal Server Error",
        })
    }

})

export default router;