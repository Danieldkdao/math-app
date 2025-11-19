import SessionCard from "@/components/Dashboard/user-profile/training-history/session-card";
import ProfileCharts from "@/components/Dashboard/user-profile/profile-charts";
import { connectDB } from "@/db/db";
import puzzleSessionModel from "@/db/schemas/puzzle-session-model";
import { auth } from "@/lib/auth/auth";
import { PopulatedPuzzleSession } from "@/lib/types";
import { formatTime } from "@/lib/utils";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCircleUser } from "react-icons/fa6";

const UserProfile = async () => {
  await connectDB();
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (!session || session == null) return;

  const data = await puzzleSessionModel
    .find({
      user: session.user.id,
    })
    .populate({
      path: "puzzleHistory",
      populate: {
        path: "puzzleId",
        model: "MathPuzzles",
      },
    })
    .sort({ createdAt: -1, _id: -1 });
  // if (!puzzleSessionHistory) {
  //   return (
  //     <div className="w-full flex justify-center">
  //       <div className="w-full max-w-[800px] bg-gray-100 rounded-md border border-gray-400 p-5 space-y-4">
  //         <h1 className="text-2xl font-bold text-center">Failed to retrieve user data</h1>
  //         <p className="text-gray-600 text-center">Unfortunately, at this time we could not retrive the details of your profile. Please come back later and check for updates.</p>
  //       </div>
  //     </div>
  //   );
  // }
  const puzzleSessionHistory: PopulatedPuzzleSession[] = data.map((item) =>
    JSON.parse(JSON.stringify(item))
  );

  const performanceOverview = [
    {
      title: "Total Puzzles",
      value: puzzleSessionHistory.reduce(
        (a, b) =>
          a +
          b.puzzleHistory.filter((item) => item.result === "correct").length,
        0
      ),
      description: "(Lifetime Puzzles Solved)",
    },
    {
      title: "Accuracy",
      value:
        puzzleSessionHistory.reduce(
          (a, b) =>
            a +
            b.puzzleHistory.filter((item) => item.result !== "skipped").length,
          0
        ) > 0
          ? `${Math.round(
              (puzzleSessionHistory.reduce(
                (a, b) =>
                  a +
                  b.puzzleHistory.filter((item) => item.result === "correct")
                    .length,
                0
              ) /
                puzzleSessionHistory.reduce(
                  (a, b) =>
                    a +
                    b.puzzleHistory.filter((item) => item.result !== "skipped")
                      .length,
                  0
                )) *
                100
            )}%`
          : "Unavailable",
      description: "(Overall Correct Solution Rate)",
    },
    {
      title: "Avg Time",
      value:
        puzzleSessionHistory.reduce(
          (a, b) =>
            a +
            b.puzzleHistory.filter((item) => item.result !== "skipped").length,
          0
        ) > 0
          ? `${(
              puzzleSessionHistory.reduce(
                (a, b) =>
                  a +
                  b.puzzleHistory
                    .filter((item) => item.result !== "skipped")
                    .reduce((a, b) => a + b.timeSpent, 0),
                0
              ) /
              puzzleSessionHistory.reduce(
                (a, b) =>
                  a +
                  b.puzzleHistory.filter((item) => item.result !== "skipped")
                    .length,
                0
              )
            ).toFixed(1)} sec`
          : "Unavailable",
      description: "(Average Time per Puzzle)",
    },
    {
      title: "Current Rank",
      value: "Master I",
      description: "(Global standing based on skill)",
    },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[800px] bg-gray-50 rounded-md border border-gray-400 p-5 space-y-4">
        <div className="flex items-center gap-4">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt="user profile image"
              width={105}
              height={105}
              className="rounded-full border-4 border-cyan-800"
            />
          ) : (
            <div className="shrink-0">
              <FaCircleUser
                size={105}
                className="rounded-full border-4 border-cyan-800"
              />
            </div>
          )}
          <div>
            <div className="flex gap-4 items-center">
              <h1 className="text-2xl font-bold">{session.user.name}</h1>
              <p className="py-0.5 px-2 rounded-md border border-cyan-800 bg-cyan-50 text-gray-600 font-medium text-sm">
                Free
              </p>
              <p className="py-0.5 px-2 rounded-md border border-cyan-800 bg-cyan-50 text-gray-600 font-medium text-sm">
                Joined on {formatTime(session.user.createdAt).date} at{" "}
                {formatTime(session.user.createdAt).time}
              </p>
            </div>
            <p className="text-gray-600 line-clamp-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              nobis sed fugiat perferendis, dolor facilis placeat! Molestiae
              eligendi maxime suscipit placeat quisquam, omnis labore voluptates
              nobis rem nulla. Ratione, explicabo!
            </p>
          </div>
        </div>
        <hr className="text-gray-400" />
        <h1 className="text-2xl font-bold">ALL TIME STATS</h1>
        <hr className="text-gray-400" />
        <div className="grid grid-cols-4 gap-4">
          {performanceOverview.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-2 border border-gray-400 rounded-md p-4"
              >
                <h1 className="text-xl text-center font-medium text-gray-600">
                  {item.title}
                </h1>
                <h1 className="text-lg font-bold text-center text-gray-500">
                  {item.value}
                </h1>
                <p className="text-gray-500 text-center">{item.description}</p>
              </div>
            );
          })}
        </div>
        <hr className="text-gray-400" />
        <h1 className="text-2xl font-bold">PERFORMANCE INSIGHTS</h1>
        <ProfileCharts sessionHistory={puzzleSessionHistory} />
        <hr className="text-gray-400" />
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">RECENT SESSIONS</h1>
          <Link href="/user/profile/session-history">
            <div className="flex items-center gap-2 hover:gap-4 text-gray-600 transition-all duration-300">
              <p className="text-lg font-medium">View All</p>
              <FaArrowRight />
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {puzzleSessionHistory.slice(0, 3).map((item) => {
            return <SessionCard puzzleSession={item} key={item._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
