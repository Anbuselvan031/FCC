import mongoose from 'mongoose';
import TeamStats from '../models/TeamStats.js';
import statsFallback from '../../../src/data/stats.js';

// @desc    Get complete team statistics
// @route   GET /api/stats
// @access  Public
export const getStats = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const stats = await TeamStats.findOne();
      if (stats) {
        return res.status(200).json({
          success: true,
          message: 'Team statistics fetched successfully',
          data: stats,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Team statistics fetched successfully',
      data: statsFallback,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: 'Team statistics fetched successfully',
      data: statsFallback,
    });
  }
};

// @desc    Get batting statistics
// @route   GET /api/stats/batting
// @access  Public
export const getBattingStats = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const stats = await TeamStats.findOne();
      if (stats) {
        return res.status(200).json({
          success: true,
          message: 'Batting statistics fetched successfully',
          data: stats.batting,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Batting statistics fetched successfully',
      data: statsFallback.batting,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get bowling statistics
// @route   GET /api/stats/bowling
// @access  Public
export const getBowlingStats = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const stats = await TeamStats.findOne();
      if (stats) {
        return res.status(200).json({
          success: true,
          message: 'Bowling statistics fetched successfully',
          data: stats.bowling,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Bowling statistics fetched successfully',
      data: statsFallback.bowling,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get fielding statistics
// @route   GET /api/stats/fielding
// @access  Public
export const getFieldingStats = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const stats = await TeamStats.findOne();
      if (stats) {
        return res.status(200).json({
          success: true,
          message: 'Fielding statistics fetched successfully',
          data: stats.fielding,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Fielding statistics fetched successfully',
      data: statsFallback.fielding,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get match performance statistics
// @route   GET /api/stats/matches
// @access  Public
export const getMatchStats = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const stats = await TeamStats.findOne();
      if (stats) {
        return res.status(200).json({
          success: true,
          message: 'Match performance statistics fetched successfully',
          data: stats.matchPerformance,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Match performance statistics fetched successfully',
      data: statsFallback.matchPerformance,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or initialize team stats
// @route   POST /api/stats
// @access  Private/Admin
export const createStats = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(201).json({
        success: true,
        message: 'Team statistics record created successfully (in-memory mode)',
        data: req.body,
      });
    }

    const stats = await TeamStats.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Team statistics record created successfully',
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update team stats
// @route   PUT /api/stats/:id
// @access  Private/Admin
export const updateStats = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        message: 'Team statistics updated successfully (in-memory mode)',
        data: req.body,
      });
    }

    const stats = await TeamStats.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!stats) {
      return res.status(404).json({
        success: false,
        message: 'Team statistics record not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team statistics updated successfully',
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};
