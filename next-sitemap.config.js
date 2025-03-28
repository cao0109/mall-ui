/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "http://localhost:3000",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "daily",
  priority: 0.7,

  // 定义静态页面
  additionalPaths: async (config) => {
    const locales = ["en", "zh"];
    const staticPages = [
      "", // 首页
      "/about",
      "/auth/login",
      "/auth/register",
      "/categories",
      "/contact",
      "/faq",
      "/my-stores",
      "/my-stores/authorize",
      "/products",
      "/selected-products",
      "/suppliers",
    ];

    const result = [];
    for (const locale of locales) {
      for (const page of staticPages) {
        const basePath = page === "" ? "" : page;
        result.push({
          loc: `${config.siteUrl}/${locale}${basePath}`,
          changefreq: config.changefreq,
          priority: config.priority,
          lastmod: new Date().toISOString(),
          alternateRefs: locales.map((altLocale) => ({
            href: `${config.siteUrl}/${altLocale}${basePath}`,
            hreflang: altLocale,
          })),
        });
      }
    }
    return result;
  },

  // 处理自动检测的路由（如果有）
  transform: async (config, path) => {
    const locales = ["en", "zh"];
    const basePath =
      locales.reduce((acc, locale) => acc.replace(`/${locale}`, ""), path) ||
      "/";
    const currentLocale =
      locales.find((locale) => path.startsWith(`/${locale}`)) || locales[0];

    return {
      loc: `${config.siteUrl}/${currentLocale}${
        basePath === "/" ? "" : basePath
      }`,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: locales.map((locale) => ({
        href: `${config.siteUrl}/${locale}${basePath === "/" ? "" : basePath}`,
        hreflang: locale,
      })),
    };
  },

  // 排除不需要的路径
  exclude: ["/api/*"], // 排除 API 路由

  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
