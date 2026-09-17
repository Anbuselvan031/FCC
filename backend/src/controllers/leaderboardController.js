import mongoose from 'mongoose';
import Leaderboard from '../models/Leaderboard.js';
import leaderboardFallback from '../../../src/data/leaderboard.js';

// @desc    Get complete leaderboard
// @route   GET /api/leaderboard
// @access  Public
export const getLeaderboard = async (req, res, next) => {
  try {
    const { category, season } = req.query;

    if (mongoose.connection.readyState === 1) {
      const filter = {};
      if (category) filter.category = category.toLowerCase();
      if (season) filter.season = season;

      const entries = await Leaderboard.find(filter).sort({ rank: 1 });
      if (entries.length > 0) {
        if (!category) {
          return res.status(200).json({
            success: true,
            message: 'Leaderboard fetched successfully',
            data: {
              batting: entries.filter((e) => e.category === 'batting'),
              bowling: entries.filter((e) => e.category === 'bowling'),
              fielding: entries.filter((e) => e.category === 'fielding'),
            },
          });
        }
        return res.status(200).json({
          success: true,
          message: `${category} leaderboard fetched successfully`,
          count: entries.length,
          data: entries,
        });
      }
    }

    if (category) {
      const list = leaderboardFallback[category.toLowerCase()] || [];
      return res.status(200).json({
        success: true,
        message: `${category} leaderboard fetched successfully`,
        count: list.length,
        data: list,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Leaderboard fetched successfully',
      data: leaderboardFallback,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: 'Leaderboard fetched successfully',
      data: leaderboardFallback,
    });
  }
};

// @desc    Get batting leaderboard
// @route   GET /api/leaderboard/batting
// @access  Public
export const getBattingLeaderboard = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const entries = await Leaderboard.find({ category: 'batting' }).sort({ rank: 1 });
      if (entries.length > 0) {
        return res.status(200).json({
          success: true,
          message: 'Batting leaderboard fetched successfully',
          count: entries.length,
          data: entries,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Batting leaderboard fetched successfully',
      count: leaderboardFallback.batting?.length || 0,
      data: leaderboardFallback.batting || [],
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get bowling leaderboard
// @route   GET /api/leaderboard/bowling
// @access  Public
export const getBowlingLeaderboard = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const entries = await Leaderboard.find({ category: 'bowling' }).sort({ rank: 1 });
      if (entries.length > 0) {
        return res.status(200).json({
          success: true,
          message: 'Bowling leaderboard fetched successfully',
          count: entries.length,
          data: entries,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Bowling leaderboard fetched successfully',
      count: leaderboardFallback.bowling?.length || 0,
      data: leaderboardFallback.bowling || [],
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get fielding leaderboard
// @route   GET /api/leaderboard/fielding
// @access  Public
export const getFieldingLeaderboard = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const entries = await Leaderboard.find({ category: 'fielding' }).sort({ rank: 1 });
      if (entries.length > 0) {
        return res.status(200).json({
          success: true,
          message: 'Fielding leaderboard fetched successfully',
          count: entries.length,
          data: entries,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Fielding leaderboard fetched successfully',
      count: leaderboardFallback.fielding?.length || 0,
      data: leaderboardFallback.fielding || [],
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create leaderboard entry
// @route   POST /api/leaderboard
// @access  Private/Admin
export const createLeaderboardEntry = async (req, res, next) => {
  try {
    const { name, category } = req.body;
    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name and category are required',
      });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(201).json({
        success: true,
        message: 'Leaderboard entry created successfully (in-memory mode)',
        data: { _id: Date.now().toString(), ...req.body },
      });
    }

    const entry = await Leaderboard.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Leaderboard entry created successfully',
      data: entry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update leaderboard entry
// @route   PUT /api/leaderboard/:id
// @access  Private/Admin
export const updateLeaderboardEntry = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        message: 'Leaderboard entry updated successfully (in-memory mode)',
        data: { _id: req.params.id, ...req.body },
      });
    }

    const entry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Leaderboard entry not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Leaderboard entry updated successfully',
      data: entry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete leaderboard entry
// @route   DELETE /api/leaderboard/:id
// @access  Private/Admin
export const deleteLeaderboardEntry = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        message: 'Leaderboard entry deleted successfully (in-memory mode)',
        data: { id: req.params.id },
      });
    }

    const entry = await Leaderboard.findByIdAndDelete(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Leaderboard entry not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Leaderboard entry deleted successfully',
      data: { id: req.params.id },
    });
  } catch (error) {
    next(error);
  }
};
