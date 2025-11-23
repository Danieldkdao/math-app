import Modal from "@/components/General/modal";
import PreviousConversationClient from "./previous-conversation-client";
import { connectDB } from "@/db/db";
import chatSessionModel from "@/db/schemas/chat-session-model";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";
import { ChatSession } from "@/lib/types";

const PreviousConversationsModal = async () => {
  const h = await headers();
  const session = await auth.api.getSession({ headers: h });
  if (session == null) return;
  await connectDB();
  const data = await chatSessionModel
    .find({ user: session.user.id })
    .sort({ createdAt: -1 });
  const previousConversations: ChatSession[] = JSON.parse(JSON.stringify(data));
  return (
    <Modal>
      <PreviousConversationClient
        previousConversations={previousConversations}
      />
    </Modal>
  );
};

export default PreviousConversationsModal;
