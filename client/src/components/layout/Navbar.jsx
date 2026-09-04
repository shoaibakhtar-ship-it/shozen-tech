import { useState } from "react";
import {
  Link,
  NavLink,
} from "react-router-dom";

import {
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

import shozenLogo from "../../assets/shozen-logo.png";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Services", path: "/services" },
  { name: "Process", path: "/process" },
  { name: "Contact", path: "/contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] =
    useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-[#eeeeee]">
        <div className="relative mx-auto flex h-[84px] max-w-[1600px] items-center justify-between px-4 sm:px-5 md:h-[104px] md:px-8 lg:px-12">

          {/* =========================
              LOGO
          ========================== */}
          <Link
            to="/"
            onClick={closeMenu}
            className="relative z-20 flex shrink-0 items-center"
          >
            <div className="relative h-[68px] w-[160px] overflow-hidden sm:w-[180px] md:h-[90px] md:w-[230px] lg:w-[270px]">
              <img
                src={shozenLogo}
                alt="SHOZEN TECH"
                className="
                  absolute
                  left-1/2
                  top-1/2
                  w-[185px]
                  max-w-none
                  -translate-x-1/2
                  -translate-y-1/2
                  object-contain
                  sm:w-[200px]
                  md:w-[218px]
                "
              />
            </div>
          </Link>

          {/* =========================
              DESKTOP CURVED CENTER NAV
          ========================== */}
          <div className="absolute left-1/2 top-0 hidden h-[104px] w-[860px] -translate-x-1/2 xl:block">

            {/* CENTER BODY */}
            <div className="absolute left-[70px] right-[70px] top-0 h-[104px] rounded-b-[44px] bg-white" />

            {/* LEFT CURVE */}
            <div className="absolute left-0 top-0 h-[78px] w-[145px] overflow-hidden">
              <div className="absolute right-0 top-0 h-[78px] w-[145px] bg-white" />

              <div className="absolute -left-[1px] bottom-0 h-[78px] w-[78px] rounded-br-[78px] bg-[#eeeeee]" />
            </div>

            {/* RIGHT CURVE */}
            <div className="absolute right-0 top-0 h-[78px] w-[145px] overflow-hidden">
              <div className="absolute left-0 top-0 h-[78px] w-[145px] bg-white" />

              <div className="absolute -right-[1px] bottom-0 h-[78px] w-[78px] rounded-bl-[78px] bg-[#eeeeee]" />
            </div>

            {/* LINKS */}
            <div className="relative z-10 flex h-full items-center justify-center px-20">
              <nav className="flex items-center gap-3">
                {links.map(
                  (link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={({
                        isActive,
                      }) =>
                        `rounded-[16px] border px-[18px] py-[13px] text-[15px] font-medium transition-all duration-200 ${
                          isActive
                            ? "border-[#ef0038] bg-white text-black"
                            : "border-black/10 bg-white text-black/80 hover:border-black/25 hover:text-black"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  )
                )}
              </nav>
            </div>
          </div>

          {/* =========================
              DESKTOP START PROJECT
          ========================== */}
          <Link
            to="/contact"
            className="group hidden shrink-0 items-center gap-3 rounded-full bg-black px-7 py-4 text-[14px] font-semibold !text-white shadow-[0_10px_25px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ef0038] hover:!text-white xl:inline-flex"
          >
            <span className="!text-white">
              Start Project
            </span>

            <ArrowUpRight
              size={17}
              className="!text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          {/* =========================
              MOBILE MENU BUTTON
          ========================== */}
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() =>
              setIsOpen(
                (current) =>
                  !current
              )
            }
            className="relative z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black !text-white sm:h-11 sm:w-11 xl:hidden"
          >
            {isOpen ? (
              <X
                size={20}
                className="!text-white"
              />
            ) : (
              <Menu
                size={20}
                className="!text-white"
              />
            )}
          </button>
        </div>
      </header>

      {/* =========================
          MOBILE MENU
      ========================== */}
      <div
        className={`fixed inset-0 z-40 bg-[#eeeeee] transition-all duration-300 xl:hidden ${
          isOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div className="flex min-h-screen flex-col px-4 pb-6 pt-[104px] sm:px-5 md:px-8 md:pb-8 md:pt-[125px]">

          {/* MENU LINKS */}
          <div className="overflow-hidden rounded-[24px] bg-white p-3 shadow-sm sm:rounded-[30px] sm:p-4">
            <nav className="flex flex-col">
              {links.map(
                (
                  link,
                  index
                ) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={
                      closeMenu
                    }
                    className={({
                      isActive,
                    }) =>
                      `flex items-center justify-between border-b border-black/10 px-4 py-4 text-[24px] font-semibold tracking-[-0.04em] last:border-b-0 sm:py-5 sm:text-[28px] ${
                        isActive
                          ? "text-[#ef0038]"
                          : "text-black"
                      }`
                    }
                  >
                    <span>
                      {link.name}
                    </span>

                    <span className="text-[11px] font-medium text-black/25">
                      0
                      {index +
                        1}
                    </span>
                  </NavLink>
                )
              )}
            </nav>
          </div>

          {/* =========================
              MOBILE START PROJECT
          ========================== */}
          <Link
            to="/contact"
            onClick={closeMenu}
            className="group mt-4 flex items-center justify-between rounded-full bg-black px-6 py-4 font-semibold !text-white transition-all duration-300 hover:bg-[#ef0038] hover:!text-white sm:mt-5 sm:px-7 sm:py-5"
          >
            <span className="!text-white">
              Start Project
            </span>

            <ArrowUpRight
              size={19}
              className="!text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          {/* =========================
              MOBILE BOTTOM BRAND
          ========================== */}
          <div className="mt-auto pt-6 sm:pt-10">
            <div className="flex h-[70px] w-[165px] items-center overflow-hidden">
              <img
                src={shozenLogo}
                alt="SHOZEN TECH"
                className="w-[180px] max-w-none object-contain"
              />
            </div>

            <p className="mt-2 max-w-xs text-[13px] leading-5 text-black/45 sm:mt-3 sm:text-sm sm:leading-6">
              Innovation Through
              Technology
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;