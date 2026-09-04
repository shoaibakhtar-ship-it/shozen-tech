import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  Database,
  Layers3,
  Minus,
  MonitorSmartphone,
  Plus,
  Server,
  Sparkles,
  Workflow,
} from "lucide-react";

import api from "../services/api";
import SEO from "../components/common/SEO";

const faqs = [
  {
    question:
      "What kind of websites does SHOZEN TECH develop?",
    answer:
      "We build modern business websites, landing pages, custom web applications and scalable frontend experiences based on your actual requirements.",
  },
  {
    question:
      "Do you also develop web applications?",
    answer:
      "Yes. We can build complete web applications including frontend interfaces, backend APIs, databases and third-party integrations.",
  },
  {
    question:
      "Can you redesign my existing website?",
    answer:
      "Yes. Existing websites can be redesigned and modernized while preserving important functionality and improving responsiveness, usability and overall experience.",
  },
  {
    question:
      "Will my website work properly on mobile?",
    answer:
      "Yes. Responsive behavior is considered from the beginning so the website works properly across desktop, tablet and mobile devices.",
  },
  {
    question:
      "Can you integrate APIs, AI or automation?",
    answer:
      "Yes. Depending on the project requirements, we can integrate third-party APIs, AI-powered features and workflow automation.",
  },
];

const iconOptions = [
  Code2,
  MonitorSmartphone,
  Layers3,
  Bot,
  Server,
  Database,
  Workflow,
];

function Services() {
  const [services, setServices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [openFaq, setOpenFaq] =
    useState(0);

  const fetchServices =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await api.get("/services");

        const data =
          Array.isArray(
            response.data?.data
          )
            ? response.data.data
            : [];

        setServices(
          data.filter(
            (service) =>
              service.active !== false
          )
        );
      } catch (err) {
        console.error(
          "Services fetch error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Services load nahi ho pa rahe."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    fetchServices();

    const handleServicesUpdated =
      () => {
        fetchServices();
      };

    window.addEventListener(
      "shozen-services-updated",
      handleServicesUpdated
    );

    return () => {
      window.removeEventListener(
        "shozen-services-updated",
        handleServicesUpdated
      );
    };
  }, [fetchServices]);

  return (
    <div className="overflow-hidden bg-white text-[#111111]">
      <SEO
        title="Services | SHOZEN TECH"
        description="Explore SHOZEN TECH services including website development, app development, UI/UX design, AI solutions, automation and custom software development."
        path="/services"
      />
      <section className="relative overflow-hidden bg-[#f3f3f3]">
        <div className="mx-auto min-h-[390px] max-w-[1500px] px-6 py-20 md:px-10 lg:px-14 lg:py-24">
          <div className="text-center">
            <h1 className="text-[48px] font-semibold leading-none tracking-[-0.055em] sm:text-[58px] md:text-[66px]">
              Our{" "}
              <span className="text-[#ef0038]">
                Services
              </span>
            </h1>
          </div>

          <div className="relative mx-auto mt-11 grid max-w-[930px] gap-7 md:grid-cols-[190px_1fr] md:items-start">
            <div className="flex items-center gap-3 pt-1">
              <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.03em]">
                WHAT WE DO
              </span>

              <span className="h-px w-10 bg-black/70" />
            </div>

            <p className="max-w-[720px] text-[15px] leading-7 text-black/60 md:text-[16px]">
              SHOZEN TECH builds modern websites, web applications
              and digital solutions designed around performance,
              usability and real business requirements.
            </p>
          </div>

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
            className="pointer-events-none absolute right-[8%] top-[62px] hidden lg:block xl:right-[10%]"
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

      <section className="bg-white pb-16 pt-20 md:pb-20 md:pt-24">
        <div className="mx-auto max-w-[1100px] px-6 text-center md:px-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ef0038]/20 bg-[#ef0038]/5 px-5 py-2.5">
            <Sparkles
              size={13}
              className="text-[#ef0038]"
            />

            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#ef0038]">
              Our Expertise
            </span>
          </div>

          <h2 className="mt-5 text-[40px] font-semibold tracking-[-0.045em] md:text-[52px]">
            What We{" "}
            <span className="text-[#ef0038]">
              Do
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-[760px] text-[15px] leading-7 text-black/50">
            From modern websites and web applications to backend
            development, UI/UX and automation, we build digital
            solutions focused on performance, usability and long-term
            scalability.
          </p>
        </div>
      </section>

      {loading && (
        <section className="bg-white pb-28">
          <div className="mx-auto max-w-[1050px] px-6 md:px-10">
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="grid min-h-[370px] animate-pulse overflow-hidden rounded-[28px] border border-black/10 md:grid-cols-2"
                >
                  <div className="bg-black/[0.05]" />

                  <div className="p-8 md:p-10">
                    <div className="h-6 w-24 rounded-full bg-black/[0.06]" />
                    <div className="mt-8 h-8 w-[60%] rounded-full bg-black/[0.06]" />
                    <div className="mt-5 h-4 w-full rounded-full bg-black/[0.05]" />
                    <div className="mt-3 h-4 w-[80%] rounded-full bg-black/[0.05]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {!loading && error && (
        <section className="bg-white pb-28">
          <div className="mx-auto max-w-[1050px] px-6 md:px-10">
            <div className="rounded-[28px] border border-[#ef0038]/20 bg-[#ef0038]/5 p-8 text-center md:p-12">
              <h3 className="text-[28px] font-semibold tracking-[-0.04em]">
                Services load nahi hue.
              </h3>

              <p className="mt-4 text-[15px] text-black/50">
                {error}
              </p>

              <button
                type="button"
                onClick={fetchServices}
                className="mt-7 rounded-full bg-[#ef0038] px-7 py-3 text-sm font-semibold !text-white transition hover:bg-black"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      )}

      {!loading &&
        !error &&
        services.length === 0 && (
          <section className="bg-white pb-28">
            <div className="mx-auto max-w-[1050px] px-6 md:px-10">
              <div className="rounded-[28px] border border-black/10 bg-[#f6f6f6] p-10 text-center md:p-14">
                <h3 className="text-[30px] font-semibold tracking-[-0.04em]">
                  Services coming soon.
                </h3>

                <p className="mx-auto mt-4 max-w-[550px] text-[15px] leading-7 text-black/50">
                  Backend me active services add hote hi yahan
                  automatically show hongi.
                </p>
              </div>
            </div>
          </section>
        )}

      {!loading &&
        !error &&
        services.length > 0 && (
          <section className="bg-white pb-28 md:pb-36">
            <div className="mx-auto max-w-[1050px] px-6 md:px-10">
              <div className="space-y-6">
                {services.map((service, index) => {
                  const Icon =
                    iconOptions[
                      index % iconOptions.length
                    ];

                  const imageFirst =
                    index % 2 === 1;

                  return (
                    <motion.article
                      key={service._id}
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.15,
                      }}
                      transition={{
                        duration: 0.55,
                      }}
                      className="overflow-hidden rounded-[28px] border border-black/10 bg-white"
                    >
                      <div className="grid md:grid-cols-2">
                        <div
                          className={`flex min-h-[380px] flex-col justify-center p-7 sm:p-9 md:p-10 lg:p-11 ${
                            imageFirst
                              ? "md:order-2"
                              : "md:order-1"
                          }`}
                        >
                          <span className="w-fit rounded-full bg-[#ef0038]/7 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.09em] text-[#ef0038]">
                            SERVICE{" "}
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <h3 className="mt-5 text-[27px] font-semibold uppercase leading-tight tracking-[-0.035em] md:text-[30px]">
                            {service.title}
                          </h3>

                          <p className="mt-4 text-[14px] leading-7 text-black/50">
                            {service.description}
                          </p>

                          {Array.isArray(
                            service.features
                          ) &&
                            service.features.length >
                              0 && (
                              <div className="mt-6 grid gap-x-6 gap-y-3 border-t border-black/5 pt-5 sm:grid-cols-2">
                                {service.features
                                  .slice(0, 6)
                                  .map((feature) => (
                                    <div
                                      key={feature}
                                      className="flex items-start gap-2 text-[12px] leading-5 text-black/70"
                                    >
                                      <span className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#ef0038]/10">
                                        <Check
                                          size={10}
                                          strokeWidth={3}
                                          className="text-[#ef0038]"
                                        />
                                      </span>

                                      <span>
                                        {feature}
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            )}

                          <Link
                            to="/contact"
                            className="group mt-7 inline-flex w-fit items-center gap-5 rounded-full bg-[#ef0038] py-2 pl-6 pr-2 text-[12px] font-semibold !text-white shadow-[0_10px_25px_rgba(239,0,56,0.18)] transition-all duration-300 hover:bg-black hover:!text-white"
                          >
                            <span className="!text-white">
                              Know More
                            </span>

                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#ef0038]">
                              <ArrowRight
                                size={15}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                              />
                            </span>
                          </Link>
                        </div>

                        <div
                          className={`relative min-h-[330px] overflow-hidden bg-[#eeeeee] md:min-h-[430px] ${
                            imageFirst
                              ? "md:order-1"
                              : "md:order-2"
                          }`}
                        >
                          <div
                            className="
                              absolute
                              inset-0
                              opacity-[0.12]
                              [background-image:linear-gradient(to_right,#999_1px,transparent_1px),linear-gradient(to_bottom,#999_1px,transparent_1px)]
                              [background-size:38px_38px]
                            "
                          />

                          <div className="absolute -right-24 -top-24 h-[300px] w-[300px] rounded-full bg-[#ef0038]/18 blur-[90px]" />

                          <div className="absolute -bottom-32 -left-20 h-[300px] w-[300px] rounded-full bg-black/10 blur-[100px]" />

                          <div className="absolute left-[10%] top-[12%] h-[76%] w-[80%] rotate-[-3deg] overflow-hidden rounded-[26px] bg-[#151515] shadow-[0_30px_80px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:rotate-0">
                            <div className="flex h-12 items-center border-b border-white/10 px-4">
                              <div className="flex gap-2">
                                <span className="h-2 w-2 rounded-full bg-[#ef0038]" />
                                <span className="h-2 w-2 rounded-full bg-white/20" />
                                <span className="h-2 w-2 rounded-full bg-white/20" />
                              </div>
                            </div>

                            <div className="relative flex h-[calc(100%-48px)] items-center justify-center">
                              <div className="absolute inset-x-8 top-9 space-y-3 opacity-40">
                                <div className="h-2 w-[68%] rounded-full bg-white/20" />
                                <div className="h-2 w-[45%] rounded-full bg-[#ef0038]/50" />
                                <div className="h-2 w-[78%] rounded-full bg-white/10" />
                              </div>

                              <div className="flex h-28 w-28 items-center justify-center rounded-[32px] bg-[#ef0038] text-white shadow-[0_20px_50px_rgba(239,0,56,0.28)]">
                                <Icon
                                  size={48}
                                  strokeWidth={1.3}
                                  className="!text-white"
                                />
                              </div>

                              <div className="absolute bottom-7 left-7 right-7 flex gap-2">
                                <div className="h-2 flex-1 rounded-full bg-white/10" />
                                <div className="h-2 w-[25%] rounded-full bg-[#ef0038]/70" />
                              </div>
                            </div>
                          </div>

                          <div className="absolute bottom-5 right-5 text-[60px] font-black tracking-[-0.08em] text-black/[0.06]">
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

      <section className="border-y border-black/10 bg-[#f4f4f4] py-20 md:py-24">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr] md:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#ef0038]">
                Technology Stack
              </p>

              <h2 className="mt-4 text-[39px] font-semibold leading-[1] tracking-[-0.045em] md:text-[50px]">
                Tools built for
                <br />
                modern{" "}
                <span className="text-[#ef0038]">
                  development.
                </span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                "React",
                "JavaScript",
                "Node.js",
                "Express",
                "MongoDB",
                "REST APIs",
                "UI / UX",
                "Responsive Design",
                "AI Integration",
                "Automation",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/10 bg-white px-5 py-3 text-[12px] font-semibold text-black/55 transition-all duration-300 hover:-translate-y-1 hover:border-[#ef0038] hover:bg-[#ef0038] hover:!text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[1050px] px-6 md:px-10">
          <h2 className="text-[35px] font-semibold tracking-[-0.045em] md:text-[44px]">
            Frequently Asked{" "}
            <span className="text-[#ef0038]">
              Questions
            </span>
          </h2>

          <div className="mt-8 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen =
                openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-[14px] border border-black/10 bg-white"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(
                        isOpen
                          ? -1
                          : index
                      )
                    }
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left md:px-6"
                  >
                    <span className="text-[14px] font-semibold md:text-[15px]">
                      {faq.question}
                    </span>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f5f5] text-black transition-all duration-300">
                      {isOpen ? (
                        <Minus size={15} />
                      ) : (
                        <Plus size={15} />
                      )}
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[850px] px-5 pb-6 text-[14px] leading-7 text-black/50 md:px-6">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white pb-28 pt-10 md:pb-36">
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.11]
            [background-image:radial-gradient(#c5c5c5_1px,transparent_1px)]
            [background-size:20px_20px]
          "
        />

        <div className="pointer-events-none absolute right-[-150px] top-[-100px] h-[450px] w-[450px] rounded-full bg-[#ef0038]/8 blur-[120px]" />

        <div className="relative mx-auto max-w-[850px] px-6 text-center md:px-10">
          <h2 className="text-[48px] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[55px] md:text-[66px]">
            Let&apos;s start your
            <br />
            journey with{" "}
            <span className="text-[#ef0038]">
              SHOZEN
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-[570px] text-[15px] leading-7 text-black/50">
            Have a website or application idea? Tell us what
            you&apos;re planning and let&apos;s build the right
            digital solution for your business.
          </p>

          <Link
            to="/contact"
            className="group mt-8 inline-flex items-center gap-4 rounded-[14px] bg-[#ef0038] px-7 py-4 text-sm font-semibold !text-white shadow-[0_12px_30px_rgba(239,0,56,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-black hover:!text-white"
          >
            <span className="!text-white">
              Get In Touch
            </span>

            <ArrowUpRight
              size={17}
              className="!text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Services;