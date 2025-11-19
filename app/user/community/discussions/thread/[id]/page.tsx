import Link from "next/link";
import { FaComments, FaRegCommentDots, FaUser } from "react-icons/fa";
import { FaClock, FaArrowRightLong } from "react-icons/fa6";

type ThreadPageProps = {
  params: { id: string };
};

const replies = [
  {
    author: "NovaSolver",
    timestamp: "12m ago",
    content: "I tackled the parity by pairing tiles across the diagonal, then counted the leftover forced moves.",
  },
  {
    author: "ProofSketch",
    timestamp: "28m ago",
    content: "Try framing it as an invariant on the number of boundary crossings. The generalization to n dimensions still holds.",
  },
  {
    author: "HintDrop",
    timestamp: "1h ago",
    content: "Diagram the first three layers. A symmetry argument appears once you spot the repeated subgrid.",
  },
];

const ThreadPage = ({ params }: ThreadPageProps) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl space-y-8 px-4 py-8">
        <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-100">
              <FaComments />
              Thread
            </p>
            <h1 className="text-3xl font-bold text-gray-900">Community discussion</h1>
            <p className="text-sm text-gray-600">
              Thread ID: <span className="font-semibold text-gray-900">{params.id}</span>
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm text-sm text-gray-700">
            <div className="inline-flex items-center gap-2 font-semibold text-gray-900">
              <FaClock className="text-cyan-600" />
              Active contributors
            </div>
            <p className="text-gray-600">Join in with hints, sketches, or questions.</p>
          </div>
        </header>

        <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Original post</p>
            <h2 className="text-xl font-semibold text-gray-900">
              How would you generalize this combinatorics pattern to n dimensions?
            </h2>
            <p className="text-sm text-gray-700">
              I noticed a repeating structure on a 4x4 grid when counting lattice paths with constrained corners. Curious
              how to extend this to higher dimensions without brute force.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-[11px] font-semibold text-gray-700 ring-1 ring-gray-200">
              Strategy
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <FaRegCommentDots className="text-cyan-600" />
              Replies
            </div>
            <span className="rounded-full bg-gray-50 px-3 py-1 text-[11px] font-semibold text-gray-700 ring-1 ring-gray-200">
              {replies.length} responses
            </span>
          </div>
          <div className="space-y-3">
            {replies.map((reply) => (
              <div key={reply.author} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white">
                    <FaUser />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      {reply.author}
                      <span className="text-xs font-normal text-gray-500">· {reply.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700">{reply.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <FaComments className="text-orange-600" />
            Add a reply
          </div>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Title or quick summary"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
            />
            <textarea
              rows={4}
              placeholder="Share a hint, a partial proof, or a question for the author."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
            />
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-cyan-700">
                Post reply
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm">
                Save draft
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm">
                Preview
              </button>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-900">Want more threads?</p>
            <p className="text-sm text-gray-600">Browse the discussions hub for hints, writeups, and Q&A.</p>
          </div>
          <Link
            href="/user/community/discussions"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700"
          >
            Back to discussions
            <FaArrowRightLong />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThreadPage;
