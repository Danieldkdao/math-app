import React from "react";
import {
  FaPuzzlePiece,
  FaRobot,
  FaUsers,
  FaShieldHalved,
  FaChartLine,
  FaPlay,
} from "react-icons/fa6";

const GetStartedPage = () => {
  const featureAreas = [
    {
      title: "Adaptive Training",
      icon: <FaPuzzlePiece className="text-cyan-500" />,
      summary:
        "Build custom sessions with category, difficulty, timer, hint, and skip preferences that adjust as learners progress.",
      bullets: [
        "Flexible time caps per puzzle or untimed discovery mode",
        "Selectable categories and difficulty levels that mix for variety",
        "Hint and skip toggles so support is intentional, not automatic",
      ],
    },
    {
      title: "AI Math Chat",
      icon: <FaRobot className="text-indigo-500" />,
      summary:
        "Ask for scaffolded hints, concept refreshers, or outline-level guidance without revealing full solutions.",
      bullets: [
        "Role selection (assistant vs tutor) to match the tone you want",
        "Conversation history stored by session to pick up where you left off",
        "Moderated prompts that avoid spoilers while nudging progress",
      ],
    },
    {
      title: "Community & Threads",
      icon: <FaUsers className="text-emerald-500" />,
      summary:
        "Publish puzzles, draft ideas, join discussions, and review attempts from peers in a respectful, moderated space.",
      bullets: [
        "Create and save puzzle drafts with hints and solution outlines",
        "Threaded discussions with categories, reply counts, and recency",
        "Ratings, attempts, and comments surfaced for quick feedback",
      ],
    },
    {
      title: "Safety & Moderation",
      icon: <FaShieldHalved className="text-amber-500" />,
      summary:
        "Guardrails keep learners safe: content flags, respectful guidelines, and transparent review across community spaces.",
      bullets: [
        "Flag counts and comment visibility on every community puzzle",
        "Clear status chips for correct/incorrect/skipped attempts",
        "Structured feedback prompts that discourage spoilers",
      ],
    },
  ];

  const progressFeatures = [
    {
      title: "Session history",
      detail: "Full breakdowns of attempts, time spent, and per-puzzle outcomes.",
    },
    {
      title: "Timing insights",
      detail:
        "Average, fastest, and slowest solve times with unit-aware formatting for quick reads.",
    },
    {
      title: "Category focus",
      detail: "Performance by topic to balance practice or double down on strengths.",
    },
    {
      title: "Difficulty mix",
      detail: "Visualized solved counts by difficulty to keep stretch goals visible.",
    },
  ];

  const quickStart = [
    "Open the Settings modal and pick categories, difficulty, time limit, and number of puzzles.",
    "Toggle hints/skips to match how much coaching you want.",
    "Launch the session, solve, and log each attempt automatically.",
    "Review the session details page for accuracy, timing, and configuration.",
    "Join discussions or AI chat for follow-up questions on tricky steps.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 px-4 sm:px-6 lg:px-10 py-16">
      <div className="max-w-6xl mx-auto flex flex-col gap-16 sm:gap-20">
        <section className="space-y-6">
          <div className="flex flex-col items-center text-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm border border-slate-200">
              <FaPlay /> Get started with Figured
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Everything you can explore, documented in one place
            </h1>
            <p className="text-slate-700 max-w-3xl">
              Use this guide to see what’s possible—from configuring adaptive training to
              publishing puzzles and collaborating with the AI coach and community.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {featureAreas.map((area) => (
            <div
              key={area.title}
              className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-full bg-slate-100 flex items-center justify-center">
                  {area.icon}
                </div>
                <h2 className="text-xl font-semibold text-slate-900">{area.title}</h2>
              </div>
              <p className="text-slate-700">{area.summary}</p>
              <ul className="space-y-2 text-slate-700 list-disc list-inside">
                {area.bullets.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr] items-start">
          <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-900 border border-slate-200">
              Progress & insights
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Know what’s working</h2>
            <p className="text-slate-700">
              Session details and profile analytics keep growth visible without turning
              learning into a scoreboard. Use them to celebrate streaks and spot areas to
              revisit.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {progressFeatures.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-1"
                >
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="text-slate-700 text-sm">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-cyan-50 via-sky-50 to-indigo-100 p-6 space-y-4 shadow-xl border border-slate-200">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-900 border border-slate-200">
              Quick start checklist
            </div>
            <h3 className="text-xl font-semibold text-slate-900">
              Launch your first adaptive session
            </h3>
            <ul className="space-y-3 text-slate-800">
              {quickStart.map((step, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="h-8 w-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sm font-bold text-cyan-700">
                    {idx + 1}
                  </span>
                  <span className="text-sm sm:text-base">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl bg-white border border-slate-200 p-6 space-y-3 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-900 border border-slate-200">
            <FaChartLine /> Design principles
          </div>
          <h2 className="text-2xl font-bold text-slate-900">How we shape the experience</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-slate-700">
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">Clarity first</p>
              <p className="text-sm">
                Every screen surfaces what to do next—whether that’s starting a session,
                joining a thread, or reviewing a breakdown.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">Choice with guardrails</p>
              <p className="text-sm">
                Families pick time limits, hints, and skips; moderation keeps spaces kind
                and constructive.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">Celebrate small wins</p>
              <p className="text-sm">
                Progress indicators, attempts, and history lean into encouragement over
                pressure.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GetStartedPage;
