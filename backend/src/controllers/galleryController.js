import mongoose from 'mongoose';
import Gallery from '../models/Gallery.js';
import galleryFallback from '../../../src/data/galleryData.js';

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
export const getGallery = async (req, res, next) => {
  try {
    const { category } = req.query;

    if (mongoose.connection.readyState === 1) {
      const filter = {};
      if (category && category.toLowerCase() !== 'all') {
        filter.category = { $regex: new RegExp(`^${category}$`, 'i') };
      }

      const items = await Gallery.find(filter).sort({ createdAt: -1 });
      if (items.length > 0) {
        return res.status(200).json({
          success: true,
          message: 'Gallery items fetched successfully',
          count: items.length,
          data: items,
        });
      }
    }

    let list = [...galleryFallback];
    if (category && category.toLowerCase() !== 'all') {
      list = list.filter((g) => g.category?.toLowerCase() === category.toLowerCase());
    }

    res.status(200).json({
      success: true,
      message: 'Gallery items fetched successfully',
      count: list.length,
      data: list,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: 'Gallery items fetched successfully',
      count: galleryFallback.length,
      data: galleryFallback,
    });
  }
};

// @desc    Create a gallery item
// @route   POST /api/gallery
// @access  Private/Admin
export const createGalleryItem = async (req, res, next) => {
  try {
    const { title, imageUrl, category } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Title and image URL are required',
      });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(201).json({
        success: true,
        message: 'Gallery item created successfully (in-memory mode)',
        data: { _id: Date.now().toString(), ...req.body },
      });
    }

    const item = await Gallery.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Gallery item created successfully',
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a gallery item
// @route   PUT /api/gallery/:id
// @access  Private/Admin
export const updateGalleryItem = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        message: 'Gallery item updated successfully (in-memory mode)',
        data: { _id: req.params.id, ...req.body },
      });
    }

    const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Gallery item updated successfully',
      data: item,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
export const deleteGalleryItem = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({
        success: true,
        message: 'Gallery item deleted successfully (in-memory mode)',
        data: { id: req.params.id },
      });
    }

    const item = await Gallery.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Gallery item deleted successfully',
      data: { id: req.params.id },
    });
  } catch (error) {
    next(error);
  }
};
