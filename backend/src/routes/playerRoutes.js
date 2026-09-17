import express from 'express';
import {
  getPlayers,
  searchPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from '../controllers/playerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getPlayers)
  .post(protect, createPlayer);

router.route('/search')
  .get(searchPlayers);

router.route('/:id')
  .get(getPlayerById)
  .put(protect, updatePlayer)
  .delete(protect, deletePlayer);

export default router;
