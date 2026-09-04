import { useEffect } from "react";

const SITE_URL =
  "https://shozen-tech.vercel.app";

const DEFAULT_TITLE =
  "SHOZEN TECH | Website, App & Software Development";

const DEFAULT_DESCRIPTION =
  "SHOZEN TECH builds modern websites, web applications, custom software, AI solutions and automation systems for businesses.";

function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
}) {
  useEffect(() => {
    const canonicalUrl =
      `${SITE_URL}${path === "/" ? "/" : path}`;

    // Page title
    document.title = title;

    // Meta description
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

    // Canonical URL
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

    // Open Graph
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

    // Twitter / X
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

        document.head.appendChild(tag);
      }

      tag.setAttribute(
        "content",
        content
      );
    };

    setMetaName(
      "twitter:title",
      title
    );

    setMetaName(
      "twitter:description",
      description
    );
  }, [
    title,
    description,
    path,
  ]);

  return null;
}

export default SEO;