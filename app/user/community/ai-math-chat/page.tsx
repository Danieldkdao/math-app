import { FaBookOpen, FaClock, FaCommentDots, FaRobot, FaSeedling, FaUser } from "react-icons/fa";
import { FaPaperPlane, FaRegPaperPlane } from "react-icons/fa6";

const promptHistory = [
  "Help me factor this quartic while keeping roots real.",
  "Why does the greedy step fail for this combinatorics puzzle?",
  "Give a one-line hint for the daily challenge (no spoiler).",
  "Show a visual intuition for completing the square.",
];

const suggestedPrompts = [
  "Generate a gentle hint for a geometry proof without revealing the angle chase.",
  "Summarize the key idea behind the latest Deep Dive puzzle.",
  "Draft a rubric to grade a community puzzle solution quickly.",
  "List misconceptions solvers often have with generating functions.",
];

const conversation = [
  { role: "user", content: "I need a hint for the lattice paths detour puzzle." },
  { role: "assistant", content: "Spot the forced steps first. Count how many optional turns remain after that." },
  { role: "user", content: "Should I brute-force small grids or generalize immediately?" },
  { role: "assistant", content: "Try a 4x4 grid and look for invariants. The pattern scales cleanly." },
];

const AIMathChatPage = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-6xl space-y-8 px-4 py-8">
        <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-cyan-100">
              <FaRobot className="text-cyan-600" />
              AI Math Chat
            </p>
            <h1 className="text-3xl font-bold text-gray-900">Get puzzle-aware hints and coaching</h1>
            <p className="text-gray-600 max-w-2xl">
              Ask for structured hints, solution outlines, or concept refreshers. Keep spoilers hidden in your requests if
              you prefer to discover the key move yourself.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm text-sm text-gray-700">
            <div className="inline-flex items-center gap-2 font-semibold text-gray-900">
              <FaClock className="text-cyan-600" />
              Saves your last 15 prompts
            </div>
            <p className="text-gray-600">History is local to you; nothing is posted publicly.</p>
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <FaCommentDots className="text-cyan-600" />
                Conversation
              </div>
              <span className="rounded-full bg-gray-50 px-3 py-1 text-[11px] font-semibold text-gray-700 ring-1 ring-gray-200">
                Context-aware
              </span>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50/60 p-4 max-h-[420px] overflow-y-auto">
              {conversation.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end text-right" : "justify-start text-left"}`}
                >
                  {message.role === "assistant" && (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-600 text-white shadow-sm">
                      <FaRobot />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                      message.role === "user"
                        ? "bg-white text-gray-900 shadow ring-1 ring-gray-200"
                        : "bg-cyan-600 text-white shadow"
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === "user" && (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white shadow-sm">
                      <FaUser />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 md:flex-row md:items-center">
                <textarea
                  rows={3}
                  placeholder="Ask for a hint, outline, or quick concept refresher..."
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                />
                <div className="flex gap-2 md:flex-col">
                  <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-cyan-700">
                    <FaPaperPlane />
                    Send
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm">
                    <FaRegPaperPlane />
                    Draft
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt) => (
                  <span
                    key={prompt}
                    className="rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm"
                  >
                    {prompt}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <FaBookOpen className="text-cyan-600" />
                Recent prompts
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                {promptHistory.map((prompt, index) => (
                  <div
                    key={`${prompt}-${index}`}
                    className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 shadow-sm"
                  >
                    {prompt}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                <FaSeedling />
                Prompt tips
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>- Mention the puzzle category to get tailored hints.</li>
                <li>- Ask for "hint only" to avoid spoilers.</li>
                <li>- Request a solution outline if you are done exploring.</li>
                <li>- Save drafts before posting to discussions.</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default AIMathChatPage;
