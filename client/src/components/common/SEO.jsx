import { useEffect } from "react";

const SITE_URL =
  "https://shozentech.vercel.app";

const DEFAULT_TITLE =
  "SHOZEN TECH | Website, App & Software Development";

const DEFAULT_DESCRIPTION =
  "SHOZEN TECH builds modern websites, web applications, custom software, AI solutions and automation systems for businesses.";

function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  structuredData = null,
}) {
  useEffect(() => {
    const canonicalUrl =
      `${SITE_URL}${path === "/" ? "/" : path}`;

    /* =========================
       DOCUMENT TITLE
    ========================= */

    document.title = title;

    /* =========================
       DESCRIPTION
    ========================= */

    let descriptionTag =
      document.querySelector(
        'meta[name="description"]'
      );

    if (!descriptionTag) {
      descriptionTag =
        document.createElement("meta");

      descriptionTag.setAttribute(
        "name",
        "description"
      );

      document.head.appendChild(
        descriptionTag
      );
    }

    descriptionTag.setAttribute(
      "content",
      description
    );

    /* =========================
       CANONICAL URL
    ========================= */

    let canonicalTag =
      document.querySelector(
        'link[rel="canonical"]'
      );

    if (!canonicalTag) {
      canonicalTag =
        document.createElement("link");

      canonicalTag.setAttribute(
        "rel",
        "canonical"
      );

      document.head.appendChild(
        canonicalTag
      );
    }

    canonicalTag.setAttribute(
      "href",
      canonicalUrl
    );

    /* =========================
       OPEN GRAPH
    ========================= */

    const setMetaProperty = (
      property,
      content
    ) => {
      let tag =
        document.querySelector(
          `meta[property="${property}"]`
        );

      if (!tag) {
        tag =
          document.createElement("meta");

        tag.setAttribute(
          "property",
          property
        );

        document.head.appendChild(tag);
      }

      tag.setAttribute(
        "content",
        content
      );
    };

    setMetaProperty(
      "og:title",
      title
    );

    setMetaProperty(
      "og:description",
      description
    );

    setMetaProperty(
      "og:url",
      canonicalUrl
    );

    setMetaProperty(
      "og:type",
      "website"
    );

    setMetaProperty(
      "og:site_name",
      "SHOZEN TECH"
    );

    /* =========================
       TWITTER
    ========================= */

    const setMetaName = (
      name,
      content
    ) => {
      let tag =
        document.querySelector(
          `meta[name="${name}"]`
        );

      if (!tag) {
        tag =
          document.createElement("meta");

        tag.setAttribute(
          "name",
          name
        );

        document.head.appendChild(
          tag
        );
      }

      tag.setAttribute(
        "content",
        content
      );
    };

    setMetaName(
      "twitter:card",
      "summary_large_image"
    );

    setMetaName(
      "twitter:title",
      title
    );

    setMetaName(
      "twitter:description",
      description
    );

    /* =========================
       ROBOTS
    ========================= */

    setMetaName(
      "robots",
      "index, follow"
    );

    /* =========================
       STRUCTURED DATA
    ========================= */

    const schemaId =
      "shozen-page-schema";

    const oldSchema =
      document.getElementById(
        schemaId
      );

    if (oldSchema) {
      oldSchema.remove();
    }

    let schema = structuredData;

    if (path === "/") {
      schema = {
        "@context":
          "https://schema.org",
        "@graph": [
          {
            "@type":
              "Organization",
            "@id":
              `${SITE_URL}/#organization`,
            name:
              "SHOZEN TECH",
            url:
              `${SITE_URL}/`,
            description:
              DEFAULT_DESCRIPTION,
            slogan:
              "Innovation Through Technology",
            sameAs: [
              "https://www.instagram.com/shozentech/",
              "https://www.linkedin.com/",
              "https://github.com/shoaibakhtar-ship-it",
            ],
          },
          {
            "@type":
              "WebSite",
            "@id":
              `${SITE_URL}/#website`,
            url:
              `${SITE_URL}/`,
            name:
              "SHOZEN TECH",
            description:
              DEFAULT_DESCRIPTION,
            publisher: {
              "@id":
                `${SITE_URL}/#organization`,
            },
            inLanguage:
              "en",
          },
        ],
      };
    }

    if (schema) {
      const script =
        document.createElement(
          "script"
        );

      script.id = schemaId;
      script.type =
        "application/ld+json";

      script.textContent =
        JSON.stringify(schema);

      document.head.appendChild(
        script
      );
    }

    /* =========================
       CLEANUP
    ========================= */

    return () => {
      const currentSchema =
        document.getElementById(
          schemaId
        );

      if (currentSchema) {
        currentSchema.remove();
      }
    };
  }, [
    title,
    description,
    path,
    structuredData,
  ]);

  return null;
}

export default SEO;
