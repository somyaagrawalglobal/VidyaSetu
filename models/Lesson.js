import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
    },
    url: {
        type: String,
        trim: true,
    },
    type: {
        type: String,
        default: 'External Link',
    }
});

const LessonSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    moduleTitle: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: [true, 'Lesson title is required'],
        trim: true,
    },
    description: {
        type: String,
        default: '',
    },
    videoId: {
        type: String, // YouTube Video ID
    },
    duration: {
        type: Number, // In seconds
        default: 0,
    },
    isFree: {
        type: Boolean,
        default: false,
    },
    resources: [ResourceSchema],
    order: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});

export default mongoose.models.Lesson || mongoose.model('Lesson', LessonSchema);
