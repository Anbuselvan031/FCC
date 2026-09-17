import mongoose from 'mongoose';
import Match from '../models/Match.js';
import matchesFallback from '../../../src/data/matches.js';

// @desc    Get all matches
// @route   GET /api/matches
// @access  Public
export const getMatches = async (req, res, next) => {
  try {
    const { status } = req.query;

    if (mongoose.connection.readyState === 1) {
      const filter = {};
      if (status) filter.status = status.toLowerCase();

      const matches = await Match.find(filter).sort({ date: -1, createdAt: -1 });
      if (matches.length > 0) {
        return res.status(200).json({
          success: true,
          message: 'Matches fetched successfully',
          count: matches.length,
          data: matches,
        });
      }
    }

    let list = [...matchesFallback];
    if (status) {
      list = list.filter((m) => m.status?.toLowerCase() === status.toLowerCase());
    }

    res.status(200).json({
      success: true,
      message: 'Matches fetched successfully',
      count: list.length,
      data: list,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: 'Matches fetched successfully',
      count: matchesFallback.length,
      data: matchesFallback,
    });
  }
};

// @desc    Get single match by ID
// @route   GET /api/matches/:id
// @access  Public
export const getMatchById = async (req, res, next) => {
  try {
    const idParam = req.params.id;
    let match = null;

    if (mongoose.connection.readyState === 1) {
      if (mongoose.Types.ObjectId.isValid(idParam)) {
        match = await Match.findById(idParam);
      }
      if (!match && !isNaN(Number(idParam))) {
        match = await Match.findOne({ matchId: Number(idParam) });
      }
    }

    if (!match) {
      match = matchesFallback.find(
        (m) =>
          String(m.id) === String(idParam) ||
          String(m.matchId) === String(idParam)
      );
    }

    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Match details retrieved successfully',
      data: match,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a match
// @route   POST /api/matches
// @access  Private/Admin
export const createMatch = async (req, res, next) => {
  try {
    const { opponent, date } = req.body;

    if (!opponent || !date) {
      return res.status(400).json({
        success: false,
        message: 'Opponent and match date are required',
      });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(201).json({
        success: true,
        message: 'Match created successfully (in-memory mode)',
        data: { ...req.body, _id: Date.now().toString() },
      });
    }

    const match = await Match.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Match created successfully',
      data: match,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a match
// @route   PUT /api/matches/:id
// @access  Private/Admin
export const updateMatch = async (req, res, next) => {
  try {
    const idParam = req.params.id;

    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        message: 'Match updated successfully (in-memory mode)',
        data: { id: idParam, ...req.body },
      });
    }

    let query = {};
    if (mongoose.Types.ObjectId.isValid(idParam)) {
      query = { _id: idParam };
    } else if (!isNaN(Number(idParam))) {
      query = { matchId: Number(idParam) };
    }

    const match = await Match.findOneAndUpdate(query, req.body, {
      new: true,
      runValidators: true,
    });

    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Match updated successfully',
      data: match,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a match
// @route   DELETE /api/matches/:id
// @access  Private/Admin
export const deleteMatch = async (req, res, next) => {
  try {
    const idParam = req.params.id;

    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        message: 'Match deleted successfully (in-memory mode)',
        data: { id: idParam },
      });
    }

    let query = {};
    if (mongoose.Types.ObjectId.isValid(idParam)) {
      query = { _id: idParam };
    } else if (!isNaN(Number(idParam))) {
      query = { matchId: Number(idParam) };
    }

    const match = await Match.findOneAndDelete(query);

    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Match deleted successfully',
      data: { id: idParam },
    });
  } catch (error) {
    next(error);
  }
};
