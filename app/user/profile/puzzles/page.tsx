import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaPuzzlePiece, FaStar, FaComments } from "react-icons/fa6";
import { FaClock, FaFlag } from "react-icons/fa";

const puzzles = [
  {
    title: "Prime Ladder",
    category: "Number Theory",
    difficulty: "Beginner",
    problemText: "Build a strictly increasing sequence of primes that sums to 100. What is the maximum possible length?",
    hint: "Start small, then adjust parity with your final prime choice.",
    solutionOutline: "Balance tiny primes early and pick a mid-size closing prime to hit 100.",
    ratings: { average: 4.6, count: 32 },
    attempts: { total: 240, correct: 112 },
    comments: 14,
    flags: 1,
  },
  {
    title: "Symmetry in Infinite Grids",
    category: "Geometry",
    difficulty: "Advanced",
    problemText: "Color an infinite grid so every 3x3 square has rotational symmetry. How many colors suffice?",
    hint: "Test two colors against the center; watch the corner conflicts.",
    solutionOutline: "Two colors fail under rotation; three resolve the constraint.",
    ratings: { average: 4.8, count: 21 },
    attempts: { total: 126, correct: 44 },
    comments: 9,
    flags: 0,
  },
  {
    title: "Generating Functions Warmup",
    category: "Algebra",
    difficulty: "Intermediate",
    problemText: "Find the closed form for the coefficient of x^n in (1 - 2x)^{-3}.",
    hint: "Use the negative binomial series and track the shift carefully.",
    solutionOutline: "Expand with binomial coefficients and simplify the factorial ratio.",
    ratings: { average: 4.5, count: 18 },
    attempts: { total: 188, correct: 101 },
    comments: 6,
    flags: 2,
  },
  {
    title: "Residue Race",
    category: "Number Theory",
    difficulty: "Advanced",
    problemText: "Find all integers n where x^2 = -1 (mod n) has a solution.",
    hint: "Break n into prime powers and apply the Chinese Remainder Theorem.",
    solutionOutline: "Odd solutions require primes congruent to 1 mod 4; combine with 2 and 4 using CRT.",
    ratings: { average: 4.4, count: 19 },
    attempts: { total: 163, correct: 77 },
    comments: 5,
    flags: 0,
  },
];

const UserPuzzlesPage = () => {
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
          <h1 className="text-2xl font-bold text-gray-900">Your Community Puzzles</h1>
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <FaPuzzlePiece className="text-cyan-700" />
            Showing schema fields: title, difficulty, category, hint, outline, ratings, attempts, comments, flags
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {puzzles.map((puzzle, idx) => (
            <div key={idx} className="rounded-md border border-gray-300 bg-white p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <FaPuzzlePiece className="text-cyan-700" />
                  {puzzle.title}
                </div>
                <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 text-xs font-semibold">
                  {puzzle.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-700">{puzzle.problemText}</p>
              <div className="text-xs text-gray-700 space-y-1 bg-gray-50 rounded-md p-3 ring-1 ring-gray-100">
                <p><strong>Hint:</strong> {puzzle.hint}</p>
                <p><strong>Outline:</strong> {puzzle.solutionOutline}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-700">
                <span className="px-2 py-1 rounded-md bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
                  {puzzle.category}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-gray-700 ring-1 ring-gray-200">
                  <FaStar className="text-amber-500" />
                  {puzzle.ratings.average} / {puzzle.ratings.count}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-gray-700 ring-1 ring-gray-200">
                  <FaClock className="text-gray-500" />
                  {puzzle.attempts.correct} / {puzzle.attempts.total} correct
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-gray-700 ring-1 ring-gray-200">
                  <FaComments className="text-gray-500" />
                  {puzzle.comments} comments
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-gray-700 ring-1 ring-gray-200">
                  <FaFlag className="text-amber-500" />
                  {puzzle.flags} flags
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 text-sm font-semibold text-gray-700">
          <span className="px-3 py-1 rounded-md bg-gray-100 ring-1 ring-gray-200">Showing {puzzles.length} puzzles</span>
          <FaArrowRight className="text-gray-400" />
          <span className="text-gray-500">All details drawn from community puzzle schema</span>
        </div>
      </div>
    </div>
  );
};

export default UserPuzzlesPage;
