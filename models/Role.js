import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
}, {
    timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' }
});

export default mongoose.models.Role || mongoose.model('Role', RoleSchema);
