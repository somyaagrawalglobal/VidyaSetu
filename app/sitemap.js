import dbConnect from '@/lib/db';
import Course from '@/models/Course';

export default async function sitemap() {
    const baseUrl = 'https://www.vidya-setu.com';

    // Static routes
    const routes = [
        '',
        '/about',
        '/courses',
        '/careers',
        '/contact',
        '/login',
        '/register',
        '/privacy-policy',
        '/refund-policy',
        '/terms-of-service',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    // Fetch dynamic course routes
    let courseRoutes = [];
    try {
        await dbConnect();
        // Fetch only published and approved courses
        const courses = await Course.find({
            published: true,
            approvalStatus: 'approved',
            isDeleted: { $ne: true }
        }).select('slug updatedAt');

        courseRoutes = courses.map((course) => ({
            url: `${baseUrl}/courses/${course.slug}`,
            lastModified: course.updatedAt ? new Date(course.updatedAt).toISOString() : new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.9,
        }));
    } catch (error) {
        console.error('Error generating sitemap for courses:', error);
    }

    return [...routes, ...courseRoutes];
}
