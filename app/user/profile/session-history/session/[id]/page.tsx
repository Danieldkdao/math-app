import PuzzleHistory from "@/components/Dashboard/user-profile/training-history/puzzle-history";
import SessionDetails from "@/components/Dashboard/user-profile/training-history/session-details";
import { connectDB } from "@/db/db";
import puzzleSessionModel from "@/db/schemas/puzzle-session-model";
import { auth } from "@/lib/auth/auth";
import { PopulatedPuzzleSession } from "@/lib/types";
import { headers } from "next/headers";

const colorPuzzleResultKey = [
  {
    result: "Correct",
    bgColor: "bg-green-500",
    textColor: "text-green-500",
    bg: "bg-green-100",
  },
  {
    result: "Incorrect",
    bgColor: "bg-red-500",
    textColor: "text-red-500",
    bg: "bg-red-100",
  },
  {
    result: "Skipped",
    bgColor: "bg-yellow-500",
    textColor: "text-yellow-500",
    bg: "bg-yellow-100",
  },
];

const PuzzleSessionDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (session == null) return;
  const { id } = await params;
  await connectDB();
  const data = await puzzleSessionModel
    .findOne({
      _id: id,
      user: session.user.id,
    })
    .populate({
      path: "puzzleHistory",
      populate: {
        path: "puzzleId",
        model: "MathPuzzles",
      },
    });
  if (!data)
    return (
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[800px] bg-gray-100 rounded-md border border-gray-400 p-5 space-y-4">
          <h1 className="text-2xl font-bold text-center">
            404 Session Not Found
          </h1>
          <p className="text-gray-600 text-center">
            We were unable to fetch the details of this session at this time.
            The session might not non-existent or we might be facing technical
            issues.
          </p>
        </div>
      </div>
    );
  const puzzleSession: PopulatedPuzzleSession = JSON.parse(
    JSON.stringify(data)
  );
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[800px] bg-gray-50 rounded-md border border-gray-400 p-5 space-y-4">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-xl font-bold">PUZZLE HISTORY</h1>
          <p className="text-gray-500">
            Click on one of the dots to review more information about the
            question.
          </p>
          <div className="border rounded-md p-4 border-gray-400 flex items-center gap-4 flex-wrap">
            {colorPuzzleResultKey.map((item, index) => {
              return (
                <div className={`flex items-center gap-2 ${item.bg} py-1 px-2 rounded`} key={index}>
                  <div className={`size-4 rounded-full ${item.bgColor}`}></div>
                  <h3 className={`text-gray-600 font-medium ${item.textColor}`}>{item.result}</h3>
                </div>
              );
            })}
          </div>
        </div>
        <hr className="text-gray-400" />
        <PuzzleHistory puzzleHistory={puzzleSession.puzzleHistory}/>
        <hr className="text-gray-400" />
        <SessionDetails puzzleSession={puzzleSession} />
      </div>
    </div>
  );
};

export default PuzzleSessionDetailsPage;
