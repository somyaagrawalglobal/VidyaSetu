import mongoose from 'mongoose';

const ReplySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' }
});

const QuestionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    replies: [ReplySchema],
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' }
});

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema);
