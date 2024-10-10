import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import ManageSubscription from "./manage-subscription";
const Page = async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }
  const subscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.userId, userId),
  });

  const plan = subscription && subscription.subscribed ? "premium" : "free";

  return (
    <div className="p-4 border rounded-md">
      <h1 className="text-4xl mb-3">Subscription Detail</h1>
      <p className="mb-2 text-lg">
        Your current subscription plan is: <strong>{plan}</strong>
      </p>
      <ManageSubscription />
    </div>
  );
};

export default Page;
