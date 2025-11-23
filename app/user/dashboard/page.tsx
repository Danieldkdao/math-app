import { FaClock, FaCubes, FaFire, FaHandPointer, FaPenNib, FaPuzzlePiece, FaSliders, FaStopwatch } from "react-icons/fa6";
import { FaCheckCircle, FaExclamationTriangle, FaLightbulb } from "react-icons/fa";

const trainingPreferences = {
  selectedDifficultyLevels: ["Intermediate", "Advanced"],
  selectedCategories: ["Algebra", "Combinatorics", "Geometry"],
  timeLimitPerPuzzle: 90,
  hints: true,
  skips: true,
  numberOfPuzzles: 8,
};

const latestSession = {
  settingsLabel: "Last session settings",
  puzzleHistory: [
    {
      title: "Generating Functions Warmup",
      result: "correct",
      timeSpent: 68,
      hintUsed: false,
      userAnswer: "(n+1)(n+2)2^{n-1}",
    },
    {
      title: "Prime Ladder",
      result: "incorrect",
      timeSpent: 52,
      hintUsed: true,
      userAnswer: "2,3,5,7,11,13,17,19,23",
    },
    {
      title: "Symmetry in Infinite Grids",
      result: "skipped",
      timeSpent: 15,
      hintUsed: false,
      userAnswer: "",
    },
  ],
};

const librarySpotlight = [
  {
    title: "Minimal Surface Puzzle",
    difficulty: "Expert",
    category: "Calculus",
    problemText: "Among surfaces spanning a fixed boundary curve, identify the minimal surface and justify uniqueness.",
    hint: "Invoke the Euler-Lagrange equation with surface area functional.",
    solutionOutline: "Zero mean curvature yields the catenoid solution under these constraints.",
  },
  {
    title: "Residue Race",
    difficulty: "Advanced",
    category: "Number Theory",
    problemText: "Find all integers n where x^2 = -1 (mod n) has a solution.",
    hint: "Split n into prime powers and lean on CRT.",
    solutionOutline: "Requires primes congruent to 1 mod 4 plus factors 2 or 4.",
  },
  {
    title: "Selective Coloring",
    difficulty: "Beginner",
    category: "Combinatorics",
    problemText: "How many ways to color 4 distinct boxes red or blue with exactly two red?",
    hint: "Choose which boxes are red.",
    solutionOutline: "Combination count C(4,2)=6.",
  },
];

const draftHealth = [
  { title: "Geometry drafts", count: 2, status: "Ready for review" },
  { title: "Algebra drafts", count: 1, status: "Needs outline" },
  { title: "Combinatorics drafts", count: 1, status: "Add hint" },
];

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 text-sm font-semibold">
          <FaFire /> Fresh snapshot (schema-driven fields)
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex items-center gap-2 text-gray-800">
          <FaSliders className="text-cyan-700" />
          <h2 className="text-xl font-bold">Training preferences (from session settings schema)</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm space-y-2">
            <p className="text-sm font-semibold text-gray-700">Selected difficulty</p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-700">
              {trainingPreferences.selectedDifficultyLevels.map((level) => (
                <span key={level} className="px-2 py-1 rounded-md bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
                  {level}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm space-y-2">
            <p className="text-sm font-semibold text-gray-700">Selected categories</p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-700">
              {trainingPreferences.selectedCategories.map((cat) => (
                <span key={cat} className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                  {cat}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm space-y-2">
            <p className="text-sm font-semibold text-gray-700">Puzzle count & pacing</p>
            <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
              <span className="inline-flex items-center gap-2">
                <FaStopwatch className="text-gray-500" />
                {trainingPreferences.timeLimitPerPuzzle}s per puzzle
              </span>
              <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 ring-1 ring-gray-200">
                {trainingPreferences.numberOfPuzzles} puzzles/session
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
              <FaLightbulb className={trainingPreferences.hints ? "text-amber-500" : "text-gray-400"} />
              Hints {trainingPreferences.hints ? "enabled" : "off"} · Skips {trainingPreferences.skips ? "enabled" : "off"}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2 text-gray-800">
          <FaCubes className="text-cyan-700" />
          <h2 className="text-xl font-bold">Latest session breakdown (puzzle history)</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {latestSession.puzzleHistory.map((puzzle, idx) => (
            <div key={idx} className="rounded-md border border-gray-200 bg-white p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                <span className="inline-flex items-center gap-2">
                  <FaPuzzlePiece className="text-cyan-700" />
                  {puzzle.title}
                </span>
                <span
                  className={`px-2 py-1 rounded-md text-xs ring-1 ${
                    puzzle.result === "correct"
                      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
                      : puzzle.result === "incorrect"
                      ? "bg-rose-50 text-rose-700 ring-rose-100"
                      : "bg-gray-100 text-gray-700 ring-gray-200"
                  }`}
                >
                  {puzzle.result}
                </span>
              </div>
              <p className="text-sm text-gray-700 line-clamp-2">
                Answered: {puzzle.userAnswer || "—"}
              </p>
              <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
                <span className="inline-flex items-center gap-2">
                  <FaClock className="text-gray-500" />
                  {puzzle.timeSpent}s
                </span>
                <span className="inline-flex items-center gap-2">
                  <FaHandPointer className={puzzle.hintUsed ? "text-amber-500" : "text-gray-400"} />
                  Hint {puzzle.hintUsed ? "used" : "not used"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2 text-gray-800">
          <FaPuzzlePiece className="text-cyan-700" />
          <h2 className="text-xl font-bold">Math puzzle library spotlight</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {librarySpotlight.map((puzzle, idx) => (
            <div key={idx} className="rounded-md border border-gray-200 bg-white p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                <span>{puzzle.title}</span>
                <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 text-xs">
                  {puzzle.difficulty}
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-600">{puzzle.category}</p>
              <p className="text-sm text-gray-700 line-clamp-3">{puzzle.problemText}</p>
              <div className="text-xs text-gray-700 space-y-1 bg-gray-50 rounded-md p-3 ring-1 ring-gray-100">
                <p><strong>Hint:</strong> {puzzle.hint}</p>
                <p><strong>Outline:</strong> {puzzle.solutionOutline}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2 text-gray-800">
          <FaPenNib className="text-cyan-700" />
          <h2 className="text-xl font-bold">Draft health check</h2>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {draftHealth.map((item, idx) => (
            <div key={idx} className="rounded-md border border-gray-200 bg-white p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-sm font-semibold text-gray-800">
                <span className="inline-flex items-center gap-2">
                  <FaPenNib className="text-cyan-700" />
                  {item.title}
                </span>
                <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 ring-1 ring-gray-200 text-xs">
                  {item.count} draft(s)
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                {item.status.includes("Ready") ? (
                  <FaCheckCircle className="text-emerald-600" />
                ) : (
                  <FaExclamationTriangle className="text-amber-500" />
                )}
                {item.status}
              </div>
              <p className="text-sm text-gray-600">
                Draft fields surfaced: title, category, difficulty, hint/outline readiness.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
