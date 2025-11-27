import Link from "next/link";
import { FaArrowLeft, FaPenNib, FaStar } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { connectDB } from "@/db/db";
import { auth } from "@/lib/auth/auth";
import type { MathCommunityPuzzleDraft } from "@/lib/types";
import { headers } from "next/headers";
import puzzleDraftModel from "@/db/schemas/puzzle-draft-model";
import { timeAgo } from "@/lib/utils";
import MarkdownRenderer from "@/components/General/markdown-renderer";

const PuzzleDraftsPage = async () => {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (session == null) return;
  await connectDB();
  const data = await puzzleDraftModel
    .find({ "user.id": session.user.id })
    .sort({ createdAt: -1, _id: -1 });
  const drafts: MathCommunityPuzzleDraft[] = data.map((item) =>
    JSON.parse(JSON.stringify(item))
  );
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
          <h1 className="text-2xl font-bold text-gray-900">
            Your Puzzle Drafts
          </h1>
        </div>

        {drafts.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center text-gray-700">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800">
              <FaPenNib className="text-cyan-700" />
              No puzzle drafts yet
            </div>
            <p className="text-sm text-gray-600">
              Start sketching a community puzzle. Save it as a draft now and finish the details later.
            </p>
            <Link
              href="/user/community/puzzles/create"
              className="inline-flex items-center gap-2 rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-cyan-700"
            >
              Begin a new draft
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {drafts.map((draft) => (
              <div
                key={draft._id}
                className="rounded-md border border-gray-300 bg-white p-4 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800">
                    <FaPenNib className="text-cyan-700" />
                    {draft.title}
                  </div>
                  <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 text-xs font-semibold">
                    {draft.difficulty}
                  </span>
                </div>
                <div className="text-sm text-gray-700">
                  <MarkdownRenderer text={draft.problemText} />
                </div>
                <div className="text-xs text-gray-700 space-y-1 bg-gray-50 rounded-md p-3 ring-1 ring-gray-100">
                  <div className="max-h-40 overflow-auto">
                    <strong>Hint:</strong> <MarkdownRenderer text={draft.hint} />
                  </div>
                  <div className="max-h-40 overflow-auto">
                    <strong>Outline:</strong>{" "}
                    <MarkdownRenderer text={draft.solutionOutline} />
                  </div>
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
                    Updated {timeAgo(draft.updatedAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PuzzleDraftsPage;
