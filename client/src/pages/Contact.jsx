import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

import api from "../services/api";
import SEO from "../components/common/SEO";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  message: "",
};

const serviceOptions = [
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

const budgetOptions = [
  "Under ₹25,000",
  "₹25,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1,00,000+",
  "Not Sure Yet",
];

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (success) {
      setSuccess("");
    }

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccess("");
    setError("");

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
      setError("Please enter a valid email address.");
      return;
    }

    if (!phone) {
      setError("Please enter your phone number.");
      return;
    }

    if (!message) {
      setError("Please tell us about your project.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name,
        email,
        phone,
        company,
        service: form.service,
        budget: form.budget,
        message,
      };

      const response = await api.post(
        "/contact",
        payload
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
      } else {
        setError(
          "Enquiry submit nahi ho paayi. Please try again."
        );
      }
    } catch (err) {
      console.error(
        "Contact form submit error:",
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

  return (
    <div className="overflow-hidden bg-white text-[#111111]">

      <SEO
        title="Contact SHOZEN TECH | Start Your Project"
        description="Contact SHOZEN TECH to discuss your website, app, software, AI solution or automation project."
        path="/contact"
      />
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#f2f2f2]">
        <div className="relative mx-auto min-h-[390px] max-w-[1500px] px-6 py-20 md:px-10 lg:px-14 lg:py-24">

          <div className="text-center">
            <h1 className="text-[48px] font-semibold leading-none tracking-[-0.055em] sm:text-[58px] md:text-[66px]">
              Contact{" "}
              <span className="text-[#ef0038]">
                Us
              </span>
            </h1>
          </div>

          <div className="mx-auto mt-11 grid max-w-[930px] gap-7 md:grid-cols-[190px_1fr] md:items-start">

            <div className="flex items-center gap-3 pt-1">
              <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.04em]">
                LET&apos;S TALK
              </span>

              <span className="h-px w-10 bg-black/70" />
            </div>

            <p className="max-w-[700px] text-[15px] leading-7 text-black/60 md:text-[16px]">
              Have a website, application or digital
              solution in mind? Share your requirement
              with SHOZEN TECH and we&apos;ll understand
              what you want to build.
            </p>

          </div>

          {/* DECORATIVE ARROW */}
          <motion.div
            animate={{
              y: [0, 7, 0],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute right-[8%] top-[60px] hidden lg:block xl:right-[10%]"
          >
            <svg
              width="100"
              height="125"
              viewBox="0 0 100 125"
              fill="none"
            >
              <path
                d="M56 7C40 9 33 22 35 35C37 47 48 53 58 48C68 42 70 25 65 16C61 9 54 10 52 20C49 36 59 49 77 52"
                stroke="#111111"
                strokeWidth="1.45"
                strokeLinecap="round"
              />

              <path
                d="M77 52C66 66 52 75 36 78C28 79 24 83 25 89C27 97 37 102 49 104"
                stroke="#111111"
                strokeWidth="1.45"
                strokeLinecap="round"
              />

              <path
                d="M72 63C65 77 56 87 44 94"
                stroke="#111111"
                strokeWidth="1.3"
                strokeLinecap="round"
              />

              <path
                d="M44 94L50 86M44 94L53 96"
                stroke="#111111"
                strokeWidth="1.45"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

        </div>
      </section>

      {/* =====================================================
          CONTACT SECTION
      ====================================================== */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[1250px] px-6 md:px-10">

          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">

            {/* =================================================
                LEFT
            ================================================= */}
            <div>

              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#ef0038]">
                Get In Touch
              </p>

              <h2 className="mt-5 text-[42px] font-semibold leading-[1] tracking-[-0.05em] md:text-[58px]">
                Have an idea?
                <br />
                Let&apos;s talk{" "}
                <span className="text-[#ef0038]">
                  about it.
                </span>
              </h2>

              <p className="mt-6 max-w-[470px] text-[15px] leading-7 text-black/50">
                Tell us what you want to build, what
                problem you&apos;re trying to solve and
                any important requirements you already
                have.
              </p>

              {/* CONTACT DETAILS */}
              <div className="mt-10 space-y-3">

                <a
                  href="tel:9369893383"
                  className="group flex items-center gap-4 rounded-[20px] border border-black/10 p-4 transition-all duration-300 hover:border-[#ef0038]/30 hover:bg-[#f7f7f7]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ef0038] !text-white">
                    <Phone
                      size={18}
                      className="!text-white"
                    />
                  </span>

                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-black/30">
                      Phone
                    </span>

                    <span className="mt-1 block text-[15px] font-semibold">
                      +91 9369893383
                    </span>
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="ml-auto text-black/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#ef0038]"
                  />
                </a>

                <a
                  href="mailto:shozentech@gmail.com"
                  className="group flex items-center gap-4 rounded-[20px] border border-black/10 p-4 transition-all duration-300 hover:border-[#ef0038]/30 hover:bg-[#f7f7f7]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black !text-white">
                    <Mail
                      size={18}
                      className="!text-white"
                    />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-black/30">
                      Email
                    </span>

                    <span className="mt-1 block truncate text-[15px] font-semibold">
                      shozentech@gmail.com
                    </span>
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="ml-auto shrink-0 text-black/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#ef0038]"
                  />
                </a>

              </div>

              {/* SMALL INFO */}
              <div className="mt-10 border-t border-black/10 pt-8">

                <div className="flex items-start gap-3">
                  <MapPin
                    size={17}
                    className="mt-1 shrink-0 text-[#ef0038]"
                  />

                  <div>
                    <p className="text-[13px] font-semibold">
                      Working Remotely
                    </p>

                    <p className="mt-1 text-[13px] leading-6 text-black/40">
                      Websites, applications and digital
                      solutions can be planned and developed
                      remotely.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* =================================================
                FORM
            ================================================= */}
            <div className="rounded-[30px] bg-[#f3f3f3] p-5 sm:p-7 md:p-9 lg:p-10">

              <div className="mb-8">

                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#ef0038]">
                  Project Enquiry
                </span>

                <h3 className="mt-3 text-[30px] font-semibold tracking-[-0.04em] md:text-[36px]">
                  Tell us about your project.
                </h3>

              </div>

              {/* SUCCESS */}
              {success && (
                <div className="mb-6 flex items-start gap-3 rounded-[16px] border border-green-500/20 bg-green-500/10 p-4 text-green-800">

                  <CheckCircle2
                    size={19}
                    className="mt-[1px] shrink-0"
                  />

                  <p className="text-[13px] leading-6">
                    {success}
                  </p>

                </div>
              )}

              {/* ERROR */}
              {error && (
                <div className="mb-6 rounded-[16px] border border-[#ef0038]/20 bg-[#ef0038]/5 p-4">

                  <p className="text-[13px] leading-6 text-[#ef0038]">
                    {error}
                  </p>

                </div>
              )}

              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
              >

                {/* NAME + EMAIL */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-black/45"
                    >
                      Your Name *
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="Your name"
                      className="h-[56px] w-full rounded-[14px] border border-black/10 bg-white px-4 text-[14px] outline-none transition-all placeholder:text-black/25 focus:border-[#ef0038]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-black/45"
                    >
                      Email Address *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="you@example.com"
                      className="h-[56px] w-full rounded-[14px] border border-black/10 bg-white px-4 text-[14px] outline-none transition-all placeholder:text-black/25 focus:border-[#ef0038]"
                    />
                  </div>

                </div>

                {/* PHONE + COMPANY */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-black/45"
                    >
                      Phone Number *
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="+91"
                      className="h-[56px] w-full rounded-[14px] border border-black/10 bg-white px-4 text-[14px] outline-none transition-all placeholder:text-black/25 focus:border-[#ef0038]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-black/45"
                    >
                      Company
                    </label>

                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="Optional"
                      className="h-[56px] w-full rounded-[14px] border border-black/10 bg-white px-4 text-[14px] outline-none transition-all placeholder:text-black/25 focus:border-[#ef0038]"
                    />
                  </div>

                </div>

                {/* SERVICE + BUDGET */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="service"
                      className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-black/45"
                    >
                      Service
                    </label>

                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      disabled={loading}
                      className="h-[56px] w-full rounded-[14px] border border-black/10 bg-white px-4 text-[14px] outline-none transition-all focus:border-[#ef0038]"
                    >
                      <option value="">
                        Select a service
                      </option>

                      {serviceOptions.map(
                        (service) => (
                          <option
                            key={service}
                            value={service}
                          >
                            {service}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="budget"
                      className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-black/45"
                    >
                      Budget
                    </label>

                    <select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      disabled={loading}
                      className="h-[56px] w-full rounded-[14px] border border-black/10 bg-white px-4 text-[14px] outline-none transition-all focus:border-[#ef0038]"
                    >
                      <option value="">
                        Select budget
                      </option>

                      {budgetOptions.map(
                        (budget) => (
                          <option
                            key={budget}
                            value={budget}
                          >
                            {budget}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                </div>

                {/* MESSAGE */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-black/45"
                  >
                    Project Requirement *
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={form.message}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Tell us what you want to build..."
                    className="w-full resize-none rounded-[14px] border border-black/10 bg-white p-4 text-[14px] leading-6 outline-none transition-all placeholder:text-black/25 focus:border-[#ef0038]"
                  />
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex min-h-[56px] w-full items-center justify-center gap-3 rounded-full bg-[#ef0038] px-7 text-[14px] font-semibold !text-white transition-all duration-300 hover:bg-black hover:!text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      <span className="!text-white">
                        Sending...
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="!text-white">
                        Send Enquiry
                      </span>

                      <Send
                        size={17}
                        className="!text-white transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

              </form>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          BOTTOM DARK SECTION
      ====================================================== */}
      <section className="bg-[#111111] py-20 text-white md:py-28">
        <div className="mx-auto max-w-[1150px] px-6 md:px-10">

          <div className="grid gap-10 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "Share Your Idea",
                text: "Tell us what you want to build and the requirement you currently have.",
              },
              {
                number: "02",
                title: "Discuss The Scope",
                text: "We understand the features, users and technical direction of the project.",
              },
              {
                number: "03",
                title: "Plan The Build",
                text: "Once the direction is clear, the project can move into design and development.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="border-t border-white/10 pt-6"
              >
                <span className="text-[10px] font-bold !text-[#ef0038]">
                  {item.number}
                </span>

                <h3 className="mt-7 text-[23px] font-semibold tracking-[-0.035em] !text-white">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-[300px] text-[13px] leading-6 !text-white/40">
                  {item.text}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

    </div>
  );
}

export default Contact;