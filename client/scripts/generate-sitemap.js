import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = "https://shozen-tech.vercel.app";

const API_URL =
  process.env.VITE_API_URL ||
  "https://shozen-tech.onrender.com/api";

const OUTPUT_PATH = path.resolve(
  __dirname,
  "../public/sitemap.xml"
);

const staticRoutes = [
  {
    path: "/",
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/services",
    priority: "0.9",
    changefreq: "weekly",
  },
  {
    path: "/projects",
    priority: "0.9",
    changefreq: "weekly",
  },
  {
    path: "/about",
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/process",
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/contact",
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/privacy-policy",
    priority: "0.3",
    changefreq: "yearly",
  },
  {
    path: "/terms-and-conditions",
    priority: "0.3",
    changefreq: "yearly",
  },
];

const escapeXml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const normalizeDate = (value) => {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
};

const fetchProjects = async () => {
  const controller = new AbortController();

  const timeout = setTimeout(
    () => controller.abort(),
    60000
  );

  try {
    const response = await fetch(
      `${API_URL}/projects`,
      {
        headers: {
          Accept: "application/json",
        },
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Projects API returned ${response.status}`
      );
    }

    const data = await response.json();

    return Array.isArray(data?.data)
      ? data.data
      : [];
  } finally {
    clearTimeout(timeout);
  }
};

const buildUrlEntry = ({
  path: routePath,
  priority,
  changefreq,
  lastmod,
}) => {
  const lines = [
    "  <url>",
    `    <loc>${escapeXml(
      `${SITE_URL}${routePath}`
    )}</loc>`,
  ];

  if (lastmod) {
    lines.push(
      `    <lastmod>${escapeXml(
        lastmod
      )}</lastmod>`
    );
  }

  if (changefreq) {
    lines.push(
      `    <changefreq>${changefreq}</changefreq>`
    );
  }

  if (priority) {
    lines.push(
      `    <priority>${priority}</priority>`
    );
  }

  lines.push("  </url>");

  return lines.join("\n");
};

const generateSitemap = async () => {
  let projects = [];

  try {
    projects = await fetchProjects();

    console.log(
      `Sitemap: loaded ${projects.length} project(s).`
    );
  } catch (error) {
    console.warn(
      "Sitemap: project API could not be loaded."
    );

    console.warn(
      "Static routes will still be generated."
    );

    console.warn(
      error?.message || error
    );
  }

  const projectRoutes = projects
    .filter(
      (project) =>
        typeof project?.slug === "string" &&
        project.slug.trim()
    )
    .map((project) => ({
      path: `/projects/${encodeURIComponent(
        project.slug.trim()
      )}`,
      priority: project.featured
        ? "0.8"
        : "0.7",
      changefreq: "monthly",
      lastmod: normalizeDate(
        project.updatedAt ||
          project.createdAt
      ),
    }));

  const uniqueRoutes = [
    ...staticRoutes,
    ...projectRoutes,
  ].filter(
    (route, index, routes) =>
      routes.findIndex(
        (item) =>
          item.path === route.path
      ) === index
  );

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...uniqueRoutes.map(
      buildUrlEntry
    ),
    "</urlset>",
    "",
  ].join("\n");

  await fs.writeFile(
    OUTPUT_PATH,
    sitemap,
    "utf8"
  );

  console.log(
    `Sitemap generated with ${uniqueRoutes.length} URL(s).`
  );

  console.log(
    `Saved to: ${OUTPUT_PATH}`
  );
};

generateSitemap().catch(
  (error) => {
    console.error(
      "Sitemap generation failed:",
      error
    );

    process.exitCode = 1;
  }
);