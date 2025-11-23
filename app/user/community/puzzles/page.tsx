import {
  FaArrowRight,
  FaClock,
  FaFilter,
  FaFire,
  FaLayerGroup,
  FaSearch,
  FaStar,
  FaUserFriends,
} from "react-icons/fa";
import { FaChartSimple, FaCompass, FaFlagCheckered } from "react-icons/fa6";

const featuredCategories = [
  {
    title: "Ratings & reviews",
    description: "Every puzzle stores 1-5 star ratings so you can skim clarity and difficulty at a glance.",
    accent: "from-cyan-500 to-blue-600",
    stat: "Avg in feed",
  },
  {
    title: "Comment threads",
    description: "Threaded comments ride along with each puzzle so feedback stays with the prompt.",
    accent: "from-orange-400 to-amber-500",
    stat: "Active today",
  },
  {
    title: "Attempts & flags",
    description: "See total attempts, correct submissions, and any flags community moderators are watching.",
    accent: "from-purple-500 to-indigo-600",
    stat: "Health check",
  },
];

const puzzleCards = [
  {
    title: "Prime Ladder",
    category: "Number Theory",
    difficulty: "Beginner",
    problemText: "Build a strictly increasing sequence of primes that sums to 100. What is the maximum possible length?",
    answers: ["2,3,5,7,11,13,17,19,23"],
    hint: "Start small, then adjust parity so the final prime keeps the total at 100.",
    solutionOutline: "Greedy growth overshoots; balancing early tiny primes with a final mid-size prime yields the longest chain.",
    user: "mathmaker42",
    ratings: { average: 4.6, count: 32 },
    attempts: { total: 240, correct: 112 },
    comments: 14,
    flags: 1,
  },
  {
    title: "Symmetry in Infinite Grids",
    category: "Geometry",
    difficulty: "Advanced",
    problemText: "On an infinite grid, color cells so every 3x3 square has rotational symmetry. How many colors suffice?",
    answers: ["3"],
    hint: "Test minimal palettes against the center cell constraints first.",
    solutionOutline: "A two-color scheme breaks on rotations; introducing a third resolves conflicting corners.",
    user: "axiom_atlas",
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
    answers: ["(n+1)(n+2)2^{n-1}"],
    hint: "Rewrite with binomial series and shift the exponent carefully.",
    solutionOutline: "Expand via negative binomial coefficients, then simplify the factorial ratio.",
    user: "series_sage",
    ratings: { average: 4.5, count: 18 },
    attempts: { total: 188, correct: 101 },
    comments: 6,
    flags: 2,
  },
  {
    title: "Minimal Surface Puzzle",
    category: "Calculus",
    difficulty: "Expert",
    problemText: "Among surfaces spanning a fixed boundary curve, identify the minimal surface and justify uniqueness.",
    answers: ["Catenoid between coaxial rings"],
    hint: "Invoke the Euler-Lagrange equation with surface area functional.",
    solutionOutline: "The minimal surface condition reduces to zero mean curvature; the catenoid satisfies and is stable here.",
    user: "variationalist",
    ratings: { average: 4.9, count: 27 },
    attempts: { total: 94, correct: 28 },
    comments: 7,
    flags: 0,
  },
  {
    title: "Tiling a Hexagon",
    category: "Combinatorics",
    difficulty: "Intermediate",
    problemText: "Count lozenge tilings of a hexagon with side lengths (2,3,3,2,3,3).",
    answers: ["90"],
    hint: "Turn the region into a determinant via the Lindstrom-Gessel-Viennot lemma.",
    solutionOutline: "Map tilings to non-intersecting paths, then evaluate the resulting determinant to get the count.",
    user: "gridgroove",
    ratings: { average: 4.7, count: 33 },
    attempts: { total: 205, correct: 96 },
    comments: 11,
    flags: 1,
  },
  {
    title: "Residue Race",
    category: "Number Theory",
    difficulty: "Advanced",
    problemText: "Find all integers n where x^2 = -1 (mod n) has a solution.",
    answers: ["n=2, n=4, n=p^k with p congruent to 1 mod 4"],
    hint: "Break n into prime powers and apply the Chinese Remainder Theorem.",
    solutionOutline: "Odd solutions require primes congruent to 1 mod 4; combine with 2 and 4 using CRT.",
    user: "lemmas_late",
    ratings: { average: 4.4, count: 19 },
    attempts: { total: 163, correct: 77 },
    comments: 5,
    flags: 0,
  },
];

const filters = ["All", "Number Theory", "Geometry", "Algebra", "Calculus", "Combinatorics", "Beginner", "Advanced"];

const CommunityPuzzlesPage = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-6xl space-y-8 px-4 py-8">
        <header className="space-y-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-1">
              <p className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-cyan-100">
                <FaLayerGroup />
                Community Puzzles
              </p>
              <h1 className="text-3xl font-bold text-gray-900">Browse community-built puzzles</h1>
              <p className="text-gray-600 max-w-2xl">
                Explore community puzzles with clear statements, hints, solution outlines, ratings, and moderated
                threads - all fields captured in the schema.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-gray-200">
                <FaCompass className="text-cyan-600" />
                Fields: title, category, difficulty, author
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-gray-200">
                <FaFlagCheckered className="text-emerald-600" />
                Ratings, attempts, flags, comments
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm space-y-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
              <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/60 px-3 py-2">
                <FaSearch className="text-gray-400" />
                <input
                  type="search"
                  placeholder="Search title, category, or author"
                  className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm">
                  <option>Difficulty</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
                <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm">
                  <option>Sort by</option>
                  <option>Newest</option>
                  <option>Highest rating</option>
                  <option>Most attempts</option>
                </select>
                <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm">
                  <FaFilter />
                  More filters
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <span
                  key={filter}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm"
                >
                  {filter}
                </span>
              ))}
            </div>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {puzzleCards.map((puzzle) => (
                <article
                  key={puzzle.title}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-200">
                      <FaLayerGroup className="text-cyan-600" />
                      {puzzle.category}
                    </div>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full ring-1 ring-emerald-100">
                      {puzzle.difficulty}
                    </span>
                  </div>
                  <div className="mt-3 space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">{puzzle.title}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{puzzle.problemText}</p>
                  </div>
                  <div className="mt-4 grid gap-3 rounded-xl bg-gray-50/70 p-3 ring-1 ring-gray-100">
                    <div className="text-xs font-semibold uppercase tracking-[0.1em] text-gray-500">Hint</div>
                    <p className="text-sm text-gray-700">{puzzle.hint}</p>
                    <div className="text-xs font-semibold uppercase tracking-[0.1em] text-gray-500">Solution outline</div>
                    <p className="text-sm text-gray-700">{puzzle.solutionOutline}</p>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold text-gray-700">
                    <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 ring-1 ring-gray-200">
                      <FaUserFriends className="text-cyan-600" />
                      {puzzle.attempts.total} attempts, {puzzle.attempts.correct} correct
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 ring-1 ring-gray-200">
                      <FaStar className="text-amber-500" />
                      {puzzle.ratings.average.toFixed(1)} avg, {puzzle.ratings.count} ratings
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 ring-1 ring-gray-200">
                      <FaClock className="text-gray-500" />
                      {puzzle.answers.length} answer(s) stored
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 ring-1 ring-gray-200">
                      <FaFlagCheckered className="text-emerald-600" />
                      {puzzle.comments} comments, {puzzle.flags} flags
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800">
                      Authored by <span className="text-cyan-700">{puzzle.user}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                      Schema fields shown
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
              <div className="text-sm text-gray-600">Page 1 of 12</div>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`h-9 w-9 rounded-lg text-sm font-semibold transition ${
                      page === 1 ? "bg-cyan-600 text-white shadow" : "bg-gray-50 text-gray-700 ring-1 ring-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-200">
                  Next
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-100 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-600">
                <FaFire className="text-rose-500" />
                Schema Highlights
              </div>
              <div className="mt-3 space-y-3">
                {featuredCategories.map((category) => (
                  <div
                    key={category.title}
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className={`h-1 w-full bg-gradient-to-r ${category.accent}`} />
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900">{category.title}</h3>
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-700">
                          {category.stat}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{category.description}</p>
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700">
                        View feed
                        <FaArrowRight />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                <FaChartSimple className="text-cyan-600" />
                Schema snapshot
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                  <span className="font-semibold text-gray-800">Ratings stored</span>
                  <span className="rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-cyan-700 ring-1 ring-cyan-100">
                    112 total
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                  <span className="font-semibold text-gray-800">Hints and solutions</span>
                  <span className="text-gray-800 font-semibold">Present on all cards</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                  <span className="font-semibold text-gray-800">Comments tracked</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                    52 threads
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                  <span className="font-semibold text-gray-800">Flags under review</span>
                  <span className="rounded-full bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-700 ring-1 ring-amber-100">
                    4 items
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default CommunityPuzzlesPage;
