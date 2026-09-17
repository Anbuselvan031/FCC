import mongoose from 'mongoose';
import Team from '../models/Team.js';
import teamDataFallback from '../../../src/data/teamData.js';

// @desc    Get team information
// @route   GET /api/team
// @access  Public
export const getTeam = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const team = await Team.findOne();
      if (team) {
        return res.status(200).json({
          success: true,
          message: 'Team profile retrieved successfully',
          data: team,
        });
      }
    }

    // Return verified team record
    res.status(200).json({
      success: true,
      message: 'Team profile retrieved successfully',
      data: teamDataFallback,
    });
  } catch (error) {
    // If DB is offline or throws, return verified fallback
    res.status(200).json({
      success: true,
      message: 'Team profile retrieved successfully',
      data: teamDataFallback,
    });
  }
};

// @desc    Update team information
// @route   PUT /api/team/:id
// @access  Private/Admin
export const updateTeam = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database not connected. Please configure MONGO_URI in backend/.env',
      });
    }

    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team information updated successfully',
      data: team,
    });
  } catch (error) {
    next(error);
  }
};
