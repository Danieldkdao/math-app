import {
  FaCheckCircle,
  FaFeatherAlt,
  FaLayerGroup,
  FaLightbulb,
  FaMagic,
  FaRocket,
} from "react-icons/fa";
import CreatePuzzleForm from "@/components/Dashboard/create/create-puzzle-form";

const outlineSteps = [
  {
    title: "Define the core idea",
    detail: "What math concept should solvers notice or practice?",
  },
  {
    title: "Set the difficulty",
    detail: "Give a clear rating and the expected solve time range.",
  },
  {
    title: "Write the prompt",
    detail: "Keep it concise, include constraints, and avoid ambiguity.",
  },
  {
    title: "Offer hints",
    detail: "Add at least one nudge so solvers can recover momentum.",
  },
  {
    title: "Share a solution sketch",
    detail: "Outline the main steps. Full proof not required.",
  },
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
              <h1 className="text-3xl font-bold text-gray-900">
                Share your next math puzzle
              </h1>
              <p className="text-gray-600 max-w-2xl">
                Craft a clear, engaging challenge for the community. Add
                context, hints, and a concise solution outline so solvers can
                learn from your approach.
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
          <CreatePuzzleForm />
          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                <FaCheckCircle />
                Quality checklist
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">•</span> Clear objective
                  and constraints
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">•</span> Difficulty and
                  time estimate included
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">•</span> At least one hint
                  prepared
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">•</span> Solution outline
                  highlights the key move
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
                  <div
                    key={step.title}
                    className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3"
                  >
                    <div className="text-sm font-semibold text-gray-900">
                      {step.title}
                    </div>
                    <p className="text-sm text-gray-600">{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">
                  Publishing notes
                </p>
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
