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
    title: "Daily Challenge",
    description: "A crisp, time-boxed puzzle to keep your streak alive.",
    accent: "from-cyan-500 to-blue-600",
    stat: "Posted 2h ago",
  },
  {
    title: "Rising Creators",
    description: "Fresh voices and inventive puzzle formats from the community.",
    accent: "from-orange-400 to-amber-500",
    stat: "Top 12 this week",
  },
  {
    title: "Deep Dives",
    description: "Long-form explorations with explanations and visual aids.",
    accent: "from-purple-500 to-indigo-600",
    stat: "Curated picks",
  },
];

const puzzleCards = [
  {
    title: "Lattice Paths with Detours",
    category: "Daily Challenge",
    difficulty: "Intermediate",
    tags: ["Combinatorics", "Counting"],
    solves: "1.2k solves",
    rating: "4.7",
    time: "8-12 min",
  },
  {
    title: "Symmetry in Infinite Grids",
    category: "Deep Dives",
    difficulty: "Advanced",
    tags: ["Geometry", "Proof"],
    solves: "820 solves",
    rating: "4.8",
    time: "20-25 min",
  },
  {
    title: "Generating Functions Warmup",
    category: "Rising Creators",
    difficulty: "Intermediate",
    tags: ["Algebra", "Series"],
    solves: "960 solves",
    rating: "4.6",
    time: "12-18 min",
  },
  {
    title: "Minimal Surface Puzzle",
    category: "Deep Dives",
    difficulty: "Expert",
    tags: ["Calculus", "Optimization"],
    solves: "310 solves",
    rating: "4.9",
    time: "30+ min",
  },
  {
    title: "Prime Ladder",
    category: "Daily Challenge",
    difficulty: "Beginner",
    tags: ["Number Theory", "Patterns"],
    solves: "2.4k solves",
    rating: "4.5",
    time: "5-8 min",
  },
  {
    title: "Tiling a Hexagon",
    category: "Rising Creators",
    difficulty: "Intermediate",
    tags: ["Combinatorics", "Geometry"],
    solves: "1.1k solves",
    rating: "4.7",
    time: "15-20 min",
  },
];

const filters = ["All", "Daily Challenge", "Rising Creators", "Deep Dives", "Beginner", "Advanced"];

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
                Explore curated challenges from the community. Use search and filters to find the next puzzle that
                matches your skill and curiosity.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-gray-200">
                <FaCompass className="text-cyan-600" />
                Curated for you
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-gray-200">
                <FaFlagCheckered className="text-emerald-600" />
                Streak safe mode
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm space-y-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
              <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/60 px-3 py-2">
                <FaSearch className="text-gray-400" />
                <input
                  type="search"
                  placeholder="Search puzzles, topics, or authors"
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
                  <option>Most solved</option>
                  <option>Highest rated</option>
                  <option>Shortest time</option>
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
                    <p className="flex flex-wrap gap-2 text-xs font-semibold text-gray-600">
                      {puzzle.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-1 ring-1 ring-gray-200">
                          {tag}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-xs font-semibold text-gray-600">
                    <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 ring-1 ring-gray-100">
                      <FaUserFriends className="text-cyan-600" />
                      {puzzle.solves}
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 ring-1 ring-gray-100">
                      <FaStar className="text-amber-500" />
                      {puzzle.rating} rating
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 ring-1 ring-gray-100">
                      <FaClock className="text-gray-500" />
                      {puzzle.time}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700">
                      Preview puzzle
                      <FaArrowRight />
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                      Hand reviewed
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
                Curated Categories
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
                Activity snapshot
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                  <span className="font-semibold text-gray-800">Submissions today</span>
                  <span className="rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-cyan-700 ring-1 ring-cyan-100">
                    184
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                  <span className="font-semibold text-gray-800">Median solve time</span>
                  <span className="text-gray-800 font-semibold">13m</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                  <span className="font-semibold text-gray-800">New authors</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-100">
                    +18 today
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                  <span className="font-semibold text-gray-800">Queued reviews</span>
                  <span className="rounded-full bg-amber-50 px-2 py-1 text-[11px] font-semibold text-amber-700 ring-1 ring-amber-100">
                    7 pending
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
