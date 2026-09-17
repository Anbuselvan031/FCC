import express from 'express';
import {
  getMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch,
} from '../controllers/matchController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getMatches)
  .post(protect, createMatch);

router.route('/:id')
  .get(getMatchById)
  .put(protect, updateMatch)
  .delete(protect, deleteMatch);

export default router;
