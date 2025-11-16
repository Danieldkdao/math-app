import TrainContainer from "@/components/Dashboard/train/train-container";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const TrainPage = async () => {
  const h = await headers();
  const session = await auth.api.getSession({headers: h});
  if(session == null) return redirect("/");

  return (
    <div className="w-full flex justify-center">
      <TrainContainer name={session.user.name} userId={session.user.id}/>
    </div>
  );
};

export default TrainPage;
