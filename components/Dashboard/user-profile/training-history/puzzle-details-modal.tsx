import Modal from "@/components/General/modal";
import { useModal } from "@/hooks/useModal";
import { PuzzleSessionDetails } from "@/lib/types";
import { convertTime } from "./session-details";
import MarkdownRenderer from "@/components/General/markdown-renderer";

const resultStyles: Record<
  PuzzleSessionDetails["result"],
  { label: string; badge: string; chip: string }
> = {
  correct: {
    label: "Correct",
    badge: "bg-green-50 text-green-700 border-green-200",
    chip: "bg-green-100 text-green-700",
  },
  incorrect: {
    label: "Incorrect",
    badge: "bg-red-50 text-red-700 border-red-200",
    chip: "bg-red-100 text-red-700",
  },
  skipped: {
    label: "Skipped",
    badge: "bg-yellow-50 text-yellow-700 border-yellow-200",
    chip: "bg-yellow-100 text-yellow-700",
  },
};

const formatTimeSpent = (seconds: number) => {
  const time = convertTime(seconds);
  return time.unit === "sec" ? `${time.seconds} sec` : time.timeString;
};

const PuzzleDetailsModal = ({
  mathPuzzle,
}: {
  mathPuzzle: PuzzleSessionDetails | null;
}) => {
  const { setIsModalOpen } = useModal();
  if (!mathPuzzle) return null;

  const { puzzleId, result, userAnswer, timeSpent, hintUsed } = mathPuzzle;
  const style = resultStyles[result];

  return (
    <Modal callback={() => setIsModalOpen(false)}>
      <div className="w-[min(960px,92vw)] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-200">
        <div className="relative px-6 pt-6 pb-2">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-t-2xl" />
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
                Puzzle recap
              </p>
              <div className="text-2xl font-bold text-gray-900 leading-tight">
                <MarkdownRenderer text={puzzleId.title} />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="py-1 px-2 rounded-md font-medium text-gray-700 bg-cyan-50 text-sm border border-cyan-200">
                  {puzzleId.category}
                </span>
                <span className="py-1 px-2 rounded-md font-medium text-gray-700 bg-blue-50 text-sm border border-blue-200">
                  {puzzleId.difficulty}
                </span>
                <span
                  className={`py-1 px-2 rounded-md font-semibold text-sm border ${style.badge}`}
                >
                  {style.label}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-sm font-medium text-gray-500 hover:text-gray-800 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
        <div className="px-6 pb-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
              <p className="text-xs text-gray-500 font-medium">Result</p>
              <div
                className={`mt-1 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold bg-white border border-gray-200 ${style.badge}`}
              >
                <span className={`size-2 rounded-full ${style.chip}`} />
                <span>{style.label}</span>
              </div>
            </div>
            <div className="border border-gray-200 rounded-xl p-4 bg-white">
              <p className="text-xs text-gray-500 font-medium">Your Answer</p>
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {userAnswer ?? "Not answered"}
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-4 bg-white">
              <p className="text-xs text-gray-500 font-medium">
                Correct Answer/s
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {puzzleId.answers.join(", ")}
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-4 bg-white">
              <p className="text-xs text-gray-500 font-medium">Time Spent</p>
              <p className="mt-1 text-lg font-semibold text-gray-800">
                {formatTimeSpent(timeSpent)}
              </p>
              <p className="text-xs text-gray-500">on this puzzle</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="lg:col-span-1 border border-gray-200 rounded-xl p-4 bg-white space-y-2">
              <h3 className="text-sm font-semibold text-gray-800">
                Problem Statement
              </h3>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                <MarkdownRenderer text={puzzleId.problemText} />
              </div>
            </div>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-xl p-4 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-800">Hint</h3>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                      hintUsed
                        ? "bg-orange-50 text-orange-700 border-orange-200"
                        : "bg-gray-50 text-gray-600 border-gray-200"
                    }`}
                  >
                    {hintUsed ? "Used" : "Not used"}
                  </span>
                </div>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  <MarkdownRenderer text={puzzleId.hint} />
                </div>
              </div>
              <div className="border border-gray-200 rounded-xl p-4 bg-white space-y-2">
                <h3 className="text-sm font-semibold text-gray-800">
                  Solution Outline
                </h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  <MarkdownRenderer text={puzzleId.solutionOutline} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PuzzleDetailsModal;
