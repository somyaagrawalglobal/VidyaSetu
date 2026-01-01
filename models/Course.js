import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Course title is required'],
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0,
    },
    thumbnail: {
        type: String, // URL to image
        required: [true, 'Thumbnail is required'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
    },
    level: {
        type: String,
        default: 'All Levels',
        enum: ['All Levels', 'Beginner', 'Intermediate', 'Expert'],
    },
    language: {
        type: String,
        default: 'English',
    },
    originalPrice: {
        type: Number,
        default: 0,
    },
    learningOutcomes: [{
        type: String,
        trim: true,
    }],
    requirements: [{
        type: String,
        trim: true,
    }],
    provides: [{
        type: String,
        trim: true,
    }],
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    published: {
        type: Boolean,
        default: false,
    },
    approvalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    rejectionReason: {
        type: String,
        default: null,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    payoutStatus: {
        type: String,
        enum: ['Pending', 'Paid'],
        default: 'Pending',
    },
    payoutTransactionId: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
