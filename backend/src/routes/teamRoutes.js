import express from 'express';
import { getTeam, updateTeam } from '../controllers/teamController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getTeam);
router.route('/:id').put(protect, updateTeam);

export default router;
