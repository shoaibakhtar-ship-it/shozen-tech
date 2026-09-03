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
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
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
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">

        {/* MAIN */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.15fr_0.8fr_0.9fr_1.2fr] lg:gap-10 lg:py-20">

          {/* BRAND */}
          <div className="lg:border-r lg:border-black/10 lg:pr-10">
            <Link
              to="/"
              className="inline-flex items-center"
            >
              <div className="relative h-[88px] w-[250px] overflow-hidden md:w-[280px]">
                <img
                  src={shozenLogo}
                  alt="SHOZEN TECH"
                  className="absolute left-1/2 top-1/2 w-[470px] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain md:w-[200px]"
                />
              </div>
            </Link>

            <p className="mt-5 max-w-[290px] text-[15px] leading-7 text-black/55">
              SHOZEN TECH builds modern websites, software products,
              AI solutions and scalable digital systems for ambitious
              businesses.
            </p>

            {/* SOCIAL */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-black transition-all duration-300 hover:border-[#ef0038] hover:bg-[#ef0038] hover:!text-white"
              >
                <InstagramIcon />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-black transition-all duration-300 hover:border-[#ef0038] hover:bg-[#ef0038] hover:!text-white"
              >
                <LinkedInIcon />
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-black transition-all duration-300 hover:border-[#ef0038] hover:bg-[#ef0038] hover:!text-white"
              >
                <GithubIcon />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-[22px] font-bold tracking-[-0.03em]">
              Quick Links
            </h3>

            <div className="mt-6 flex flex-col gap-3">
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

          {/* SERVICES */}
          <div>
            <h3 className="text-[22px] font-bold tracking-[-0.03em]">
              Our Services
            </h3>

            <div className="mt-6 flex flex-col gap-3">
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

          {/* CONTACT */}
          <div>
            <h3 className="text-[22px] font-bold tracking-[-0.03em]">
              Contact Us
            </h3>

            <p className="mt-6 max-w-[320px] text-[15px] leading-7 text-black/50">
              Have an idea or project in mind? Tell us what you want to
              build and we&apos;ll help you plan the right digital
              solution.
            </p>

            <div className="mt-7 space-y-3">
              <p className="text-sm font-semibold text-black">
                Phone
              </p>

              <a
                href="tel:9369893383"
                className="block w-fit text-[15px] text-black/50 transition hover:text-[#ef0038]"
              >
                9369893383
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

            {/* FOOTER CTA */}
            <Link
              to="/contact"
              className="group mt-7 inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold !text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ef0038] hover:!text-white"
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

        {/* COPYRIGHT */}
        <div className="border-t border-black/10 py-7">
          <div className="flex flex-col gap-4 text-[12px] text-black/40 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} SHOZEN TECH. All Rights Reserved.
            </p>

            <div className="flex gap-5">
              <a
                href="#"
                className="transition hover:text-[#ef0038]"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="transition hover:text-[#ef0038]"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;