import { connectDB } from "@/db/db";
import communityPuzzleModel from "@/db/schemas/community-puzzle-model";
import type { MathCommunityPuzzle } from "@/lib/types";
import PuzzleFilters from "@/components/Dashboard/community/puzzles/puzzle-filters";
import ListPuzzles from "@/components/Dashboard/community/puzzles/list-puzzles";

const CommunityPuzzlesPage = async () => {
  await connectDB();
  const data = await communityPuzzleModel
    .find()
    .sort({ createdAt: -1, _id: -1 });
  const puzzles: MathCommunityPuzzle[] = data.map((item) =>
    JSON.parse(JSON.stringify(item))
  );
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-6xl space-y-8 px-4 py-8">
        <PuzzleFilters />

        <ListPuzzles puzzles={puzzles}/>
      </div>
    </div>
  );
};

export default CommunityPuzzlesPage;
