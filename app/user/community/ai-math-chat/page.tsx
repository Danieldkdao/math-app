import Chatbox from "@/components/Dashboard/community/ai-math-chat/chatbox";
import PreviousConversationsModal from "@/components/Dashboard/community/ai-math-chat/previous-conversations";
import { FaSeedling } from "react-icons/fa6";

const AIMathChatPage = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-6xl space-y-8 px-4 py-8">
        <Chatbox />
        <aside className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              <FaSeedling />
              Prompt tips
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>- Mention the puzzle category to get tailored hints.</li>
              <li>
                - You could include examples to show the AI what you are looking
                for.
              </li>
              <li>- Be as specific as possible when asking the AI.</li>
              <li>- Change the modes to get different personalities.</li>
            </ul>
          </div>
        </aside>
      </div>
      <PreviousConversationsModal />
    </div>
  );
};

export default AIMathChatPage;
