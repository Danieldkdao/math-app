import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaComments, FaMessage } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";

const threads = [
  {
    title: "Is there a slick proof for Vandermonde’s identity?",
    category: "Algebra",
    threadPrompt: "Looking for an intuitive argument that avoids heavy algebra.",
    replies: 12,
    createdAt: "2h ago",
  },
  {
    title: "Visual intuition for Green’s Theorem",
    category: "Calculus",
    threadPrompt: "How do you picture the curl vs divergence pieces in simple regions?",
    replies: 7,
    createdAt: "20h ago",
  },
  {
    title: "Favourite counterexamples in topology",
    category: "Topology",
    threadPrompt: "Share your go-to spaces that break common intuitions.",
    replies: 18,
    createdAt: "4d ago",
  },
  {
    title: "Fast sanity checks for limits",
    category: "Analysis",
    threadPrompt: "What are your quickest heuristics before epsilon-delta proofs?",
    replies: 5,
    createdAt: "1w ago",
  },
  {
    title: "Cauchy-Schwarz equality condition intuition",
    category: "Algebra",
    threadPrompt: "Geometric view for when the inequality becomes equality.",
    replies: 9,
    createdAt: "2w ago",
  },
];

const UserThreadsPage = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[900px] bg-gray-50 rounded-md border border-gray-400 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/user/profile">
            <div className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition">
              <FaArrowLeft />
              Back to profile
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Your Threads</h1>
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <FaComments className="text-cyan-700" />
            Stored thread fields: title, category, prompt, replies, timestamps
          </div>
        </div>

        <div className="grid gap-4">
          {threads.map((thread, idx) => (
            <div key={idx} className="rounded-md border border-gray-300 bg-white p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <FaComments className="text-cyan-700" />
                  {thread.title}
                </div>
                <span className="px-2 py-1 rounded-md bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100 text-xs font-semibold">
                  {thread.category}
                </span>
              </div>
              <p className="text-sm text-gray-700">{thread.threadPrompt}</p>
              <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
                <span className="inline-flex items-center gap-1">
                  <FaMessage className="text-gray-500" />
                  {thread.replies} replies
                </span>
                <span className="inline-flex items-center gap-1">
                  <FaClock className="text-gray-500" />
                  {thread.createdAt}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 text-sm font-semibold text-gray-700">
          <span className="px-3 py-1 rounded-md bg-gray-100 ring-1 ring-gray-200">Showing {threads.length} threads</span>
          <FaArrowRight className="text-gray-400" />
          <span className="text-gray-500">All data shown from thread schema fields</span>
        </div>
      </div>
    </div>
  );
};

export default UserThreadsPage;
