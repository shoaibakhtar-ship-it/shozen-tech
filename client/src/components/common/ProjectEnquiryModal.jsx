import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  X,
} from "lucide-react";

import api from "../../services/api";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  message: "",
};

const services = [
  "Website Development",
  "Web Application",
  "App Development",
  "UI / UX Design",
  "Backend Development",
  "API Development",
  "AI Solutions",
  "Automation",
  "Other",
];

const budgets = [
  "Under ₹25,000",
  "₹25,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1,00,000+",
  "Not Sure Yet",
];

function ProjectEnquiryModal({
  isOpen,
  onClose,
}) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isOpen, onClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const company = form.company.trim();
    const message = form.message.trim();

    if (!name) {
      setError("Please enter your name.");
      return;
    }

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError(
        "Please enter a valid email address."
      );
      return;
    }

    if (!phone) {
      setError(
        "Please enter your phone number."
      );
      return;
    }

    if (!message) {
      setError(
        "Please tell us about your project."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/contact",
        {
          name,
          email,
          phone,
          company,
          service: form.service,
          budget: form.budget,
          message,
        }
      );

      if (
        response.status === 200 ||
        response.status === 201
      ) {
        setSuccess(
          response.data?.message ||
            "Your enquiry has been submitted successfully."
        );

        setForm(initialForm);
      }
    } catch (err) {
      console.error(
        "Project enquiry error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Enquiry submit nahi ho paayi. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-black/75 px-4 py-5 backdrop-blur-[6px] sm:px-6 sm:py-8">

      {/* CLICK OUTSIDE */}
      <button
        type="button"
        aria-label="Close enquiry modal"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default"
      />

      {/* MODAL */}
      <div className="relative mx-auto w-full max-w-[920px] overflow-hidden rounded-[28px] border border-white/10 bg-[#171717] shadow-[0_30px_100px_rgba(0,0,0,0.55)]">

        {/* RED GLOW */}
        <div className="pointer-events-none absolute -bottom-[180px] right-[-120px] h-[420px] w-[420px] rounded-full bg-[#ef0038]/25 blur-[130px]" />

        {/* CLOSE */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] !text-white/70 transition hover:border-white/30 hover:bg-white/10 hover:!text-white md:right-7 md:top-7"
        >
          <X
            size={18}
            className="!text-white"
          />
        </button>

        <div className="relative px-5 pb-7 pt-16 sm:px-8 md:px-12 md:pb-10 md:pt-12">

          {/* HEADER */}
          <div className="text-center">

            <span className="inline-flex items-center gap-2 rounded-full border border-[#ef0038]/30 bg-[#ef0038]/10 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] !text-[#ef0038]">
              <span>⚡</span>
              LET&apos;S BUILD TOGETHER
            </span>

            <h2 className="mx-auto mt-6 max-w-[720px] text-[28px] font-semibold leading-[1.15] tracking-[-0.04em] !text-white sm:text-[34px] md:text-[40px]">
              Like what you see?{" "}
              <span className="!text-[#ef0038]">
                Drop in your details
              </span>
              <br className="hidden md:block" />{" "}
              and let&apos;s build together.
            </h2>

            <p className="mx-auto mt-3 max-w-[650px] text-[13px] leading-6 !text-white/45 md:text-[14px]">
              Tell us about your project and
              SHOZEN TECH will get in touch to
              understand what you want to build.
            </p>

          </div>

          {/* SUCCESS */}
          {success && (
            <div className="mx-auto mt-7 flex max-w-[720px] items-start gap-3 rounded-[14px] border border-green-400/20 bg-green-400/10 p-4">

              <CheckCircle2
                size={18}
                className="mt-[1px] shrink-0 !text-green-400"
              />

              <p className="text-[13px] leading-5 !text-green-300">
                {success}
              </p>

            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="mx-auto mt-7 max-w-[720px] rounded-[14px] border border-[#ef0038]/30 bg-[#ef0038]/10 p-4">

              <p className="text-[13px] !text-[#ff6686]">
                {error}
              </p>

            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mx-auto mt-9 max-w-[760px]"
          >

            <div className="grid gap-x-5 gap-y-5 md:grid-cols-2">

              {/* NAME */}
              <div>
                <label
                  htmlFor="modal-name"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.04em] !text-white/45"
                >
                  Full Name *
                </label>

                <input
                  id="modal-name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Enter your full name"
                  className="h-[55px] w-full rounded-[12px] border border-white/15 bg-white/[0.04] px-4 text-[14px] !text-white outline-none transition placeholder:!text-white/25 focus:border-[#ef0038]"
                />
              </div>

              {/* COMPANY */}
              <div>
                <label
                  htmlFor="modal-company"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.04em] !text-white/45"
                >
                  Company
                </label>

                <input
                  id="modal-company"
                  name="company"
                  type="text"
                  value={form.company}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Company name"
                  className="h-[55px] w-full rounded-[12px] border border-white/15 bg-white/[0.04] px-4 text-[14px] !text-white outline-none transition placeholder:!text-white/25 focus:border-[#ef0038]"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="modal-email"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.04em] !text-white/45"
                >
                  Email ID *
                </label>

                <input
                  id="modal-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="you@company.com"
                  className="h-[55px] w-full rounded-[12px] border border-white/15 bg-white/[0.04] px-4 text-[14px] !text-white outline-none transition placeholder:!text-white/25 focus:border-[#ef0038]"
                />
              </div>

              {/* PHONE */}
              <div>
                <label
                  htmlFor="modal-phone"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.04em] !text-white/45"
                >
                  Phone Number *
                </label>

                <div className="flex h-[55px] overflow-hidden rounded-[12px] border border-white/15 bg-white/[0.04] transition focus-within:border-[#ef0038]">

                  <span className="flex shrink-0 items-center border-r border-white/10 px-4 text-[12px] font-semibold !text-white/55">
                    +91
                  </span>

                  <input
                    id="modal-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Phone number"
                    className="min-w-0 flex-1 bg-transparent px-4 text-[14px] !text-white outline-none placeholder:!text-white/25"
                  />

                </div>
              </div>

              {/* SERVICE */}
              <div>
                <label
                  htmlFor="modal-service"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.04em] !text-white/45"
                >
                  Looking For
                </label>

                <select
                  id="modal-service"
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  disabled={loading}
                  className="h-[55px] w-full rounded-[12px] border border-white/15 bg-[#202020] px-4 text-[14px] !text-white/70 outline-none transition focus:border-[#ef0038]"
                >
                  <option value="">
                    Select service
                  </option>

                  {services.map((service) => (
                    <option
                      key={service}
                      value={service}
                    >
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* BUDGET */}
              <div>
                <label
                  htmlFor="modal-budget"
                  className="mb-2 block text-[10px] font-bold uppercase tracking-[0.04em] !text-white/45"
                >
                  Project Budget
                </label>

                <select
                  id="modal-budget"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  disabled={loading}
                  className="h-[55px] w-full rounded-[12px] border border-white/15 bg-[#202020] px-4 text-[14px] !text-white/70 outline-none transition focus:border-[#ef0038]"
                >
                  <option value="">
                    Select a range
                  </option>

                  {budgets.map((budget) => (
                    <option
                      key={budget}
                      value={budget}
                    >
                      {budget}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* MESSAGE */}
            <div className="mt-5">

              <label
                htmlFor="modal-message"
                className="mb-2 block text-[10px] font-bold uppercase tracking-[0.04em] !text-white/45"
              >
                Message / Comment *
              </label>

              <textarea
                id="modal-message"
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                disabled={loading}
                placeholder="Tell us about your project..."
                className="w-full resize-none rounded-[12px] border border-white/15 bg-white/[0.04] p-4 text-[14px] leading-6 !text-white outline-none transition placeholder:!text-white/25 focus:border-[#ef0038]"
              />

            </div>

            {/* BOTTOM */}
            <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-[11px] !text-white/30">
                🔒 Your information is safe with us
              </p>

              <button
                type="submit"
                disabled={loading}
                className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-full bg-[#ef0038] px-8 text-[13px] font-bold !text-white transition-all duration-300 hover:bg-white hover:!text-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>
                      Submit now
                    </span>

                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default ProjectEnquiryModal;