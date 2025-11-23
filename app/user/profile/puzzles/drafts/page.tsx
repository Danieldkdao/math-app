import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaPenNib, FaStar } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";

const drafts = [
  {
    title: "Convex Hull Warmup",
    category: "Geometry",
    difficulty: "Intermediate",
    problemText: "Given n points in the plane, how many vertices can the convex hull have in the worst case?",
    hint: "Think about points in strictly convex position.",
    solutionOutline: "All points can be extremal; hull uses n vertices when no point lies inside the convex hull of others.",
    answers: ["n"],
    updatedAt: "1h ago",
  },
  {
    title: "Rapid Recurrence",
    category: "Algebra",
    difficulty: "Advanced",
    problemText: "Solve a_{n+1} = 2a_n + 3 with a_0 = 1. Give closed form.",
    hint: "Unroll or use the particular + homogeneous approach.",
    solutionOutline: "a_n = 2^{n+1} - 3 after summing geometric contributions.",
    answers: ["2^{n+1}-3"],
    updatedAt: "6h ago",
  },
  {
    title: "Selective Coloring",
    category: "Combinatorics",
    difficulty: "Beginner",
    problemText: "How many ways to color 4 distinct boxes red or blue with exactly two red?",
    hint: "Choose the red boxes.",
    solutionOutline: "Pick any 2 of 4 boxes: C(4,2)=6 colorings.",
    answers: ["6"],
    updatedAt: "1d ago",
  },
  {
    title: "Asymptotic Series",
    category: "Analysis",
    difficulty: "Advanced",
    problemText: "Give the first three terms of the asymptotic expansion of ln(1+x) as x → 0.",
    hint: "Expand with Taylor around 0.",
    solutionOutline: "ln(1+x)=x - x^2/2 + x^3/3 + O(x^4).",
    answers: ["x - x^2/2 + x^3/3"],
    updatedAt: "2d ago",
  },
];

const PuzzleDraftsPage = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1000px] bg-gray-50 rounded-md border border-gray-400 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/user/profile">
            <div className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition">
              <FaArrowLeft />
              Back to profile
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Your Puzzle Drafts</h1>
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <FaPenNib className="text-cyan-700" />
            Draft fields: title, difficulty, category, problem, hint, outline, answers, timestamps
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {drafts.map((draft, idx) => (
            <div key={idx} className="rounded-md border border-gray-300 bg-white p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <FaPenNib className="text-cyan-700" />
                  {draft.title}
                </div>
                <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 text-xs font-semibold">
                  {draft.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-700">{draft.problemText}</p>
              <div className="text-xs text-gray-700 space-y-1 bg-gray-50 rounded-md p-3 ring-1 ring-gray-100">
                <p><strong>Hint:</strong> {draft.hint}</p>
                <p><strong>Outline:</strong> {draft.solutionOutline}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-700">
                <span className="px-2 py-1 rounded-md bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
                  {draft.category}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-gray-700 ring-1 ring-gray-200">
                  <FaStar className="text-amber-500" />
                  {draft.answers.length} answer(s)
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-gray-700 ring-1 ring-gray-200">
                  <FaClock className="text-gray-500" />
                  Updated {draft.updatedAt}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 text-sm font-semibold text-gray-700">
          <span className="px-3 py-1 rounded-md bg-gray-100 ring-1 ring-gray-200">Showing {drafts.length} drafts</span>
          <FaArrowRight className="text-gray-400" />
          <span className="text-gray-500">All details drawn from puzzle draft schema</span>
        </div>
      </div>
    </div>
  );
};

export default PuzzleDraftsPage;
