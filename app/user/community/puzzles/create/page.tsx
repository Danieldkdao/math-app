import { FaCheckCircle, FaFeatherAlt, FaLayerGroup, FaLightbulb, FaMagic, FaRocket } from "react-icons/fa";
import { FaRegClock, FaWandMagicSparkles } from "react-icons/fa6";

const outlineSteps = [
  { title: "Define the core idea", detail: "What math concept should solvers notice or practice?" },
  { title: "Set the difficulty", detail: "Give a clear rating and the expected solve time range." },
  { title: "Write the prompt", detail: "Keep it concise, include constraints, and avoid ambiguity." },
  { title: "Offer hints", detail: "Add at least one nudge so solvers can recover momentum." },
  { title: "Share a solution sketch", detail: "Outline the main steps. Full proof not required." },
];

const CreatePuzzlePage = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl space-y-8 px-4 py-8">
        <header className="overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-blue-50 p-6 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-cyan-100">
                <FaLayerGroup className="text-cyan-600" />
                Create a puzzle
              </p>
              <h1 className="text-3xl font-bold text-gray-900">Share your next math puzzle</h1>
              <p className="text-gray-600 max-w-2xl">
                Craft a clear, engaging challenge for the community. Add context, hints, and a concise solution outline so
                solvers can learn from your approach.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-cyan-100">
              <div className="inline-flex items-center gap-2">
                <FaRocket className="text-cyan-600" />
                Spotlight-ready formatting
              </div>
              <div className="inline-flex items-center gap-2">
                <FaFeatherAlt className="text-emerald-600" />
                Markdown supported
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="space-y-5">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Puzzle details</h2>
                  <p className="text-sm text-gray-600">Give your puzzle a name and a quick overview.</p>
                </div>
                <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
                  Required
                </span>
              </div>
              <div className="space-y-3">
                <label className="space-y-1 text-sm font-semibold text-gray-800">
                  Title
                  <input
                    type="text"
                    placeholder="e.g. A curious path through primes"
                    className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  />
                </label>
                <div className="grid gap-3 md:grid-cols-3">
                  <label className="space-y-1 text-sm font-semibold text-gray-800">
                    Difficulty
                    <select className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold text-gray-700">
                      <option>Select level</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>Expert</option>
                    </select>
                  </label>
                  <label className="space-y-1 text-sm font-semibold text-gray-800">
                    Estimated time
                    <select className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold text-gray-700">
                      <option>Choose range</option>
                      <option>5 - 10 min</option>
                      <option>10 - 20 min</option>
                      <option>20 - 30 min</option>
                      <option>30+ min</option>
                    </select>
                  </label>
                  <label className="space-y-1 text-sm font-semibold text-gray-800">
                    Topic tags
                    <input
                      type="text"
                      placeholder="Number theory, geometry, proofs..."
                      className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Problem statement</h2>
                  <p className="text-sm text-gray-600">State the challenge clearly and include any constraints or diagrams.</p>
                </div>
                <FaLightbulb className="text-amber-500" />
              </div>
              <textarea
                rows={6}
                placeholder="Describe the puzzle, givens, and what solvers should produce..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-1 text-sm font-semibold text-gray-800">
                  Add context
                  <textarea
                    rows={3}
                    placeholder="Optional: background, motivation, or connected concepts."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  />
                </label>
                <label className="space-y-1 text-sm font-semibold text-gray-800">
                  Add attachments
                  <div className="flex h-full items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                    Drop an image or diagram (optional)
                  </div>
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Hints and solution sketch</h2>
                <FaWandMagicSparkles className="text-purple-500" />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="space-y-1 text-sm font-semibold text-gray-800">
                  Hints (optional)
                  <textarea
                    rows={4}
                    placeholder="Share 1-3 hints that gradually guide solvers toward the key idea."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  />
                </label>
                <label className="space-y-1 text-sm font-semibold text-gray-800">
                  Solution outline
                  <textarea
                    rows={4}
                    placeholder="Outline the main steps; bullet points work great."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-cyan-700">
                <FaRocket />
                Publish to community
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm">
                <FaRegClock />
                Save as draft
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm">
                Preview layout
              </button>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                <FaCheckCircle />
                Quality checklist
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">•</span> Clear objective and constraints
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">•</span> Difficulty and time estimate included
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">•</span> At least one hint prepared
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">•</span> Solution outline highlights the key move
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <FaMagic className="text-purple-500" />
                Outline helper
              </div>
              <div className="space-y-3">
                {outlineSteps.map((step) => (
                  <div key={step.title} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                    <div className="text-sm font-semibold text-gray-900">{step.title}</div>
                    <p className="text-sm text-gray-600">{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">Publishing notes</p>
                <span className="rounded-full bg-gray-50 px-2.5 py-1 text-[11px] font-semibold text-gray-700 ring-1 ring-gray-200">
                  Tips
                </span>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Avoid spoilers in the description.</li>
                <li>• Mark diagrams clearly if you add them.</li>
                <li>• Keep the title concise and searchable.</li>
                <li>• Drafts stay private until you publish.</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default CreatePuzzlePage;
