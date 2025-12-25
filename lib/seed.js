import dbConnect from '@/lib/db';
import User from '@/models/User';
import Role from '@/models/Role';
import bcrypt from 'bcryptjs';
import logger from '@/lib/logger';

export async function seedDefaults() {
    try {
        const conn = await dbConnect();
        // logger.info(`Database connected: ${conn.connection.name}`); // conn is the Mongoose object or connection

        // 1. Ensure Roles
        const roles = ['Admin', 'Student'];
        for (const roleName of roles) {
            const existingRole = await Role.findOne({ name: roleName });
            if (!existingRole) {
                await Role.create({ name: roleName });
                logger.info(`Created Default Role: ${roleName}`);
            }
        }

        // 2. Ensure Default Admin
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@vidyasetu.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (!existingAdmin) {
            const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@123', 10);
            await User.create({
                firstName: 'System',
                lastName: 'Admin',
                email: adminEmail,
                mobileNumber: '0000000000',
                passwordHash,
                roles: ['Admin'],
                isVerified: true,
                isActive: true,
            });
            logger.info(`Created Default Admin User: ${adminEmail}`);
        } else {
            // Optional: Check if existing admin has correct role
            if (!existingAdmin.roles.includes('Admin')) {
                existingAdmin.roles.push('Admin');
                await existingAdmin.save();
                logger.info(`Updated existing user ${adminEmail} with Admin role`);
            }
        }
    } catch (error) {
        logger.error('Error in seedDefaults:', error);
    }
}
