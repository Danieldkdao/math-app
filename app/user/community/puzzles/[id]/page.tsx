import MarkdownRenderer from "@/components/General/markdown-renderer";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaQuestionCircle,
  FaClock,
  FaForward,
  FaStar,
} from "react-icons/fa";
import {
  FaChevronRight,
  FaFlagCheckered,
  FaLayerGroup,
  FaUsers,
} from "react-icons/fa6";

const puzzlePreview = {
  title: "Balancing a Tilted Grid",
  category: "Community Spotlight",
  difficulty: "Advanced",
  tags: ["Geometry", "Optimization", "Proof"],
  time: "18-24 min",
  solves: "846 attempts",
  rating: "4.8",
  author: "Avery L.",
  problemText:
    "On a tilted infinite grid, every lattice point carries a weight proportional to its distance from the line y = x. Show that there exists a unique straight path starting at the origin whose cumulative weight stays under 1 for the first 12 steps, and characterize the step where it first exceeds 1.",
  hint: "Look for symmetry when reflecting across y = x and normalize the step lengths to compare partial sums.",
  solutionOutline:
    "Establish a bound on the partial sums using mirrored steps; prove monotonicity of the deviation; identify the tipping step by solving for when the cumulative series crosses 1.",
};

const detailPills = [
  { label: "Live attempts", value: "42 solvers", tone: "emerald" },
  { label: "Recommended path", value: "Try hints before reveal", tone: "cyan" },
  { label: "Streak safe", value: "No penalties on first try", tone: "amber" },
];

const CommunityPuzzleDetailPage = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl space-y-8 px-4 py-8">
        <header className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200"
              >
                <FaArrowLeft />
                Back to puzzles
              </button>
              <span className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-cyan-100">
                <FaLayerGroup className="text-cyan-600" />
                Community puzzle
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                <FaFlagCheckered />
                Streak protected
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {detailPills.map((pill) => (
                <span
                  key={pill.label}
                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-gray-800 ring-1 ring-gray-200 ${
                    pill.tone === "emerald"
                      ? "bg-emerald-50"
                      : pill.tone === "amber"
                      ? "bg-amber-50"
                      : "bg-cyan-50"
                  }`}
                >
                  {pill.value}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr,0.7fr] lg:grid-cols-[1.1fr,0.9fr]">
            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-600">
                  Progress toward solve
                </p>
                <div className="flex items-center gap-3">
                  <progress className="h-2 w-44 rounded-full" value={0.35} />
                  <span className="text-sm font-semibold text-gray-800">
                    35% trail scouted
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 justify-end">
              <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm">
                <FaClock className="text-gray-500" />
                Focus timer
                <span className="rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-700">
                  18:42
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm">
                <FaQuestionCircle className="text-cyan-600" />
                Hints ready
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="space-y-5">
            <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-md bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-cyan-100">
                  {puzzlePreview.category}
                </span>
                <span className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                  {puzzlePreview.difficulty}
                </span>
                <span className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
                  {puzzlePreview.time}
                </span>
                <span className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
                  <FaUsers className="text-cyan-600" />
                  {puzzlePreview.solves}
                </span>
                <span className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
                  <FaStar className="text-amber-500" />
                  {puzzlePreview.rating}
                </span>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900 leading-tight">
                  <MarkdownRenderer text={puzzlePreview.title} />
                </div>
                <div className="text-sm font-semibold text-gray-600">
                  Authored by {puzzlePreview.author} • Geometry lab series
                </div>
              </div>
              <div className="space-y-3">
                <div className="text-lg font-medium text-gray-700 leading-relaxed">
                  <MarkdownRenderer text={puzzlePreview.problemText} />
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-600">
                  {puzzlePreview.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-50 px-3 py-1 ring-1 ring-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-yellow-50 px-4 py-3 text-sm text-gray-800 ring-1 ring-yellow-100">
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 font-semibold text-yellow-800">
                    <FaQuestionCircle className="text-yellow-600" />
                    Hint available
                  </div>
                  <span className="rounded-md bg-white px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-yellow-100">
                    Tap to reveal when ready
                  </span>
                </div>
                <div className="mt-2 text-gray-700">
                  <MarkdownRenderer text={puzzlePreview.hint} />
                </div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 font-semibold text-gray-900">
                    <FaForward className="text-cyan-600" />
                    Solution outline
                  </div>
                  <FaChevronRight className="text-gray-500" />
                </div>
                <div className="mt-2 text-gray-700">
                  <MarkdownRenderer text={puzzlePreview.solutionOutline} />
                </div>
              </div>
            </article>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Your attempt
                  </h2>
                  <p className="text-sm text-gray-600">
                    Mirror the train experience: record an answer, request
                    hints, and reveal the outline when you are done.
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                  No penalties for first reveal
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-[0.65fr,0.35fr]">
                <label className="space-y-2 text-sm font-semibold text-gray-800">
                  Submit an answer
                  <input
                    type="number"
                    placeholder="Enter a numeric answer"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-base text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-gray-800">
                  Notes or approach
                  <textarea
                    rows={3}
                    placeholder="Optional: jot down your path to the answer"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  />
                </label>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-cyan-700"
                >
                  <FaCheckCircle />
                  Check answer
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm"
                >
                  <FaQuestionCircle />
                  Ask for a hint
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm"
                >
                  <FaForward />
                  Reveal outline
                </button>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <FaLayerGroup className="text-cyan-600" />
                Attempt summary
              </div>
              <div className="grid gap-2 text-sm text-gray-700">
                <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                  <span className="font-semibold text-gray-800">Status</span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                    In progress
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                  <span className="font-semibold text-gray-800">
                    Time spent
                  </span>
                  <span className="text-gray-800 font-semibold">06:18</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                  <span className="font-semibold text-gray-800">
                    Hints used
                  </span>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-100">
                    0 of 2
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                  <span className="font-semibold text-gray-800">
                    Best streak
                  </span>
                  <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-cyan-100">
                    12 days
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <FaClock className="text-gray-500" />
                Session reminders
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="rounded-lg bg-gray-50 px-3 py-2">
                  Stay close to the train flow: hint first, then outline if
                  stuck.
                </li>
                <li className="rounded-lg bg-gray-50 px-3 py-2">
                  Add a short note so future solvers can learn from your path.
                </li>
                <li className="rounded-lg bg-gray-50 px-3 py-2">
                  Solution reveal will mark this puzzle as viewed in your feed.
                </li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default CommunityPuzzleDetailPage;
