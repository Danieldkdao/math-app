import SessionCard from "@/components/Dashboard/user-profile/training-history/session-card";
import { connectDB } from "@/db/db";
import puzzleSessionModel from "@/db/schemas/puzzle-session-model";
import { auth } from "@/lib/auth/auth";
import { PuzzleSessionServer, type PopulatedPuzzleSession } from "@/lib/types";
import { headers } from "next/headers";
import Link from "next/link";

const SessionHistoryPage = async () => {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (session == null) return;
  await connectDB();
  const data = await puzzleSessionModel.find({ user: session.user.id });
  if (data.length === 0)
    return (
      <div className="w-full flex justify-center px-4">
        <div className="w-full max-w-[800px] bg-gray-100 rounded-md border border-gray-400 p-5 flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold text-center">
            No Sessions Completed Yet
          </h1>
          <p className="text-gray-600">
            Looks like you haven't completed any sessions yet. Once you do, they
            will appear here. To start a new session, click on the button below
            or the train section of the sidebar.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 w-full max-w-96">
            <Link href="/user/profile" className="flex-1">
              <button className="bg-cyan-50 py-2 px-5 rounded-md border border-cyan-800 text-gray-600 font-bold cursor-pointer hover:bg-cyan-100 transition-colors duration-300 w-full h-full">
                Back to Profile
              </button>
            </Link>
            <Link href="/user/train" className="flex-1">
              <button className="bg-cyan-50 py-2 px-5 rounded-md border border-cyan-800 text-gray-600 font-bold cursor-pointer hover:bg-cyan-100 transition-colors duration-300 w-full h-full">
                Start New Session
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  const puzzleSessionHistory: PopulatedPuzzleSession[] = data.map((item) =>
    JSON.parse(JSON.stringify(item))
  );
  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-[800px] bg-gray-100 rounded-md border border-gray-400 p-5 space-y-4">
        <h1 className="text-2xl font-bold">SESSION HISTORY</h1>
        <hr className="text-gray-400" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {puzzleSessionHistory.map((item) => {
            return <SessionCard key={item._id} puzzleSession={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SessionHistoryPage;
