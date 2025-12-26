export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const { seedDefaults } = await import('@/lib/seed');
        const { default: logger } = await import('@/lib/logger');
        const { default: dbConnect } = await import('@/lib/db');

        try {
            logger.info('Starting up VidyaSetu...');

            await dbConnect();
            logger.info('Database connection established successfully.');

            await seedDefaults();
            logger.info('Database seeding completed (Roles/Admin check).');

        } catch (error) {
            logger.error('Startup Error:', error);
        }
    }
}
