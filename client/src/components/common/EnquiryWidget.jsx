import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  MessageCircleMore,
  Phone,
  Send,
  X,
} from "lucide-react";

const PHONE_NUMBER = "9369893383";
const EMAIL_ADDRESS = "shozentech@gmail.com";

function EnquiryWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* =========================
          DESKTOP ENQUIRY TAB
      ========================== */}
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Open enquiry options"
        className="
          group
          fixed
          right-0
          top-1/2
          z-[70]
          hidden
          -translate-y-1/2
          overflow-hidden
          rounded-l-[14px]
          bg-black
          text-white
          shadow-[-8px_10px_30px_rgba(239,0,56,0.22)]
          lg:flex
          lg:flex-col
          lg:items-center
        "
      >
        <span
          className="
            flex
            h-[48px]
            w-[48px]
            items-center
            justify-center
            bg-[#ef0038]
            text-white
          "
        >
          {isOpen ? (
            <X size={19} strokeWidth={2.2} />
          ) : (
            <MessageCircleMore size={19} strokeWidth={2.2} />
          )}
        </span>

        <span
          className="
            flex
            h-[105px]
            w-[48px]
            items-center
            justify-center
            text-[11px]
            font-bold
            tracking-[0.18em]
            text-white
            [writing-mode:vertical-rl]
            rotate-180
          "
        >
          ENQUIRY
        </span>
      </button>

      {/* =========================
          DESKTOP POPUP
      ========================== */}
      <div
        className={`
          fixed
          right-[62px]
          top-1/2
          z-[69]
          hidden
          w-[280px]
          -translate-y-1/2
          transition-all
          duration-300
          lg:block
          ${
            isOpen
              ? "pointer-events-auto translate-x-0 opacity-100"
              : "pointer-events-none translate-x-5 opacity-0"
          }
        `}
      >
        <div
          className="
            rounded-[22px]
            border
            border-white/10
            bg-[#111111]
            p-3
            shadow-[0_25px_70px_rgba(0,0,0,0.35)]
          "
        >
          {/* CALL */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="
              group
              flex
              items-center
              gap-4
              rounded-[15px]
              border
              border-white/10
              bg-[#1c1c1c]
              px-4
              py-4
              text-white
              transition-all
              duration-300
              hover:border-[#ef0038]/50
              hover:bg-[#252525]
            "
          >
            <span
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#ef0038]
                text-white
                transition-transform
                duration-300
                group-hover:scale-105
              "
            >
              <Phone size={19} fill="currentColor" />
            </span>

            <span className="min-w-0">
              <span className="block text-[14px] font-bold text-white">
                Call Now
              </span>

              <span className="mt-0.5 block text-[12px] text-white/45">
                +91 {PHONE_NUMBER}
              </span>
            </span>
          </a>

          {/* EMAIL */}
          <a
            href={`mailto:${EMAIL_ADDRESS}`}
            className="
              group
              mt-2
              flex
              items-center
              gap-4
              rounded-[15px]
              border
              border-white/10
              bg-[#1c1c1c]
              px-4
              py-4
              text-white
              transition-all
              duration-300
              hover:border-[#ef0038]/50
              hover:bg-[#252525]
            "
          >
            <span
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#ef0038]
                text-white
                transition-transform
                duration-300
                group-hover:scale-105
              "
            >
              <Mail size={19} fill="currentColor" />
            </span>

            <span className="min-w-0">
              <span className="block text-[14px] font-bold text-white">
                Email Now
              </span>

              <span className="mt-0.5 block truncate text-[12px] text-white/45">
                {EMAIL_ADDRESS}
              </span>
            </span>
          </a>

          {/* ENQUIRE */}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="
              group
              mt-2
              flex
              items-center
              gap-4
              rounded-[15px]
              border
              border-white/10
              bg-[#1c1c1c]
              px-4
              py-4
              text-white
              transition-all
              duration-300
              hover:border-[#ef0038]/50
              hover:bg-[#252525]
            "
          >
            <span
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white
                text-[#ef0038]
                transition-transform
                duration-300
                group-hover:scale-105
              "
            >
              <Send size={19} fill="currentColor" />
            </span>

            <span>
              <span className="block text-[14px] font-bold text-white">
                Enquire Now
              </span>

              <span className="mt-0.5 block text-[12px] text-white/45">
                Share your requirement
              </span>
            </span>
          </Link>
        </div>
      </div>

      {/* =========================
          MOBILE FLOATING BUTTON
      ========================== */}
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Open enquiry options"
        className="
          fixed
          bottom-5
          right-5
          z-[80]
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#ef0038]
          text-white
          shadow-[0_12px_35px_rgba(239,0,56,0.35)]
          transition-transform
          active:scale-95
          lg:hidden
        "
      >
        {isOpen ? (
          <X size={22} />
        ) : (
          <MessageCircleMore size={22} />
        )}
      </button>

      {/* =========================
          MOBILE POPUP
      ========================== */}
      <div
        className={`
          fixed
          bottom-[88px]
          left-4
          right-4
          z-[79]
          transition-all
          duration-300
          lg:hidden
          ${
            isOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-5 opacity-0"
          }
        `}
      >
        <div className="mx-auto max-w-[360px] rounded-[22px] bg-[#111111] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-4 rounded-[15px] border border-white/10 bg-[#1c1c1c] p-4 text-white"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ef0038] text-white">
              <Phone size={19} fill="currentColor" />
            </span>

            <span>
              <strong className="block text-sm">
                Call Now
              </strong>

              <span className="text-xs text-white/45">
                +91 {PHONE_NUMBER}
              </span>
            </span>
          </a>

          <a
            href={`mailto:${EMAIL_ADDRESS}`}
            className="mt-2 flex items-center gap-4 rounded-[15px] border border-white/10 bg-[#1c1c1c] p-4 text-white"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ef0038] text-white">
              <Mail size={19} fill="currentColor" />
            </span>

            <span className="min-w-0">
              <strong className="block text-sm">
                Email Now
              </strong>

              <span className="block truncate text-xs text-white/45">
                {EMAIL_ADDRESS}
              </span>
            </span>
          </a>

          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="mt-2 flex items-center gap-4 rounded-[15px] border border-white/10 bg-[#1c1c1c] p-4 text-white"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#ef0038]">
              <Send size={19} fill="currentColor" />
            </span>

            <span>
              <strong className="block text-sm">
                Enquire Now
              </strong>

              <span className="text-xs text-white/45">
                Share your requirement
              </span>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default EnquiryWidget;