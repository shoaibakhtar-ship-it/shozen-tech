import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Compass,
  Layers3,
  Rocket,
  Search,
  Sparkles,
} from "lucide-react";

import { useEnquiryModal } from "../context/EnquiryModalContext";

const processSteps = [
  {
    number: "01",
    title: "Understand",
    subtitle: "Requirement & Goals",
    description:
      "We start by understanding your business, users, project requirements and the actual problem that needs to be solved.",
    icon: Search,
    points: [
      "Business Requirement",
      "User Goals",
      "Project Scope",
      "Feature Requirements",
    ],
  },
  {
    number: "02",
    title: "Plan",
    subtitle: "Structure & Direction",
    description:
      "Once the requirement is clear, we define the right structure, technology and development roadmap.",
    icon: Compass,
    points: [
      "Project Architecture",
      "Technology Selection",
      "Feature Planning",
      "Development Roadmap",
    ],
  },
  {
    number: "03",
    title: "Design",
    subtitle: "UI & User Experience",
    description:
      "We create modern and responsive interfaces focused on clarity and usability.",
    icon: Layers3,
    points: [
      "Wireframes",
      "UI Direction",
      "Responsive Layout",
      "User Experience",
    ],
  },
  {
    number: "04",
    title: "Develop",
    subtitle: "Frontend & Backend",
    description:
      "The approved design and functionality are developed into a working website or application.",
    icon: Code2,
    points: [
      "Frontend Development",
      "Backend Development",
      "Database Integration",
      "API Development",
    ],
  },
  {
    number: "05",
    title: "Test",
    subtitle: "Quality & Refinement",
    description:
      "Important flows, responsiveness and functionality are checked and refined before launch.",
    icon: CheckCircle2,
    points: [
      "Functional Testing",
      "Responsive Testing",
      "Bug Fixing",
      "Final Refinement",
    ],
  },
  {
    number: "06",
    title: "Launch",
    subtitle: "Ready for Real Users",
    description:
      "Once everything is ready, the website or application is prepared for production.",
    icon: Rocket,
    points: [
      "Deployment",
      "Final Checks",
      "Production Setup",
      "Future Ready",
    ],
  },
];

function Process() {
  const { openEnquiryModal } =
    useEnquiryModal();

  return (
    <div className="overflow-hidden bg-white">

      <section className="bg-[#f2f2f2] py-20 md:py-24">
        <div className="mx-auto max-w-[1500px] px-6 text-center">

          <h1 className="text-[50px] font-semibold tracking-[-0.055em] md:text-[66px]">
            Our{" "}
            <span className="text-[#ef0038]">
              Process
            </span>
          </h1>

          <div className="mx-auto mt-11 grid max-w-[930px] gap-7 text-left md:grid-cols-[190px_1fr]">

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold">
                HOW WE WORK
              </span>

              <span className="h-px w-10 bg-black" />
            </div>

            <p className="text-[15px] leading-7 text-black/55">
              A clear process helps turn an idea
              into a practical website or
              application while keeping design and
              development organised.
            </p>

          </div>

        </div>
      </section>

      <section className="py-20 text-center md:py-28">

        <Sparkles
          size={18}
          className="mx-auto text-[#ef0038]"
        />

        <h2 className="mt-5 text-[42px] font-semibold tracking-[-0.05em] md:text-[58px]">
          From idea to{" "}
          <span className="text-[#ef0038]">
            launch.
          </span>
        </h2>

      </section>

      <section className="pb-28 md:pb-36">
        <div className="mx-auto max-w-[1100px] space-y-5 px-6 md:px-10">

          {processSteps.map(
            (step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.number}
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
                  className="overflow-hidden rounded-[28px] border border-black/10"
                >
                  <div className="grid md:grid-cols-2">

                    <div
                      className={`flex min-h-[390px] flex-col justify-center p-8 md:p-10 ${
                        index % 2 === 1
                          ? "md:order-2"
                          : ""
                      }`}
                    >
                      <span className="w-fit rounded-full bg-[#ef0038]/10 px-4 py-2 text-[10px] font-bold text-[#ef0038]">
                        STEP {step.number}
                      </span>

                      <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.12em] text-black/35">
                        {step.subtitle}
                      </p>

                      <h3 className="mt-2 text-[38px] font-semibold tracking-[-0.045em]">
                        {step.title}
                      </h3>

                      <p className="mt-4 text-[14px] leading-7 text-black/50">
                        {step.description}
                      </p>

                      <div className="mt-7 grid gap-3 sm:grid-cols-2">

                        {step.points.map(
                          (point) => (
                            <div
                              key={point}
                              className="flex items-center gap-2 text-[12px] text-black/55"
                            >
                              <CheckCircle2
                                size={13}
                                className="text-[#ef0038]"
                              />

                              {point}
                            </div>
                          )
                        )}

                      </div>
                    </div>

                    <div
                      className={`relative flex min-h-[350px] items-center justify-center overflow-hidden bg-[#161616] ${
                        index % 2 === 1
                          ? "md:order-1"
                          : ""
                      }`}
                    >
                      <div className="absolute -right-20 -top-20 h-[280px] w-[280px] rounded-full bg-[#ef0038]/30 blur-[100px]" />

                      <motion.div
                        animate={{
                          y: [0, -8, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                        }}
                        className="flex h-32 w-32 items-center justify-center rounded-[34px] bg-[#ef0038]"
                      >
                        <Icon
                          size={50}
                          className="!text-white"
                        />
                      </motion.div>

                    </div>

                  </div>
                </motion.article>
              );
            }
          )}

        </div>
      </section>

      <section className="bg-[#111111] py-24 text-white">

        <div className="mx-auto max-w-[1100px] px-6 text-center">

          <p className="text-[10px] font-bold uppercase tracking-[0.16em] !text-[#ef0038]">
            Ready To Build?
          </p>

          <h2 className="mt-6 text-[47px] font-semibold leading-[0.98] tracking-[-0.055em] !text-white md:text-[66px]">
            Let&apos;s turn your idea
            <br />
            into something{" "}
            <span className="!text-[#ef0038]">
              real.
            </span>
          </h2>

          <button
            type="button"
            onClick={openEnquiryModal}
            className="group mt-8 inline-flex items-center gap-5 rounded-full bg-[#ef0038] py-2 pl-7 pr-2 text-[13px] font-semibold !text-white transition hover:bg-white hover:!text-black"
          >
            <span className="group-hover:!text-black">
              Discuss Your Idea
            </span>

            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#ef0038]">
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </button>

        </div>
      </section>

    </div>
  );
}

export default Process;