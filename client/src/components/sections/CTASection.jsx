import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl rounded-3xl border border-cyan-400/20 bg-cyan-400/5 p-10 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          Let&apos;s Build Something Powerful
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-slate-400">
          Turn your idea into a scalable digital product with SHOZEN TECH.
        </p>

        <Link
          to="/contact"
          className="mt-8 inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Start a Project
        </Link>
      </div>
    </section>
  );
}

export default CTASection;