import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import getMediaUrl from "../utils/getMediaUrl";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  FolderCode,
} from "lucide-react";

import api from "../services/api";
import { useEnquiryModal } from "../context/EnquiryModalContext";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { openEnquiryModal } = useEnquiryModal();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/projects");

        setProjects(response.data?.data || []);
      } catch (err) {
        console.error(
          "Projects fetch error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Projects load nahi ho pa rahe."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="overflow-hidden bg-white text-[#111111]">

      <section className="relative overflow-hidden bg-[#f2f2f2]">
        <div className="relative mx-auto min-h-[390px] max-w-[1500px] px-6 py-20 md:px-10 lg:px-14 lg:py-24">

          <div className="text-center">
            <h1 className="text-[48px] font-semibold leading-none tracking-[-0.055em] sm:text-[58px] md:text-[66px]">
              Our{" "}
              <span className="text-[#ef0038]">
                Projects
              </span>
            </h1>
          </div>

          <div className="mx-auto mt-11 grid max-w-[930px] gap-7 md:grid-cols-[190px_1fr]">

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.04em]">
                OUR WORK
              </span>

              <span className="h-px w-10 bg-black/70" />
            </div>

            <p className="text-[15px] leading-7 text-black/60 md:text-[16px]">
              Explore websites, web applications
              and digital experiences built by
              SHOZEN TECH with a focus on clean
              design, strong development and
              real-world usability.
            </p>

          </div>

        </div>
      </section>

      <section className="bg-white pb-16 pt-20 md:pb-20 md:pt-24">
        <div className="mx-auto max-w-[1100px] px-6 text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-[#ef0038]/20 bg-[#ef0038]/5 px-5 py-2.5">
            <FolderCode
              size={13}
              className="text-[#ef0038]"
            />

            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#ef0038]">
              Selected Work
            </span>
          </div>

          <h2 className="mt-5 text-[40px] font-semibold tracking-[-0.045em] md:text-[52px]">
            Digital work built with{" "}
            <span className="text-[#ef0038]">
              purpose.
            </span>
          </h2>

        </div>
      </section>

      {loading && (
        <section className="pb-28">
          <div className="mx-auto grid max-w-[1180px] gap-7 px-6 md:grid-cols-2">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse"
              >
                <div className="aspect-[16/11] rounded-[28px] bg-black/[0.05]" />

                <div className="mt-5 h-7 w-2/3 rounded bg-black/[0.06]" />
              </div>
            ))}

          </div>
        </section>
      )}

      {!loading && error && (
        <section className="pb-28">
          <div className="mx-auto max-w-[1000px] px-6 text-center">
            <div className="rounded-[28px] bg-[#ef0038]/5 p-10">
              <p className="text-[#ef0038]">
                {error}
              </p>
            </div>
          </div>
        </section>
      )}

      {!loading &&
        !error &&
        projects.length === 0 && (
          <section className="pb-28">
            <div className="mx-auto max-w-[1000px] px-6 text-center">

              <div className="rounded-[30px] bg-[#f3f3f3] py-16">
                <Code2
                  size={44}
                  className="mx-auto text-[#ef0038]"
                />

                <h3 className="mt-5 text-[30px] font-semibold">
                  Projects coming soon.
                </h3>
              </div>

            </div>
          </section>
        )}

      {!loading &&
        !error &&
        projects.length > 0 && (
          <section className="pb-28 md:pb-36">
            <div className="mx-auto grid max-w-[1180px] items-start gap-x-7 gap-y-12 px-6 md:grid-cols-2 md:px-10">

              {projects.map(
                (project, index) => (
                  <motion.article
                    key={project._id}
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
                    className="w-full"
                  >

                    <Link
                      to={`/projects/${project.slug}`}
                      className="group relative block aspect-[16/11] overflow-hidden rounded-[28px] bg-[#ededed]"
                    >
                      {project.image ? (
                        <img
                          src={getMediaUrl(project.image)}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[#161616]">
                          <Code2
                            size={55}
                            className="!text-white"
                          />
                        </div>
                      )}

                      <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-[10px] font-bold">
                        PROJECT{" "}
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>
                    </Link>

                    <div className="pt-6">

                      {project.category && (
                        <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#ef0038]">
                          {project.category}
                        </p>
                      )}

                      <Link
                        to={`/projects/${project.slug}`}
                      >
                        <h3 className="mt-2 text-[29px] font-semibold tracking-[-0.04em] transition hover:text-[#ef0038]">
                          {project.title}
                        </h3>
                      </Link>

                      <p className="mt-4 text-[14px] leading-7 text-black/50">
                        {project.shortDescription ||
                          project.description}
                      </p>

                      {project.technologies?.length >
                        0 && (
                        <div className="mt-5 flex flex-wrap gap-2">

                          {project.technologies
                            .slice(0, 5)
                            .map((tech) => (
                              <span
                                key={tech}
                                className="rounded-full border border-black/10 px-3 py-2 text-[10px] text-black/50"
                              >
                                {tech}
                              </span>
                            ))}

                        </div>
                      )}

                    </div>

                  </motion.article>
                )
              )}

            </div>
          </section>
        )}

      <section className="relative overflow-hidden bg-white py-28 md:py-36">
        <div className="relative mx-auto max-w-[900px] px-6 text-center">

          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#ef0038]">
            Have an idea?
          </p>

          <h2 className="mt-6 text-[46px] font-semibold leading-[0.98] tracking-[-0.055em] md:text-[66px]">
            Let&apos;s build something
            <br />
            <span className="text-[#ef0038]">
              worth using.
            </span>
          </h2>

          <button
            type="button"
            onClick={openEnquiryModal}
            className="group mt-8 inline-flex items-center gap-5 rounded-full bg-[#ef0038] py-2 pl-7 pr-2 text-[13px] font-semibold !text-white transition-all hover:-translate-y-1 hover:bg-black"
          >
            <span className="!text-white">
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

export default Projects;