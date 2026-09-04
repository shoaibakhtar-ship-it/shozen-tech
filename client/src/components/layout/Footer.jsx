import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import shozenLogo from "../../assets/shozen-logo.png";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Our Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Process", path: "/process" },
  { name: "Contact Us", path: "/contact" },
];

const services = [
  "Website Development",
  "AI Solutions",
  "UI/UX Design",
  "Product Development",
  "API Development",
  "Automation",
];

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
      />

      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5.2 3.4A2.2 2.2 0 1 1 5.2 7.8a2.2 2.2 0 0 1 0-4.4ZM3.4 9.2H7v11.4H3.4V9.2Zm5.8 0h3.5v1.6h.1c.5-.9 1.7-2 3.6-2 3.8 0 4.5 2.5 4.5 5.8v6h-3.6v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.4H9.8V9.2h-.6Z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.91-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.94a9.3 9.3 0 0 1 2.5.35c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white text-black">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-10">
        <div className="grid gap-10 py-12 md:grid-cols-2 md:gap-12 md:py-16 lg:grid-cols-[1.15fr_0.8fr_0.9fr_1.2fr] lg:gap-10 lg:py-20">
          <div className="lg:border-r lg:border-black/10 lg:pr-10">
            <Link
              to="/"
              className="inline-flex items-center"
            >
              <div
                className="
                  relative
                  h-[62px]
                  w-[170px]
                  overflow-hidden
                  sm:h-[68px]
                  sm:w-[185px]
                  md:h-[78px]
                  md:w-[210px]
                  lg:h-[88px]
                  lg:w-[200px]
                "
              >
                <img
                  src={shozenLogo}
                  alt="SHOZEN TECH"
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    w-[175px]
                    max-w-none
                    -translate-x-1/2
                    -translate-y-1/2
                    object-contain
                    sm:w-[190px]
                    md:w-[200px]
                    lg:w-[200px]
                  "
                />
              </div>
            </Link>

            <p className="mt-4 max-w-[290px] text-[14px] leading-6 text-black/55 sm:mt-5 sm:text-[15px] sm:leading-7">
              SHOZEN TECH builds modern websites,
              software products, AI solutions and
              scalable digital systems for ambitious
              businesses.
            </p>

            <div className="mt-6 flex items-center gap-3 sm:mt-7">
              <a
                href="https://www.instagram.com/shozentech/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SHOZEN TECH Instagram"
                title="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black transition-all duration-300 hover:border-[#ef0038] hover:bg-[#ef0038] hover:!text-white sm:h-11 sm:w-11"
              >
                <InstagramIcon />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SHOZEN TECH LinkedIn"
                title="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black transition-all duration-300 hover:border-[#ef0038] hover:bg-[#ef0038] hover:!text-white sm:h-11 sm:w-11"
              >
                <LinkedInIcon />
              </a>

              <a
                href="https://github.com/shoaibakhtar-ship-it"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SHOZEN TECH GitHub"
                title="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black transition-all duration-300 hover:border-[#ef0038] hover:bg-[#ef0038] hover:!text-white sm:h-11 sm:w-11"
              >
                <GithubIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[20px] font-bold tracking-[-0.03em] sm:text-[22px]">
              Quick Links
            </h3>

            <div className="mt-5 flex flex-col gap-3 sm:mt-6">
              {quickLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group flex w-fit items-center gap-2 text-[15px] text-black/50 transition hover:text-[#ef0038]"
                >
                  {item.name}

                  <ArrowUpRight
                    size={14}
                    className="opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[20px] font-bold tracking-[-0.03em] sm:text-[22px]">
              Our Services
            </h3>

            <div className="mt-5 flex flex-col gap-3 sm:mt-6">
              {services.map((service) => (
                <Link
                  key={service}
                  to="/services"
                  className="w-fit text-[15px] text-black/50 transition hover:text-[#ef0038]"
                >
                  {service}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[20px] font-bold tracking-[-0.03em] sm:text-[22px]">
              Contact Us
            </h3>

            <p className="mt-5 max-w-[320px] text-[14px] leading-6 text-black/50 sm:mt-6 sm:text-[15px] sm:leading-7">
              Have an idea or project in mind? Tell us
              what you want to build and we&apos;ll help
              you plan the right digital solution.
            </p>

            <div className="mt-6 space-y-3 sm:mt-7">
              <p className="text-sm font-semibold text-black">
                Phone
              </p>

              <a
                href="tel:+919369893383"
                className="block w-fit text-[15px] text-black/50 transition hover:text-[#ef0038]"
              >
                +91 9369893383
              </a>

              <p className="pt-2 text-sm font-semibold text-black">
                Email
              </p>

              <a
                href="mailto:shozentech@gmail.com"
                className="block w-fit break-all text-[15px] text-black/50 transition hover:text-[#ef0038]"
              >
                shozentech@gmail.com
              </a>
            </div>

            <Link
              to="/contact"
              className="group mt-6 inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold !text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ef0038] hover:!text-white sm:mt-7"
            >
              <span className="!text-white">
                Start a Project
              </span>

              <ArrowUpRight
                size={17}
                className="!text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>

        <div className="border-t border-black/10 py-6 sm:py-7">
          <div className="flex flex-col gap-4 text-[12px] text-black/40 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} SHOZEN TECH.
              All Rights Reserved.
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link
                to="/privacy-policy"
                className="transition hover:text-[#ef0038]"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms-and-conditions"
                className="transition hover:text-[#ef0038]"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;