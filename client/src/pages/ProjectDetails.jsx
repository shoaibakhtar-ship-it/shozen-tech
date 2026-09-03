import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import getMediaUrl from "../utils/getMediaUrl";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

import api from "../services/api";
import { useEnquiryModal } from "../context/EnquiryModalContext";

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.91-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.94a9.3 9.3 0 0 1 2.5.35c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function ProjectDetails() {
  const { slug } = useParams();

  const { openEnquiryModal } =
    useEnquiryModal();

  const [project, setProject] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/projects/${slug}`
        );

        setProject(
          response.data?.data || null
        );
      } catch (err) {
        console.error(
          "Project details error:",
          err
        );

        setError(
          err.response?.status === 404
            ? "Project not found."
            : err.response?.data?.message ||
                "Project load nahi ho pa raha."
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-[#eeeeee] p-20">
        <div className="mx-auto h-[400px] max-w-[1200px] animate-pulse rounded-[30px] bg-black/10" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <section className="flex min-h-[70vh] items-center bg-[#eeeeee]">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <h1 className="text-[55px] font-semibold">
            Project not found.
          </h1>

          <p className="mt-4 text-black/50">
            {error}
          </p>

          <Link
            to="/projects"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-black px-6 py-4 !text-white"
          >
            <ArrowLeft size={17} />
            Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-white">

      <section className="bg-[#eeeeee] py-16 md:py-24">
        <div className="mx-auto max-w-[1350px] px-6 md:px-10">

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-black/45"
          >
            <ArrowLeft size={16} />
            All Projects
          </Link>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">

            <div>
              {project.category && (
                <span className="rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase">
                  {project.category}
                </span>
              )}

              <h1 className="mt-7 text-[58px] font-semibold leading-[0.94] tracking-[-0.06em] md:text-[82px]">
                {project.title}
              </h1>
            </div>

            <div>
              <p className="text-[16px] leading-8 text-black/50">
                {project.shortDescription ||
                  project.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-[#ef0038] px-6 py-4 text-[13px] font-semibold !text-white"
                  >
                    View Live
                    <ExternalLink size={16} />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 rounded-full border border-black/15 bg-white px-6 py-4 text-[13px] font-semibold"
                  >
                    <GithubIcon />
                    GitHub
                  </a>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-[1350px] px-6 md:px-10">

          <div className="relative min-h-[420px] overflow-hidden rounded-[30px] bg-[#151515] md:min-h-[650px]">

            {project.image ? (
             <img
  src={getMediaUrl(project.image)}
  alt={project.title}
  className="h-full w-full object-cover"
/>
            ) : (
              <div className="flex min-h-[650px] items-center justify-center">
                <p className="text-[80px] font-black tracking-[-0.07em] !text-white/10">
                  SHOZEN
                </p>
              </div>
            )}

          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-[1200px] gap-14 px-6 md:px-10 lg:grid-cols-[0.6fr_1.4fr]">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#ef0038]">
              Project Details
            </p>

            {project.technologies?.length >
              0 && (
              <div className="mt-8 flex flex-wrap gap-2">

                {project.technologies.map(
                  (tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-[#eeeeee] px-4 py-2 text-[11px]"
                    >
                      {tech}
                    </span>
                  )
                )}

              </div>
            )}
          </div>

          <div>
            <h2 className="text-[45px] font-semibold tracking-[-0.05em] md:text-[62px]">
              About the project.
            </h2>

            <p className="mt-7 whitespace-pre-line text-[16px] leading-8 text-black/55">
              {project.description}
            </p>
          </div>

        </div>
      </section>

      <section className="bg-[#eeeeee] py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">

          <h2 className="text-[48px] font-semibold leading-[0.98] tracking-[-0.055em] md:text-[70px]">
            Need a website
            <br />
            or application?
          </h2>

          <button
            type="button"
            onClick={openEnquiryModal}
            className="group mt-8 inline-flex items-center gap-4 rounded-full bg-[#ef0038] px-7 py-4 text-[13px] font-semibold !text-white transition hover:bg-black"
          >
            <span className="!text-white">
              Discuss Your Idea
            </span>

            <ArrowUpRight
              size={18}
              className="!text-white"
            />
          </button>

        </div>
      </section>

    </div>
  );
}

export default ProjectDetails;