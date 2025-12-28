import mongoose from 'mongoose';

const UploadSessionSchema = new mongoose.Schema({
    uploadSessionId: {
        type: String,
        required: true,
        unique: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    youtubeUploadUrl: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    uploadedBytes: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'uploading', 'completed', 'failed'],
        default: 'pending'
    },
    videoId: {
        type: String
    },
    fileName: {
        type: String
    },
    mimeType: {
        type: String
    }
}, {
    timestamps: true
});

export default mongoose.models.UploadSession || mongoose.model('UploadSession', UploadSessionSchema);
