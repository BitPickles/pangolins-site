type RecentEventsProps = {
  events: string[];
};

export function RecentEvents({ events }: RecentEventsProps) {
  return (
    <section className="dossier-panel rounded-3xl border border-white/10 px-5 py-5 md:px-6">
      <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
        <div>
          <p className="dossier-label">Activity Log</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Recent Events</h2>
        </div>
        <ol className="space-y-3">
          {events.map((event, index) => (
            <li
              key={event}
              className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4"
            >
              <span className="font-mono text-xs tracking-[0.24em] text-white/36">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-6 text-white/72">{event}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
