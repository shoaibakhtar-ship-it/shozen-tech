function SectionHeading({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-bold md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;