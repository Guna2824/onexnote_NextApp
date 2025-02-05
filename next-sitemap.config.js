/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://onexnote.com/',
    generateRobotsTxt: true, // Generate robots.txt file
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          disallow: ['/private/'], // Disallow the /private/ directory
          allow: '/',              // Allow all other pages
        },
      ],
      additionalSitemaps: [
        `${process.env.NEXT_PUBLIC_SITE_URL || 'https://onexnote.com/'}/sitemap.xml`, // Correctly formatted sitemap URL
      ],
    },
    // Increase the sitemap size to avoid generating multiple files
    sitemapSize: 5000, // Ensures all URLs fit into a single sitemap (adjust as needed based on your site size)
    generateIndexSitemap: false, // Disable index sitemap generation (prevents sitemap-0.xml)
  };
  