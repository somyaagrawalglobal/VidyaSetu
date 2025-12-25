/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // instrumentationHook: true, // No longer needed in recent versions as it's stable? 
    // Docs say for 15+ it is stable. But for 13/14 it was experimental. 
    // User has "next": "16.1.1". It is enabled by default if file exists?
    // Let's explicitly check documentation behavior. 
    // As of Next 15, `instrumentation.js` is automatically detected.
  },
};

export default nextConfig;
