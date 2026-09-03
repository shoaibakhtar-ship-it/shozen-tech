import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import getMediaUrl from "../utils/getMediaUrl";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Code2,
  Cpu,
  Layers3,
  Check,
  Plus,
  Minus,
} from "lucide-react";

import api from "../services/api";
import { useEnquiryModal } from "../context/EnquiryModalContext";

/* =========================
   DATA
========================= */

const workItems = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Fast, scalable and conversion-focused websites built for modern businesses.",
    icon: Code2,
  },
  {
    number: "02",
    title: "AI Solutions",
    description:
      "Smart AI-powered tools and automation designed around your workflow.",
    icon: Bot,
  },
  {
    number: "03",
    title: "UI / UX Design",
    description:
      "Clean and purposeful interfaces that make digital products easy to use.",
    icon: Layers3,
  },
  {
    number: "04",
    title: "App Development",
    description:
      "Modern and scalable applications engineered around real business requirements.",
    icon: Cpu,
  },
];

const processItems = [
  {
    number: "01",
    title: "Understand",
    description:
      "We understand your business, users, problem and actual project goals.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "We convert the idea into a clear technical roadmap and development strategy.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "We create a clean visual direction focused on usability and experience.",
  },
  {
    number: "04",
    title: "Build",
    description:
      "We develop scalable frontend, backend and integrations using modern tools.",
  },
  {
    number: "05",
    title: "Test",
    description:
      "Every important flow is tested and refined before the website or app goes live.",
  },
  {
    number: "06",
    title: "Launch",
    description:
      "We prepare your website or application for real users and future growth.",
  },
];

const technologies = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "REST API",
  "JavaScript",
  "AI Integration",
  "Automation",
  "Responsive UI",
  "Cloud Ready",
];

const faqs = [
  {
    question: "What type of projects does SHOZEN TECH build?",
    answer:
      "We build business websites, web applications, custom applications, AI integrations, automation systems and modern UI/UX experiences.",
  },
  {
    question: "Can you build both frontend and backend?",
    answer:
      "Yes. We can handle complete full-stack development including frontend interfaces, backend APIs, database architecture and integrations.",
  },
  {
    question: "Can an existing website or app be redesigned?",
    answer:
      "Yes. Existing websites and applications can be redesigned, improved and modernized while keeping important functionality intact.",
  },
  {
    question: "Do you build mobile responsive websites?",
    answer:
      "Yes. Responsive behavior is considered from the beginning so the experience works properly across desktop, tablet and mobile screens.",
  },
];

/* =========================
   ANIMATION
========================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

/* =========================
   HOME
========================= */

function Home() {
  const [openFaq, setOpenFaq] = useState(0);

  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] =
    useState(true);
  const [servicesError, setServicesError] =
    useState("");

  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] =
    useState(true);
  const [projectsError, setProjectsError] =
    useState("");

  const { openEnquiryModal } = useEnquiryModal();

  /* =========================
     LOAD SERVICES
  ========================= */

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServicesLoading(true);
        setServicesError("");

        const response = await api.get("/services");

        const serviceData = Array.isArray(
          response.data?.data
        )
          ? response.data.data
          : [];

        const activeServices = serviceData.filter(
          (service) => service.active !== false
        );

        setServices(activeServices.slice(0, 4));
      } catch (error) {
        console.error(
          "Home services fetch error:",
          error
        );

        setServicesError(
          error.response?.data?.message ||
            "Services could not be loaded."
        );
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, []);

  /* =========================
     LOAD PROJECTS
  ========================= */

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setProjectsLoading(true);
        setProjectsError("");

        const response = await api.get("/projects");

        const projectData = Array.isArray(
          response.data?.data
        )
          ? response.data.data
          : [];

        const featuredProjects =
          projectData.filter(
            (project) =>
              project.featured === true
          );

        const projectsToShow =
          featuredProjects.length > 0
            ? featuredProjects.slice(0, 4)
            : projectData.slice(0, 4);

        setProjects(projectsToShow);
      } catch (error) {
        console.error(
          "Home projects fetch error:",
          error
        );

        setProjectsError(
          error.response?.data?.message ||
            "Projects could not be loaded."
        );
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="overflow-hidden bg-white text-black">
      {/* =========================
          HERO
      ========================== */}

      <section className="relative overflow-hidden bg-[#eeeeee]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 top-20 h-[420px] w-[420px] rounded-full bg-[#ef0038]/10 blur-[100px]" />

          <div className="absolute left-[48%] top-[18%] h-[240px] w-[240px] rounded-full border border-black/5" />

          <div className="absolute left-[52%] top-[27%] h-[150px] w-[150px] rounded-full border border-black/5" />
        </div>

        <div className="relative mx-auto grid min-h-[760px] max-w-[1500px] items-center gap-14 px-6 py-20 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14 lg:py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="relative z-10"
          >
            <div className="mb-8 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ef0038]" />

              <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-black/45">
                Website & App Development
              </p>
            </div>

            <h1 className="max-w-[950px] text-[54px] font-semibold leading-[0.93] tracking-[-0.065em] sm:text-[68px] md:text-[82px] lg:text-[82px] xl:text-[94px]">
              We Build Powerful
              <br />

              <span className="text-[#ef0038]">
                Websites &amp; Apps
              </span>{" "}
              That
              <br />
              Grow Businesses.
            </h1>

            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="max-w-[550px] text-[17px] leading-8 text-black/55 md:text-[18px]">
                SHOZEN TECH combines strategy,
                design, development and automation
                to create powerful digital
                experiences built for real-world
                growth.
              </p>

              <Link
                to="/services"
                className="
                  group
                  inline-flex
                  w-fit
                  shrink-0
                  items-center
                  gap-4
                  rounded-full
                  border
                  border-black/15
                  bg-white
                  px-6
                  py-4
                  text-sm
                  font-semibold
                  !text-black
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[#ef0038]
                  hover:bg-[#ef0038]
                  hover:!text-white
                "
              >
                <span className="!text-black transition-colors duration-300 group-hover:!text-white">
                  What We Do
                </span>

                <ArrowUpRight
                  size={17}
                  className="!text-black transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:!text-white"
                />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
            className="relative hidden min-h-[620px] lg:block"
          >
            <div
              className="
                absolute
                inset-0
                opacity-[0.09]
                [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
                [background-size:42px_42px]
              "
            />

            <div className="absolute left-[12%] top-[9%] h-[470px] w-[70%] rotate-[-5deg] rounded-[46px] border border-black/10 bg-white shadow-[0_45px_100px_rgba(0,0,0,0.08)]">
              <div className="absolute left-8 top-8 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#ef0038]" />
                <span className="h-2 w-2 rounded-full bg-black/15" />
                <span className="h-2 w-2 rounded-full bg-black/15" />
              </div>

              <div className="absolute left-9 right-9 top-24 space-y-3">
                <div className="h-3 w-[70%] rounded-full bg-black/10" />
                <div className="h-3 w-[45%] rounded-full bg-black/10" />
              </div>

              <div className="absolute bottom-10 left-10 right-10 top-[170px] rounded-[28px] bg-[#111111]">
                <div className="absolute inset-0 overflow-hidden rounded-[28px]">
                  <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#ef0038] blur-[55px]" />

                  <div className="absolute bottom-[-70px] left-[-50px] h-56 w-56 rounded-full bg-white/10 blur-[50px]" />
                </div>

                <div className="relative flex h-full items-center justify-center">
                  <div className="flex h-28 w-28 items-center justify-center rounded-[32px] border border-white/15 bg-white/10 text-white backdrop-blur-xl">
                    <Code2
                      size={48}
                      strokeWidth={1.3}
                    />
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute right-[2%] top-[15%] flex h-36 w-36 rotate-[9deg] items-center justify-center rounded-[32px] bg-[#ef0038] text-white shadow-[0_25px_60px_rgba(239,0,56,0.28)]"
            >
              <Bot
                size={54}
                strokeWidth={1.4}
              />
            </motion.div>

            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-[5%] left-[2%] flex h-32 w-32 -rotate-[8deg] items-center justify-center rounded-full bg-black text-white shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
            >
              <Cpu
                size={45}
                strokeWidth={1.4}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =========================
          TECHNOLOGY MARQUEE
      ========================== */}

      <section className="overflow-hidden border-y border-black/10 bg-white py-5">
        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-max items-center"
        >
          {[...technologies, ...technologies].map(
            (item, index) => (
              <div
                key={`${item}-${index}`}
                className="flex items-center"
              >
                <span className="px-8 text-[14px] font-semibold uppercase tracking-[0.1em] text-black/70">
                  {item}
                </span>

                <span className="h-2 w-2 rounded-full bg-[#ef0038]" />
              </div>
            )
          )}
        </motion.div>
      </section>

      {/* =========================
          WORK / CAPABILITIES
      ========================== */}

      <section className="bg-[#111111] py-24 text-white md:py-32">
        <div className="mx-auto max-w-[1450px] px-6 md:px-10 lg:px-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            variants={fadeUp}
            className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="mb-5 text-[12px] font-bold uppercase tracking-[0.22em] text-[#ef0038]">
                Our Capabilities
              </p>

              <h2 className="max-w-[900px] text-[50px] font-semibold leading-[0.95] tracking-[-0.055em] md:text-[72px]">
                Technology that works
                <br />
                in the real world.
              </h2>
            </div>

            <Link
              to="/projects"
              className="group flex w-fit items-center gap-4 text-sm font-semibold !text-white"
            >
              <span className="!text-white">
                View Our Work
              </span>

              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 group-hover:border-[#ef0038] group-hover:bg-[#ef0038]">
                <ArrowUpRight
                  size={17}
                  className="!text-white"
                />
              </span>
            </Link>
          </motion.div>

          <div className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {workItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                  }}
                  className="group relative min-h-[500px] overflow-hidden rounded-[28px] border border-white/10 bg-[#191919] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#ef0038]/50"
                >
                  <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#ef0038]/0 blur-[60px] transition duration-500 group-hover:bg-[#ef0038]/20" />

                  <div
                    className="
                      absolute
                      inset-0
                      opacity-[0.035]
                      [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
                      [background-size:34px_34px]
                    "
                  />

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white/30">
                        {item.number}
                      </span>

                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-300 group-hover:border-[#ef0038] group-hover:bg-[#ef0038] group-hover:text-white">
                        <ArrowUpRight
                          size={16}
                          className="group-hover:!text-white"
                        />
                      </span>
                    </div>

                    <div className="flex flex-1 items-center justify-center">
                      <div className="flex h-32 w-32 items-center justify-center rounded-[36px] border border-white/10 bg-white/[0.04] transition-all duration-500 group-hover:rotate-3 group-hover:scale-105">
                        <Icon
                          size={53}
                          strokeWidth={1.2}
                          className="text-[#ef0038]"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-[28px] font-semibold tracking-[-0.04em]">
                        {item.title}
                      </h3>

                      <p className="mt-4 text-[14px] leading-7 text-white/45">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================
          SERVICES
      ========================== */}

      <section className="bg-[#f1f1f1] py-24 md:py-32">
        <div className="mx-auto max-w-[1450px] px-6 md:px-10 lg:px-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="mb-5 text-[12px] font-bold uppercase tracking-[0.22em] text-[#ef0038]">
                What We Do
              </p>

              <h2 className="max-w-[820px] text-[48px] font-semibold leading-[0.96] tracking-[-0.055em] md:text-[72px]">
                How we help businesses grow.
              </h2>
            </motion.div>

            <Link
              to="/services"
              className="group flex w-fit items-center gap-3 rounded-full bg-black px-6 py-4 text-sm font-semibold !text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ef0038] hover:!text-white"
            >
              <span className="!text-white">
                Explore Services
              </span>

              <ArrowRight
                size={17}
                className="!text-white transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* SERVICE LOADING */}

          {servicesLoading && (
            <div className="mt-16 grid gap-4 lg:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="rounded-[30px] border border-black/5 bg-white p-7 md:p-9"
                >
                  <div className="flex items-start justify-between">
                    <div className="h-3 w-8 animate-pulse rounded-full bg-black/10" />

                    <div className="h-12 w-12 animate-pulse rounded-full bg-black/10" />
                  </div>

                  <div className="mt-12 h-9 w-2/3 animate-pulse rounded-full bg-black/10" />

                  <div className="mt-5 h-4 w-full animate-pulse rounded-full bg-black/10" />

                  <div className="mt-2 h-4 w-3/4 animate-pulse rounded-full bg-black/10" />

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {[1, 2, 3, 4].map(
                      (feature) => (
                        <div
                          key={feature}
                          className="border-t border-black/10 pt-3"
                        >
                          <div className="h-3 w-2/3 animate-pulse rounded-full bg-black/10" />
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SERVICE ERROR */}

          {!servicesLoading &&
            servicesError && (
              <div className="mt-16 rounded-[30px] border border-black/10 bg-white p-9">
                <p className="text-[18px] font-semibold">
                  Unable to load services.
                </p>

                <p className="mt-2 text-sm text-black/50">
                  {servicesError}
                </p>
              </div>
            )}

          {/* SERVICES */}

          {!servicesLoading &&
            !servicesError &&
            services.length > 0 && (
              <div className="mt-16 grid gap-4 lg:grid-cols-2">
                {services.map(
                  (service, index) => (
                    <motion.div
                      key={
                        service._id ||
                        service.slug ||
                        service.title
                      }
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
                      }}
                      transition={{
                        delay:
                          index * 0.08,
                      }}
                      className="group rounded-[30px] border border-black/5 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(0,0,0,0.07)] md:p-9"
                    >
                      <div className="flex items-start justify-between gap-6">
                        <span className="text-[12px] font-semibold text-black/30">
                          {String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-black transition-all duration-300 group-hover:border-[#ef0038] group-hover:bg-[#ef0038] group-hover:!text-white">
                          <ArrowUpRight
                            size={18}
                            className="transition-colors duration-300 group-hover:!text-white"
                          />
                        </span>
                      </div>

                      <h3 className="mt-12 text-[31px] font-semibold tracking-[-0.045em] md:text-[36px]">
                        {service.title}
                      </h3>

                      {service.description && (
                        <p className="mt-4 max-w-xl text-[15px] leading-7 text-black/50">
                          {
                            service.description
                          }
                        </p>
                      )}

                      {Array.isArray(
                        service.features
                      ) &&
                        service.features
                          .length > 0 && (
                          <div className="mt-8 grid gap-3 sm:grid-cols-2">
                            {service.features
                              .slice(0, 6)
                              .map(
                                (
                                  feature,
                                  featureIndex
                                ) => (
                                  <div
                                    key={`${feature}-${featureIndex}`}
                                    className="flex items-center gap-3 border-t border-black/10 pt-3 text-sm text-black/60"
                                  >
                                    <Check
                                      size={
                                        15
                                      }
                                      className="shrink-0 text-[#ef0038]"
                                    />

                                    {
                                      feature
                                    }
                                  </div>
                                )
                              )}
                          </div>
                        )}
                    </motion.div>
                  )
                )}
              </div>
            )}

          {/* EMPTY SERVICES */}

          {!servicesLoading &&
            !servicesError &&
            services.length === 0 && (
              <div className="mt-16 rounded-[30px] bg-white px-7 py-14 text-center md:px-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] bg-black text-white">
                  <Layers3
                    size={27}
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="mt-6 text-[27px] font-semibold tracking-[-0.04em]">
                  Services coming soon.
                </h3>

                <p className="mx-auto mt-3 max-w-[500px] text-sm leading-7 text-black/50">
                  Our services will appear here
                  once they are published.
                </p>
              </div>
            )}
        </div>
      </section>

      {/* =========================
          FEATURED PROJECTS
      ========================== */}

      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[1450px] px-6 md:px-10 lg:px-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="mb-5 text-[12px] font-bold uppercase tracking-[0.22em] text-[#ef0038]">
                Selected Work
              </p>

              <h2 className="max-w-[850px] text-[48px] font-semibold leading-[0.95] tracking-[-0.055em] md:text-[72px]">
                Projects built for
                <br />
                real-world use.
              </h2>
            </motion.div>

            <Link
              to="/projects"
              className="group flex w-fit items-center gap-3 rounded-full bg-black px-6 py-4 text-sm font-semibold !text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ef0038] hover:!text-white"
            >
              <span className="!text-white">
                View All Projects
              </span>

              <ArrowRight
                size={17}
                className="!text-white transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {projectsLoading && (
            <div className="mt-16 grid gap-5 lg:grid-cols-2">
              {[1, 2, 3, 4].map(
                (item) => (
                  <div
                    key={item}
                    className="overflow-hidden rounded-[30px] bg-[#f1f1f1]"
                  >
                    <div className="aspect-[16/10] animate-pulse bg-black/5" />

                    <div className="p-7 md:p-9">
                      <div className="h-3 w-24 animate-pulse rounded-full bg-black/10" />

                      <div className="mt-5 h-8 w-2/3 animate-pulse rounded-full bg-black/10" />

                      <div className="mt-5 h-4 w-full animate-pulse rounded-full bg-black/10" />

                      <div className="mt-2 h-4 w-3/4 animate-pulse rounded-full bg-black/10" />
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {!projectsLoading &&
            projectsError && (
              <div className="mt-16 rounded-[30px] border border-black/10 bg-[#f5f5f5] p-10">
                <p className="text-[18px] font-semibold">
                  Unable to load projects.
                </p>

                <p className="mt-2 text-sm text-black/50">
                  {projectsError}
                </p>
              </div>
            )}

          {!projectsLoading &&
            !projectsError &&
            projects.length > 0 && (
              <div className="mt-16 grid gap-5 lg:grid-cols-2">
                {projects.map(
                  (project, index) => (
                    <motion.article
                      key={project._id}
                      initial={{
                        opacity: 0,
                        y: 35,
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
                        delay:
                          index * 0.08,
                      }}
                      className="group overflow-hidden rounded-[30px] bg-[#f1f1f1]"
                    >
                      <Link
                        to={`/projects/${project.slug}`}
                        className="relative block aspect-[16/10] overflow-hidden bg-[#111111]"
                      >
                        {project.image ? (
                          <img
  src={getMediaUrl(project.image)}
  alt={project.title}
  className="h-full w-full object-cover"
/>
                        ) : (
                          <div className="relative flex h-full items-center justify-center overflow-hidden">
                            <div
                              className="
                                absolute
                                inset-0
                                opacity-[0.06]
                                [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
                                [background-size:38px_38px]
                              "
                            />

                            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#ef0038]/30 blur-[80px]" />

                            <Code2
                              size={
                                65
                              }
                              strokeWidth={
                                1
                              }
                              className="relative text-white/50"
                            />
                          </div>
                        )}

                        {project.category && (
                          <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-black">
                            {
                              project.category
                            }
                          </span>
                        )}

                        <span className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-all duration-300 group-hover:bg-[#ef0038] group-hover:!text-white">
                          <ArrowUpRight
                            size={18}
                            className="transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:!text-white"
                          />
                        </span>
                      </Link>

                      <div className="p-7 md:p-9">
                        <div className="flex items-start justify-between gap-6">
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#ef0038]">
                              Project
                            </p>

                            <Link
                              to={`/projects/${project.slug}`}
                            >
                              <h3 className="mt-3 text-[30px] font-semibold tracking-[-0.045em] transition-colors duration-300 hover:text-[#ef0038] md:text-[36px]">
                                {
                                  project.title
                                }
                              </h3>
                            </Link>
                          </div>

                          <span className="text-xs text-black/30">
                            {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </span>
                        </div>

                        {(project.shortDescription ||
                          project.description) && (
                          <p className="mt-5 line-clamp-2 max-w-[620px] text-[15px] leading-7 text-black/50">
                            {project.shortDescription ||
                              project.description}
                          </p>
                        )}

                        {Array.isArray(
                          project.technologies
                        ) &&
                          project
                            .technologies
                            .length >
                            0 && (
                            <div className="mt-7 flex flex-wrap gap-2">
                              {project.technologies
                                .slice(
                                  0,
                                  5
                                )
                                .map(
                                  (
                                    technology
                                  ) => (
                                    <span
                                      key={
                                        technology
                                      }
                                      className="rounded-full border border-black/10 bg-white px-4 py-2 text-[12px] font-medium text-black/55"
                                    >
                                      {
                                        technology
                                      }
                                    </span>
                                  )
                                )}
                            </div>
                          )}

                        <Link
                          to={`/projects/${project.slug}`}
                          className="group/link mt-8 inline-flex items-center gap-3 text-sm font-semibold text-black transition hover:text-[#ef0038]"
                        >
                          View Project

                          <ArrowUpRight
                            size={16}
                            className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                          />
                        </Link>
                      </div>
                    </motion.article>
                  )
                )}
              </div>
            )}

          {!projectsLoading &&
            !projectsError &&
            projects.length === 0 && (
              <div className="mt-16 rounded-[30px] bg-[#f1f1f1] px-7 py-14 text-center md:px-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[22px] bg-black text-white">
                  <Code2
                    size={27}
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="mt-6 text-[27px] font-semibold tracking-[-0.04em]">
                  Projects coming soon.
                </h3>

                <p className="mx-auto mt-3 max-w-[500px] text-sm leading-7 text-black/50">
                  Our latest project work will
                  appear here as it is published.
                </p>
              </div>
            )}
        </div>
      </section>

      {/* =========================
          WHY SHOZEN
      ========================== */}

      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto grid max-w-[1450px] gap-16 px-6 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="mb-5 text-[12px] font-bold uppercase tracking-[0.22em] text-[#ef0038]">
              Why SHOZEN
            </p>

            <h2 className="text-[48px] font-semibold leading-[0.95] tracking-[-0.055em] md:text-[70px]">
              More than
              <br />
              just code.
            </h2>

            <p className="mt-8 max-w-[520px] text-[17px] leading-8 text-black/50">
              Good technology should make a
              business simpler, faster and
              stronger. We focus on the complete
              experience — from design and
              development to performance and
              scalability.
            </p>
          </motion.div>

          <div className="grid gap-px overflow-hidden rounded-[30px] bg-black/10 sm:grid-cols-2">
            {[
              {
                title:
                  "Business First",
                text:
                  "Technology decisions are made around the actual business objective.",
              },
              {
                title:
                  "Clean Development",
                text:
                  "Projects are structured so they remain maintainable as they grow.",
              },
              {
                title:
                  "Modern Experience",
                text:
                  "Interfaces are designed to feel clear, fast and professional.",
              },
              {
                title:
                  "Built To Evolve",
                text:
                  "We build websites and apps with future improvements and scalability in mind.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#f5f5f5] p-8 md:p-10"
              >
                <div className="mb-12 h-2.5 w-2.5 rounded-full bg-[#ef0038]" />

                <h3 className="text-[25px] font-semibold tracking-[-0.035em]">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-black/50">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          TECH STACK
      ========================== */}

      <section className="border-y border-black/10 bg-[#f1f1f1] py-24">
        <div className="mx-auto max-w-[1450px] px-6 md:px-10 lg:px-14">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#ef0038]">
                Technology
              </p>

              <h2 className="mt-5 text-[45px] font-semibold leading-[0.96] tracking-[-0.05em] md:text-[60px]">
                Modern tools.
                <br />
                Strong foundation.
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {technologies.map(
                (technology) => (
                  <div
                    key={technology}
                    className="rounded-full border border-black/10 bg-white px-6 py-4 text-sm font-semibold text-black/65 transition-all duration-300 hover:-translate-y-1 hover:border-[#ef0038] hover:bg-[#ef0038] hover:!text-white"
                  >
                    {technology}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          PROCESS
      ========================== */}

      <section className="relative overflow-hidden bg-[#111111] py-24 text-white md:py-32">
        <div className="absolute right-[-200px] top-[120px] h-[500px] w-[500px] rounded-full bg-[#ef0038]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-[1450px] px-6 md:px-10 lg:px-14">
          <div className="max-w-[900px]">
            <p className="mb-5 text-[12px] font-bold uppercase tracking-[0.22em] text-[#ef0038]">
              Our Process
            </p>

            <h2 className="text-[48px] font-semibold leading-[0.95] tracking-[-0.055em] md:text-[74px]">
              We turn complexity
              <br />
              into clarity.
            </h2>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-[30px] bg-white/10 md:grid-cols-2 xl:grid-cols-3">
            {processItems.map((item) => (
              <div
                key={item.number}
                className="group min-h-[270px] bg-[#171717] p-8 transition-colors duration-300 hover:bg-[#1d1d1d]"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs text-white/30">
                    {item.number}
                  </span>

                  <span className="h-2 w-2 rounded-full bg-[#ef0038] opacity-50 transition group-hover:opacity-100" />
                </div>

                <h3 className="mt-16 text-[27px] font-semibold tracking-[-0.04em]">
                  {item.title}
                </h3>

                <p className="mt-4 max-w-[350px] text-sm leading-7 text-white/40">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          CTA
      ========================== */}

      <section className="bg-white py-24 md:py-36">
        <div className="mx-auto max-w-[1450px] px-6 md:px-10 lg:px-14">
          <div className="relative overflow-hidden rounded-[36px] bg-[#ef0038] px-7 py-16 text-white md:px-14 md:py-20 lg:px-20">
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-[0.08]
                [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
                [background-size:40px_40px]
              "
            />

            <div className="relative flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">
                  Have an Idea?
                </p>

                <h2 className="mt-6 max-w-[850px] text-[48px] font-semibold leading-[0.94] tracking-[-0.055em] md:text-[72px]">
                  Let&apos;s build your
                  <br />
                  next website or app.
                </h2>
              </div>

              <button
                type="button"
                onClick={
                  openEnquiryModal
                }
                className="group inline-flex w-fit items-center gap-4 rounded-full bg-black px-7 py-4 text-sm font-semibold !text-white transition-all duration-300 hover:scale-[1.03] hover:bg-[#111111] hover:!text-white"
              >
                <span className="!text-white">
                  Discuss Your Idea
                </span>

                <ArrowUpRight
                  size={18}
                  className="!text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          FAQ
      ========================== */}

      <section className="bg-[#f1f1f1] py-24 md:py-32">
        <div className="mx-auto grid max-w-[1350px] gap-14 px-6 md:px-10 lg:grid-cols-[0.75fr_1.25fr] lg:px-14">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#ef0038]">
              FAQ
            </p>

            <h2 className="mt-5 text-[48px] font-semibold leading-[0.95] tracking-[-0.055em] md:text-[64px]">
              Questions?
              <br />
              We&apos;ve got answers.
            </h2>
          </div>

          <div className="border-t border-black/15">
            {faqs.map(
              (faq, index) => {
                const isOpen =
                  openFaq === index;

                return (
                  <div
                    key={faq.question}
                    className="border-b border-black/15"
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
                      className="flex w-full items-center justify-between gap-6 py-7 text-left"
                    >
                      <span className="text-[19px] font-semibold tracking-[-0.025em] md:text-[22px]">
                        {
                          faq.question
                        }
                      </span>

                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isOpen
                            ? "bg-[#ef0038] !text-white"
                            : "border border-black/15 bg-white text-black"
                        }`}
                      >
                        {isOpen ? (
                          <Minus
                            size={17}
                            className="!text-white"
                          />
                        ) : (
                          <Plus
                            size={17}
                          />
                        )}
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen
                          ? "grid-rows-[1fr] pb-7 opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-[700px] text-[15px] leading-7 text-black/50">
                          {
                            faq.answer
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;