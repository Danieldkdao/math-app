"use client";

import { postThreadReplyAction } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const PostReply = ({ threadId }: { threadId: string }) => {
  const [replyContent, setReplyContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePostReply = async () => {
    setLoading(true);
    if (!replyContent.trim()) return toast.error("Reply cannot be empty.");
    const response = await postThreadReplyAction(threadId, replyContent);
    if (response.success) {
      setReplyContent("");
      toast.success(response.message);
      router.refresh();
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-3">
      <textarea
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)}
        rows={4}
        placeholder="Share a hint, a partial proof, or a question for the author."
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
      />
      <button
        disabled={loading}
        onClick={handlePostReply}
        className={`inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow  ${
          loading
            ? "cursor-not-allowed opacity-60"
            : "hover:bg-cyan-700 cursor-pointer"
        }`}
      >
        Post reply
      </button>
    </div>
  );
};

export default PostReply;
