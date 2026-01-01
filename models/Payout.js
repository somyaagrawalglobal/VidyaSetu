import mongoose from 'mongoose';

const PayoutSchema = new mongoose.Schema({
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }],
    amount: {
        type: Number,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Paid'],
        default: 'Paid',
    },
    payoutDate: {
        type: Date,
        default: Date.now,
    },
    notes: {
        type: String,
    }
}, {
    timestamps: true,
});

export default mongoose.models.Payout || mongoose.model('Payout', PayoutSchema);
