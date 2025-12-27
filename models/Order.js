import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
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
    razorpayOrderId: {
        type: String,
        required: true,
    },
    razorpayPaymentId: {
        type: String,
    },
    razorpaySignature: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: 'INR',
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending',
    },
    couponCode: {
        type: String,
        default: null,
    },
    discountAmount: {
        type: Number,
        default: 0,
    },
    actualAmount: {
        type: Number,
        required: true,
    },
    refundStatus: {
        type: String,
        enum: ['none', 'pending', 'completed'],
        default: 'none',
    },
    refundId: {
        type: String,
        default: null,
    },
    userDetails: {
        firstName: String,
        lastName: String,
        email: String,
        mobileNumber: String,
    }
}, {
    timestamps: true,
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
