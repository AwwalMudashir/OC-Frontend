const manifestoItems = [
  {
    title: "Youth Empowerment",
    desc: "Expand access to skills training, entrepreneurship support, and job creation pipelines that give young people practical paths into work and enterprise.",
    accent: "var(--color-primary)",
    tag: "Opportunity",
  },
  {
    title: "Quality Education",
    desc: "Strengthen school infrastructure, support teachers, and improve access to modern learning tools so every child can compete with confidence.",
    accent: "var(--color-accent)",
    tag: "Education",
  },
  {
    title: "Infrastructure",
    desc: "Prioritize roads, water access, and essential public services across communities with delivery standards that people can actually measure.",
    accent: "var(--color-cta)",
    tag: "Delivery",
  },
  {
    title: "People-Centered Governance",
    desc: "Advance transparency, accountability, and regular citizen engagement so governance becomes more open, responsive, and trustworthy.",
    accent: "var(--color-primary-700)",
    tag: "Trust",
  },
];

export default function Manifesto() {
  return (
    <section className="relative overflow-hidden px-8 py-12 lg:px-14">
      <div
        className="pointer-events-none absolute -left-16 top-8 h-64 w-64 rounded-full blur-3xl"
        style={{ background: "color-mix(in srgb, var(--color-accent) 18%, transparent)" }}
      />
      {/* <div
        className="pointer-events-none absolute -bottom-20 -right-12 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "color-mix(in srgb, var(--color-cta) 16%, transparent)" }}
      /> */}

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center animate-slide-in-left">
          <div
              className=" text-gray-500 inline-flex items-center gap-3 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]"
            >
                Oroye&apos;s Vision
            </div>

          <h2
            className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl"
            style={{ color: "var(--color-foreground)" }}
          >
            A clear plan built around outcomes people can actually feel.
          </h2>

          <p
            className="mx-auto mt-6 max-w-2xl text-base leading-8 sm:text-lg"
            style={{ color: "var(--neutral-500)" }}
          >
            The manifesto centers on practical priorities that improve everyday life,
            strengthen public trust, and widen opportunity across communities.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
  {manifestoItems.map((item) => (
    <article
      key={item.title}
      className="group rounded-3xl border border-white/10 bg-white/3 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/5"
      style={{
        backdropFilter: "blur(10px)",
      }}
    >
      {/* TOP ROW */}
      <div className="flex items-center justify-between">

        {/* TAG */}
        <span
          className="text-[11px] font-semibold uppercase tracking-widest text-gray-400"
        >
          {item.tag}
        </span>

        {/* ICON BLOCK */}
        <div
          className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:border-white/20"
        >
          <div
            className="h-2 w-2 rounded-full"
            style={{ background: item.accent }}
          />
        </div>
      </div>

      {/* TITLE */}
      <h3 className="mt-8 text-lg font-semibold text-white leading-snug">
        {item.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="mt-4 text-sm text-gray-400 leading-relaxed">
        {item.desc}
      </p>

      {/* ACCENT LINE */}
      {/* <div className="mt-8 h-[2px] w-12 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full w-full scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: item.accent }}
        />
      </div> */}

    </article>
  ))}
        </div>
      </div>
    </section>
  );
}
