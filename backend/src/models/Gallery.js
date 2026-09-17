import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Gallery item title is required'],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    category: {
      type: String,
      default: 'Team',
    },
    description: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
    uploadedBy: {
      type: String,
      default: 'Fahrenheit Cricket Club Admin',
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
