type RecentEventsProps = {
  events: string[];
};

export function RecentEvents({ events }: RecentEventsProps) {
  return (
    <section className="rounded-[1.75rem] border border-[color:var(--line)] bg-white/70 px-5 py-5 backdrop-blur-xl md:px-6">
      <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
        <div>
          <p className="font-mono text-[11px] uppercase text-[#7a8797]">Activity Log</p>
          <h2 className="mt-3 text-2xl font-semibold text-[#0f172a]">Recent Events</h2>
        </div>
        <ol className="divide-y divide-[color:var(--line)]">
          {events.map((event, index) => (
            <li
              key={event}
              className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
            >
              <span className="font-mono text-xs text-[#9aa6b6]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-6 text-[#4f5d70]">{event}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
