import express from 'express';
import {
  getLeaderboard,
  getBattingLeaderboard,
  getBowlingLeaderboard,
  getFieldingLeaderboard,
  createLeaderboardEntry,
  updateLeaderboardEntry,
  deleteLeaderboardEntry,
} from '../controllers/leaderboardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getLeaderboard)
  .post(protect, createLeaderboardEntry);

router.route('/batting').get(getBattingLeaderboard);
router.route('/bowling').get(getBowlingLeaderboard);
router.route('/fielding').get(getFieldingLeaderboard);

router.route('/:id')
  .put(protect, updateLeaderboardEntry)
  .delete(protect, deleteLeaderboardEntry);

export default router;
