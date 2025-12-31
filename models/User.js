import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
        trim: true,
    },
    headline: {
        type: String,
        default: 'Instructor',
        trim: true,
    },
    bio: {
        type: String,
        default: '',
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    mobileNumber: {
        type: String,
        required: [true, 'Mobile Number is required'],
        trim: true,
    },
    passwordHash: {
        type: String,
        required: [true, 'Password is required'],
    },
    roles: [{
        type: String,
        default: 'Student'
    }],
    isActive: {
        type: Boolean,
        default: true,
    },
    isRestricted: {
        type: Boolean,
        default: false,
    },
    // Session / Token Management
    activeToken: {
        type: String,
        default: null,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: String,
    verificationTokenExpiry: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    deletedOn: {
        type: Date,
        default: null,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    payoutDetails: {
        bankName: String,
        accountNumber: String,
        accountHolderName: String,
        ifscCode: String,
        upiId: String,
    }
}, {
    timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
