import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    completedLessons: [{
        type: String, // Storing lesson IDs as strings
    }],
    isCompleted: {
        type: Boolean,
        default: false,
    },
    lastAccessed: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
});

// Ensure unique entry for each user-course combination
ProgressSchema.index({ user: 1, course: 1 }, { unique: true });

export default mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);
