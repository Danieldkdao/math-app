import {
  FaComments,
  FaFire,
  FaHashtag,
  FaPenFancy,
  FaSearch,
} from "react-icons/fa";
import { FaClockRotateLeft, FaRegCommentDots } from "react-icons/fa6";

const threadFilters = [
  "All topics",
  "Help & Hints",
  "Strategy",
  "Theory",
  "Showcase",
  "Off-topic",
];

const threads = [
  {
    title: "Geometric proof for the tiling parity puzzle",
    category: "Strategy",
    replies: 42,
    lastActive: "12m ago",
    badges: ["Advanced", "Visual aid"],
  },
  {
    title: "How to estimate difficulty for number theory puzzles?",
    category: "Discussion",
    replies: 31,
    lastActive: "48m ago",
    badges: ["Authors", "Guides"],
  },
  {
    title: "Share your best hint for yesterday's daily challenge",
    category: "Help & Hints",
    replies: 57,
    lastActive: "1h ago",
    badges: ["Daily Challenge", "No spoilers"],
  },
  {
    title: "Requesting feedback on my combinatorics walkthrough",
    category: "Showcase",
    replies: 18,
    lastActive: "2h ago",
    badges: ["Write-up", "Rising Creator"],
  },
  {
    title: "Any favorite resources on generating functions?",
    category: "Theory",
    replies: 23,
    lastActive: "3h ago",
    badges: ["Resources", "Series"],
  },
];

const DiscussionsPage = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-6xl space-y-8 px-4 py-8">
        <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
              <FaComments className="text-amber-600" />
              Community Discussions
            </p>
            <h1 className="text-3xl font-bold text-gray-900">
              Swap strategies, hints, and insights
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Start a new thread or jump into ongoing conversations. Be generous
              with hints, clear with spoilers, and keep threads focused.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm text-sm text-gray-700">
            <div className="inline-flex items-center gap-2 font-semibold text-gray-900">
              <FaClockRotateLeft className="text-cyan-600" />
              168 active today
            </div>
            <p className="text-gray-600">
              Join the latest 5-minute threads to keep your streak.
            </p>
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <FaPenFancy className="text-cyan-600" />
                Start a new thread
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Thread title"
                  className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                />
                <select className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold text-gray-700">
                  <option>Category</option>
                  <option>Help & Hints</option>
                  <option>Strategy</option>
                  <option>Theory</option>
                  <option>Showcase</option>
                </select>
              </div>
              <textarea
                rows={4}
                placeholder="What are you exploring? Keep spoilers hidden until the end."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
              />
              <button className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-cyan-700">
                Post thread
              </button>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm space-y-3">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
                  <FaSearch className="text-gray-400" />
                  <input
                    type="search"
                    placeholder="Search threads or authors"
                    className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {threadFilters.map((filter) => (
                    <span
                      key={filter}
                      className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm"
                    >
                      {filter}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              {threads.map((thread) => (
                <article
                  key={thread.title}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
                        <FaHashtag className="text-cyan-600" />
                        {thread.category}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {thread.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {thread.badges.map((badge) => (
                          <span
                            key={badge}
                            className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-700 ring-1 ring-gray-200"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-sm font-semibold text-gray-700">
                      <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                        <FaRegCommentDots />
                        {thread.replies} replies
                      </span>
                      <span className="text-xs text-gray-500">
                        Last active {thread.lastActive}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700">
                    Continue thread
                    <FaComments />
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                <FaFire />
                Trending threads
              </div>
              <ul className="mt-3 space-y-3 text-sm text-gray-800">
                <li className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-amber-100">
                  Speed-solving: best ways to triage a geometry puzzle in 2
                  minutes.
                </li>
                <li className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-amber-100">
                  Didactics: how to write hints that nudge without spoiling.
                </li>
                <li className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-amber-100">
                  Sharing diagrams: screenshots vs. rendered LaTeX vs. markdown?
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <FaRegCommentDots className="text-cyan-600" />
                Starter prompts
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>- Ask for a hint on a step you already tried.</li>
                <li>- Share a partial approach and invite critiques.</li>
                <li>- Post a theory question tied to a community puzzle.</li>
                <li>- Show a diagram and request an intuition check.</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default DiscussionsPage;
