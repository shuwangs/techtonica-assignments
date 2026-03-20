import {Router} from 'express';
import * as favoriteService from '../services/favoriteService.js';
import * as userService from '../services/userService.js'
const router = Router();



router.delete('/:favoriteId', async (req, res) => {
    const favoriteId = req.params.favoriteId;
    if(isNaN(favoriteId)) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid Request."
        })
    }

    try {
        const result = await favoriteService.deleteFavorite(favoriteId);
        return res.status(204).json({
            status: "success",
            message: "DELETE favorite Id successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: "Internal Server Error"
        })
    }
})

export default router;