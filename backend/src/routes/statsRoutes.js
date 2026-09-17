import express from 'express';
import {
  getStats,
  getBattingStats,
  getBowlingStats,
  getFieldingStats,
  getMatchStats,
  createStats,
  updateStats,
} from '../controllers/statsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getStats)
  .post(protect, createStats);

router.route('/batting').get(getBattingStats);
router.route('/bowling').get(getBowlingStats);
router.route('/fielding').get(getFieldingStats);
router.route('/matches').get(getMatchStats);

router.route('/:id')
  .put(protect, updateStats);

export default router;
