import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Database,
  Server,
  Workflow,
} from "lucide-react";

import { useEnquiryModal } from "../context/EnquiryModalContext";

function About() {
  const { openEnquiryModal } =
    useEnquiryModal();

  return (
    <div className="overflow-hidden bg-white">

      {/* HERO */}
      <section className="relative bg-[#f2f2f2]">
        <div className="relative mx-auto min-h-[390px] max-w-[1500px] px-6 py-20 md:px-10 lg:px-14 lg:py-24">

          <div className="text-center">
            <h1 className="text-[48px] font-semibold leading-none tracking-[-0.055em] sm:text-[58px] md:text-[66px]">
              About{" "}
              <span className="text-[#ef0038]">
                SHOZEN
              </span>
            </h1>
          </div>

          <div className="mx-auto mt-11 grid max-w-[930px] gap-7 md:grid-cols-[190px_1fr]">

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase">
                WHO WE ARE
              </span>

              <span className="h-px w-10 bg-black/70" />
            </div>

            <p className="text-[15px] leading-7 text-black/60 md:text-[16px]">
              SHOZEN TECH is a technology-focused
              development studio building modern
              websites, web applications and digital
              solutions with clear design and scalable
              development.
            </p>

          </div>

          <motion.div
            animate={{
              y: [0, 8, 0],
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute right-[8%] top-[65px] hidden lg:block"
          >
            <svg
              width="105"
              height="130"
              viewBox="0 0 105 130"
              fill="none"
            >
              <path
                d="M55 8C38 10 31 23 34 36C37 48 48 54 58 48C69 41 70 22 64 14C59 7 52 11 51 22C50 39 59 52 76 54"
                stroke="#111"
                strokeWidth="1.55"
                strokeLinecap="round"
              />

              <path
                d="M76 54C65 67 51 76 35 78C27 79 22 84 25 90C29 98 40 103 52 104"
                stroke="#111"
                strokeWidth="1.55"
                strokeLinecap="round"
              />

              <path
                d="M44 94L51 86M44 94L53 96"
                stroke="#111"
                strokeWidth="1.55"
              />
            </svg>
          </motion.div>

        </div>
      </section>

      {/* STORY */}
      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-[1150px] gap-14 px-6 md:px-10 lg:grid-cols-2 lg:items-center">

          <div className="relative min-h-[430px] overflow-hidden rounded-[30px] bg-[#151515]">

            <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:42px_42px]" />

            <div className="relative flex min-h-[430px] items-center justify-center">

              <div className="text-center">
                <Code2
                  size={60}
                  className="mx-auto !text-[#ef0038]"
                />

                <p className="mt-7 text-[45px] font-black tracking-[-0.06em] !text-white">
                  SHOZEN
                </p>

                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] !text-white/30">
                  Innovation Through Technology
                </p>
              </div>

            </div>

          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#ef0038]">
              Our Story
            </p>

            <h2 className="mt-5 text-[44px] font-semibold leading-[1] tracking-[-0.05em] md:text-[58px]">
              Building digital
              <br />
              experiences with{" "}
              <span className="text-[#ef0038]">
                purpose.
              </span>
            </h2>

            <p className="mt-6 text-[15px] leading-7 text-black/50">
              Our approach combines design and
              development so every project has a
              clear visual direction and a strong
              technical foundation.
            </p>

            <Link
              to="/projects"
              className="group mt-7 inline-flex items-center gap-3 rounded-full bg-black px-6 py-4 text-[13px] font-semibold !text-white"
            >
              <span className="!text-white">
                View Our Work
              </span>

              <ArrowUpRight
                size={16}
                className="!text-white"
              />
            </Link>

          </div>

        </div>
      </section>

      {/* BEHIND SHOZEN */}
      <section className="bg-[#f3f3f3] py-24 md:py-32">
        <div className="mx-auto grid max-w-[1150px] gap-14 px-6 md:px-10 lg:grid-cols-2">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#ef0038]">
              Behind SHOZEN
            </p>

            <h2 className="mt-5 text-[43px] font-semibold leading-[1] tracking-[-0.05em] md:text-[58px]">
              Design thinking
              <br />
              meets{" "}
              <span className="text-[#ef0038]">
                development.
              </span>
            </h2>
          </div>

          <p className="text-[15px] leading-8 text-black/50">
            From interface design to APIs and
            databases, each part of the project
            should work together as one clear
            system. This helps create digital
            products that are easier to use and
            easier to maintain.
          </p>

        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#111111] py-20 text-white md:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-px overflow-hidden rounded-[28px] bg-white/10 px-6 md:grid-cols-4 md:px-0">

          {[
            [
              "Modern.",
              "Websites & Applications",
            ],
            [
              "Responsive.",
              "Digital Experiences",
            ],
            [
              "Scalable.",
              "Development Architecture",
            ],
            [
              "Reliable.",
              "Technology Solutions",
            ],
          ].map(([title, text]) => (
            <div
              key={title}
              className="bg-[#181818] p-8"
            >
              <h3 className="text-[28px] font-semibold !text-white">
                {title}
              </h3>

              <p className="mt-3 text-[12px] !text-white/35">
                {text}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* DEVELOPMENT APPROACH */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1150px] px-6 md:px-10">

          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#ef0038]">
              Development Approach
            </p>

            <h2 className="mt-5 text-[43px] font-semibold tracking-[-0.05em] md:text-[58px]">
              One connected system.
            </h2>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            {[
              {
                title: "Frontend",
                icon: Code2,
              },
              {
                title: "Backend",
                icon: Server,
              },
              {
                title: "Database",
                icon: Database,
              },
              {
                title: "Integration",
                icon: Workflow,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="min-h-[250px] rounded-[24px] border border-black/10 p-7"
                >
                  <Icon
                    size={30}
                    className="text-[#ef0038]"
                  />

                  <h3 className="mt-24 text-[22px] font-semibold">
                    {item.title}
                  </h3>
                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#ef0038] py-24 text-center">

        <div className="mx-auto max-w-[900px] px-6">

          <h2 className="text-[46px] font-semibold leading-[0.98] tracking-[-0.055em] !text-white md:text-[65px]">
            Got an Idea?
            <br />
            Let&apos;s Turn It Into a
            <br />
            Website or App.
          </h2>

          <button
            type="button"
            onClick={openEnquiryModal}
            className="group mt-8 inline-flex items-center gap-5 rounded-full bg-white py-2 pl-7 pr-2 text-[13px] font-semibold text-black transition hover:bg-black hover:!text-white"
          >
            <span className="group-hover:!text-white">
              Discuss Your Idea
            </span>

            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black !text-white">
              <ArrowRight
                size={16}
                className="!text-white"
              />
            </span>
          </button>

        </div>

      </section>

    </div>
  );
}

export default About;