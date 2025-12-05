import Image from "next/image";
import UsersImage from "@/public/user_group.png";
import {
  FaCalculator,
  FaChartLine,
  FaLightbulb,
  FaPuzzlePiece,
  FaShieldHeart,
} from "react-icons/fa6";
import InfiniteSlide from "@/components/Home/InfiniteSlide";
import Faqs from "@/components/Home/Faqs";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import Link from "next/link";

export default function Home() {
  const impactStats = [
    { label: "Families learning", value: "10k+", detail: "active members" },
    { label: "Puzzles built", value: "500+", detail: "unique challenges" },
    { label: "Avg. session", value: "18m", detail: "engaged time" },
  ];

  const pillars = [
    {
      title: "Adaptive training",
      text: "Curated sessions that flex to confidence level, pacing, and hint preferences.",
      icon: <FaChartLine className="text-indigo-500" />,
    },
    {
      title: "Story-driven puzzles",
      text: "Narrative prompts that keep problem-solving playful and memorable.",
      icon: <FaPuzzlePiece className="text-emerald-500" />,
    },
    {
      title: "Coaching without spoilers",
      text: "AI hints reveal just enough so learners keep ownership of each breakthrough.",
      icon: <FaLightbulb className="text-amber-500" />,
    },
    {
      title: "Safe, human-led community",
      text: "Moderated discussions, respectful feedback, and clear guidance for sharing work.",
      icon: <FaShieldHeart className="text-cyan-600" />,
    },
  ];

  const journey = [
    "Pick a learning path and goals.",
    "Solve guided puzzle sets with timed or untimed modes.",
    "Ask for layered hints, not answers, when you’re stuck.",
    "Share wins, drafts, and questions with peers and mentors.",
    "Review progress insights that celebrate growth, not perfection.",
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <section className="max-w-6xl mx-auto pt-14 pb-10 flex flex-col gap-10">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-50 via-sky-50 to-indigo-100 p-8 sm:p-10 shadow-2xl border border-slate-200">
            <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top_left,#e0f2fe,transparent_45%),radial-gradient(circle_at_30%_80%,#bae6fd,transparent_35%)]" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-5 max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm border border-slate-200">
                  <FaCalculator />
                  Guided math, joyful momentum
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-slate-900">
                  Understand the universe of numbers{" "}
                  <span className="text-cyan-600">
                    one puzzle-powered breakthrough at a time.
                  </span>
                </h1>
                <p className="text-lg text-slate-700 max-w-2xl">
                  Figured helps kids—and their grownups—stay curious with
                  playful math adventures, scaffolded hints, and a supportive,
                  moderated community.
                </p>
                <Link href="/auth/login">
                  <button className="rounded-full bg-slate-900 text-white font-semibold px-6 py-3 shadow-lg hover:-translate-y-0.5 transition-transform cursor-pointer mb-3">
                    Start solving
                  </button>
                </Link>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-700">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 border border-slate-200">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Trusted by 10,000+ families
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 border border-slate-200">
                    <span className="h-2 w-2 rounded-full bg-indigo-400" />
                    Designed with coaches & teachers
                  </div>
                </div>
              </div>
              <div className="relative flex-1 min-w-[280px] max-w-md self-center">
                <div className="rounded-2xl bg-white p-5 shadow-xl border border-slate-200">
                  <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-slate-900">
                    <Image
                      src={UsersImage}
                      alt="User testimonials image"
                      height={42}
                    />
                    <span>“We finally enjoy math together.”</span>
                  </div>
                  <div className="space-y-3 text-sm text-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Weekly wins</span>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 border border-emerald-100">
                        +38%
                      </span>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-4 space-y-2 border border-slate-200">
                      <p className="font-semibold text-slate-900">
                        Today’s focus
                      </p>
                      <ul className="space-y-1 text-slate-700 list-disc list-inside">
                        <li>Number sense warm-up (5 min)</li>
                        <li>Adaptive puzzle set (15 min)</li>
                        <li>Share one reflection</li>
                      </ul>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {impactStats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-xl bg-slate-50 p-3 text-center border border-slate-200"
                        >
                          <div className="text-lg font-bold text-slate-900">
                            {stat.value}
                          </div>
                          <div className="text-[11px] uppercase tracking-wide text-slate-500">
                            {stat.label}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {stat.detail}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto py-12 space-y-8">
          <div className="flex flex-col gap-2 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-600">
              Why it works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Built for confidence, rigor, and joy
            </h2>
            <p className="text-slate-700 max-w-3xl mx-auto">
              Every touchpoint—training, AI hints, and community feedback—is
              designed to keep learners curious, supported, and celebrated.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col gap-3 shadow-sm"
              >
                <div className="inline-flex items-center justify-center rounded-full bg-slate-100 size-10">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-700">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto py-12 space-y-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-600">
              The learner journey
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              A calm rhythm that builds mastery
            </h2>
            <p className="text-slate-700 max-w-3xl">
              We keep learners in flow with predictable rituals: warm-ups,
              adaptive sets, and reflections—plus optional time caps and hint
              rules to match their style.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-gradient-to-br from-white via-slate-50 to-white border border-slate-200 p-6 space-y-4 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">
                Daily rhythm, designed with coaches
              </h3>
              <ul className="space-y-3 text-slate-800">
                {journey.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-cyan-700 border border-slate-200">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">
                Transparent guardrails
              </h3>
              <div className="space-y-3 text-slate-700">
                <p>
                  Families choose the pace: timed drills, relaxed explorations,
                  or both.
                </p>
                <p>
                  Hint toggles make support intentional—learners decide when to
                  surface a nudge versus pushing through.
                </p>
                <p>
                  Moderation, flagged content review, and community standards
                  keep spaces kind and constructive.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto py-12 space-y-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-600">
              Social proof
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center">
              What our community says
            </h2>
          </div>
          <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-xl">
            <InfiniteSlide />
          </div>
        </section>

        <section className="max-w-6xl mx-auto py-12 space-y-6">
          <div className="flex flex-col gap-2 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-600">
              Answers up front
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-xl">
            <Faqs />
          </div>
        </section>

        <section className="max-w-6xl mx-auto pb-14 pt-6">
          <div className="rounded-3xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 p-8 sm:p-10 text-center text-white shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">
              Ready to explore the next puzzle?
            </h3>
            <p className="text-slate-50/90 max-w-2xl mx-auto mb-6">
              Set your first goal, choose your hints-and-time preferences, and
              start collecting small wins today.
            </p>
            <Link href="/auth/sign-up">
              <button className="rounded-full bg-white text-slate-900 font-semibold px-6 py-3 shadow-lg hover:-translate-y-0.5 transition-transform cursor-pointer">
                Create a free profile
              </button>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
