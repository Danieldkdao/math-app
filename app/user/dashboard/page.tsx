import {
  FaClock,
  FaCubes,
  FaHandPointer,
  FaPenNib,
  FaPuzzlePiece,
  FaSliders,
  FaStopwatch,
} from "react-icons/fa6";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaLightbulb,
} from "react-icons/fa";
import { connectDB } from "@/db/db";
import puzzleSessionModel from "@/db/schemas/puzzle-session-model";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import communityPuzzleModel from "@/db/schemas/community-puzzle-model";
import puzzleDraftModel from "@/db/schemas/puzzle-draft-model";
import type {
  MathCommunityPuzzle,
  MathCommunityPuzzleDraft,
  PopulatedPuzzleSession,
} from "@/lib/types";
import MarkdownRenderer from "@/components/General/markdown-renderer";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";

const DashboardPage = async () => {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (session == null) return;
  await connectDB();
  const latestSessionData = await puzzleSessionModel
    .find({ user: session.user.id })
    .populate({ path: "puzzleHistory", populate: { path: "puzzleId" } })
    .sort({ createdAt: -1, _id: -1 })
    .limit(1);
  const mathCommunityPuzzlesData = await communityPuzzleModel
    .find({
      "user.id": session.user.id,
    })
    .sort({ createdAt: -1, _id: -1 })
    .limit(3);
  const draftPuzzlesData = await puzzleDraftModel
    .find({
      "user.id": session.user.id,
    })
    .sort({ createdAt: -1, _id: -1 })
    .limit(3);
  const latestSession: PopulatedPuzzleSession | undefined =
    latestSessionData.map((item) => JSON.parse(JSON.stringify(item)))[0];
  const mathCommunityPuzzles: MathCommunityPuzzle[] =
    mathCommunityPuzzlesData.map((item) => JSON.parse(JSON.stringify(item)));
  const draftPuzzles: MathCommunityPuzzleDraft[] = draftPuzzlesData.map(
    (item) => JSON.parse(JSON.stringify(item))
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>

      <section className="space-y-3">
        <div className="flex items-center gap-2 text-gray-800">
          <FaSliders className="text-cyan-700" />
          <h2 className="text-xl font-bold">Training preferences</h2>
        </div>
        {latestSession ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm space-y-2">
              <p className="text-sm font-semibold text-gray-700">
                Selected difficulty
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-700">
                {latestSession.settings.selectedDifficultyLevels.map(
                  (level) => (
                    <span
                      key={level}
                      className="px-2 py-1 rounded-md bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100"
                    >
                      {level}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm space-y-2">
              <p className="text-sm font-semibold text-gray-700">
                Selected categories
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-700">
                {latestSession.settings.selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm space-y-2">
              <p className="text-sm font-semibold text-gray-700">
                Puzzle count & pacing
              </p>
              <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                <span className="inline-flex items-center gap-2">
                  <FaStopwatch className="text-gray-500" />
                  {latestSession.settings.timeLimitPerPuzzle
                    ? `${latestSession.settings.timeLimitPerPuzzle}s per puzzle}`
                    : "No time limit"}
                </span>
                <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 ring-1 ring-gray-200">
                  {latestSession.settings.numberOfPuzzles} puzzles/session
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                <FaLightbulb
                  className={
                    latestSession.settings.hints
                      ? "text-amber-500"
                      : "text-gray-400"
                  }
                />
                Hints {latestSession.settings.hints ? "enabled" : "off"} /
                Skips {latestSession.settings.skips ? "enabled" : "off"}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 col-span-3 bg-cyan-50 rounded-md border border-cyan-800">
            <p className=" text-center text-sm font-semibold text-cyan-800">
              No sessions yet. Start a new training session to get started.
            </p>
          </div>
        )}
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2 text-gray-800">
          <FaCubes className="text-cyan-700" />
          <h2 className="text-xl font-bold">Latest session breakdown</h2>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {latestSession ? (
              latestSession.puzzleHistory.length > 0 ? (
              latestSession.puzzleHistory.reverse().slice(0, 3).map((puzzle) => (
                <div
                  key={puzzle.puzzleId._id}
                  className="rounded-md border border-gray-200 bg-white p-4 shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                    <span className="inline-flex items-center gap-2">
                      <FaPuzzlePiece className="text-cyan-700" />
                      <p className="line-clamp-1">
                        {puzzle.puzzleId.title}
                      </p>
                      
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
                    Answered: {puzzle.userAnswer || "?"}
                  </p>
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
                    <span className="inline-flex items-center gap-2">
                      <FaClock className="text-gray-500" />
                      {puzzle.timeSpent}s
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <FaHandPointer
                        className={
                          puzzle.hintUsed ? "text-amber-500" : "text-gray-400"
                        }
                      />
                      Hint {puzzle.hintUsed ? "used" : "not used"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-sm font-semibold text-gray-600">
                No puzzle history yet. Solve your first session to see details.
              </p>
            )
          ) : (
            <div className="p-4 col-span-3 bg-cyan-50 rounded-md border border-cyan-800">
              <p className=" text-center text-sm font-semibold text-cyan-800">
                No sessions yet. Start a new training session to see details.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2 text-gray-800">
          <FaPuzzlePiece className="text-cyan-700" />
          <h2 className="text-xl font-bold">Math puzzle library spotlight</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {mathCommunityPuzzles.length > 0 ? (
            mathCommunityPuzzles.map((puzzle) => (
              <Link
                key={puzzle._id}
                href={`/user/community/puzzles/${puzzle._id}`}
              >
                <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                    <span>{puzzle.title}</span>
                    <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 text-xs">
                      {puzzle.difficulty}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-600">
                    {puzzle.category}
                  </p>
                  <div className="text-sm text-gray-700 line-clamp-3">
                    <MarkdownRenderer text={puzzle.problemText} />
                  </div>
                  <div className="text-xs text-gray-700 space-y-1 bg-gray-50 rounded-md p-3 ring-1 ring-gray-100">
                    <div className="line-clamp-4">
                      <strong>Hint:</strong>{" "}
                      <MarkdownRenderer text={puzzle.hint} />
                    </div>
                    <div className="line-clamp-4">
                      <strong>Outline:</strong>{" "}
                      <MarkdownRenderer text={puzzle.solutionOutline} />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 col-span-3 bg-cyan-50 rounded-md border border-cyan-800">
              <p className=" text-center text-sm font-semibold text-cyan-800">
                No community puzzles yet. Publish one to see it here.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2 text-gray-800">
          <FaPenNib className="text-cyan-700" />
          <h2 className="text-xl font-bold">Draft health check</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {draftPuzzles.length > 0 ? (
            draftPuzzles.map((draft) => {
              let fields = 2;
              if (draft.problemText) fields += 1;
              if (draft.title.trim()) fields += 1;
              if (draft.hint.trim()) fields += 1;
              if (draft.solutionOutline.trim()) fields += 1;
              if (draft.answers[0].trim()) fields += 1;
              const progress = (fields / 7) * 100;
              return (
                <Link
                  key={draft._id}
                  href={`/user/community/puzzles/create?draft=${draft._id}`}
                >
                  <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <FaPenNib className="text-cyan-700" />
                        <span className="line-clamp-1">
                          {draft.title.trim() ? draft.title : "No Title"}
                        </span>
                      </div>
                      <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 text-[11px] font-semibold">
                        {draft.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                      <span className="px-2 py-1 rounded-md bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
                        {draft.category}
                      </span>
                      <span className="text-gray-500">
                        {timeAgo(draft.updatedAt)}
                      </span>
                    </div>
                    <div className="space-y-2 rounded-xl bg-gray-50 p-3 ring-1 ring-gray-100">
                      <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                        <span>Problem text</span>
                        {draft.problemText.trim() ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600">
                            <FaCheckCircle /> Filled
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-500">
                            <FaExclamationTriangle /> Missing
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                        <span>Answers</span>
                        <span className="inline-flex items-center gap-1 text-gray-700">
                          {draft.answers.length} added
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                        <span>Hint</span>
                        {draft.hint.trim() ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600">
                            <FaCheckCircle /> Added
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-500">
                            <FaExclamationTriangle /> Pending
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                        <span>Solution outline</span>
                        {draft.solutionOutline.trim() ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600">
                            <FaCheckCircle /> Added
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-500">
                            <FaExclamationTriangle /> Pending
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
                        <span>Draft progress</span>
                        <span className="text-gray-800">
                          {progress.toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            progress >= 75
                              ? "bg-emerald-500"
                              : progress >= 40
                              ? "bg-amber-400"
                              : "bg-rose-400"
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="p-4 col-span-3 bg-cyan-50 rounded-md border border-cyan-800">
              <p className="text-center text-sm font-semibold text-cyan-800">
                No draft puzzles yet. Start a draft to track progress here.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
